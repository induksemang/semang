import { cn } from "@/lib/utils";
import { SectionHeading } from "../shared/section-heading";

const nodes = [
	{
		title: "Penyewa membayar",
		caption: "QRIS / VA / e-wallet",
		iconClass: "bg-teal-100 text-teal-700",
		icon: (
			<svg
				width="22"
				height="22"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<circle cx="12" cy="8" r="4" />
				<path d="M4 21v-1a8 8 0 0 1 16 0v1" />
			</svg>
		)
	},
	{
		title: "Jalur pembayaran atas namamu",
		caption: "Semang hanya mencatat",
		featured: true,
		iconClass: "bg-primary text-white",
		icon: (
			<svg
				width="22"
				height="22"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<rect x="3" y="11" width="18" height="10" rx="2" />
				<path d="M7 11V8a5 5 0 0 1 10 0v3" />
			</svg>
		)
	},
	{
		title: "Rekening pemilik",
		caption: "Dana langsung masuk",
		iconClass: "bg-success-bg text-success-fg",
		icon: (
			<svg
				width="22"
				height="22"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<rect x="3" y="3" width="18" height="18" rx="2" />
				<path d="M9 12l2 2 4-4" />
			</svg>
		)
	}
];

export function Architecture() {
	return (
		<section className="container space-y-8 py-10 md:py-14 lg:space-y-10 lg:py-18">
			<SectionHeading
				align="left"
				eyebrow="Ke mana uangnya mengalir"
				title="Setiap pemilik kost punya jalur pembayarannya sendiri."
				description="Pembayaran penyewa diproses lewat akun pembayaran atas namamu sendiri, lalu langsung diteruskan ke rekening bankmu. Semang hanya mencatat dan mengonfirmasi — tidak pernah menampung uangmu."
			/>

			<div className="flex flex-col items-center lg:flex-row">
				{nodes.map((node, index) => (
					<div key={node.title} className="contents">
						{index > 0 && (
							<div
								aria-hidden
								className="text-warm-300 flex flex-none items-center justify-center px-4 py-1 text-xl font-extrabold"
							>
								<span className="rotate-90 lg:rotate-0">→</span>
							</div>
						)}
						<div
							className={cn(
								"w-full flex-1 space-y-1 rounded-md border p-4.5 text-center lg:rounded-lg lg:p-6",
								node.featured
									? "border-teal-200 bg-teal-100"
									: "border-border bg-card"
							)}
						>
							<div
								className={cn(
									"mx-auto mb-2.5 flex size-10 items-center justify-center rounded-md lg:mb-3 lg:size-11",
									node.iconClass
								)}
							>
								{node.icon}
							</div>
							<h4 className="text-sm font-bold text-teal-900">{node.title}</h4>
							<p
								className={cn(
									"text-xs",
									node.featured ? "text-teal-700" : "text-warm-400"
								)}
							>
								{node.caption}
							</p>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
