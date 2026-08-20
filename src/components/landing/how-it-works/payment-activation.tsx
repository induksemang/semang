import { ArrowLink, LedgerSection } from "../shared/ledger";

const stages = [
	{
		number: "01",
		title: "Isi data identitas & rekening",
		body: "Satu formulir di dalam Semang. Datanya diteruskan ke Xendit untuk membuat sub-akun atas namamu."
	},
	{
		number: "02",
		title: "Menunggu, tapi tetap menagih",
		body: "Selama verifikasi diproses, pesan tagihan memuat nomor rekeningmu dan kamu menandai lunas sendiri."
	},
	{
		number: "03",
		title: "Link menyala sendiri",
		body: "Setelah disetujui, tiap tagihan berikutnya otomatis membawa link pembayaran. Tidak ada yang perlu kamu ubah.",
		done: true
	}
];

export function PaymentActivation() {
	return (
		<LedgerSection
			index="04"
			label="Pembayaran online"
			rhythm="section-sm"
			className="border-warm-200 bg-warm-25 border-t"
		>
			<h2 className="text-h2-sm mb-3.5 max-w-160 font-extrabold text-balance text-teal-900">
				Verifikasi identitas dikerjakan sambil jalan, bukan di gerbang masuk
			</h2>
			<p className="text-warm-600 mb-7.5 max-w-160 text-base leading-relaxed">
				Untuk mengaktifkan pembayaran online, Semang perlu memverifikasi identitas dan
				rekening tujuanmu lewat Xendit. Prosesnya dikerjakan di dalam Semang, dan selama itu
				berjalan tagihanmu tetap terkirim seperti biasa.
			</p>

			<ol className="border-warm-200 grid border-y lg:grid-cols-3">
				{stages.map((stage) => (
					<li
						key={stage.number}
						className="border-warm-200 pt-6 pb-6.5 not-first:border-t lg:px-7 lg:not-first:border-t-0 lg:not-first:border-l lg:first:pl-0 lg:last:pr-0"
					>
						<p
							className={`mb-3 font-mono text-xs leading-snug font-bold ${
								stage.done ? "text-success-fg" : "text-warm-300"
							}`}
						>
							{stage.number}
						</p>
						<h3 className="text-warm-900 mb-2 text-base font-extrabold">
							{stage.title}
						</h3>
						<p className="text-warm-600 text-sm leading-relaxed">{stage.body}</p>
					</li>
				))}
			</ol>

			<p className="text-muted-foreground mt-4.5 max-w-180 text-sm leading-relaxed">
				Penyewa membayar lewat QRIS, virtual account, atau e-wallet — nominalnya sudah
				pasti, tidak ada yang perlu dihitung sendiri. Biaya transaksi Xendit tidak pernah
				kami bebankan sebagai tambahan ke penyewa.
			</p>
			<ArrowLink href="/keamanan" className="mt-5.5">
				Ke mana uangnya mengalir
			</ArrowLink>
		</LedgerSection>
	);
}
