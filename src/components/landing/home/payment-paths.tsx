import { LedgerSection } from "../shared/ledger";

export function PaymentPaths() {
	return (
		<LedgerSection index="04" label="Pelunasan" className="border-warm-200 bg-warm-25 border-t">
			<h2 className="text-h2 mb-3.5 max-w-160 font-extrabold text-balance text-teal-900">
				Menagih tidak menunggu verifikasi identitas selesai
			</h2>
			<p className="text-warm-600 mb-8 max-w-155 text-base leading-relaxed">
				Sejak siklus pertama, tagihan sudah terkirim otomatis. Yang berbeda hanya isi
				pesannya dan bagaimana pelunasan tercatat.
			</p>

			<div className="border-warm-200 grid border-y lg:grid-cols-2">
				<div className="pt-6.5 pb-7 lg:pr-8">
					<p className="text-warning-fg mb-3 font-mono text-[10.5px] leading-snug font-bold tracking-widest uppercase">
						Sebelum verifikasi selesai
					</p>
					<h3 className="text-warm-900 mb-3 text-xl font-extrabold tracking-tight">
						Nomor rekeningmu di dalam pesan
					</h3>
					<p className="text-warm-600 mb-3.5 text-sm leading-relaxed">
						Penyewa transfer seperti biasa. Begitu uangnya masuk, kamu menandai
						tagihannya lunas — sekali ketuk, dengan penanda tunai atau transfer
						langsung.
					</p>
					<p className="text-muted-foreground font-mono text-xs leading-relaxed font-semibold">
						TAGIHAN TETAP OTOMATIS · PELUNASAN DICATAT MANUAL
					</p>
				</div>

				<div className="border-warm-200 border-t pt-6.5 pb-7 lg:border-t-0 lg:border-l lg:pl-8">
					<p className="text-success-fg mb-3 font-mono text-[10.5px] leading-snug font-bold tracking-widest uppercase">
						Setelah verifikasi selesai
					</p>
					<h3 className="text-warm-900 mb-3 text-xl font-extrabold tracking-tight">
						Link pembayaran di setiap tagihan
					</h3>
					<p className="text-warm-600 mb-3.5 text-sm leading-relaxed">
						Penyewa bayar lewat QRIS, virtual account, atau e-wallet. Dana masuk ke
						rekeningmu dan pelunasannya tercatat sendiri, tanpa kamu buka apa pun.
					</p>
					<p className="text-muted-foreground font-mono text-xs leading-relaxed font-semibold">
						TAGIHAN OTOMATIS · PELUNASAN OTOMATIS
					</p>
				</div>
			</div>

			<p className="text-muted-foreground mt-4.5 max-w-170 text-sm leading-relaxed">
				Penyewa yang tetap membayar tunai setelah link tersedia juga tidak bikin catatanmu
				kacau: penandaan lunas manual selalu ada sebagai jaring pengaman, di paket apa pun.
			</p>
		</LedgerSection>
	);
}
