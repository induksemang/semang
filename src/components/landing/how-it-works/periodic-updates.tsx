import { ArrowLink, LedgerSection } from "../shared/ledger";

const summary = [
	{ label: "Sudah bayar", value: "11 kamar", tone: "text-success-fg" },
	{ label: "Telat", value: "1 kamar", tone: "text-warning-fg" },
	{ label: "Menunggak", value: "0 kamar", tone: "text-danger-fg" }
];

export function PeriodicUpdates() {
	return (
		<LedgerSection
			index="03"
			label="Kabar untukmu"
			rhythm="section-sm"
			className="bg-warm-canvas border-t border-teal-200"
			innerClassName="lg:grid-cols-[104px_minmax(0,1fr)]"
		>
			<div className="flex flex-col gap-7 lg:grid lg:grid-cols-[1.1fr_1fr] lg:grid-rows-[auto_1fr] lg:items-start lg:gap-x-[clamp(28px,4vw,56px)] lg:gap-y-0">
				<div className="lg:col-start-1 lg:row-start-1">
					<h2 className="text-h2-sm mb-3.5 max-w-140 font-extrabold text-balance text-teal-900">
						Kamu tahu kondisi kost tanpa membuka laptop
					</h2>
					<p className="text-warm-600 mb-4 max-w-140 text-base leading-relaxed">
						Sebulan sekali ringkasannya datang ke WhatsApp-mu: siapa yang sudah bayar,
						siapa yang menunggak. Di luar itu, pesan hanya dikirim kalau memang ada yang
						perlu kamu tahu — penyewa telat atau statusnya berubah.
					</p>
					<p className="text-warm-600 max-w-140 text-sm leading-relaxed">
						Kalau bulan itu semua lancar, tidak ada pesan sama sekali. Ringkasan yang
						isinya &ldquo;tidak ada apa-apa&rdquo; cuma bikin pesan berikutnya ikut
						diabaikan.
					</p>
				</div>

				<div className="border-warm-200 order-1 border bg-white p-[clamp(20px,2.5vw,28px)] lg:order-0 lg:col-start-2 lg:row-span-2 lg:row-start-1">
					<h3 className="text-muted-foreground mb-4 font-mono text-[10.5px] leading-snug font-bold tracking-widest uppercase">
						Ringkasan bulanan · Kost Melati
					</h3>
					<dl className="flex flex-col">
						{summary.map((row) => (
							<div
								key={row.label}
								className="border-warm-200 flex items-baseline justify-between gap-4 border-b py-3 first:pt-0"
							>
								<dt className="text-warm-700 text-sm">{row.label}</dt>
								<dd className={`text-base font-extrabold tabular-nums ${row.tone}`}>
									{row.value}
								</dd>
							</div>
						))}
					</dl>
					<ArrowLink href="/register" className="mt-4.5 block text-sm">
						Lihat selengkapnya di sini
					</ArrowLink>
				</div>

				<p className="border-warm-200 text-muted-foreground order-2 max-w-140 border-t pt-4 text-sm leading-relaxed lg:order-0 lg:col-start-1 lg:row-start-2 lg:mt-5">
					Paket Pro menambah rincian per kamar; paket Bisnis memisahkan ringkasannya untuk
					tiap properti yang kamu kelola.
				</p>
			</div>
		</LedgerSection>
	);
}
