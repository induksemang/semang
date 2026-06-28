-- Seed: 4 tier plan (ENT-02: semua flag aktif di Tahap 0)
insert into plans (code, name, price_per_room, min_monthly, max_rooms, max_properties, is_active)
values
  ('gratis',  'Gratis',  0,     0,      50,  1,   true),
  ('starter', 'Starter', 15000, 50000,  50,  3,   true),
  ('pro',     'Pro',     12000, 100000, 100, 10,  true),
  ('bisnis',  'Bisnis',  10000, 200000, 999, 999, true)
on conflict (code) do nothing;

-- Aktifkan semua fitur untuk tier gratis (Tahap 0)
insert into plan_features (plan_id, feature_key, enabled)
select
  p.id,
  f.feature_key,
  true
from plans p
cross join (
  values
    ('tagihan_otomatis'),
    ('notifikasi_wa_link'),
    ('notifikasi_email'),
    ('upload_bukti'),
    ('kuitansi_digital'),
    ('ekspor_csv'),
    ('laporan_bulanan'),
    ('kode_unik_nominal'),
    ('onboarding_wizard')
) as f(feature_key)
where p.code = 'gratis'
on conflict do nothing;
