const roomTypes = [
	{ name: "Standar", price: "Rp1.200.000" },
	{ name: "AC", price: "Rp1.500.000" },
	{ name: "Kamar Mandi Dalam", price: "Rp1.800.000" }
];

export function PropertyManagement() {
	return (
		<section>
			<div className="container py-10 md:py-14 lg:py-18">
				<div className="flex flex-wrap items-center gap-x-12 gap-y-8">
					<div className="min-w-0 flex-1 basis-95 space-y-3 lg:space-y-4">
						<h2 className="text-xl font-extrabold tracking-tight text-teal-900 lg:text-2xl">
							Kost, tipe kamar &amp; kamar dalam satu tempat
						</h2>
						<p className="text-warm-600 text-sm leading-relaxed md:text-base">
							Isi nama kost, kota, dan jumlah kamar — daftar kamar langsung jadi. Buat
							tipe kamar (Standar, AC, Kamar Mandi Dalam) dengan harganya
							masing-masing, lalu pasangkan ke tiap kamar. Kamar tanpa tipe memakai
							harga umum kost-mu, dan harga tiap kamar tetap bisa diubah satu-satu.
						</p>
						<p className="text-warm-600 text-sm leading-relaxed md:text-base">
							Penyewa mengisi nama dan nomor WA-nya sendiri lewat link/QR khusus
							kamarnya, cukup sekali setuju. Mau mengetikkan datanya sendiri juga
							bisa.
						</p>
					</div>
					<div className="max-w-105 min-w-0 flex-1 basis-80">
						<div className="border-border bg-card overflow-hidden rounded-lg border">
							<div className="border-border bg-warm-50 text-warm-400 border-b px-5 py-4 text-xs font-bold tracking-wide uppercase">
								Tipe kamar — contoh
							</div>
							{roomTypes.map((room, index) => (
								<div
									key={room.name}
									className={`flex items-center justify-between px-5 py-3.5 ${
										index > 0 ? "border-border border-t" : ""
									}`}
								>
									<span className="text-warm-900 text-sm font-bold">
										{room.name}
									</span>
									<span className="text-sm font-bold text-teal-700">
										{room.price}
									</span>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
