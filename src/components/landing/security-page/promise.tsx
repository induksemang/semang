import { SectionHeading } from "../shared/section-heading";

const never = [
	"Menjual atau membagikan data penyewamu",
	"Memakai datamu untuk iklan",
	"Menambah markup biaya ke tagihan penyewa",
	"Menyandera datamu saat kamu turun paket"
];

const always = [
	"Harga dihitung per kamar terisi saja — tanpa komisi tersembunyi",
	"Halaman pembayaran selalu menampilkan nama kost, periode, dan nominal — tagihan sah mudah dibedakan dari penipuan",
	"Penyewa dan pemilik bisa minta datanya dihapus kapan saja — sesuai UU Perlindungan Data Pribadi",
	"Datamu hanya bisa dibuka olehmu; alamat halaman pembayaran tidak bisa ditebak orang lain"
];

export function PromiseSection() {
	return (
		<section className="container flex flex-wrap items-center gap-x-14 gap-y-10 py-10 md:py-14 lg:py-18">
			<div className="min-w-0 flex-1 basis-80">
				<SectionHeading
					align="left"
					eyebrow="Data & transparansi"
					title="Janji kami — tertulis, bukan tersirat."
					description="Data penyewa dilindungi, harga tidak menyembunyikan apa pun. Kami tulis hitam di atas putih — lengkap dengan coretannya."
				/>
			</div>

			<div className="flex min-w-0 flex-1 basis-140 flex-col gap-5">
				<div className="space-y-3.5 rounded-lg border border-teal-600 bg-teal-900 p-5.5 lg:space-y-4.5 lg:rounded-xl lg:p-8">
					<div className="font-mono text-xs font-bold tracking-widest text-red-300">
						YANG TIDAK AKAN KAMI LAKUKAN
					</div>
					<div className="flex flex-col gap-2.5 lg:gap-3">
						{never.map((item) => (
							<div key={item} className="flex items-baseline gap-2.5 lg:gap-3">
								<span className="flex-none text-sm font-extrabold text-red-300">
									✕
								</span>
								<span className="text-sm font-bold text-white line-through decoration-red-300/75 decoration-2 lg:text-base">
									{item}
								</span>
							</div>
						))}
					</div>
				</div>
				<div className="border-border bg-card space-y-3.5 rounded-lg border p-5.5 lg:space-y-4.5 lg:rounded-xl lg:p-8">
					<div className="text-primary font-mono text-xs font-bold tracking-widest">
						YANG SELALU BERLAKU — TERMASUK DI PAKET GRATIS
					</div>
					<div className="flex flex-col gap-3">
						{always.map((item) => (
							<div key={item} className="flex items-baseline gap-3">
								<span className="text-primary flex-none text-sm font-extrabold">
									✓
								</span>
								<span className="text-warm-700 text-sm leading-relaxed font-semibold">
									{item}
								</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
