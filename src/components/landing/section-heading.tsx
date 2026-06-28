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
		<div className={cn("max-w-160", align === "center" && "mx-auto text-center")}>
			<p
				className={cn(
					"mb-3.5 text-xs font-bold tracking-widest uppercase",
					dark ? "text-teal-300" : "text-teal-500"
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
			<p
				className={cn(
					"mt-4 text-lg leading-relaxed text-pretty",
					dark ? "text-teal-200" : "text-warm-600"
				)}
			>
				{description}
			</p>
		</div>
	);
}
