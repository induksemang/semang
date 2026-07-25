"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { SectionHeading } from "../shared/section-heading";

const faqs = [
	{
		q: "Apakah uang sewa lewat Semang dulu?",
		a: "Tidak, tidak pernah. Pembayaran penyewa langsung masuk ke rekeningmu sendiri melalui jalur pembayaran resmi. Semang hanya mencatat dan mengonfirmasi — tidak menampung uang."
	},
	{
		q: "Kenapa harga dihitung per kamar terisi, bukan total kamar?",
		a: "Supaya kost yang belum penuh tidak membayar untuk kamar kosong. Hitungannya sederhana: berapa kamar yang terisi pada tanggal penagihan bulan itu."
	},
	{
		q: "Penyewa saya masih suka bayar tunai. Bagaimana?",
		a: "Bisa. Kamu tinggal menandai tagihan sebagai lunas dengan pilihan tunai atau transfer langsung — catatan tetap rapi, dan reminder untuk tagihan itu berhenti sendiri."
	},
	{
		q: "Apakah ada biaya tersembunyi atau markup pembayaran?",
		a: "Tidak. Harga per kamar terisi tanpa komisi tersembunyi, dan tidak ada markup atas biaya pembayaran online yang dibebankan ke penyewa."
	},
	{
		q: "Apakah penyewa harus install aplikasi?",
		a: "Tidak. Penyewa hanya menerima pesan WhatsApp berisi tagihan dan link pembayaran — dibuka di browser, bayar, selesai. Kuitansi digital juga diakses lewat link."
	},
	{
		q: "Bagaimana kalau saya berhenti berlangganan?",
		a: "Akunmu otomatis pindah ke paket Gratis — semua data tetap utuh dan tetap bisa diekspor kapan saja."
	}
];

export function Faq() {
	/* Akordeon hanya di mobile; mulai md: semua jawaban tampil terbuka. */
	const [openIndex, setOpenIndex] = useState(0);

	return (
		<section className="container max-w-3xl space-y-6 py-10 md:space-y-8 md:py-14 lg:py-18">
			<SectionHeading
				align="left"
				eyebrow="Pertanyaan umum"
				title="Yang sering ditanyakan pemilik kost"
			/>

			<div className="flex flex-col gap-2.5 md:gap-3.5">
				{faqs.map((faq, index) => {
					const open = openIndex === index;
					return (
						<div
							key={faq.q}
							className={cn(
								"md:border-border md:bg-card md:shadow-warm-sm rounded-lg border transition-colors duration-300",
								open ? "border-teal-200 bg-teal-50" : "border-border bg-card"
							)}
						>
							<button
								type="button"
								className="flex w-full items-center justify-between gap-3 py-3.5 pr-4 pl-4.5 text-left md:pointer-events-none md:px-6 md:pt-5.5 md:pb-0"
								onClick={() => setOpenIndex(open ? -1 : index)}
								aria-expanded={open}
								aria-controls={`faq-panel-${index}`}
							>
								<h3 className="text-sm font-bold text-teal-900 md:text-base">
									{faq.q}
								</h3>
								<span
									aria-hidden
									className={cn(
										"flex size-6.5 flex-none items-center justify-center rounded-full transition-colors duration-300 md:hidden",
										open ? "bg-primary text-white" : "text-primary bg-teal-50"
									)}
								>
									<svg viewBox="0 0 12 12" fill="none" className="size-3">
										<path
											d="M1.5 6h9"
											stroke="currentColor"
											strokeWidth={2}
											strokeLinecap="round"
										/>
										<path
											d="M6 1.5v9"
											stroke="currentColor"
											strokeWidth={2}
											strokeLinecap="round"
											style={{
												transformBox: "fill-box",
												transformOrigin: "center"
											}}
											className={cn(
												"transition-transform duration-300 ease-out",
												open && "scale-y-0"
											)}
										/>
									</svg>
								</span>
							</button>
							<div
								id={`faq-panel-${index}`}
								className={cn(
									"grid transition-[grid-template-rows] duration-300 ease-out md:grid-rows-[1fr]",
									open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
								)}
							>
								<div className="overflow-hidden">
									<div className="px-4.5 pb-4 md:px-6 md:pt-2 md:pb-5.5">
										<div className="mb-3 h-px bg-teal-100 md:hidden" />
										<p className="text-warm-600 text-sm leading-relaxed">
											{faq.a}
										</p>
									</div>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</section>
	);
}
