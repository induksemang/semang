import Image from "next/image";
import { cn } from "@/lib/utils";

type LogoLockupProps = {
	/** `light` untuk latar terang, `dark` untuk latar teal-900. */
	tone?: "light" | "dark";
	className?: string;
};

export function LogoLockup({ tone = "light", className }: LogoLockupProps) {
	const dark = tone === "dark";
	return (
		<span className={cn("flex items-center gap-2.75", className)}>
			{/* Dua mark ditumpuk lalu disilangkan opacity-nya: src Image tidak bisa
			    ditransisikan, jadi kalau ditukar begitu saja mark-nya menyentak di
			    tengah gradasi warna nav (mis. saat keluar dari section gelap). */}
			<span className="relative block size-8 shrink-0">
				<Image
					src="/logo.svg"
					alt=""
					width={32}
					height={32}
					className={cn(
						"absolute inset-0 size-8 rounded-[4px] transition-opacity duration-300 ease-out",
						dark && "opacity-0"
					)}
				/>
				<Image
					src="/logo-white.svg"
					alt=""
					width={32}
					height={32}
					className={cn(
						"absolute inset-0 size-8 rounded-[4px] transition-opacity duration-300 ease-out",
						!dark && "opacity-0"
					)}
				/>
			</span>
			<span
				className={cn(
					"text-lg font-extrabold tracking-tight transition-colors duration-300 ease-out",
					dark ? "text-white" : "text-teal-900"
				)}
			>
				Semang
			</span>
		</span>
	);
}
