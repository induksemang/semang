"use client";

import Image from "next/image";
import { useState } from "react";

const links = [
	{ href: "#masalah", label: "Masalah" },
	{ href: "#cara-kerja", label: "Cara kerja" },
	{ href: "#fitur", label: "Fitur" },
	{ href: "#kepercayaan", label: "Keamanan uang" },
	{ href: "#harga", label: "Harga" }
];

export function Nav() {
	const [open, setOpen] = useState(false);

	return (
		<>
			<nav className="border-border bg-background/80 sticky top-0 z-50 border-b backdrop-blur-md">
				<div className="container flex items-center justify-between py-3.5">
					<a href="#top" className="flex items-center gap-3">
						<Image
							src="/logo.svg"
							alt="Semang"
							width={38}
							height={38}
							className="size-9.5 rounded-md"
						/>
						<span className="text-xl font-extrabold tracking-tight text-teal-900">
							Semang
						</span>
					</a>

					{/* Desktop nav */}
					<div className="hidden items-center gap-x-6 md:flex">
						{links.map((link) => (
							<a
								key={link.href}
								href={link.href}
								className="text-warm-700 hover:text-primary text-sm font-semibold transition-colors"
							>
								{link.label}
							</a>
						))}
						<a
							href="#daftar"
							className="shadow-warm-teal bg-primary text-primary-foreground rounded-md px-4.5 py-2.5 text-sm font-bold transition-colors hover:bg-teal-600"
						>
							Coba gratis
						</a>
					</div>

					{/* Hamburger */}
					<button
						className="flex size-9 flex-col items-center justify-center gap-1.5 md:hidden"
						onClick={() => setOpen(true)}
						aria-label="Buka menu"
					>
						<span className="h-0.5 w-5 rounded-full bg-teal-900" />
						<span className="h-0.5 w-5 rounded-full bg-teal-900" />
						<span className="h-0.5 w-5 rounded-full bg-teal-900" />
					</button>
				</div>
			</nav>

			{/* Mobile menu overlay */}
			{open && (
				<div className="bg-background fixed inset-0 z-60 flex flex-col">
					{/* Header */}
					<div className="border-border border-b">
						<div className="container flex items-center justify-between py-3.5">
							<a
								href="#top"
								className="flex items-center gap-3"
								onClick={() => setOpen(false)}
							>
								<Image
									src="/logo.svg"
									alt="Semang"
									width={38}
									height={38}
									className="size-9.5 rounded-md"
								/>
								<span className="text-xl font-extrabold tracking-tight text-teal-900">
									Semang
								</span>
							</a>
							<button
								className="flex size-9 items-center justify-center"
								onClick={() => setOpen(false)}
								aria-label="Tutup menu"
							>
								<svg
									className="size-8 text-teal-900"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth={1.5}
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</button>
						</div>
					</div>

					{/* Links */}
					<nav className="container flex flex-1 flex-col gap-6 py-6">
						{links.map((link) => (
							<a
								key={link.href}
								href={link.href}
								className="rounded-md text-lg font-semibold text-teal-900 transition-colors hover:bg-teal-50"
								onClick={() => setOpen(false)}
							>
								{link.label}
							</a>
						))}
					</nav>

					{/* CTA */}
					<div className="border-border border-t">
						<div className="container py-6">
							<a
								href="#daftar"
								className="shadow-warm-teal bg-primary text-primary-foreground block w-full rounded-md py-3.5 text-center text-base font-bold transition-colors hover:bg-teal-600"
								onClick={() => setOpen(false)}
							>
								Coba gratis
							</a>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
