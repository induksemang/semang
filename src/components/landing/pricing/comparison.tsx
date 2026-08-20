import { cn } from "@/lib/utils";
import { LedgerSection } from "../shared/ledger";

const rows = [
	{ ability: "Kelola kamar, penyewa, dan tipe kamar", paid: "Ya", free: "Ya" },
	{ ability: "Tagihan dibuat otomatis lengkap dengan nominal", paid: "Ya", free: "Ya" },
	{
		ability: "Tagihan dan pengingat terkirim otomatis via WhatsApp",
		paid: "Ya",
		free: "Tidak — kamu kirim sendiri",
		highlight: true
	},
	{ ability: "Link pembayaran Xendit & kuitansi digital", paid: "Ya", free: "Ya" },
	{ ability: "Laporan kas & ekspor CSV/Excel", paid: "Ya", free: "Ya" },
	{ ability: "Ringkasan berkala ke WhatsApp pemilik", paid: "Ya", free: "Tidak" }
];

const cell = "border border-teal-100 px-4.5 py-3.25";
const kicker = "mb-3.5 font-mono text-[10.5px] leading-snug font-bold tracking-widest uppercase";

// Mobile memakai potongan yang sama dari `rows`: yang sama di kedua keadaan vs yang berubah.
const same = rows.filter((row) => row.free === "Ya");
const differs = rows.filter((row) => row.free !== "Ya");

function Tick() {
	return (
		<span className="bg-success-bg text-success-fg mt-0.5 grid size-4.5 shrink-0 place-items-center rounded-full">
			<svg
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="3.2"
				strokeLinecap="butt"
				strokeLinejoin="miter"
				aria-hidden="true"
				className="size-2.75"
			>
				<path d="m4 12.5 5.5 5.5L20 6.5" />
			</svg>
		</span>
	);
}

export function Comparison() {
	return (
		<LedgerSection
			index="02"
			label="Yang dibayar"
			tone="teal"
			rhythm="section-sm"
			className="border-t border-teal-200 bg-teal-50"
		>
			<h2 className="text-h2-sm mb-3.5 max-w-155 font-extrabold text-balance text-teal-900">
				Satu-satunya beda antara berlangganan dan tidak: siapa yang menekan kirim
			</h2>
			<p className="mb-7.5 max-w-160 text-base leading-relaxed text-teal-700">
				Berhenti berlangganan tidak mengubah apa pun di kostmu. Semua kamar, penyewa,
				tagihan, dan riwayat tetap ada dan tetap bisa diubah.
			</p>

			<div className="border border-teal-200 bg-white lg:hidden">
				<div className="p-4.5">
					<h3 className={`${kicker} text-teal-400`}>Sama di kedua keadaan</h3>
					<ul className="flex flex-col gap-2.75">
						{same.map((row) => (
							<li key={row.ability} className="flex items-start gap-2.5">
								<Tick />
								<span className="text-warm-900 text-sm leading-normal">
									{row.ability}
								</span>
							</li>
						))}
					</ul>
				</div>
				<div className="border-t border-teal-200 bg-[#f7fbfa] p-4.5">
					<h3 className={`${kicker} text-danger-fg`}>Yang berubah tanpa langganan</h3>
					<dl className="flex flex-col gap-4">
						{differs.map((row) => (
							<div
								key={row.ability}
								className="not-first:border-t not-first:border-teal-100 not-first:pt-4"
							>
								<dt className="text-warm-900 mb-2 text-sm leading-normal font-bold">
									{row.ability}
								</dt>
								<dd className="grid grid-cols-[auto_minmax(0,1fr)] items-baseline gap-x-2.5 gap-y-1.5">
									<span className="font-mono text-[9px] leading-relaxed font-bold tracking-widest text-teal-400 uppercase">
										Berlangganan
									</span>
									<span className="text-success-fg text-sm font-bold">
										{row.paid}
									</span>
									<span className="text-muted-foreground font-mono text-[9px] leading-relaxed font-bold tracking-widest uppercase">
										Tidak
									</span>
									<span className="text-danger-fg text-sm font-bold">
										{row.free}
									</span>
								</dd>
							</div>
						))}
					</dl>
				</div>
			</div>

			<div className="hidden lg:block">
				<table className="w-full border-collapse bg-white text-left">
					<thead>
						<tr>
							<th className="border border-teal-200 px-4.5 py-3.5 font-mono text-[10.5px] leading-snug font-bold tracking-widest text-teal-400 uppercase">
								Kemampuan
							</th>
							<th className="w-47.5 border border-teal-200 px-4.5 py-3.5 text-sm font-extrabold text-teal-900">
								Berlangganan
							</th>
							<th className="w-47.5 border border-teal-200 px-4.5 py-3.5 text-sm font-extrabold text-teal-900">
								Tidak berlangganan
							</th>
						</tr>
					</thead>
					<tbody>
						{rows.map((row) => (
							<tr
								key={row.ability}
								className={row.highlight ? "bg-[#f7fbfa]" : undefined}
							>
								<th
									scope="row"
									className={cn(
										cell,
										"text-warm-900 text-left text-sm",
										row.highlight ? "font-bold" : "font-normal"
									)}
								>
									{row.ability}
								</th>
								<td
									className={cn(
										cell,
										"text-success-fg text-sm",
										row.highlight ? "font-extrabold" : "font-bold"
									)}
								>
									{row.paid}
								</td>
								<td
									className={cn(
										cell,
										"text-sm",
										row.free === "Ya" ? "text-success-fg" : "text-danger-fg",
										row.highlight ? "font-extrabold" : "font-bold"
									)}
								>
									{row.free}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<p className="mt-4.5 max-w-180 text-sm leading-relaxed text-teal-700">
				Kost 4 kamar mungkin memang cukup mengirim empat pesan sebulan sendiri, dan itu
				tidak apa-apa. Yang kami hitung: begitu kostnya tumbuh, menyalin pesan satu per satu
				berhenti terasa ringan — di situlah berlangganan jadi masuk akal, bukan karena ada
				fitur yang sengaja dikunci.
			</p>
			<p className="text-muted-foreground mt-3.5 max-w-180 text-sm leading-relaxed">
				Kalau pembayaran langganan gagal karena hal teknis, pengiriman tidak langsung mati.
				Ada tenggang tujuh hari sebelum akun kembali ke keadaan tidak berlangganan.
			</p>
		</LedgerSection>
	);
}
