# SEMANG — Technical Requirements Document (TRD)

**Versi:** 2.0 (MVP) · **Status:** Draft · **Bahasa:** Indonesia
**Acuan:** Semang PRD v2.0, SRD v2.0, ERD v2.0, Kebijakan Privasi v2.0
**Fokus:** cara membangun apa yang sudah ditetapkan dokumen di atas. Setiap keputusan di sini menunjuk kebutuhan yang memintanya.

## 1. Ringkasan Teknis

Semang adalah aplikasi web Next.js di Vercel dengan Postgres dan Auth dari Supabase. Tiga integrasi luar menjalankan inti produknya: WhatsApp Cloud API mengirim tagihan, Xendit XenPlatform menerima pembayaran langsung ke rekening pemilik, dan Google OAuth menjadi salah satu jalan masuk.

Empat sifat teknis membentuk hampir semua keputusan di dokumen ini:

1. **Uang tidak melewati Semang.** Tidak ada penampungan dana, jadi tidak ada rekonsiliasi saldo dan tidak ada kewajiban lisensi penyelenggara jasa pembayaran.
2. **Tidak ada penyimpanan berkas.** Kuitansi disusun saat tautannya dibuka. Akibatnya tidak ada layanan penyimpanan, tidak ada pemindaian berkas, dan tidak ada masa simpan berkas yang perlu diatur.
3. **Setiap pesan berbiaya.** Rp356,65 per pesan terkirim membuat penjadwalan pengiriman menjadi urusan biaya, bukan sekadar urusan waktu.
4. **Zona waktu per properti.** Kost di Denpasar dan Jakarta harus ditagih pada hari kalender yang benar menurut waktunya masing-masing, jadi tidak ada satu jam cron yang berlaku untuk semua.

## 2. Arsitektur Sistem

```
Pemilik (browser)                Penyewa (WhatsApp + browser)
      |                                    |
      v                                    v
+-------------------------------------------------------+
|  Next.js (Vercel)                                     |
|  - Halaman pemilik (butuh sesi)                       |
|  - Halaman bertoken (tanpa akun)                      |
|  - Route handler API                                  |
|  - Cron endpoint                                      |
+---------+--------------------+------------------------+
          |                    |
          v                    v
   Supabase Postgres      Integrasi luar
   - Row Level Security   - WhatsApp Cloud API (kirim + webhook status)
   - Supabase Auth        - Xendit XenPlatform (link bayar + webhook)
                          - Google OAuth (jalan masuk)
```

**Batas tanggung jawab.** Seluruh penulisan data terjadi di route handler di sisi peladen. Browser tidak pernah memegang kunci layanan, dan tidak pernah memanggil Xendit atau WhatsApp langsung. Halaman bertoken juga dilayani dari sisi peladen: token diperiksa lebih dulu, lalu data dibaca dengan hak terbatas.

**Kenapa cron di Vercel dan GitHub Actions sekaligus.** Vercel Cron menjalankan tugas rutin. GitHub Actions menjadi pemicu cadangan yang memanggil endpoint yang sama, karena satu titik yang bila gagal menghentikan seluruh penagihan adalah risiko yang tidak sebanding dengan biaya menambahkan pemicu kedua (SRD NFR-04).

## 3. Tech Stack

| Lapisan        | Pilihan                                                   | Catatan                                                                      |
|----------------|-----------------------------------------------------------|------------------------------------------------------------------------------|
| Frontend & API | Next.js di Vercel                                         | Halaman, route handler, dan cron dalam satu penyebaran                       |
| Database       | Supabase Postgres                                         | Row Level Security menegakkan pemisahan data antar pemilik                   |
| Autentikasi    | Supabase Auth                                             | Penyedia Google, ditambah alur kode sekali pakai yang dikirim lewat WhatsApp |
| Pesan          | WhatsApp Cloud API                                        | Satu nomor bisnis Semang untuk semua kost                                    |
| Pembayaran     | Xendit XenPlatform                                        | Sub-akun per pemilik, dana langsung ke rekeningnya                           |
| Penjadwalan    | Vercel Cron + GitHub Actions                              | Idempoten, dapat dijalankan berkali-kali tanpa efek ganda                    |
| Domain         | Domain sendiri sebelum disebar ke luar lingkaran terdekat |                                                                              |

