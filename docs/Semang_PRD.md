# SEMANG — Product Requirement Document (PRD)

**Versi:** 2.0 (MVP) · **Status:** Draft · **Bahasa:** Indonesia
**Acuan:** Riset pain point pemilik kost Indonesia (Juni 2026); diskusi desain produk Semang; revisi feedback pemilik (Juni 2026)
**Acuan tarif WABA:** rate card IDR resmi Meta berlaku 1 Juli 2026 — tarif dan tautan sumber di §16

> **Tagline:** Kost-mu ditagih otomatis, uang masuk tercatat sendiri, tanpa kamu menagih siapa-siapa.
> **Fokus:** menghapus beban menagih sepenuhnya · pembayaran online tepercaya · merapikan pencatatan

## 1. Product Overview

**Product Name:** Semang

**Product Type:** Platform manajemen kost berbasis web (SaaS), modular, multi-tenant, dengan penagihan WhatsApp otomatis dan pembayaran online yang langsung masuk ke rekening pemilik.

**Problem Statement:** Mayoritas pemilik kost Indonesia (skala 5–20 kamar) masih mengelola bisnis dengan buku catatan dan WhatsApp. Tiga masalah paling menyakitkan secara berurutan: (1) menagih sewa terasa sungkan sehingga tunggakan menumpuk, (2) pencatatan manual berantakan — bukti transfer terselip di chat, KTP tercecer, (3) verifikasi pembayaran melelahkan dan rawan bukti transfer palsu. Kompetitor yang ada (SuperKos, KelolaPro, Mamikos) sudah menyentuh masalah ini tetapi belum ada pemenang dominan di sisi manajemen; celah masuknya ada di harga yang lebih adil (tagih per kamar terisi), otomasi penuh yang menghapus beban menagih, dan pembayaran online yang menghilangkan bukti palsu tanpa platform menampung uang.

**Konteks pengembangan:** Side project solo untuk mengasah skill full-stack, product thinking, dan bisnis. Berbeda dari rencana awal yang menahan biaya di Rp0, versi 2.0 mengambil keputusan sadar untuk mengintegrasikan WhatsApp Cloud API dan payment gateway Xendit sejak MVP demi kesan pertama yang kuat dan menghapus beban menagih sepenuhnya. Konsekuensinya: ada biaya operasional sejak awal (per pesan WhatsApp) dan waktu sampai peluncuran lebih panjang (verifikasi bisnis Meta, NIB, KYC Xendit). Semang tetap tidak pernah menampung dana pengguna — pembayaran langsung masuk ke rekening pemilik — sehingga bebas beban lisensi PJP.

## 2. Filosofi Inti

Semua keputusan produk tunduk pada lima prinsip berikut — bila ada konflik, urutan ini adalah prioritasnya:

1. **Platform tidak pernah menampung uang pengguna.** Pembayaran penyewa langsung masuk ke rekening pemilik melalui sub-akun Xendit milik pemilik sendiri. Semang tidak pernah memegang dana. Ini menghilangkan beban regulasi (lisensi PJP) sekaligus membangun kepercayaan.
2. **Beban menagih dipikul platform, bukan pemilik.** Tagihan dan reminder terkirim otomatis via WhatsApp tanpa pemilik menyentuh apa pun. Inilah nilai jual utama: pemilik tidak pernah lagi merasa sungkan menagih.
3. **Penyewa tidak pernah menghitung apa pun.** Setiap link pembayaran datang dengan nominal pasti yang sudah dihitung sistem atau ditetapkan pemilik. Penyewa tinggal bayar.
4. **Friksi adopsi serendah mungkin untuk mulai.** Pemilik non-teknis (45–60 tahun) bisa mulai memakai Semang tanpa panduan dan tanpa menunggu. "Mulai pakai" dipisahkan dari "aktifkan pembayaran online" agar KYC tidak menghadang langkah pertama.
5. **Pintu keluar selalu terbuka, bukan jebakan.** Data tidak pernah disandera. Berhenti berlangganan tetap menyimpan semua data. Sistem yang sudah dipakai pemilik sebelumnya (pola penagihan) didukung Semang, bukan dipaksa berubah.

## 3. Goals

**Primary Goal:** Menjadi cara paling sederhana bagi pemilik kost Indonesia untuk menagih, menerima pembayaran, dan mengelola kost — menghapus beban menagih sepenuhnya.

**MVP Goals:**

- Kalahkan buku catatan + WhatsApp manual sebagai sistem pengelolaan kost.
- Capai ≥70% pendaftar yang menyelesaikan wizard sampai momen "kirim contoh tagihan ke WA saya" — pencapaian ini tidak memerlukan verifikasi identitas (KYC), jadi bisa terukur sejak hari pertama.
- Pantau berapa persen dari mereka yang lanjut menyelesaikan verifikasi identitas (KYC) — bukan syarat untuk mulai menagih (tagihan tetap terkirim otomatis tanpa ini, lihat §9.4), tapi tetap dipantau sebagai pencapaian tersendiri karena menandai kapan pelunasan online otomatis mulai aktif.
- 2–3 kost awal di Denpasar menjalankan ≥2 siklus tagihan otomatis penuh ke penyewa sungguhan (terlepas dari status KYC — lihat §9.4), dengan minimal beberapa di antaranya juga menyelesaikan verifikasi identitas.
- ≥1 pembayaran online tercatat otomatis (via Xendit) pada setiap kost awal per bulan.
- Validasi harga: ≥3 dari 10–15 pemilik kost yang diwawancara menyatakan minat berbayar konkret.

## 4. Target Market

**Initial Target:** Pemilik kost skala 5–20 kamar di kota-kota dengan populasi mahasiswa dan pekerja (Denpasar, Yogyakarta, Bandung, Surabaya, Jakarta) yang masih mengelola secara manual atau tidak puas dengan biaya/kompleksitas kompetitor.

**User Segments:**

- **Bu Sari — pemilik manual (persona utama):** 8–15 kamar, 45–60 tahun, non-teknis, mencatat di buku catatan, tagih via chat pribadi. Kebutuhan: tidak perlu menagih sendiri; catatan rapi tanpa belajar aplikasi rumit.
- **Pak Dimas — pemilik berplatform:** 20–50 kamar, sudah pakai SuperKos atau sejenis. Kebutuhan: harga lebih adil (tagih per kamar terisi), migrasi mudah, pembayaran online.
- **Rara — penyewa kost:** Mahasiswa/karyawan muda, arus kas kadang tidak menentu. Kebutuhan: tagihan jelas, bisa bayar online dengan nominal pasti, kadang perlu cicil atau sewa jangka pendek.
- **Mas Putu — penjaga kost (Tahap 2+):** Operasional harian atas nama pemilik. Kebutuhan: akses terbatas sesuai peran.

## 5. Initial Scope (MVP)

**Prinsip lingkup:** MVP versi 2.0 lebih besar dari rencana awal karena WhatsApp Cloud API dan pembayaran Xendit ditarik masuk sejak awal. Fokus tetap pada tiga pain point inti (sungkan menagih, pencatatan berantakan, verifikasi pembayaran) — tetapi kini diselesaikan dengan otomasi penuh, bukan semi-otomatis.

**Fitur yang didukung MVP:**

- Manajemen kost, tipe kamar (harga berbeda per tipe), dan kamar beserta statusnya — termasuk kamar yang sedang dibangun atau direnovasi.
- Pemilihan wilayah kost dari daftar kota dan kabupaten seluruh Indonesia, yang menentukan zona waktu penagihan.
- Data penyewa dengan input mandiri via link per kamar, dan input manual.
- Pindah kamar dalam kost yang sama, tetap maupun sementara (mis. saat renovasi), tanpa memecah riwayat penyewa.
- Tagihan otomatis dengan seluruh logika penagihan: dua cara menentukan tanggal jatuh tempo, perlakuan tagihan pertama, unit sewa fleksibel (bulanan/mingguan/harian), pembayaran di muka multi-periode dengan diskon, dan cicilan.
- Pengiriman tagihan dan reminder otomatis penuh via WhatsApp Cloud API.
- Pembayaran online via Xendit (langsung masuk ke rekening pemilik) dengan link pembayaran di setiap tagihan sebagai jalur pembayaran utama.
- Konfirmasi pembayaran otomatis oleh sistem Xendit + kuitansi digital.
- Penandaan lunas manual oleh pemilik (dengan penanda tunai/transfer langsung dan konfirmasi peringatan) — jalur pelunasan sebelum KYC selesai, dan jalan darurat setelahnya untuk penyewa yang tetap bayar tunai/transfer (§9.4).
- Model tagih hanya kamar terisi untuk langganan pemilik.
- Update berkala kondisi kost ke pemilik via WhatsApp + link ke web.
- Laporan kas dan ekspor.
- Sistem paket & hak akses fitur aktif dengan harga sejak hari pertama.

**Tidak termasuk MVP:** portal penyewa ber-akun (riwayat tagihan & kuitansi), akun staf/penjaga kost penuh, listing publik, meter listrik, laporan pajak, aplikasi mobile native, deposit/uang jaminan, pencatatan pembayaran sebagian secara manual (hanya pelunasan penuh manual yang didukung — lihat §9.4). Sebagian item di atas punya arah lanjutan di Roadmap §17; sebagian lain (seperti aplikasi mobile native) belum punya rencana waktu tertentu — keduanya tetap di luar lingkup MVP, hanya berbeda soal apakah sudah dipikirkan kelanjutannya atau belum.

**Batasan awal:** satu akun per identitas Google dan satu akun per nomor WhatsApp. Paket berbayar ditentukan jumlah kamar kost, bukan dipilih bebas (§12.1); keadaan tidak berlangganan tidak dibatasi jumlah kamar (§12.4).

## 6. Core Features

### 6.1 Manajemen kost, tipe kamar & kamar

Satu kost punya nama, jumlah kamar, harga sewa bawaan, dan wilayah — kota atau kabupaten yang dipilih dari daftar seluruh Indonesia, bukan diketik sendiri. Wilayah menentukan zona waktu kost, dan zona waktu menentukan tanggal jatuh tempo jatuh di hari kalender yang mana; pemilik tidak perlu memikirkan zona waktu sama sekali. Keempatnya tidak diminta sekaligus: tiga yang pertama diisi saat kost dibuat, wilayah menyusul di langkah setup (§10.2) karena tidak dibutuhkan untuk menampilkan tagihan pertama. Sistem membuat kamar otomatis. Pemilik dapat mendefinisikan **tipe kamar** (mis. Standar, AC, Kamar Mandi Dalam) dengan harga masing-masing, lalu menetapkan tipe itu pada tiap kamar — menjawab kost yang mematok harga berbeda antar kamar. Kamar yang tidak diberi tipe memakai harga bawaan properti. Harga juga bisa diatur khusus untuk satu kamar tertentu.

