import { WhatsappChat } from "./whatsapp-chat";

const guarantees = [
	"Uang langsung ke rekeningmu — bukan ke kami",
	"Bayar hanya kamar yang terisi",
	"Penyewa tanpa install aplikasi"
];

export function Hero() {
	return (
		<header id="top" className="container py-8 md:py-14 lg:py-18">
			<div className="flex flex-wrap items-center gap-x-8 md:gap-y-8 lg:flex-nowrap lg:gap-x-14">
				{/* Copy */}
				<div className="min-w-0 flex-1 basis-90 space-y-7 md:space-y-8 lg:basis-95">
					<div className="space-y-5 md:space-y-6">
						<div className="inline-flex items-center gap-2 rounded-full bg-teal-100 px-3.5 py-1.5">
							<span className="bg-primary size-1.5 rounded-full" />
							<span className="text-xs font-bold tracking-wider text-teal-700 uppercase">
								Pengganti buku catatan &amp; WhatsApp
							</span>
						</div>
						<div className="space-y-4 md:space-y-5">
							<h1 className="text-[clamp(2.125rem,5.2vw,3.375rem)] leading-none font-extrabold tracking-tight text-balance text-teal-900 md:text-[2.5rem] lg:text-[clamp(2.125rem,5.2vw,3.375rem)]">
								Kost-mu ditagih otomatis, uang masuk tercatat sendiri.
							</h1>
							<p className="text-warm-600 max-w-130 text-base leading-relaxed text-pretty md:text-lg lg:text-xl">
								Semang menagih penyewa kost-mu otomatis lewat WhatsApp, menerima
								pembayaran online yang langsung masuk ke rekeningmu, dan mencatat
								semuanya sendiri.
							</p>
						</div>
					</div>
					<div className="space-y-6 md:space-y-7">
						<div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-3">
							<a
								href="#daftar"
								className="bg-primary shadow-warm-teal-lg rounded-lg px-6.5 py-4 text-center text-base font-bold text-white transition-colors hover:bg-teal-600 sm:rounded-md"
							>
								Mulai gratis — 5 menit
							</a>
							<a
								href="#cara-kerja"
								className="rounded-lg border-2 border-teal-200 bg-white px-6.5 py-4 text-center text-base font-bold text-teal-700 transition-colors hover:bg-teal-50 sm:rounded-md"
							>
								Lihat cara kerja
							</a>
						</div>
						<ul className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5.5 sm:gap-y-3">
							{guarantees.map((item) => (
								<li key={item} className="flex items-center gap-2">
									<span className="bg-success-bg text-success flex size-4.5 flex-none items-center justify-center rounded-full text-xs font-extrabold">
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

				{/* WhatsApp mockup */}
				<div className="relative flex w-full flex-1 basis-75 justify-center pt-8 md:pt-0">
					<div
						aria-hidden
						className="absolute top-1/2 left-1/2 size-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-100/70 blur-[80px]"
					/>
					{/* Tanpa bezel selama mockup masih wrap ke bawah (< md = basis 360 + 300 + gap 32 + padding 48) */}
					<div className="shadow-warm-lg relative z-1 w-full overflow-hidden rounded-xl md:hidden">
						<WhatsappChat />
					</div>
					<PhoneMockup />
				</div>
			</div>
		</header>
	);
}

function PhoneMockup() {
	return (
		<div className="shadow-phone relative z-1 hidden aspect-9/19.5 w-70 rounded-[46px] bg-teal-900 p-2.5 md:block lg:w-74">
			<div className="h-full overflow-hidden rounded-[36px]">
				<WhatsappChat />
			</div>
		</div>
	);
}