Tidak ada layanan penyimpanan berkas dan tidak ada penyedia email dalam lingkup ini.

## 4. Model Data

Skema mengikuti ERD v2.0 (31 tabel) tanpa penyimpangan. Bagian ini hanya menetapkan cara menerapkannya.

### 4.1 Konvensi

| Hal         | Ketetapan                                                                                |
|-------------|------------------------------------------------------------------------------------------|
| Kunci utama | `uuid` berisi UUID versi 7 yang dibuat aplikasi, supaya baris baru masuk ke ujung indeks |
| Waktu       | `timestamptz` tanpa kecuali; tanggal murni memakai `date`                                |
| Teks        | `text`; batas panjang lewat `CHECK` hanya bila domainnya memang berbatas                 |
| Uang        | `numeric(14,2)` dalam rupiah penuh; `1500000.00` berarti Rp1.500.000                     |
| Enum        | `text` + `CHECK` berisi daftar nilai dari kamus ERD                                      |
| Migrasi     | Berurut, maju saja, satu berkas per perubahan; data acuan wilayah masuk lewat migrasi    |

### 4.2 Row Level Security

Setiap tabel yang memuat data pemilik menyalakan Row Level Security. Pola kebijakannya satu bentuk saja:

```sql
create policy owner_reads on invoices for select
  using (owner_id = (select auth.uid()));
```

`auth.uid()` dibungkus subkueri agar dinilai sekali per kueri, bukan sekali per baris. Setiap kolom `owner_id` diberi indeks. Tabel anak yang hanya dibaca lewat induknya — `invoice_items` dan `payment_links` — memakai kebijakan yang menumpang tagihan induknya.

`owner_id` diisi trigger `before insert` dari induknya, bukan dari data yang dikirim klien. Kolom salinan yang bisa dikirim klien adalah lubang keamanan, bukan penghematan.

### 4.3 Indeks

| Tabel              | Indeks                                                                             | Untuk                                                       |
|--------------------|------------------------------------------------------------------------------------|-------------------------------------------------------------|
| `invoices`         | `(owner_id)`, `(due_date, status)`, `(idempotency_key)` unik                       | Kebijakan akses, cron penanda telat, pencegah tagihan ganda |
| `messages`         | `(scheduled_at, status)`, `(invoice_id)`, `(owner_id, sent_at)`                    | Cron pengirim, pembatalan pengingat, rekap biaya            |
| `room_assignments` | `(room_id)` unik saat `ended_on` kosong, `(tenant_id)` unik saat `ended_on` kosong | Satu penempatan berlaku per kamar dan per penyewa           |
| `audit_events`     | `(entity_type, entity_id, created_at)`                                             | Riwayat per tagihan                                         |
| `regions`          | Indeks pencarian teks pada `name`                                                  | Pencarian bertaip 514 wilayah                               |
| Semua foreign key  | Indeks tersendiri                                                                  | Postgres tidak membuatnya otomatis                          |

## 5. State Machine & Aturan Transisi

### 5.1 Transisi tagihan

Status dan pemicunya persis PRD §8.2 dan §8.3. Yang ditetapkan di sini adalah cara menjaganya:

- **Semua transisi lewat satu fungsi.** Perubahan `status`, `amount_paid`, dan penanda waktu terjadi di satu tempat, di dalam satu transaksi, bersama penulisan `audit_events`. Tidak ada jalur lain yang boleh menyentuh `invoices.status`.
- **Baris tagihan dikunci** dengan `select ... for update` sebelum pembayaran ditambahkan, supaya dua webhook yang datang bersamaan tidak menghasilkan `amount_paid` yang salah.
- **`telat` dan `menunggak` ditetapkan cron**, bukan dihitung saat dibaca. Status yang dihitung saat dibaca membuat laporan berubah tanpa ada kejadian apa pun.