**Status kamar** membedakan sebab kamar tidak bisa ditempati, karena akibatnya berbeda:

| Status | Arti |
|---|---|
| Kosong | Siap disewakan |
| Terisi | Ada penyewa yang menempati |
| Dipesan | Ditahan untuk penyewa yang sedang dipindah sementara |
| Sedang dibangun | Kamar belum pernah bisa disewakan |
| Sedang direnovasi | Kamar sudah ada tapi sementara tidak bisa ditempati |
| Tidak tersedia | Sebab lain, dicatat alasannya |

Kamar berstatus sedang dibangun atau direnovasi tidak terhitung sebagai kamar kosong yang menunggu penyewa, sehingga angka okupansi pemilik tidak terlihat buruk hanya karena ada kamar yang belum jadi.

### 6.2 Data penyewa dengan input mandiri

Penyewa terdaftar pada kost, bukan terpaku pada satu kamar — penempatan kamarnya dicatat terpisah dan bisa berubah selama masa sewa (§6.3). Setiap kamar mendapat link unik bertoken. Pemilik menyebarkan link ke grup WA kost atau chat pribadi penyewa; penyewa membuka di browser, mengisi nama dan nomor WA sendiri (dengan persetujuan singkat soal pemakaian datanya). Input manual tetap tersedia.

### 6.3 Pindah kamar

Penyewa bisa berpindah kamar tanpa berhenti menjadi penyewa yang sama. Ada dua bentuk, dan bedanya bukan sekadar lama waktunya — tetapi siapa yang menanggung akibatnya.

**Pindah tetap** — penyewa menempati kamar lain untuk seterusnya, misalnya karena ingin kamar yang lebih besar. Ini keputusan bersama, jadi sewanya boleh disesuaikan mengikuti kamar barunya, dan kamar asalnya kembali tersedia untuk disewakan.

**Pindah sementara** — kamar penyewa tidak bisa ditempati untuk sementara, paling sering karena direnovasi, jadi ia menumpang di kamar kosong lalu kembali. Di sini penyewa tidak punya pilihan, jadi ia tidak boleh menanggung akibatnya. Tiga hal dijaga: kamar asalnya **tidak** ditampilkan sebagai kamar tersedia sehingga tidak mungkin tanpa sengaja disewakan ke orang lain; sewanya **tidak berubah** meski kamar penggantinya bertipe lebih mahal; dan riwayat tagihannya tetap satu orang yang sama, bukan pecah jadi dua penyewa berbeda.

**Pindah sementara bisa berubah menjadi tetap.** Ini kejadian yang wajar: penyewa dipindahkan karena renovasi, lalu merasa cocok dengan kamar barunya dan ditawari menetap. Saat itu terjadi, kamar asalnya berhenti dipesan dan kembali tersedia, dan sewanya baru boleh disesuaikan — karena sejak titik itu penyewa memang memilih kamar tersebut, bukan terpaksa menempatinya.

### 6.4 Tagihan otomatis

Tagihan dibuat otomatis tiap siklus dengan nominal bulat dan wajar. Seluruh logika penagihan (cara menentukan jatuh tempo, perlakuan tagihan pertama, unit sewa, multi-periode, cicilan) dijelaskan lengkap di §8. Pencocokan pembayaran dilakukan otomatis oleh sistem Xendit setelah KYC selesai; sebelum itu, pemilik menandai lunas manual (§9.4). Setiap tagihan punya nomor berurut per pemilik yang bisa disebut manusia, sehingga pemilik dan penyewa punya cara merujuk satu tagihan tertentu — baik di percakapan maupun di kuitansi.

### 6.5 Pengiriman otomatis via WhatsApp Cloud API

Semang mengirim tagihan dan reminder **otomatis penuh** melalui WhatsApp Cloud API — pemilik tidak menekan tombol apa pun. Pengiriman otomatis inilah satu-satunya hal yang membedakan akun berlangganan dari akun yang tidak berlangganan (§12.4). Pesan dikirim dari nomor bisnis WhatsApp Semang yang terverifikasi, atas nama kost (isi pesan mencantumkan nama kost, kamar, periode, dan nominal; rekening tujuan atau link pembayaran menyesuaikan status KYC pemilik — lihat §9.4). Verifikasi bisnis Meta dilakukan sekali oleh Semang, sehingga setiap pemilik baru langsung bisa mengirim tanpa menunggu. Template pesan didaftarkan sebagai kategori utility (transaksional) agar biaya efisien dan tidak melanggar kebijakan.

### 6.6 Pembayaran online via Xendit (langsung masuk ke rekening pemilik)

Begitu pemilik menyelesaikan verifikasi identitas & rekening (KYC — lihat §9.2), setiap tagihan menyertakan link pembayaran Xendit sebagai jalur pelunasan utama. Penyewa membayar via QRIS/VA/e-wallet; dana **langsung masuk ke rekening pemilik** melalui sub-akun Xendit milik pemilik (lihat §9). Pembayaran terkonfirmasi otomatis oleh sistem Xendit — menghapus masalah bukti transfer palsu dan verifikasi manual sepenuhnya. Sebelum KYC selesai, tagihan tetap terkirim otomatis dengan nomor rekening pemilik sebagai gantinya, dan pemilik menandai lunas manual saat menerima pembayaran (§9.4).

### 6.7 Kuitansi digital & pencatatan

Pembayaran terkonfirmasi otomatis oleh sistem Xendit (setelah KYC) atau ditandai lunas oleh pemilik (sebelum KYC, atau untuk tunai/transfer di luar Xendit — §9.4); keduanya menghasilkan kuitansi digital yang dapat diakses penyewa. Riwayat lengkap setiap aksi (siapa, kapan, dan apa yang terjadi) tersimpan otomatis.

**Kuitansi dibuat saat dibuka, bukan disimpan sebagai file.** Setiap kali tautannya dibuka, kuitansi disusun langsung dari data tagihan dan pembayaran yang sudah ada di database — tidak ada gambar atau PDF yang ikut disimpan. Ada empat akibatnya:

- Tidak ada berkas yang menumpuk seiring waktu. Yang bertambah cuma baris data tagihan dan pembayaran, dan menyimpan baris data jauh lebih murah daripada menyimpan gambar atau PDF — jadi tidak perlu ada aturan berapa lama kuitansi disimpan.
- Angka pada kuitansi selalu ikut catatan terbaru. Kalau ada pembayaran yang dikoreksi, kuitansinya ikut benar sendiri; tidak ada file lama yang masih memuat angka yang sudah berubah.
- Nama penyewa justru sebaliknya: yang tampil adalah nama saat tagihan itu dibuat, bukan nama terbaru. Kuitansi adalah bukti transaksi pada satu waktu, jadi ia harus tetap menyebut nama yang berlaku saat itu — dan itulah yang membuat data penyewa bisa dihapus tanpa merusak kuitansi lama (§7.3).
- Kalau data penyewa atau akun pemilik dihapus (§7.3), kuitansinya ikut hilang dengan sendirinya, karena kuitansi tidak punya bentuk terpisah dari datanya. Tidak ada berkas sisa yang harus dicari dan dihapus satu-satu demi kepatuhan UU PDP.

### 6.8 Update berkala ke pemilik

Semang mengirim ringkasan kondisi kost secara berkala ke pemilik via WhatsApp (kamar yang sudah bayar, yang menunggak, dan kelak keluhan penyewa saat portal hadir), selalu disertai tautan "Lihat selengkapnya di sini" ke dashboard web. Ini menjaga pemilik tetap terlibat, dan menjawab risiko Semang jadi jarang dibuka.

### 6.9 Laporan kas & ekspor

Rekap uang masuk per bulan, daftar lunas/telat/menunggak per kamar, grafik tren sederhana, ekspor CSV/Excel. Laporan mencakup rincian cicilan, diskon multi-periode, dan piutang penyewa yang sudah keluar.

## 7. Trust & Safety

### 7.1 Kepercayaan pembayaran

Kepercayaan dibangun lewat arsitektur, bukan lewat menahan fitur: **uang tidak pernah menyentuh Semang**, baik sebelum maupun setelah KYC. Cara Semang menjelaskannya ke pemilik selalu sama: "uang Anda langsung masuk ke rekening Anda sendiri — kami tidak pernah memegangnya". Pemilik mulai memakai Semang dan menagih penyewa sungguhan sejak hari pertama, tanpa menunggu KYC — tagihan terkirim otomatis berisi nomor rekening pemilik, dan pelunasan dicatat manual sampai KYC selesai (§9.4). KYC hanya syarat untuk mengaktifkan pelunasan otomatis via Xendit, bukan syarat untuk mulai menagih.

### 7.2 Keamanan data

Data antar pemilik dipisah memakai Row Level Security (RLS) Supabase: tiap pemilik hanya bisa membuka datanya sendiri, dan pemisahan itu dikunci di tingkat database — bukan hanya di tampilan. Halaman yang dibuka tanpa akun — isi mandiri penyewa, kuitansi, dan halaman pembayaran — memakai token tak tertebak: per kamar untuk link isi mandiri, per tagihan untuk kuitansi dan pembayaran.

### 7.3 Privasi penyewa (UU PDP)

Semang menyimpan data pribadi pihak ketiga (penyewa). Aturan UU 27/2022 dipenuhi sejak awal: kebijakan privasi yang bisa dibaca siapa saja, persetujuan ringkas di form isi mandiri, hak penghapusan data penyewa, hak berhenti menerima pesan, dan hak penghapusan akun pemilik beserta datanya (dengan masa tenggang 30 hari sebelum data dimusnahkan permanen). Data tidak dijual, dibagikan komersial, atau dipakai untuk iklan.

**Penghapusan data penyewa tidak merusak pembukuan pemilik.** Dua hal ini tampak bertentangan: penyewa berhak datanya hilang, sementara tagihan lama adalah catatan keuangan pemilik yang harus utuh. Jalan keluarnya, setiap tagihan menyimpan nama dan nomor penyewa **saat tagihan itu dibuat**. Jadi data penyewa bisa dikosongkan tanpa satu pun tagihan kehilangan isinya. Yang dihapus adalah orangnya sebagai data pribadi, bukan catatan transaksinya.

