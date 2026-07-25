import Link from "next/link";
import { SectionHeading } from "../shared/section-heading";

const steps = [
	{
		num: "1",
		title: "Isi 3 hal saja",
		body: "Nama kost, jumlah kamar, harga sewa. Kamar dibuat otomatis; penyewa isi datanya sendiri lewat QR."
	},
	{
		num: "2",
		title: "Tagihan terkirim sendiri",
		body: "Tiap siklus, tagihan & reminder terkirim otomatis via WhatsApp atas nama kost-mu."
	},
	{
		num: "3",
		title: "Penyewa bayar online",
		body: "QRIS, VA, atau e-wallet — satu link, satu nominal pasti."
	}
];

export function HowItWorks() {
	return (
		<section
			id="cara-kerja"
			className="container scroll-mt-16 space-y-10 py-10 md:py-14 lg:space-y-12 lg:py-18"
		>
			<SectionHeading
				align="left"
				eyebrow="Cara kerja"
				title="Dari daftar sampai lunas — 4 langkah, 5 menit."
			/>

			<div className="relative">
				{/* Journey line */}
				<div
					aria-hidden
					className="absolute top-6 right-6 left-6 hidden border-t-2 border-dashed border-teal-200 lg:block"
				/>
				<div className="relative grid sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
					{steps.map((step) => (
						<div key={step.num} className="flex gap-3.5 sm:flex-col sm:gap-4">
							{/* Rel mobile: bulatan + garis penghubung putus-putus */}
							<div className="flex flex-col items-center sm:contents">
								<div className="bg-warm-canvas border-primary flex size-8 flex-none items-center justify-center rounded-full border-2 text-sm font-extrabold text-teal-700 sm:size-12 sm:text-lg">
									{step.num}
								</div>
								<span
									aria-hidden
									className="w-0 flex-1 border-l-2 border-dashed border-teal-200 sm:hidden"
								/>
							</div>
							<div className="space-y-1.5 pb-5 sm:space-y-2 sm:pb-0">
								<h3 className="text-base font-extrabold text-teal-900 sm:text-lg">
									{step.title}
								</h3>
								<p className="text-warm-600 text-sm leading-relaxed">{step.body}</p>
							</div>
						</div>
					))}
					<div className="flex gap-3.5 sm:flex-col sm:gap-4">
						<div className="bg-primary border-primary flex size-8 flex-none items-center justify-center rounded-full border-2 text-sm font-extrabold text-white sm:size-12 sm:text-xl">
							✓
						</div>
						<div className="flex-1 space-y-1.5 rounded-2xl bg-teal-900 p-4.5 sm:space-y-2 sm:p-5 lg:-mt-1 lg:-ml-5">
							<h3 className="text-base font-extrabold text-white sm:text-lg">
								Lunas tercatat otomatis
							</h3>
							<p className="text-sm leading-relaxed text-teal-200">
								Pembayaran masuk langsung melunasi tagihan — kuitansi digital
								terkirim ke penyewa.
							</p>
						</div>
					</div>
				</div>
			</div>

			<Link
				href="/cara-kerja"
				className="text-primary inline-flex items-center gap-1.5 text-sm font-bold transition-colors hover:text-teal-600"
			>
				Lihat detail wizard &amp; siklus penagihan →
			</Link>
		</section>
	);
}
