import { SectionHeading } from "./section-heading";

const points = [
	{
		title: "Langsung ke rekeningmu",
		body: "Diproses Xendit — payment gateway berlisensi yang dipakai ribuan bisnis Indonesia. Dana mengalir ke rekeningmu, tanpa mampir ke mana pun.",
		icon: (
			<svg
				width="22"
				height="22"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<line x1="3" y1="22" x2="21" y2="22" />
				<line x1="6" y1="18" x2="6" y2="11" />
				<line x1="10" y1="18" x2="10" y2="11" />
				<line x1="14" y1="18" x2="14" y2="11" />
				<line x1="18" y1="18" x2="18" y2="11" />
				<path d="M12 2 3 7.5h18z" />
			</svg>
		)
	},
	{
		title: "Mulai tanpa syarat verifikasi",
		body: "Menagih otomatis jalan sejak hari pertama. Verifikasi identitas hanya diperlukan untuk mengaktifkan pelunasan online otomatis — bukan untuk mulai.",
		icon: (
			<svg
				width="22"
				height="22"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
			</svg>
		)
	},
	{
		title: "Datamu tetap aman",
		body: "Berhenti berlangganan? Akun otomatis pindah ke paket Gratis, semua data tetap milikmu dan bisa diekspor kapan saja. Data penyewa dilindungi sesuai UU PDP.",
		icon: (
			<svg
				width="22"
				height="22"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<ellipse cx="12" cy="5" rx="9" ry="3" />
				<path d="M3 5v14c0 1.7 4 3 9 3s9-1.3 9-3V5" />
				<path d="M3 12c0 1.7 4 3 9 3s9-1.3 9-3" />
			</svg>
		)
	}
];

export function Trust() {
	return (
		<section id="kepercayaan" className="scroll-mt-16 bg-teal-900">
			<div className="container space-y-8 py-10 md:py-14 lg:space-y-12 lg:py-18">
				<SectionHeading
					tone="dark"
					eyebrow="Keamanan uang"
					title="Uangmu tidak pernah menyentuh Semang."
					description="Pembayaran penyewa langsung masuk ke rekeningmu sendiri lewat jalur pembayaran resmi berlisensi. Kami hanya perangkat lunaknya — bukan penampung uang."
				/>
				<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
					{points.map((point) => (
						<div
							key={point.title}
							className="shadow-warm-sm space-y-4 rounded-xl border border-teal-600 bg-teal-800 p-6.5"
						>
							<div className="flex size-11 items-center justify-center rounded-md bg-teal-600 text-teal-200">
								{point.icon}
							</div>
							<div className="space-y-2">
								<h3 className="text-lg font-bold text-white">{point.title}</h3>
								<p className="text-sm leading-relaxed text-teal-200">
									{point.body}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
