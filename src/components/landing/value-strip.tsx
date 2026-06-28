const stats = [
	{ value: "2 menit", label: "kirim 10 tagihan sekaligus" },
	{ value: "<10 menit", label: "dari daftar sampai siap pakai" },
	{ value: "Rp0", label: "biaya kirim tiap tagihan" },
	{ value: "100%", label: "uang masuk ke rekeningmu" }
];

export function ValueStrip() {
	return (
		<section className="border-border bg-warm-50 border-y">
			<div className="container grid grid-cols-2 gap-6 py-7.5 lg:grid-cols-4">
				{stats.map((stat, i) => (
					<div
						key={stat.value}
						className={
							i > 0 ? "lg:border-border text-center lg:border-l" : "text-center"
						}
					>
						<div className="text-3xl font-extrabold tracking-tight text-teal-900">
							{stat.value}
						</div>
						<div className="text-warm-500 mt-1 text-sm font-semibold">{stat.label}</div>
					</div>
				))}
			</div>
		</section>
	);
}
