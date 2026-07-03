const faqs = [
	{
		q: "Apakah uang sewa lewat Semang dulu?",
		a: "Tidak, tidak pernah. Pembayaran penyewa langsung masuk ke rekeningmu sendiri melalui jalur pembayaran resmi. Semang hanya mencatat dan mengonfirmasi — tidak menampung uang."
	},
	{
		q: "Penyewa saya masih suka bayar tunai. Bagaimana?",
		a: "Bisa. Kamu tinggal menandai tagihan sebagai lunas dengan pilihan tunai atau transfer langsung — catatan tetap rapi, dan reminder untuk tagihan itu berhenti sendiri."
	},
	{
		q: "Apakah penyewa harus install aplikasi?",
		a: "Tidak. Penyewa hanya menerima pesan WhatsApp berisi tagihan dan link pembayaran — dibuka di browser, bayar, selesai. Kuitansi digital juga diakses lewat link."
	},
	{
		q: "Bagaimana kalau saya berhenti berlangganan?",
		a: "Akunmu otomatis pindah ke paket Gratis — semua data tetap utuh dan tetap bisa diekspor kapan saja."
	}
];

export function Faq() {
	return (
		<section className="container max-w-3xl space-y-8 py-10 md:py-14 lg:py-18">
			<div className="space-y-2.5">
				<p className="text-primary text-xs font-bold tracking-widest uppercase">
					Pertanyaan umum
				</p>
				<h2 className="text-3xl font-extrabold tracking-tight text-teal-900">
					Yang sering ditanyakan pemilik kost
				</h2>
			</div>

			<div className="flex flex-col gap-3.5">
				{faqs.map((faq) => (
					<div
						key={faq.q}
						className="border-border bg-card shadow-warm-sm space-y-2 rounded-lg border px-6 py-5.5"
					>
						<h3 className="text-base font-bold">{faq.q}</h3>
						<p className="text-warm-600 text-sm leading-relaxed">{faq.a}</p>
					</div>
				))}
			</div>
		</section>
	);
}
