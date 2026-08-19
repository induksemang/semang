# SEMANG — Kamus Data & Catatan Desain ERD

**Versi:** 2.0 · **Bahasa:** Indonesia
**Acuan:** Semang PRD v2.0, Semang SRD v2.0 · **Diagram:** `Semang_ERD.puml`

Dokumen ini menjelaskan tiap tabel di diagram: untuk apa, nilai apa saja yang boleh masuk, aturan apa yang menjaganya, dan kenapa dirancang begitu. Diagram menunjukkan bentuknya; dokumen ini menjelaskan alasannya.

**Konvensi penamaan:** nama tabel, nama kolom, dan seluruh nilai enum memakai bahasa Inggris dan ditulis penuh tanpa singkatan. Penjelasannya tetap berbahasa Indonesia.

### Cara membaca diagram

Diagram digambar **tanpa pengelompokan tabel**, supaya penempatan tabel bebas mengikuti relasinya dan label tidak saling menimpa.

Aturan penggambarannya: **satu garis per pasangan tabel**, dan relasi ke tabel yang sama tidak digambar sama sekali. Tanpa aturan ini labelnya bertumpuk dan diagram jadi tidak terbaca. Yang tidak digambar tetap ada sebagai kolom dan dijelaskan di sini:

| Foreign key yang tidak digambar           | Perannya                                                                 |
|-------------------------------------------|--------------------------------------------------------------------------|
| `invoices.parent_invoice_id`              | Menunjuk tagihan induk saat sisa cicilan berdiri sebagai tagihan sendiri |
| `multi_period_groups.discount_invoice_id` | Tagihan mana dari kelompok itu yang memuat baris diskonnya               |
| `room_assignments.returns_to_room_id`     | Kamar yang akan ditempati kembali setelah penempatan sementara berakhir  |
| `regions.superseded_by_region_id`         | Wilayah pengganti bila wilayah lama dipecah atau digabung                |

Nama relasi memakai bahasa Inggris, sama seperti nama tabel dan kolom.

### Cara membaca notasi

| Notasi                                | Arti                                            |
|---------------------------------------|-------------------------------------------------|
| `*` di depan kolom                    | Wajib diisi (`NOT NULL`)                        |
| Tanpa `*`                             | Boleh kosong                                    |
| `<<PK>>`                              | Kunci utama                                     |
| `<<FK>>`                              | Menunjuk baris di tabel lain                    |
| `<<UK>>` pada satu kolom              | Nilai kolom itu tidak boleh muncul di dua baris |
| `= 'nilai'`                           | Nilai bawaan bila tidak diisi                   |
| Blok setelah pemisah kedua di diagram | Aturan tingkat tabel, bukan kolom               |

Database bisa menolak data ganda dengan dua cara, dan keduanya ditulis di tempat berbeda.

Cara pertama menjaga **satu kolom** dan ditandai `<<UK>>` di baris kolom itu. `users.email <<UK>>` berarti tidak boleh ada dua pemilik dengan email yang sama.

Cara kedua menjaga **beberapa kolom sekaligus** dan ditulis sebagai satu kalimat aturan di bawah tabel kolom. Di sini tiap kolom boleh berisi nilai yang sama berkali-kali; yang ditolak hanya baris yang **seluruh** kolom itu sama dengan baris lain. Aturan seperti ini milik tabel, bukan milik satu kolom, jadi tidak ditulis sebagai baris di dalam tabel kolom.

### Konvensi tipe data

Seluruh tabel memakai konvensi berikut tanpa kecuali. Konsistensi di sini lebih penting daripada pilihan mana pun secara terpisah, karena campuran tipe yang tidak dijelaskan adalah sumber bug yang sulit dilacak.

| Untuk                | Tipe                          | Alasan                                                                                                                                                                                                                                                                                                          |
|----------------------|-------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Waktu                | `timestamptz`                 | `timestamp` tanpa zona waktu menyimpan jam dinding tanpa keterangan zona, sehingga artinya bergeser mengikuti pengaturan server. Di Postgres `timestamptz` tidak memakan ruang lebih besar dan menghapus satu golongan bug sekaligus. Wiki resmi Postgres memasukkan `timestamp` ke daftar "jangan lakukan ini" |
| Tanggal murni        | `date`                        | Untuk hal yang memang tidak punya jam: tanggal masuk, jatuh tempo, periode                                                                                                                                                                                                                                      |
| Teks                 | `text`                        | Di Postgres `text` dan `varchar(n)` sama cepatnya. Batas panjang dipasang lewat `CHECK` hanya bila memang ada batas nyata, bukan karena kebiasaan                                                                                                                                                               |
| Uang                 | `numeric(14,2)`               | Nilai yang akan direkonsiliasi tidak boleh disimpan sebagai bilangan mengambang. Dua desimal diperlukan karena tarif pesan Meta berupa Rp356,65                                                                                                                                                                 |
| Kunci utama          | `uuid`                        | Diisi UUID versi 7 yang urut menurut waktu, supaya baris baru masuk ke ujung indeks alih-alih tersebar. UUID acak membuat indeks pada tabel besar cepat renggang                                                                                                                                                |
| Enum                 | `text` + `CHECK`              | Tipe enum bawaan Postgres menyulitkan penambahan dan penghapusan nilai. `text` dengan `CHECK` memberi perlindungan yang sama tanpa mengunci tabel                                                                                                                                                               |
| Boolean              | `boolean` dengan nilai bawaan | Boolean yang boleh kosong memaksa setiap pembaca menangani tiga keadaan, padahal maksudnya dua                                                                                                                                                                                                                  |
| Data mentah penyedia | `jsonb`                       | Isi webhook Xendit dan Meta disimpan apa adanya untuk penelusuran                                                                                                                                                                                                                                               |

Nilai uang memakai satuan rupiah penuh dengan dua desimal — bukan satuan terkecil. Jadi `total_amount = 1500000.00` berarti Rp1.500.000.

### Kenapa `owner_id` disalin ke banyak tabel

Kebijakan Row Level Security dijalankan untuk setiap baris yang disentuh. Kalau kebijakan pada `invoices` harus menaiki `rooms` lalu `properties` untuk sampai ke pemiliknya, biayanya dibayar berkali-kali dan tidak bisa dibantu indeks. Dokumentasi Supabase menyarankan dua hal untuk ini: beri indeks pada setiap kolom yang dipakai kebijakan, dan hindari subkueri yang dijalankan per baris.

Karena itu `owner_id` disalin ke `rooms`, `room_types`, `tenants`, `invoices`, `payments`, `messages`, `multi_period_groups`, `subscription_invoices`, `audit_events`, dan `public_tokens`. Aturannya: **diisi sekali saat baris dibuat dan tidak pernah berubah** — kalau kepemilikan berpindah, barisnya pindah bersama seluruh propertinya.

`invoice_items` dan `payment_links` sengaja **tidak** ikut disalin. Keduanya hanya pernah dibaca lewat tagihan induknya, jadi kebijakannya boleh menumpang kebijakan `invoices` — menyalin `owner_id` ke sana hanya menambah kolom yang bisa melenceng tanpa memberi keuntungan.

