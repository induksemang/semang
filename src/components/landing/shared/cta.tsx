export function Cta() {
	return (
		<section id="daftar" className="container scroll-mt-16 pb-8 md:pb-12">
			<div className="relative overflow-hidden rounded-3xl bg-teal-700 px-6 py-10 text-center sm:px-12 sm:py-16">
				<div
					aria-hidden
					className="absolute inset-0"
					style={{
						background:
							"radial-gradient(circle at 80% 20%, rgba(88,156,144,.35) 0%, rgba(88,156,144,0) 60%)"
					}}
				/>
				<div className="relative space-y-8">
					<div className="space-y-3.5">
						<h2 className="text-[clamp(1.75rem,4.5vw,2.5rem)] leading-tight font-extrabold tracking-tight text-balance text-white">
							Bulan depan, biarkan Semang yang menagih.
						</h2>
						<p className="mx-auto text-lg leading-relaxed text-pretty text-teal-200">
							Lima menit dari sekarang, contoh tagihan pertamamu sudah masuk ke
							WhatsApp-mu sendiri.
						</p>
					</div>
					<div className="space-y-4.5">
						<div className="flex flex-wrap justify-center gap-3">
							<a
								href="#"
								className="rounded-md bg-white px-8 py-4 text-base font-extrabold text-teal-900 transition-colors hover:bg-teal-50"
							>
								Daftar gratis sekarang
							</a>
						</div>
						<p className="text-sm font-semibold text-teal-300">
							Gratis sampai 5 kamar · 60 hari fitur Pro · tanpa kartu kredit
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