### 5.2 Nomor tagihan

Nomor berurut per pemilik (SRD TGH-17) diambil dari baris penghitung milik pemilik itu, dikunci dalam transaksi yang sama dengan pembuatan tagihan. Nilai tertinggi yang sudah ada **tidak** dipakai sebagai dasar, karena dua cron yang berjalan bersamaan akan membaca nilai yang sama dan menghasilkan nomor kembar.

Bentuknya `YYYYMM-NNNN`, dengan `NNNN` dimulai dari 1 tiap bulan. Awalan tahun-bulan hanya masuk akal bila penghitungnya juga bulanan — awalan bulanan dengan penghitung yang berjalan terus akan menghasilkan nomor seperti `202608-0417` pada kost yang baru menagih empat kali di bulan itu.

## 6. Desain API

Seluruh titik akhir berupa route handler Next.js.

| Kelompok         | Titik akhir                                                                | Akses                              |
|------------------|----------------------------------------------------------------------------|------------------------------------|
| Autentikasi      | mulai masuk Google, minta kode, tukar kode, keluar                         | Publik, berbatas jumlah permintaan |
| Kost & kamar     | buat, ubah, atur status kamar                                              | Sesi pemilik                       |
| Penyewa          | tambah, ubah, checkout, pindah kamar, ubah penempatan sementara jadi tetap | Sesi pemilik                       |
| Tagihan          | lihat, batalkan, tandai lunas, catat cicilan, pratinjau perubahan mode     | Sesi pemilik                       |
| Langganan        | lihat, naik paket, berhenti                                                | Sesi pemilik                       |
| Halaman bertoken | isi mandiri, kuitansi, halaman pembayaran                                  | Token, tanpa akun                  |
| Webhook          | Xendit, WhatsApp status                                                    | Diverifikasi tanda tangan pengirim |
| Cron             | penagihan, pengiriman, transisi status, langganan                          | Rahasia bersama di header          |

**Aturan yang berlaku di semua titik akhir:** validasi bentuk masukan sebelum apa pun dijalankan, nominal uang tidak pernah datang dari klien untuk hal yang dihitung sistem, dan setiap penulisan yang bisa terulang membawa `idempotency_key`.

## 7. Lapisan Pengiriman Pesan

Semua pesan keluar melewati satu interface `NotificationSender` (SRD NFR-10), dan semua tercatat di `messages` sebelum dikirim.

### 7.1 Alur kirim

1. Penjadwal membuat baris `messages` berstatus `scheduled` beserta `idempotency_key`.
2. Cron pengirim mengambil baris yang `scheduled_at`-nya sudah lewat, melewati penyewa yang menarik persetujuan (SRD NTF-13), lalu memanggil Cloud API.
3. Balasan pengiriman menyimpan `whatsapp_message_id`; status berubah `sent`.
4. Webhook status mengisi `delivered_at` atau `failed_at`, beserta objek `pricing`: `is_billable`, `pricing_category`, `pricing_type`, `charged_amount`, dan `message_rate_id` yang berlaku.

Biaya dihitung dari pesan yang **sampai**, bukan yang masuk antrean. Pesan gagal tidak dihitung.

### 7.2 Penjadwalan dan pembatalan

Jadwal mengikuti PRD §8.7: bulanan tagihan H-3 lalu pengingat H+3 dan H+7; mingguan tagihan H-1 lalu H+2; harian hanya hari-H. Seluruh perhitungan hari memakai zona waktu propertinya.

Pengingat dijadwalkan sekaligus saat tagihan dibuat, lalu **dibatalkan** dengan mengisi `cancelled_at` begitu tagihan lunas atau dibatalkan. Menjadwalkan lebih dulu lalu membatalkan lebih murah dan lebih mudah diperiksa daripada memutuskan setiap hari apakah pengingat perlu dikirim.

