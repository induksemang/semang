import { cn } from "@/lib/utils";

type PageHeaderProps = {
	eyebrow: string;
	title: string;
	description: React.ReactNode;
	align?: "left" | "center";
};

export function PageHeader({ eyebrow, title, description, align = "left" }: PageHeaderProps) {
	const center = align === "center";
	return (
		<header
			className={cn(
				"container space-y-4 pt-11 pb-8 md:pt-14 lg:pt-18 lg:pb-12",
				center && "text-center"
			)}
		>
			<div className="space-y-2.5">
				<p className="text-primary text-xs font-bold tracking-widest uppercase">
					{eyebrow}
				</p>
				<h1
					className={cn(
						"max-w-190 text-3xl font-extrabold tracking-tight text-balance text-teal-900 md:text-4xl lg:text-5xl",
						center && "mx-auto"
					)}
				>
					{title}
				</h1>
			</div>
			<p
				className={cn(
					"text-warm-600 max-w-155 text-sm leading-relaxed text-pretty sm:text-base lg:text-lg",
					center && "mx-auto"
				)}
			>
				{description}
			</p>
		</header>
	);
}
