import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ArrowGlyph, LedgerSection } from "../shared/ledger";

const chips = [
	{ label: "Draf", chip: "bg-warm-50 text-warm-600", dot: "bg-[#a99e8b]" },
	{ label: "Terkirim", chip: "bg-teal-100 text-teal-700", dot: "bg-brand" },
	{ label: "Sebagian", chip: "bg-info-bg text-info-fg", dot: "bg-info" },
	{ label: "Lunas", chip: "bg-success-bg text-success-fg", dot: "bg-success" },
	{ label: "Telat", chip: "bg-warning-bg text-warning-fg", dot: "bg-warning" },
	{ label: "Menunggak", chip: "bg-danger-bg text-danger-fg", dot: "bg-danger" },
	{
		label: "Dibatalkan",
		chip: "bg-warm-50 text-muted-foreground line-through",
		dot: "bg-warm-300"
	}
];

const Arrow = () => <ArrowGlyph className="mx-1.25 size-3.25 align-[-1px] text-[#a99c88]" />;

const scenarios: { title: string; flow: ReactNode; note: string }[] = [
	{
		title: "SKENARIO 1",
		flow: (
			<>
				Penyewa bayar sebelum jatuh tempo
				<br />
				<span className="text-muted-foreground">Terkirim</span>
				<Arrow />
				<strong className="text-success-fg font-extrabold">Lunas</strong>
			</>
		),
		note: "Pengingat H+3 dan H+7 dibatalkan otomatis. Tidak ada pesan tak perlu yang bikin penyewa tersinggung."
	},
	{
		title: "SKENARIO 2",
		flow: (
			<>
				Bayar setengah, sisanya dua minggu lagi
				<br />
				<span className="text-muted-foreground">Terkirim</span>
				<Arrow />
				<span className="text-info-fg font-bold">Sebagian</span>
				<Arrow />
				<strong className="text-success-fg font-extrabold">Lunas</strong>
			</>
		),
		note: "Cicilan dicatat dari sisimu, nominalnya terkunci, dan sisanya punya link sendiri. Boleh dicicil lagi sampai sisanya nol."
	},
	{
		title: "SKENARIO 3",
		flow: (
			<>
				Telat lima minggu, lalu bayar penuh
				<br />
				<span className="text-warning-fg">Telat</span>
				<Arrow />
				<span className="text-danger-fg font-bold">Menunggak</span>
				<Arrow />
				<strong className="text-success-fg font-extrabold">Lunas</strong>
			</>
		),
		note: "Menunggak bukan jalan buntu. Link pembayarannya masih berlaku, dan pelunasannya tetap tercatat rapi di laporan."
	}
];

export function InvoiceStatus() {
	return (
		<LedgerSection
			index="04"
			label="Status"
			rhythm="section-sm"
			className="border-warm-200 bg-warm-25 border-t"
		>
			<h2 className="text-h2-sm mb-3.5 max-w-155 font-extrabold text-balance text-teal-900">
				Tidak ada tagihan yang macet selamanya
			</h2>
			<p className="text-warm-600 mb-6.5 max-w-160 text-base leading-relaxed">
				Pembayaran selalu diterima dan langsung melunaskan tagihan, kapan pun datangnya —
				bahkan setelah menunggak berbulan-bulan. Begitu lunas, pengingat yang masih
				terjadwal ikut dibatalkan.
			</p>

			<ul className="border-warm-200 flex flex-wrap gap-2.5 border-b pb-7">
				{chips.map((status) => (
					<li
						key={status.label}
						className={cn(
							"inline-flex items-center gap-1.75 rounded-[4px] px-3.5 py-1.75 text-xs font-bold",
							status.chip
						)}
					>
						<span className={cn("size-1.75 rounded-full", status.dot)} />
						{status.label}
					</li>
				))}
			</ul>

			<div className="grid lg:grid-cols-3">
				{scenarios.map((scenario) => (
					<div
						key={scenario.title}
						className="border-warm-200 pt-6 not-first:border-t max-lg:pb-6 max-lg:last:pb-0 lg:px-6 lg:not-first:border-t-0 lg:not-first:border-l lg:first:pl-0 lg:last:pr-0"
					>
						<p className="text-muted-foreground mb-3 font-mono text-[10.5px] leading-snug font-bold tracking-widest">
							{scenario.title}
						</p>
						<p className="text-warm-700 text-sm leading-relaxed">{scenario.flow}</p>
						<p className="text-muted-foreground mt-3 text-sm leading-relaxed">
							{scenario.note}
						</p>
					</div>
				))}
			</div>
		</LedgerSection>
	);
}
