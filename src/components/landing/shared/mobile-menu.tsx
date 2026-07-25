"use client";

import Link from "next/link";
import { useEffect } from "react";
import { cn, scrollToHash } from "@/lib/utils";

// Pusat = tengah tombol burger: x = container padding 24px + setengah tombol 19px,
// y = nav py-3 (12px) + 19px. Radius absolut (bukan persen) supaya lingkaran
// identik di nav dan panel, meski tinggi kedua elemen jauh berbeda.
// Ditulis utuh (bukan template literal) supaya terbaca scanner Tailwind.
export const MENU_CLIP_OPEN = "[clip-path:circle(1200px_at_calc(100%_-_43px)_31px)]";
export const MENU_CLIP_CLOSED = "[clip-path:circle(0px_at_calc(100%_-_43px)_31px)]";

type MobileMenuProps = {
	links: { href: string; label: string }[];
	pathname: string;
	open: boolean;
	onClose: () => void;
};

export function MobileMenu({ links, pathname, open, onClose }: MobileMenuProps) {
	useEffect(() => {
		if (!open) return;

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
	}, [open, onClose]);

	return (
		<div
			id="menu-mobile"
			className={cn(
				// ponytail: clip-path tumbuh dari titik tombol burger di nav (kanan atas)
				"fixed inset-0 z-60 flex flex-col bg-teal-900 pt-16 transition-[clip-path] duration-500 ease-out md:hidden",
				open ? MENU_CLIP_OPEN : MENU_CLIP_CLOSED
			)}
			role="dialog"
			aria-modal="true"
			aria-label="Menu navigasi"
			inert={!open}
		>
			<nav className="container flex flex-1 flex-col justify-center gap-1">
				{links.map((link, index) => (
					<Link
						key={link.href}
						href={link.href}
						className={cn(
							"flex items-baseline gap-3 py-2.5 transition-all duration-500 ease-out",
							open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
						)}
						style={{ transitionDelay: open ? `${120 + index * 55}ms` : "0ms" }}
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

			<div
				className={cn(
					"container flex flex-col gap-2.5 pb-5.5 transition-all duration-500 ease-out",
					open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
				)}
				style={{ transitionDelay: open ? `${120 + links.length * 55}ms` : "0ms" }}
			>
				<a
					href="#daftar"
					className="shadow-warm-lg rounded-lg bg-white py-4 text-center text-base font-extrabold text-teal-900"
					onClick={(event) => {
						scrollToHash(event);
						onClose();
					}}
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
