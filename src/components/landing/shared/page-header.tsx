import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PageHeaderProps = {
	eyebrow: string;
	title: ReactNode;
	description: ReactNode;
	/** Lebar maksimum paragraf pembuka — beda tipis antar halaman. */
	leadClassName?: string;
};

export function PageHeader({ eyebrow, title, description, leadClassName }: PageHeaderProps) {
	return (
		<header className="container pt-[clamp(32px,6vw,80px)] pb-[clamp(28px,4vw,44px)]">
			<p className="text-muted-foreground mb-6 font-mono text-[11px] leading-normal font-bold tracking-widest uppercase">
				{eyebrow}
			</p>
			<h1 className="text-title mb-5 max-w-220 font-extrabold text-balance text-teal-900">
				{title}
			</h1>
			<p
				className={cn(
					"text-warm-600 max-w-160 text-base leading-relaxed text-pretty lg:text-lg",
					leadClassName
				)}
			>
				{description}
			</p>
		</header>
	);
}
