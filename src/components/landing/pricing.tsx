import { cn } from "@/lib/utils";
import { SectionHeading } from "./section-heading";

type Tier = {
	name: string;
	sub: string;
	price: string;
	unit: string;
	meta: string;
	features: string[];
	cta: string;
	featured?: boolean;
};

const tiers: Tier[] = [
	{
		name: "Gratis",
		sub: "Kost kecil/rumahan",
		price: "Rp0",
		unit: "selamanya",
		meta: "sampai 5 kamar · 1 properti",
		features: [
			"Tagihan otomatis via WhatsApp",
			"Pembayaran online + kuitansi digital",
			"Reminder dasar (hari-H)",
			"Laporan kas ringkas"
		],
		cta: "Mulai gratis"
	},
	{
		name: "Starter",
		sub: "Kost yang mulai berkembang",
		price: "Rp2.000",
		unit: "per kamar terisi, per bulan",
		meta: "sampai 15 kamar · minimum Rp20.000 per bulan",
		features: [
			"Semua di Gratis, plus:",
			"Reminder bertingkat penuh (H-3 s.d. H+7)",
			"Tipe kamar dengan harga berbeda",
			"Ringkasan mingguan ke WA-mu",
			"Ekspor CSV / Excel"
		],
		cta: "Coba 60 hari gratis",
		featured: true
	},
	{
		name: "Pro",
		sub: "Kost menengah–eksklusif",
		price: "Rp3.500",
		unit: "per kamar terisi, per bulan",
		meta: "sampai 50 kamar · 3 properti",
		features: [
			"Semua di Starter, plus:",
			"Ringkasan lebih sering & per kamar",
			"2 akun penjaga kost (peran terbatas)",
			"Laporan keuangan lengkap"
		],
		cta: "Coba 60 hari gratis"
	},
	{
		name: "Bisnis",
		sub: "Multi-properti/operator",
		price: "Rp5.000",
		unit: "per kamar terisi, per bulan",
		meta: "kamar tak terbatas · minimum Rp250.000 per bulan",
		features: [
			"Semua di Pro, plus:",
			"Kamar, properti & staf tak terbatas",
			"Laporan laba-rugi per properti",
			"Dukungan prioritas"
		],
		cta: "Hubungi kami"
	}
];

export function Pricing() {
	return (
		<section
			id="harga"
			className="container scroll-mt-16 space-y-8 py-10 md:py-14 lg:space-y-12 lg:py-18"
		>
			<SectionHeading
				eyebrow="Harga"
				title="Bayar hanya untuk kamar yang terisi."
				description="Kamar kosong tidak ditagih. Semua paket termasuk pembayaran online tanpa markup biaya ke penyewa. Coba semua fitur Pro gratis 60 hari — tanpa kartu kredit."
			/>
			<div className="space-y-6">
				<div className="grid items-stretch gap-4.5 sm:grid-cols-2 lg:grid-cols-4">
					{tiers.map((tier) => (
						<PriceCard key={tier.name} tier={tier} />
					))}
				</div>
				<p className="text-warm-400 text-center text-sm leading-relaxed font-medium">
					Setelah trial berakhir, akunmu otomatis pindah ke paket Gratis — semua data
					tetap utuh. Bayar tahunan hemat ±2 bulan.
				</p>
			</div>
		</section>
	);
}

function PriceCard({ tier }: { tier: Tier }) {
	const { featured } = tier;
	return (
		<div
			className={cn(
				"relative flex flex-col gap-6 rounded-xl border p-7",
				featured
					? "border-teal-700 bg-teal-700 shadow-[0_16px_36px_rgba(39,87,79,0.28)]"
					: "border-border bg-card shadow-warm-sm"
			)}
		>
			{featured && (
				<span className="bg-primary absolute -top-2.75 left-7 rounded-full px-3 py-1.25 text-xs font-extrabold tracking-wide text-white uppercase">
					Paling pas
				</span>
			)}
			<div className="flex flex-1 flex-col gap-5">
				<div className="flex flex-col gap-4.5">
					<div className="flex flex-col gap-1">
						<h3
							className={cn(
								"text-lg font-extrabold",
								featured ? "text-white" : "text-warm-900"
							)}
						>
							{tier.name}
						</h3>
						<p
							className={cn(
								"text-sm font-semibold",
								featured ? "text-teal-300" : "text-warm-400"
							)}
						>
							{tier.sub}
						</p>
					</div>
					<div className="flex flex-col gap-2.5">
						<div className="flex flex-col gap-0.5">
							<div
								className={cn(
									"text-[clamp(1.5625rem,2.4vw,2.125rem)] font-extrabold tracking-tight",
									featured ? "text-white" : "text-warm-900"
								)}
							>
								{tier.price}
							</div>
							<p
								className={cn(
									"text-sm font-semibold",
									featured ? "text-teal-200" : "text-warm-400"
								)}
							>
								{tier.unit}
							</p>
						</div>
						<p
							className={cn(
								"text-sm font-semibold",
								featured ? "text-teal-300" : "text-warm-400"
							)}
						>
							{tier.meta}
						</p>
					</div>
				</div>
				<ul className="flex flex-col gap-2.5">
					{tier.features.map((feature) => (
						<li
							key={feature}
							className={cn(
								"flex gap-2.25 text-sm",
								featured ? "text-teal-100" : "text-warm-700"
							)}
						>
							<span
								className={cn(
									"font-extrabold",
									featured ? "text-teal-300" : "text-success"
								)}
							>
								✓
							</span>
							{feature}
						</li>
					))}
				</ul>
			</div>
			<a
				href="#daftar"
				className={cn(
					"rounded-md py-3.25 text-center text-base font-bold transition-colors",
					featured
						? "bg-white text-teal-900 hover:bg-teal-50"
						: "border-2 border-teal-200 bg-white text-teal-700 hover:bg-teal-50"
				)}
			>
				{tier.cta}
			</a>
		</div>
	);
}
