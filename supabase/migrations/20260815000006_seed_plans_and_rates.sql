-- ============================================================
-- Data referensi: paket langganan, pembagian fiturnya, dan tarif pesan Meta.
--
-- Ketiganya masuk lewat migrasi, bukan seed, karena penagihan langganan dan
-- perhitungan biaya pesan membacanya di produksi.
-- ============================================================

-- ------------------------------------------------------------
-- Paket (PRD §12.1)
--
-- not_subscribed ada di sini bukan karena ia sebuah paket, tetapi supaya hak
-- akses fitur punya satu mekanisme. Batas kamar dan propertinya kosong:
-- berhenti berlangganan tidak pernah membatasi ukuran kost.
-- ------------------------------------------------------------

insert into plans (code, name, is_purchasable, price_per_room, minimum_monthly_amount, maximum_rooms, maximum_properties) values
  ('not_subscribed', 'Gratis',  false,    0.00,      0.00, null, null),
  ('starter',        'Starter', true,  2000.00,  20000.00,   15,    1),
  ('pro',            'Pro',     true,  3500.00,      0.00,   50,    3),
  ('business',       'Bisnis',  true,  5000.00, 250000.00, null, null)
on conflict (code) do nothing;

-- ------------------------------------------------------------
-- Pembagian fitur (PRD §12.2)
--
-- Fitur yang tidak mengeluarkan uang dibagi menurut kebutuhan; fitur yang
-- mengeluarkan biaya pesan diberikan sama rata di semua paket berbayar.
-- Yang membedakan keadaan tidak berlangganan dari Starter, pada dasarnya,
-- hanya satu baris: automatic_sending bernilai false.
-- ------------------------------------------------------------

-- Fitur dasar: ada di setiap keadaan, termasuk saat tidak berlangganan.
insert into plan_features (plan_id, feature_key, enabled)
select p.id, f.feature_key, true
from plans p
cross join (values
  ('property_management'),
  ('tenant_self_fill_link'),
  ('automatic_invoicing'),
  ('online_payment'),
  ('digital_receipt'),
  ('manual_settlement'),
  ('cash_report'),
  ('data_export')
) as f(feature_key)
on conflict (plan_id, feature_key) do nothing;

-- Pengiriman otomatis: satu-satunya pembeda antara Gratis dan Starter.
insert into plan_features (plan_id, feature_key, enabled)
select p.id, f.feature_key, p.code <> 'not_subscribed'
from plans p
cross join (values
  ('automatic_sending'),
  ('periodic_summary')
) as f(feature_key)
on conflict (plan_id, feature_key) do nothing;

-- Fitur bertingkat Pro ke atas.
insert into plan_features (plan_id, feature_key, enabled)
select p.id, f.feature_key, p.code in ('pro', 'business')
from plans p
cross join (values
  ('periodic_summary_detailed'),
  ('tenant_portal'),
  ('maintenance_tickets'),
  ('full_financial_report')
) as f(feature_key)
on conflict (plan_id, feature_key) do nothing;

-- Fitur khusus Bisnis.
insert into plan_features (plan_id, feature_key, enabled)
select p.id, f.feature_key, p.code = 'business'
from plans p
cross join (values
  ('periodic_summary_per_property'),
  ('profit_loss_per_property'),
  ('priority_support')
) as f(feature_key)
on conflict (plan_id, feature_key) do nothing;

-- Akun staf: Pro dua akun, Bisnis tak terbatas (limit_value kosong).
insert into plan_features (plan_id, feature_key, enabled, limit_value)
select
  p.id,
  'staff_accounts',
  p.code in ('pro', 'business'),
  case p.code when 'pro' then 2 else null end
from plans p
on conflict (plan_id, feature_key) do nothing;

-- ------------------------------------------------------------
-- Tarif pesan (PRD §16)
--
-- Rate card IDR resmi Meta untuk pasar Indonesia, berlaku 1 Juli 2026.
-- Tarifnya disimpan sebagai data beserta tanggal berlakunya supaya laporan
-- biaya bulan lalu tetap dihitung dengan tarif bulan lalu setelah Meta naik.
-- ------------------------------------------------------------

insert into message_rates (market, category, rate_per_message, effective_from, source_url, read_at) values
  ('Indonesia', 'utility',        356.65, date '2026-07-01',
   'https://whatsappbusiness.com/products/platform-pricing/?country=Indonesia&currency=Indonesian%20Rupiah%20(IDR)&category=Utility#rates',
   date '2026-08-15'),
  ('Indonesia', 'authentication', 356.65, date '2026-07-01',
   'https://whatsappbusiness.com/products/platform-pricing/?country=Indonesia&currency=Indonesian%20Rupiah%20(IDR)&category=Authentication#rates',
   date '2026-08-15'),
  ('Indonesia', 'marketing',      586.33, date '2026-07-01',
   'https://whatsappbusiness.com/products/platform-pricing/?country=Indonesia&currency=Indonesian%20Rupiah%20(IDR)&category=Marketing#rates',
   date '2026-08-15')
on conflict (market, category, effective_from) do nothing;
