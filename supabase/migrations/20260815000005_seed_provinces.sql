-- ============================================================
-- Data referensi: 38 provinsi Indonesia beserta zona waktunya.
--
-- Diisi lewat migrasi, bukan seed, karena properties.timezone disalin dari
-- baris ini dan siklus penagihan bergantung padanya — data ini harus ada di
-- setiap lingkungan, bukan hanya di lingkungan pengembangan.
--
-- statistics_code mengikuti kode Badan Pusat Statistik: dua digit untuk
-- provinsi, dan bertahan melewati perubahan nama. Kode dan nama di bawah
-- dicocokkan dengan daftar BPS pada 15 Agustus 2026.
--
-- Kode BPS berbeda dari kode Kemendagri untuk enam provinsi Papua, dan
-- keduanya sama-sama resmi. ERD §4 menyebut kode BPS, jadi yang dipakai di
-- sini kode BPS: 91 Papua Barat, 92 Papua Barat Daya, 94 Papua, 95 Papua
-- Selatan, 96 Papua Tengah, 97 Papua Pegunungan — tanpa kode 93. Memakai kode
-- Kemendagri (91 Papua, 92 Papua Barat, 93 Papua Selatan, 94 Papua Tengah,
-- 95 Papua Pegunungan, 96 Papua Barat Daya) akan membuat kost di Papua
-- terhubung ke provinsi yang salah, dan zona waktunya ikut salah.
--
-- Kota dan kabupatennya menyusul di migrasi 20260815000007.
-- ============================================================

insert into provinces (statistics_code, name, timezone) values
  ('11', 'Aceh',                       'Asia/Jakarta'),
  ('12', 'Sumatera Utara',             'Asia/Jakarta'),
  ('13', 'Sumatera Barat',             'Asia/Jakarta'),
  ('14', 'Riau',                       'Asia/Jakarta'),
  ('15', 'Jambi',                      'Asia/Jakarta'),
  ('16', 'Sumatera Selatan',           'Asia/Jakarta'),
  ('17', 'Bengkulu',                   'Asia/Jakarta'),
  ('18', 'Lampung',                    'Asia/Jakarta'),
  ('19', 'Kepulauan Bangka Belitung',  'Asia/Jakarta'),
  ('21', 'Kepulauan Riau',             'Asia/Jakarta'),
  ('31', 'DKI Jakarta',                'Asia/Jakarta'),
  ('32', 'Jawa Barat',                 'Asia/Jakarta'),
  ('33', 'Jawa Tengah',                'Asia/Jakarta'),
  ('34', 'DI Yogyakarta',              'Asia/Jakarta'),
  ('35', 'Jawa Timur',                 'Asia/Jakarta'),
  ('36', 'Banten',                     'Asia/Jakarta'),
  ('51', 'Bali',                       'Asia/Makassar'),
  ('52', 'Nusa Tenggara Barat',        'Asia/Makassar'),
  ('53', 'Nusa Tenggara Timur',        'Asia/Makassar'),
  ('61', 'Kalimantan Barat',           'Asia/Jakarta'),
  ('62', 'Kalimantan Tengah',          'Asia/Jakarta'),
  ('63', 'Kalimantan Selatan',         'Asia/Makassar'),
  ('64', 'Kalimantan Timur',           'Asia/Makassar'),
  ('65', 'Kalimantan Utara',           'Asia/Makassar'),
  ('71', 'Sulawesi Utara',             'Asia/Makassar'),
  ('72', 'Sulawesi Tengah',            'Asia/Makassar'),
  ('73', 'Sulawesi Selatan',           'Asia/Makassar'),
  ('74', 'Sulawesi Tenggara',          'Asia/Makassar'),
  ('75', 'Gorontalo',                  'Asia/Makassar'),
  ('76', 'Sulawesi Barat',             'Asia/Makassar'),
  ('81', 'Maluku',                     'Asia/Jayapura'),
  ('82', 'Maluku Utara',               'Asia/Jayapura'),
  ('91', 'Papua Barat',                'Asia/Jayapura'),
  ('92', 'Papua Barat Daya',           'Asia/Jayapura'),
  ('94', 'Papua',                      'Asia/Jayapura'),
  ('95', 'Papua Selatan',              'Asia/Jayapura'),
  ('96', 'Papua Tengah',               'Asia/Jayapura'),
  ('97', 'Papua Pegunungan',           'Asia/Jayapura')
on conflict (statistics_code) do nothing;