Ini memang penyalinan data, dan penyalinan selalu berisiko melenceng. Karena itu ada trigger yang memastikan `owner_id` salinan cocok dengan induknya saat baris dibuat (§10). Bayarannya: setiap kebijakan menjadi satu perbandingan berindeks, dan laporan biaya per pemilik tidak perlu menaiki empat tabel.

## 1. Lima prinsip yang membentuk skema ini

1. **Uang tidak pernah melewati Semang.** Tidak ada tabel saldo, dompet, atau dana tertahan. Yang tersimpan hanya catatan bahwa pembayaran terjadi, bukan uangnya.
2. **Tidak ada berkas.** Tidak ada satu pun kolom yang menunjuk penyimpanan file sampai fitur meteran listrik hadir di Tahap 2. Kuitansi tidak punya tabel — ia disusun saat tautannya dibuka.
3. **Tidak ada kata sandi.** Identitas masuk hanyalah tautan ke penyedia luar (Google) atau bukti kepemilikan nomor WhatsApp. Tidak ada rahasia pengguna yang perlu Semang jaga.
4. **Biaya pesan diukur, bukan diperkirakan.** Tiap pesan menyimpan hasil penagihan Meta apa adanya, sehingga margin per kost bisa dihitung dari data, bukan dari asumsi.
5. **Perubahan masa depan menambah, bukan merombak.** Fitur baru masuk sebagai baris atau tabel baru, bukan sebagai perubahan struktur tabel yang sudah berisi data.

Tiga puluh tiga tabel di diagram semuanya turun dari lima hal ini. Kalau ada usulan perubahan yang melanggar salah satunya, itu tanda desainnya perlu dibahas ulang, bukan ditambal.

## 2. Identitas & Akses

### users

Satu baris per pemilik kost. Tabel ini juga akan menampung staf dan akun penghuni kelak, tanpa migrasi.

| Kolom                              | Catatan                                                                                                                                                         |
|------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `name`, `email`, `whatsapp_number` | Ketiganya boleh kosong di tingkat database, dan itu bukan kelonggaran — alur pendaftaran memang tidak mengisi semuanya sekaligus                                |
| `email`                            | Unik bila terisi. Datang dari Google; pemilik yang mendaftar lewat nomor WhatsApp tidak punya email                                                             |
| `whatsapp_number`                  | Unik bila terisi. Pada jalur WhatsApp terisi sejak langkah 1; pada jalur Google baru terisi di langkah 3                                                        |
| `whatsapp_number_verified_at`      | Terisi saat pemilik pertama kali berhasil masuk memakai kode ke nomor itu. Kosong berarti nomor baru dipakai sebagai tujuan pengiriman, belum terbukti miliknya |
| `deletion_requested_at`            | Memulai masa tenggang 30 hari. Selama masa itu penghapusan masih bisa dibatalkan                                                                                |
| `deleted_at`                       | Diisi setelah tenggang habis dan data benar-benar dimusnahkan                                                                                                   |

**Yang dijaga aplikasi, bukan database:**

- Setiap akun wajib punya minimal satu baris `auth_identities`. Itulah yang benar-benar membuat akun bisa dimasuki — bukan `email` atau `whatsapp_number`.
- `whatsapp_number` wajib terisi sebelum tagihan pertama dikirim, karena tanpa itu contoh tagihan dan update berkala tidak punya tujuan. Yang menegakkannya adalah alur wizard (PRD §10.2 langkah 3).

Menandai ketiga kolom itu wajib akan membuat alur pendaftaran yang sudah diputuskan mustahil dijalankan: pemilik jalur Google belum punya nomor di langkah 1, dan pemilik jalur WhatsApp tidak pernah punya email.

### auth_identities

Cara masuk, disimpan terpisah dari data pemilik supaya cara masuk baru bisa ditambahkan tanpa menyentuh `users`.

| Kolom              | Nilai                                                                                        |
|--------------------|----------------------------------------------------------------------------------------------|
| `provider`         | `google`, `whatsapp`                                                                         |
| `provider_subject` | Pengenal tetap dari penyedia — `sub` dari Google, atau nomor WhatsApp yang sudah dinormalkan |

**Aturan:** tidak boleh ada dua baris yang `provider` dan `provider_subject`-nya sama. Nilai `google` sendiri boleh muncul ribuan kali; yang ditolak adalah satu identitas Google yang sama didaftarkan dua kali. Efeknya: satu akun Google hanya bisa dipakai satu pemilik, begitu juga satu nomor WhatsApp.

Kedua jalur selalu tersedia untuk setiap akun. Tidak ada pengaturan yang perlu diaktifkan lebih dulu.

### login_codes

Kode sekali pakai yang dikirim ke WhatsApp.

| Kolom            | Nilai / aturan                                                  |
|------------------|-----------------------------------------------------------------|
| `purpose`        | `login`, `change_whatsapp_number`                               |
| `user_id`        | Boleh kosong — saat pendaftaran baru, nomornya belum punya akun |
| `code_hash`      | Kode disimpan sebagai hash, bukan apa adanya                    |
| `attempt_count`  | Naik tiap percobaan salah; kode mati setelah batas tertentu     |
| `invalidated_at` | Kode lama mati begitu kode baru diminta                         |

Kode dibandingkan dengan cara yang tidak membocorkan hasil dari lama waktu pembandingan.

### request_limits

Pembatas jumlah permintaan kode. Ini bukan tabel pelengkap: satu kode berbiaya Rp356,65, dan tanpa pembatas ini endpoint pengirim kode adalah cara termudah bagi orang lain menghabiskan saldo WhatsApp Business Semang — tanpa perlu punya akun.

| Kolom             | Nilai                                                                                                                                                                                                |
|-------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `scope`           | `whatsapp_number`, `account`, `ip_address`                                                                                                                                                           |
| `violation_count` | Berapa kali sasaran ini sudah melewati batas. Inilah yang membuat jeda bisa naik bertingkat — tanpa hitungan ini, `blocked_until` sendiri tidak bisa membedakan pelanggaran pertama dari yang kelima |
| `blocked_until`   | Sampai kapan permintaan ditolak; panjangnya mengikuti `violation_count` (TRD §8.3)                                                                                                                   |

**Aturan:** tidak boleh ada dua baris yang `scope`, `scope_key`, dan `window_start`-nya sama. Jadi satu sasaran hanya punya satu baris hitungan per jendela waktu, dan dua permintaan yang datang bersamaan tidak berakhir jadi dua hitungan terpisah yang masing-masing masih di bawah batas.

Tabel ini dinamai `request_limits`, bukan khusus kode, supaya pembatas untuk endpoint lain (misalnya pengiriman contoh tagihan) memakai mekanisme yang sama.

## 3. Rekening Bank & Sub-akun Xendit

### bank_accounts

Rekening tujuan milik pemilik. Terpisah dari `users` supaya satu pemilik bisa punya lebih dari satu rekening.

