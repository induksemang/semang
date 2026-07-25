import { cn } from "@/lib/utils";
import { SectionHeading } from "../shared/section-heading";

const days = Array.from({ length: 21 }, (_, i) => i + 1);

const perTenantDays: Record<number, string> = {
	3: "bg-primary font-extrabold text-white",
	11: "bg-warning font-extrabold text-white",
	19: "bg-info font-extrabold text-white"
};

const firstInvoiceOptions = [
	{
		label: "Cara 1",
		badge: "Default cerdas",
		title: "Bayar sisa bulan saja",
		body: "Ditagih sesuai jumlah hari yang dipakai; bulan berikutnya baru penuh.",
		featured: true
	},
	{
		label: "Cara 2",
		title: "Digabung ke bulan depan",
		body: "Sisa hari bulan ini digabung jadi satu tagihan dengan bulan penuh berikutnya."
	},
	{
		label: "Cara 3",
		title: "Penuh bulan ini",
		body: "Ditagih satu bulan penuh meski masuk di tengah bulan."
	}
];

const rentalUnits = [
	{
		unit: "UNIT · BULANAN",
		price: "Rp1.500.000",
		formula: "= harga penuh yang kamu pasang",
		reminders: [
			{ label: "H-3", late: false },
			{ label: "H", late: false },
			{ label: "H+3", late: true },
			{ label: "H+7", late: true }
		],
		className: "-rotate-1"
	},
	{
		unit: "UNIT · MINGGUAN",
		price: "Rp350.000",
		formula: "= harga harian × 7",
		reminders: [
			{ label: "H", late: false },
			{ label: "H+2", late: true }
		],
		className: "rotate-1 md:translate-y-5"
	},
	{
		unit: "UNIT · HARIAN",
		price: "Rp50.000",
		formula: "= bulanan ÷ 30, dibulatkan ke ribuan",
		reminders: [{ label: "H saja", late: false }],
		className: "-rotate-1 md:translate-y-2"
	}
];

const advancedBilling = [
	{
		title: "Bayar di muka multi-periode",
		body: "Penyewa bisa bayar beberapa bulan atau setahun sekaligus, dengan diskon yang kamu tentukan sendiri. Diskonnya tercatat terpisah supaya jelas, dan kalau penyewa keluar lebih awal, sisa bulannya sudah terhitung otomatis."
	},
	{
		title: "Cicilan disetujui pemilik",
		body: "Sepakat dicicil? Kamu tentukan besarannya (mis. Rp750.000 sekarang, sisanya nanti) — tiap bagian dapat link bayarnya sendiri dengan jumlah yang sudah pasti, sampai lunas."
	}
];

function Calendar({
	specialDays,
	legend,
	light,
	mobileDays = 21
}: {
	specialDays: Record<number, string>;
	legend: React.ReactNode;
	light?: boolean;
	mobileDays?: number;
}) {
	return (
		<div
			className={cn(
				"w-full flex-none rounded-lg border p-3.5 sm:w-48",
				light ? "border-teal-100 bg-white" : "border-border bg-background"
			)}
		>
			<div className="text-warm-400 mb-2.5 font-mono text-[10px] font-bold tracking-wider">
				TIAP BULAN
			</div>
			<div className="text-warm-400 grid grid-cols-7 gap-1 text-center text-[10px] font-semibold">
				{days.map((day) => (
					<span
						key={day}
						className={cn(
							"inline-flex size-5.5 items-center justify-center rounded-full",
							day > mobileDays && "hidden sm:inline-flex",
							specialDays[day]
						)}
					>
						{day}
					</span>
				))}
			</div>
			<div className="mt-2.5 flex flex-wrap gap-x-2.5 gap-y-1 text-[10px] font-bold">
				{legend}
			</div>
		</div>
	);
}

