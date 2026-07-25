import { cn } from "@/lib/utils";

export function Cta({ className }: { className?: string }) {
	return (
		<section
			id="daftar"
			className={cn("container scroll-mt-16 py-10 md:py-14 lg:py-18", className)}
		>
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
						<h2 className="text-[clamp(1.5rem,4.5vw,2.5rem)] leading-tight font-extrabold tracking-tight text-balance text-white">
							Bulan depan, biarkan Semang yang menagih.
						</h2>
						<p className="mx-auto text-sm leading-relaxed text-pretty text-teal-200 sm:text-base lg:text-lg">
							Lima menit dari sekarang, contoh tagihan pertamamu sudah masuk ke
							WhatsApp-mu sendiri.
						</p>
					</div>
					<div className="space-y-4.5">
						<div className="flex flex-wrap justify-center gap-3">
							<a
								href="#"
								className="w-full rounded-lg bg-white px-8 py-4 text-base font-extrabold text-teal-900 transition-colors hover:bg-teal-50 sm:w-auto sm:rounded-md"
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
