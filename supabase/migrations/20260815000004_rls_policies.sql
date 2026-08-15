-- ============================================================
-- Row Level Security
--
-- Semua kebijakan memakai owner_id pada tabel itu sendiri, bukan menaiki
-- rantai properti, supaya biayanya satu perbandingan berindeks per baris.
-- auth.uid() dibungkus subkueri agar planner mengevaluasinya sekali per
-- kueri, bukan sekali per baris.
--
-- Pengecualian: invoice_items dan payment_links hanya pernah dibaca lewat
-- tagihan induknya, jadi kebijakannya menumpang kebijakan invoices.
-- ============================================================

alter table users enable row level security;
alter table auth_identities enable row level security;
alter table login_codes enable row level security;
alter table request_limits enable row level security;
alter table bank_accounts enable row level security;
alter table xendit_sub_accounts enable row level security;
alter table provinces enable row level security;
alter table regions enable row level security;
alter table properties enable row level security;
alter table room_types enable row level security;
alter table rooms enable row level security;
alter table tenants enable row level security;
alter table room_assignments enable row level security;
alter table multi_period_groups enable row level security;
alter table invoice_counters enable row level security;
alter table invoices enable row level security;
alter table invoice_items enable row level security;
alter table payment_links enable row level security;
alter table payments enable row level security;
alter table message_templates enable row level security;
alter table message_rates enable row level security;
alter table messages enable row level security;
alter table plans enable row level security;
alter table plan_features enable row level security;
alter table subscriptions enable row level security;
alter table subscription_invoices enable row level security;
alter table public_tokens enable row level security;
alter table audit_events enable row level security;
alter table message_cost_months enable row level security;
alter table webhook_events enable row level security;
alter table property_staff enable row level security;
alter table maintenance_tickets enable row level security;
alter table meter_readings enable row level security;

-- ------------------------------------------------------------
-- Identitas: baris milik sendiri
-- ------------------------------------------------------------

create policy "users: baris sendiri" on users
  for all to authenticated using (id = (select auth.uid()));

create policy "auth_identities: milik sendiri" on auth_identities
  for all to authenticated using (user_id = (select auth.uid()));

create policy "bank_accounts: milik sendiri" on bank_accounts
  for all to authenticated using (user_id = (select auth.uid()));

create policy "xendit_sub_accounts: milik sendiri" on xendit_sub_accounts
  for all to authenticated using (user_id = (select auth.uid()));

-- ------------------------------------------------------------
-- Data referensi: boleh dibaca siapa saja, tidak boleh diubah klien
-- ------------------------------------------------------------

create policy "provinces: baca publik" on provinces
  for select to anon, authenticated using (true);

create policy "regions: baca publik" on regions
  for select to anon, authenticated using (true);

create policy "plans: baca publik" on plans
  for select to anon, authenticated using (true);

create policy "plan_features: baca publik" on plan_features
  for select to anon, authenticated using (true);

-- ------------------------------------------------------------
-- Data pemilik: satu perbandingan berindeks pada owner_id
-- ------------------------------------------------------------

create policy "properties: pemilik" on properties
  for all to authenticated using (owner_id = (select auth.uid()));

create policy "room_types: pemilik" on room_types
  for all to authenticated using (owner_id = (select auth.uid()));

create policy "rooms: pemilik" on rooms
  for all to authenticated using (owner_id = (select auth.uid()));

create policy "tenants: pemilik" on tenants
  for all to authenticated using (owner_id = (select auth.uid()));

create policy "room_assignments: pemilik" on room_assignments
  for all to authenticated using (owner_id = (select auth.uid()));

create policy "multi_period_groups: pemilik" on multi_period_groups
  for all to authenticated using (owner_id = (select auth.uid()));

create policy "invoice_counters: pemilik" on invoice_counters
  for all to authenticated using (owner_id = (select auth.uid()));

create policy "invoices: pemilik" on invoices
  for all to authenticated using (owner_id = (select auth.uid()));

create policy "payments: pemilik" on payments
  for all to authenticated using (owner_id = (select auth.uid()));

create policy "messages: pemilik" on messages
  for all to authenticated using (owner_id = (select auth.uid()));

create policy "subscriptions: pemilik" on subscriptions
  for all to authenticated using (owner_id = (select auth.uid()));

create policy "subscription_invoices: pemilik" on subscription_invoices
  for all to authenticated using (owner_id = (select auth.uid()));