export function AutoInvoicing() {
	return (
		<section className="container space-y-8 py-10 md:py-14 lg:py-18">
			<SectionHeading
				align="left"
				eyebrow="Tagihan otomatis"
				title="Seluruh aturan penagihan, sudah dipikirkan."
			/>

			{/* Dua cara jatuh tempo */}
			<div className="space-y-5">
				<div className="space-y-1.5">
					<h3 className="text-lg font-bold text-teal-900">
						Dua cara menentukan jatuh tempo
					</h3>
					<p className="text-warm-600 max-w-170 text-sm leading-relaxed">
						Ganti cara kapan saja — hanya berlaku untuk tagihan yang belum dibuat.
						Tanggal 29/30/31 yang tidak ada di suatu bulan otomatis dipindah ke hari
						terakhir bulan itu.
					</p>
				</div>
				<div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
					<div className="flex flex-col gap-4 rounded-md border border-teal-200 bg-teal-50 p-5 sm:flex-row lg:gap-6 lg:rounded-xl lg:p-7">
						<div className="min-w-0 flex-1 space-y-2 lg:space-y-3">
							<div className="flex items-center gap-2.5">
								<h4 className="text-base font-extrabold text-teal-900 lg:text-lg">
									Dari tanggal masuk
								</h4>
								<span className="bg-primary rounded-full px-2 py-0.5 text-[10px] font-extrabold tracking-wide text-white uppercase">
									Default
								</span>
							</div>
							<p className="text-warm-700 text-sm leading-relaxed">
								Tiap penyewa punya tanggalnya sendiri, mengikuti kapan ia masuk.
								Bulan pertama selalu pas satu bulan penuh — tanpa hitung-hitungan
								sisa hari.
							</p>
						</div>
						<Calendar
							light
							specialDays={perTenantDays}
							legend={
								<>
									<span className="text-teal-700">● Rara · 3</span>
									<span className="text-warning-fg">● Dedi · 11</span>
									<span className="text-info-fg">● Sinta · 19</span>
								</>
							}
						/>
					</div>
					<div className="border-border bg-card flex flex-col gap-4 rounded-md border p-5 sm:flex-row lg:gap-6 lg:rounded-xl lg:p-7">
						<div className="min-w-0 flex-1 space-y-2 lg:space-y-3">
							<h4 className="text-base font-extrabold text-teal-900 lg:text-lg">
								Tanggal tetap
							</h4>
							<p className="text-warm-700 text-sm leading-relaxed">
								Satu tanggal sama untuk semua penyewa — mis. tanggal 1. Untuk yang
								masuk di tengah bulan, tagihan pertamanya diatur khusus — lihat di
								bawah.
							</p>
						</div>
						<Calendar
							mobileDays={14}
							specialDays={{
								1: "bg-teal-900 font-extrabold text-white ring-2 ring-teal-100"
							}}
							legend={
								<span className="text-teal-700">● Semua penyewa · tanggal 1</span>
							}
						/>
					</div>
				</div>
			</div>

			{/* Tagihan pertama */}
			<div className="space-y-5">
				<div className="space-y-1.5">
					<h3 className="text-lg font-bold text-teal-900">
						Tagihan pertama untuk yang masuk di tengah bulan
					</h3>
					<p className="text-warm-600 max-w-170 text-sm leading-relaxed">
						Bukan pilihan yang harus kamu pikirkan — sistem memilihkan cara terbaik dari
						tanggal masuk, dan kamu bisa mengubahnya kapan saja.
					</p>
				</div>
				<div className="grid auto-rows-fr gap-4 sm:grid-cols-2 md:grid-cols-3">
					{firstInvoiceOptions.map((option) => (
						<div
							key={option.label}
							className={cn(
								"space-y-1.5 rounded-md border p-4.5 lg:rounded-lg lg:p-5.5",
								option.featured
									? "border-teal-200 bg-teal-50"
									: "border-border bg-card"
							)}
						>
							<div className="flex min-h-5 items-center gap-2">
								<span
									className={cn(
										"font-mono text-[10px] font-bold tracking-wider uppercase",
										option.featured ? "text-primary" : "text-warm-400"
									)}
								>
									{option.label}
								</span>
								{option.badge && (
									<span className="bg-primary rounded-full px-2 py-0.5 text-[9px] font-extrabold tracking-wide text-white uppercase">
										{option.badge}
									</span>
								)}
							</div>
							<h4 className="text-warm-900 text-sm font-extrabold">{option.title}</h4>
							<p
								className={cn(
									"text-xs leading-relaxed",
									option.featured ? "text-teal-700" : "text-warm-600"
								)}
							>
								{option.body}
							</p>
						</div>
					))}
				</div>
			</div>

			{/* Unit sewa fleksibel */}
			<div className="space-y-7">
				<div className="space-y-1.5">
					<h3 className="text-lg font-bold text-teal-900">Unit sewa fleksibel</h3>
					<p className="text-warm-600 max-w-170 text-sm leading-relaxed">
						Untuk penyewa sementara — harga mingguan &amp; harian dihitung otomatis dari
						harga bulananmu, dan pengingatnya ikut menyesuaikan supaya tidak
						bertubi-tubi untuk sewa pendek.
					</p>
				</div>
				<div className="flex flex-col gap-4 md:flex-row md:gap-6 lg:gap-9">
					{rentalUnits.map((unit) => (
						<div
							key={unit.unit}
							className={cn(
								"bg-card shadow-warm-lg flex-1 rounded-md px-5 py-5.5 lg:rounded-lg lg:p-7",
								unit.className
							)}
						>
							<div className="text-warm-400 mb-4.5 text-right font-mono text-xs font-bold tracking-widest">
								{unit.unit}
							</div>
							<div className="text-2xl font-extrabold tracking-tight text-teal-900">
								{unit.price}
							</div>
							<div className="text-primary mt-1 mb-5 font-mono text-xs font-bold">
								{unit.formula}
							</div>
							<div className="border-warm-200 space-y-2 border-t border-dashed pt-3.5">
								<div className="text-warm-400 font-mono text-[10px] font-bold tracking-wider">
									REMINDER
								</div>
								<div className="flex flex-wrap gap-1.5">
									{unit.reminders.map((reminder) => (
										<span
											key={reminder.label}
											className={cn(
												"rounded-md px-2.5 py-1 text-xs font-extrabold",
												reminder.late
													? "bg-warning-bg text-warning-fg"
													: "bg-teal-50 text-teal-700"
											)}
										>
											{reminder.label}
										</span>
									))}
								</div>
							</div>
						</div>
					))}
				</div>
				<p className="text-warm-400 text-xs font-semibold md:pt-4">
					Tidak cocok dengan hitungannya? Semua harga bisa kamu ubah sendiri per kamar.
				</p>
			</div>

			{/* Multi-periode & cicilan */}
			<div className="grid gap-5 md:grid-cols-2">
				{advancedBilling.map((item) => (
					<div
						key={item.title}
						className="border-border bg-card space-y-2 rounded-md border p-5 lg:space-y-2.5 lg:rounded-lg lg:p-6.5"
					>
						<h4 className="text-base font-bold text-teal-900">{item.title}</h4>
						<p className="text-warm-600 text-sm leading-relaxed">{item.body}</p>
					</div>
				))}
			</div>
		</section>
	);
}