Perannya berubah mengikuti status verifikasi: sebelum verifikasi selesai, nomornya dicantumkan di pesan tagihan untuk transfer biasa. Sesudahnya, ia menjadi rekening tujuan penyelesaian dana dari sub-akun Xendit.

### xendit_sub_accounts

Satu baris per pemilik, dibuat saat pemilik mulai proses verifikasi.

| Kolom                        | Nilai                                                 |
|------------------------------|-------------------------------------------------------|
| `verification_status`        | `not_started`, `in_progress`, `completed`, `rejected` |
| `xendit_account_id`          | Pengenal sub-akun di sisi Xendit                      |
| `settlement_bank_account_id` | Menunjuk `bank_accounts`                              |

**Tidak ada kolom data identitas di sini.** Formulir verifikasi memang tampil di dalam Semang, tetapi isinya diteruskan langsung ke Xendit dan tidak disimpan — yang dicatat hanya statusnya. Ini keputusan yang sengaja diambil: data identitas adalah data yang paling berat akibatnya kalau bocor, dan Semang tidak punya alasan menyimpannya.

`verification_status` menentukan isi pesan tagihan: nomor rekening pemilik selama belum `completed`, link pembayaran Xendit setelahnya.

## 4. Properti & Penyewa

### provinces dan regions

Daftar wilayah administratif Indonesia: 38 provinsi dan sekitar 514 kota dan kabupaten. Dipakai sebagai pilihan saat pemilik menentukan lokasi kostnya, dan sekaligus sebagai sumber zona waktu.

**provinces**

| Kolom             | Catatan                                                                      |
|-------------------|------------------------------------------------------------------------------|
| `statistics_code` | Kode resmi Badan Pusat Statistik. Unik, dan bertahan melewati perubahan nama |
| `timezone`        | `Asia/Jakarta` (WIB), `Asia/Makassar` (WITA), atau `Asia/Jayapura` (WIT)     |

**regions**

| Kolom                     | Catatan                                                                                                                                                              |
|---------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `province_id`             | Wilayah induknya                                                                                                                                                     |
| `statistics_code`         | Kode resmi Badan Pusat Statistik, empat digit. Unik                                                                                                                  |
| `name`                    | Nama tanpa awalan, misalnya `Denpasar` atau `Badung`                                                                                                                 |
| `kind`                    | `city` untuk kota, `regency` untuk kabupaten. Nama lengkapnya disusun saat ditampilkan, sehingga "Badung" dan "Kabupaten Badung" tidak pernah jadi dua nilai berbeda |
| `superseded_by_region_id` | Terisi bila wilayah dipecah atau digabung; kost lama tetap menunjuk wilayah aslinya tanpa datanya hilang                                                             |

**Zona waktu diletakkan di provinsi, bukan di wilayah.** Batas WIB, WITA, dan WIT mengikuti batas provinsi. Kalau 514 baris masing-masing membawa zonanya sendiri, akan ada kabupaten yang zonanya tidak cocok dengan provinsinya dan tidak ada yang mencegahnya. Indonesia juga tidak mengenal waktu musim panas, jadi pemetaan ini tidak pernah bergeser sepanjang tahun.

**Wilayah harus berupa pilihan, bukan isian bebas.** Kalau pemilik mengetik sendiri, "Denpasar", "denpasar", dan "Dps" jadi tiga nilai berbeda dan dua di antaranya gagal menemukan zona waktunya.

Karena pilihannya ratusan, kolom `name` perlu indeks pencarian teks — daftar sepanjang itu tidak bisa disajikan sebagai dropdown biasa kepada pemilik non-teknis, melainkan sebagai pencarian bertaip.

Data ini diisi sekali lewat migrasi dari daftar resmi Kemendagri atau Badan Pusat Statistik, dan diperbarui saat ada pemekaran wilayah — seperti empat provinsi baru di Papua yang terbentuk pada 2022.

### properties

| Kolom           | Nilai / aturan                                                                                                                               |
|-----------------|----------------------------------------------------------------------------------------------------------------------------------------------|
| `due_date_mode` | `from_move_in_date` (bawaan), `fixed_day`                                                                                                    |
| `fixed_due_day` | Hanya terpakai pada mode `fixed_day`. Tanggal 29–31 digeser ke hari terakhir bulan itu                                                       |
| `region_id`     | Menunjuk `regions` — kota atau kabupaten tempat kost berada. Boleh kosong sampai langkah 7 wizard, karena kost sudah dibuat di langkah 2     |
| `timezone`      | Zona waktu **kost**, bukan zona pemiliknya. Disalin dari provinsi wilayah yang dipilih, dan pemilik boleh menimpanya untuk kasus tidak biasa |
| `deleted_at`    | Baris ditandai terhapus tanpa benar-benar dibuang, supaya tagihan lama tetap bisa dijelaskan                                                 |

**Zona waktu diturunkan dari wilayah, lalu dibekukan.** Nilainya **disalin** dari `provinces.timezone` lewat wilayah yang dipilih, tidak dibaca ulang setiap kali dipakai. Kalau daftar wilayah diperbarui kemudian, jatuh tempo kost yang sudah berjalan tidak ikut bergeser — dan pemilik yang punya alasan khusus bisa menimpanya tanpa wilayahnya jadi salah.

Zona perangkat pemilik **tidak** dipakai. Yang menentukan tanggal jatuh tempo adalah lokasi kost, bukan lokasi ponsel pemiliknya — dan zona perangkat berubah setiap kali pemiliknya bepergian.

`region_id` dan `timezone` boleh kosong berbarengan selama kost baru dibuat di langkah 2 wizard dan wilayahnya belum diisi. Yang menjaganya bukan `NOT NULL`, melainkan aturan di §10: cron penagihan menolak membuat tagihan untuk properti yang zona waktunya belum ada. Jadi keadaan setengah terisi itu hanya bisa hidup selama wizard, tidak sampai siklus penagihan pertama.

Nilai ini tidak menentukan cara waktu disimpan — semua kolom waktu sudah memakai `timestamptz`. Yang ditentukannya hanya satu hal: tanggal jatuh tempo jatuh di hari kalender yang mana.

### room_types dan rooms

Urutan harga yang dipakai, dari yang paling menang:

1. `rooms.rent_override` — harga khusus satu kamar
2. `room_types.rent` — harga tipe kamar
3. `properties.default_rent` — harga bawaan properti

| Kolom                      | Nilai                                                                                                                                                                                                   |
|----------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `rooms.status`             | `vacant`, `occupied`, `reserved`, `under_construction`, `under_renovation`, `unavailable`. `occupied` dan `reserved` diperbarui otomatis dari penempatan kamar yang berlaku; sisanya ditetapkan pemilik |
| `rooms.unavailable_reason` | Hanya terpakai pada status `unavailable`, untuk sebab di luar pembangunan dan renovasi                                                                                                                  |

**Aturan:** tidak boleh ada dua kamar dengan `room_number` sama di dalam satu properti. Kost lain tetap boleh punya kamar bernomor 1.

### tenants

