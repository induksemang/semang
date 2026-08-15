-- ============================================================
-- SEMANG — Skema inti sesuai Semang_ERD.md / Semang_ERD.puml v2.0
--
-- Konvensi tanpa kecuali:
--   waktu        : timestamptz
--   tanggal murni: date
--   teks         : text
--   uang         : numeric(14,2), satuan rupiah penuh
--   kunci utama  : uuid v7 (urut menurut waktu)
--   enum         : text + CHECK
--   data penyedia: jsonb
-- ============================================================

create extension if not exists pgcrypto;

-- ------------------------------------------------------------
-- UUID v7
--
-- Postgres 17 belum punya uuidv7() bawaan (masuk di 18). ERD meminta kunci
-- utama yang urut menurut waktu supaya baris baru masuk ke ujung indeks alih-
-- alih tersebar; tanpa itu indeks pada tabel besar cepat renggang.
-- Enam byte pertama diganti milidetik epoch, sisanya tetap acak.
-- ------------------------------------------------------------

create or replace function public.uuid_generate_v7()
returns uuid
language sql
volatile
parallel safe
set search_path = ''
as $$
  select encode(
    set_bit(
      set_bit(
        overlay(
          uuid_send(gen_random_uuid())
          placing substring(
            int8send(floor(extract(epoch from clock_timestamp()) * 1000)::bigint)
            from 3
          )
          from 1 for 6
        ),
        52, 1
      ),
      53, 1
    ),
    'hex'
  )::uuid;
$$;

-- ============================================================
-- 2. IDENTITAS & AKSES
-- ============================================================

-- Ketiga kolom kontak boleh kosong dengan sengaja: pemilik jalur Google belum
-- punya nomor di langkah 1 wizard, pemilik jalur WhatsApp tidak pernah punya
-- email. Yang menegakkan kelengkapannya adalah alur wizard, bukan NOT NULL.
create table users (
  id uuid primary key references auth.users(id) on delete cascade,
  name text,
  email text unique,
  whatsapp_number text unique,
  whatsapp_number_verified_at timestamptz,
  locale text not null default 'id',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deletion_requested_at timestamptz,
  deleted_at timestamptz
);

create table auth_identities (
  id uuid primary key default public.uuid_generate_v7(),
  user_id uuid not null references users(id) on delete cascade,
  provider text not null check (provider in ('google', 'whatsapp')),
  provider_subject text not null,
  last_used_at timestamptz,
  created_at timestamptz not null default now(),
  revoked_at timestamptz,
  unique (provider, provider_subject)
);

create table login_codes (
  id uuid primary key default public.uuid_generate_v7(),
  user_id uuid references users(id) on delete cascade,
  whatsapp_number text not null,
  purpose text not null check (purpose in ('login', 'change_whatsapp_number')),
  code_hash text not null,
  expires_at timestamptz not null,
  attempt_count smallint not null default 0 check (attempt_count >= 0),
  consumed_at timestamptz,
  invalidated_at timestamptz,
  created_at timestamptz not null default now()
);

-- Satu kode berbiaya Rp356,65. Tanpa pembatas ini endpoint pengirim kode
-- adalah cara termurah bagi orang lain menghabiskan saldo WhatsApp Business.
create table request_limits (
  id uuid primary key default public.uuid_generate_v7(),
  scope text not null check (scope in ('whatsapp_number', 'account', 'ip_address')),
  scope_key text not null,
  window_start timestamptz not null,
  request_count integer not null default 0 check (request_count >= 0),
  violation_count smallint not null default 0 check (violation_count >= 0),
  blocked_until timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (scope, scope_key, window_start)
);

-- ============================================================
-- 3. REKENING BANK & SUB-AKUN XENDIT
-- ============================================================

