-- ============================================================
-- Aturan integritas yang ditegakkan di database (ERD §10).
--
-- Cron dan webhook bisa berjalan bersamaan, jadi hal-hal berikut tidak cukup
-- dijaga di kode aplikasi.
-- ============================================================

-- ------------------------------------------------------------
-- updated_at
-- ------------------------------------------------------------

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = pg_catalog.now();
  return new;
end;
$$;

create trigger trg_users_updated_at before update on users
  for each row execute function public.set_updated_at();
create trigger trg_request_limits_updated_at before update on request_limits
  for each row execute function public.set_updated_at();
create trigger trg_bank_accounts_updated_at before update on bank_accounts
  for each row execute function public.set_updated_at();
create trigger trg_xendit_sub_accounts_updated_at before update on xendit_sub_accounts
  for each row execute function public.set_updated_at();
create trigger trg_provinces_updated_at before update on provinces
  for each row execute function public.set_updated_at();
create trigger trg_regions_updated_at before update on regions
  for each row execute function public.set_updated_at();
create trigger trg_properties_updated_at before update on properties
  for each row execute function public.set_updated_at();
create trigger trg_room_types_updated_at before update on room_types
  for each row execute function public.set_updated_at();
create trigger trg_rooms_updated_at before update on rooms
  for each row execute function public.set_updated_at();
create trigger trg_tenants_updated_at before update on tenants
  for each row execute function public.set_updated_at();
create trigger trg_room_assignments_updated_at before update on room_assignments
  for each row execute function public.set_updated_at();
create trigger trg_invoice_counters_updated_at before update on invoice_counters
  for each row execute function public.set_updated_at();
create trigger trg_invoices_updated_at before update on invoices
  for each row execute function public.set_updated_at();
create trigger trg_payment_links_updated_at before update on payment_links
  for each row execute function public.set_updated_at();
create trigger trg_payments_updated_at before update on payments
  for each row execute function public.set_updated_at();
create trigger trg_message_templates_updated_at before update on message_templates
  for each row execute function public.set_updated_at();
create trigger trg_messages_updated_at before update on messages
  for each row execute function public.set_updated_at();
create trigger trg_plans_updated_at before update on plans
  for each row execute function public.set_updated_at();
create trigger trg_subscriptions_updated_at before update on subscriptions
  for each row execute function public.set_updated_at();
create trigger trg_subscription_invoices_updated_at before update on subscription_invoices
  for each row execute function public.set_updated_at();
create trigger trg_webhook_events_updated_at before update on webhook_events
  for each row execute function public.set_updated_at();
create trigger trg_maintenance_tickets_updated_at before update on maintenance_tickets
  for each row execute function public.set_updated_at();

-- ------------------------------------------------------------
-- owner_id salinan cocok dengan induknya
--
-- owner_id sengaja disalin ke banyak tabel supaya tiap kebijakan Row Level
-- Security cukup satu perbandingan berindeks. Penyalinan selalu berisiko
-- melenceng, jadi kecocokannya diperiksa saat baris dibuat: kolom salinan yang
-- bisa berbeda dari sumbernya lebih berbahaya daripada join yang lambat.
--
-- Argumen trigger: (nama tabel induk, kolom pemilik di induk, kolom penunjuk
-- di tabel anak).
-- ------------------------------------------------------------

create or replace function public.assert_owner_matches_parent()
returns trigger
language plpgsql
set search_path = ''
as $$
declare
  parent_table text := tg_argv[0];
  parent_owner_column text := tg_argv[1];
  child_reference_column text := tg_argv[2];
  parent_id uuid;
  parent_owner uuid;
begin
  parent_id := (to_jsonb(new) ->> child_reference_column)::uuid;

  if parent_id is null then
    return new;
  end if;

  execute format('select %I from public.%I where id = $1', parent_owner_column, parent_table)
    into parent_owner
    using parent_id;

  if parent_owner is distinct from new.owner_id then
    raise exception
      'owner_id % pada %.% tidak cocok dengan %.% milik induknya (%)',
      new.owner_id, tg_table_name, child_reference_column,
      parent_table, parent_owner_column, parent_owner;
  end if;

  return new;
end;
$$;

create trigger trg_room_types_owner_matches before insert or update on room_types
  for each row execute function public.assert_owner_matches_parent('properties', 'owner_id', 'property_id');
