import { cn } from "@/lib/utils";
import { LedgerSection } from "../shared/ledger";

const plans = [
	{
		name: "Gratis",
		price: "Rp0",
		meta: "Keadaan akun yang sedang tidak berlangganan",
		items: [
			"Kamar dan properti tak terbatas",
			"Tagihan tetap dibuat lengkap dengan nominalnya",
			"Link pembayaran, kuitansi, laporan, ekspor"
		],
		caveat: "Pesannya kamu salin dan kirim sendiri"
	},
	{
		name: "Starter",
		price: "Rp2.000",
		meta: "per kamar terisi/bulan · minimum Rp20.000 · sampai 15 kamar",
		featured: true,
		lead: "Semua di Gratis, plus pengiriman otomatis",
		items: [
			"Tagihan dan pengingat berangkat sendiri via WhatsApp",
			"Ringkasan berkala ke nomormu",
			"1 properti"
		]
	},
	{
		name: "Pro",
		price: "Rp3.500",
		meta: "per kamar terisi/bulan · sampai 50 kamar",
		lead: "Semua di Starter, plus:",
		items: [
			"Hingga 3 properti",
			"Ringkasan berkala dengan rincian tiap kamar",
			"Tiket maintenance & portal penyewa (fase berikutnya)"
		]
	},
	{
		name: "Bisnis",
		price: "Rp5.000",
		meta: "per kamar terisi/bulan · minimum Rp250.000 · tanpa batas kamar",
		lead: "Semua di Pro, plus:",
		items: [
			"Kamar dan properti tak terbatas",
			"Ringkasan berkala terpisah per properti",
			"Staf dan peran tak terbatas, laba-rugi per properti"
		]
	}
];

export function Pricing() {
	return (
		<LedgerSection
			index="01"
			label="Paket"
			rhythm="section-sm"
			className="border-warm-200 bg-warm-25 border-t"
		>
			<div className="border-warm-200 grid border bg-white sm:grid-cols-2 lg:grid-cols-4">
				{plans.map((plan) => (
					<div
						key={plan.name}
						className={cn(
							"border-warm-200 p-[clamp(20px,2.4vw,28px)] not-first:border-t sm:even:border-l sm:nth-2:border-t-0 lg:not-first:border-l lg:nth-[n+3]:border-t-0",
							plan.featured && "bg-teal-900"
						)}
					>
						<div className="mb-3.5 flex h-5 items-center gap-2">
							<h3
								className={cn(
									"font-mono text-[10.5px] leading-snug font-bold tracking-widest uppercase",
									plan.featured ? "text-teal-350" : "text-muted-foreground"
								)}
							>
								{plan.name}
							</h3>
							{plan.featured && (
								<span className="bg-teal-350 px-1.75 py-0.75 font-mono text-[9.5px] leading-snug font-bold tracking-widest text-teal-900">
									PALING UMUM
								</span>
							)}
						</div>
						<p
							className={cn(
								"text-3xl font-extrabold tracking-tight tabular-nums",
								plan.featured ? "text-white" : "text-warm-900"
							)}
						>
							{plan.price}
						</p>
						<p
							className={cn(
								"mt-1.5 mb-4.5 min-h-9 text-xs leading-normal",
								plan.featured ? "text-teal-200" : "text-muted-foreground"
							)}
						>
							{plan.meta}
						</p>
						<ul
							className={cn(
								"flex flex-col gap-2.25 border-t pt-3.5 text-sm leading-normal",
								plan.featured
									? "border-teal-600 text-teal-100"
									: "border-warm-200 text-warm-700"
							)}
						>
							{plan.lead && (
								<li
									className={cn(
										"font-bold",
										plan.featured ? "text-white" : "text-warm-900"
									)}
								>
									{plan.lead}
								</li>
							)}
							{plan.items.map((item) => (
								<li key={item}>{item}</li>
							))}
							{plan.caveat && (
								<li className="text-danger-fg font-semibold">{plan.caveat}</li>
							)}
						</ul>
					</div>
				))}
			</div>

			{/* Jarak antar-kolom dipindah jadi padding di kedua sisi supaya garis
			    pemisahnya jatuh di tengah, dan jarak atas dipikul tiap kolom supaya
			    garis tegaknya mulai persis dari garis atas, bukan 20px di bawahnya. */}
			<div className="border-warm-200 mt-5 grid border-t lg:grid-cols-2">
				<p className="text-warm-600 py-5 text-sm leading-relaxed lg:pr-[clamp(20px,3vw,40px)] lg:pb-0">
					<strong className="text-warm-900 font-extrabold">
						Paket mengikuti ukuran kost, bukan dipilih sendiri.
					</strong>{" "}
					Kost 30 kamar masuk Pro, dan Starter bukan versi murahnya — Starter memang
					dirancang untuk kost rumahan. Kamar yang masih dibangun belum ikut dihitung
					dalam batas kamar, karena belum menghasilkan apa pun.
				</p>
				<p className="border-warm-200 text-warm-600 pt-3.5 text-sm leading-relaxed lg:border-l lg:pt-5 lg:pl-[clamp(20px,3vw,40px)]">
					<strong className="text-warm-900 font-extrabold">
						Jadwal pesan sama di semua paket.
					</strong>{" "}
					Yang naik seiring paket adalah cakupan properti dan kedalaman laporan, bukan
					jumlah pengingat. Penyewa yang telat sama saja telatnya di kost 5 kamar maupun
					50 kamar.
				</p>
			</div>
		</LedgerSection>
	);
}
