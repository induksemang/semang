import { cn } from "@/lib/utils";
import { SectionHeading } from "../shared/section-heading";

const stages = [
	{
		num: "1",
		body: "Tagihan dibuat otomatis pada tanggal siklus.",
		className: "border-border bg-card"
	},
	{
		num: "2",
		body: "Terkirim otomatis via WhatsApp ke penyewa.",
		className: "border-teal-100 bg-teal-50"
	},
	{
		num: "3",
		body: "Penyewa bayar via link — dana langsung ke rekeningmu.",
		className: "border-teal-200/60 bg-teal-100/60"
	},
	{
		num: "4",
		body: "Terkonfirmasi otomatis, kuitansi terkirim, laporan ter-update.",
		className: "border-teal-200 bg-teal-100"
	},
	{
		num: "✓",
		body: "Reminder untuk yang belum lunas; batal otomatis begitu lunas.",
		className: "bg-primary border-teal-600",
		dark: true
	}
];

export function MonthlyCycle() {
	return (
		<section className="container space-y-8 py-10 md:space-y-10 md:py-14 lg:space-y-11 lg:py-18">
			<SectionHeading
				align="left"
				eyebrow="Siklus bulanan"
				title="Setelah setup, siklus berjalan sendiri setiap bulan."
				description="Tanpa pemilik menekan tombol apa pun, dari tagihan sampai laporan ter-update."
			/>

			<div className="flex flex-col items-stretch md:flex-row">
				{stages.map((stage, index) => (
					<div key={stage.num} className="contents">
						{index > 0 && (
							<div
								aria-hidden
								className="text-primary flex flex-none items-center justify-center px-2 py-1 text-xl font-extrabold md:px-1 lg:px-2"
							>
								<span className="rotate-90 md:rotate-0">→</span>
							</div>
						)}
						<div
							className={cn(
								"flex flex-1 items-start gap-3 rounded-md border px-4.5 py-4 md:block md:rounded-lg md:px-3.5 md:py-4.5 lg:px-5 lg:py-5.5",
								stage.className
							)}
						>
							<span
								className={cn(
									"flex size-6.5 flex-none items-center justify-center rounded-full text-xs font-extrabold text-white md:mb-2.5 md:size-7 lg:mb-3",
									stage.dark ? "bg-white/25" : "bg-teal-700"
								)}
							>
								{stage.num}
							</span>
							<p
								className={cn(
									"text-xs leading-relaxed font-semibold",
									stage.dark ? "text-white" : "text-warm-700"
								)}
							>
								{stage.body}
							</p>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
