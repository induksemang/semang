import { Cta } from "@/components/landing/shared/cta";
import { Faq } from "@/components/landing/faq";
import { Features } from "@/components/landing/home/features";
import { Footer } from "@/components/landing/shared/footer";
import { Hero } from "@/components/landing/home/hero";
import { HowItWorks } from "@/components/landing/home/how-it-works";
import { Nav } from "@/components/landing/shared/nav";
import { Pricing } from "@/components/landing/pricing";
import { Problems } from "@/components/landing/home/problems";
import { Trust } from "@/components/landing/home/trust";

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