| Kolom                           | Nilai / aturan                                                                                                                                                                            |
|---------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `rent_unit`                     | `monthly`, `weekly`, `daily`                                                                                                                                                              |
| `unit_amount`                   | Harian = harga bulanan ÷ 30 dibulatkan ke ribuan ke atas; mingguan = harian × 7                                                                                                           |
| `unit_amount_is_override`       | Menandai bahwa pemilik menimpa harga turunan — banyak kost harian menetapkan tarifnya sendiri                                                                                             |
| `first_invoice_treatment`       | `prorate`, `merge_forward`, `full_month`. Hanya relevan pada mode `fixed_day`                                                                                                             |
| `property_id`                   | Penghuni menempel pada properti; kamar yang ditempatinya dicatat di `room_assignments`                                                                                                    |
| `moved_out_at`                  | Kosong berarti masih menyewa. Hanya satu penempatan berlaku per kamar pada satu waktu                                                                                                     |
| `consent_at`, `consent_version` | Bukti persetujuan pemakaian data pada formulir pengisian mandiri, beserta versi teksnya                                                                                                   |
| `messaging_opted_out_at`        | Penghuni menarik persetujuan dikirimi pesan. Terisi berarti Semang berhenti mengirim ke nomornya, tanpa perlu menghapus penghuninya atau mengosongkan kamarnya                            |
| `anonymized_at`                 | Nama dan nomor benar-benar dikosongkan atas permintaan penghapusan data — karena itu `name` dan `whatsapp_number` boleh kosong — sementara barisnya tetap ada agar tagihannya tidak rusak |
| `user_id`                       | Kosong sampai portal penghuni hadir di Tahap 2                                                                                                                                            |

Menyimpan `consent_version`, bukan hanya waktunya, penting karena teks persetujuan akan berubah — dan yang perlu dibuktikan adalah persetujuan atas teks yang mana.

**Hak hapus data penghuni.** Kebijakan Privasi menjanjikan penghuni bisa meminta datanya dihapus, sementara tagihan lama adalah pembukuan pemilik yang tidak boleh rusak. Keduanya berjalan bersamaan lewat dua kolom: `invoices` menyimpan nama dan nomor penghuni **saat tagihan dibuat**, jadi baris penghuni bisa dianonimkan tanpa membuat satu pun tagihan kehilangan isinya. Yang dihapus adalah orangnya sebagai data pribadi, bukan catatan transaksinya.

### room_assignments

Penghuni menempel pada **properti**, bukan pada satu kamar. Kamar mana yang ia tempati dicatat di tabel ini, dan bisa berubah sepanjang masa sewanya.

| Kolom                    | Nilai / aturan                                                                                                                                                                                                                                                           |
|--------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `kind`                   | `permanent` untuk penempatan biasa, `temporary` untuk pemindahan sementara. Penempatan `temporary` dapat berubah menjadi `permanent` bila penyewa akhirnya menetap di kamar itu — saat itu `returns_to_room_id` dikosongkan dan kamar asal berhenti berstatus `reserved` |
| `reason`                 | Kenapa dipindahkan, misalnya renovasi kamar asalnya                                                                                                                                                                                                                      |
| `returns_to_room_id`     | Kamar yang akan ditempati kembali setelah penempatan sementara berakhir                                                                                                                                                                                                  |
| `started_on`, `ended_on` | Masa berlaku penempatan. `ended_on` kosong berarti sedang berlaku                                                                                                                                                                                                        |

**Kenapa status kamar dibedakan.** Kamar yang sedang dibangun belum pernah bisa disewakan; kamar yang sedang direnovasi sudah ada dan pernah menghasilkan. Keduanya tidak boleh terhitung sebagai kamar kosong yang menunggu penyewa — kalau digabung jadi satu status, angka okupansi pemilik terlihat buruk hanya karena ada kamar yang belum jadi. `reserved` berbeda lagi: kamar itu sebenarnya masih ditempati, hanya penghuninya sedang menumpang di kamar lain.

**Kenapa bukan satu kolom kamar di `tenants`.** Menempelkan penghuni langsung ke satu kamar memperlakukan penghuni sebagai slot kamar, padahal ia orang yang menyewa dan penempatannya berubah. Kasus yang paling jelas: kamar penghuni direnovasi, ia dipindah sementara ke kamar kosong, lalu kembali. Dengan satu kolom kamar, tiga hal langsung salah:

- Kamar asalnya terlihat kosong dan bisa tanpa sengaja disewakan ke orang lain.
- Sewanya berubah kalau kamar penggantinya kebetulan bertipe lebih mahal.
- Setelah kembali, riwayatnya terlihat seperti dua penghuni berbeda.

Dengan tabel penempatan, ketiganya selesai. Kamar asal berstatus `reserved` selama penempatan sementara berlaku, jadi tidak muncul sebagai kamar tersedia. Sewa tidak ikut berubah karena nominalnya sudah tersimpan di `tenants.unit_amount`, bukan diambil ulang dari kamar. Dan riwayatnya tetap satu orang yang sama.

**Yang perlu diperhatikan saat menghitung kamar terisi.** Selama penempatan sementara berlaku, satu penghuni terkait dua kamar: kamar asal berstatus `reserved` dan kamar sementara `occupied`. Karena itu jumlah kamar terisi untuk penagihan langganan (PRD §8.10) dihitung dari **jumlah penghuni aktif**, bukan dari jumlah kamar berstatus terisi — kalau tidak, pemilik akan tertagih dua kali untuk satu orang.

## 5. Penagihan

### multi_period_groups

Pembayaran di muka beberapa periode sekaligus dengan diskon yang **ditentukan pemilik sendiri** — Semang tidak memaksakan formula, karena besaran diskon sangat berbeda antar kost.

| Kolom                                             | Nilai                                                                                         |
|---------------------------------------------------|-----------------------------------------------------------------------------------------------|
| `discount_kind`                                   | `fixed_amount`, `percentage`                                                                  |
| `amount_before_discount`, `amount_after_discount` | Keduanya disimpan supaya diskon tetap bisa dijelaskan meski harga sewa sudah berubah kemudian |
| `discount_invoice_id`                             | Tagihan mana dari kelompok itu yang memuat baris diskonnya                                    |

**Urutan penulisan.** `invoices.multi_period_group_id` menunjuk ke kelompok, sementara `multi_period_groups.discount_invoice_id` menunjuk balik ke salah satu tagihan. Karena saling menunjuk, penulisannya tiga langkah dalam satu transaksi: buat kelompoknya, buat tagihan-tagihannya, lalu isi `discount_invoice_id`.

**Diskon diletakkan di satu tagihan, bukan disebar.** Tanpa aturan ini, dua orang yang membangun fitur ini akan memilih berbeda dan laporannya ikut berbeda. Yang dipilih: seluruh diskon masuk sebagai satu baris `invoice_items` bernilai negatif pada tagihan periode pertama, dan `discount_invoice_id` menunjuk tagihan itu. Alasannya sederhana — penghuni membayar di muka sekaligus, jadi potongannya terasa di pembayaran pertama, bukan dicicil sebagai potongan kecil sepanjang tahun.

