"use client";

import Link from "next/link";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

// Ditulis utuh (bukan template literal) supaya terbaca scanner Tailwind.
export const MENU_CLIP_OPEN = "[clip-path:inset(0_0_0_0)]";
export const MENU_CLIP_CLOSED = "[clip-path:inset(0_0_100%_0)]";

/** Durasi tirai. Harus sama dengan `duration-500` pada panel di bawah. */
export const MENU_MS = 500;

/** Tinggi nav mobile — panel mulai persis di bawahnya. */
const MENU_TOP = "pt-14.5";

type MobileMenuProps = {
	links: { href: string; label: string }[];
	pathname: string;
	open: boolean;
	onClose: () => void;
};

function ChevronGlyph() {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2.2"
			strokeLinecap="butt"
			strokeLinejoin="miter"
			aria-hidden="true"
			className="size-4 text-teal-500"
		>
			<path d="m9 5 7 7-7 7" />
		</svg>
	);
}

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

	// Kebijakan Privasi hanya muncul di menu mobile — di desktop tempatnya di footer.
	const items = [...links, { href: "/privasi", label: "Kebijakan Privasi" }];

	return (
		<div
			id="menu-mobile"
			className={cn(
				"fixed inset-x-0 top-0 z-60 flex h-dvh flex-col bg-teal-900 transition-[clip-path] duration-500 lg:hidden",
				MENU_TOP,
				// Buka melambat di ujung, tutup justru memburu ke ujung. Selain lazim untuk
				// enter/exit, `ease-in` bikin tirai tetap menutupi strip nav sampai ~465ms —
				// tanpa itu strip nav yang transparan menyingkap isi halaman ~145ms terakhir.
				open ? "ease-out" : "ease-in",
				open ? MENU_CLIP_OPEN : MENU_CLIP_CLOSED
			)}
			role="dialog"
			aria-modal="true"
			aria-label="Menu navigasi"
			inert={!open}
		>
			<nav className="flex min-h-0 flex-1 flex-col justify-center-safe overflow-y-auto">
				{items.map((item, index) => {
					const active = pathname === item.href;
					return (
						<Link
							key={item.href}
							href={item.href}
							aria-current={active ? "page" : undefined}
							className={cn(
								"focus-ring grid shrink-0 grid-cols-[26px_minmax(0,1fr)_auto] items-center gap-3.5 border-b border-teal-600 px-5 py-4.5 transition-all duration-500 ease-out last:border-b-0",
								active && "border-l-teal-350 border-l-[3px] bg-teal-800 pl-[17px]",
								open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
							)}
							style={{ transitionDelay: open ? `${120 + index * 55}ms` : "0ms" }}
							onClick={onClose}
						>
							<span
								className={cn(
									"font-mono text-[11px] leading-none font-bold tracking-widest",
									active ? "text-teal-350" : "text-teal-400"
								)}
							>
								{String(index + 1).padStart(2, "0")}
							</span>
							<span
								className={cn(
									"text-[22px] font-extrabold tracking-tight",
									active ? "text-white" : "text-teal-100"
								)}
							>
								{item.label}
							</span>
							{!active && <ChevronGlyph />}
						</Link>
					);
				})}
			</nav>

			<div
				className={cn(
					"flex shrink-0 flex-col gap-3 border-t border-teal-600 p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] transition-all duration-500 ease-out",
					open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
				)}
				style={{ transitionDelay: open ? `${120 + items.length * 55}ms` : "0ms" }}
			>
				<Link
					href="/register"
					className="bg-brand focus-ring rounded-[4px] py-3.75 text-center text-base font-bold text-white"
					onClick={onClose}
				>
					Coba gratis 60 hari
				</Link>
				<Link
					href="/login"
					className="focus-ring rounded-[4px] border-[1.5px] border-teal-600 py-3.75 text-center text-base font-bold text-teal-100"
					onClick={onClose}
				>
					Masuk
				</Link>
				<p className="mt-1 font-mono text-[10.5px] leading-relaxed font-semibold tracking-wider text-teal-400 uppercase">
					Tanpa kartu kredit · fitur Pro terbuka selama trial
				</p>
			</div>
		</div>
	);
}