create table bank_accounts (
  id uuid primary key default public.uuid_generate_v7(),
  user_id uuid not null references users(id) on delete cascade,
  bank_code text not null,
  account_number text not null,
  account_holder text not null,
  is_default boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

-- Tidak ada kolom data identitas di sini. Isi formulir verifikasi diteruskan
-- langsung ke Xendit dan tidak disimpan; yang dicatat hanya statusnya.
create table xendit_sub_accounts (
  id uuid primary key default public.uuid_generate_v7(),
  user_id uuid not null unique references users(id) on delete cascade,
  xendit_account_id text unique,
  settlement_bank_account_id uuid references bank_accounts(id) on delete restrict,
  verification_status text not null default 'not_started'
    check (verification_status in ('not_started', 'in_progress', 'completed', 'rejected')),
  verification_submitted_at timestamptz,
  verification_completed_at timestamptz,
  verification_rejection_reason text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================================
-- 4. WILAYAH, PROPERTI & PENYEWA
-- ============================================================

-- Zona waktu diletakkan di provinsi, bukan di wilayah: batas WIB/WITA/WIT
-- mengikuti batas provinsi, dan Indonesia tidak mengenal waktu musim panas.
create table provinces (
  id uuid primary key default public.uuid_generate_v7(),
  statistics_code text not null unique,
  name text not null,
  timezone text not null check (timezone in ('Asia/Jakarta', 'Asia/Makassar', 'Asia/Jayapura')),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table regions (
  id uuid primary key default public.uuid_generate_v7(),
  province_id uuid not null references provinces(id) on delete restrict,
  statistics_code text not null unique,
  name text not null,
  kind text not null check (kind in ('city', 'regency')),
  is_active boolean not null default true,
  superseded_by_region_id uuid references regions(id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Daftar wilayah ratusan baris dan disajikan sebagai pencarian bertaip,
-- bukan dropdown, jadi kolom nama butuh indeks pencarian teks.
create extension if not exists pg_trgm;
create index idx_regions_name_trgm on regions using gin (name gin_trgm_ops);

create table properties (
  id uuid primary key default public.uuid_generate_v7(),
  owner_id uuid not null references users(id) on delete cascade,
  name text not null,
  region_id uuid references regions(id) on delete restrict,
  -- Zona waktu kost, bukan zona pemiliknya. Disalin dari provinsi wilayah
  -- yang dipilih lalu dibekukan, supaya pembaruan daftar wilayah tidak
  -- menggeser jatuh tempo kost yang sudah berjalan.
  timezone text,
  default_rent numeric(14, 2) not null check (default_rent >= 0),
  due_date_mode text not null default 'from_move_in_date'
    check (due_date_mode in ('from_move_in_date', 'fixed_day')),
  fixed_due_day smallint check (fixed_due_day between 1 and 31),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz,
  -- Tidak boleh ada properti berwilayah tanpa zona waktu, atau sebaliknya.
  constraint properties_region_timezone_together
    check ((region_id is null) = (timezone is null))
);

create table room_types (
  id uuid primary key default public.uuid_generate_v7(),
  property_id uuid not null references properties(id) on delete cascade,
  owner_id uuid not null references users(id) on delete cascade,
  name text not null,
  rent numeric(14, 2) not null check (rent >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

-- Urutan harga: rooms.rent_override > room_types.rent > properties.default_rent
create table rooms (
  id uuid primary key default public.uuid_generate_v7(),
  property_id uuid not null references properties(id) on delete cascade,
  owner_id uuid not null references users(id) on delete cascade,
  room_type_id uuid references room_types(id) on delete set null,
  room_number integer not null check (room_number > 0),
  label text,
  rent_override numeric(14, 2) check (rent_override >= 0),
  -- occupied dan reserved diperbarui otomatis dari penempatan kamar yang
  -- berlaku; sisanya ditetapkan pemilik.
  status text not null default 'vacant'
    check (status in ('vacant', 'occupied', 'reserved', 'under_construction', 'under_renovation', 'unavailable')),
  unavailable_reason text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz,
  unique (property_id, room_number)
);

-- Penghuni menempel pada properti, bukan pada satu kamar; kamar yang
-- ditempatinya dicatat di room_assignments dan boleh berubah.
-- name dan whatsapp_number boleh kosong karena baris bisa dianonimkan.
create table tenants (
  id uuid primary key default public.uuid_generate_v7(),
  property_id uuid not null references properties(id) on delete cascade,
  owner_id uuid not null references users(id) on delete cascade,
  user_id uuid references users(id) on delete set null,
  name text,
  whatsapp_number text,
  rent_unit text not null default 'monthly' check (rent_unit in ('monthly', 'weekly', 'daily')),
  unit_amount numeric(14, 2) not null check (unit_amount >= 0),
  unit_amount_is_override boolean not null default false,
  first_invoice_treatment text
    check (first_invoice_treatment in ('prorate', 'merge_forward', 'full_month')),
  moved_in_at date not null,
  moved_out_at date,
  next_due_date date,
  consent_at timestamptz,
  consent_version text,
  messaging_opted_out_at timestamptz,
  anonymized_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table room_assignments (
  id uuid primary key default public.uuid_generate_v7(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  room_id uuid not null references rooms(id) on delete restrict,
  owner_id uuid not null references users(id) on delete cascade,
  kind text not null default 'permanent' check (kind in ('permanent', 'temporary')),
  reason text,
  returns_to_room_id uuid references rooms(id) on delete restrict,
  started_on date not null,
  ended_on date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint room_assignments_period_valid check (ended_on is null or ended_on >= started_on),
  -- returns_to_room_id hanya berarti pada penempatan sementara.
  constraint room_assignments_returns_only_temporary
    check (returns_to_room_id is null or kind = 'temporary')
);

-- Satu penempatan berlaku per kamar, dan satu per penghuni: penghuni tidak
-- bisa menempati dua kamar sekaligus.
create unique index uq_room_assignments_active_room
  on room_assignments (room_id) where ended_on is null;
create unique index uq_room_assignments_active_tenant
  on room_assignments (tenant_id) where ended_on is null;

-- ============================================================
-- 8. LANGGANAN (didahulukan karena messages menunjuk subscriptions)
-- ============================================================

-- not_subscribed ada di sini bukan karena ia sebuah paket, tetapi supaya hak
-- akses fitur punya satu mekanisme, bukan dua.
create table plans (
  id uuid primary key default public.uuid_generate_v7(),
  code text not null unique check (code in ('not_subscribed', 'starter', 'pro', 'business')),
  name text not null,
  is_purchasable boolean not null,
  price_per_room numeric(14, 2) not null check (price_per_room >= 0),
  minimum_monthly_amount numeric(14, 2) not null check (minimum_monthly_amount >= 0),
  maximum_rooms integer check (maximum_rooms > 0),
  maximum_properties integer check (maximum_properties > 0),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table plan_features (
  id uuid primary key default public.uuid_generate_v7(),
  plan_id uuid not null references plans(id) on delete cascade,
  feature_key text not null,
  enabled boolean not null,
  limit_value integer,
  created_at timestamptz not null default now(),
  unique (plan_id, feature_key)
);

-- grace_period_ends_at dan cancellation_effective_at menjawab hal yang sama
-- dari dua arah: pengiriman tidak boleh mati karena kejadian yang bukan
-- keputusan pemilik.
create table subscriptions (
  id uuid primary key default public.uuid_generate_v7(),
  owner_id uuid not null unique references users(id) on delete cascade,
  plan_id uuid not null references plans(id) on delete restrict,
  status text not null check (status in ('trial', 'active', 'grace_period', 'not_subscribed')),
  billing_cycle text check (billing_cycle in ('monthly', 'yearly')),
  trial_started_at date,
  trial_ends_at date,
  current_period_start date,
  current_period_end date,
  grace_period_ends_at date,
  cancellation_requested_at timestamptz,
  cancellation_effective_at date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================================
-- 5. PENAGIHAN
-- ============================================================

-- discount_invoice_id-nya diisi setelah tagihan dibuat (tiga langkah dalam
-- satu transaksi), karena kelompok dan tagihan saling menunjuk.
create table multi_period_groups (
  id uuid primary key default public.uuid_generate_v7(),
  tenant_id uuid not null references tenants(id) on delete restrict,
  owner_id uuid not null references users(id) on delete cascade,
  discount_invoice_id uuid,
  period_count smallint not null check (period_count > 1),
  amount_before_discount numeric(14, 2) not null check (amount_before_discount >= 0),
  discount_kind text not null check (discount_kind in ('fixed_amount', 'percentage')),
  discount_value numeric(14, 2) not null check (discount_value >= 0),
  amount_after_discount numeric(14, 2) not null check (amount_after_discount >= 0),
  created_by uuid not null references users(id) on delete restrict,
  created_at timestamptz not null default now()
);

-- Nomor tagihan diambil dengan mengunci baris ini di dalam transaksi yang sama
-- dengan pembuatan tagihan. MAX(invoice_number) + 1 menghasilkan nomor kembar
-- saat dua cron berjalan bersamaan.
create table invoice_counters (
  id uuid primary key default public.uuid_generate_v7(),
  owner_id uuid not null references users(id) on delete cascade,
  period text not null check (period ~ '^[0-9]{6}$'),
  last_number integer not null default 0 check (last_number >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (owner_id, period)
);

-- Snapshot nama dan nomor penghuni membuat kuitansi lama tetap utuh setelah
-- data penghuni dianonimkan atas permintaan penghapusan data.
create table invoices (
  id uuid primary key default public.uuid_generate_v7(),
  room_id uuid not null references rooms(id) on delete restrict,
  tenant_id uuid not null references tenants(id) on delete restrict,
  owner_id uuid not null references users(id) on delete cascade,
  parent_invoice_id uuid references invoices(id) on delete restrict,
  multi_period_group_id uuid references multi_period_groups(id) on delete restrict,
  period_sequence smallint check (period_sequence > 0),
  invoice_number text not null,
  tenant_name_snapshot text not null,
  tenant_whatsapp_number_snapshot text not null,
  rent_unit text not null check (rent_unit in ('monthly', 'weekly', 'daily')),
  period_start date not null,
  period_end date not null,
  period_label text not null,
  due_date date not null,
  subtotal numeric(14, 2) not null check (subtotal >= 0),
  discount_total numeric(14, 2) not null default 0 check (discount_total >= 0),
  total_amount numeric(14, 2) not null check (total_amount >= 0),
  amount_paid numeric(14, 2) not null default 0 check (amount_paid >= 0),
  currency text not null default 'IDR',
  status text not null default 'draft'
    check (status in ('draft', 'sent', 'partially_paid', 'paid', 'overdue', 'defaulted', 'cancelled')),
  idempotency_key text not null unique,
  sent_at timestamptz,
  paid_at timestamptz,
  overdue_at timestamptz,
  defaulted_at timestamptz,
  cancelled_at timestamptz,
  cancellation_reason text check (cancellation_reason in ('owner_cancelled', 'early_checkout_refund')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint invoices_period_valid check (period_end >= period_start),
  constraint invoices_amount_paid_within_total check (amount_paid <= total_amount),
  unique (owner_id, invoice_number)
);

alter table multi_period_groups
  add constraint multi_period_groups_discount_invoice_id_fkey
  foreign key (discount_invoice_id) references invoices(id) on delete set null;

-- amount boleh negatif: seluruh diskon masuk sebagai satu baris bernilai
-- negatif pada tagihan periode pertama.
create table invoice_items (
  id uuid primary key default public.uuid_generate_v7(),
  invoice_id uuid not null references invoices(id) on delete cascade,
  kind text not null check (kind in ('rent', 'prorate', 'discount', 'adjustment')),
  description text not null,
  amount numeric(14, 2) not null,
  metadata jsonb,
  created_at timestamptz not null default now(),
  constraint invoice_items_discount_is_negative
    check (kind <> 'discount' or amount < 0)
);

-- ============================================================
-- 6. PEMBAYARAN
-- ============================================================

create table payment_links (
  id uuid primary key default public.uuid_generate_v7(),
  invoice_id uuid not null references invoices(id) on delete cascade,
  xendit_invoice_id text not null unique,
  url text not null,
  amount numeric(14, 2) not null check (amount >= 0),
  status text not null check (status in ('active', 'paid', 'expired', 'cancelled')),
  expires_at timestamptz,
  superseded_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Hanya satu link pembayaran berlaku per tagihan.
create unique index uq_payment_links_active_invoice
  on payment_links (invoice_id) where superseded_at is null and status = 'active';

create table payments (
  id uuid primary key default public.uuid_generate_v7(),
  invoice_id uuid not null references invoices(id) on delete restrict,
  owner_id uuid not null references users(id) on delete cascade,
  payment_link_id uuid references payment_links(id) on delete set null,
  source text not null check (source in ('xendit', 'cash', 'direct_transfer')),
  -- Bawaannya false supaya hak tulis kolom ini bisa dicabut dari klien tanpa
  -- membuat pencatatan pembayaran manual gagal: yang tidak menyebutkannya
  -- otomatis tercatat sebagai klaim pemilik, bukan pemastian Xendit.
  is_auto_verified boolean not null default false,
  amount numeric(14, 2) not null check (amount >= 0),
  currency text not null default 'IDR',
  status text not null check (status in ('pending', 'settled', 'failed')),
  provider_reference text unique,
  provider_fee numeric(14, 2) check (provider_fee >= 0),
  provider_payload jsonb,
  idempotency_key text not null unique,
  recorded_by uuid references users(id) on delete set null,
  note text,
  paid_at timestamptz not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  -- Hanya pembayaran lewat Xendit yang bisa mengaku dipastikan sistem.
  -- Tanpa ini, penandaan lunas manual bisa menyamar sebagai pembayaran
  -- terverifikasi dan KPI pelunasan otomatis versus manual (PRD §14) kehilangan
  -- artinya.
  constraint payments_auto_verified_only_xendit
    check (is_auto_verified = false or source = 'xendit')
);

-- ============================================================
-- 7. PESAN WHATSAPP
-- ============================================================

-- Salah masuk kategori marketing menaikkan tarif dari Rp356,65 ke Rp586,33
-- per pesan, jadi kategorinya disimpan sebagai data yang bisa diperiksa.
create table message_templates (
  id uuid primary key default public.uuid_generate_v7(),
  code text not null unique,
  category text not null check (category in ('utility', 'authentication')),
  language text not null default 'id',
  meta_template_name text,
  status text not null check (status in ('pending_review', 'approved', 'rejected', 'paused')),
  version smallint not null check (version > 0),
  approved_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Tarif disimpan sebagai data beserta tanggal berlakunya supaya laporan biaya
-- historis tetap benar setelah tarif naik.
create table message_rates (
  id uuid primary key default public.uuid_generate_v7(),
  market text not null default 'Indonesia',
  category text not null check (category in ('utility', 'authentication', 'marketing')),
  rate_per_message numeric(14, 2) not null check (rate_per_message >= 0),
  currency text not null default 'IDR',
  effective_from date not null,
  effective_to date,
  source_url text,
  read_at date not null,
  created_at timestamptz not null default now(),
  constraint message_rates_period_valid check (effective_to is null or effective_to >= effective_from),
  unique (market, category, effective_from)
);

-- Satu tabel untuk semua pesan keluar: satu jalur pengiriman, satu cara
-- penagihan, jadi biaya pesan per kost per bulan terjawab dari satu tempat.
create table messages (
  id uuid primary key default public.uuid_generate_v7(),
  template_id uuid not null references message_templates(id) on delete restrict,
  template_version smallint not null check (template_version > 0),
  owner_id uuid not null references users(id) on delete cascade,
  invoice_id uuid references invoices(id) on delete cascade,
  property_id uuid references properties(id) on delete cascade,
  login_code_id uuid references login_codes(id) on delete cascade,
  subscription_id uuid references subscriptions(id) on delete cascade,
  recipient_user_id uuid references users(id) on delete set null,
  recipient_whatsapp_number text not null,
  kind text not null check (kind in (
    'invoice', 'reminder_day_plus_2', 'reminder_day_plus_3', 'reminder_day_plus_7',
    'periodic_summary', 'login_code', 'sample_invoice', 'subscription_payment_failed'
  )),
  payload jsonb not null,
  status text not null default 'scheduled'
    check (status in ('scheduled', 'sent', 'delivered', 'failed', 'cancelled')),
  scheduled_at timestamptz not null,
  sent_at timestamptz,
  delivered_at timestamptz,
  failed_at timestamptz,
  cancelled_at timestamptz,
  error_code text,
  whatsapp_message_id text unique,
  is_billable boolean,
  pricing_category text,
  pricing_type text,
  charged_amount numeric(14, 2) check (charged_amount >= 0),
  message_rate_id uuid references message_rates(id) on delete restrict,
  idempotency_key text not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  -- Tepat satu konteks terisi.
  constraint messages_exactly_one_context check (
    (invoice_id is not null)::int
    + (property_id is not null)::int
    + (login_code_id is not null)::int
    + (subscription_id is not null)::int = 1
  )
);

-- ============================================================
-- 8b. TAGIHAN LANGGANAN
-- ============================================================

-- Tagihan Semang kepada pemilik. Snapshot okupansi disimpan, bukan dihitung
-- ulang, supaya tagihan tiga bulan lalu tetap bisa dipertanggungjawabkan.
create table subscription_invoices (
  id uuid primary key default public.uuid_generate_v7(),
  subscription_id uuid not null references subscriptions(id) on delete restrict,
  owner_id uuid not null references users(id) on delete cascade,
  plan_id uuid not null references plans(id) on delete restrict,
  period_start date not null,
  period_end date not null,
  billing_cycle text not null check (billing_cycle in ('monthly', 'yearly')),
  occupied_rooms_snapshot integer not null check (occupied_rooms_snapshot >= 0),
  snapshot_taken_at date not null,
  price_per_room numeric(14, 2) not null check (price_per_room >= 0),
  computed_amount numeric(14, 2) not null check (computed_amount >= 0),
  minimum_monthly_applied boolean not null,
  discount_amount numeric(14, 2) not null default 0 check (discount_amount >= 0),
  total_amount numeric(14, 2) not null check (total_amount >= 0),
  status text not null check (status in ('open', 'paid', 'failed', 'cancelled')),
  provider_reference text unique,
  failure_reason text,
  attempt_count smallint not null default 0 check (attempt_count >= 0),
  last_attempt_at timestamptz,
  paid_at timestamptz,
  idempotency_key text not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint subscription_invoices_period_valid check (period_end >= period_start)
);

-- ============================================================
-- 9. AKSES PUBLIK, JEJAK AKSI & INTEGRASI
-- ============================================================

-- Kuitansi tidak punya tabel: ia disusun saat tautannya dibuka, langsung dari
-- invoices dan payments.
create table public_tokens (
  id uuid primary key default public.uuid_generate_v7(),
  kind text not null check (kind in ('tenant_self_fill', 'receipt', 'payment')),
  target_type text not null check (target_type in ('room', 'invoice')),
  target_id uuid not null,
  owner_id uuid not null references users(id) on delete cascade,
  token_hash text not null unique,
  expires_at timestamptz not null,
  used_at timestamptz,
  revoked_at timestamptz,
  created_at timestamptz not null default now()
);

-- Satu tabel jejak untuk semua entitas. actor_id kosong berarti tindakan oleh
-- sistem, bukan oleh orang.
create table audit_events (
  id uuid primary key default public.uuid_generate_v7(),
  entity_type text not null check (entity_type in (
    'invoice', 'payment', 'user', 'subscription', 'tenant',
    'property', 'room_type', 'room', 'room_assignment'
  )),
  entity_id uuid not null,
  owner_id uuid references users(id) on delete cascade,
  actor_id uuid references users(id) on delete set null,
  event_type text not null,
  from_status text,
  to_status text,
  metadata jsonb,
  created_at timestamptz not null default now()
);

-- Tabel, bukan view: baris messages dihapus setelah 24 bulan, sementara
-- riwayat biayanya masih dibutuhkan untuk menilai harga paket.
create table message_cost_months (
  id uuid primary key default public.uuid_generate_v7(),
  owner_id uuid not null references users(id) on delete cascade,
  property_id uuid references properties(id) on delete cascade,
  month date not null,
  delivered_count integer not null default 0 check (delivered_count >= 0),
  billable_count integer not null default 0 check (billable_count >= 0),
  charged_amount numeric(14, 2) not null default 0 check (charged_amount >= 0),
  summarised_at timestamptz not null default now(),
  constraint message_cost_months_month_is_first_day check (month = date_trunc('month', month)::date),
  -- NULLS NOT DISTINCT: baris tanpa properti dihitung sebagai satu kelompok
  -- tersendiri, bukan sebagai baris yang selalu berbeda dari dirinya sendiri.
  unique nulls not distinct (owner_id, property_id, month)
);

-- Webhook dicatat lebih dulu, diproses kemudian.
create table webhook_events (
  id uuid primary key default public.uuid_generate_v7(),
  source text not null check (source in ('xendit', 'meta')),
  event_type text not null,
  external_id text not null unique,
  payload jsonb not null,
  processed boolean not null default false,
  attempt_count integer not null default 0 check (attempt_count >= 0),
  last_error text,
  processed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================================
-- 12. JALUR PERLUASAN TAHAP 2 — tabel ada, belum diisi
-- ============================================================

create table property_staff (
  id uuid primary key default public.uuid_generate_v7(),
  property_id uuid not null references properties(id) on delete cascade,
  owner_id uuid not null references users(id) on delete cascade,
  user_id uuid not null references users(id) on delete cascade,
  role text not null check (role in ('caretaker', 'manager')),
  invited_at timestamptz,
  accepted_at timestamptz,
  revoked_at timestamptz,
  created_at timestamptz not null default now()
);

create table maintenance_tickets (
  id uuid primary key default public.uuid_generate_v7(),
  room_id uuid not null references rooms(id) on delete cascade,
  owner_id uuid not null references users(id) on delete cascade,
  reported_by_tenant_id uuid references tenants(id) on delete set null,
  title text not null,
  description text,
  status text not null check (status in ('open', 'in_progress', 'resolved', 'closed')),
  priority text not null check (priority in ('low', 'normal', 'high')),
  assigned_to uuid references users(id) on delete set null,
  resolved_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Satu-satunya fitur yang mengembalikan kebutuhan penyimpanan berkas.
-- Komponen penyimpanannya ditambahkan saat fitur ini dibangun.
create table meter_readings (
  id uuid primary key default public.uuid_generate_v7(),
  room_id uuid not null references rooms(id) on delete cascade,
  owner_id uuid not null references users(id) on delete cascade,
  reading_date date not null,
  kilowatt_hours numeric(10, 2) not null check (kilowatt_hours >= 0),
  photo_storage_key text,
  recorded_by uuid references users(id) on delete set null,
  invoice_item_id uuid references invoice_items(id) on delete set null,
  created_at timestamptz not null default now()
);

-- ============================================================
-- INDEKS
--
-- Setiap foreign key punya indeks: Postgres tidak membuatnya otomatis, dan
-- tanpa indeks penghapusan baris induk memicu pemindaian penuh tabel anak.
-- ============================================================

create index idx_auth_identities_user_id on auth_identities (user_id);
create index idx_login_codes_user_id on login_codes (user_id);
create index idx_login_codes_whatsapp_number on login_codes (whatsapp_number, created_at desc);
create index idx_request_limits_blocked_until on request_limits (blocked_until) where blocked_until is not null;
create index idx_bank_accounts_user_id on bank_accounts (user_id);
create index idx_xendit_sub_accounts_settlement_bank_account_id
  on xendit_sub_accounts (settlement_bank_account_id);

create index idx_regions_province_id on regions (province_id);
create index idx_regions_superseded_by_region_id on regions (superseded_by_region_id);

create index idx_properties_owner_id on properties (owner_id);
create index idx_properties_region_id on properties (region_id);
create index idx_room_types_property_id on room_types (property_id);
create index idx_room_types_owner_id on room_types (owner_id);
create index idx_rooms_property_id on rooms (property_id);
create index idx_rooms_owner_id on rooms (owner_id);
create index idx_rooms_room_type_id on rooms (room_type_id);
create index idx_tenants_property_id on tenants (property_id);
create index idx_tenants_owner_id on tenants (owner_id);
create index idx_tenants_user_id on tenants (user_id);
-- Penagihan langganan menghitung penghuni aktif, bukan kamar terisi.
create index idx_tenants_active on tenants (owner_id) where moved_out_at is null;
create index idx_room_assignments_tenant_id on room_assignments (tenant_id);
create index idx_room_assignments_room_id on room_assignments (room_id);
create index idx_room_assignments_owner_id on room_assignments (owner_id);
create index idx_room_assignments_returns_to_room_id on room_assignments (returns_to_room_id);

create index idx_multi_period_groups_tenant_id on multi_period_groups (tenant_id);
create index idx_multi_period_groups_owner_id on multi_period_groups (owner_id);
create index idx_multi_period_groups_discount_invoice_id on multi_period_groups (discount_invoice_id);
create index idx_multi_period_groups_created_by on multi_period_groups (created_by);
create index idx_invoice_counters_owner_id on invoice_counters (owner_id);

create index idx_invoices_owner_id on invoices (owner_id);
create index idx_invoices_room_id on invoices (room_id);
create index idx_invoices_tenant_id on invoices (tenant_id);
create index idx_invoices_parent_invoice_id on invoices (parent_invoice_id);
create index idx_invoices_multi_period_group_id on invoices (multi_period_group_id);
-- Cron yang menandai telat dan menunggak.
create index idx_invoices_due_date_status on invoices (due_date, status);
create index idx_invoice_items_invoice_id on invoice_items (invoice_id);

create index idx_payment_links_invoice_id on payment_links (invoice_id);
create index idx_payments_invoice_id on payments (invoice_id);
create index idx_payments_owner_id on payments (owner_id);
create index idx_payments_payment_link_id on payments (payment_link_id);
create index idx_payments_recorded_by on payments (recorded_by);

create index idx_messages_template_id on messages (template_id);
create index idx_messages_owner_id on messages (owner_id);
create index idx_messages_invoice_id on messages (invoice_id);
create index idx_messages_property_id on messages (property_id);
create index idx_messages_login_code_id on messages (login_code_id);
create index idx_messages_subscription_id on messages (subscription_id);
create index idx_messages_recipient_user_id on messages (recipient_user_id);
create index idx_messages_message_rate_id on messages (message_rate_id);
-- Cron pengirim.
create index idx_messages_scheduled_at_status on messages (scheduled_at, status);
-- Rekap biaya bulanan.
create index idx_messages_sent_at on messages (sent_at);

create index idx_plan_features_plan_id on plan_features (plan_id);
create index idx_subscriptions_plan_id on subscriptions (plan_id);
create index idx_subscription_invoices_subscription_id on subscription_invoices (subscription_id);
create index idx_subscription_invoices_owner_id on subscription_invoices (owner_id);
create index idx_subscription_invoices_plan_id on subscription_invoices (plan_id);

create index idx_public_tokens_owner_id on public_tokens (owner_id);
create index idx_public_tokens_target on public_tokens (target_type, target_id);
create index idx_public_tokens_expires_at on public_tokens (expires_at);
create index idx_audit_events_entity on audit_events (entity_type, entity_id, created_at desc);
create index idx_audit_events_owner_id on audit_events (owner_id);
create index idx_audit_events_actor_id on audit_events (actor_id);
create index idx_message_cost_months_owner_id on message_cost_months (owner_id);
create index idx_message_cost_months_property_id on message_cost_months (property_id);
create index idx_webhook_events_unprocessed on webhook_events (created_at) where processed = false;

create index idx_property_staff_property_id on property_staff (property_id);
create index idx_property_staff_owner_id on property_staff (owner_id);
create index idx_property_staff_user_id on property_staff (user_id);
create index idx_maintenance_tickets_room_id on maintenance_tickets (room_id);
create index idx_maintenance_tickets_owner_id on maintenance_tickets (owner_id);
create index idx_maintenance_tickets_reported_by_tenant_id on maintenance_tickets (reported_by_tenant_id);
create index idx_maintenance_tickets_assigned_to on maintenance_tickets (assigned_to);
create index idx_meter_readings_room_id on meter_readings (room_id);
create index idx_meter_readings_owner_id on meter_readings (owner_id);
create index idx_meter_readings_recorded_by on meter_readings (recorded_by);
create index idx_meter_readings_invoice_item_id on meter_readings (invoice_item_id);
