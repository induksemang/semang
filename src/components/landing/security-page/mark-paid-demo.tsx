"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const methods = {
	Tunai: "Pembayaran tunai tidak meninggalkan bukti apa pun — pastikan uangnya benar-benar sudah kamu terima sebelum lanjut.",
	"Transfer langsung":
		"Cek dulu rekeningmu — pastikan transfernya benar-benar sudah masuk sebelum menandai lunas."
} as const;

type Method = keyof typeof methods;

export function MarkPaidDemo() {
	const [method, setMethod] = useState<Method>("Tunai");

	return (
		<div className="relative max-w-140 min-w-0 flex-1 basis-95 pt-3.5 pb-2.5">
			<div className="bg-warning-bg border-warning/20 text-warning-fg shadow-warm-sm absolute -top-1 right-4.5 z-2 rotate-3 rounded-lg border px-3 py-1.5 text-xs font-extrabold">
				coba klik! 👆
			</div>
			<div className="border-border bg-card shadow-warm-lg -rotate-1 space-y-3.5 rounded-lg border-2 p-5 lg:space-y-4 lg:rounded-xl lg:p-6.5">
				<div className="text-warm-400 font-mono text-[10px] font-bold tracking-widest">
					TANDAI LUNAS — KAMAR 7 · JULI
				</div>
				<div className="flex gap-2.5">
					{(Object.keys(methods) as Method[]).map((option) => (
						<button
							key={option}
							type="button"
							onClick={() => setMethod(option)}
							className={cn(
								"flex-1 cursor-pointer rounded-md border-2 py-2.5 text-xs font-bold transition-colors",
								method === option
									? "border-primary bg-primary text-white"
									: "border-input text-warm-600 bg-white hover:bg-teal-50"
							)}
						>
							{option}
						</button>
					))}
				</div>
				<div className="bg-warning-bg flex items-start gap-2.5 rounded-md px-4 py-3.5 lg:gap-3 lg:px-4.5 lg:py-4">
					<span className="bg-warning flex size-5 flex-none items-center justify-center rounded-full text-xs font-extrabold text-white lg:size-5.5">
						!
					</span>
					<p className="text-warning-fg text-xs leading-relaxed font-semibold">
						{methods[method]}
					</p>
				</div>
			</div>
		</div>
	);
}
