import { LedgerSection } from "../shared/ledger";

const ledger = [
	{ label: "Uang masuk Juni 2026", value: "Rp18.750.000", tone: "text-warm-900" },
	{ label: "Lunas otomatis lewat link", value: "11 tagihan", tone: "text-success-fg" },
	{ label: "Ditandai lunas manual", value: "2 tagihan", tone: "text-warning-fg" },
	{ label: "Masih terbuka", value: "Rp1.500.000", tone: "text-danger-fg" }
];

export function Cashflow() {
	return (
		<LedgerSection
			index="05"
			label="Uang masuk"
			rhythm="section-sm"
			className="border-warm-200 bg-warm-canvas border-t"
		>
			<h2 className="text-h2-sm mb-8 max-w-155 font-extrabold text-balance text-teal-900">
				Bayar setahun di muka, cicilan, dan catatan yang menyusul sendiri
			</h2>

			<div className="border-warm-200 grid border-t lg:grid-cols-2">
				<div className="pt-6.5 pb-6.5 lg:pr-[clamp(24px,3vw,48px)] lg:pb-0">
					<h3 className="text-warm-900 mb-2.5 text-lg font-extrabold tracking-tight">
						Diskon di muka kamu tentukan sendiri
					</h3>
					<p className="text-warm-600 mb-3.5 text-sm leading-relaxed">
						Nominal atau persen, bebas — besaran diskon tiap kost memang berbeda, jadi
						Semang tidak memaksakan rumus. Diskonnya tercatat sebagai baris tersendiri
						di tagihan supaya jelas bagi penyewa dan terekam di laporan.
					</p>
					<p className="text-muted-foreground text-sm leading-relaxed">
						Kalau penyewa keluar sebelum periodenya habis, urusan pengembalian dana
						langsung antara kamu dan dia — dananya memang sudah ada di rekeningmu.
						Semang menghitung sisa periode yang belum berjalan sebagai angka acuan, lalu
						mencatat pembatalannya dengan alasan yang terpisah dari pembatalan biasa.
					</p>
				</div>

				<div className="border-warm-200 border-t pt-6.5 lg:border-t-0 lg:border-l lg:pl-[clamp(24px,3vw,48px)]">
					<h3 className="text-warm-900 mb-2.5 text-lg font-extrabold tracking-tight">
						Laporan kas &amp; ekspor
					</h3>
					<dl className="flex flex-col">
						{ledger.map((row) => (
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
					<p className="text-muted-foreground mt-4.5 text-sm leading-relaxed">
						Pembayaran yang terverifikasi otomatis dipisahkan dari yang ditandai manual,
						jadi kamu tahu mana angka yang sudah ada jejaknya. Semuanya bisa diekspor ke
						CSV atau Excel, termasuk rincian cicilan, diskon, dan piutang penyewa yang
						sudah keluar.
					</p>
				</div>
			</div>
		</LedgerSection>
	);
}
