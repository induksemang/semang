import { cn } from "@/lib/utils";
import { SectionHeading } from "../shared/section-heading";

function Pill({
	dot,
	className,
	children
}: {
	dot: string;
	className: string;
	children: React.ReactNode;
}) {
	return (
		<span
			className={cn(
				"inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-extrabold whitespace-nowrap",
				className
			)}
		>
			<span className={cn("size-2 rounded-full", dot)} />
			{children}
		</span>
	);
}

function Lunas() {
	return (
		<span className="bg-success shadow-success flex-none rounded-full px-5 py-2.5 text-sm font-extrabold whitespace-nowrap text-white">
			Lunas ✓
		</span>
	);
}

export function BillStatus() {
	return (
		<section className="bg-warm-canvas">
			<div className="container space-y-8 py-10 md:py-14 lg:space-y-10 lg:py-18">
				<SectionHeading
					align="left"
					eyebrow="Status tagihan"
					title="Tidak ada tagihan yang macet selamanya."
					description="Tiga cerita yang paling sering terjadi pada sebuah tagihan — semuanya berakhir di tempat yang sama."
				/>

				<div className="border-border bg-card overflow-hidden rounded-xl border">
					{/* Awal siklus */}
					<div className="bg-warm-50 flex flex-wrap items-center gap-2.5 px-5 py-4 sm:px-8 sm:py-4.5">
						<span className="text-warm-600 text-xs font-semibold">
							Setiap tagihan lahir sebagai
						</span>
						<div className="flex items-center gap-2.5">
							<Pill dot="bg-warm-300" className="text-warm-600 bg-white">
								Draf
							</Pill>
							<span className="text-warm-300 font-extrabold">→</span>
							<Pill dot="bg-primary" className="bg-teal-100 text-teal-700">
								Terkirim
							</Pill>
						</div>
						<span className="text-warm-600 text-xs font-semibold">
							— lalu mengikuti salah satu cerita di bawah:
						</span>
					</div>

					{/* Cerita 1: tepat waktu */}
					<div className="border-border flex flex-wrap items-center gap-3 border-t px-5 py-4.5 sm:gap-4 sm:px-8 sm:py-6">
						<div className="w-full sm:w-70 sm:flex-none">
							<div className="text-base font-extrabold text-teal-900">
								Penyewa bayar tepat waktu
							</div>
							<div className="text-warm-400 text-xs font-semibold">
								Cerita paling umum — kamu tidak melakukan apa-apa.
							</div>
						</div>
						<span className="hidden flex-1 border-t-2 border-teal-100 sm:block" />
						<Lunas />
					</div>

					{/* Cerita 2: mencicil */}
					<div className="border-border flex flex-wrap items-center gap-3 border-t px-5 py-4.5 sm:gap-4 sm:px-8 sm:py-6">
						<div className="w-full sm:w-70 sm:flex-none">
							<div className="text-base font-extrabold text-teal-900">
								Penyewa mencicil
							</div>
							<div className="text-warm-400 text-xs font-semibold">
								Sisa tagihan otomatis dapat link-nya sendiri.
							</div>
						</div>
						<Pill dot="bg-info" className="bg-info-bg text-info-fg">
							Sebagian
						</Pill>
						<span className="text-warm-300 font-extrabold sm:hidden">→</span>
						<span className="hidden flex-1 border-t-2 border-teal-100 sm:block" />
						<Lunas />
					</div>

					{/* Cerita 3: telat */}
					<div className="border-border flex flex-wrap items-center gap-3 border-t px-5 py-4.5 sm:gap-4 sm:px-8 sm:py-6">
						<div className="w-full sm:w-70 sm:flex-none">
							<div className="text-base font-extrabold text-teal-900">
								Penyewa telat — bahkan berbulan-bulan
							</div>
							<div className="text-warm-400 text-xs font-semibold">
								Reminder jalan terus; pembayaran tidak pernah ditolak.
							</div>
						</div>
						<Pill dot="bg-warning" className="bg-warning-bg text-warning-fg">
							Telat
						</Pill>
						<span className="text-warm-300 text-sm font-extrabold">→</span>
						<Pill dot="bg-danger" className="bg-danger-bg text-danger-fg">
							Menunggak
						</Pill>
						<span className="text-warm-300 font-extrabold sm:hidden">→</span>
						<span className="hidden min-w-30 flex-1 items-center gap-3 sm:flex">
							<span className="flex-1 border-t-2 border-dashed border-teal-200" />
							<span className="text-success-fg font-mono text-[10px] font-bold tracking-wide whitespace-nowrap">
								DITERIMA KAPAN PUN
							</span>
							<span className="flex-1 border-t-2 border-dashed border-teal-200" />
						</span>
						<Lunas />
						<span className="text-success-fg w-full font-mono text-[10px] font-bold tracking-wide sm:hidden">
							DITERIMA KAPAN PUN
						</span>
					</div>

					{/* Jalan buntu */}
					<div className="border-border bg-background flex flex-wrap items-center gap-3 border-t px-5 py-4 sm:px-8 sm:py-4.5">
						<span className="text-warm-600 text-xs font-bold">
							Satu-satunya jalan buntu:
						</span>
						<Pill dot="bg-warm-400" className="bg-warm-100 text-warm-700">
							Dibatalkan ✕
						</Pill>
						<span className="text-warm-400 text-xs font-semibold">
							— dan hanya kamu yang bisa memilihnya.
						</span>
						<span className="w-full text-xs font-bold text-teal-700 sm:ml-auto sm:w-auto">
							Begitu lunas, semua reminder tersisa otomatis berhenti.
						</span>
					</div>
				</div>
			</div>
		</section>
	);
}
