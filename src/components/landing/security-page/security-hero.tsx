const points = [
	{
		title: "Langsung ke rekeningmu",
		body: "Diproses lewat jalur pembayaran resmi yang dipakai ribuan bisnis Indonesia. Dana mengalir ke rekeningmu, tanpa mampir ke mana pun.",
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
		body: "Berhenti berlangganan? Akun otomatis pindah ke paket Gratis, data tetap milikmu dan bisa diekspor kapan saja.",
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

export function SecurityHero() {
	return (
		<header className="bg-teal-900">
			<div className="container space-y-10 py-10 md:py-14 lg:py-18">
				<div className="space-y-4">
					<div className="space-y-2.5">
						<p className="text-xs font-bold tracking-widest text-teal-300 uppercase">
							Keamanan &amp; kepercayaan
						</p>
						<h1 className="max-w-190 text-3xl font-extrabold tracking-tight text-balance text-white sm:text-4xl md:text-5xl">
							Uangmu tidak pernah menyentuh Semang.
						</h1>
					</div>
					<p className="max-w-160 text-[15px] leading-relaxed text-pretty text-teal-200 sm:text-lg">
						Prinsipnya sederhana: uang sewa langsung masuk ke rekeningmu sendiri — kami
						tidak pernah memegangnya.
					</p>
				</div>

				<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
					{points.map((point) => (
						<div
							key={point.title}
							className="space-y-3 rounded-md border border-teal-600 bg-teal-800 p-5 lg:space-y-4 lg:rounded-lg lg:p-6.5"
						>
							<div className="flex size-10 items-center justify-center rounded-md bg-teal-600 text-teal-200 lg:size-11">
								{point.icon}
							</div>
							<div className="space-y-1.5 lg:space-y-2">
								<h3 className="text-sm font-bold text-white lg:text-base">
									{point.title}
								</h3>
								<p className="text-sm leading-relaxed text-teal-200">
									{point.body}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</header>
	);
}
