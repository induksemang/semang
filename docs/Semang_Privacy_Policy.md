# SEMANG — Kebijakan Privasi

**Versi:** 2.0 · **Berlaku sejak:** [tanggal rilis] · **Bahasa:** Indonesia
**Acuan:** UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP); Semang PRD/SRD v2.0

> **Ringkas:** Semang membantu pemilik kost menagih dan mencatat pembayaran. Kami menyimpan data secukupnya untuk itu, tidak menjualnya, dan tidak pernah memegang uang Anda.

## 1. Siapa Kami

Semang adalah platform manajemen kost berbasis web. Dokumen ini menjelaskan data pribadi apa yang kami kumpulkan, untuk apa, kepada siapa data itu diteruskan, dan hak Anda atas data tersebut. Dengan menggunakan Semang, Anda menyetujui praktik yang dijelaskan di sini.

## 2. Data yang Kami Kumpulkan

**Dari pemilik kost (pengguna terdaftar):**

- Nomor WhatsApp Anda. Semang tidak memakai kata sandi — masuk ke akun dilakukan lewat akun Google Anda atau lewat kode sekali pakai yang kami kirim ke nomor WhatsApp itu. Karena itu kami tidak pernah menyimpan kata sandi apa pun.
- Bila Anda masuk lewat Google: nama, alamat email, dan pengenal akun Google Anda, sebatas yang Google berikan saat Anda menyetujui masuk. Pemilik yang mendaftar lewat nomor WhatsApp tidak memberikan nama maupun alamat email, dan kami tidak memintanya.
- Data rekening bank Anda (nama bank, nomor rekening, nama pemilik rekening). Sebelum pembayaran online aktif, nomornya dicantumkan pada tagihan kepada penghuni agar mereka dapat transfer langsung; sesudahnya, rekening yang sama menjadi tujuan penyelesaian dana dari sub-akun Xendit Anda.
- Data kost: nama, wilayah (kota atau kabupaten), daftar kamar, tipe kamar, harga sewa, dan tanggal jatuh tempo. Wilayah dipakai untuk menentukan zona waktu kost, bukan untuk melacak lokasi Anda.
- Data verifikasi identitas untuk mengaktifkan pembayaran online. Formulirnya ada di dalam Semang, tetapi isinya diteruskan langsung ke Xendit sebagai penyedia pembayaran dan tidak kami simpan sendiri (lihat §5).
- Catatan pengiriman pesan: nomor tujuan, waktu kirim, status sampai atau gagal, dan biaya per pesan. Ini kami perlukan untuk memastikan tagihan benar-benar terkirim dan untuk menghitung biaya layanan.
- Alamat IP dan nomor tujuan pada saat Anda meminta kode masuk. Kami menyimpannya sebentar untuk membatasi jumlah permintaan kode — tanpa itu, orang lain bisa memakai halaman masuk Semang untuk mengirimi Anda kode berulang kali atas biaya kami.
- Catatan mentah yang dikirim penyedia pembayaran saat sebuah pembayaran terjadi. Kami menyimpannya sementara untuk menelusuri pembayaran bila ada sengketa (§8).
- Jejak aksi di akun Anda: tindakan apa yang dilakukan, kapan, dan oleh siapa. Ini yang memungkinkan Anda dan kami menelusuri kembali riwayat tagihan dan pembayaran bila ada yang perlu dipertanyakan.

**Dari penghuni kost:**

- Nama dan nomor WhatsApp — diisi sendiri oleh penghuni lewat tautan yang dibagikan pemilik, atau dimasukkan oleh pemilik kost.
- Waktu dan versi teks persetujuan yang penghuni setujui saat mengisi data dirinya. Kami menyimpannya sebagai bukti persetujuan atas teks yang mana, karena teksnya bisa berubah.
- Salinan nama dan nomor WhatsApp yang tersimpan pada setiap tagihan, sebagaimana tercantum saat tagihan itu diterbitkan. Salinan inilah yang dipakai kuitansi, dan yang membuat data penghuni bisa dihapus tanpa merusak pembukuan pemilik (§6).
- Catatan tagihan dan pembayaran, beserta riwayat kamar yang ditempati selama masa sewa — termasuk perpindahan kamar bila ada.

**Yang tidak kami kumpulkan:** kata sandi, foto bukti transfer, nomor rekening atau data kartu penghuni, lokasi GPS, dan data sensitif lain yang tidak diperlukan. Penghuni yang membayar lewat tautan pembayaran memasukkan datanya langsung di halaman Xendit — data itu tidak melewati Semang.

