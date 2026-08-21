import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { LedgerIndex } from "../shared/ledger";

function Section({
	index,
	label,
	id,
	className,
	children
}: {
	index: string;
	label: string;
	id?: string;
	className?: string;
	children: ReactNode;
}) {
	return (
		<section
			id={id}
			className="border-warm-200 grid gap-4 border-t py-8 lg:grid-cols-[104px_minmax(0,1fr)] lg:gap-10"
		>
			<LedgerIndex index={index} label={label} className="lg:pt-0" />
			<div className={cn("max-w-190", className)}>{children}</div>
		</section>
	);
}

const h2 = "text-xl font-extrabold tracking-tight text-teal-900";
const h3 = "mb-2.5 text-sm font-extrabold text-warm-900";
const body = "text-sm leading-relaxed text-warm-700";
const list = `flex list-disc flex-col gap-2.25 pl-5 ${body}`;
const callout =
	"border-l-[3px] border-brand bg-teal-50 px-5 py-4 text-sm leading-relaxed text-teal-700";
const th =
	"border-b border-warm-200 pb-2.5 text-left font-mono text-[10.5px] leading-snug font-bold tracking-widest text-muted-foreground uppercase";
const td = "border-t border-warm-100 group-last:border-b group-last:border-b-warm-200";
const meta =
	"font-mono text-[9px] leading-relaxed font-bold tracking-widest text-muted-foreground uppercase";

const purposes = [
	[
		"Akun Google atau nomor WA pemilik",
		"Mengenali akun mana yang sedang dibuka saat pemilik masuk"
	],
	["Nama dan email pemilik", "Menyapa pemilik dan menghubunginya soal akunnya"],
	[
		"Kode sekali pakai ke nomor WA pemilik",
		"Memastikan yang masuk ke akun benar pemegang nomor itu"
	],
	[
		"Rekening bank pemilik",
		"Dicantumkan pada pesan tagihan agar penghuni dapat transfer langsung"
	],
	[
		"Data verifikasi identitas pemilik",
		"Diteruskan ke Xendit untuk membuka pembayaran online ke rekening pemilik"
	],
	[
		"Nama & nomor WA penghuni",
		"Menyusun dan mengirim pesan tagihan, pengingat, dan kuitansi kepada penghuni"
	],
	["Catatan tagihan & pembayaran", "Menyusun laporan kas pemilik dan riwayat setiap kamar"],
	[
		"Catatan pengiriman pesan",
		"Memastikan tagihan terkirim, menelusuri pesan yang gagal, dan menghitung biaya layanan"
	],
	[
		"Alamat IP saat meminta kode masuk",
		"Membatasi jumlah permintaan kode agar halaman masuk tidak disalahgunakan"
	],
	[
		"Riwayat kamar yang ditempati",
		"Menjelaskan tagihan lama menunjuk kamar yang mana, termasuk saat penghuni berpindah kamar"
	],
	[
		"Jejak aksi di akun",
		"Menelusuri kembali riwayat tagihan dan pembayaran bila ada yang dipertanyakan"
	]
];

const processors = [
	[
		"Meta Platforms (WhatsApp Cloud API)",
		"Nomor WhatsApp penghuni dan pemilik, isi pesan tagihan dan pengingat, contoh tagihan saat pendaftaran, ringkasan berkala, dan kode masuk pemilik",
		"Mengirimkan pesan; tanpa ini tagihan tidak dapat sampai ke penghuni"
	],
	[
		"Xendit",
		"Data verifikasi identitas dan rekening pemilik; nominal serta rincian tagihan pada halaman pembayaran",
		"Membuka dan menjalankan pembayaran online yang langsung masuk ke rekening pemilik"
	],
	[
		"Google",
		"Data akun Google pemilik yang memilih masuk lewat Google",
		"Memastikan yang masuk benar pemilik akun tersebut"
	],
	[
		"Supabase dan Vercel",
		"Seluruh data yang tersimpan dan lalu lintas aplikasi",
		"Menyimpan data dan menjalankan aplikasi"
	]
];