### 7.3 Template

Template didaftarkan ke Meta sebagai `utility` untuk penagihan dan `authentication` untuk kode masuk. `messages.template_version` menyimpan versi yang benar-benar dipakai, supaya isi pesan bulan lalu tetap bisa disusun ulang setelah templatenya direvisi.

## 8. Autentikasi & Sesi

### 8.1 Dua jalan masuk

**Google** memakai penyedia OAuth Supabase Auth. **Nomor WhatsApp** memakai alur kode sekali pakai yang pengirimannya dialihkan ke nomor bisnis Semang sendiri, bukan penyedia SMS.

Keduanya menghasilkan satu baris `auth_identities`. Akun tanpa satu pun baris di tabel itu tidak bisa dimasuki, dan itulah penjaga sebenarnya — bukan kolom `email` atau `whatsapp_number` yang boleh kosong.

### 8.2 Kode sekali pakai

| Hal          | Ketetapan                                                                                |
|--------------|------------------------------------------------------------------------------------------|
| Panjang      | 6 angka                                                                                  |
| Masa berlaku | 5 menit                                                                                  |
| Percobaan    | Maksimal 5, lalu kode mati                                                               |
| Penyimpanan  | Hash, dibandingkan dengan cara yang tidak membocorkan hasil dari lama waktu pembandingan |
| Kode baru    | Mematikan kode sebelumnya                                                                |

### 8.3 Batas jumlah permintaan

Satu kode berbiaya Rp356,65, dan endpoint ini adalah cara termudah bagi orang lain menghabiskan saldo WhatsApp Business Semang (SRD AUTH-09).

| Sasaran        | Batas                  | Jeda setelah terlampaui   |
|----------------|------------------------|---------------------------|
| Nomor WhatsApp | 3 per jam, 10 per hari | 1 jam, lalu naik ke 6 jam |
| Akun           | 10 per hari            | 6 jam                     |
| Alamat IP      | 20 per jam             | 1 jam                     |

Sama diberlakukan pada pengiriman contoh tagihan, memakai tabel `request_limits` yang sama.

### 8.4 Sesi

Sesi Supabase Auth berlaku 30 hari dan diperpanjang saat dipakai. Kode hanya diminta saat sesi habis atau perangkat baru — bukan setiap kali membuka Semang (SRD AUTH-04).

## 9. Pembayaran

### 9.1 Sub-akun Xendit

Setiap pemilik menjadi sub-akun XenPlatform. Formulir verifikasi identitas tampil di dalam Semang dan isinya diteruskan langsung ke Xendit; yang disimpan hanya `verification_status`. Tidak ada kolom data identitas di skema, dan itu janji yang tertulis di Kebijakan Privasi §2.

### 9.2 Link pembayaran

Link dibuat per tagihan atau per cicilan dengan nominal terkunci. Bila link kedaluwarsa dan dibuat ulang, link lama diisi `superseded_at`; indeks unik sebagian menjamin hanya satu link berlaku per tagihan.

### 9.3 Webhook

Webhook Xendit diverifikasi dengan token panggilan balik, dicatat ke `webhook_events` lebih dulu, lalu diproses. `external_id` unik membuat pengiriman ulang aman diterima berkali-kali. Pemrosesan membuat baris `payments` dengan `is_auto_verified` bernilai benar, lalu memanggil fungsi transisi tagihan.

### 9.4 Penandaan lunas manual

Pemilik memilih metode `cash` atau `direct_transfer`, dengan catatan singkat opsional, dan menekan konfirmasi secara sadar. Baris `payments` tercatat dengan `is_auto_verified` bernilai salah, `recorded_by` berisi pemiliknya. Kolom itulah yang mengisi perbandingan pelunasan otomatis versus manual di laporan dan KPI.

## 10. Langganan Platform

