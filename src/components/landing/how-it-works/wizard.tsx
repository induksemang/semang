import { cn } from "@/lib/utils";
import { CheckBadge, LedgerSection } from "../shared/ledger";

const steps = [
	{
		title: "Masuk dengan Google atau nomor WhatsApp",
		body: "Dua jalur setara. Kalau lewat Google, nomor WhatsApp-mu diminta belakangan — nomor itu yang nanti menerima contoh tagihan dan ringkasan bulanan."
	},
	{
		title: "Tiga isian, satu layar",
		body: "Nama kost, jumlah kamar, harga sewa. Cuma itu yang dibutuhkan untuk menyusun tagihan pertama — sisanya menyusul nanti."
	},
	{
		title: "Kirim contoh tagihannya ke WhatsApp-mu sendiri",
		body: 'Bukan tangkapan layar contoh: pesan sungguhan dengan nama kost dan harga yang barusan kamu isi, masuk ke ponselmu. Begitu kembali, Semang sudah menunggu di kartu "Sudah cek WhatsApp Anda?".'
	},
	{
		title: "Lengkapi setelah momennya lewat",
		body: "Wilayah kost dicari dari daftar kota dan kabupaten, lalu tipe kamar dan data penyewa. Untuk penyewa, sebar link isi mandiri ke grup WA kost — mereka yang mengetik datanya, bukan kamu."
	},
	{
		title: "Dashboard pertama yang tidak kosong",
		body: "Langkah yang sudah kamu lalui tercentang sendiri, dan satu kartu memberitahu tanggal tagihan berikutnya berangkat."
	}
];

export function Wizard() {
	return (
		<LedgerSection
			index="01"
			label="Lima menit pertama"
			rhythm="section-sm"
			className="border-warm-200 bg-warm-25 border-t"
		>
			<h2 className="text-h2-sm mb-7.5 max-w-155 font-extrabold text-balance text-teal-900">
				Tagihan pertama muncul sebelum kamu sempat berpikir untuk berhenti
			</h2>

			<div className="grid items-start gap-[clamp(28px,4vw,56px)] lg:grid-cols-[1.15fr_1fr]">
				<ol>
					{steps.map((step, index) => {
						const last = index === steps.length - 1;
						return (
							<li
								key={step.title}
								className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-5"
							>
								<div className="flex flex-col items-center">
									<span
										className={cn(
											"grid size-6.5 shrink-0 place-items-center rounded-full font-mono text-xs font-extrabold text-white",
											last ? "bg-teal-900" : "bg-brand"
										)}
									>
										{index + 1}
									</span>
									{!last && <span className="bg-warm-200 my-1 w-px flex-1" />}
								</div>
								<div className={last ? undefined : "pb-6.5"}>
									<h3 className="text-warm-900 mb-1.5 text-lg font-extrabold">
										{step.title}
									</h3>
									<p className="text-warm-600 text-sm leading-relaxed">
										{step.body}
									</p>
								</div>
							</li>
						);
					})}
				</ol>

				<div className="border-warm-200 border bg-white p-[clamp(20px,2.5vw,28px)]">
					<h3 className="text-muted-foreground mb-4 font-mono text-[10.5px] leading-snug font-bold tracking-widest uppercase">
						Yang tampil di layar 3
					</h3>
					<div className="border-brand text-warm-900 mb-5 border-l-[3px] pl-4 text-sm leading-relaxed">
						Kost Melati — Kamar 1
						<br />
						Periode 1–30 Juni 2026
						<br />
						<strong className="font-extrabold tabular-nums">Rp1.500.000</strong>, jatuh
						tempo 5 Juni.
					</div>
					<h3 className="text-muted-foreground mb-3 font-mono text-[10.5px] leading-snug font-bold tracking-widest uppercase">
						Dan tepat di bawahnya
					</h3>
					<div className="bg-success-bg flex items-start gap-2.5 px-4 py-3.5">
						<CheckBadge />
						<p className="text-sm leading-normal font-semibold text-teal-900">
							Kamar 1 — Rp1.500.000 diterima
						</p>
					</div>
					<p className="text-muted-foreground mt-4 text-sm leading-relaxed">
						Dua pesan itu ditampilkan berurutan supaya jelas: yang satu berangkat ke
						penyewa, yang satu datang ke kamu. Target kami, semuanya selesai di bawah
						lima menit.
					</p>
				</div>
			</div>
		</LedgerSection>
	);
}