### invoice_counters

Penghitung nomor tagihan per pemilik per bulan.

| Kolom         | Catatan                                            |
|---------------|----------------------------------------------------|
| `period`      | `YYYYMM`                                           |
| `last_number` | Nomor terakhir yang sudah dipakai pada periode itu |

**Aturan:** tidak boleh ada dua baris penghitung dengan `owner_id` dan `period` yang sama.

Nomor tagihan diambil dengan mengunci baris ini di dalam transaksi yang sama dengan pembuatan tagihan, lalu menaikkan `last_number`. Nilai tertinggi pada `invoices` **tidak** dipakai sebagai dasar: dua cron yang berjalan bersamaan akan membaca nilai yang sama dan menghasilkan nomor kembar (TRD §5.2).

### invoices

Tabel paling banyak aturannya.

| Kolom                                                     | Nilai / aturan                                                                                                                                                                                     |
|-----------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `invoice_number`                                          | Nomor yang bisa dibaca dan disebut manusia, berurut per pemilik. `uuid` tidak bisa ditulis di pesan WhatsApp atau kuitansi                                                                         |
| `tenant_name_snapshot`, `tenant_whatsapp_number_snapshot` | Nama dan nomor penghuni saat tagihan dibuat. Kuitansi lama karena itu selalu menampilkan nama yang benar meski nama penghuni diperbaiki kemudian, dan tetap utuh setelah data penghuni dianonimkan |
| `status`                                                  | `draft`, `sent`, `partially_paid`, `paid`, `overdue`, `defaulted`, `cancelled`                                                                                                                     |
| `rent_unit`                                               | `monthly`, `weekly`, `daily` — disalin dari penghuni saat tagihan dibuat                                                                                                                           |
| `period_start`, `period_end`                              | Tanggal, bukan penanda bulan, karena sewa bisa mingguan dan harian                                                                                                                                 |
| `parent_invoice_id`                                       | Menunjuk tagihan induk saat sisa cicilan berdiri sebagai tagihan terbuka sendiri dengan link-nya sendiri                                                                                           |
| `multi_period_group_id`, `period_sequence`                | Mengaitkan tagihan-tagihan yang lahir dari satu pembayaran di muka                                                                                                                                 |
| `amount_paid`                                             | Akumulasi pembayaran; `partially_paid` berlaku selama masih di bawah `total_amount`                                                                                                                |
| `cancellation_reason`                                     | `owner_cancelled`, `early_checkout_refund`                                                                                                                                                         |
| `idempotency_key`                                         | Unik. Menjaga cron yang berjalan dua kali tidak membuat tagihan ganda                                                                                                                              |

**Aturan:** tidak boleh ada dua tagihan dengan `invoice_number` sama milik satu pemilik. Nomor boleh berulang antar pemilik.

Perubahan harga sewa hanya berlaku untuk tagihan yang belum dibuat — tagihan yang sudah ada tidak pernah berubah. Karena itu `subtotal` dan `total_amount` disimpan sebagai angka, bukan dihitung ulang dari harga kamar saat dibaca.

### invoice_items

| Kolom  | Nilai                                       |
|--------|---------------------------------------------|
| `kind` | `rent`, `prorate`, `discount`, `adjustment` |

Baris `discount` bernilai negatif supaya tampak terpisah di tagihan dan terekam di laporan. Listrik (Tahap 2) dan denda (Tahap 3) masuk sebagai `kind` baru — `electricity` dan `late_fee` — tanpa menyentuh tabel `invoices`.

## 6. Pembayaran

### payment_links

Link pembayaran Xendit dengan nominal terkunci. Penghuni tidak pernah mengetik angka. Satu link per tagihan atau per cicilan.

| Kolom           | Nilai                                                                                              |
|-----------------|----------------------------------------------------------------------------------------------------|
| `status`        | `active`, `paid`, `expired`, `cancelled`                                                           |
| `superseded_at` | Terisi saat link baru dibuat untuk tagihan yang sama, sehingga selalu jelas link mana yang berlaku |

### payments

Sumber kebenaran pembayaran.

| Kolom                                   | Nilai / aturan                                                                                        |
|-----------------------------------------|-------------------------------------------------------------------------------------------------------|
| `source`                                | `xendit`, `cash`, `direct_transfer`                                                                   |
| `currency`                              | `IDR`. Ada di sini supaya nilai uang tidak pernah berdiri tanpa satuannya, sama seperti di `invoices` |
| `status`                                | `pending`, `settled`, `failed`                                                                        |
| `is_auto_verified`                      | `true` untuk pembayaran yang dipastikan sistem Xendit, `false` untuk yang murni diklaim pemilik       |
| `recorded_by`                           | Hanya terisi pada penandaan lunas manual                                                              |
| `note`                                  | Catatan singkat opsional dari pemilik                                                                 |
| `provider_reference`, `idempotency_key` | Unik. Webhook Xendit yang datang dua kali tidak menghasilkan dua pembayaran                           |

`is_auto_verified` mengisi KPI perbandingan pelunasan otomatis versus manual (PRD §14), dan memisahkan keduanya di laporan kas.

## 7. Pesan WhatsApp

### message_templates

| Kolom                | Nilai                                                    |
|----------------------|----------------------------------------------------------|
| `category`           | `utility`, `authentication`                              |
| `status`             | `pending_review`, `approved`, `rejected`, `paused`       |
| `version`            | Naik tiap kali isi template diubah dan didaftarkan ulang |
| `meta_template_name` | Nama template di sisi Meta                               |

Salah masuk kategori `marketing` menaikkan tarif dari Rp356,65 ke Rp586,33 per pesan. Karena itu kategori disimpan sebagai data yang bisa diperiksa, bukan asumsi di dalam kode.

### message_rates

Tarif per pesan disimpan sebagai data beserta tanggal berlakunya.

| Kolom                            | Nilai                                                                     |
|----------------------------------|---------------------------------------------------------------------------|
| `category`                       | `utility`, `authentication`, `marketing`                                  |
| `effective_from`, `effective_to` | Meta hanya mengubah tarif tiap 1 Januari, 1 April, 1 Juli, atau 1 Oktober |
| `source_url`, `read_at`          | Tautan sumber dan kapan angkanya dibaca                                   |

**Aturan:** tidak boleh ada dua tarif yang `market`, `category`, dan `effective_from`-nya sama. Jadi saat biaya sebuah pesan dihitung, hanya ada satu tarif yang cocok — bukan dua yang sama-sama berlaku.

Ini yang membuat laporan biaya historis tetap benar setelah tarif naik: pesan bulan lalu tetap dihitung dengan tarif bulan lalu. Kalau tarif ditulis sebagai konstanta di kode, seluruh riwayat biaya berubah setiap kali angkanya diperbarui.

### messages

Satu tabel untuk semua pesan keluar — tagihan, pengingat, ringkasan ke pemilik, kode masuk, dan contoh tagihan saat pendaftaran.

