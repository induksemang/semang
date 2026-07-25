import type { Metadata } from "next";
import { Cta } from "@/components/landing/shared/cta";
import { Footer } from "@/components/landing/shared/footer";
import { Architecture } from "@/components/landing/security/architecture";
import { PromiseSection } from "@/components/landing/security/promise";
import { SecurityHero } from "@/components/landing/security/security-hero";
import { Verification } from "@/components/landing/security/verification";
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
