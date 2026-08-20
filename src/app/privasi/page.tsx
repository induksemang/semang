import type { Metadata } from "next";
import { Footer } from "@/components/landing/shared/footer";
import { Nav } from "@/components/landing/shared/nav";
import { Policy } from "@/components/landing/privacy/policy";

export const dynamic = "force-static";

export const metadata: Metadata = {
	title: "Kebijakan Privasi",
	description:
		"Data pribadi apa yang Semang kumpulkan, untuk apa, kepada siapa diteruskan, dan hak Anda atas data tersebut sesuai UU PDP."
};

export default function PrivasiPage() {
	return (
		<main className="overflow-x-clip">
			<Nav />
			<header className="container pt-[clamp(48px,6vw,80px)] pb-[clamp(28px,3.5vw,40px)]">
				<p className="text-muted-foreground mb-5 font-mono text-[11px] leading-normal font-bold tracking-widest uppercase">
					Kebijakan Privasi · Berlaku sejak tanggal rilis
				</p>
				<h1 className="text-title-sm mb-5.5 max-w-210 font-extrabold text-balance text-teal-900">
					Kebijakan Privasi
				</h1>
				<div className="border-brand max-w-170 border-l-[3px] pl-5">
					<p className="text-warm-700 text-base leading-relaxed">
						<strong className="text-warm-900 font-extrabold">Ringkas:</strong> Semang
						membantu pemilik kost menagih dan mencatat pembayaran. Kami menyimpan data
						secukupnya untuk itu, tidak menjualnya, dan tidak pernah memegang uang Anda.
					</p>
				</div>
			</header>
			<Policy />
			<Footer />
		</main>
	);
}
