"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./mobile-menu";

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
			<nav className="border-border bg-background/90 sticky top-0 z-50 border-b backdrop-blur-md">
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
							className="shadow-warm-teal bg-primary text-primary-foreground rounded-md px-3.5 py-2.5 text-sm font-bold transition-colors hover:bg-teal-600 lg:px-4.5"
						>
							Coba gratis
						</a>
					</div>

					{/* Mobile actions */}
					<div className="flex items-center gap-2.5 md:hidden">
						<a
							href="#daftar"
							className="bg-primary text-primary-foreground rounded-md px-3.5 py-2.25 text-sm font-bold"
						>
							Coba gratis
						</a>
						<button
							type="button"
							className="border-border bg-card flex size-9.5 flex-col items-center justify-center gap-1 rounded-md border"
							onClick={() => setOpen(true)}
							aria-label="Buka menu"
							aria-expanded={open}
							aria-controls="menu-mobile"
						>
							<span className="bg-warm-700 h-0.5 w-4 rounded-full" />
							<span className="bg-warm-700 h-0.5 w-4 rounded-full" />
						</button>
					</div>
				</div>
			</nav>

			{open && <MobileMenu links={links} pathname={pathname} onClose={close} />}
		</>
	);
}
