"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

type MobileMenuProps = {
	links: { href: string; label: string }[];
	pathname: string;
	onClose: () => void;
};

export function MobileMenu({ links, pathname, onClose }: MobileMenuProps) {
	useEffect(() => {
		const { style } = document.body;
		const previous = style.overflow;
		style.overflow = "hidden";

		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") onClose();
		};
		document.addEventListener("keydown", onKeyDown);

		return () => {
			style.overflow = previous;
			document.removeEventListener("keydown", onKeyDown);
		};
	}, [onClose]);

	return (
		<div
			id="menu-mobile"
			className="fixed inset-0 z-60 flex flex-col bg-teal-900 md:hidden"
			role="dialog"
			aria-modal="true"
			aria-label="Menu navigasi"
		>
			<div className="container flex items-center justify-between py-3">
				<Link href="/" className="flex items-center gap-2.5" onClick={onClose}>
					<Image
						src="/logo-white.svg"
						alt="Semang"
						width={38}
						height={38}
						className="size-8.5 rounded-md"
					/>
					<span className="text-lg font-extrabold tracking-tight text-white">Semang</span>
				</Link>
				<button
					type="button"
					className="flex size-9.5 items-center justify-center rounded-md border border-teal-600 bg-white"
					onClick={onClose}
					aria-label="Tutup menu"
				>
					<svg
						className="size-3.5 text-teal-900"
						viewBox="0 0 14 14"
						fill="none"
						aria-hidden
					>
						<path
							d="M2 2 12 12M12 2 2 12"
							stroke="currentColor"
							strokeWidth={2}
							strokeLinecap="round"
						/>
					</svg>
				</button>
			</div>

			<nav className="container flex flex-1 flex-col justify-center gap-1">
				{links.map((link, index) => (
					<Link
						key={link.href}
						href={link.href}
						className="flex items-baseline gap-3 py-2.5"
						onClick={onClose}
					>
						<span className="font-mono text-xs font-bold text-teal-300">
							{String(index + 1).padStart(2, "0")}
						</span>
						<span
							className={cn(
								"text-4xl font-extrabold tracking-tight",
								pathname === link.href ? "text-white" : "text-teal-200"
							)}
						>
							{link.label}
						</span>
					</Link>
				))}
			</nav>

			<div className="container flex flex-col gap-2.5 pb-5.5">
				<a
					href="#daftar"
					className="shadow-warm-lg rounded-lg bg-white py-4 text-center text-base font-extrabold text-teal-900"
					onClick={onClose}
				>
					Coba gratis — 5 menit
				</a>
				<Link
					href="/login"
					className="rounded-lg border-2 border-teal-600 bg-white/10 py-3.5 text-center text-base font-bold text-teal-100"
					onClick={onClose}
				>
					Masuk
				</Link>
				<p className="text-center text-xs font-semibold text-teal-300">
					Gratis sampai 5 kamar · tanpa kartu kredit
				</p>
			</div>
		</div>
	);
}