create trigger trg_rooms_owner_matches before insert or update on rooms
  for each row execute function public.assert_owner_matches_parent('properties', 'owner_id', 'property_id');
create trigger trg_tenants_owner_matches before insert or update on tenants
  for each row execute function public.assert_owner_matches_parent('properties', 'owner_id', 'property_id');
create trigger trg_room_assignments_owner_matches before insert or update on room_assignments
  for each row execute function public.assert_owner_matches_parent('tenants', 'owner_id', 'tenant_id');
create trigger trg_multi_period_groups_owner_matches before insert or update on multi_period_groups
  for each row execute function public.assert_owner_matches_parent('tenants', 'owner_id', 'tenant_id');
create trigger trg_invoices_owner_matches before insert or update on invoices
  for each row execute function public.assert_owner_matches_parent('rooms', 'owner_id', 'room_id');
create trigger trg_payments_owner_matches before insert or update on payments
  for each row execute function public.assert_owner_matches_parent('invoices', 'owner_id', 'invoice_id');
create trigger trg_subscription_invoices_owner_matches before insert or update on subscription_invoices
  for each row execute function public.assert_owner_matches_parent('subscriptions', 'owner_id', 'subscription_id');
create trigger trg_property_staff_owner_matches before insert or update on property_staff
  for each row execute function public.assert_owner_matches_parent('properties', 'owner_id', 'property_id');
create trigger trg_maintenance_tickets_owner_matches before insert or update on maintenance_tickets
  for each row execute function public.assert_owner_matches_parent('rooms', 'owner_id', 'room_id');
create trigger trg_meter_readings_owner_matches before insert or update on meter_readings
  for each row execute function public.assert_owner_matches_parent('rooms', 'owner_id', 'room_id');

-- ------------------------------------------------------------
-- Penyewa hanya masuk ke kamar kosong
--
-- Inilah yang menutup celah paket: kamar yang dibiarkan berstatus
-- under_construction untuk menghindari batas paket juga tidak bisa
-- menghasilkan apa pun.
-- ------------------------------------------------------------

create or replace function public.assert_room_is_assignable()
returns trigger
language plpgsql
set search_path = ''
as $$
declare
  room_status text;
begin
  select status into room_status from public.rooms where id = new.room_id for update;

  if room_status = 'vacant' then
    return new;
  end if;

  -- Pengecualian tunggal: penghuni kembali ke kamar asalnya, yang berstatus
  -- reserved justru karena ia sedang menumpang di kamar lain.
  if room_status = 'reserved' and exists (
    select 1
    from public.room_assignments a
    where a.tenant_id = new.tenant_id
      and a.returns_to_room_id = new.room_id
  ) then
    return new;
  end if;

  raise exception 'Kamar % berstatus % dan tidak bisa ditempati', new.room_id, room_status;
end;
$$;

create trigger trg_room_assignments_room_assignable before insert on room_assignments
  for each row execute function public.assert_room_is_assignable();

-- ------------------------------------------------------------
-- rooms.status mengikuti penempatan yang berlaku
--
-- Diperbarui lewat trigger, bukan diisi aplikasi: kamar asal harus berhenti
-- tampil sebagai kamar tersedia selama penghuninya menumpang di kamar lain.
-- ------------------------------------------------------------

create or replace function public.sync_room_status_from_assignment()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if tg_op = 'INSERT' then
    update public.rooms set status = 'occupied' where id = new.room_id;

    if new.kind = 'temporary' and new.returns_to_room_id is not null then
      update public.rooms set status = 'reserved' where id = new.returns_to_room_id;
    end if;

    return null;
  end if;

  -- Penempatan berakhir.
  if old.ended_on is null and new.ended_on is not null then
    update public.rooms set status = 'vacant'
      where id = new.room_id and status in ('occupied', 'reserved');

    if new.returns_to_room_id is not null then
      update public.rooms set status = 'vacant'
        where id = new.returns_to_room_id and status = 'reserved';
    end if;
  end if;

  -- Penempatan sementara menjadi permanen: kamar asal berhenti ditahan.
  if old.kind = 'temporary' and new.kind = 'permanent' and old.returns_to_room_id is not null then
    update public.rooms set status = 'vacant'
      where id = old.returns_to_room_id and status = 'reserved';
  end if;

  return null;
end;
$$;

create trigger trg_room_assignments_sync_room_status
  after insert or update on room_assignments
  for each row execute function public.sync_room_status_from_assignment();
