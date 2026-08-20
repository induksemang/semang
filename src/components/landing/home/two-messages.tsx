import { CheckBadge } from "../shared/ledger";

export function TwoMessages() {
	return (
		<section className="container py-[clamp(40px,5vw,64px)]">
			<div className="border-warm-200 grid border bg-white lg:grid-cols-2">
				<div className="p-[clamp(24px,3vw,36px)]">
					<h2 className="text-muted-foreground mb-4.5 font-mono text-[10.5px] leading-normal font-bold tracking-widest uppercase">
						01 · Yang penyewa terima di WhatsApp
					</h2>
					<div className="border-brand text-warm-900 border-l-[3px] pl-4.5 text-base leading-relaxed">
						Kost Melati — Kamar 3
						<br />
						Periode 1–30 Juni 2026
						<br />
						<strong className="font-extrabold tabular-nums">Rp1.500.000</strong>, jatuh
						tempo 5 Juni.
						<br />
						Bayar di sini:{" "}
						<span className="font-semibold text-teal-600">
							bayar.semang.id/k3-jun26
						</span>
					</div>
					<p className="text-muted-foreground mt-5 text-xs leading-normal">
						Dikirim dari nomor bisnis WhatsApp Semang, atas nama kostmu. Kategori
						utility, tanpa satu pun kalimat promosi.
					</p>
				</div>

				<div className="border-warm-200 bg-warm-25 border-t p-[clamp(24px,3vw,36px)] lg:border-t-0 lg:border-l">
					<h2 className="text-muted-foreground mb-4.5 font-mono text-[10.5px] leading-normal font-bold tracking-widest uppercase">
						02 · Yang kamu terima beberapa saat kemudian
					</h2>
					<div className="border-success bg-success-bg flex items-start gap-3 border-l-[3px] px-4.5 py-4">
						<CheckBadge />
						<p className="text-base leading-normal font-semibold text-teal-900">
							Kamar 3 — Rp1.500.000 diterima, tercatat otomatis.
						</p>
					</div>
					<p className="text-muted-foreground mt-5 text-xs leading-normal">
						Dana mendarat di rekeningmu, kuitansi tersedia untuk penyewa, laporan kas
						ikut terbarui. Di antara dua pesan ini, pemilik kost tidak menyentuh apa
						pun.
					</p>
				</div>
			</div>
		</section>
	);
}