**Penyewa dapat berhenti menerima pesan tanpa keluar dari kost.** Persetujuan yang bisa diberikan harus bisa ditarik. Penyewa yang menariknya berhenti dikirimi tagihan dan reminder oleh Semang, sementara tagihannya tetap dibuat dan tetap terlihat pemilik — pemilik lalu menagih dengan caranya sendiri. Tanpa jalan ini, satu-satunya cara berhenti menerima pesan adalah pindah kost.

### 7.4 Keamanan pembayaran & anti-penipuan

Link pembayaran Xendit menghilangkan risiko bukti transfer palsu. Halaman pembayaran selalu menampilkan nama kost, periode, dan nominal agar penyewa dapat membedakan tagihan sah dari penipuan link — penting karena link dikirim via WhatsApp.

### 7.5 Transparansi platform

Harga per kamar terisi (bukan total kamar), tanpa komisi tersembunyi, tanpa markup atas MDR Xendit ke penyewa (kepatuhan larangan surcharge PBI 23/6/PBI/2021). Pemilik yang berhenti berlangganan tidak kehilangan kamar, penyewa, maupun riwayat apa pun — kost berapa pun ukurannya tetap utuh di dalam Semang, dan yang berhenti hanyalah pengiriman otomatis (§12.4). Batas kamar tidak berlaku ke belakang, karena kost tidak mengecil hanya karena pemiliknya berhenti membayar.

## 8. Alur & Aturan Penagihan

### 8.1 Prinsip alur status tagihan

Setiap tagihan selalu bisa berubah status menuju penyelesaian — tidak ada status yang membuat tagihan macet selamanya, dan tidak ada status yang menunggu tanpa batas waktu. Pembayaran selalu diterima dan langsung melunaskan tagihan, kapan pun ia datang, bahkan setelah sangat terlambat.

### 8.2 Status tagihan

| Status | Arti |
|---|---|
| draft | Tagihan dibuat oleh sistem (siklus otomatis) atau pemilik (multi-periode/cicilan), belum diproses pengiriman |
| terkirim | Pesan WhatsApp terkirim ke penyewa — berisi nomor rekening pemilik (sebelum KYC) atau link pembayaran Xendit (setelah KYC); lihat §9.4 |
| sebagian | Sebagian nominal sudah dibayar (cicilan); sisa masih terbuka |
| lunas | Lunas penuh — via pembayaran otomatis Xendit atau ditandai manual oleh pemilik (§9.4) — status akhir |
| telat | Lewat jatuh tempo, belum lunas (dari terkirim atau sebagian) |
| menunggak | Telat lebih dari 30 hari tanpa pelunasan |
| dibatalkan | Tagihan (atau sisa tagihan) dibatalkan pemilik — status akhir |

### 8.3 Tabel transisi

| Dari | Pemicu | Ke |
|---|---|---|
| draft | siklus tiba | terkirim (pesan otomatis, isi menyesuaikan status KYC — §9.4) |
| terkirim | bayar penuh, otomatis oleh Xendit | lunas |
| terkirim | ditandai lunas manual oleh pemilik (§9.4) | lunas |
| terkirim | bayar sebagian (cicilan disetujui pemilik) | sebagian |
| terkirim | pemilik batalkan | dibatalkan |
| terkirim | lewat jatuh tempo, belum lunas | telat |
| sebagian | sisa dilunasi, otomatis oleh Xendit | lunas |
| sebagian | sisa ditandai lunas manual oleh pemilik | lunas |
| sebagian | dibayar sebagian lagi, sisa masih ada | sebagian (berulang sampai sisa nol) |
| sebagian | pemilik hapuskan sisa | dibatalkan* |
| sebagian | lewat jatuh tempo, sisa belum lunas | telat |
| telat | dilunasi, otomatis oleh Xendit, kapan saja | lunas |
| telat | ditandai lunas manual oleh pemilik, kapan saja | lunas |
| telat | pemilik batalkan | dibatalkan |
| telat | H+30 tanpa pelunasan | menunggak |
| menunggak | dilunasi, otomatis oleh Xendit, kapan saja | lunas |
| menunggak | ditandai lunas manual oleh pemilik, kapan saja | lunas |
| menunggak | pemilik batalkan | dibatalkan |

**Catatan tentang penandaan lunas manual:** ini satu-satunya jalur menuju lunas yang tidak melalui verifikasi otomatis Xendit — jalur utama sebelum KYC selesai, dan jalan darurat setelahnya untuk penyewa yang tetap bayar tunai/transfer. Detail mekanismenya (pilihan metode, peringatan konfirmasi) ada di §9.4.

*Dibatalkan dari status sebagian hanya menghapuskan sisa yang belum dibayar; pembayaran yang sudah masuk tetap tercatat sebagai pembayaran terpisah, tidak terhapus. Status telat dan menunggak bukan jalan buntu — pembayaran (otomatis maupun manual) selalu diterima dan langsung melunaskan tagihan berapa pun lamanya sudah menunggak.

### 8.4 Pembatalan reminder saat lunas

Begitu status tagihan berubah menjadi lunas (baik sekaligus maupun setelah cicilan/telat/menunggak), **seluruh reminder yang masih terjadwal untuk tagihan itu otomatis dibatalkan.** Penyewa yang membayar setelah menerima tagihan tidak akan menerima reminder H+3 atau H+7 untuk tagihan yang sama. Ini berlaku juga saat tagihan dibatalkan pemilik — reminder yang tersisa ikut batal.

### 8.5 Aturan penentuan tanggal jatuh tempo (berlaku untuk semua mode)

**Aturan untuk tanggal yang tidak ada di semua bulan:** Tanggal masuk penyewa atau tanggal tetap yang dipilih pemilik kadang berupa tanggal 29, 30, atau 31 — padahal tidak semua bulan punya tanggal itu (Februari misalnya hanya sampai tanggal 28 atau 29). Dalam kasus ini, jatuh tempo dipindah ke **hari terakhir bulan tersebut**. Aturan ini berlaku sama di kedua mode di bawah, sehingga tidak akan ada tagihan yang gagal dibuat karena tanggalnya tidak ada di bulan itu.

**Mode "dari tanggal masuk" (default):** setiap penyewa punya tanggal jatuh temponya sendiri, mengikuti kapan dia masuk. Contoh: penyewa masuk tanggal 15, maka tagihan berikutnya selalu jatuh tempo tanggal 15 setiap bulan. Karena periode pertama selalu pas dimulai dari tanggal masuk, **tidak pernah ada tagihan pertama yang perlu dipotong sebagian (prorata)** — kasus khusus di §8.6 tidak berlaku untuk mode ini.

**Mode "tanggal tetap":** pemilik menetapkan satu tanggal jatuh tempo yang sama untuk semua penyewa (misalnya tanggal 1 setiap bulan). Masalah muncul kalau ada penyewa baru yang tanggal masuknya berbeda dari tanggal itu — misalnya masuk tanggal 15, berarti ada 16 hari (15–31) yang belum tertagih sebelum siklus normalnya mulai. Kasus ini ditangani lewat perlakuan tagihan pertama di §8.6. Penyewa yang kebetulan masuk persis di tanggal tetap tidak mengalami masalah ini.

**Mengubah mode setelah berjalan:** diperbolehkan, hanya memengaruhi tagihan yang belum dibuat. Tagihan yang sudah dibuat tidak pernah berubah. Jika perubahan menyebabkan ada hari yang belum tertagih, sistem membuat satu tagihan tambahan untuk menutup hari-hari itu, bukan menghitung ulang semua tagihan yang sudah ada. Pemilik akan melihat pratinjau (preview) sebelum menyetujui perubahan. Ini kejadian langka dan tidak perlu ditangani secara rumit.

**Perubahan harga:** perubahan harga sewa (termasuk harga tipe kamar) hanya berlaku untuk tagihan yang belum dibuat; tagihan yang sudah ada tidak pernah berubah meski harganya sudah berbeda.

**Pindah kamar di tengah periode:** tagihan yang sudah dibuat tetap menunjuk kamar yang ditagihkan saat itu, dan nominalnya tidak berubah — termasuk pada pindah tetap yang menaikkan sewa. Kamar baru dan nominal barunya muncul mulai tagihan siklus berikutnya. Aturannya sama dengan perubahan harga di atas, dan alasannya sama: penyewa tidak boleh menerima tagihan yang angkanya berubah setelah dikirim. Pada pindah sementara nominalnya memang tidak pernah berubah sama sekali (§6.3).

### 8.6 Perlakuan tagihan pertama (mode tanggal tetap)

Untuk penyewa baru di mode tanggal tetap yang tanggal masuknya tidak sama dengan tanggal tetap, pemilik memilih perlakuan tagihan pertama saat menambahkan penyewa. Sistem menyarankan default cerdas berdasarkan tanggal, dan pemilik dapat menimpanya dalam satu ketuk:

- **Prorata sisa bulan:** ditagih sesuai hari terpakai, lalu penuh di periode berikutnya. Cocok untuk penyewa yang ingin bayar sesuai pemakaian.
- **Gabung ke depan:** prorata sisa bulan **digabung menjadi satu tagihan** dengan periode penuh berikutnya (bukan digratiskan). Penyewa menerima dan membayar satu tagihan saja saat periode berikutnya. Cocok untuk penyewa yang gajian di awal bulan atau masuk mepet akhir bulan.
- **Penuh bulan ini:** ditagih penuh untuk bulan berjalan meski masuk di tengah bulan. Untuk pemilik yang menerapkan hitungan sebulan penuh apa pun tanggal masuknya.

Default cerdas: jika masuk mendekati akhir periode, sarankan gabung; jika masuk di awal/tengah, sarankan prorata. Pemilik selalu bisa menimpa.

### 8.7 Unit sewa fleksibel (bulanan/mingguan/harian)

Untuk mendukung penyewa sementara (umum di Bali: perantau mencari kost seadanya sambil cari yang cocok), penyewa dapat disewakan per bulan, minggu, atau hari. Harga turunan dihitung dari harga bulanan:

- **Harian = harga bulanan ÷ 30**, dibulatkan ke ribuan terdekat ke atas.
- **Mingguan = harga harian × 7.**

Harga turunan ini adalah default yang disarankan; pemilik dapat menimpanya (banyak kost harian menetapkan tarif harian sendiri yang lebih tinggi karena durasi pendek).

**Tagihan dikirim beberapa hari sebelum jatuh tempo, dan pesan itu sekaligus jadi peringatan pertama.** Jadi reminder baru menyusul setelah jatuh tempo lewat — penyewa tidak menerima dua pesan berisi hal yang sama dalam satu periode (§16).

**Jadwal reminder ikut unit sewanya**, karena sewa yang cuma seminggu atau sehari tidak punya cukup waktu untuk jadwal berjenjang:

- **Bulanan:** tagihan dikirim H-3, lalu reminder H+3 dan H+7 — paling banyak 3 pesan per tagihan.
- **Mingguan:** tagihan dikirim H-1, lalu reminder H+2 — paling banyak 2 pesan.
- **Harian:** tagihan dikirim hari-H saja — tanpa reminder susulan.

Jadwal ini **sama untuk semua paket.** Kebutuhan menagih tidak ikut naik bersama jumlah kamar — penyewa yang telat sama saja telatnya di kost 5 kamar maupun 50 kamar. Yang berbeda antar paket cuma serinci apa ringkasan yang pemilik terima (§12.2), bukan segigih apa Semang menagih penyewa.

### 8.8 Pembayaran di muka multi-periode

Penyewa dapat membayar beberapa bulan atau setahun sekaligus (umum untuk memperoleh diskon). Pemilik menentukan **diskon secara manual** (nominal atau persen) — Semang tidak memaksakan formula karena besaran diskon sangat bervariasi antar kost. Diskon tercatat sebagai baris tersendiri pada tagihan agar transparan dan terekam di laporan. Sistem membuat periode-periode terkait dan memajukan jatuh tempo berikutnya.

**Refund saat penyewa keluar lebih awal:** bila penyewa yang sudah bayar di muka keluar sebelum seluruh periode habis, dana yang harus dikembalikan adalah urusan langsung antara pemilik dan penyewa — dana sudah masuk ke rekening pemilik, bukan ditahan Semang, sehingga Semang tidak pernah memproses pengembalian dana itu sendiri. Peran Semang terbatas pada pencatatan:

- Pemilik dapat membatalkan periode-periode yang belum berjalan lewat aksi "dibatalkan" yang sudah ada (§8.3), dengan alasan "refund — checkout lebih awal" agar tercatat berbeda dari pembatalan biasa.
- Sistem menghitung otomatis nominal sisa periode yang belum berjalan sebagai referensi untuk pemilik — murni informasi untuk memudahkan pemilik menghitung, bukan transaksi yang dijalankan Semang.
- Periode yang sudah berjalan (sudah dipakai penyewa) tidak ikut dibatalkan atau dihitung sebagai sisa.

### 8.9 Pembayaran sebagian (cicilan disetujui pemilik)

Pembayaran sebagian didukung karena arus kas penyewa (mahasiswa/pekerja) sering tidak menentu. Namun dimodelkan sebagai **cicilan yang disetujui/dicatat pemilik**, bukan nominal bebas yang diketik penyewa:

- Penyewa dan pemilik bersepakat (mis. via WhatsApp) bahwa bulan ini dibayar sebagian.
- Pemilik menandai cicilan dari sisinya (mis. Rp750.000 sekarang, Rp750.000 sisa) dan menetapkan jatuh tempo untuk sisa.
- Sistem mengirim link pembayaran dengan nominal terkunci; sisa tetap tercatat sebagai tagihan terbuka dengan link-nya sendiri, dan dapat dicicil lagi bila perlu (status sebagian dapat berulang sampai sisa nol).

Ini sesuai realitas sosial kost (bayar sebagian selalu hasil negosiasi), menjaga pemilik tetap memegang kendali, dan menjaga nominal selalu terkunci supaya pencocokan pembayaran otomatis tetap rapi.

### 8.10 Model tagih kamar terisi

Langganan pemilik ke Semang dihitung per **kamar terisi**, bukan total kamar — meringankan pemilik dengan okupansi rendah dan menjawab keluhan terhadap kompetitor ("mahal saat kamar tidak penuh").

**Definisi "kamar terisi":** "kamar terisi" adalah nama yang dipakai ke pemilik karena itu yang ia pahami; yang benar-benar dihitung adalah **jumlah penyewa aktif** pada tanggal penagihan langganan (misalnya tanggal 1 setiap bulan), bukan jumlah kamar berstatus terisi. Pada keadaan biasa keduanya sama. Bedanya terasa saat ada penyewa yang sedang pindah sementara (§6.3): ia terkait dua kamar sekaligus, dan menghitung kamar akan menagih pemilik dua kali untuk satu orang. Bila okupansi berubah di tengah bulan, penyesuaian berlaku pada penagihan bulan berikutnya, bukan prorata di tengah jalan. Ini menyederhanakan penagihan langganan itu sendiri, dan terpisah dari logika prorata milik penyewa (§8.6) yang memang berbeda tujuan.


## 9. Sistem Pembayaran

### 9.1 Arsitektur: Xendit XenPlatform (sub-akun)

Semang memakai XenPlatform Xendit. Semang adalah platform utama; setiap pemilik kost menjadi sub-akun. Pembayaran penyewa **langsung masuk ke rekening pemilik** melalui sub-akun-nya — Semang tidak pernah menampung dana. Ini menjaga Semang sebagai software murni, bukan penampung uang (bebas lisensi PJP).

### 9.2 KYC & aktivasi pelunasan otomatis

- **KYC platform (sekali):** Semang menyelesaikan KYC tingkat platform dengan Xendit (memerlukan entitas usaha/NIB dan service agreement dengan account manager Xendit).
- **KYC sub-akun (per pemilik):** untuk mengaktifkan pelunasan otomatis via Xendit, pemilik menjalani KYC sub-akun (identitas, rekening tujuan) — dirancang di dalam Semang dan tersambung ke sistem kepatuhan (compliance API) Xendit, sehingga pemilik tidak perlu keluar ke situs Xendit.
- **Tagihan tidak menunggu KYC:** sejak siklus pertama, tagihan terkirim otomatis ke penyewa terlepas dari status KYC. Sebelum KYC selesai, pesan berisi nomor rekening pemilik dan pemilik menandai lunas manual; setelah KYC selesai, pesan otomatis beralih berisi link Xendit dengan pelunasan otomatis (§9.4). Dashboard menampilkan ajakan aktivasi: **"Daftarkan verifikasi identitas & rekening untuk mengaktifkan pembayaran online otomatis via Xendit."** Momen wow (§10.2 langkah 3–4) maupun siklus penagihan nyata sama-sama tidak menunggu KYC — bedanya hanya pada bagaimana pelunasan tercatat.

### 9.3 Pengalaman penyewa: satu link, satu nominal pasti

Prinsip: **penyewa tidak pernah menghitung apa pun.** Setiap link pembayaran datang dengan nominal pasti. Yang berbeda antar-kasus hanya siapa/kapan nominal ditetapkan:

| Kasus                | Nominal ditentukan oleh          | Tampilan bagi penyewa                                   |
|----------------------|----------------------------------|--------------------------------------------------------|
| Bulanan normal       | sistem (otomatis)                | 1 link, sewa 1 bulan                                    |
| Gabung ke depan      | sistem (prorata + bulan berikut) | 1 link, 1 nominal gabungan — tampak seperti biasa      |
| Multi-periode        | pemilik (diskon manual)          | 1 link, rincian periode + diskon + total               |
| Cicilan/sebagian     | pemilik (besaran cicilan)        | 1 link per cicilan, nominal terkunci; sisa menyusul    |
| Harian/mingguan      | sistem (harga turunan/override)  | 1 link sesuai durasi                                    |

Halaman pembayaran selalu menampilkan **nama kost, periode, dan nominal** agar penyewa yakin tagihan sah (pembeda dari penipuan link). Penyewa tidak pernah mengetik nominal.

### 9.4 Xendit dan penandaan manual: dua jalur pelunasan yang saling melengkapi

Tagihan terkirim otomatis sejak siklus pertama, terlepas dari status KYC pemilik — yang berbeda hanyalah isi pesan dan cara pelunasannya:

- **Sebelum KYC selesai:** pesan tagihan berisi nomor rekening pemilik untuk transfer biasa. Penyewa membayar seperti biasa, pemilik menandai lunas manual begitu menerima pembayaran.
- **Setelah KYC selesai:** pesan tagihan berisi link pembayaran Xendit. Penyewa membayar online, pelunasan tercatat otomatis oleh sistem Xendit tanpa pemilik menyentuh apa pun.

Begitu KYC selesai, siklus berikutnya otomatis beralih ke link Xendit — tidak ada tagihan yang "menumpuk" untuk dikirim ulang, karena tidak pernah ada yang ditahan sejak awal.

Satu situasi lain tetap membutuhkan jalan darurat manual meski KYC sudah selesai: penyewa yang tetap membayar tunai atau transfer langsung ke rekening pemilik meski link Xendit sudah tersedia — kebiasaan lama tidak selalu berubah seketika. Tanpa jalan keluar di sini, tagihan yang sebenarnya sudah dibayar akan terus menerima reminder otomatis sampai akhirnya ditandai menunggak — mengacaukan catatan dan mempermalukan pemilik di depan penyewanya sendiri.

**Penandaan lunas manual** menutup kedua kebutuhan ini (pelunasan sebelum KYC, dan pelunasan tunai/transfer setelah KYC), dengan batasan yang menjaga Xendit tetap sebagai jalur yang didorong:

- Pemilik dapat menandai tagihan (berstatus terkirim, sebagian, telat, atau menunggak) sebagai lunas secara manual, untuk pelunasan penuh sisa tagihan.
- Saat menandai, pemilik memilih metode pembayaran — **Tunai** atau **Transfer langsung ke rekening** — plus catatan singkat opsional. Klasifikasi ini bukan sekadar formalitas: laporan kas (§6.9) dapat memisahkan pembayaran yang terverifikasi otomatis oleh Xendit dari yang murni klaim pemilik, dan datanya membantu keputusan nyata di Tahap 1 (§17) — apakah penyewa benar-benar berpindah ke pembayaran online, atau kebiasaan lama masih dominan.
- Isi **peringatan konfirmasi** dibedakan berdasarkan metode pembayaran (Tunai/Transfer langsung), berlaku sama baik sebelum maupun setelah KYC pemilik selesai — tidak ada kalimat dorongan tambahan di peringatan ini, karena begitu KYC selesai, link pembayaran otomatis menjadi bagian tetap dari setiap tagihan berikutnya (§6.5); mengulang dorongan itu di peringatan hanya akan membebani pemilik dengan tugas mengingatkan penyewa secara manual, bertentangan dengan Filosofi Inti #2. Dua varian teks:
    - **Tunai:** peringatan netral, fokus ke akurasi karena tunai tidak meninggalkan jejak. Contoh: *"Tandai lunas secara tunai tidak memiliki jejak transaksi apa pun — pastikan Anda benar-benar sudah menerima uangnya sebelum melanjutkan."*
    - **Transfer langsung:** peringatan netral, mengarahkan verifikasi ke mutasi rekening. Contoh: *"Pastikan Anda sudah mengecek mutasi rekening dan transfer ini benar-benar masuk sebelum menandai lunas."*
    - Pemilik tetap harus menekan tombol konfirmasi secara sadar — bukan aksi yang bisa terjadi tanpa sengaja. Ketergantungan pada penandaan manual dipantau lewat KPI (§14), bukan lewat pesan yang menambah tugas pemilik.