export function Policy() {
	return (
		<div className="container pb-12 lg:pb-18">
			<Section index="01" label="Siapa kami">
				<h2 className={`${h2} mb-3`}>Siapa Kami</h2>
				<p className="text-warm-700 text-base leading-relaxed">
					Semang adalah platform manajemen kost berbasis web. Dokumen ini menjelaskan data
					pribadi apa yang kami kumpulkan, untuk apa, kepada siapa data itu diteruskan,
					dan hak Anda atas data tersebut. Dengan memakai Semang, Anda menyetujui
					ketentuan di dalamnya.
				</p>
			</Section>

			<Section index="02" label="Data">
				<h2 className={`${h2} mb-4`}>Data yang Kami Kumpulkan</h2>
				<h3 className={h3}>Dari pemilik kost</h3>
				<ul className={`${list} mb-5.5`}>
					<li>
						Nomor WhatsApp Anda. Semang tidak memakai kata sandi — masuk dilakukan lewat
						akun Google atau kode sekali pakai ke nomor itu, jadi tidak ada kata sandi
						yang kami simpan.
					</li>
					<li>
						Bila masuk lewat Google: nama, alamat email, dan pengenal akun Google,
						sebatas yang Google berikan. Pemilik yang mendaftar lewat nomor WhatsApp
						tidak memberikan nama maupun email, dan kami tidak memintanya.
					</li>
					<li>
						Data rekening bank: nama bank, nomor rekening, dan nama pemilik rekening.
						Sebelum pembayaran online aktif, nomornya dicantumkan pada tagihan;
						sesudahnya rekening yang sama menjadi tujuan penyelesaian dana dari sub-akun
						Xendit Anda.
					</li>
					<li>
						Data kost: nama, wilayah, daftar kamar, tipe kamar, harga sewa, dan tanggal
						jatuh tempo. Wilayah dipakai untuk menentukan zona waktu kost, bukan untuk
						melacak lokasi Anda.
					</li>
					<li>
						Data verifikasi identitas untuk mengaktifkan pembayaran online. Formulirnya
						ada di dalam Semang, tetapi isinya diteruskan langsung ke Xendit dan tidak
						kami simpan sendiri.
					</li>
					<li>
						Catatan pengiriman pesan: nomor tujuan, waktu kirim, status sampai atau
						gagal, dan biaya per pesan.
					</li>
					<li>
						Alamat IP dan nomor tujuan saat Anda meminta kode masuk, disimpan sebentar
						untuk membatasi jumlah permintaan kode.
					</li>
					<li>
						Catatan mentah dari penyedia pembayaran saat sebuah pembayaran terjadi,
						untuk menelusuri pembayaran bila ada sengketa.
					</li>
					<li>Jejak aksi di akun Anda: tindakan apa, kapan, dan oleh siapa.</li>
				</ul>
				<h3 className={h3}>Dari penghuni kost</h3>
				<ul className={`${list} mb-5.5`}>
					<li>
						Nama dan nomor WhatsApp — diisi sendiri lewat tautan yang dibagikan pemilik,
						atau dimasukkan oleh pemilik kost.
					</li>
					<li>
						Waktu dan versi teks persetujuan yang disetujui saat mengisi data diri,
						sebagai bukti persetujuan atas teks yang mana.
					</li>
					<li>
						Salinan nama dan nomor WhatsApp pada setiap tagihan, sebagaimana tercantum
						saat tagihan itu diterbitkan.
					</li>
					<li>
						Catatan tagihan dan pembayaran, beserta riwayat kamar yang ditempati selama
						masa sewa.
					</li>
				</ul>
				<div className={callout}>
					<strong className="font-extrabold text-teal-900">
						Yang tidak kami kumpulkan:
					</strong>{" "}
					kata sandi, foto bukti transfer, nomor rekening atau data kartu penghuni, lokasi
					GPS, dan data sensitif lain yang tidak diperlukan. Penghuni yang membayar lewat
					tautan pembayaran memasukkan datanya langsung di halaman Xendit — data itu tidak
					melewati Semang.
				</div>
			</Section>

			<Section index="03" label="Tujuan" className="max-w-215">
				<h2 className={`${h2} mb-4`}>Untuk Apa Data Digunakan</h2>
				<div className="lg:hidden">
					<p className={`${th} block pb-2.5`}>Data dan tujuan</p>
					<dl className="border-warm-200 border-b">
						{purposes.map(([data, purpose]) => (
							<div key={data} className="border-warm-100 py-3 not-first:border-t">
								<dt className="text-warm-900 mb-1 text-sm font-bold">{data}</dt>
								<dd className="text-warm-600 text-[13.5px] leading-normal">
									{purpose}
								</dd>
							</div>
						))}
					</dl>
				</div>
				<div className="hidden lg:block">
					<table className="w-full border-collapse text-left">
						<thead>
							<tr>
								<th className={`${th} w-[38%] pr-4`}>Data</th>
								<th className={`${th} pl-4`}>Tujuan</th>
							</tr>
						</thead>
						<tbody>
							{purposes.map(([data, purpose]) => (
								<tr key={data} className="group">
									<th
										scope="row"
										className={`${td} text-warm-900 py-3 pr-4 text-left text-sm font-bold`}
									>
										{data}
									</th>
									<td
										className={`${td} text-warm-600 py-3 pl-4 text-sm leading-normal`}
									>
										{purpose}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<p className={`${body} mt-4`}>
					Data hanya dipakai untuk hal-hal di atas. Kami tidak memakai data Anda untuk
					iklan, tidak menjualnya, dan tidak membaginya ke pihak lain untuk kepentingan
					komersial mereka.
				</p>
			</Section>

			<Section index="04" label="Keamanan">
				<h2 className={`${h2} mb-3.5`}>Penyimpanan &amp; Keamanan</h2>
				<ul className={`${list} gap-2.5`}>
					<li>
						Data disimpan pada infrastruktur tepercaya (Supabase) dengan pemisahan
						antar-pengguna di tingkat basis data: tiap pemilik hanya dapat membuka data
						kostnya sendiri, dan pemisahan itu dikunci di database, bukan hanya di
						tampilan.
					</li>
					<li>
						Halaman yang dibuka tanpa akun diamankan dengan tautan bertoken acak yang
						tidak dapat ditebak dan punya masa berlaku: satu token per kamar untuk
						pengisian data penghuni, dan satu token per tagihan untuk kuitansi serta
						halaman pembayaran.
					</li>
					<li>
						Semang tidak menyimpan berkas apa pun. Kuitansi disusun saat tautannya
						dibuka, langsung dari data tagihan dan pembayaran.
					</li>
					<li>
						Uang tidak pernah melewati Semang. Pembayaran penghuni masuk langsung ke
						rekening pemilik kost melalui sub-akun Xendit milik pemilik sendiri.
					</li>
				</ul>
			</Section>

			<Section index="05" label="Pihak ketiga" className="max-w-215">
				<h2 className={`${h2} mb-3`}>Kepada Siapa Data Diteruskan</h2>
				<p className={`${body} mb-4.5`}>
					Semang tidak dapat bekerja tanpa meneruskan sebagian data ke pihak-pihak
					berikut. Masing-masing hanya menerima data yang diperlukan untuk perannya, dan
					hanya boleh memakainya untuk memberikan layanan kepada kami.
				</p>
				<dl className="border-warm-200 border-b lg:hidden">
					{processors.map(([party, received, why]) => (
						<div key={party} className="border-warm-200 border-t py-3.5">
							<dt className="text-warm-900 mb-2 text-sm font-extrabold">{party}</dt>
							<dd className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-2.5 gap-y-1.5 text-[13.5px] leading-normal">
								<span className={meta}>Diterima</span>
								<span className="text-warm-600">{received}</span>
								<span className={meta}>Untuk</span>
								<span className="text-warm-600">{why}</span>
							</dd>
						</div>
					))}
				</dl>
				<div className="hidden lg:block">
					<table className="w-full border-collapse text-left">
						<thead>
							<tr>
								<th className={`${th} w-[22%] pr-4`}>Pihak</th>
								<th className={`${th} px-4`}>Data yang diterima</th>
								<th className={`${th} w-[28%] pl-4`}>Untuk apa</th>
							</tr>
						</thead>
						<tbody>
							{processors.map(([party, received, why]) => (
								<tr key={party} className="group">
									<th
										scope="row"
										className={`${td} text-warm-900 py-3.5 pr-4 text-left text-sm font-bold`}
									>
										{party}
									</th>
									<td
										className={`${td} text-warm-600 px-4 py-3.5 text-sm leading-normal`}
									>
										{received}
									</td>
									<td
										className={`${td} text-warm-600 py-3.5 pl-4 text-sm leading-normal`}
									>
										{why}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<p className={`${body} mt-4`}>
					Selain itu, kami hanya membuka data bila diwajibkan oleh hukum yang berlaku.
				</p>
				<p className={`${body} mt-3`}>
					Perlu Anda ketahui: nomor WhatsApp penghuni diteruskan ke Meta agar pesan dapat
					dikirim. Pemilik kost yang memasukkan nomor penghuni bertanggung jawab memberi
					tahu penghuninya soal ini, dan formulir pengisian mandiri sudah memuat
					pemberitahuan tersebut.
				</p>
			</Section>

			<Section index="06" label="Hak Anda" id="hak-anda">
				<h2 className={`${h2} mb-3.5`}>Hak Anda</h2>
				<p className={`${body} mb-3.5`}>Sesuai UU PDP, Anda berhak:</p>
				<ul className={`${list} mb-4.5 gap-2.5`}>
					<li>
						<strong className="text-warm-900 font-extrabold">Mengakses</strong> data
						pribadi Anda yang kami simpan.
					</li>
					<li>
						<strong className="text-warm-900 font-extrabold">Memperbaiki</strong> data
						yang tidak akurat.
					</li>
					<li>
						<strong className="text-warm-900 font-extrabold">Menghapus</strong> data
						Anda. Pemilik dapat menghapus akun beserta seluruh data kostnya; penghuni
						dapat meminta penghapusan datanya kepada pemilik kost atau langsung kepada
						kami.
					</li>
					<li>
						<strong className="text-warm-900 font-extrabold">
							Berhenti menerima pesan
						</strong>{" "}
						dari Semang tanpa harus keluar dari kost. Setelah itu kami tidak lagi
						mengirim tagihan maupun pengingat ke nomor Anda; tagihannya tetap ada dan
						tetap terlihat oleh pemilik kost, yang lalu menagih dengan caranya sendiri.
					</li>
					<li>
						<strong className="text-warm-900 font-extrabold">
							Menarik persetujuan
						</strong>{" "}
						atas pemrosesan data. Perlu Anda pahami, sebagian layanan tidak dapat
						berjalan setelah persetujuan ditarik — misalnya pesan tagihan tidak lagi
						dapat dikirim.
					</li>
				</ul>
				<div className={`${callout} mb-3.5`}>
					<strong className="font-extrabold text-teal-900">
						Bagaimana penghapusan data penghuni dijalankan.
					</strong>{" "}
					Nama dan nomor WhatsApp penghuni benar-benar kami kosongkan. Yang tetap
					tersimpan adalah catatan tagihan dan pembayarannya, karena itu pembukuan pemilik
					kost dan bukan lagi data yang menunjuk ke diri Anda — nama pada tagihan lama
					adalah salinan yang dibuat saat tagihan itu diterbitkan, sebagaimana kuitansi
					kertas yang sudah dicetak. Kalau Anda ingin catatan transaksinya juga dihapus,
					itu perlu dibicarakan dengan pemilik kost karena menyangkut pembukuannya.
				</div>
				<p className={body}>
					Permintaan dapat diajukan melalui kontak pada bagian akhir dokumen ini.
				</p>
			</Section>

			<Section index="07" label="Penghuni">
				<h2 className={`${h2} mb-3`}>Penghuni yang Datanya Dimasukkan Pemilik</h2>
				<p className={body}>
					Sebagian data penghuni dimasukkan oleh pemilik kost, bukan oleh penghuni
					sendiri. Pada formulir pengisian mandiri, penghuni diberi tahu bahwa datanya
					dipakai untuk keperluan penagihan kost sebelum ia mengirimkannya. Penghuni dapat
					meminta penghapusan datanya kapan saja, baik melalui pemilik kost maupun
					langsung kepada kami, dan dapat meminta berhenti menerima pesan dari Semang
					tanpa harus keluar dari kost.
				</p>
			</Section>

			<Section index="08" label="Retensi">
				<h2 className={`${h2} mb-3.5`}>Berapa Lama Data Disimpan</h2>
				<ul className={`${list} gap-2.5`}>
					<li>Data disimpan selama akun aktif dan masih diperlukan untuk layanan.</li>
					<li>
						Saat akun pemilik dihapus, ada masa tenggang 30 hari sebelum datanya
						dimusnahkan permanen. Selama masa itu penghapusan masih dapat dibatalkan.
					</li>
					<li>
						Data penghuni yang sudah pindah tetap tersimpan bila masih ada tagihan yang
						belum lunas. Setelah tidak ada lagi kewajiban yang terbuka, nama dan
						nomornya dapat dikosongkan atas permintaan, sementara catatan tagihannya
						tetap ada sebagai pembukuan pemilik.
					</li>
					<li>
						Kode masuk disimpan 24 jam setelah dipakai atau kedaluwarsa. Catatan
						pembatasan permintaan kode, termasuk alamat IP, disimpan 7 hari sejak
						jendela hitungnya berakhir.
					</li>
					<li>
						Catatan pengiriman pesan, termasuk nomor tujuan, disimpan rinci selama 24
						bulan. Setelah itu yang tersisa hanya ringkasan jumlah dan biaya pesan per
						kost per bulan, tanpa nomor siapa pun.
					</li>
					<li>
						Catatan mentah dari penyedia pembayaran, yang dipakai menelusuri pembayaran
						bila ada sengketa, disimpan 90 hari setelah diproses.
					</li>
					<li>
						Kuitansi tidak disimpan sebagai berkas terpisah. Karena disusun dari data
						tagihan dan pembayaran saat dibuka, kuitansi ikut hilang dengan sendirinya
						begitu datanya dihapus.
					</li>
				</ul>
			</Section>

			<section className="border-warm-200 grid gap-4 border-t lg:grid-cols-[104px_minmax(0,1fr)] lg:gap-10">
				<LedgerIndex index="09–10" label="Penutup" className="pt-8" />
				<div className="grid max-w-190 lg:grid-cols-2">
					<div className="pt-8 lg:pr-[clamp(20px,3vw,40px)]">
						<h2 className="mb-2.5 text-lg font-extrabold tracking-tight text-teal-900">
							Perubahan Kebijakan
						</h2>
						<p className={body}>
							Kebijakan ini dapat diperbarui. Perubahan penting akan diberitahukan
							melalui aplikasi. Tanggal &ldquo;Berlaku sejak&rdquo; di atas
							menunjukkan versi terkini.
						</p>
					</div>
					<div className="border-warm-200 pt-8 lg:border-l lg:pl-[clamp(20px,3vw,40px)]">
						<h2 className="mb-2.5 text-lg font-extrabold tracking-tight text-teal-900">
							Kontak
						</h2>
						<p className={body}>
							Pertanyaan atau permintaan terkait data pribadi dapat disampaikan
							melalui kontak resmi Semang. Kami berupaya menanggapi dalam waktu yang
							wajar sesuai ketentuan UU PDP.
						</p>
					</div>
				</div>
			</section>
		</div>
	);
}
