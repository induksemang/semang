import Link from "next/link";
import { SectionHeading } from "../shared/section-heading";

const notes = [
	{ text: ["trf 500rb kmr 5", "…bulan apa?"], className: "mt-1.5 max-w-32 basis-28 -rotate-3" },
	{
		text: ["bukti tf.jpg", "(terselip di 400 chat)"],
		className: "max-w-36 basis-32 rotate-3"
	},
	{ text: ["catatan hlm. 12", "≠ mutasi bank"], className: "mt-1.5 max-w-30 basis-26 -rotate-2" }
];

export function Problems() {
	return (
		<section id="masalah" className="bg-warm-canvas scroll-mt-16 py-10 md:py-14 lg:py-18">
			<div className="container space-y-10 lg:space-y-12">
				<SectionHeading
					align="left"
					eyebrow="Kenapa Semang ada"
					title="Buku catatan & WhatsApp manual menyisakan tiga masalah yang sama."
				/>

				<div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-12">
					{/* Card 1: Sungkan menagih */}
					<article className="bg-card border-border flex flex-col gap-5 rounded-xl border p-5 md:col-span-2 md:p-6 lg:col-span-7 lg:row-span-2 lg:p-8.5">
						<div className="space-y-2.5">
							<p className="text-danger text-xs font-extrabold tracking-wider uppercase">
								Masalah №1 — yang paling sering
							</p>
							<h3 className="text-2xl font-extrabold tracking-tight text-teal-900">
								Sungkan menagih
							</h3>
							<p className="text-warm-600 max-w-120 text-base leading-relaxed">
								Menagih terasa tidak enak — akhirnya ditunda, dan tunggakan menumpuk
								diam-diam.
							</p>
						</div>
						<div className="bg-whatsapp-canvas flex flex-1 flex-col justify-center gap-2.5 rounded-lg p-4.5">
							<div className="bg-card shadow-chat max-w-[78%] space-y-0.5 self-start rounded-[4px_12px_12px_12px] px-3.5 py-2.5">
								<p className="text-xs font-bold text-teal-700">
									Semang · Kost Melati
								</p>
								<p className="text-warm-800 text-sm leading-relaxed">
									🧾 Halo Rara, tagihan Kamar 3 · Juli — <b>Rp1.500.000</b>, jatuh
									tempo 1 Juli.
								</p>
							</div>
							<div className="bg-whatsapp-bubble shadow-chat max-w-[60%] self-end rounded-[12px_4px_12px_12px] px-3.5 py-2.5">
								<p className="text-sm leading-relaxed text-black">
									Siap, kubayar sekarang 🙏
								</p>
							</div>
						</div>
						<div className="flex items-center gap-2.5">
							<span className="bg-primary flex size-5.5 flex-none items-center justify-center rounded-full text-xs font-extrabold text-white">
								✓
							</span>
							<p className="text-sm font-bold text-teal-700">
								Semang yang menagih, bukan kamu — atas nama kost-mu
							</p>
						</div>
					</article>

					{/* Card 2: Catatan berantakan */}
					<article className="bg-warning-bg border-warning/20 flex flex-col gap-4 rounded-xl border p-5 md:p-6 lg:col-span-5 lg:p-7.5">
						<div className="flex items-start justify-center -space-x-4 px-1 sm:-space-x-5 md:mb-3">
							{notes.map((note) => (
								<div
									key={note.text[0]}
									className={`bg-card border-border text-warm-500 min-w-0 shrink grow rounded-sm border px-2.5 py-1.5 text-[10px] leading-relaxed shadow-sm ${note.className}`}
								>
									{note.text[0]}
									<br />
									{note.text[1]}
								</div>
							))}
						</div>
						<div className="space-y-2">
							<h3 className="text-xl font-extrabold tracking-tight text-teal-900">
								Catatan berantakan
							</h3>
							<p className="text-warm-600 text-sm leading-relaxed">
								Bukti transfer terselip di ratusan chat, buku catatan tidak pernah
								cocok dengan rekening.
							</p>
						</div>
						<div className="mt-auto flex items-center gap-2.5">
							<span className="bg-primary flex size-5.5 flex-none items-center justify-center rounded-full text-xs font-extrabold text-white">
								✓
							</span>
							<p className="text-sm font-bold text-teal-700">
								Semua tercatat sendiri, rapi per kamar
							</p>
						</div>
					</article>

					{/* Card 3: Bukti transfer palsu */}
					<article className="flex flex-col gap-3.5 rounded-xl border border-teal-600 bg-teal-900 p-5 md:p-6 lg:col-span-5 lg:p-7.5">
						<span className="self-start rounded-md border border-dashed border-teal-500 px-2.5 py-1 font-mono text-[11px] font-bold tracking-wide text-teal-300">
							bukti-tf-edit-v2-FINAL.jpg
						</span>
						<div className="space-y-2">
							<h3 className="text-xl font-extrabold tracking-tight text-white">
								Bukti transfer palsu
							</h3>
							<p className="text-sm leading-relaxed text-teal-200">
								Mengecek mutasi satu-satu melelahkan, dan screenshot bukti kini bisa
								dipalsukan siapa saja.
							</p>
						</div>
						<div className="mt-auto flex items-center gap-2.5">
							<span className="bg-primary flex size-5.5 flex-none items-center justify-center rounded-full text-xs font-extrabold text-white">
								✓
							</span>
							<p className="text-sm font-bold text-teal-100">
								Pembayaran online, terkonfirmasi otomatis
							</p>
						</div>
					</article>
				</div>

				<Link
					href="/cara-kerja"
					className="text-primary inline-flex items-center gap-1.5 text-sm font-bold transition-colors hover:text-teal-600"
				>
					Lihat cara kerja lengkap →
				</Link>
			</div>
		</section>
	);
}