- Penandaan manual murni pencatatan sepihak oleh pemilik atas transaksi yang terjadi di luar sistem.
- Tersedia baik saat berlangganan maupun tidak, karena ini jaring pengaman, bukan fitur premium.

Penandaan lunas manual dirancang terasa sebagai jalur yang wajar sebelum KYC, dan sebagai jalan darurat setelahnya — bukan alternatif yang setara dengan Xendit dalam jangka panjang, karena link pembayaran otomatis tetap yang didorong begitu tersedia.

## 10. Onboarding & User Flow

### 10.1 Wizard onboarding: prinsip desain

Urutan wizard dirancang dengan empat prinsip yang terbukti efektif pada onboarding produk dengan "momen wow" (mis. Superhuman, Slack): (1) **minimalkan jumlah langkah sebelum momen wow**, bukan hanya total durasi — semua input yang tidak esensial untuk momen wow ditunda ke setelahnya; (2) momen wow memperlihatkan **nilai produk secara utuh** (tagihan terkirim *dan* pembayaran diterima), bukan cuma separuhnya; (3) **jalur kembali yang jelas** setelah pemilik berpindah ke WhatsApp — perpindahan ke aplikasi lain adalah titik di mana pemilik paling sering hilang di tengah onboarding, dan paling sering diabaikan; (4) **ucapan selamat singkat** menutup pencapaian itu sebelum pemilik disuruh mengisi formulir lagi.

### 10.2 Wizard onboarding (target <5 menit sampai momen wow)

1. **Daftar lewat Google atau nomor WhatsApp** — dua jalur setara, pemilik memilih salah satu: (a) **Masuk dengan Google** (satu ketuk, tanpa isian apa pun), atau (b) **nomor WhatsApp + kode verifikasi** yang dikirim ke nomor itu. Jalur Google tidak meminta nomor WhatsApp di sini — nomor baru diminta di langkah 3, tepat saat kegunaannya terlihat sendiri.
2. **Layar tunggal sebelum wow** — hanya tiga isian: nama kost, jumlah kamar (slider), dan harga sewa bawaan. Ketiganya dipilih karena tepat inilah yang dibutuhkan untuk menyusun tagihan pertama, dan tidak satu pun lebih. Wilayah kost, tipe kamar, dan cara menentukan jatuh tempo semuanya ditunda ke langkah 7 — bukan karena tidak penting, tetapi karena tidak ada di antaranya yang mengubah isi tagihan yang akan pemilik lihat beberapa detik kemudian.
3. **Momen wow, bagian 1 — pesan tagihan nyata:** begitu tiga isian di atas selesai, sistem langsung menampilkan pratinjau pesan tagihan WhatsApp memakai nama kost dan harga yang sesungguhnya (bukan contoh isian) — pemilik melihat "Kamar 1" ditagih dengan nominal yang benar-benar akan dipakai. Tombol "Kirim contoh ke WhatsApp saya" mengirim pesan itu ke nomor pemilik sendiri lewat nomor bisnis WhatsApp Semang dalam hitungan detik. Pemilik yang mendaftar lewat Google mengisi nomornya di sini — cukup satu kolom, tanpa kode, karena pesan yang masuk beberapa detik kemudian sudah membuktikan nomornya benar.
4. **Momen wow, bagian 2 — gambaran utuh:** tepat di bawah pratinjau tagihan, tampilkan juga contoh tampilan notifikasi yang akan pemilik terima **saat penyewa membayar** ("Kamar 1 — Rp1.500.000 diterima, tercatat otomatis" (dengan tanda centang)). Sekali lihat, pemilik langsung menangkap seluruh janji "tanpa kamu menagih siapa-siapa" — bukan cuma bagian mengirimnya.
5. **Jalur kembali:** setelah pemilik tap tombol kirim dan berpindah ke WhatsApp, layar Semang tidak dibiarkan diam menunggu. Tampilkan segera kartu "Sudah cek WhatsApp Anda?" dengan tombol besar "Lanjutkan" — mengundang pemilik kembali ke alur secara aktif, bukan berharap mereka mengingat sendiri untuk kembali.
6. **Ucapan selamat singkat:** saat pemilik tap "Lanjutkan", tampilkan pengakuan singkat ("[Nama Kost] sudah bisa menagih otomatis!", dengan aksen visual perayaan ringan) sebelum masuk ke setup lanjutan — supaya pencapaian ini terasa tuntas dulu, tidak langsung ditimpa formulir baru.
7. **Setup lanjutan** (kini terasa sebagai kelanjutan wajar, bukan penghalang menuju wow): **wilayah kost**, dipilih lewat pencarian dari daftar kota dan kabupaten seluruh Indonesia; lalu tipe kamar (opsional), cara menentukan tanggal jatuh tempo (bawaannya "dari tanggal masuk" — pemilik tidak perlu memutuskan apa pun kalau tidak mau), dan cara isi data penyewa (link isi mandiri atau input manual). Wilayah adalah satu-satunya yang tidak bisa dilewati di langkah ini: zona waktu kost berasal dari situ, dan tanpanya siklus penagihan pertama tidak bisa dijadwalkan di hari yang benar. Sisanya boleh dilewati dan diisi kapan saja dari Pengaturan.
8. **Dashboard pertama:** daftar langkah yang tercentang sendiri saat pemilik maju, plus kartu "Tagihan berikutnya terkirim otomatis tanggal ..." — bukan layar kosong.
9. **Ajakan aktivasi pembayaran online:** dashboard menampilkan "Daftarkan verifikasi identitas & rekening untuk mengaktifkan pembayaran online otomatis via Xendit." Tagihan tetap terkirim otomatis sejak siklus pertama tanpa menunggu ini — pesan berisi nomor rekening pemilik sampai KYC selesai, lalu otomatis beralih ke link Xendit (§9.4).

**Nomor WhatsApp pemilik:** wajib untuk semua pemilik, karena nomor itulah yang dipakai mengirim contoh tagihan dan update berkala (§6.8). Diminta di langkah 1 kalau mendaftar lewat WhatsApp, atau langkah 3 kalau lewat Google. Nomor yang sama juga dipakai untuk masuk di kemudian hari, tanpa perlu diaktifkan dulu di pengaturan.

**Masuk berikutnya:** sesi bertahan lama di perangkat yang sama, jadi pemilik jarang perlu masuk ulang. Kalau perlu, dua jalurnya selalu ada untuk setiap akun — Google, atau nomor WhatsApp + kode. Kode cuma dikirim saat sesi habis atau saat masuk dari perangkat baru, bukan tiap kali membuka Semang. Artinya pemilik yang mendaftar lewat Google tidak pernah menerima pesan kode sampai ia benar-benar memilih masuk lewat WhatsApp — jalur Google tidak punya langkah tambahan sebelum momen wow (§10.1 poin 1), dan tidak ada biaya pesan kode saat onboarding (§16).

**Mengganti nomor:** karena nomor ini juga dipakai untuk masuk, mengubahnya dari Pengaturan perlu kode ke nomor baru dulu sebelum berlaku. Ini satu-satunya tempat kode dikirim di luar proses masuk.

### 10.3 Siklus bulanan (otomatis penuh)

1. Tagihan dibuat otomatis pada tanggal siklus.
2. Sistem mengirim tagihan otomatis via WhatsApp ke penyewa — pemilik tidak menekan apa pun; isi pesan menyesuaikan status KYC (§9.4).
3. Penyewa membayar via link Xendit; dana langsung masuk ke rekening pemilik.
4. Pembayaran terkonfirmasi otomatis oleh sistem Xendit; kuitansi digital terkirim, laporan ikut diperbarui, riwayat aksi tersimpan lengkap.
5. Reminder terkirim otomatis sesuai unit sewa (§8.7) hanya untuk yang belum lunas; begitu lunas, reminder tersisa otomatis dibatalkan (§8.4).

Langkah 2 hanya berjalan pada akun berlangganan. Pada akun yang tidak berlangganan, tagihan tetap dibuat lengkap dengan nominalnya — pemilik mengirimkannya sendiri (§12.4).

### 10.4 Update berkala

Ringkasan berkala ke pemilik via WhatsApp (kamar lunas/menunggak, kelak keluhan penyewa) dengan tautan "Lihat selengkapnya di sini" ke dashboard.

## 11. Notifikasi WhatsApp (Cloud API)

- **Pengirim:** satu nomor bisnis WhatsApp Semang terverifikasi, mengirim atas nama semua kost. Verifikasi Meta sekali oleh Semang; pemilik baru tak menunggu.
- **Kategori template:** tagihan dan reminder didaftarkan sebagai utility (transaksional), bukan marketing. Pada rate card Indonesia, tarif utility Rp356,65/pesan sedangkan marketing Rp586,33/pesan — salah kategori menaikkan biaya pesan 64% (§16). Tidak boleh ada elemen promosi di pesan tagihan. Kode verifikasi masuk (§10.2) memakai template terpisah kategori **authentication**, tarifnya Rp356,65/pesan — sama dengan utility, karena WABA Semang dan penerimanya sama-sama di Indonesia sehingga tarif authentication-international (Rp1.940,13) tidak berlaku.
- **Isi pesan:** nama kost, kamar, periode, nominal, link pembayaran.
- **Jadwal reminder:** disesuaikan per unit sewa dan **sama untuk semua paket** (§8.7 — bulanan: tagihan H-3 lalu H+3 dan H+7; mingguan: tagihan H-1 lalu H+2; harian: tagihan hari-H saja). Yang naik bersama paket cuma serinci apa ringkasan yang pemilik terima (§12.2), bukan segigih apa Semang menagih penyewa.
- **Update berkala ke pemilik:** dikirim sebulan sekali, plus setiap kali ada yang perlu diketahui (penyewa telat, menunggak, atau berubah status). Kalau tidak ada apa-apa, tidak ada pesan — ringkasan yang cuma bilang "semua sudah bayar" tetap kena biaya tapi tidak berguna, dan pemilik akan mulai mengabaikannya.
- **Akun yang tidak berlangganan:** Semang tidak mengirim pesan apa pun untuk mereka (§12.4), jadi semua biaya pesan datang dari akun berbayar.
- **Pembatalan otomatis:** reminder yang belum terkirim dibatalkan begitu tagihan lunas atau dibatalkan (§8.4).
- **Semua pesan berbayar:** perhitungan biaya menganggap setiap pesan ke penyewa kena tarif penuh, tanpa pengecualian (§16).
- **Biaya:** ditagih per pesan yang sampai ke penerima — bukan per percakapan 24 jam, dan bukan per pesan yang dikirim. Tarif ditentukan kode negara penerima: nomor +62 memakai rate card pasar Indonesia yang berdiri sendiri, bukan tarif regional "Rest of Asia Pacific". Model biaya lengkap beserta tautan sumber resminya ada di §16. Update berkala ke pemilik yang bersifat non-transaksional mungkin masuk kategori berbeda dan idealnya opt-in.