Cron bulanan membuat `subscription_invoices` untuk tiap langganan aktif:

1. Ambil snapshot **jumlah penyewa aktif** pada tanggal penagihan — bukan jumlah kamar berstatus terisi, supaya penyewa yang sedang dipindah sementara tidak membuat pemilik tertagih dua kali (SRD BR-23).
2. Hitung `computed_amount` dari `price_per_room` saat itu; bila di bawah minimum bulanan, pakai minimum dan tandai `minimum_monthly_applied`.
3. Untuk siklus tahunan, isi `discount_amount` sebesar potongan yang berlaku.
4. Simpan `plan_id` yang berlaku, supaya tagihan lama tetap bisa dijelaskan setelah pemilik naik paket.

**Gagal bayar** mengisi `failure_reason`, `attempt_count`, dan `last_attempt_at`, lalu menyetel `grace_period_ends_at` = **7 hari kalender** sejak percobaan pertama gagal. Selama masa itu pengiriman tetap berjalan dan pemilik menerima pesan `subscription_payment_failed`. Tujuh hari dipilih karena cukup untuk melewati satu akhir pekan dan satu tanggal gajian, tanpa membuat pemilik memakai layanan sebulan penuh tanpa membayar.

**Akhir trial** diperiksa cron harian: langganan yang `trial_ends_at`-nya sudah lewat berpindah ke keadaan tidak berlangganan. Diukur dalam hari kalender tetap, bukan dari siklus tiap penyewa, karena satu kost bisa punya penyewa bulanan, mingguan, dan harian sekaligus. Tidak ada kamar yang dinonaktifkan dan tidak ada data yang menjadi hanya-baca; yang berhenti hanya pengiriman (§11).

**Berhenti berlangganan** menyetel `cancellation_effective_at` ke akhir siklus berjalan. Tagihan penyewa yang sudah terjadwal untuk siklus itu tetap dikirim.

## 11. Keadaan Tidak Berlangganan

Akun yang tidak berlangganan tetap membuat tagihan lengkap dengan nominal dan teks pesannya, tetapi tidak satu pun pesan dikirim. Penerapannya:

- Penjadwal **tidak membuat** baris `messages` untuk akun ini. Membuat lalu membatalkan akan membuat rekap biaya sulit dibaca dan membuka risiko terkirim karena salah kondisi.
- Teks pesan disusun saat halaman dibuka, dari template yang sama, dan ditampilkan utuh agar bisa langsung disalin.
- Tidak ada alat bantu salin-massal maupun tautan langsung ke WhatsApp per kamar, dan tidak ada jeda atau langkah tambahan yang dibuat-buat (SRD SUB-10).
- Tidak ada batas jumlah kamar maupun properti.

## 12. Laporan, Ekspor & Kuitansi

### 12.1 Laporan kas

Laporan dihitung saat dibaca, bukan disimpan sebagai ringkasan. Pada skala MVP jumlah barisnya kecil, dan ringkasan tersimpan yang bisa melenceng dari sumbernya lebih merepotkan daripada kueri yang sedikit lebih lambat.

Isinya mengikuti SRD LAP: uang masuk per bulan, daftar lunas/telat/menunggak per kamar, rincian cicilan dan diskon multi-periode, serta piutang penyewa yang sudah keluar. Pembayaran yang dipastikan sistem Xendit dan yang diklaim pemilik dipisah berdasarkan `payments.is_auto_verified`.

### 12.2 Ekspor

Ekspor CSV dan Excel dibuat di sisi peladen dan dialirkan langsung ke unduhan, tanpa berkas perantara — konsisten dengan tidak adanya penyimpanan berkas. Rentang tanggal dibatasi agar satu permintaan tidak menarik seluruh riwayat kost sekaligus.

### 12.3 Kuitansi

Kuitansi disusun saat tautannya dibuka, dari `invoices` dan `payments`. Nama dan nomor penyewa diambil dari salinan pada tagihan, bukan dari data penyewa terkini — itulah yang membuat kuitansi lama tetap benar setelah nama diperbaiki atau data penyewa dianonimkan.

