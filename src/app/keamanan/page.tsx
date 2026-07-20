import type { Metadata } from "next";
import { Cta } from "@/components/landing/shared/cta";
import { Footer } from "@/components/landing/shared/footer";
import { Architecture } from "@/components/landing/security-page/architecture";
import { PromiseSection } from "@/components/landing/security-page/promise";
import { SecurityHero } from "@/components/landing/security-page/security-hero";
import { Verification } from "@/components/landing/security-page/verification";
import { Nav } from "@/components/landing/shared/nav";

export const dynamic = "force-static";

export const metadata: Metadata = {
	title: "Keamanan",
	description:
		"Uangmu tidak pernah menyentuh Semang — pembayaran penyewa langsung masuk ke rekeningmu sendiri lewat jalur pembayaran resmi."
};

export default function KeamananPage() {
	return (
		<main className="overflow-x-clip">
			<Nav />
			<SecurityHero />
			<Architecture />
			<Verification />
			<PromiseSection />
			<Cta />
			<Footer />
		</main>
	);
}
