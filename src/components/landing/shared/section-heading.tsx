import { cn } from "@/lib/utils";

type SectionHeadingProps = {
	eyebrow: string;
	title: string;
	description: string;
	align?: "left" | "center";
	tone?: "light" | "dark";
};

export function SectionHeading({
	eyebrow,
	title,
	description,
	align = "center",
	tone = "light"
}: SectionHeadingProps) {
	const dark = tone === "dark";
	return (
		<div className={cn("max-w-160 space-y-4", align === "center" && "mx-auto text-center")}>
			<div className="space-y-3.5">
				<p
					className={cn(
						"text-xs font-bold tracking-widest uppercase",
						dark ? "text-teal-300" : "text-primary"
					)}
				>
					{eyebrow}
				</p>
				<h2
					className={cn(
						"text-[clamp(1.75rem,4.2vw,2.375rem)] leading-tight font-extrabold tracking-tight text-balance",
						dark ? "text-white" : "text-teal-900"
					)}
				>
					{title}
				</h2>
			</div>
			<p
				className={cn(
					"text-lg leading-relaxed text-pretty",
					dark ? "text-teal-200" : "text-warm-600"
				)}
			>
				{description}
			</p>
		</div>
	);
}
