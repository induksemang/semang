import { ArrowLink, LedgerSection } from "../shared/ledger";

const rows = [
	{
		number: "01",
		title: "Sungkan menagih",
		problem:
			"Menagih orang yang tiap hari kamu temui di depan kamar itu tidak nyaman. Ditunda sehari, lalu seminggu, lalu tunggakannya menumpuk.",
		answer: "Tagihan dan pengingat berangkat otomatis atas nama kost. Kamu tidak pernah lagi jadi orang yang menagih."
	},
	{
		number: "02",
		title: "Catatan berantakan",
		problem:
			"Bukti transfer terselip di chat, catatan sewa tersebar antara buku tulis dan ingatan. Saat ditanya siapa yang belum bayar, jawabannya perlu dicari dulu.",
		answer: "Tiap tagihan punya nomor yang bisa disebut, status yang jelas, dan kuitansi digital. Laporan kas ikut terbarui sendiri."
	},
	{
		number: "03",
		title: "Verifikasi pembayaran melelahkan",
		problem:
			"Mencocokkan mutasi rekening satu per satu memakan waktu, dan bukti transfer yang diedit tetap mungkin lolos.",
		answer: "Pembayaran lewat link tercatat otomatis oleh sistem Xendit. Tidak ada lagi gambar bukti transfer yang perlu dipercaya."
	}
];

export function Problems() {
	return (
		<LedgerSection
			index="01"
			label="Masalah"
			className="border-warm-200 bg-warm-canvas border-t"
		>
			<h2 className="text-h2 mb-3.5 max-w-155 font-extrabold text-balance text-teal-900">
				Tiga hal yang paling menguras tenaga pemilik kost
			</h2>
			<p className="text-warm-600 mb-2 max-w-150 text-base leading-relaxed">
				Urutannya kami ambil dari riset pemilik kost 5–20 kamar, bukan dari daftar fitur
				yang ingin dijual.
			</p>

			<div className="mt-7 grid auto-rows-fr">
				{rows.map((row) => (
					<div
						key={row.number}
						className="border-warm-200 grid items-stretch gap-2.5 border-t py-5 last:border-b lg:grid-cols-[36px_1fr_1fr] lg:gap-[clamp(16px,2.5vw,36px)] lg:py-0"
					>
						<div className="text-warm-300 font-mono text-xs leading-snug font-bold lg:py-6">
							{row.number}
						</div>
						<div className="pb-1 lg:py-6">
							<h3 className="text-warm-900 mb-2 text-lg font-extrabold tracking-tight">
								{row.title}
							</h3>
							<p className="text-warm-600 text-sm leading-relaxed">{row.problem}</p>
						</div>
						<div className="lg:border-warm-200 border-l-2 border-teal-200 pl-3.5 lg:border-l lg:py-6 lg:pl-[clamp(16px,2.5vw,32px)]">
							<p className="text-brand mb-2 font-mono text-[10.5px] leading-snug font-bold tracking-widest uppercase">
								Di Semang
							</p>
							<p className="text-warm-700 text-sm leading-relaxed">{row.answer}</p>
						</div>
					</div>
				))}
			</div>

			<ArrowLink href="/cara-kerja" className="mt-6">
				Lihat cara kerja lengkap
			</ArrowLink>
		</LedgerSection>
	);
}
