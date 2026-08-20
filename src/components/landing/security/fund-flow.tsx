import { Fragment } from "react";
import { ArrowGlyph, LedgerSection } from "../shared/ledger";

const stops = [
	{
		number: "01",
		title: "Penyewa membayar",
		body: "QRIS, virtual account, atau e-wallet, dengan nominal yang sudah pasti. Data pembayarannya diisi di halaman Xendit, tidak melewati Semang."
	},
	{
		number: "02",
		title: "Sub-akun Xendit milikmu",
		body: "Sub-akun itu terdaftar atas namamu, bukan atas nama Semang. Pembagian dana diatur otomatis di sana."
	},
	{
		number: "03",
		title: "Rekening bankmu",
		body: "Rekening yang kamu daftarkan sendiri. Semang tidak bisa menahan, mengalihkan, atau menunda dana yang menuju ke sana.",
		destination: true
	}
];

const guarantees = [
	{
		title: "Tanpa markup ke penyewa",
		body: "Biaya transaksi Xendit tidak kami bebankan sebagai tambahan di halaman pembayaran — aturan Bank Indonesia memang melarangnya."
	},
	{
		title: "Tanpa komisi dari sewa",
		body: "Pendapatan Semang hanya dari langganan per kamar terisi. Berapa pun sewa yang masuk, potongannya tetap nol."
	},
	{
		title: "Tanpa berkas yang menumpuk",
		body: "Kuitansi disusun saat tautannya dibuka, langsung dari data tagihan. Tidak ada gambar atau PDF yang kami simpan."
	}
];

export function FundFlow() {
	return (
		<LedgerSection
			index="01"
			label="Alur dana"
			rhythm="section-sm"
			className="border-warm-200 bg-warm-25 border-t"
		>
			<h2 className="text-h2-sm mb-3.5 max-w-155 font-extrabold text-balance text-teal-900">
				Tiga perhentian, dan Semang bukan salah satunya
			</h2>
			<p className="text-warm-600 mb-8 max-w-160 text-base leading-relaxed">
				Pembayaran penyewa berjalan lewat sub-akun Xendit atas namamu sendiri, lalu
				diselesaikan ke rekening yang kamu daftarkan. Semang hanya menerima pemberitahuan
				bahwa pembayarannya terjadi, lalu menulis catatannya.
			</p>

			{/* Panah pemisah ikut jadi kolom kisi supaya tiga kartu tetap sama tinggi */}
			<div className="grid items-stretch lg:grid-cols-[1fr_auto_1fr_auto_1fr]">
				{stops.map((stop, index) => (
					<Fragment key={stop.number}>
						<div
							className={
								stop.destination
									? "border-brand border bg-teal-50 p-6"
									: "border-warm-200 border bg-white p-6"
							}
						>
							<p
								className={`mb-3 font-mono text-[10.5px] leading-snug font-bold tracking-widest ${
									stop.destination ? "text-brand" : "text-muted-foreground"
								}`}
							>
								{stop.number}
							</p>
							<h3
								className={`mb-2 text-base font-extrabold ${
									stop.destination ? "text-teal-900" : "text-warm-900"
								}`}
							>
								{stop.title}
							</h3>
							<p
								className={`text-sm leading-relaxed ${
									stop.destination ? "text-teal-700" : "text-warm-600"
								}`}
							>
								{stop.body}
							</p>
						</div>
						{index < stops.length - 1 && (
							<div className="text-warm-300 flex items-center justify-center py-2.5 lg:px-3.5 lg:py-0">
								<ArrowGlyph className="ml-0 size-5 rotate-90 align-baseline lg:size-5.5 lg:rotate-0" />
							</div>
						)}
					</Fragment>
				))}
			</div>

			<div className="border-warm-200 mt-6 grid border-t lg:grid-cols-3">
				{guarantees.map((item) => (
					<div
						key={item.title}
						className="border-warm-200 pt-5 pb-4.5 not-first:border-t lg:px-6 lg:pb-0 lg:not-first:border-t-0 lg:not-first:border-l lg:first:pl-0 lg:last:pr-0"
					>
						<h3 className="text-warm-900 mb-1.75 text-base font-extrabold">
							{item.title}
						</h3>
						<p className="text-warm-600 text-sm leading-relaxed">{item.body}</p>
					</div>
				))}
			</div>
		</LedgerSection>
	);
}
