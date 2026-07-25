import { cn } from "@/lib/utils";

const plans = ["Gratis", "Starter", "Pro", "Bisnis"];
const featuredPlan = "Starter";

const rows: [string, string, string, string, string][] = [
	["Batas kamar", "≤5", "≤15", "≤50", "Tak terbatas"],
	["Properti", "1", "1", "3", "Tak terbatas"],
	["Reminder WhatsApp", "Hari-H saja", "H-3 s.d. H+7", "H-3 s.d. H+7", "H-3 s.d. H+7"],
	["Tipe kamar (harga berbeda)", "—", "✓", "✓", "✓"],
	[
		"Update berkala ke WA",
		"Dashboard saja",
		"Mingguan",
		"Lebih sering + per kamar",
		"Per properti"
	],
	["Ekspor CSV/Excel", "—", "✓", "✓", "✓"],
	["Akun staf/penjaga kost", "—", "—", "2 akun", "Tak terbatas"],
	["Laporan keuangan", "Ringkas", "+ ekspor", "Lengkap", "Laba-rugi per properti"],
	["Tandai lunas manual (untuk bayar tunai)", "✓", "✓", "✓", "✓"]
];

function Cell({ value, featured }: { value: string; featured: boolean }) {
	return (
		<td
			className={cn(
				"px-4 py-3.5 text-center text-sm",
				featured && "bg-teal-50",
				value === "✓"
					? "text-success font-extrabold"
					: value === "—"
						? "text-warm-300"
						: featured
							? "text-teal-700"
							: "text-warm-600"
			)}
		>
			{value}
		</td>
	);
}

export function Comparison() {
	return (
		<section className="bg-warm-canvas">
			<div className="container space-y-4 py-10 md:py-14 lg:py-18">
				<div className="space-y-1.5">
					<h2 className="text-xl font-extrabold tracking-tight text-teal-900 sm:text-2xl">
						Perbandingan lengkap antar paket
					</h2>
					<p className="text-warm-400 text-xs font-semibold md:hidden">
						Geser tabel ke samping untuk melihat semua paket →
					</p>
				</div>
				<div className="-mx-6 overflow-x-auto px-6">
					<table className="w-full min-w-160 border-collapse">
						<thead>
							<tr className="border-border border-b-2">
								<th className="text-warm-400 px-4 pt-3 pb-3.5 text-left text-xs font-bold tracking-wide uppercase">
									Fitur
								</th>
								{plans.map((plan) => (
									<th
										key={plan}
										className={cn(
											"px-4 pt-3 pb-3.5 text-center text-sm font-extrabold",
											plan === featuredPlan
												? "rounded-t-lg bg-teal-50 text-teal-700"
												: "text-warm-900"
										)}
									>
										{plan}
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{rows.map(([feature, ...values], rowIndex) => (
								<tr
									key={feature}
									className={
										rowIndex < rows.length - 1
											? "border-warm-50 border-b"
											: undefined
									}
								>
									<td className="text-warm-700 px-4 py-3.5 text-sm font-semibold">
										{feature}
									</td>
									{values.map((value, colIndex) => (
										<Cell
											key={plans[colIndex]}
											value={value}
											featured={plans[colIndex] === featuredPlan}
										/>
									))}
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</section>
	);
}
