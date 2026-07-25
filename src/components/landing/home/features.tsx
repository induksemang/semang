import Link from "next/link";
import { SectionHeading } from "../shared/section-heading";

const calendarDays = Array.from({ length: 21 }, (_, i) => i + 1);
const dueDays = [9, 17];

const ratePlans = ["Bulanan · Rp1.500.000", "Mingguan · Rp425.000", "Harian · Rp85.000"];

const roomTypes = [
	{ label: "Standar", price: "1,2jt", highlight: false },
	{ label: "KM dalam", price: "1,5jt", highlight: false },
	{ label: "AC + KM dalam", price: "1,9jt", highlight: true }
];

export function Features() {
	return (
		<section id="fitur" className="bg-warm-canvas scroll-mt-16 py-10 md:py-14 lg:py-18">
			<div className="container space-y-10 lg:space-y-12">
				<SectionHeading
					align="left"
					eyebrow="Penagihan yang mengikuti caramu"
					title="Aturan kost-mu, bukan aturan aplikasi."
				/>

				<div className="grid grid-cols-1 gap-5 md:grid-cols-12">
					{/* Jatuh tempo fleksibel + mini calendar */}
					<article className="bg-card border-border flex flex-col gap-4 rounded-xl border p-5 md:col-span-6 md:p-6 lg:col-span-7 lg:flex-row lg:items-center lg:gap-7 lg:p-7.5">
						<div className="min-w-0 space-y-2 lg:flex-1">
							<h3 className="text-xl font-extrabold tracking-tight text-teal-900">
								Jatuh tempo fleksibel
							</h3>
							<p className="text-warm-600 text-sm leading-relaxed">
								Ikuti tanggal masuk tiap penyewa, atau satu tanggal tetap untuk
								semua — ganti mode kapan saja.
							</p>
						</div>
						<div className="bg-warm-canvas border-border mt-auto w-full flex-none space-y-2.5 rounded-xl border px-4 py-3.5 lg:mt-0 lg:w-54">
							<div className="text-warm-500 font-mono text-xs font-bold tracking-widest">
								JULI 2026
							</div>
							<div className="text-warm-500 grid grid-cols-7 gap-1 text-center text-xs font-semibold">
								{calendarDays.map((day) => (
									<span
										key={day}
										className={
											day === 1
												? "bg-primary inline-flex size-6 items-center justify-center rounded-full font-extrabold text-white"
												: dueDays.includes(day)
													? "border-primary inline-flex size-6 items-center justify-center rounded-full border-2 font-extrabold text-teal-700"
													: "inline-flex size-6 items-center justify-center"
										}
									>
										{day}
									</span>
								))}
							</div>
						</div>
					</article>

					{/* Bulanan, mingguan, harian */}
					<article className="flex flex-col gap-3.5 rounded-xl border border-teal-100 bg-teal-50 p-5 md:col-span-6 md:p-6 lg:col-span-5 lg:p-7.5">
						<h3 className="text-xl font-extrabold tracking-tight text-teal-900">
							Bulanan, mingguan, harian
						</h3>
						<p className="text-sm leading-relaxed text-teal-700">
							Penyewa sementara? Harga turunan otomatis, bisa kamu ubah sendiri.
						</p>
						<div className="mt-auto flex flex-wrap gap-2">
							{ratePlans.map((plan) => (
								<span
									key={plan}
									className="rounded-full border border-teal-200 bg-white px-3.5 py-1.5 text-xs font-bold text-teal-900"
								>
									{plan}
								</span>
							))}
						</div>
					</article>

					{/* Cicilan & bayar di muka */}
					<article className="bg-card border-border flex flex-col gap-3.5 rounded-xl border p-5 md:col-span-6 md:p-6 lg:col-span-5 lg:p-7.5">
						<h3 className="text-xl font-extrabold tracking-tight text-teal-900">
							Cicilan &amp; bayar di muka
						</h3>
						<p className="text-warm-600 text-sm leading-relaxed">
							Kamu tetapkan besarannya, penyewa dapat link bayar dengan jumlah yang
							sudah pasti.
						</p>
						<div className="mt-auto space-y-2">
							<div className="flex h-3.5 overflow-hidden rounded-full border border-teal-100">
								<span className="bg-primary w-1/2" />
								<span className="w-1/2 bg-teal-50" />
							</div>
							<div className="text-warm-500 flex justify-between font-mono text-xs font-bold">
								<span className="text-teal-700">Rp750.000 DIBAYAR</span>
								<span>Rp750.000 SISA</span>
							</div>
						</div>
					</article>

					{/* Tipe kamar & harga bertingkat */}
					<article className="flex flex-col gap-4 rounded-xl border border-teal-600 bg-teal-900 p-5 md:col-span-6 md:p-6 lg:col-span-7 lg:flex-row lg:items-center lg:gap-7 lg:p-7.5">
						<div className="min-w-0 space-y-2 lg:flex-1">
							<h3 className="text-xl font-extrabold tracking-tight text-white">
								Tipe kamar &amp; harga bertingkat
							</h3>
							<p className="text-sm leading-relaxed text-teal-200">
								Kamar AC, kamar mandi dalam, lantai atas — harga berbeda per tipe,
								diatur sekali.
							</p>
						</div>
						<div className="mt-auto flex w-full flex-none flex-col gap-2 lg:mt-0 lg:w-58">
							{roomTypes.map((room) => (
								<div
									key={room.label}
									className={
										room.highlight
											? "border-primary flex items-center justify-between rounded-lg border bg-teal-600 px-3.5 py-2.5"
											: "flex items-center justify-between rounded-lg border border-teal-600 bg-teal-800 px-3.5 py-2.5"
									}
								>
									<span className="text-sm font-bold text-white">
										{room.label}
									</span>
									<span
										className={
											room.highlight
												? "font-mono text-xs font-bold text-teal-100"
												: "font-mono text-xs font-bold text-teal-300"
										}
									>
										{room.price}
									</span>
								</div>
							))}
						</div>
					</article>
				</div>

				<Link
					href="/fitur"
					className="text-primary inline-flex items-center gap-1.5 text-sm font-bold transition-colors hover:text-teal-600"
				>
					Lihat semua fitur &amp; logika penagihan →
				</Link>
			</div>
		</section>
	);
}
