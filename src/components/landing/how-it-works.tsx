import { Check, MessageSquare, Send, Upload } from "lucide-react";
import { SectionHeading } from "./section-heading";

const steps = [
	{
		num: "01",
		icon: MessageSquare,
		title: "Tagihan siap kirim",
		body: "Tiap siklus, tagihan ter-generate otomatis dan antre dengan pesan WA sudah terketik rapi."
	},
	{
		num: "02",
		icon: Send,
		title: "Tap → WhatsApp",
		body: "Tekan satu tombol, WhatsApp terbuka dengan pesan siap kirim. Kamu cukup tekan kirim."
	},
	{
		num: "03",
		icon: Upload,
		title: "Penghuni unggah bukti",
		body: "Penghuni transfer langsung ke rekeningmu, lalu unggah bukti lewat tautan — tanpa install apa pun."
	},
	{
		num: "04",
		icon: Check,
		title: "Konfirmasi satu-tap",
		body: "Satu ketukan: pembayaran tercatat, kuitansi digital terkirim, laporan kas ter-update sendiri."
	}
];

export function HowItWorks() {
	return (
		<section id="how-it-works" className="scroll-mt-16 bg-teal-700">
			<div className="container py-10 md:py-14 lg:py-18">
				<SectionHeading
					tone="dark"
					align="left"
					eyebrow="Satu siklus, empat langkah"
					title="Sepuluh tagihan selesai dalam dua menit"
					description="Kamu tinggal menekan kirim. Sistem yang menyiapkan pesan, mengingatkan, dan mencatat — uang tetap mengalir langsung ke rekeningmu."
				/>
				<div className="mt-12 grid gap-4.5 sm:grid-cols-2 lg:grid-cols-4">
					{steps.map((step) => (
						<article
							key={step.num}
							className="rounded-xl border border-teal-600 bg-teal-800 p-6.5"
						>
							<div className="mb-4 text-sm font-extrabold text-teal-300">
								{step.num}
							</div>
							<div className="bg-warm-50 mb-4 flex size-11.5 items-center justify-center rounded-md text-teal-700">
								<step.icon className="size-6" strokeWidth={2} />
							</div>
							<h3 className="mb-2 text-lg font-bold text-white">{step.title}</h3>
							<p className="text-sm leading-normal text-teal-200">{step.body}</p>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
