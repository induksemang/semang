import { Clock } from "lucide-react";

const checks = [
	"Telat ditandai otomatis lewat jatuh tempo",
	"Audit trail tersimpan di setiap aksi",
	"Menunggak masuk laporan piutang sendiri"
];

const steps = [
	{
		marker: "1",
		markerClass: "bg-border text-warm-600",
		chipClass: "bg-border text-warm-700",
		dotClass: "bg-warm-500",
		label: "Terjadwal",
		body: "Sistem membuat tagihan otomatis saat siklus tiba."
	},
	{
		marker: "2",
		markerClass: "bg-teal-100 text-teal-700",
		chipClass: "bg-teal-100 text-teal-700",
		dotClass: "bg-teal-500",
		label: "Terkirim",
		body: "Kamu tap kirim, pesan tagihan masuk ke WhatsApp penghuni."
	},
	{
		marker: "3",
		markerClass: "bg-info-bg text-info-fg",
		chipClass: "bg-info-bg text-info-fg",
		dotClass: "bg-info",
		label: "Menunggu konfirmasi",
		body: "Penghuni unggah bukti transfer, menunggu kamu cek."
	},
	{
		marker: "✓",
		markerClass: "bg-success text-white",
		chipClass: "bg-success-bg text-success-fg",
		dotClass: "bg-success",
		label: "Lunas",
		body: "Kamu konfirmasi satu-tap, kuitansi terkirim, kas ter-update.",
		last: true
	}
];

export function StatusFlow() {
	return (
		<section className="container py-10 md:py-14 lg:py-18">
			<div className="border-border bg-card shadow-warm-md rounded-3xl border p-7 sm:p-11">
				<div className="grid items-center gap-x-12 gap-y-10 lg:grid-cols-2">
					{/* Copy */}
					<div>
						<p className="mb-3.5 text-xs font-bold tracking-widest text-teal-500 uppercase">
							Selalu jelas statusnya
						</p>
						<h2 className="mb-3.5 text-3xl leading-tight font-extrabold tracking-tight text-teal-900">
							Tidak ada tagihan yang menggantung
						</h2>
						<p className="text-warm-600 mb-6 text-base leading-relaxed text-pretty">
							Setiap tagihan bergerak melalui alur yang dapat diprediksi dengan batas
							waktu aman di tiap tahap. Kamu selalu tahu mana yang lunas, telat, atau
							perlu ditindaklanjuti.
						</p>
						<ul className="flex flex-col gap-3">
							{checks.map((check) => (
								<li key={check} className="flex items-center gap-3">
									<span className="bg-success-bg text-success flex size-5.5 items-center justify-center rounded-full text-xs font-extrabold">
										✓
									</span>
									<span className="text-warm-700 text-base font-medium">
										{check}
									</span>
								</li>
							))}
						</ul>
					</div>

					{/* Flow diagram */}
					<div className="flex flex-col">
						{steps.map((step) => (
							<div key={step.label} className="flex gap-4">
								<div className="flex flex-none flex-col items-center">
									<span
										className={`flex size-8.5 items-center justify-center rounded-full text-sm font-extrabold ${step.markerClass}`}
									>
										{step.marker}
									</span>
									{!step.last && <span className="bg-border my-1 w-0.5 flex-1" />}
								</div>
								<div className={step.last ? "" : "pb-5"}>
									<span
										className={`mb-1.5 inline-flex items-center gap-1.75 rounded-full px-3.25 py-1.5 text-sm font-bold ${step.chipClass}`}
									>
										<span
											className={`size-1.75 rounded-full ${step.dotClass}`}
										/>
										{step.label}
									</span>
									<p className="text-warm-600 text-sm leading-normal">
										{step.body}
									</p>
								</div>
							</div>
						))}

						{/* Late branch */}
						<div className="border-warning/20 bg-warning-bg/30 mt-4.5 flex items-start gap-3.25 rounded-lg border px-4.5 py-4">
							<Clock
								className="text-warning mt-px size-5 flex-none"
								strokeWidth={2}
							/>
							<div>
								<div className="mb-1.5 flex flex-wrap items-center gap-2">
									<span className="bg-warning-bg text-warning-fg inline-flex items-center gap-1.5 rounded-full px-2.75 py-1.25 text-xs font-bold">
										<span className="bg-warning size-1.5 rounded-full" />
										Telat
									</span>
									<span className="text-warm-300 text-sm">→</span>
									<span className="bg-danger-bg text-danger-fg inline-flex items-center gap-1.5 rounded-full px-2.75 py-1.25 text-xs font-bold">
										<span className="bg-danger size-1.5 rounded-full" />
										Menunggak
									</span>
								</div>
								<p className="text-sm leading-normal text-[#7a6a4e]">
									Kalau lewat jatuh tempo, tagihan ditandai <b>telat</b> dan
									reminder otomatis antre. Tanpa bayar sampai H+30, masuk laporan
									piutang sebagai <b>menunggak</b>.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
