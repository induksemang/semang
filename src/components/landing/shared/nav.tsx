"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { LogoLockup } from "./logo";
import { MENU_MS, MobileMenu } from "./mobile-menu";

const links = [
	{ href: "/", label: "Beranda" },
	{ href: "/fitur", label: "Fitur" },
	{ href: "/cara-kerja", label: "Cara kerja" },
	{ href: "/harga", label: "Harga" },
	{ href: "/keamanan", label: "Keamanan" }
];

type NavProps = {
	/**
	 * Halaman yang dibuka dengan section gelap (`data-nav-dark`): nav ikut gelap
	 * sampai section itu tergulung habis di balik nav, lalu balik ke warna default.
	 */
	dark?: boolean;
};

export function Nav({ dark = false }: NavProps) {
	const [open, setOpen] = useState(false);
	const [onDark, setOnDark] = useState(dark);
	// Tirai panel membentang dari tepi atas layar, jadi strip nav ikut tersapu olehnya —
	// asalkan latar nav sendiri sedang padam. Nyalakan lagi hanya setelah tirai benar-benar
	// habis, bukan pada detik tombol ditekan.
	const [underCurtain, setUnderCurtain] = useState(false);
	const navRef = useRef<HTMLElement>(null);
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const pathname = usePathname();

	const toggleMenu = useCallback((next: boolean) => {
		setOpen(next);
		if (timerRef.current) clearTimeout(timerRef.current);
		if (next) {
			setUnderCurtain(true);
		} else {
			timerRef.current = setTimeout(() => setUnderCurtain(false), MENU_MS);
		}
	}, []);
	const close = useCallback(() => toggleMenu(false), [toggleMenu]);

	const tone = onDark || underCurtain;

	useEffect(() => {
		const nav = navRef.current;
		const section = document.querySelector("[data-nav-dark]");
		if (!dark || !nav || !section) return;

		// Root dipangkas setinggi nav dari atas: section dianggap "lewat" tepat saat
		// tepi bawahnya menyelinap ke balik nav yang sticky.
		const observer = new IntersectionObserver(([entry]) => setOnDark(entry.isIntersecting), {
			rootMargin: `-${nav.offsetHeight}px 0px 0px 0px`
		});
		observer.observe(section);
		return () => observer.disconnect();
	}, [dark]);

	return (
		<>
			<nav
				ref={navRef}
				className={cn(
					"sticky top-0 z-70 border-y",
					tone ? "border-teal-600" : "border-warm-200",
					// desktop tak pernah membuka menu; jaga-jaga kalau layar dilebarkan saat terbuka
					underCurtain && !onDark && "lg:border-warm-200"
				)}
			>
				{/* Latar nav sebagai lapisan tersendiri, bukan `bg-*` di elemen nav: warnanya
				    bisa bergradasi 500ms saat keluar-masuk section gelap tanpa mengganggu
				    lapisan tirai di atasnya. */}
				<div
					aria-hidden
					className={cn(
						"absolute inset-0 -z-10 transition-colors duration-500 ease-out",
						onDark ? "bg-teal-900" : "bg-warm-canvas"
					)}
				/>

				{/* Sambungan strip nav ke tirai. Tirai panel berada di bawah nav (z-60 < z-70),
				    jadi ia tak pernah bisa menyapu strip ini — dulu latar nav dipadamkan supaya
				    seolah tersapu, tapi itu menyingkap isi halaman selama satu frame sebelum
				    tirai sempat turun. Sekarang strip langsung digelapkan oleh lapisannya sendiri:
				    warnanya sama dengan tirai, `opacity` tanpa transition jadi ganti-tutupnya
				    seketika, dan latar di baliknya tak pernah bolong. */}
				<div
					aria-hidden
					className={cn(
						"absolute inset-0 -z-10 bg-teal-900 lg:hidden",
						underCurtain ? "opacity-100" : "opacity-0"
					)}
				/>

				<div className="flex items-stretch justify-between lg:container lg:gap-6">
					<Link href="/" className="focus-ring px-4 py-3.25 lg:px-0 lg:py-4">
						<LogoLockup tone={tone ? "dark" : "light"} />
					</Link>

					<div className="hidden items-stretch lg:flex">
						{links.map((link) => {
							const active = pathname === link.href;
							return (
								<Link
									key={link.href}
									href={link.href}
									aria-current={active ? "page" : undefined}
									className={cn(
										"focus-ring flex items-center border-l px-4.5 text-sm transition-[color] duration-200 ease-out",
										onDark ? "border-teal-600" : "border-warm-200",
										active
											? cn(
													"font-extrabold",
													onDark
														? "text-white shadow-[inset_0_-3px_0_var(--color-teal-350)]"
														: "text-teal-900 shadow-[inset_0_-3px_0_var(--color-brand)]"
												)
											: cn(
													"font-semibold",
													onDark
														? "text-teal-200 hover:text-white"
														: "text-warm-700 hover:text-teal-600"
												)
									)}
								>
									{link.label}
								</Link>
							);
						})}
						<Link
							href="/register"
							className="bg-brand flex items-center px-5.5 text-sm font-bold text-white transition-colors hover:bg-teal-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-900"
						>
							Coba gratis
						</Link>
					</div>

					<div className="flex items-stretch lg:hidden">
						<Link
							href="/register"
							className={cn(
								// ikut padam bersama latar nav: menu terbuka menyisakan logo + tombol tutup saja
								"bg-brand flex items-center border-l px-4 text-[12.5px] font-bold text-white transition-opacity duration-200 ease-out focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-white",
								tone ? "border-teal-600" : "border-warm-200",
								underCurtain && "pointer-events-none opacity-0"
							)}
							tabIndex={open ? -1 : undefined}
						>
							Coba gratis
						</Link>
						<button
							type="button"
							className={cn(
								// sel satu-satunya elemen yang tetap di atas tirai, jadi morph-nya terlihat penuh.
								// 58px = tinggi nav (py-3.25 + mark 32px), jadi selnya bujur sangkar —
								// aspect-square tidak dipakai karena lebarnya baru terhitung setelah flex
								// menyusun barisnya, dan sel jadi meluber keluar layar.
								"focus-ring relative z-10 flex w-14.5 items-center justify-center border-l",
								tone ? "border-teal-600" : "border-warm-200"
							)}
							onClick={() => toggleMenu(!open)}
							aria-label={open ? "Tutup menu" : "Buka menu"}
							aria-expanded={open}
							aria-controls="menu-mobile"
						>
							{/* bentuk mengikuti `open` (harus langsung membalas ketukan), warna mengikuti
							    tirai (harus tetap terang selama masih ada latar gelap di belakangnya) */}
							<span
								className={cn(
									"absolute h-0.5 w-4.25 transition-all duration-500 ease-out",
									open ? "rotate-45" : "-translate-y-[3.5px]",
									tone ? "bg-teal-100" : "bg-warm-700"
								)}
							/>
							<span
								className={cn(
									"absolute h-0.5 w-4.25 transition-all duration-500 ease-out",
									open ? "-rotate-45" : "translate-y-[3.5px]",
									tone ? "bg-teal-100" : "bg-warm-700"
								)}
							/>
						</button>
					</div>
				</div>
			</nav>

			<MobileMenu links={links} pathname={pathname} open={open} onClose={close} />
		</>
	);
}
