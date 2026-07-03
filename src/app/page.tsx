import { Cta } from "@/components/landing/cta";
import { Faq } from "@/components/landing/faq";
import { Features } from "@/components/landing/features";
import { Footer } from "@/components/landing/footer";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Nav } from "@/components/landing/nav";
import { Pricing } from "@/components/landing/pricing";
import { Problems } from "@/components/landing/problems";
import { Trust } from "@/components/landing/trust";

export const dynamic = "force-static";

export default function LandingPage() {
	return (
		<main className="overflow-x-clip">
			<Nav />
			<Hero />
			<Problems />
			<HowItWorks />
			<Trust />
			<Features />
			<Pricing />
			<Faq />
			<Cta />
			<Footer />
		</main>
	);
}