## 3. Untuk Apa Data Digunakan

| Data                                  | Tujuan                                                                                    |
|---------------------------------------|-------------------------------------------------------------------------------------------|
| Akun Google atau nomor WA pemilik     | Mengenali akun mana yang sedang dibuka saat pemilik masuk                                 |
| Nama dan email pemilik                | Menyapa pemilik dan menghubunginya soal akunnya                                           |
| Kode sekali pakai ke nomor WA pemilik | Memastikan yang masuk ke akun benar pemegang nomor itu                                    |
| Rekening bank pemilik                 | Dicantumkan pada pesan tagihan agar penghuni dapat transfer langsung                      |
| Data verifikasi identitas pemilik     | Diteruskan ke Xendit untuk membuka pembayaran online ke rekening pemilik                  |
| Nama & nomor WA penghuni              | Menyusun dan mengirim pesan tagihan, pengingat, dan kuitansi kepada penghuni              |
| Catatan tagihan & pembayaran          | Menyusun laporan kas pemilik dan riwayat setiap kamar                                     |
| Catatan pengiriman pesan              | Memastikan tagihan terkirim, menelusuri pesan yang gagal, dan menghitung biaya layanan    |
| Alamat IP saat meminta kode masuk     | Membatasi jumlah permintaan kode agar halaman masuk tidak disalahgunakan                  |
| Riwayat kamar yang ditempati          | Menjelaskan tagihan lama menunjuk kamar yang mana, termasuk saat penghuni berpindah kamar |
| Jejak aksi di akun                    | Menelusuri kembali riwayat tagihan dan pembayaran bila ada yang dipertanyakan             |

Data hanya dipakai untuk hal-hal di atas. Kami tidak memakai data Anda untuk iklan, tidak menjualnya, dan tidak membaginya ke pihak lain untuk kepentingan komersial mereka.

## 4. Penyimpanan & Keamanan

- Data disimpan pada infrastruktur tepercaya (Supabase) dengan pemisahan antar-pengguna di tingkat basis data: tiap pemilik hanya dapat membuka data kostnya sendiri, dan pemisahan itu dikunci di database — bukan hanya di tampilan.
- Halaman yang dibuka tanpa akun diamankan dengan tautan bertoken acak yang tidak dapat ditebak dan punya masa berlaku: satu token per kamar untuk pengisian data penghuni, dan satu token per tagihan untuk kuitansi serta halaman pembayaran.
- Semang tidak menyimpan berkas apa pun. Kuitansi disusun saat tautannya dibuka, langsung dari data tagihan dan pembayaran — tidak ada gambar atau PDF yang tersimpan.
- Uang tidak pernah melewati Semang. Pembayaran penghuni masuk langsung ke rekening pemilik kost melalui sub-akun Xendit milik pemilik sendiri.

## 5. Kepada Siapa Data Diteruskan

Semang tidak dapat bekerja tanpa meneruskan sebagian data ke pihak-pihak berikut. Masing-masing hanya menerima data yang diperlukan untuk perannya, dan hanya boleh memakainya untuk memberikan layanan kepada kami.

| Pihak                               | Data yang diterima                                                                                                                                                                  | Untuk apa                                                                         |
|-------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|
| Meta Platforms (WhatsApp Cloud API) | Nomor WhatsApp penghuni dan pemilik, beserta isi pesan tagihan dan pengingat untuk penghuni, serta contoh tagihan saat pendaftaran, ringkasan berkala, dan kode masuk untuk pemilik | Mengirimkan pesan; tanpa ini tagihan tidak dapat sampai ke penghuni               |
| Xendit                              | Data verifikasi identitas dan rekening pemilik; nominal serta rincian tagihan pada halaman pembayaran                                                                               | Membuka dan menjalankan pembayaran online yang langsung masuk ke rekening pemilik |
| Google                              | Data akun Google pemilik yang memilih masuk lewat Google                                                                                                                            | Memastikan yang masuk benar pemilik akun tersebut                                 |
| Supabase dan Vercel                 | Seluruh data yang tersimpan dan lalu lintas aplikasi                                                                                                                                | Menyimpan data dan menjalankan aplikasi                                           |

Selain itu, kami hanya membuka data bila diwajibkan oleh hukum yang berlaku.

Perlu Anda ketahui: nomor WhatsApp penghuni diteruskan ke Meta agar pesan dapat dikirim. Pemilik kost yang memasukkan nomor penghuni bertanggung jawab memberi tahu penghuninya soal ini, dan formulir pengisian mandiri sudah memuat pemberitahuan tersebut.