| Kolom                                                               | Nilai / aturan                                                                                                                                                                                                |
|---------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `kind`                                                              | `invoice`, `reminder_day_plus_2`, `reminder_day_plus_3`, `reminder_day_plus_7`, `periodic_summary`, `login_code`, `sample_invoice`, `subscription_payment_failed`                                             |
| `status`                                                            | `scheduled`, `sent`, `delivered`, `failed`, `cancelled`                                                                                                                                                       |
| `invoice_id` / `property_id` / `login_code_id` / `subscription_id`  | Tepat satu yang terisi, dijaga `CHECK`. `subscription_id` dipakai untuk peringatan gagal bayar langganan ke pemilik — pesan yang tidak menyangkut tagihan, properti, maupun kode masuk mana pun               |
| `cancelled_at`                                                      | Pengingat terjadwal dibatalkan begitu tagihan lunas atau dibatalkan                                                                                                                                           |
| `is_billable`, `pricing_category`, `pricing_type`, `charged_amount` | Diisi dari objek `pricing` pada webhook status Cloud API                                                                                                                                                      |
| `message_rate_id`                                                   | Tarif mana yang berlaku saat pesan itu dikirim                                                                                                                                                                |
| `template_version`                                                  | Versi template yang benar-benar dipakai. Tanpa ini, isi pesan yang diterima penghuni bulan lalu tidak bisa direkonstruksi setelah templatenya direvisi                                                        |
| `owner_id`                                                          | Pemilik yang menanggung biaya pesan ini. Terisi untuk semua jenis pesan, termasuk kode masuk yang tidak punya properti — tanpa kolom ini, biaya pesan kode akan luput dari laporan biaya per pemilik (NFR-14) |
| `whatsapp_message_id`                                               | Pengenal pesan dari Meta, unik                                                                                                                                                                                |

Tagihan bulanan dikirim tiga hari sebelum jatuh tempo dan sekaligus menjadi peringatan pertama (§8.7). `reminder_day_plus_2` hanya dipakai sewa mingguan. `subscription_payment_failed` adalah peringatan ke pemilik saat penagihan langganan gagal, selama masa tenggang.

Biaya dihitung dari pesan yang **benar-benar sampai**, bukan dari yang masuk antrean kirim. Pesan yang gagal kirim tidak dihitung sebagai biaya.

Semua jenis pesan berbagi satu tabel karena melewati satu jalur pengiriman dan satu cara penagihan, sehingga biaya pesan per kost per bulan terjawab dari satu tempat.

## 8. Langganan

### plans

| Kolom                                 | Nilai                                          |
|---------------------------------------|------------------------------------------------|
| `code`                                | `not_subscribed`, `starter`, `pro`, `business` |
| `is_purchasable`                      | `false` untuk `not_subscribed`                 |
| `maximum_rooms`, `maximum_properties` | Kosong berarti tak terbatas                    |

`not_subscribed` ada di tabel ini **bukan karena ia sebuah paket**, tetapi supaya hak akses fitur punya satu mekanisme, bukan dua. Antarmuka tidak pernah menyebutnya paket. Baris ini punya `maximum_rooms` dan `maximum_properties` kosong: berhenti berlangganan tidak pernah membatasi ukuran kost.

Paket berbayar mengikuti ukuran kost, bukan dipilih pemilik. Tidak ada perpindahan menyamping atau menurun antar paket berbayar.

### plan_features

**Aturan:** tidak boleh ada dua baris untuk fitur yang sama di dalam satu paket. Pembagiannya: fitur yang tidak mengeluarkan uang dibagi menurut kebutuhan, fitur yang mengeluarkan biaya pesan diberikan sama rata di semua paket berbayar.

Yang membedakan keadaan tidak berlangganan dari Starter, pada dasarnya, hanya satu baris: `automatic_sending` bernilai `false`.

### subscriptions

Satu baris per pemilik.

| Kolom                       | Nilai / aturan                                                    |
|-----------------------------|-------------------------------------------------------------------|
| `status`                    | `trial`, `active`, `grace_period`, `not_subscribed`               |
| `billing_cycle`             | `monthly`, `yearly`                                               |
| `trial_ends_at`             | 60 hari kalender sejak mulai, bukan hitungan siklus per-penghuni  |
| `grace_period_ends_at`      | Gagal bayar karena hal teknis tidak langsung mematikan pengiriman |
| `cancellation_effective_at` | Berhenti berlangganan mulai berlaku siklus berikutnya             |

Dua kolom terakhir menjawab hal yang sama dari dua arah: pengiriman tidak boleh mati karena kejadian yang bukan keputusan pemilik. Kartu yang kedaluwarsa masuk `grace_period`; permintaan berhenti masuk `cancellation_effective_at` dan siklus yang sedang jalan tetap diselesaikan.

### subscription_invoices

Tagihan Semang **kepada pemilik** — terpisah dari tagihan pemilik kepada penghuni. Inilah pendapatan Semang.

| Kolom                                                | Kenapa ada                                                                                                                                                                                         |
|------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `occupied_rooms_snapshot`, `snapshot_taken_at`       | Jumlah kamar terisi pada tanggal penagihan. Perubahan okupansi di tengah bulan berlaku pada penagihan berikutnya, tanpa prorata                                                                    |
| `price_per_room`, `computed_amount`                  | Harga saat itu, supaya tagihan lama tetap bisa dijelaskan setelah harga paket berubah                                                                                                              |
| `minimum_monthly_applied`                            | Menandai tagihan yang naik ke minimum bulanan, bukan mengikuti harga per kamar                                                                                                                     |
| `billing_cycle`                                      | `monthly` atau `yearly`. Tanpa kolom ini, tagihan tahunan tidak bisa dibedakan dari tagihan bulanan yang nominalnya kebetulan besar                                                                |
| `discount_amount`                                    | Potongan yang diberikan, misalnya diskon setara dua bulan pada pembayaran tahunan (PRD §12.3). Disimpan terpisah supaya selisih antara `computed_amount` dan `total_amount` selalu bisa dijelaskan |
| `plan_id`                                            | Paket yang berlaku saat tagihan dibuat, supaya tagihan lama tetap bisa dijelaskan setelah pemilik naik paket                                                                                       |
| `provider_reference`                                 | Pengenal transaksi di sisi penyedia pembayaran; unik                                                                                                                                               |
| `failure_reason`, `attempt_count`, `last_attempt_at` | Jejak penagihan yang gagal                                                                                                                                                                         |
| `status`                                             | `open`, `paid`, `failed`, `cancelled`                                                                                                                                                              |

**Kegagalan penagihan harus tercatat**, karena `subscriptions.grace_period_ends_at` bergantung pada tahu bahwa suatu penagihan gagal — bukan sekadar belum dibayar. Tanpa `failure_reason` dan `attempt_count`, masa tenggang tidak punya pemicu yang bisa dipercaya.

Snapshot disimpan, bukan dihitung ulang, karena okupansi berubah terus. Tanpa snapshot, tagihan tiga bulan lalu tidak akan bisa dipertanggungjawabkan.

## 9. Akses Publik, Jejak Aksi & Integrasi

### public_tokens