Halaman kuitansi dan halaman pembayaran selalu menampilkan nama kost, periode, dan nominal, supaya penyewa dapat membedakan tautan sah dari penipuan.

## 13. Penjadwalan

Semua cron idempoten dan aman dijalankan berkali-kali.

| Tugas               | Irama                        | Isi                                                                                                                                        |
|---------------------|------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------|
| Pembuatan tagihan   | Tiap jam                     | Proses properti yang waktu setempatnya baru melewati 01.00; lewati properti tanpa zona waktu dan catat sebagai perlu ditindak              |
| Pengiriman pesan    | Tiap 15 menit                | Kirim `messages` yang `scheduled_at`-nya sudah lewat                                                                                       |
| Transisi waktu      | Tiap jam                     | Tandai `telat` dan `menunggak` menurut waktu setempat propertinya                                                                          |
| Update berkala      | Bulanan + saat ada kejadian  | Ringkasan ke pemilik; tidak dikirim bila tidak ada yang perlu diketahui                                                                    |
| Penagihan langganan | Harian                       | Buat tagihan langganan yang jatuh tempo hari itu, proses masa tenggang, dan pindahkan trial yang sudah lewat ke keadaan tidak berlangganan |
| Peninjauan tarif    | Kuartalan, sebagai pengingat | Baca ulang rate card Meta pada 1 Jan / 1 Apr / 1 Jul / 1 Okt                                                                               |
| Pembersihan         | Harian                       | Lihat §14                                                                                                                                  |

**Kenapa cron tiap jam, bukan sekali sehari.** Zona waktu berbeda per properti, jadi tidak ada satu jam yang benar untuk semua. Cron tiap jam memproses properti yang baru melewati jam yang ditentukan menurut waktunya sendiri.

## 14. Masa Simpan & Pembersihan

Empat tabel tumbuh tanpa pernah dibaca lagi setelah beberapa waktu. Ketetapannya:

| Tabel            | Masa simpan                                       | Alasan                                                          |
|------------------|---------------------------------------------------|-----------------------------------------------------------------|
| `login_codes`    | 24 jam setelah dipakai atau kedaluwarsa           | Sudah tidak berguna, dan memuat data pribadi                    |
| `request_limits` | 7 hari sejak jendelanya berakhir                  | Cukup untuk menelusuri penyalahgunaan                           |
| `webhook_events` | 90 hari setelah diproses                          | Cukup untuk menelusuri sengketa pembayaran                      |
| `messages`       | Rinci 24 bulan, lalu diringkas per kost per bulan | Biaya historis tetap bisa dilaporkan tanpa menyimpan tiap baris |

Masa simpan `login_codes` dan `request_limits` sudah dijanjikan ke pengguna di Kebijakan Privasi §8, jadi keduanya kewajiban, bukan pilihan penyetelan.

## 15. Keamanan & Kepatuhan

### 15.1 Halaman tanpa akun

Token acak minimal 128 bit disimpan sebagai hash: satu token per kamar untuk isi mandiri, satu per tagihan untuk kuitansi dan halaman pembayaran. Token isi mandiri mati setelah dipakai atau setelah 30 hari.

Halaman ini dilayani dari sisi peladen. Token diperiksa lebih dulu, lalu data dibaca dengan hak yang hanya mencakup baris yang ditunjuk token itu — bukan dengan mematikan Row Level Security.

### 15.2 Hak penghapusan dan penarikan persetujuan

| Permintaan                            | Penerapan                                                                                                                                            |
|---------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| Penyewa minta datanya dihapus         | Kosongkan `name` dan `whatsapp_number`, isi `anonymized_at`. Tagihan tetap utuh karena nama dan nomor sudah disalin ke tiap tagihan saat diterbitkan |
| Penyewa minta berhenti menerima pesan | Isi `messaging_opted_out_at`; penjadwal melewatinya, tagihan tetap dibuat                                                                            |
| Pemilik minta akunnya dihapus         | Isi `deletion_requested_at`; setelah 30 hari, hapus permanen seluruh data propertinya                                                                |

