import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Kerangka seksi v5: nomor seksi mono di kolom 104px, isi di kolom sisanya.
 * Di bawah `lg` kolom nomor melipat ke atas isi — desktop tetap identik.
 */
type LedgerSectionProps = {
	index: string;
	label: ReactNode;
	/** Warna nomor seksi: mengikuti latar seksinya. */
	tone?: "muted" | "teal";
	/** `block` = ritme beranda, `block-sm` = ritme halaman dalam. */
	rhythm?: "section" | "section-sm";
	id?: string;
	className?: string;
	innerClassName?: string;
	children: ReactNode;
};

export function LedgerSection({
	index,
	label,
	tone = "muted",
	rhythm = "section",
	id,
	className,
	innerClassName,
	children
}: LedgerSectionProps) {
	return (
		<section id={id} className={className}>
			<div
				className={cn(
					"container",
					rhythm === "section" ? "py-13 lg:py-20" : "py-12 lg:py-18"
				)}
			>
				<div
					className={cn(
						"grid gap-4 lg:grid-cols-[104px_minmax(0,1fr)] lg:gap-10",
						innerClassName
					)}
				>
					<LedgerIndex index={index} label={label} tone={tone} />
					<div className="min-w-0">{children}</div>
				</div>
			</div>
		</section>
	);
}

export function LedgerIndex({
	index,
	label,
	tone = "muted",
	className
}: {
	index: string;
	label: ReactNode;
	tone?: "muted" | "teal";
	className?: string;
}) {
	return (
		<div
			className={cn(
				"flex items-baseline gap-2.25 font-mono text-[11px] leading-relaxed font-bold tracking-widest uppercase lg:flex-col lg:items-start lg:gap-0 lg:pt-2",
				tone === "teal" ? "text-teal-400" : "text-muted-foreground",
				className
			)}
		>
			<span>{index}</span>
			<span>{label}</span>
		</div>
	);
}

export function ArrowGlyph({ className }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2.2"
			strokeLinecap="butt"
			strokeLinejoin="miter"
			aria-hidden="true"
			className={cn("ml-1.5 inline-block size-3.75 align-[-2px]", className)}
		>
			<path d="M3.5 12h16" />
			<path d="m13 5.5 6.5 6.5-6.5 6.5" />
		</svg>
	);
}

type ArrowLinkProps = ComponentProps<typeof Link> & { children: ReactNode };

export function ArrowLink({ className, children, ...props }: ArrowLinkProps) {
	return (
		<Link
			{...props}
			className={cn(
				"focus-ring inline-block text-sm font-bold text-teal-600 transition-colors hover:text-teal-900",
				className
			)}
		>
			{children}
			<ArrowGlyph />
		</Link>
	);
}

export function CheckBadge({ className }: { className?: string }) {
	return (
		<span
			className={cn(
				"bg-success grid size-5.5 shrink-0 place-items-center rounded-full text-white",
				className
			)}
		>
			<svg
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2.2"
				strokeLinecap="butt"
				strokeLinejoin="miter"
				aria-hidden="true"
				className="size-3.75"
			>
				<path d="m5 12.5 4.5 4.5L19 7" transform="translate(0.3 -1)" />
			</svg>
		</span>
	);
}
