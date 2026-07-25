"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import { cn, scrollToHash } from "@/lib/utils";
import { MENU_CLIP_CLOSED, MENU_CLIP_OPEN, MobileMenu } from "./mobile-menu";

const links = [
	{ href: "/", label: "Beranda" },
	{ href: "/fitur", label: "Fitur" },
	{ href: "/cara-kerja", label: "Cara kerja" },
	{ href: "/harga", label: "Harga" },
	{ href: "/keamanan", label: "Keamanan" }
];

export function Nav() {
	const [open, setOpen] = useState(false);
	const pathname = usePathname();
	const close = useCallback(() => setOpen(false), []);

	return (
		<>
			{/* nav duduk di atas overlay menu supaya tombol burger tetap satu elemen */}
			<nav className="bg-background/90 sticky top-0 z-70 backdrop-blur-md">
				<div className="container flex items-center justify-between py-3 md:py-3.5">
					<Link href="/" className="flex items-center gap-2.5 md:gap-3">
						<Image
							src="/logo.svg"
							alt="Semang"
							width={38}
							height={38}
							className="size-8 rounded-md md:size-9.5"
						/>
						<span className="text-lg font-extrabold tracking-tight text-teal-900 md:text-xl">
							Semang
						</span>
					</Link>

					{/* Desktop nav */}
					<div className="hidden items-center gap-x-4 md:flex lg:gap-x-6">
						{links.map((link) => (
							<Link
								key={link.href}
								href={link.href}
								className={cn(
									"hover:text-primary text-sm transition-colors",
									pathname === link.href
										? "text-primary font-extrabold"
										: "text-warm-700 font-semibold"
								)}
							>
								{link.label}
							</Link>
						))}
						<a
							href="#daftar"
							onClick={scrollToHash}
							className="shadow-warm-teal bg-primary text-primary-foreground rounded-md px-3.5 py-2.5 text-sm font-bold transition-colors hover:bg-teal-600 lg:px-4.5"
						>
							Coba gratis
						</a>
					</div>

					{/* Mobile actions */}
					<div className="flex items-center gap-2.5 md:hidden">
						<a
							href="#daftar"
							onClick={scrollToHash}
							className={cn(
								"bg-primary text-primary-foreground rounded-md px-3.5 py-2.25 text-sm font-bold",
								open && "pointer-events-none"
							)}
							tabIndex={open ? -1 : undefined}
						>
							Coba gratis
						</a>
						<button
							type="button"
							className={cn(
								// tombol satu-satunya elemen yang tetap di atas wipe, jadi morph-nya terlihat penuh
								"relative z-10 flex size-9.5 items-center justify-center rounded-md border transition-colors duration-500 ease-out",
								open ? "border-teal-600 bg-white" : "border-border bg-card"
							)}
							onClick={() => setOpen((value) => !value)}
							aria-label={open ? "Tutup menu" : "Buka menu"}
							aria-expanded={open}
							aria-controls="menu-mobile"
						>
							<span
								className={cn(
									"absolute h-0.5 w-4 rounded-full transition-all duration-500 ease-out",
									open ? "rotate-45 bg-teal-900" : "bg-warm-700 -translate-y-1"
								)}
							/>
							<span
								className={cn(
									"absolute h-0.5 w-4 rounded-full transition-all duration-500 ease-out",
									open ? "-rotate-45 bg-teal-900" : "bg-warm-700 translate-y-1"
								)}
							/>
						</button>
					</div>
				</div>

				{/* garis bawah ditaruh di dalam padding box supaya ikut tersapu wipe */}
				<span className="bg-border absolute inset-x-0 bottom-0 h-px" />

				{/* salinan gelap header: murni visual, disapu lingkaran yang sama dengan panel menu */}
				<div
					aria-hidden
					className={cn(
						// flex items-center: logo ikut center pada tinggi nav, bukan pada tinggi
						// kontennya sendiri, supaya sejajar persis dengan logo di header light
						"pointer-events-none absolute inset-0 flex items-center bg-teal-900 transition-[clip-path] duration-500 ease-out md:hidden",
						open ? MENU_CLIP_OPEN : MENU_CLIP_CLOSED
					)}
				>
					<div className="container">
						<div className="flex items-center gap-2.5">
							<Image
								src="/logo-white.svg"
								alt=""
								width={38}
								height={38}
								className="size-8 rounded-md"
							/>
							<span className="text-lg font-extrabold tracking-tight text-white">
								Semang
							</span>
						</div>
					</div>
				</div>
			</nav>

			<MobileMenu links={links} pathname={pathname} open={open} onClose={close} />
		</>
	);
}