Penghapusan permanen dijalankan cron harian, bukan tugas manual, karena tenggang yang bergantung pada ingatan orang bukan tenggang.

### 15.3 Data yang tidak disimpan

Tidak ada kolom untuk data identitas verifikasi Xendit, dan tidak ada penyimpanan berkas. Keduanya janji yang tertulis di Kebijakan Privasi.

## 16. Observabilitas

**Jejak aksi** ditulis ke `audit_events` di dalam transaksi yang sama dengan perubahannya. Mencakup tagihan, pembayaran, akun, langganan, penyewa, properti, tipe kamar, kamar, dan penempatan kamar.

**Alarm biaya pesan** (SRD NFR-14): peringatan ke founder bila biaya pesan sebuah kost dalam satu bulan melewati **50% pendapatan langganan kost itu**. Ambang 50% dipilih karena skenario terburuk yang dimungkinkan jadwal pengiriman adalah 56% pada Starter — jadi ambang ini menyala tepat sebelum keadaan terburuk yang sudah diperhitungkan, dan menyala keras bila ada yang di luar perhitungan.

**Tahap onboarding** dicatat sebagai kejadian di `audit_events` dengan `entity_type` bernilai `user`: pendaftaran, tiga isian terisi, contoh tagihan terkirim, kembali dari WhatsApp, dan setup lanjutan selesai. Inilah yang mengisi KPI aktivasi PRD §14 — tanpa pencatatan per tahap, yang bisa dijawab hanya "berapa yang selesai", bukan "berhenti di langkah mana".

**Yang dipantau selain itu:** proporsi pesan gagal kirim, umur baris `messages` yang tertahan `scheduled`, jumlah webhook belum terproses, dan jumlah properti tanpa zona waktu.

## 17. Strategi Pengujian

Uji otomatis diprioritaskan pada hal yang salahnya paling mahal, bukan pada cakupan baris.

| Yang diuji                                                                          | Kenapa                                                                            |
|-------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|
| Penentuan jatuh tempo, termasuk tanggal 29–31 dan pergantian tahun                  | Salah satu hari berarti tagihan salah kirim                                       |
| Prorata, gabung ke depan, dan penuh bulan ini                                       | Tiga cabang dengan hasil uang yang berbeda                                        |
| Harga turunan harian dan mingguan beserta pembulatannya                             | Menentukan nominal yang dibayar penyewa                                           |
| Idempotensi pembuatan tagihan dan pemrosesan webhook                                | Dua kali jalan tidak boleh menghasilkan dua tagihan atau dua pembayaran           |
| Pembatalan pengingat saat lunas                                                     | Pesan terkirim ke tagihan yang sudah dibayar memalukan pemilik dan membuang biaya |
| Kebijakan Row Level Security                                                        | Satu kebocoran membatalkan seluruh janji produk                                   |
| Kost dua zona waktu ditagih di hari yang benar                                      | Sasaran pasar mencakup WIB dan WITA                                               |
| Anonimisasi penyewa tanpa merusak kuitansi lama                                     | Kewajiban UU PDP dan pembukuan pemilik sekaligus                                  |
| Pindah kamar sementara: sewa tetap, kamar asal tidak bisa diisi, tertagih satu kali | Tiga akibat yang harus jalan bersamaan                                            |

## 18. Kinerja & Kapasitas

Sasaran kinerja ditetapkan pada halaman yang dibuka penyewa, bukan pada dashboard pemilik. Penyewa membuka tautan dari WhatsApp, sering di koneksi lambat, dan tidak punya alasan menunggu.

