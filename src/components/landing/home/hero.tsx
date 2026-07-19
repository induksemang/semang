const guarantees = [
	"Uang langsung ke rekeningmu — bukan ke kami",
	"Bayar hanya kamar yang terisi",
	"Penyewa tanpa install aplikasi"
];

export function Hero() {
	return (
		<header id="top" className="container py-10 md:py-14 lg:py-18">
			<div className="flex flex-wrap items-center gap-x-14 md:gap-y-8 lg:flex-nowrap">
				{/* Copy */}
				<div className="min-w-0 flex-1 basis-95 space-y-8">
					<div className="space-y-6">
						<div className="inline-flex items-center gap-2 rounded-full bg-teal-100 px-3.5 py-1.5">
							<span className="bg-primary size-1.5 rounded-full" />
							<span className="text-xs font-bold tracking-wider text-teal-700 uppercase">
								Pengganti buku catatan &amp; WhatsApp
							</span>
						</div>
						<div className="space-y-5">
							<h1 className="text-[clamp(2.125rem,5.2vw,3.375rem)] leading-none font-extrabold tracking-tight text-balance text-teal-900">
								Kost-mu ditagih otomatis, uang masuk tercatat sendiri.
							</h1>
							<p className="text-warm-600 max-w-130 text-lg leading-relaxed text-pretty sm:text-xl">
								Semang menagih penyewa kost-mu otomatis lewat WhatsApp, menerima
								pembayaran online yang langsung masuk ke rekeningmu, dan mencatat
								semuanya sendiri.
							</p>
						</div>
					</div>
					<div className="space-y-7">
						<div className="flex flex-wrap gap-3">
							<a
								href="#daftar"
								className="bg-primary rounded-md px-6.5 py-4 text-base font-bold text-white shadow-[0_6px_18px_rgba(60,131,119,0.28)] transition-colors hover:bg-teal-600"
							>
								Mulai gratis — 5 menit
							</a>
							<a
								href="#cara-kerja"
								className="rounded-md border-2 border-teal-200 bg-white px-6.5 py-4 text-base font-bold text-teal-700 transition-colors hover:bg-teal-50"
							>
								Lihat cara kerja
							</a>
						</div>
						<ul className="flex flex-wrap items-center gap-x-5.5 gap-y-3">
							{guarantees.map((item) => (
								<li key={item} className="flex items-center gap-2">
									<span className="bg-success-bg text-success flex size-4.5 items-center justify-center rounded-full text-xs font-extrabold">
										✓
									</span>
									<span className="text-warm-600 text-sm font-semibold">
										{item}
									</span>
								</li>
							))}
						</ul>
					</div>
				</div>

				{/* WhatsApp phone mockup */}
				<div className="relative flex flex-1 basis-75 justify-center">
					<div
						aria-hidden
						className="absolute top-1/2 left-1/2 size-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-100/70 blur-[80px]"
					/>
					<PhoneMockup />
				</div>
			</div>
		</header>
	);
}

function PhoneMockup() {
	return (
		<div className="relative z-1 hidden aspect-9/19.5 w-74 rounded-[46px] bg-teal-900 p-2.5 shadow-[0_2px_6px_rgba(27,58,54,0.2),0_18px_36px_rgba(27,58,54,0.22),0_40px_80px_rgba(27,58,54,0.18)] md:block">
			<div className="flex h-full flex-col overflow-hidden rounded-[36px] bg-[#ECE5DD]">
				{/* WA header */}
				<div className="flex items-center gap-2.5 bg-teal-700 px-4 pt-4 pb-3.5">
					<img src="/logo.svg" alt="" className="size-8.5 flex-none rounded-full" />
					<div className="min-w-0 flex-1">
						<div className="flex items-center gap-1.5">
							<span className="text-sm font-bold text-white">Semang</span>
							<span className="flex size-3 flex-none items-center justify-center rounded-full bg-teal-300 text-[7px] font-extrabold text-teal-900">
								✓
							</span>
						</div>
						<div className="text-xs text-teal-300">Akun bisnis</div>
					</div>
				</div>
				{/* Chat */}
				<div className="flex flex-1 flex-col gap-2.5 px-3.5 py-4.5">
					<span className="bg-warm-50 text-warm-400 self-center rounded-lg px-2.5 py-1 text-[10px] font-bold">
						Kamis, 25 Juni
					</span>
					<div className="bg-card max-w-[88%] space-y-2 self-start rounded-[4px_14px_14px_14px] px-3.5 py-3 shadow-[0_1px_1px_rgba(0,0,0,0.08)]">
						<div className="space-y-1.5">
							<div className="text-xs font-bold text-black">
								🧾 Tagihan Sewa · Kost Melati
							</div>
							<div className="text-xs leading-normal text-black">
								Halo Rara, ini tagihan sewa kamu:
								<br />
								<br />
								Kamar 3 · Periode Juli 2026
								<br />
								Nominal: <b>Rp1.500.000</b>
								<br />
								Jatuh tempo: 1 Juli 2026
								<br />
								<br />
								Bayar lewat QRIS, VA, atau e-wallet:
							</div>
						</div>
						<div className="space-y-1">
							<div className="text-info text-xs font-semibold break-all">
								semang.id/bayar/k3-92fa
							</div>
							<div className="text-right text-[10px] text-gray-500">08.00</div>
						</div>
					</div>
					<div className="max-w-[80%] space-y-1 self-end rounded-[14px_4px_14px_14px] bg-green-100/80 px-3.5 py-2.75 shadow-[0_1px_1px_rgba(0,0,0,0.08)]">
						<div className="text-xs leading-normal text-black">
							Sudah kubayar barusan pakai QRIS ya 🙏
						</div>
						<div className="text-right text-[10px] text-gray-500">08.41 ✓✓</div>
					</div>
					<div className="bg-card max-w-[88%] space-y-1 self-start rounded-[4px_14px_14px_14px] px-3.5 py-2.75 shadow-[0_1px_1px_rgba(0,0,0,0.08)]">
						<div className="text-xs leading-normal text-black">
							<b>✓ Pembayaran diterima — lunas</b>
							<br />
							Rp1.500.000 · Kamar 3 · Juli 2026.
							<br />
							Kuitansi digital:{" "}
							<span className="text-info font-semibold">
								semang.id/kuitansi/k3-92fa
							</span>
						</div>
						<div className="text-right text-[10px] text-gray-500">08.42</div>
					</div>
				</div>
			</div>
		</div>
	);
}
