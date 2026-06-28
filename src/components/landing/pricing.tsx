import { cn } from "@/lib/utils";
import { SectionHeading } from "./section-heading";

type Tier = {
	name: string;
	price: string;
	period: string;
	meta: string;
	features: string[];
	cta: string;
	featured?: boolean;
};

const tiers: Tier[] = [
	{
		name: "Gratis",
		price: "Rp0",
		period: "selamanya",
		meta: "≤5 kamar · 1 properti",
		features: [
			"Tagihan + bukti + konfirmasi",
			"Pengingat dasar",
			"Data bisa diunduh kapan saja"
		],
		cta: "Mulai gratis"
	},
	{
		name: "Starter",
		price: "Rp2.000",
		period: "/kamar/bln",
		meta: "min. Rp20.000 · ≤15 kamar",
		features: [
			"Semua fitur Gratis",
			"Pengingat bertahap + denda",
			"Meter listrik + laporan ekspor"
		],
		cta: "Pilih Starter"
	},
	{
		name: "Pro",
		price: "Rp3.500",
		period: "/kamar/bln",
		meta: "≤50 kamar · 3 properti",
		features: ["Semua fitur Starter", "Portal penghuni", "Tiket perbaikan + 2 staf"],
		cta: "Coba 2 siklus gratis",
		featured: true
	},
	{
		name: "Bisnis",
		price: "Rp5.000",
		period: "/kamar/bln",
		meta: "min. Rp250.000 · tak terbatas",
		features: ["Semua fitur Pro", "Laba-rugi per properti", "Staf & properti tak terbatas"],
		cta: "Hubungi kami"
	}
];

export function Pricing() {
	return (
		<section id="pricing" className="container scroll-mt-16 py-10 md:py-14 lg:py-18">
			<SectionHeading
				eyebrow="Harga adil per kamar"
				title="Mulai gratis, bayar saat tumbuh"
				description="Coba 2 bulan penuh semua fitur Pro, tanpa kartu kredit. Setelah masa coba habis, otomatis turun ke paket gratis — datamu tetap aman."
			/>
			<div className="mt-12 grid items-stretch gap-4.5 sm:grid-cols-2 lg:grid-cols-4">
				{tiers.map((tier) => (
					<PriceCard key={tier.name} tier={tier} />
				))}
			</div>
			<p className="text-warm-400 mt-6 text-center text-sm font-semibold">
				Tanpa biaya tambahan tiap transaksi · bayar tahunan diskon ±2 bulan
			</p>
		</section>
	);
}

function PriceCard({ tier }: { tier: Tier }) {
	const { featured } = tier;
	return (
		<div
			className={cn(
				"relative flex flex-col rounded-xl border p-7",
				featured
					? "border-teal-700 bg-teal-700 shadow-[0_16px_36px_rgba(39,87,79,0.28)]"
					: "border-border bg-card"
			)}
		>
			{featured && (
				<span className="absolute -top-2.75 left-7 rounded-full bg-teal-500 px-3 py-1.25 text-xs font-extrabold tracking-wide text-white uppercase">
					Paling pas
				</span>
			)}
			<div
				className={cn(
					"mb-2.5 text-sm font-bold",
					featured ? "text-teal-300" : "text-warm-500"
				)}
			>
				{tier.name}
			</div>
			<div className="mb-1.5 flex flex-wrap items-baseline gap-x-1.5 gap-y-1">
				<span
					className={cn(
						"text-[clamp(1.5625rem,2.4vw,2.125rem)] font-extrabold tracking-tight",
						featured ? "text-white" : "text-warm-900"
					)}
				>
					{tier.price}
				</span>
				<span
					className={cn(
						"text-sm font-semibold",
						featured ? "text-teal-200" : "text-warm-500"
					)}
				>
					{tier.period}
				</span>
			</div>
			<div
				className={cn(
					"mb-5 text-sm font-semibold",
					featured ? "text-teal-300" : "text-warm-500"
				)}
			>
				{tier.meta}
			</div>
			<ul className="mb-6 flex flex-1 flex-col gap-2.5">
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
								featured ? "text-teal-300" : "text-teal-500"
							)}
						>
							✓
						</span>
						{feature}
					</li>
				))}
			</ul>
			<a
				href="#try-it-for-free"
				className={cn(
					"rounded-md py-3.25 text-center text-base font-bold transition-colors",
					featured
						? "bg-white text-teal-700 hover:bg-teal-50"
						: "border-2 border-teal-200 bg-white text-teal-700 hover:bg-teal-50"
				)}
			>
				{tier.cta}
			</a>
		</div>
	);
}
