import { SectionHeading } from "../shared/section-heading";
import { MarkPaidDemo } from "./mark-paid-demo";

const beforeVerification = [
	"Tagihan dibuat & terkirim otomatis via WhatsApp",
	"Reminder jatuh tempo untuk yang belum bayar",
	"Pencatatan, laporan bulanan, dan tandai lunas manual"
];

const afterVerification = [
	"Link bayar QRIS / VA / e-wallet di setiap tagihan",
	"Lunas tercatat otomatis begitu dana masuk — kuitansi terkirim sendiri",
	"Dana langsung ke rekeningmu — Semang tidak menahan uang"
];

export function Verification() {
	return (
		<section>
			<div className="container space-y-14 py-10 md:py-14 lg:py-18">
				<div className="flex flex-wrap items-start gap-x-14 gap-y-10">
					{/* Copy + kartu verifikasi */}
					<div className="min-w-0 flex-1 basis-85 space-y-7">
						<SectionHeading
							align="left"
							eyebrow="Verifikasi & pelunasan"
							title="Mulai tanpa verifikasi. Verifikasi saat kamu siap."
							description="Tagihan sudah terkirim otomatis sejak siklus pertama. Verifikasi hanya membuka satu hal: pembayaran online yang otomatis tercatat lunas."
						/>
						<div className="max-w-105 space-y-3.5 rounded-lg bg-teal-900 p-5 lg:space-y-4 lg:rounded-xl lg:p-6">
							<div className="font-mono text-[10px] font-bold tracking-widest text-teal-300">
								VERIFIKASI — SEKALI SAJA
							</div>
							<div className="flex flex-col gap-2.5 lg:gap-3">
								{["Foto KTP pemilik", "Nomor rekening tujuan dana"].map(
									(step, index) => (
										<div
											key={step}
											className="flex items-center gap-2.5 lg:gap-3"
										>
											<span className="bg-primary flex size-6 flex-none items-center justify-center rounded-full text-xs font-extrabold text-white lg:size-6.5">
												{index + 1}
											</span>
											<span className="text-sm font-bold text-white">
												{step}
											</span>
										</div>
									)
								)}
							</div>
							<p className="text-xs leading-relaxed text-teal-200">
								Diproses ± 1 hari kerja. Setelah itu tidak pernah diminta lagi.
							</p>
						</div>
					</div>

					{/* Dua kartu jalur */}
					<div className="flex min-w-0 flex-1 basis-135 flex-col gap-4 lg:gap-5">
						<div className="border-border bg-card space-y-3 rounded-md border p-5 lg:space-y-4 lg:rounded-xl lg:p-7">
							<div className="flex flex-wrap items-baseline justify-between gap-3">
								<div className="text-warm-400 font-mono text-xs font-bold tracking-widest">
									BERJALAN SEJAK HARI PERTAMA
								</div>
								<div className="bg-warm-50 text-warm-400 rounded-md px-2.5 py-0.5 text-xs font-bold whitespace-nowrap">
									tanpa verifikasi
								</div>
							</div>
							<div className="flex flex-col gap-3">
								{beforeVerification.map((item) => (
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
						<div className="space-y-3 rounded-md border-2 border-teal-200 bg-teal-50 p-5 lg:space-y-4 lg:rounded-xl lg:p-7">
							<div className="flex flex-wrap items-baseline justify-between gap-3">
								<div className="font-mono text-xs font-bold tracking-widest text-teal-700">
									TERBUKA SETELAH VERIFIKASI
								</div>
								<div className="rounded-md bg-teal-100 px-2.5 py-0.5 text-xs font-bold whitespace-nowrap text-teal-700">
									otomasi penuh
								</div>
							</div>
							<div className="flex flex-col gap-3">
								{afterVerification.map((item) => (
									<div key={item} className="flex items-baseline gap-3">
										<span className="flex-none text-sm font-extrabold text-teal-700">
											＋
										</span>
										<span className="text-sm leading-relaxed font-semibold text-teal-900">
											{item}
										</span>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>

				{/* Bayar tunai tetap bisa */}
				<div className="flex flex-wrap items-center gap-x-12 gap-y-8">
					<div className="min-w-0 flex-1 basis-85 space-y-4.5">
						<div className="space-y-2.5">
							<h3 className="text-lg font-extrabold tracking-tight text-balance text-teal-900 lg:text-2xl">
								&ldquo;Bu, saya bayar cash aja ya&rdquo; — tetap bisa. 🤝
							</h3>
							<p className="text-warm-600 text-sm leading-relaxed">
								Ada penyewa yang tetap bayar tunai atau transfer langsung ke
								rekeningmu? Tinggal tandai lunas sendiri — pilih caranya, dan sistem
								mengingatkan apa yang perlu kamu cek dulu. Coba klik di samping.
							</p>
						</div>
						<div className="flex items-center gap-2.5">
							<span className="bg-primary flex size-5 flex-none items-center justify-center rounded-full text-xs font-extrabold text-white lg:size-5.5">
								✓
							</span>
							<span className="text-xs font-bold text-teal-700">
								Di laporan, pembayaran online dan yang kamu tandai sendiri tetap
								bisa dibedakan
							</span>
						</div>
					</div>
					<MarkPaidDemo />
				</div>
			</div>
		</section>
	);
}