## 12. Model Monetisasi

### 12.1 Struktur paket (harga per kamar terisi)

| | **Gratis** | **Starter** | **Pro** | **Bisnis** |
|---|---|---|---|---|
| Target | Belum/berhenti berlangganan | Kost rumahan serius | Kost menengah–eksklusif | Multi-properti/operator |
| Harga | Rp0 | Rp2.000/kamar terisi/bln | Rp3.500/kamar terisi/bln | Rp5.000/kamar terisi/bln |
| Minimum | — | Rp20.000/bln | — | Rp250.000/bln |
| Rentang kamar | — | ≤15 | ≤50 | Tak terbatas |
| Properti | Tak terbatas | 1 | 3 | Tak terbatas |

**Paket mengikuti ukuran kost, bukan dipilih sendiri.** Rentang kamar di atas bukan batas yang bisa ditukar dengan harga lebih murah: kost 30 kamar masuk Pro, dan Starter bukan versi murahnya — Starter memang bukan untuk kost sebesar itu. Karena itu tidak ada pindah paket ke samping atau ke bawah; pemilik cuma berlangganan atau tidak (§12.4). Satu-satunya cara melewati rentang adalah menambah kamar, dan Semang menanggapinya dengan menawarkan paket di atasnya lengkap dengan pratinjau harga. 

**Gratis bukan paket, tapi keadaan.** Ia tidak punya rentang kamar karena tidak dipasangkan dengan ukuran kost mana pun — ini keadaan akun yang sedang tidak berlangganan, berapa pun kamarnya (§12.4).

**Kamar yang sedang dibangun belum terhitung dalam batas kamar paket.** Pemilik yang menambah kamar tidak langsung dipaksa naik paket saat baru mulai membangun — kamar itu belum menghasilkan apa pun, jadi tidak masuk hitungan. Begitu pembangunan ditandai selesai dan kamarnya berstatus kosong, ia mulai terhitung, dan pemilik ditawari naik paket beserta pratinjau harganya.

**Selama pembangunan, pemilik sudah diingatkan.** Peringatannya menyebut angka: berapa kamar yang akan terhitung setelah selesai, paket mana yang akan berlaku, dan berapa biayanya per bulan. Tujuannya memberi waktu bersiap, bukan mengejutkan pemilik pada hari kamarnya jadi.

**Kamar yang sedang direnovasi tetap terhitung.** Bedanya dengan kamar yang sedang dibangun: kamar renovasi sudah ada dan sudah pernah menghasilkan, hanya sementara tidak bisa ditempati. Kalau renovasi juga mengeluarkannya dari hitungan, menandai kamar sebagai "sedang direnovasi" akan menjadi cara menghindari batas paket.

**Kalau pemilik belum mau naik paket**, tidak ada yang dirusak: seluruh kamar, penyewa, dan tagihan yang sudah ada tetap berjalan seperti biasa. Yang tertahan hanya kamar barunya — ia belum bisa diisi penyewa sampai paketnya disesuaikan. Kapasitas baru ditahan, bukan yang sudah ada dicabut.

### 12.2 Pembagian fitur per paket (bertingkat)

Prinsip: tiap paket memuat fitur yang benar-benar terpakai pada rentang kamarnya, dan paket di atas selalu memuat semua isi paket di bawahnya. Pembagiannya memakai satu aturan sederhana — fitur mana yang mengeluarkan uang tiap kali dipakai, dan fitur mana yang tidak:

- **Fitur yang ikut membesar bersama kost dan tidak mengeluarkan uang** dibagi menurut kebutuhan: jumlah kamar, jumlah properti, akun staf, rincian tiap kamar dan tiap properti, portal penyewa, tiket maintenance, laporan laba-rugi. Semuanya perangkat lunak saja, jadi menahannya tidak menghemat apa pun.
- **Fitur yang mengeluarkan uang tiap dipakai** — pengiriman tagihan dan reminder — diberikan **sama rata di semua paket berbayar**, karena kebutuhan menagih tidak ikut naik bersama jumlah kamar (§8.7).

**Gratis (keadaan tidak berlangganan, kamar tak terbatas):**

- Manajemen kost, tipe kamar & kamar, data penyewa (link isi mandiri + manual)
- Tagihan otomatis + seluruh logika penagihan (§8): mode, tagihan pertama, unit fleksibel, multi-periode, cicilan
- Pembayaran online Xendit (dana langsung masuk ke rekening pemilik); kuitansi digital
- Penandaan lunas manual (tunai/transfer langsung) — jaring pengaman, bukan fitur premium
- Laporan kas dan ekspor
- **Tidak termasuk: pengiriman otomatis via WhatsApp.** Tagihan tetap dibuat lengkap dengan nominalnya, dan teks pesannya sudah siap — pemilik yang menyalin lalu mengirimkannya sendiri (§12.4)

**Starter (≤15 kamar) — semua di Gratis, plus:**

- Pengiriman tagihan dan reminder otomatis via WhatsApp sesuai jadwal §8.7 — inilah yang dibayar
- Update berkala ke pemilik via WA: sebulan sekali dan saat ada kejadian, berisi jumlah yang lunas dan yang menunggak
- 1 properti

**Pro (≤50 kamar) — semua di Starter, plus:**

- Hingga 3 properti
- Update berkala lebih rinci (rincian tiap kamar; kelak termasuk ringkasan keluhan penyewa saat portal hadir)
- Portal penyewa (riwayat tagihan, keluhan) — hadir pada fase berikutnya
- Tiket maintenance
- 2 akun staf/penjaga kost dengan peran terbatas
- Laporan keuangan lengkap

**Bisnis (tak terbatas) — semua di Pro, plus:**

- Kamar & properti tak terbatas
- Update berkala per properti (dipisah untuk tiap kost yang dikelola)
- Staf/peran tak terbatas
- Laporan laba-rugi per properti
- Dukungan prioritas

Jadwal menagih penyewa sengaja tidak dipakai sebagai pembeda paket. Rasa sungkan menagih justru paling berat dirasakan pemilik yang tinggal serumah dengan penyewanya (§4) — kalau kegigihan menagih dibedakan menurut ukuran kost, yang paling dirugikan malah pemilik yang paling butuh dibantu.

### 12.3 Mekanisme trial & konversi

**Trial:** 60 hari kalender (mewakili kurang lebih dua siklus bulanan), fitur Pro terbuka, tanpa kartu kredit. Diukur dalam hari kalender tetap, bukan literal "2 siklus tagihan" dari unit sewa individual — karena satu kost dapat memiliki campuran penyewa bulanan, mingguan, dan harian sekaligus, sehingga menghitung trial dari siklus per-penyewa akan ambigu. Setelah habis, akun masuk ke keadaan Gratis — berapa pun kamarnya. Tidak ada kamar yang dimatikan dan tidak ada penyewa yang ditinggalkan; yang berhenti cuma pengiriman otomatis (§12.4). Opsi bayar tahunan diskon ±2 bulan.

**Dorongan berlangganan:** tampilkan angka pemilik sendiri di akhir trial ("14 tagihan terkirim otomatis, Rp21.000.000 tercatat"), bukan diskon generik.

### 12.4 Berhenti berlangganan & keadaan tidak berlangganan

Rentang kamar di §12.1 dipakai untuk mencocokkan paket dengan ukuran kost, bukan untuk menahan orang memakai Semang gratis. Kost tidak mengecil hanya karena pemiliknya berhenti membayar, jadi rentang itu tidak pernah berlaku ke belakang.

Berhenti berlangganan tidak mengubah apa pun di kost. Semua kamar, penyewa, tagihan, dan riwayat tetap ada dan tetap bisa diubah. Yang berhenti cuma satu: Semang tidak lagi mengirim pesan untuk pemilik.

| Hal | Berlangganan | Tidak berlangganan |
|---|---|---|
| Jumlah kamar & properti | Sesuai paket (§12.1) | Tak terbatas — tidak ada yang dimatikan |
| Tagihan otomatis dibuat tiap siklus | Ya | Ya |
| Seluruh logika penagihan (§8) | Ya | Ya |
| Pengiriman ke penyewa | Oleh Semang, otomatis | Oleh pemilik, manual |
| Link pembayaran Xendit & kuitansi | Ya | Ya |
| Laporan & ekspor | Ya | Ya |
| Update berkala ke pemilik | Ya | Tidak |

**Kenapa cara ini menagih sendiri:** makin besar kostnya, makin terasa capeknya — tanpa perlu satu pun batas buatan. Pemilik 4 kamar cukup menyalin dan mengirim 4 pesan sebulan, dan itu ringan — kost sekecil itu memang bukan sumber pendapatan yang perlu dikejar. Pemilik 30 kamar harus melakukannya 30 kali, dan biasanya sudah berlangganan setelah satu siklus. Alasan naik paket jadi persis kalimat inti produknya: bayar supaya tidak perlu kirim sendiri.

**Semang tidak membuat alat bantu untuk kirim manual** — tidak ada salin-massal, tidak ada tombol langsung ke WhatsApp per kamar. Ini soal prioritas: membangunnya sama dengan memakai waktu untuk menyaingi fitur berbayar sendiri. Tapi Semang juga **tidak sengaja bikin susah** — teks pesannya ditampilkan utuh dan bisa langsung disalin, tanpa jeda atau langkah tambahan yang dibuat-buat. Tidak mempermudah itu satu hal; sengaja mempersulit itu hal lain, dan pemilik yang tidak akrab teknologi akan merasakan bedanya.