create policy "audit_events: pemilik" on audit_events
  for select to authenticated using (owner_id = (select auth.uid()));

create policy "message_cost_months: pemilik" on message_cost_months
  for select to authenticated using (owner_id = (select auth.uid()));

create policy "property_staff: pemilik" on property_staff
  for all to authenticated using (owner_id = (select auth.uid()));

create policy "maintenance_tickets: pemilik" on maintenance_tickets
  for all to authenticated using (owner_id = (select auth.uid()));

create policy "meter_readings: pemilik" on meter_readings
  for all to authenticated using (owner_id = (select auth.uid()));

-- ------------------------------------------------------------
-- Menumpang kebijakan invoices
-- ------------------------------------------------------------

create policy "invoice_items: lewat tagihan" on invoice_items
  for all to authenticated using (
    exists (
      select 1 from invoices
      where invoices.id = invoice_items.invoice_id
        and invoices.owner_id = (select auth.uid())
    )
  );

create policy "payment_links: lewat tagihan" on payment_links
  for all to authenticated using (
    exists (
      select 1 from invoices
      where invoices.id = payment_links.invoice_id
        and invoices.owner_id = (select auth.uid())
    )
  );

-- ------------------------------------------------------------
-- Tanpa akses klien sama sekali
--
-- Tabel-tabel ini hanya disentuh service role: endpoint kode masuk, cron
-- pengirim, penerima webhook, dan halaman publik yang dibuka lewat token.
-- Tidak ada kebijakan berarti tidak ada baris yang lolos, sekaligus menutup
-- jalur pembacaan token dan hash kode dari sisi klien.
-- ------------------------------------------------------------

-- login_codes, request_limits, message_templates, message_rates,
-- webhook_events, dan public_tokens sengaja dibiarkan tanpa kebijakan.

-- ============================================================
-- HAK AKSES TABEL
--
-- Kebijakan RLS menyaring baris; GRANT menentukan apakah tabelnya boleh
-- disentuh sama sekali. Keduanya harus ada. Supabase tidak lagi mengekspos
-- tabel baru secara otomatis ke anon, authenticated, dan service_role, dan
-- setelan lama yang melakukannya dihapus pada 30 Oktober 2026 — jadi tanpa
-- blok ini seluruh Data API menjawab "permission denied", bukan daftar kosong.
--
-- Tabel yang tidak disebut di sini hanya bisa disentuh service_role:
-- login_codes, request_limits, message_templates, message_rates,
-- webhook_events, dan public_tokens.
-- ============================================================

grant usage on schema public to anon, authenticated, service_role;

-- service_role melewati RLS dan menjalankan cron, webhook, serta halaman yang
-- dibuka lewat token publik.
grant all on all tables in schema public to service_role;

-- Data referensi: dibaca saat memilih wilayah dan menampilkan harga paket,
-- termasuk sebelum pemilik masuk.
grant select on provinces, regions, plans, plan_features to anon, authenticated;

-- Data pemilik yang memang diubah dari antarmuka.
grant select, insert, update, delete on
  bank_accounts,
  properties,
  room_types,
  rooms,
  room_assignments,
  multi_period_groups,
  invoice_counters,
  invoices,
  invoice_items,
  payment_links,
  maintenance_tickets,
  meter_readings
to authenticated;

-- Hanya boleh dibaca pemilik. Barisnya lahir dari cron, webhook, dan
-- penagihan langganan — bukan dari antarmuka. Memberi hak tulis di sini
-- berarti biaya pesan dan tagihan langganan bisa dikarang dari sisi klien.
grant select on
  messages,
  subscription_invoices,
  audit_events,
  message_cost_months
to authenticated;

-- ------------------------------------------------------------
-- Hak tulis yang sengaja dipersempit ke kolom tertentu
--
-- Empat tabel berikut memiliki kebijakan RLS yang benar — pemilik hanya
-- menyentuh barisnya sendiri — tetapi "barisnya sendiri" tidak cukup di sini,
-- karena isi kolomnya menentukan uang, identitas, dan penghapusan data.
-- Tanpa pembatasan kolom, pemilik dapat mengubah barisnya sendiri menjadi
-- sesuatu yang tidak pernah ia bayar atau tidak pernah ia buktikan.
-- ------------------------------------------------------------

