const planUpdates = [
	{
		plan: "Gratis",
		body: "Dashboard saja — cek kapan pun",
		badgeClass: "bg-warm-100 text-warm-600",
		bodyClass: "text-warm-600"
	},
	{
		plan: "Starter",
		body: "+ Ringkasan mingguan ke WhatsApp",
		badgeClass: "bg-teal-100 text-teal-700",
		bodyClass: "text-warm-700"
	},
	{
		plan: "Pro+",
		body: "+ Rinci per kamar & per properti",
		badgeClass: "bg-primary text-white",
		bodyClass: "text-warm-700"
	}
];

export function PeriodicUpdates() {
	return (
		<section>
			<div className="container flex flex-wrap items-center gap-x-14 gap-y-10 py-10 md:py-14 lg:py-18">
				<div className="min-w-0 flex-1 basis-95 space-y-5">
					<div className="space-y-2.5">
						<p className="text-primary text-xs font-bold tracking-widest uppercase">
							Update berkala
						</p>
						<h2 className="text-2xl font-extrabold tracking-tight text-teal-900">
							Laporan yang datang sendiri — sebelum kamu bertanya.
						</h2>
						<p className="text-warm-600 text-sm leading-relaxed md:text-base">
							Kamar yang sudah bayar, yang menunggak, dan kelak keluhan penyewa —
							selalu disertai tautan ke dashboard.
						</p>
					</div>
					<div className="flex flex-col gap-2.5">
						{planUpdates.map((item) => (
							<div key={item.plan} className="flex items-center gap-3">
								<span
									className={`w-19 flex-none rounded-full py-1 text-center text-[10px] font-extrabold tracking-wide uppercase ${item.badgeClass}`}
								>
									{item.plan}
								</span>
								<span className={`text-xs font-semibold ${item.bodyClass}`}>
									{item.body}
								</span>
							</div>
						))}
					</div>
				</div>

				{/* Vignette ringkasan WA */}
				<div className="relative max-w-110 min-w-0 flex-1 basis-85 pt-2.5 pb-6">
					<div className="bg-warning-bg border-warning/20 text-warning-fg shadow-warm-sm absolute -top-3.5 right-2 z-2 rotate-2 rounded-lg border px-3 py-1.5 text-xs font-extrabold">
						tanpa buka laptop 🙌
					</div>
					<div className="shadow-warm-lg -rotate-1 rounded-xl bg-[#ECE5DD] p-4.5">
						<div className="bg-card space-y-1.5 self-start rounded-[4px_14px_14px_14px] px-4 py-3.5 shadow-[0_1px_1px_rgba(0,0,0,0.08)]">
							<div className="text-xs font-bold text-black">
								Semang · ringkasan mingguan
							</div>
							<div className="text-xs leading-relaxed text-black">
								Kost Melati, minggu ini:
								<br />
								✅ 10 kamar lunas
								<br />
								⏳ 1 menunggu pembayaran
								<br />
								⚠️ 1 menunggak (Kamar 7)
								<br />
								<br />
								Lihat selengkapnya di sini:{" "}
								<span className="text-info font-semibold">semang.id/d/melati</span>
							</div>
						</div>
					</div>
					<div className="border-border bg-card shadow-warm-sm absolute bottom-0 left-3.5 -rotate-3 rounded-lg border px-3 py-1.5 text-xs font-bold text-teal-700">
						📬 datang tiap Senin pagi
					</div>
				</div>
			</div>
		</section>
	);
}
