import type { ReactNode } from "react";
import { LedgerSection } from "../shared/ledger";

const units: { unit: string; price: string; basis: string; messages: ReactNode }[] = [
	{
		unit: "Bulanan",
		price: "Rp1.500.000",
		basis: "harga yang kamu tetapkan",
		messages: (
			<>
				Tagihan H-3, lalu pengingat H+3 dan H+7 —{" "}
				<strong className="font-bold">paling banyak 3 pesan</strong>
			</>
		)
	},
	{
		unit: "Mingguan",
		price: "Rp350.000",
		basis: "harga harian × 7",
		messages: "Tagihan H-1, lalu pengingat H+2 — paling banyak 2 pesan"
	},
	{
		unit: "Harian",
		price: "Rp50.000",
		basis: "harga bulanan ÷ 30, dibulatkan ke ribuan",
		messages: "Tagihan pada hari-H saja, tanpa pengingat susulan"
	}
];

const head =
	"border-b border-warm-200 pb-2.5 font-mono text-[10.5px] leading-snug font-bold tracking-widest text-muted-foreground uppercase";
const cell = "border-t border-warm-100 py-4 group-last:border-b group-last:border-b-warm-200";
const label =
	"font-mono text-[9.5px] leading-relaxed font-bold tracking-widest text-muted-foreground uppercase";

export function RentUnit() {
	return (
		<LedgerSection
			index="03"
			label="Unit sewa"
			rhythm="section-sm"
			className="bg-warm-canvas border-t border-teal-200"
		>
			<h2 className="text-h2-sm mb-3.5 max-w-155 font-extrabold text-balance text-teal-900">
				Bulanan, mingguan, atau harian — beserta jadwal menagihnya
			</h2>
			<p className="text-warm-600 mb-7.5 max-w-160 text-base leading-relaxed">
				Perantau yang menyewa seminggu tidak bisa diperlakukan seperti penyewa bulanan.
				Harga turunan dihitung dari harga bulanan, dan kamu boleh menimpanya — kost harian
				biasanya memang mematok tarif sendiri.
			</p>

			<dl className="border-warm-200 border-b lg:hidden">
				{units.map((row) => (
					<div key={row.unit} className="border-warm-200 border-t py-4.5">
						<div className="mb-2.5 flex items-baseline justify-between gap-3">
							<dt className="text-warm-900 text-[17px] font-extrabold">{row.unit}</dt>
							<dd className="text-warm-900 text-[17px] font-extrabold whitespace-nowrap tabular-nums">
								{row.price}
							</dd>
						</div>
						<div className="grid grid-cols-[minmax(0,0.8fr)_minmax(0,1.6fr)] gap-x-3 gap-y-2 text-[13.5px] leading-snug">
							<dt className={label}>Dihitung dari</dt>
							<dd className="text-warm-600">{row.basis}</dd>
							<dt className={label}>Pesan</dt>
							<dd className="text-warm-700">{row.messages}</dd>
						</div>
					</div>
				))}
			</dl>

			<div className="mb-2 hidden lg:block">
				<table className="w-full border-collapse text-left">
					<thead>
						<tr>
							<th className={`${head} pr-4`}>Unit</th>
							<th className={`${head} px-4 text-right`}>Contoh harga</th>
							<th className={`${head} px-4`}>Dihitung dari</th>
							<th className={`${head} pl-4`}>Pesan yang terkirim</th>
						</tr>
					</thead>
					<tbody>
						{units.map((row) => (
							<tr key={row.unit} className="group">
								<th
									scope="row"
									className={`${cell} text-warm-900 pr-4 text-left text-base font-extrabold`}
								>
									{row.unit}
								</th>
								<td
									className={`${cell} text-warm-900 px-4 text-right text-base font-bold whitespace-nowrap tabular-nums`}
								>
									{row.price}
								</td>
								<td className={`${cell} text-warm-600 px-4 text-sm`}>
									{row.basis}
								</td>
								<td className={`${cell} text-warm-700 pl-4 text-sm`}>
									{row.messages}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<p className="text-muted-foreground mt-4 max-w-175 text-sm leading-relaxed">
				Tagihan dikirim beberapa hari sebelum jatuh tempo, dan pesan itu sekaligus jadi
				peringatan pertama — jadi penyewa tidak menerima dua pesan berisi hal yang sama
				dalam satu periode. Jadwal ini sama untuk semua paket: penyewa yang telat sama saja
				telatnya di kost 5 kamar maupun 50 kamar.
			</p>
		</LedgerSection>
	);
}