| Kolom                                 | Nilai                                                            |
|---------------------------------------|------------------------------------------------------------------|
| `kind`                                | `tenant_self_fill`, `receipt`, `payment`                         |
| `target_type`                         | `room`, `invoice`                                                |
| `token_hash`                          | Token acak minimal 128 bit, disimpan sebagai hash                |
| `expires_at`, `used_at`, `revoked_at` | Link pengisian mandiri mati setelah dipakai atau setelah 30 hari |

**Kuitansi tidak punya tabel sendiri.** Ia disusun saat tautannya dibuka, langsung dari `invoices` dan `payments`. Akibatnya: tidak ada berkas menumpuk, kuitansi selalu cocok dengan data terbaru, dan penghapusan data ikut melenyapkan kuitansinya tanpa perlu mencari berkas sisa.

### audit_events

Satu tabel jejak untuk semua entitas, bukan satu tabel per entitas.

| Kolom         | Nilai                                                                                                      |
|---------------|------------------------------------------------------------------------------------------------------------|
| `entity_type` | `invoice`, `payment`, `user`, `subscription`, `tenant`, `property`, `room_type`, `room`, `room_assignment` |
| `actor_id`    | Kosong berarti tindakan oleh sistem, bukan oleh orang                                                      |

Satu tabel dengan `entity_type` menampung jenis entitas baru tanpa menuntut tabel jejak baru tiap kali.

Empat jenis terakhir tidak bisa dihilangkan: penimpaan zona waktu properti oleh pemilik harus terjejak (§10), perubahan harga sewa terjadi pada properti, tipe kamar, dan kamar, dan pemindahan penyewa antar kamar harus bisa ditelusuri.

### message_cost_months

Ringkasan biaya pesan per kost per bulan.

| Kolom                                                 | Catatan                                                                               |
|-------------------------------------------------------|---------------------------------------------------------------------------------------|
| `property_id`                                         | Boleh kosong untuk pesan yang tidak menyangkut properti mana pun, misalnya kode masuk |
| `month`                                               | Tanggal pertama bulan yang diringkas                                                  |
| `delivered_count`, `billable_count`, `charged_amount` | Jumlah pesan sampai, jumlah yang ditagih, dan total biayanya                          |
| `summarised_at`                                       | Kapan ringkasan itu dibuat                                                            |

**Aturan:** tidak boleh ada dua baris dengan `owner_id`, `property_id`, dan `month` yang sama; baris dengan `property_id` kosong dihitung sebagai satu kelompok tersendiri.

**Kenapa tabel, bukan view.** Baris `messages` dihapus setelah 24 bulan (TRD §14), jadi view yang menghitung dari `messages` akan kehilangan riwayat biaya tepat pada saat riwayat itu paling berguna — saat menilai apakah harga paket bertahan sepanjang tahun. Ringkasan ditulis lebih dulu, lalu baris rincinya boleh dihapus.

### webhook_events

| Kolom         | Nilai                                                           |
|---------------|-----------------------------------------------------------------|
| `source`      | `xendit`, `meta`                                                |
| `external_id` | Unik. Pengiriman ulang dari penyedia aman diterima berkali-kali |

Webhook dicatat lebih dulu, diproses kemudian. Kalau pemrosesan gagal, datanya sudah aman dan bisa dicoba lagi.

## 10. Aturan integritas yang perlu ditegakkan di database

Hal-hal berikut tidak cukup dijaga di kode aplikasi, karena cron dan webhook bisa berjalan bersamaan.

| Aturan                                                         | Cara                                                                                                                                                                                                                |
|----------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Satu penempatan berlaku per kamar                              | Indeks unik pada `room_assignments (room_id)` yang hanya menghitung baris dengan `ended_on` kosong                                                                                                                  |
| Satu penempatan berlaku per penghuni                           | Indeks unik pada `room_assignments (tenant_id)` yang hanya menghitung baris dengan `ended_on` kosong — penghuni tidak bisa menempati dua kamar sekaligus                                                            |
| Kamar asal tidak disewakan saat penghuninya dipindah sementara | Kamar yang menjadi `returns_to_room_id` pada penempatan sementara yang berlaku berstatus `reserved`, bukan `vacant`                                                                                                 |
| Kamar terisi dihitung dari penghuni, bukan kamar               | Penagihan langganan menghitung penghuni aktif, supaya penempatan sementara tidak membuat satu orang tertagih dua kali                                                                                               |
| Satu tagihan per kamar per periode                             | Kolom unik `invoices (idempotency_key)`                                                                                                                                                                             |
| Nomor tagihan berurut per pemilik                              | Kolom unik `invoices (owner_id, invoice_number)`                                                                                                                                                                    |
| Satu pembayaran per referensi penyedia                         | Kolom unik `payments (provider_reference)` dan `payments (idempotency_key)`                                                                                                                                         |
| Satu pesan per kejadian terjadwal                              | Kolom unik `messages (idempotency_key)`                                                                                                                                                                             |
| Tepat satu konteks pada `messages`                             | `CHECK` atas `invoice_id`, `property_id`, `login_code_id`                                                                                                                                                           |
| Nilai enum tidak boleh sembarangan                             | `CHECK` pada tiap kolom enum, berisi daftar nilai yang tercantum di kamus ini                                                                                                                                       |
| Nilai uang tidak boleh negatif                                 | `CHECK (amount >= 0)`, kecuali `invoice_items.amount` yang memang negatif untuk baris diskon                                                                                                                        |
| `amount_paid` tidak melewati `total_amount`                    | `CHECK`, dan penambahan pembayaran memakai penguncian baris tagihan                                                                                                                                                 |
| `rooms.status` cocok dengan penghuninya                        | Diperbarui lewat trigger saat penghuni masuk atau keluar, bukan diisi aplikasi                                                                                                                                      |
| `invoices.status` cocok dengan `amount_paid`                   | Dihitung di satu tempat saat pembayaran dicatat, di dalam transaksi yang sama                                                                                                                                       |
| `invoices.room_id` cocok dengan kamar penghuninya              | Diperiksa saat tagihan dibuat; setelahnya sengaja tidak diikat, karena penghuni boleh pindah kamar sementara tagihan lama tetap menunjuk kamar yang ditagih                                                         |
| Kamar tidak melampaui rentang paket                            | Diperiksa saat kamar ditambah dan saat pembangunan ditandai selesai, bukan saat langganan berubah                                                                                                                   |
| Kamar dalam pembangunan tidak dihitung dalam batas paket       | Hitungan batas paket melewati status `under_construction`, tetapi **tetap** menghitung `under_renovation` — kalau renovasi juga dikecualikan, statusnya menjadi cara menghindari batas                              |
| Penyewa hanya masuk ke kamar kosong                            | Penempatan baru hanya boleh menunjuk kamar berstatus `vacant`. Inilah yang menutup celahnya: kamar yang dibiarkan berstatus `under_construction` untuk menghindari batas paket juga tidak bisa menghasilkan apa pun |
| Pemisahan data antar pemilik                                   | Row Level Security di semua tabel, memakai `owner_id` pada tabel itu sendiri                                                                                                                                        |
| `owner_id` salinan cocok dengan induknya                       | Diperiksa trigger saat baris dibuat. Kolom salinan yang bisa melenceng dari sumbernya lebih berbahaya daripada join yang lambat                                                                                     |
| Nomor tagihan tidak pernah bentrok                             | Diambil dari penghitung per pemilik di dalam transaksi yang sama, memakai penguncian baris — bukan dari `MAX(invoice_number) + 1`, yang menghasilkan nomor kembar saat cron berjalan bersamaan                      |
| Hanya satu link pembayaran berlaku per tagihan                 | Indeks unik pada `payment_links (invoice_id)` yang hanya menghitung baris dengan `superseded_at` kosong dan `status = 'active'`                                                                                     |
| `fixed_due_day` masuk akal                                     | `CHECK (fixed_due_day BETWEEN 1 AND 31)`                                                                                                                                                                            |
| Wilayah dan zona waktu terisi berbarengan                      | `CHECK ((region_id IS NULL) = (timezone IS NULL))` — tidak boleh ada properti berwilayah tanpa zona waktu                                                                                                           |
| Zona waktu cocok dengan provinsi wilayahnya                    | Diperiksa saat wilayah dipilih; penimpaan manual oleh pemilik dicatat di `audit_events` agar selisihnya tidak tampak seperti bug                                                                                    |
| Tagihan tidak dibuat tanpa zona waktu                          | Cron penagihan melewati properti yang `timezone`-nya kosong dan mencatatnya sebagai perlu ditindak, bukan menebak zonanya                                                                                           |
| Jejak tidak hilang saat pengguna dihapus                       | `audit_events.actor_id` memakai `ON DELETE SET NULL`; kejadiannya tetap tercatat meski pelakunya sudah tidak ada                                                                                                    |
| Tagihan tidak ikut terhapus bersama penghuni                   | `invoices.tenant_id` memakai `ON DELETE RESTRICT`; penghuni dianonimkan, bukan dihapus                                                                                                                              |
| Setiap foreign key punya indeks                                | Postgres tidak membuatnya otomatis; tanpa indeks, penghapusan baris induk memicu pemindaian penuh tabel anak                                                                                                        |
| Perilaku penghapusan ditulis eksplisit                         | Tiap foreign key menyatakan `ON DELETE` — `CASCADE` untuk anak yang tidak berarti tanpa induknya, `RESTRICT` untuk yang tidak boleh ikut hilang                                                                     |
| Penghapusan bertanda ikut turun                                | Properti yang ditandai terhapus menyembunyikan kamar, penghuni, dan tagihannya lewat view atau kondisi kebijakan — bukan mengandalkan setiap kueri mengingat menyaringnya                                           |

