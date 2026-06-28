import { Bell, LayoutGrid, LineChart, ListChecks } from "lucide-react";
import { SectionHeading } from "./section-heading";

const highlightTags = ["Tanpa QRIS", "Nominal tetap bulat", "Bayar rapel didukung"];

const features = [
	{
		icon: Bell,
		iconBg: "bg-warning-bg text-warning-fg",
		title: "Pengingat bertahap",
		body: "Pesan 3 hari sebelum, hari-H, dan 3 hari sesudah jatuh tempo disiapkan otomatis. Sistem yang mengingatkan — bukan kamu."
	},
	{
		icon: LineChart,
		iconBg: "bg-success-bg text-success-fg",
		title: "Laporan kas & ekspor",
		body: 'Rekap uang masuk per bulan, status per kamar, ekspor CSV/Excel. "Bulan ini Rp22 juta tercatat otomatis."'
	},
	{
		icon: ListChecks,
		iconBg: "bg-info-bg text-info-fg",
		title: "Cepat siap dipakai",
		body: "Ada panduan langkah demi langkah, bukan halaman kosong. Kurang dari 10 menit sampai kamu bisa kirim contoh tagihan ke WA."
	}
];

export function Features() {
	return (
		<section id="features" className="container scroll-mt-16 py-10 md:py-14 lg:py-18">
			<SectionHeading
				eyebrow="Yang kamu dapat"
				title="Cukup untuk merapikan kost, tanpa kerumitan"
				description="Setiap fitur menjawab satu masalah nyata. Tanpa istilah ribet, tanpa halaman kosong."
			/>

			<div className="mt-12 grid gap-5 lg:grid-cols-2">
				{/* Differentiator */}
				<article className="flex min-h-70 flex-col justify-between rounded-xl border border-teal-100 bg-teal-50 p-9">
					<div>
						<span className="mb-4.5 inline-flex rounded-full bg-white px-3 py-1.5 text-xs font-bold text-teal-700">
							Pembeda utama
						</span>
						<h3 className="mb-3 text-2xl font-extrabold tracking-tight text-teal-900">
							Pembayaran dicocokkan lewat token, bukan tebak-tebak nominal
						</h3>
						<p className="text-warm-700 max-w-135 text-base leading-relaxed">
							Setiap tagihan punya tautan upload unik. Saat penghuni mengunggah bukti,
							sistem sudah tahu persis itu untuk tagihan yang mana — tahan terhadap
							harga beda-beda maupun bayar beberapa bulan sekaligus.
						</p>
					</div>
					<ul className="mt-6 flex flex-wrap gap-2.5">
						{highlightTags.map((tag) => (
							<li
								key={tag}
								className="inline-flex items-center gap-1.75 rounded-full bg-white px-3.5 py-1.75 text-sm font-bold text-teal-700"
							>
								<span className="size-1.5 rounded-full bg-teal-500" />
								{tag}
							</li>
						))}
					</ul>
				</article>

				{/* Self-fill */}
				<article className="border-border bg-card shadow-warm-sm rounded-xl border p-8">
					<div className="mb-4.5 flex size-12 items-center justify-center rounded-lg bg-teal-100 text-teal-700">
						<LayoutGrid className="size-6" strokeWidth={2} />
					</div>
					<h3 className="text-warm-900 mb-2.5 text-lg font-bold">
						Penghuni isi datanya sendiri
					</h3>
					<p className="text-warm-600 text-base leading-relaxed">
						Sebar QR/link per kamar di grup WA. Penghuni mengisi nama &amp; nomornya
						sendiri — beban input pindah dari kamu ke mereka.
					</p>
				</article>
			</div>

			<div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
				{features.map((feature) => (
					<article
						key={feature.title}
						className="border-border bg-card shadow-warm-sm rounded-xl border p-7.5"
					>
						<div
							className={`mb-4 flex size-11.5 items-center justify-center rounded-md ${feature.iconBg}`}
						>
							<feature.icon className="size-5.75" strokeWidth={2} />
						</div>
						<h3 className="text-warm-900 mb-2 text-lg font-bold">{feature.title}</h3>
						<p className="text-warm-600 text-sm leading-relaxed">{feature.body}</p>
					</article>
				))}
			</div>
		</section>
	);
}