**Gagal bayar tidak sama dengan berhenti sengaja.** Kalau pembayaran langganan gagal karena hal teknis — kartu kedaluwarsa, saldo kurang — pengiriman tidak langsung dimatikan. Ada tenggang 7 hari kalender sejak percobaan pertama gagal: pesan tetap terkirim, dan pemilik diperingatkan via WhatsApp. Tagihan penyewa yang tiba-tiba berhenti terkirim itu kerugian pemilik, dan kartu yang kedaluwarsa tidak sepadan dengan akibat sebesar itu. Pelanggan yang berhenti karena hal ini juga paling mudah diselamatkan.

**Siklus yang sedang jalan tetap diselesaikan.** Tagihan yang sudah dijadwalkan untuk siklus ini tetap dikirim, dan penghentian mulai berlaku siklus berikutnya. Biayanya kecil dan bisa dihitung, sementara penyewa tidak dibuat bingung karena tagihannya berhenti di tengah bulan — alasannya sama seperti di §9.4: jangan sampai pemilik terlihat tidak beres di depan penyewanya sendiri.


## 13. Tech Stack

- **Frontend + API:** Next.js di Vercel — dashboard, halaman publik, API, cron.
- **Database + Auth:** Supabase — PostgreSQL + RLS multi-tenant; Auth memakai penyedia Google OAuth, dan masuk lewat nomor WhatsApp memakai kode sekali pakai yang pengirimannya dialihkan ke nomor bisnis WhatsApp Semang sendiri, sehingga tidak ada kanal dan biaya tambahan di luar WhatsApp Cloud API.
- **Notifikasi WhatsApp:** WhatsApp Cloud API via interface `NotificationSender` — pengirim tunggal atas nama semua kost.
- **Pembayaran:** Xendit XenPlatform (sub-akun, pembagian dana otomatis, notifikasi otomatis pembayaran) — langsung masuk ke rekening pemilik.
- **Penjadwalan:** Vercel Cron + GitHub Actions (idempoten).
- **Domain:** vercel.app dulu, lalu domain saat siap menyebar.

Keputusan arsitektur yang penting:

- Notifikasi & pembayaran sebagai interface yang implementasinya dapat ditukar/diperluas.
- Tagihan memiliki alur status yang jelas dan tidak pernah macet tanpa batas waktu.
- Pencatatan pembayaran terpisah dari pemrosesan pembayaran, sehingga jalur pembayaran alternatif (mis. pencatatan tunai kelak) dapat ditambahkan sebagai sumber baru tanpa mengubah modul tagihan.
- Hak akses fitur per paket (feature-flag) sejak hari pertama.
- Cara masuk disimpan terpisah dari nomor WhatsApp yang dipakai mengirim pesan, sehingga cara masuk baru bisa ditambahkan kelak tanpa menyentuh modul notifikasi.

## 14. KPIs

| Metrik | Target | Mengukur |
|---|---|---|
| Aktivasi wizard sampai contoh tagihan terkirim | ≥70% pendaftar | Beratnya onboarding |
| Penyewa isi-mandiri per kost awal | ≥60% kamar tanpa input pemilik | Efektivitas link isi mandiri |
| Pembayaran online tercatat otomatis | ≥1/kost/bulan, naik tiap siklus | Nilai inti terasa |
| Proporsi lunas via Xendit otomatis vs tandai manual (setelah KYC selesai) | Otomatis mendominasi dan meningkat tiap siklus | Seberapa besar ketergantungan pada jalan darurat manual (§9.4) |
| Aktivasi pembayaran Xendit | Mayoritas kost awal menyelesaikan KYC dalam 2 siklus pertama | Apakah penandaan manual hanya jembatan sementara atau jadi permanen |
| Biaya pesan per kamar terisi | ≤1,2 pesan/bulan rata-rata (§16) | Apakah asumsi biaya yang menopang harga paket benar |
| Retensi kost awal | 2–3 kost bertahan ≥2 siklus | Kelayakan lanjut fase |
| Sinyal bayar dari wawancara | ≥3 dari 10–15 minat konkret | Kelayakan monetisasi |

## 15. Risks

### 15.1 Risiko operasional

| Risiko | Dampak | Mitigasi |
|---|---|---|
| **Kirim manual ternyata sudah cukup bagi pemilik** | Pemilik kost kecil rela menyalin dan mengirim sendiri 4–8 pesan sebulan, lalu tidak pernah berlangganan; Semang jadi gratis selamanya untuk sebagian besar target pasarnya | Makin besar kost makin berat kirim manual, jadi risiko ini paling besar justru di kost kecil yang memang bukan sumber pendapatan utama; pantau berapa banyak akun tidak berlangganan yang tetap aktif menagih manual — kalau banyak di kost menengah, batas keadaan Gratis perlu ditinjau |
| Margin Starter tipis karena tarif WABA | Pada Rp2.000/kamar terisi, biaya pesan memakan 22–24% pendapatan dalam keadaan normal, dan 49–56% kalau seluruh penyewa menunggak sampai H+7 | Batas 3 pesan per tagihan (§8.7) menahan keadaan terburuk jauh di bawah titik impas 5,6 pesan; ukur dulu rata-rata sebenarnya dari data pengiriman (§16) sebelum harga diubah |
| Biaya WhatsApp Cloud API memakan margin | Rugi di tiap pelanggan kalau tidak dijaga | Reminder hanya untuk yang belum bayar; sisa reminder otomatis batal begitu lunas (§8.4); pantau biaya sebenarnya per kost dari data pengiriman, bukan dari asumsi (§16) |
| Template salah masuk kategori marketing | Tarif naik dari Rp356,65 ke Rp586,33 per pesan (+64%), dan margin Starter langsung tergerus | Jangan ada unsur promosi di pesan tagihan; uji kategorinya sebelum peluncuran |
| Endpoint pengirim kode disalahgunakan | Sekali klik menghabiskan Rp356,65 dari saldo WABA Semang, dan orang lain menerima kode yang tidak pernah dimintanya | Batasi jumlah permintaan per nomor, per akun, dan per alamat IP; jedanya makin panjang setiap kali gagal; kode cepat kedaluwarsa dan hanya bisa dipakai sekali |
| Nomor WhatsApp pemilik salah ketik saat daftar lewat Google | Contoh tagihan dan update berkala nyasar ke orang lain — dan karena nomor itu juga dipakai untuk masuk, pemegangnya bisa ikut membuka akun pemilik | Contoh tagihan terkirim beberapa detik setelah nomor diisi, jadi salah nomor langsung ketahuan di layar itu juga, sebelum terpakai untuk apa pun; nomor bisa diperbaiki dari Pengaturan dengan kode ke nomor baru; batasi jumlah pengiriman contoh per akun |
| Tarif Meta berubah | Margin per kamar bergeser tanpa banyak peringatan | Meta hanya mengubah tarif tiap 1 Januari, 1 April, 1 Juli, atau 1 Oktober, dan mengabari paling lambat sebulan sebelumnya; baca ulang rate card tiap kuartal (§16), tinjau harga kalau tarifnya naik |
| Waktu sampai peluncuran panjang (verifikasi Meta, NIB, KYC Xendit) | Peluncuran tertunda berminggu-minggu | Mulai proses verifikasi lebih awal, paralel dengan pengembangan |
| Pemilik terus memakai penandaan lunas manual meski Xendit sudah aktif, mengurangi otomasi yang jadi nilai jual utama | Pembayaran tidak tercatat otomatis, sungkan menagih kembali muncul di balik layar | Sebut tegas sebagai jalan darurat setelah KYC; pisahkan labelnya di laporan (otomatis vs manual); pantau proporsinya sebagai bagian dari peninjauan Tahap 1 |
| Belum ada validasi pengguna nyata | Membangun yang tidak dibutuhkan | Wawancara 10–15 pemilik Denpasar; uji coba di kost nyata |
| Data pribadi penyewa bocor | Hukum & kepercayaan | RLS ketat, token tak tertebak, EXIF dihapus |

### 15.2 Risiko bisnis

| Risiko | Dampak | Mitigasi |
|---|---|---|
| MVP membengkak (Cloud API + Xendit sejak awal) | Peluncuran lambat, fokus pecah | Lingkup dijaga ketat; fitur baru hanya lewat revisi dokumen |
| Tanggung jawab kepatuhan proses verifikasi (KYC) di pihak platform | Beban hukum & operasional | Pakai opsi "Xendit fully KYC"; perjanjian dengan tiap pemilik selaras T&C Xendit |
| Fitur mudah ditiru pesaing | Kalah bersaing setelah mulai punya traksi | Menang di distribusi (komunitas, konten, referral) & kecepatan iterasi |
| Waktu solo developer (kuliah + kerja) | Proyek mangkrak | Blok waktu tetap; lingkup MVP ketat |
| Biaya tetap sebelum ada pendapatan | Modal pribadi tergerus | Luncur dengan harga sejak awal; kendalikan volume pesan |

## 16. Revenue Model

**Subscription:** Rp2.000–5.000/kamar terisi/bulan sesuai paket (lihat §12). Pendapatan utama.

**Transaction Fee:** Tidak ada markup atas MDR Xendit ke penyewa (kepatuhan PBI 23/6/PBI/2021). Potensi platform fee melalui fitur pembagian dana otomatis Xendit dapat dievaluasi kelak, tetapi tidak dibebankan sebagai surcharge ke penyewa.

**Biaya yang harus tertutup pendapatan:** WhatsApp Cloud API per pesan, plus biaya Xendit yang umumnya ditanggung pemilik (MDR).

**Tarif WABA diambil dari dua sumber ini saja:**

