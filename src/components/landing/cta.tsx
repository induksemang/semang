export function Cta() {
	return (
		<section id="try-it-for-free" className="container scroll-mt-16 py-10 md:py-14 lg:py-18">
			<div className="relative overflow-hidden rounded-3xl bg-teal-500 px-6 py-10 text-center sm:px-12 sm:py-16">
				<div
					aria-hidden
					className="absolute -top-15 -right-10 size-60 rounded-full bg-white/5"
				/>
				<div
					aria-hidden
					className="absolute -bottom-20 -left-8 size-50 rounded-full bg-white/5"
				/>
				<div className="relative">
					<h2 className="mx-auto mb-4 max-w-3xl text-[clamp(1.75rem,4.5vw,2.5rem)] leading-tight font-extrabold tracking-tight text-balance text-white">
						Lihat pesan tagihan atas nama kost-mu sendiri dalam 5 menit
					</h2>
					<p className="mx-auto mb-8 max-w-130 text-lg leading-relaxed text-pretty text-teal-50">
						Daftar, atur kamar &amp; harga, lalu kirim contoh tagihan ke WhatsApp-mu
						sendiri. Tanpa kartu kredit, tanpa install.
					</p>
					<div className="flex flex-wrap justify-center gap-3">
						<a
							href="#try-it-for-free"
							className="rounded-md bg-white px-8 py-4 text-base font-bold text-teal-700 shadow-[0_8px_24px_rgba(0,0,0,0.16)] transition-colors hover:bg-teal-50"
						>
							Mulai gratis sekarang
						</a>
						<a
							href="#try-it-for-free"
							className="rounded-md border-2 border-white/40 px-8 py-4 text-base font-bold text-white transition-colors hover:bg-white/20"
						>
							Jadwalkan demo
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}