| Sasaran                                       | Ketetapan                                                                   |
|-----------------------------------------------|-----------------------------------------------------------------------------|
| Halaman isi mandiri, kuitansi, dan pembayaran | Tampil di bawah 3 detik pada koneksi 3G dan perangkat berspesifikasi rendah |
| Halaman bertoken                              | Dirender di sisi peladen, tanpa menunggu pemanggilan data dari browser      |
| Kapasitas awal                                | 50 kost dan 1.000 kamar tanpa perubahan arsitektur                          |
| Pertumbuhan terbesar                          | `messages`, di bawah 30.000 baris per bulan pada 1.000 pemilik              |

`messages` dan `audit_events` adalah kandidat partisi bulanan bila tumbuh melampaui perkiraan. Yang perlu dijaga sejak awal hanya satu hal: `created_at` dan `sent_at` tidak dipakai sebagai bagian kunci utama, supaya partisi bisa ditambahkan tanpa memindahkan data.

## 19. Lingkungan & Penyebaran

| Lingkungan   | Isi                                                                            |
|--------------|--------------------------------------------------------------------------------|
| Pengembangan | Proyek Supabase terpisah, sub-akun Xendit uji, nomor WhatsApp uji              |
| Produksi     | Proyek Supabase sendiri, WhatsApp Business dan Xendit yang sudah terverifikasi |

**Kredensial** disimpan sebagai variabel lingkungan di Vercel dan tidak pernah masuk ke repositori. Kunci layanan Supabase, token Cloud API, dan kunci Xendit hanya dipakai di sisi peladen. Rahasia produksi tidak dipakai di lingkungan pengembangan, termasuk saat menelusuri masalah.

**Migrasi** berjalan maju saja, satu berkas per perubahan, dan dijalankan sebagai bagian dari penyebaran. Migrasi yang menghapus kolom dipisah dari migrasi yang menambahnya, supaya penyebaran yang gagal bisa dibatalkan tanpa kehilangan data.

**Webhook** dari Xendit dan Meta menunjuk lingkungan produksi. Lingkungan pengembangan memakai titik akhir sendiri, sehingga kejadian uji tidak pernah masuk ke data nyata.

## 20. Jalur Perluasan Tahap 1–3

| Fitur                          | Yang perlu ditambahkan                                                                  |
|--------------------------------|-----------------------------------------------------------------------------------------|
| Portal penyewa                 | Pakai `tenants.user_id` yang sudah ada; tambahkan jalan masuk untuk penyewa             |
| Meter listrik per kamar        | **Penyimpanan berkas** untuk foto meteran; `invoice_items.kind` bertambah `electricity` |
| Akun penjaga kost              | Peran di `property_staff` dan penyesuaian kebijakan Row Level Security                  |
| Tiket maintenance              | Alur status di `maintenance_tickets`                                                    |
| Laporan laba-rugi per properti | Dihitung dari data yang sudah tersimpan                                                 |

Meter listrik adalah satu-satunya yang mengembalikan kebutuhan penyimpanan berkas. Komponennya ditambahkan saat fitur itu dibangun.

## 21. Yang Masih Terbuka

- **Apakah Xendit mengembalikan biaya MDR per transaksi pada model sub-akun.** Kolom `payments.provider_fee` sudah ada; yang belum jelas apakah nilainya tersedia. Dicek saat integrasi pertama.
- **Kanal peringatan pembangunan kamar** (SRD SUB-16). Rekomendasi: di dalam aplikasi, karena lewat WhatsApp berbiaya Rp356,65 per peringatan sementara pemilik memang sedang membuka Semang saat menandai kamar. Bila diputuskan lewat WhatsApp, ERD butuh satu nilai `messages.kind` lagi.
- **Bentuk pratinjau harga saat naik paket.** Sudah ditetapkan harus ada (SRD SUB-17); rinciannya menunggu rancangan antarmuka.
- **Tarif utility Indonesia dan syarat KYC Xendit** dibaca ulang dari sumber resmi sebelum peluncuran berbayar, mengikuti PRD §19.1.
