import { SectionHeading } from "./section-heading";

const steps = [
	{
		num: "1",
		title: "Isi 3 hal saja",
		body: "Nama kost, jumlah kamar, harga sewa. Kamar dibuat otomatis; penyewa bisa isi datanya sendiri lewat QR per kamar."
	},
	{
		num: "2",
		title: "Tagihan terkirim sendiri",
		body: "Tiap siklus, tagihan & reminder terkirim otomatis via WhatsApp atas nama kost-mu. Kamu tidak menekan tombol apa pun."
	},
	{
		num: "3",
		title: "Penyewa bayar online",
		body: "QRIS, virtual account, atau e-wallet — satu link, satu nominal pasti. Penyewa tidak pernah menghitung apa pun."
	}
];

export function HowItWorks() {
	return (
		<section
			id="cara-kerja"
			className="container scroll-mt-16 space-y-8 py-10 md:py-14 lg:space-y-12 lg:py-18"
		>
			<SectionHeading
				align="left"
				eyebrow="Cara kerja"
				title="Siapkan sekali, lalu tidak menyentuh apa pun."
				description="Lima menit dari daftar sampai contoh tagihan masuk ke WhatsApp-mu sendiri."
			/>

			<div className="space-y-5">
				<div className="grid gap-4.5 sm:grid-cols-2 lg:grid-cols-4">
					{steps.map((step) => (
						<div
							key={step.num}
							className="border-border bg-card shadow-warm-sm space-y-4 rounded-xl border p-6.5"
						>
							<span className="inline-flex size-7.5 items-center justify-center rounded-full bg-teal-700 text-sm font-extrabold text-white">
								{step.num}
							</span>
							<div className="space-y-2">
								<h3 className="text-lg font-bold">{step.title}</h3>
								<p className="text-warm-600 text-sm leading-relaxed">{step.body}</p>
							</div>
						</div>
					))}
					<div className="shadow-warm-sm space-y-4 rounded-xl border border-teal-200 bg-teal-100 p-6.5">
						<span className="bg-success inline-flex size-7.5 items-center justify-center rounded-full text-sm font-extrabold text-white">
							✓
						</span>
						<div className="space-y-2">
							<h3 className="text-lg font-bold text-teal-900">
								Lunas tercatat otomatis
							</h3>
							<p className="text-sm leading-relaxed text-teal-700">
								Uang langsung masuk rekeningmu, pembayaran terkonfirmasi sistem,
								kuitansi digital terkirim, reminder sisanya batal sendiri.
							</p>
						</div>
					</div>
				</div>

				<div className="bg-info-bg border-info/20 flex items-start gap-3 rounded-lg border px-5.5 py-4.5">
					<span className="bg-info flex size-6 flex-none items-center justify-center rounded-full text-sm font-extrabold text-white">
						i
					</span>
					<p className="text-info-fg max-w-190 text-sm leading-relaxed">
						Belum verifikasi rekening? Tidak apa-apa — tagihan tetap terkirim otomatis
						berisi nomor rekeningmu, dan kamu tinggal menandai lunas saat uang masuk.
						Begitu verifikasi selesai, semuanya beralih otomatis ke pembayaran online.
					</p>
				</div>
			</div>
		</section>
	);
}
