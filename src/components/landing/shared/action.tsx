import Link from "next/link";
import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const action = cva(
	"inline-flex items-center justify-center rounded-[4px] font-bold transition-colors",
	{
		variants: {
			variant: {
				solid: "bg-brand text-white hover:bg-teal-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-900",
				outline: "focus-ring border-[1.5px] border-teal-200 text-teal-700 hover:bg-teal-50",
				/** outline di atas latar teal-50, jadi isinya putih */
				white: "focus-ring border-[1.5px] border-teal-200 bg-white text-teal-700 hover:bg-teal-100"
			},
			size: {
				md: "px-6.5 py-3.75 text-sm",
				lg: "px-7.5 py-4 text-base"
			}
		},
		defaultVariants: { variant: "solid", size: "md" }
	}
);

type ActionProps = ComponentProps<typeof Link> & VariantProps<typeof action>;

export function Action({ className, variant, size, ...props }: ActionProps) {
	return <Link {...props} className={cn(action({ variant, size }), className)} />;
}