- [Dokumentasi pricing WhatsApp Business Platform](https://developers.facebook.com/documentation/business-messaging/whatsapp/pricing) — aturan penagihannya: apa yang dihitung, kategori pesan, diskon volume, dan kapan tarif boleh berubah.
- [Rate card WhatsApp Business Platform — Indonesia, IDR, Utility](https://whatsappbusiness.com/products/platform-pricing/?country=Indonesia&currency=Indonesian%20Rupiah%20(IDR)&category=Utility#rates) — tarif per pesannya untuk **Indonesia–Utility** dalam Rupiah.

Angka di bawah ini diambil dari rate card IDR resmi Meta yang **berlaku 1 Juli 2026**.

**Tarif Indonesia per pesan (rate card IDR, berlaku 1 Juli 2026):**

| Kategori | Tarif per pesan | Dipakai Semang |
|---|---|---|
| Utility | Rp356,65 | Ya — seluruh tagihan, reminder, dan update berkala |
| Marketing | Rp586,33 | Tidak |
| Authentication | Rp356,65 | Ya — kode verifikasi masuk (§10.2) |
| Authentication-International | Rp1.940,13 | Tidak — hanya berlaku bila WABA pengirim berada di luar Indonesia |

**Dasar penagihan yang berlaku:**

| Hal | Ketentuan |
|---|---|
| Yang dihitung | Tiap pesan, bukan tiap percakapan 24 jam — berlaku sejak 1 Juli 2025 |
| Kapan ditagih | Saat pesan sampai ke penerima, bukan saat dikirim |
| Penentu tarif | Kombinasi pasar dan kategori pesan; pasarnya ikut kode negara penerima. Nomor +62 memakai rate card Indonesia sendiri, bukan tarif regional "Rest of Asia Pacific" (Rp161,27) |
| Pesan gratis | **Tidak ada.** Semua hitungan di bawah menganggap tiap pesan kena tarif penuh |
| Diskon volume | Tarif utility Indonesia baru turun ke Rp338,82 (−5%) setelah lewat 750.000 pesan sebulan, dan seterusnya sampai Rp267,49 (−25%) di atas 150 juta pesan. Ambang pertamanya saja setara ±300.000 kamar terisi — **jauh di luar jangkauan Semang, jadi tarifnya selalu Rp356,65** |
| Kapan tarif bisa berubah | Cuma tiap 1 Januari, 1 April, 1 Juli, atau 1 Oktober, dan Meta mengabari paling lambat sebulan sebelumnya |

**Jumlah pesan utility yang ditagih** (dari jadwal reminder §8.7 dan alokasi paket §12.2):

| Sumber pesan | Satuan | Jumlah | Biaya |
|---|---|---|---|
| Tagihan siklus (dikirim H-3, sekaligus pemberitahuan pertama) | per kamar terisi/bulan | 1 | Rp356,65 |
| Reminder H+3 dan H+7, asumsi perencanaan | per kamar terisi/bulan | 0,2 | Rp71,33 |
| Reminder, kamar menunggak sampai H+7 | per kamar terisi/bulan | 2 (paling banyak) | Rp713,30 |
| Update berkala (bulanan + saat ada kejadian) | per kost/bulan | ±2 | Rp713,30 |
| Update berkala per properti (Bisnis) | per properti/bulan | ±2 | Rp713,30 |
| Akun tidak berlangganan | per kamar/bulan | 0 | Rp0 |
| Contoh tagihan saat onboarding | sekali per pendaftar | 1 | Rp356,65 |
| Kode verifikasi, jalur daftar WhatsApp | sekali per pendaftar | 1 | Rp356,65 |
| Kode verifikasi, jalur daftar Google | sekali per pendaftar | 0 | Rp0 |
| Kode verifikasi, masuk ulang saat sesi habis | per pemilik/tahun | ±1–2 | ±Rp357–713 |
| Kode verifikasi, ganti nomor dari Pengaturan | jarang | 1 per penggantian | Rp356,65 |

**Paling banyak 3 pesan per tagihan.** Jadwal bulanan §8.7 tidak bisa mengirim lebih dari tagihan + H+3 + H+7 untuk satu tagihan, di paket mana pun. Jadi biaya terburuknya sudah pasti dan ada batasnya, bukan perkiraan yang bisa membengkak tanpa henti. Angka 0,2 reminder itu berasal dari perkiraan berapa tagihan yang masih belum lunas di H+3 (±15%) dan H+7 (±5%) — harus diganti hasil ukuran sebenarnya setelah dua siklus di kost awal (NTF-11).

Catatan: update berkala ke pemilik dihitung **per kost**, bukan per kamar — jadi porsinya paling terasa di kost yang kamarnya sedikit.

**Biaya per kamar terisi per bulan terhadap harga paket:**

| Paket | Harga/kamar terisi | Biaya @1,2 pesan | Porsi biaya | Biaya @3 pesan (maksimum) | Porsi biaya |
|---|---|---|---|---|---|
| Gratis | Rp0 | Rp0 | — | Rp0 | — |
| Starter | Rp2.000 | Rp427,98 | 21% | Rp1.069,95 | 53% |
| Pro | Rp3.500 | Rp427,98 | 12% | Rp1.069,95 | 31% |
| Bisnis | Rp5.000 | Rp427,98 | 9% | Rp1.069,95 | 21% |

**Titik impas** — berapa pesan per kamar terisi yang membuat biaya WA menghabiskan seluruh pendapatan langganan: Starter **5,6 pesan**, Pro **9,8 pesan**, Bisnis **14,0 pesan**. Karena jadwal bulanan paling banyak 3 pesan (§8.7), kost yang seluruh penyewanya menunggak sampai H+7 pun masih berjarak 2,6 pesan dari titik impas Starter.

**Contoh kost nyata (termasuk update berkala):**

Hitungan di bawah memakai okupansi 85% sebagai keadaan normal. Hunian di bawah 70% biasanya tanda ada masalah lokasi atau harga, bukan kondisi sehari-hari.

| Skenario | Pendapatan/bulan | Biaya WA/bulan | Porsi biaya |
|---|---|---|---|
| Tidak berlangganan, kamar berapa pun | Rp0 | Rp0 | — |
| Starter, kost 10 kamar (8,5 terisi), normal | Rp20.000 (kena minimum) | Rp4.351 | 22% |
| Starter, kost 15 kamar (12,75 terisi), normal | Rp25.500 | Rp6.170 | 24% |
| Starter, kost 15 kamar, semua menunggak sampai H+7 | Rp25.500 | Rp14.355 | 56% |
| Pro, kost 30 kamar (25,5 terisi), normal | Rp89.250 | Rp11.627 | 13% |
| Bisnis, 70 kamar / 3 properti (59,5 terisi), normal | Rp297.500 | Rp27.605 | 9% |

**Soal harga:** harga di §12.1 masih aman dengan tarif ini — tidak ada satu pun baris di tabel atas yang merugi, dan yang terburuk (56%) masih menyisakan margin kotor 44%.

Ada dua catatan:

- **Starter satu-satunya paket yang perlu diawasi.** Pro dan Bisnis cuma kena 9–13%, dan itu tidak pernah jadi masalah. Karena Starter juga paket yang paling banyak terjual (target pasar 5–20 kamar), perhatian soal margin sebaiknya dipusatkan di sana saja.
- **Angka 1,2 pesan masih asumsi.** Kalau hasil ukuran dari data pengiriman (NTF-11) ternyata jauh di atas itu, jumlah pesan sudah tidak bisa dipangkas lagi — dan harga baru perlu ditinjau. Menaikkan harga sekarang, sebelum angkanya ada, bukan kehati-hatian tapi tebakan.

Minimum Rp20.000 sebulan pada Starter melindungi margin saat okupansi rendah: kost 10 kamar dengan 8,5 terisi tetap membayar Rp20.000, padahal harga per kamarnya cuma menghasilkan Rp17.000.

> Rate card dibaca ulang tiap kuartal, mengikuti jadwal perubahan tarif Meta (1 Jan / 1 Apr / 1 Jul / 1 Okt). Harga paket §12.1 ditinjau sekalian.

## 17. Future Roadmap

Roadmap ini sengaja tidak merinci jauh ke depan. Sebagai side project solo, komitmen ke fitur yang belum tervalidasi adalah risiko terbesar (lihat §15.2) — setiap fase berikutnya baru dirinci setelah fase sebelumnya memberi bukti nyata, bukan diasumsikan sekarang.

**Tahap 1 — Stabilisasi & pembelajaran dari penggunaan awal** (pemicu: 2–3 kost awal aktif ≥2 siklus penagihan otomatis penuh):

- Perbaikan dari bug dan feedback nyata pengguna awal.
- Tinjau ulang pembagian fitur per paket (§12.2) berdasarkan pemakaian nyata, bukan asumsi.
- Domain sendiri, saat mulai disebar ke luar lingkaran terdekat.
- Tinjau data penandaan lunas manual (§9.4) dari kost awal — bila proporsinya tinggi dibanding pembayaran via Xendit, evaluasi apakah perlu fitur pencatatan tunai yang lebih lengkap (mis. pelunasan sebagian secara manual).

**Tahap 2 — Pertumbuhan basis pemilik** (pemicu: sinyal kesediaan membayar yang sudah terbukti — ≥3 pemilik berbayar konkret di luar lingkaran awal):

- Portal penyewa ringan: riwayat tagihan & kuitansi (pain point tervalidasi sejak riset awal).
- Meter listrik per kamar dengan foto meteran (pain point tervalidasi: sengketa listrik) — membutuhkan penyimpanan berkas, yang ditambahkan ke tech stack saat fitur ini dibangun.
- Akun staf/penjaga kost dengan peran terbatas — relevan untuk kost menengah–besar (Pro/Bisnis).

**Tahap 3 — Dipertimbangkan berdasarkan bukti, bukan komitmen** (baru dibahas bila Tahap 2 menunjukkan traksi nyata: retensi tinggi, pendapatan reguler, permintaan eksplisit dari pengguna):

Kandidat yang mungkin relevan — laporan pajak sederhana, deposit/uang jaminan, listing atau kanal akuisisi penyewa, integrasi pihak ketiga — namun sengaja tidak dirinci lebih jauh di sini. Fitur yang benar-benar dibangun akan ditentukan oleh kebutuhan yang muncul dari basis pengguna saat itu, bukan wishlist yang ditulis hari ini.

## 18. Success Criteria

Semang dianggap berhasil melewati MVP jika dalam 3 bulan pertama:

- ≥2 kost awal memakai produk aktif untuk ≥2 siklus tagihan berturut-turut dengan pengiriman otomatis, tanpa diminta.
- ≥1 pembayaran online tercatat otomatis per bulan di kost awal yang mengaktifkan Xendit.
- ≥3 pemilik kost dari luar lingkaran terdekat menyatakan minat membayar konkret setelah demonstrasi/landing page.
- Tidak ada insiden kebocoran data atau bug kritis yang memengaruhi data keuangan pengguna awal.

## 19. Open Questions

### 19.1 Verifikasi eksternal sebelum peluncuran

- **Pajak di tagihan Meta** — apakah PPN ditambahkan di atas tarif rate card untuk pelanggan Indonesia. Rate card tidak menyebutkannya; dicek lewat penagihan WABA sebelum harga §12.1 dikunci, karena ini menggeser seluruh perhitungan margin §16.
- **Kategori template untuk update berkala ke pemilik** — kalau tidak lolos sebagai utility, tarifnya naik ke Rp586,33/pesan dan biaya per kost ikut naik ±64% (§16). Diuji sebelum peluncuran.
- **Syarat KYC Xendit aktual** — wajib diverifikasi langsung ke sumber resmi sebelum peluncuran, karena ketentuannya berubah-ubah.