-- Paket ditentukan penagihan, bukan pemilik. Dengan hak update penuh, satu
-- UPDATE mengubah paketnya menjadi business/active tanpa satu pun pembayaran.
-- Yang tersisa untuk pemilik hanya meminta berhenti berlangganan.
grant select on subscriptions to authenticated;
grant update (cancellation_requested_at) on subscriptions to authenticated;

-- Cara masuk hanya boleh ditambahkan oleh alur masuk itu sendiri. Dengan hak
-- insert, pemilik dapat mendaftarkan provider_subject milik orang lain ke
-- akunnya — dan karena (provider, provider_subject) unik, korban kehilangan
-- jalan masuknya sendiri.
grant select on auth_identities to authenticated;

-- Status verifikasi datang dari Xendit lewat webhook. Kalau pemilik bisa
-- menulisnya sendiri, ia dapat menyetel completed tanpa pernah diverifikasi,
-- dan pesan tagihan berubah memakai jalur pembayaran yang belum ada.
grant select on xendit_sub_accounts to authenticated;

-- Baris pengguna dibuat alur pendaftaran dan dihapus setelah tenggang 30 hari
-- (Kebijakan Privasi §8). Hak delete di sini membuat penghapusan seketika,
-- melewati tenggang itu, dan cascade-nya ikut membawa properti, kamar,
-- penyewa, dan seluruh tagihan. Pemilik memulai penghapusan dengan mengisi
-- deletion_requested_at; sisanya dikerjakan cron.
grant select on users to authenticated;
grant update (name, locale, deletion_requested_at) on users to authenticated;

-- Pencatatan pembayaran manual: seluruh kolom pembayaran boleh diisi kecuali
-- yang menyatakan pembayaran itu dipastikan Xendit. is_auto_verified tidak
-- disebut sehingga selalu jatuh ke bawaannya (false), dan kolom provider_*
-- tidak disebut supaya referensi penyedia tidak bisa dikarang dari klien.
grant select on payments to authenticated;
grant insert (
  invoice_id, owner_id, source, amount, currency, status,
  idempotency_key, recorded_by, note, paid_at
) on payments to authenticated;
grant update (status, note, paid_at) on payments to authenticated;
grant delete on payments to authenticated;

-- Data penyewa: semua boleh diubah pemilik kecuali user_id. Kolom itu
-- menautkan baris penyewa ke akun sungguhan saat portal penyewa hadir di
-- Tahap 2; kalau pemilik bisa mengisinya sendiri, ia dapat menautkan akun
-- orang lain ke penyewanya dan memberi orang itu akses yang tidak diminta.
grant select on tenants to authenticated;
grant insert (
  property_id, owner_id, name, whatsapp_number, rent_unit, unit_amount,
  unit_amount_is_override, first_invoice_treatment, moved_in_at, moved_out_at,
  next_due_date, consent_at, consent_version, messaging_opted_out_at,
  anonymized_at
) on tenants to authenticated;
grant update (
  name, whatsapp_number, rent_unit, unit_amount, unit_amount_is_override,
  first_invoice_treatment, moved_in_at, moved_out_at, next_due_date,
  consent_at, consent_version, messaging_opted_out_at, anonymized_at
) on tenants to authenticated;
grant delete on tenants to authenticated;

-- Akun penjaga kost baru hidup di Tahap 2 beserta alur undangannya. Sampai
-- alur itu ada, barisnya hanya dibuat service_role — hak tulis sekarang cuma
-- memberi cara menautkan user_id sembarang ke properti tanpa persetujuan
-- pemilik akun itu.
grant select on property_staff to authenticated;

-- ------------------------------------------------------------
-- Pembatas tambahan yang tidak bisa dinyatakan sebagai hak akses
-- ------------------------------------------------------------

-- Pembayaran yang datang dari Xendit adalah catatan penyedia, bukan catatan
-- pemilik. Menghapusnya membuat pembukuan tidak lagi cocok dengan uang yang
-- benar-benar masuk ke rekeningnya. Penandaan lunas manual tetap boleh
-- dibatalkan. Kebijakan restrictive di-AND-kan dengan kebijakan pemilik di
-- atas, jadi ia mempersempit, bukan memperluas.
create policy "payments: pembayaran xendit tidak dihapus dari klien"
  on payments as restrictive for delete to authenticated
  using (source <> 'xendit');
