import { ArrowLink, LedgerSection } from "../shared/ledger";

const features = [
	{
		title: "Tipe kamar & harga sendiri",
		body: "Standar, AC, kamar mandi dalam — masing-masing punya harga. Satu kamar juga bisa dipatok khusus."
	},
	{
		title: "Enam status kamar",
		body: "Kamar yang sedang dibangun atau direnovasi tidak dihitung sebagai kamar kosong yang menunggu penyewa."
	},
	{
		title: "Dua cara jatuh tempo",
		body: "Ikut tanggal masuk tiap penyewa, atau satu tanggal tetap untuk semua. Pilih yang sudah kamu jalankan."
	},
	{
		title: "Bulanan, mingguan, harian",
		body: "Untuk perantau yang menyewa sebentar. Harga turunan dihitung sistem, boleh kamu timpa sendiri."
	},
	{
		title: "Bayar di muka & cicilan",
		body: "Diskon setahun kamu tentukan sendiri. Cicilan dicatat dari sisimu, dengan nominal yang terkunci."
	},
	{
		title: "Pindah kamar",
		body: "Tetap atau sementara saat renovasi. Penyewanya tetap satu orang, riwayat tagihannya tidak pecah."
	}
];

export function Features() {
	return (
		<LedgerSection index="03" label="Fitur" className="bg-warm-canvas border-t border-teal-200">
			<h2 className="text-h2 mb-3.5 max-w-155 font-extrabold text-balance text-teal-900">
				Mengikuti cara kostmu berjalan, bukan sebaliknya
			</h2>
			<p className="text-warm-600 mb-8 max-w-150 text-base leading-relaxed">
				Aturan penagihan yang sudah kamu pakai bertahun-tahun tidak perlu diubah supaya
				cocok dengan aplikasi.
			</p>

			<div className="border-warm-200 grid border-y lg:grid-cols-3">
				{features.map((feature) => (
					<div
						key={feature.title}
						className="border-warm-200 border-t py-5.5 first:border-t-0 lg:border-l lg:px-6 lg:nth-[-n+3]:border-t-0 lg:nth-[3n]:pr-0 lg:nth-[3n+1]:border-l-0 lg:nth-[3n+1]:pl-0"
					>
						<h3 className="text-warm-900 mb-1.75 text-base font-extrabold">
							{feature.title}
						</h3>
						<p className="text-warm-600 text-sm leading-relaxed">{feature.body}</p>
					</div>
				))}
			</div>

			<ArrowLink href="/fitur" className="mt-7">
				Rinciannya di halaman Fitur
			</ArrowLink>
		</LedgerSection>
	);
}
