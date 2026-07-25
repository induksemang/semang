import Image from "next/image";

/** Percakapan WhatsApp contoh — dipakai polos di mobile, di dalam bezel ponsel di desktop. */
export function WhatsappChat() {
	return (
		<div className="bg-whatsapp-canvas flex h-full flex-col overflow-hidden">
			{/* WA header */}
			<div className="flex items-center gap-2.5 bg-teal-700 px-3.5 py-3 md:px-4 md:pt-4 md:pb-3.5">
				<Image
					src="/logo.svg"
					alt=""
					width={34}
					height={34}
					className="size-7.5 flex-none rounded-full md:size-8.5"
				/>
				<div className="min-w-0 flex-1">
					<div className="flex items-center gap-1.5">
						<span className="text-sm font-bold text-white">Semang</span>
						<span className="flex size-3 flex-none items-center justify-center rounded-full bg-teal-300 text-[7px] font-extrabold text-teal-900">
							✓
						</span>
					</div>
					<div className="text-xs text-teal-300">Akun bisnis</div>
				</div>
			</div>

			{/* Chat */}
			<div className="flex flex-1 flex-col gap-2.5 px-3 py-3.5 md:px-3.5 md:py-4.5">
				<span className="bg-warm-50 text-warm-400 hidden self-center rounded-lg px-2.5 py-1 text-[10px] font-bold md:block">
					Kamis, 25 Juni
				</span>
				<div className="bg-card shadow-chat max-w-[92%] space-y-2 self-start rounded-[4px_14px_14px_14px] px-3.5 py-3 md:max-w-[88%]">
					<div className="space-y-1.5">
						<div className="text-xs font-bold text-black">
							🧾 Tagihan Sewa · Kost Melati
						</div>
						<div className="text-xs leading-normal text-black">
							Halo Rara, ini tagihan sewa kamu:
							<br />
							<br />
							Kamar 3 · Periode Juli 2026
							<br />
							Nominal: <b>Rp1.500.000</b>
							<br />
							Jatuh tempo: 1 Juli 2026
							<br />
							<br />
							Bayar lewat QRIS, VA, atau e-wallet:
						</div>
					</div>
					<div className="space-y-1">
						<div className="text-info text-xs font-semibold break-all">
							semang.id/bayar/k3-92fa
						</div>
						<div className="text-right text-[10px] text-gray-500">08.00</div>
					</div>
				</div>
				<div className="bg-whatsapp-bubble shadow-chat max-w-[80%] space-y-1 self-end rounded-[14px_4px_14px_14px] px-3.5 py-2.75">
					<div className="text-xs leading-normal text-black">
						Sudah kubayar barusan pakai QRIS ya 🙏
					</div>
					<div className="text-right text-[10px] text-gray-500">08.41 ✓✓</div>
				</div>
				<div className="bg-card shadow-chat max-w-[92%] space-y-1 self-start rounded-[4px_14px_14px_14px] px-3.5 py-2.75 md:max-w-[88%]">
					<div className="text-xs leading-normal text-black">
						<b>✓ Pembayaran diterima — lunas</b>
						<br />
						Rp1.500.000 · Kamar 3 · Juli 2026.
						<br />
						Kuitansi digital:{" "}
						<span className="text-info font-semibold">semang.id/kuitansi/k3-92fa</span>
					</div>
					<div className="text-right text-[10px] text-gray-500">08.42</div>
				</div>
			</div>
		</div>
	);
}
