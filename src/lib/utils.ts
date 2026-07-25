import { clsx, type ClassValue } from "clsx";
import type { MouseEvent } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// Scroll ke anchor tanpa meninggalkan hash di URL: hash yang nyangkut bikin
// refresh melompat ke section itu, bukan ke posisi/atas halaman.
// rAF menunda scroll sampai efek React selesai (mobile menu mengunci body overflow).
export function scrollToHash(event: MouseEvent<HTMLAnchorElement>) {
	const target = document.querySelector(event.currentTarget.hash);
	if (!target) return;

	event.preventDefault();
	requestAnimationFrame(() => target.scrollIntoView());
}

export function formatRupiah(amount: number): string {
	return new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
		minimumFractionDigits: 0,
		maximumFractionDigits: 0
	}).format(amount);
}
