import { cn } from "@/lib/utils";
import { LedgerSection } from "../shared/ledger";

const stages = [
	{
		when: "H-3 · 2 JUNI",
		title: "Tagihan dibuat & dikirim",
		body: "Sistem menyusun tagihan periode berikutnya, lalu mengirimnya ke WhatsApp penyewa. Pesan ini sekaligus peringatan pertama."
	},
	{
		when: "H · 5 JUNI",
		title: "Jatuh tempo",
		body: "Yang sudah bayar berhenti di sini — tidak ada pesan lanjutan untuk mereka."
	},
	{
		when: "H+3 · 8 JUNI",
		title: "Pengingat pertama",
		body: "Hanya ke penyewa yang belum lunas. Statusnya menjadi telat."
	},
	{
		when: "H+7 · 12 JUNI",
		title: "Pengingat terakhir",
		body: "Pesan ketiga, dan yang paling akhir untuk tagihan ini. Setelah itu Semang diam."
	},
	{
		when: "KAPAN PUN",
		title: "Pembayaran masuk",
		body: "Tagihan lunas, kuitansi terbit, dan pengingat yang belum jalan dibatalkan seketika.",
		settled: true
	}
];

export function MonthlyCycle() {
	return (
		<LedgerSection
			index="02"
			label="Siklus bulanan"
			tone="teal"
			rhythm="section-sm"
			className="border-t border-teal-200 bg-teal-50"
		>
			<h2 className="text-h2-sm mb-3.5 max-w-155 font-extrabold text-balance text-teal-900">
				Yang berjalan tiap bulan tanpa kamu menyentuh apa pun
			</h2>
			<p className="mb-8.5 max-w-155 text-base leading-relaxed text-teal-700">
				Contoh di bawah memakai jatuh tempo tanggal 5. Semua tanggal bergeser mengikuti
				jatuh tempo tiap penyewa.
			</p>

			<ol className="grid border border-teal-200 bg-white sm:grid-cols-2 lg:grid-cols-5">
				{stages.map((stage) => (
					<li
						key={stage.when}
						className={cn(
							"border-teal-200 px-4.5 py-5.5 not-first:border-t sm:not-first:border-t-0 sm:not-first:border-l",
							stage.settled && "bg-success-bg"
						)}
					>
						<p
							className={cn(
								"mb-2.5 font-mono text-[11px] leading-snug font-bold tracking-widest",
								stage.settled ? "text-success-fg" : "text-teal-400"
							)}
						>
							{stage.when}
						</p>
						<h3 className="mb-1.75 text-base font-extrabold text-teal-900">
							{stage.title}
						</h3>
						<p
							className={cn(
								"text-sm leading-normal",
								stage.settled ? "text-success-fg" : "text-warm-700"
							)}
						>
							{stage.body}
						</p>
					</li>
				))}
			</ol>

			<div className="mt-5 flex flex-col gap-1.75 lg:flex-row lg:items-baseline lg:gap-3.5">
				<span className="font-mono text-[10.5px] leading-snug font-bold tracking-widest whitespace-nowrap text-teal-400">
					BATAS TEGAS
				</span>
				<p className="max-w-180 text-sm leading-relaxed text-teal-700">
					Satu tagihan bulanan tidak pernah menghasilkan lebih dari tiga pesan. Penyewa
					tidak dibanjiri, dan kamu tidak perlu khawatir hubungan baik dengan mereka rusak
					gara-gara aplikasi.
				</p>
			</div>
		</LedgerSection>
	);
}
