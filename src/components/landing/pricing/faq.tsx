import { LedgerSection } from "../shared/ledger";

const faqs = [
	{
		question: "Kalau bulan ini cuma 6 dari 12 kamar yang terisi?",
		answer: "Kamu membayar untuk 6 kamar. Di paket Starter angkanya Rp12.000, tetapi minimum bulanan Rp20.000 tetap berlaku — jadi tagihanmu Rp20.000."
	},
	{
		question: "Apa yang terjadi setelah trial 60 hari selesai?",
		answer: "Akunmu berpindah ke keadaan tidak berlangganan, bukan terkunci. Semua data tetap utuh dan tagihan tetap dibuat; yang berhenti hanya pengirimannya. Di akhir trial kami tunjukkan angkamu sendiri — berapa tagihan yang sudah terkirim otomatis dan berapa yang tercatat masuk."
	},
	{
		question: "Bisa pilih Starter untuk kost 30 kamar biar lebih murah?",
		answer: "Tidak. Paket mengikuti ukuran kost — 30 kamar masuk Pro. Rentang kamar bukan batas yang bisa ditukar dengan harga lebih rendah."
	},
	{
		question: "Ada potongan dari uang sewa yang masuk?",
		answer: "Tidak ada. Sewa masuk penuh ke rekeningmu, dan kami tidak menambahkan markup atas biaya transaksi Xendit ke penyewa — praktik itu memang dilarang aturan Bank Indonesia."
	},
	{
		question: "Kalau berhenti berlangganan, data saya hilang?",
		answer: "Tidak. Kamar, penyewa, tagihan, dan riwayat tetap tersimpan dan tetap bisa diubah serta diekspor. Kost tidak mengecil hanya karena pemiliknya berhenti membayar, jadi batas kamar pun tidak tiba-tiba diberlakukan."
	},
	{
		question: "Kamar yang sedang saya bangun ikut ditagih?",
		answer: "Tidak, dan juga belum dihitung dalam batas kamar paket. Kamar baru mulai berbiaya setelah ada penyewa yang menempatinya."
	},
	{
		question: "Perlu kartu kredit untuk mencoba?",
		answer: "Tidak. Enam puluh hari dengan fitur Pro terbuka, tanpa kartu kredit dan tanpa tagihan yang menyusul diam-diam."
	}
];

export function Faq() {
	return (
		<LedgerSection
			index="03"
			label="Pertanyaan"
			rhythm="section-sm"
			className="bg-warm-canvas border-t border-teal-200"
		>
			<h2 className="text-h2-sm mb-7.5 max-w-140 font-extrabold text-balance text-teal-900">
				Yang paling sering ditanyakan soal biaya
			</h2>

			<dl>
				{faqs.map((faq) => (
					<div
						key={faq.question}
						className="border-warm-200 grid gap-2 border-t py-4 last:pb-0 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:gap-[clamp(20px,3vw,44px)] lg:py-5"
					>
						<dt className="text-warm-900 text-base leading-snug font-extrabold">
							{faq.question}
						</dt>
						<dd className="text-warm-600 text-sm leading-relaxed">{faq.answer}</dd>
					</div>
				))}
			</dl>
		</LedgerSection>
	);
}