Tabel yang diakses tanpa akun (`public_tokens` dan halaman yang dibukanya) memakai jalur terpisah dengan hak baca terbatas — bukan mematikan Row Level Security.

## 11. Pertumbuhan & indeks

Dua tabel akan jauh lebih besar dari yang lain, dan keduanya tumbuh mengikuti jumlah pesan, bukan jumlah kost:

| Tabel          | Perkiraan                                                                      | Indeks yang menahan beban                                                                                                      |
|----------------|--------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------|
| `messages`     | Sekitar 1,2 baris per kamar terisi per bulan, ditambah update berkala per kost | `(scheduled_at, status)` untuk cron pengirim; `(invoice_id)` untuk pembatalan pengingat; `(sent_at)` untuk rekap biaya bulanan |
| `audit_events` | Beberapa baris per tagihan                                                     | `(entity_type, entity_id, created_at)`                                                                                         |
| `invoices`     | Satu baris per kamar terisi per periode                                        | `(owner_id)` untuk kebijakan Row Level Security; `(due_date, status)` untuk cron yang menandai telat dan menunggak             |

Keduanya kandidat partisi bulanan, tapi bukan sekarang — pada skala 1.000 pemilik, `messages` bertambah di bawah 30.000 baris per bulan. Yang perlu disiapkan sejak awal cuma satu hal: `sent_at` dan `created_at` jangan pernah dipakai sebagai bagian kunci primer, supaya partisi bisa ditambahkan tanpa memindahkan data.

Rekap biaya per kost per bulan ditulis ke `message_cost_months` sebelum baris rincinya dihapus. Karena `messages.owner_id` terisi untuk semua jenis pesan, peringkasan itu cukup satu pengelompokan tanpa join.

Empat tabel tumbuh tanpa pernah dibaca lagi setelah beberapa waktu dan butuh pembersihan berkala: `login_codes` disimpan 24 jam setelah dipakai atau kedaluwarsa, `request_limits` 7 hari sejak jendelanya berakhir, `webhook_events` 90 hari setelah diproses, dan `messages` disimpan rinci 24 bulan lalu diringkas per kost per bulan (TRD §14). Masa simpan dua yang pertama sudah dijanjikan ke pengguna di Kebijakan Privasi §8, jadi kewajiban.

## 12. Jalur perluasan Tahap 1–3

Tiga tabel sudah ada di diagram tapi sengaja belum diisi:

| Tabel                 | Kapan hidup                         | Nilai enum                                                                                 | Yang perlu ditambahkan                            |
|-----------------------|-------------------------------------|--------------------------------------------------------------------------------------------|---------------------------------------------------|
| `property_staff`      | Tahap 2 — akun penjaga kost         | `role`: `caretaker`, `manager`                                                             | Peran dan hak akses di Row Level Security         |
| `maintenance_tickets` | Tahap 2 — bersama portal penghuni   | `status`: `open`, `in_progress`, `resolved`, `closed`; `priority`: `low`, `normal`, `high` | Alur status tiket                                 |
| `meter_readings`      | Tahap 2 — meteran listrik per kamar | —                                                                                          | **Penyimpanan berkas**, untuk `photo_storage_key` |

**Pindah kamar di kost yang sama** belum didukung: SRD PNY-07 menyatakan pergantian penyewa lewat checkout lalu pengisian baru, jadi orang yang pindah dari kamar 3 ke kamar 7 menjadi dua baris terpisah. Saat fitur ini dibangun, penyambungnya berupa satu kolom penunjuk ke baris penghuni sebelumnya — tidak disiapkan sekarang, karena kolom untuk fitur yang belum ada hanya menambah struktur mati.

Yang tidak butuh tabel baru sama sekali: listrik dan denda masuk sebagai `invoice_items.kind` baru; portal penghuni memakai `tenants.user_id` yang sudah ada; laporan laba-rugi per properti dihitung dari data yang sudah tersimpan.

`meter_readings` adalah satu-satunya fitur yang mengembalikan kebutuhan penyimpanan berkas. Komponennya ditambahkan saat fitur itu dibangun, bukan disiapkan sekarang.

## 13. Yang masih terbuka

- **Apakah `payments.provider_fee` benar-benar terisi** — kolomnya sudah ada; yang belum jelas adalah apakah Xendit mengembalikan biaya per transaksi pada model sub-akun.
