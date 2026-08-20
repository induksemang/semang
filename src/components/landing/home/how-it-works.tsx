import { cn } from "@/lib/utils";
import { ArrowLink, LedgerSection } from "../shared/ledger";

const steps = [
	{
		title: "Buat kost",
		body: "Nama kost, jumlah kamar, harga sewa. Tiga isian, lalu tagihan pertamamu langsung tampil."
	},
	{
		title: "Sebar link per kamar",
		body: "Penyewa mengisi nama dan nomornya sendiri dari browser. Kamu tidak perlu mengetik data siapa pun."
	},
	{
		title: "Tagihan berangkat",
		body: "Tiga hari sebelum jatuh tempo, tiap penyewa menerima tagihannya lengkap dengan nominal pasti."
	},
	{
		title: "Pelunasan tercatat",
		body: "Uang masuk ke rekeningmu, kuitansi terbit, pengingat yang belum jalan dibatalkan sendiri."
	}
];

export function HowItWorks() {
	return (
		<LedgerSection
			index="02"
			label="Alur"
			tone="teal"
			className="border-t border-teal-200 bg-teal-50"
		>
			<h2 className="text-h2 mb-10 max-w-155 font-extrabold text-balance text-teal-900">
				Empat langkah di awal, lalu berjalan sendiri tiap bulan
			</h2>

			<ol className="relative grid lg:grid-cols-4">
				<span
					aria-hidden
					className="absolute inset-x-0 top-1.5 hidden h-px bg-teal-200 lg:block"
				/>
				{steps.map((step, index) => {
					const last = index === steps.length - 1;
					return (
						<li
							key={step.title}
							className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 lg:relative lg:block lg:pt-7 lg:pr-[clamp(14px,2vw,24px)] lg:pb-7.5 lg:last:pr-0"
						>
							<div className="flex flex-col items-center lg:contents">
								<span
									aria-hidden
									className={cn(
										"size-3.25 shrink-0 rounded-full ring-4 ring-teal-50 lg:absolute lg:top-0 lg:left-0",
										last ? "lg:bg-brand bg-teal-900" : "bg-brand"
									)}
								/>
								{!last && (
									<span
										aria-hidden
										className="my-1 w-px flex-1 bg-teal-200 lg:hidden"
									/>
								)}
							</div>
							<div className={last ? undefined : "pb-5.5"}>
								<p className="mb-2 font-mono text-[10.5px] leading-snug font-bold tracking-widest text-teal-400">
									LANGKAH {index + 1}
								</p>
								<h3 className="mb-2 text-base font-extrabold text-teal-900">
									{step.title}
								</h3>
								<p className="text-sm leading-relaxed text-teal-700">{step.body}</p>
							</div>
						</li>
					);
				})}
			</ol>

			<ArrowLink href="/cara-kerja" className="mt-6 lg:mt-0">
				Lihat siklus bulanannya
			</ArrowLink>
		</LedgerSection>
	);
}
