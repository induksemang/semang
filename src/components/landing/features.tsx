import { SectionHeading } from "./section-heading";

const features = [
	{
		iconBg: "bg-teal-100",
		title: "Jatuh tempo mengikuti kebiasaanmu",
		body: "Tanggal masuk masing-masing penyewa, atau satu tanggal tetap untuk semua — termasuk perlakuan tagihan pertama untuk yang masuk di tengah bulan.",
		icon: (
			<svg
				width="23"
				height="23"
				viewBox="0 0 24 24"
				fill="none"
				stroke="#27574F"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<rect x="3" y="4" width="18" height="18" rx="2" />
				<line x1="16" y1="2" x2="16" y2="6" />
				<line x1="8" y1="2" x2="8" y2="6" />
				<line x1="3" y1="10" x2="21" y2="10" />
			</svg>
		)
	},
	{
		iconBg: "bg-teal-100",
		title: "Bulanan, mingguan, harian",
		body: "Penyewa sementara? Sewa per minggu atau per hari dengan harga turunan otomatis yang bisa kamu ubah sendiri.",
		icon: (
			<svg
				width="23"
				height="23"
				viewBox="0 0 24 24"
				fill="none"
				stroke="#27574F"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<circle cx="12" cy="12" r="10" />
				<polyline points="12 6 12 12 16 14" />
			</svg>
		)
	},
	{
		iconBg: "bg-success-bg",
		title: "Cicilan & bayar di muka",
		body: "Sepakat dicicil? Kamu yang menetapkan besarannya, sistem mengirim link dengan nominal terkunci. Bayar setahun di muka dengan diskon juga bisa.",
		icon: (
			<svg
				width="23"
				height="23"
				viewBox="0 0 24 24"
				fill="none"
				stroke="#256E4B"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<rect x="2" y="6" width="20" height="12" rx="2" />
				<circle cx="12" cy="12" r="2" />
				<path d="M6 12h.01" />
				<path d="M18 12h.01" />
			</svg>
		)
	},
	{
		iconBg: "bg-teal-100",
		title: "Tipe kamar & harga bertingkat",
		body: "Kamar AC, kamar mandi dalam, standar — tiap tipe punya harganya sendiri, masih bisa disesuaikan per kamar.",
		icon: (
			<svg
				width="23"
				height="23"
				viewBox="0 0 24 24"
				fill="none"
				stroke="#27574F"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<rect x="3" y="3" width="7" height="7" rx="1" />
				<rect x="14" y="3" width="7" height="7" rx="1" />
				<rect x="3" y="14" width="7" height="7" rx="1" />
				<rect x="14" y="14" width="7" height="7" rx="1" />
			</svg>
		)
	},
	{
		iconBg: "bg-teal-100",
		title: "Kabar rutin ke WhatsApp-mu",
		body: "Ringkasan berkala: siapa sudah bayar, siapa menunggak — langsung di WhatsApp, dengan tautan ke dashboard untuk rinciannya.",
		icon: (
			<svg
				width="23"
				height="23"
				viewBox="0 0 24 24"
				fill="none"
				stroke="#27574F"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22z" />
			</svg>
		)
	},
	{
		iconBg: "bg-success-bg",
		title: "Laporan kas & ekspor",
		body: "Rekap uang masuk per bulan, lunas/telat/menunggak per kamar, tren sederhana, ekspor ke Excel kapan saja.",
		icon: (
			<svg
				width="23"
				height="23"
				viewBox="0 0 24 24"
				fill="none"
				stroke="#256E4B"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
				<polyline points="16 7 22 7 22 13" />
			</svg>
		)
	}
];

export function Features() {
	return (
		<section
			id="fitur"
			className="container scroll-mt-16 space-y-8 py-10 md:py-14 lg:space-y-12 lg:py-18"
		>
			<SectionHeading
				eyebrow="Fitur"
				title="Mengikuti cara kost-mu berjalan — bukan sebaliknya."
				description="Pola penagihan yang sudah kamu pakai bertahun-tahun didukung, bukan dipaksa berubah."
			/>

			<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
				{features.map((feature) => (
					<article
						key={feature.title}
						className="border-border bg-card shadow-warm-sm space-y-4 rounded-xl border p-6.5"
					>
						<div
							className={`flex size-11.5 items-center justify-center rounded-md ${feature.iconBg}`}
						>
							{feature.icon}
						</div>
						<div className="space-y-2">
							<h3 className="text-warm-900 text-lg font-bold">{feature.title}</h3>
							<p className="text-warm-600 text-sm leading-relaxed">{feature.body}</p>
						</div>
					</article>
				))}
			</div>
		</section>
	);
}
