export function OccupancyReport() {
	return (
		<section className="container py-10 md:py-14 lg:py-18">
			<div className="grid gap-4 md:grid-cols-2 lg:gap-5">
				<div className="space-y-2 rounded-lg border border-teal-200 bg-teal-100 p-5.5 lg:space-y-2.5 lg:p-7">
					<h3 className="text-lg font-bold text-teal-900">Bayar hanya kamar terisi</h3>
					<p className="text-sm leading-relaxed text-teal-700">
						Biaya langgananmu dihitung dari jumlah kamar yang terisi pada tanggal
						penagihan tiap bulan — kamar kosong tidak dihitung. Kamar yang baru terisi
						atau kosong di tengah bulan berpengaruhnya bulan berikutnya, jadi tagihanmu
						tidak berubah mendadak.
					</p>
				</div>
				<div className="border-border bg-card space-y-3 rounded-lg border p-5.5 lg:space-y-4 lg:p-7">
					<div className="bg-success-bg text-success-fg flex size-10 items-center justify-center rounded-md lg:size-11.5">
						<svg
							width="23"
							height="23"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
							<polyline points="16 7 22 7 22 13" />
						</svg>
					</div>
					<div className="space-y-2.5">
						<h3 className="text-lg font-bold text-teal-900">
							Laporan kas &amp; ekspor
						</h3>
						<p className="text-warm-600 text-sm leading-relaxed">
							Rekap uang masuk per bulan, daftar lunas/telat/menunggak per kamar, dan
							semuanya bisa diunduh ke Excel — lengkap dengan rincian cicilan dan
							diskon.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
