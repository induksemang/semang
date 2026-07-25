import Link from "next/link";
import { SectionHeading } from "../shared/section-heading";

const flowSteps = [
	{
		label: "01 · Penyewa",
		title: "Membayar tagihan",
		body: "QRIS, virtual account, atau e-wallet — dari satu link."
	},
	{
		label: "02 · Jalur resmi",
		title: "Diproses atas namamu",
		body: "Dana lewat jalur pembayaran atas namamu sendiri — bukan atas nama Semang."
	}
];

const assurances = [
	{
		lead: "Mulai tanpa syarat verifikasi.",
		body: "Menagih otomatis jalan sejak hari pertama — verifikasi hanya untuk mengaktifkan pelunasan online."
	},
	{
		lead: "Datamu tetap aman.",
		body: "Data penyewa terenkripsi, hanya bisa diakses olehmu — tidak dijual atau dibagikan."
	}
];

export function Trust() {
	return (
		<section id="kepercayaan" className="scroll-mt-16 bg-teal-900">
			<div className="container space-y-10 py-10 md:py-14 lg:space-y-11 lg:py-18">
				<SectionHeading
					align="left"
					tone="dark"
					eyebrow="Keamanan dana"
					title="Ikuti uangnya — tidak pernah mampir ke Semang."
					description="Diproses lewat jalur pembayaran resmi yang dipakai ribuan bisnis Indonesia."
				/>

				<div className="flex flex-col items-stretch gap-3 md:flex-row md:gap-0">
					{flowSteps.map((step) => (
						<div key={step.label} className="contents">
							<div className="flex-1 space-y-1.5 rounded-2xl border border-teal-600 bg-teal-800 p-4.5 md:p-5 lg:p-6">
								<div className="font-mono text-xs font-bold tracking-widest text-teal-300 uppercase">
									{step.label}
								</div>
								<div className="pt-1 text-lg font-extrabold text-white">
									{step.title}
								</div>
								<div className="text-sm leading-relaxed text-teal-200">
									{step.body}
								</div>
							</div>
							<div
								aria-hidden
								className="text-primary flex items-center justify-center px-2 text-2xl font-extrabold max-md:rotate-90 lg:px-3.5"
							>
								→
							</div>
						</div>
					))}
					<div className="flex-1 space-y-1.5 rounded-2xl border border-teal-200 bg-teal-50 p-4.5 md:p-5 lg:p-6">
						<div className="text-primary font-mono text-xs font-bold tracking-widest uppercase">
							03 · Rekeningmu
						</div>
						<div className="pt-1 text-lg font-extrabold text-teal-900">
							Uang mendarat di bank-mu ✓
						</div>
						<div className="text-sm leading-relaxed text-teal-700">
							Tanpa mampir ke Semang, tanpa saldo mengendap di aplikasi.
						</div>
					</div>
				</div>

				<div className="space-y-7">
					<div className="flex flex-wrap gap-x-10 gap-y-4 border-t border-teal-600 pt-6">
						{assurances.map((item) => (
							<div
								key={item.lead}
								className="flex flex-1 basis-80 items-baseline gap-2.5"
							>
								<span className="text-sm font-extrabold text-teal-300">✓</span>
								<span className="text-sm leading-relaxed text-teal-100">
									<b className="text-white">{item.lead}</b> {item.body}
								</span>
							</div>
						))}
					</div>
					<Link
						href="/keamanan"
						className="inline-flex items-center gap-1.5 text-sm font-bold text-teal-300 transition-colors hover:text-white"
					>
						Pelajari keamanan &amp; kepercayaan lengkap →
					</Link>
				</div>
			</div>
		</section>
	);
}
