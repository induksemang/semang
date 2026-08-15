-- ============================================================
-- Membuang skema v1 sepenuhnya.
--
-- Skema v1 dan ERD v2.0 tidak punya jalur ALTER yang masuk akal: nama tabel,
-- nama kolom, tipe uang (bigint -> numeric(14,2)), dan bentuk relasinya
-- berbeda. Produk belum rilis dan tidak ada baris produksi, jadi membangun
-- ulang lebih aman daripada merangkai puluhan ALTER yang tidak pernah teruji.
-- ============================================================

drop trigger if exists trg_users_updated_at on users;
drop trigger if exists trg_bank_accounts_updated_at on bank_accounts;
drop trigger if exists trg_properties_updated_at on properties;
drop trigger if exists trg_rooms_updated_at on rooms;
drop trigger if exists trg_tenants_updated_at on tenants;
drop trigger if exists trg_invoices_updated_at on invoices;
drop trigger if exists trg_payments_updated_at on payments;
drop trigger if exists trg_plans_updated_at on plans;
drop trigger if exists trg_subscriptions_updated_at on subscriptions;

drop table if exists webhook_logs cascade;
drop table if exists public_tokens cascade;
drop table if exists notifications cascade;
drop table if exists invoice_events cascade;
drop table if exists payments cascade;
drop table if exists proofs cascade;
drop table if exists invoice_items cascade;
drop table if exists invoices cascade;
drop table if exists tenants cascade;
drop table if exists rooms cascade;
drop table if exists property_staff cascade;
drop table if exists properties cascade;
drop table if exists subscription_addons cascade;
drop table if exists subscriptions cascade;
drop table if exists plan_features cascade;
drop table if exists plans cascade;
drop table if exists bank_accounts cascade;
drop table if exists users cascade;

drop function if exists update_updated_at() cascade;