## 6. Hak Anda

Sesuai UU PDP, Anda berhak:

- **Mengakses** data pribadi Anda yang kami simpan.
- **Memperbaiki** data yang tidak akurat.
- **Menghapus** data Anda. Pemilik dapat menghapus akun beserta seluruh data kostnya; penghuni dapat meminta penghapusan datanya kepada pemilik kost atau langsung kepada kami.
- **Berhenti menerima pesan** dari Semang tanpa harus keluar dari kost. Setelah itu kami tidak lagi mengirim tagihan maupun pengingat ke nomor Anda; tagihannya tetap ada dan tetap terlihat oleh pemilik kost, yang lalu menagih dengan caranya sendiri.
- **Menarik persetujuan** atas pemrosesan data. Perlu Anda pahami, sebagian layanan tidak dapat berjalan setelah persetujuan ditarik — misalnya pesan tagihan tidak lagi dapat dikirim.

**Bagaimana penghapusan data penghuni dijalankan.** Nama dan nomor WhatsApp penghuni benar-benar kami kosongkan. Yang tetap tersimpan adalah catatan tagihan dan pembayarannya, karena itu pembukuan pemilik kost dan bukan lagi data yang menunjuk ke diri Anda — nama yang tercantum pada tagihan lama adalah salinan yang dibuat saat tagihan itu diterbitkan, sebagaimana kuitansi kertas yang sudah dicetak. Kalau Anda ingin catatan transaksinya juga dihapus, itu perlu dibicarakan dengan pemilik kost karena menyangkut pembukuannya.

Permintaan dapat diajukan melalui kontak pada bagian akhir dokumen ini.

## 7. Penghuni yang Datanya Dimasukkan Pemilik

Sebagian data penghuni dimasukkan oleh pemilik kost, bukan oleh penghuni sendiri. Pada formulir pengisian mandiri, penghuni diberi tahu bahwa datanya dipakai untuk keperluan penagihan kost sebelum ia mengirimkannya. Penghuni dapat meminta penghapusan datanya kapan saja, baik melalui pemilik kost maupun langsung kepada kami, dan dapat meminta berhenti menerima pesan dari Semang tanpa harus keluar dari kost (§6).

## 8. Berapa Lama Data Disimpan

- Data disimpan selama akun aktif dan masih diperlukan untuk layanan.
- Saat akun pemilik dihapus, ada masa tenggang 30 hari sebelum datanya dimusnahkan permanen. Selama masa itu penghapusan masih dapat dibatalkan.
- Data penghuni yang sudah pindah tetap tersimpan bila masih ada tagihan yang belum lunas, karena catatan itu bagian dari pembukuan pemilik. Setelah tidak ada lagi kewajiban yang terbuka, nama dan nomornya dapat dikosongkan atas permintaan, sementara catatan tagihannya tetap ada sebagai pembukuan pemilik.
- Kode masuk disimpan 24 jam setelah dipakai atau kedaluwarsa. Catatan pembatasan permintaan kode, termasuk alamat IP, disimpan 7 hari sejak jendela hitungnya berakhir — cukup untuk menelusuri penyalahgunaan, dan tidak lebih.
- Catatan pengiriman pesan, termasuk nomor tujuan, disimpan rinci selama 24 bulan. Setelah itu yang tersisa hanya ringkasan jumlah dan biaya pesan per kost per bulan, tanpa nomor siapa pun — ringkasan itu kami perlukan untuk menghitung biaya layanan, dan tidak lagi menunjuk ke orang tertentu.
- Catatan mentah dari penyedia pembayaran, yang dipakai menelusuri pembayaran bila ada sengketa, disimpan 90 hari setelah diproses.
- Kuitansi tidak disimpan sebagai berkas terpisah. Karena disusun dari data tagihan dan pembayaran saat dibuka, kuitansi ikut hilang dengan sendirinya begitu datanya dihapus.

## 9. Perubahan Kebijakan

Kebijakan ini dapat diperbarui. Perubahan penting akan diberitahukan melalui aplikasi. Tanggal "Berlaku sejak" di atas menunjukkan versi terkini.

## 10. Kontak

Pertanyaan atau permintaan terkait data pribadi dapat disampaikan melalui [email/kontak resmi Semang]. Kami berupaya menanggapi dalam waktu yang wajar sesuai ketentuan UU PDP.

> Catatan: dokumen ini masih draf kerja dan bukan nasihat hukum. Sebelum rilis publik, tinjau bersama pihak yang memahami UU PDP dan lengkapi bagian yang masih kosong ([tanggal rilis], [kontak]).
