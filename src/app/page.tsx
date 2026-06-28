import { Cta } from "@/components/landing/cta";
import { Features } from "@/components/landing/features";
import { Footer } from "@/components/landing/footer";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Nav } from "@/components/landing/nav";
import { Pricing } from "@/components/landing/pricing";
import { Problems } from "@/components/landing/problems";
import { StatusFlow } from "@/components/landing/status-flow";
import { Trust } from "@/components/landing/trust";
import { ValueStrip } from "@/components/landing/value-strip";

export const dynamic = "force-static";

export default function LandingPage() {
	return (
		<main className="overflow-x-clip">
			<Nav />
			<Hero />
			<ValueStrip />
			<Problems />
			<HowItWorks />
			<Features />
			<StatusFlow />
			<Trust />
			<Pricing />
			<Cta />
			<Footer />
		</main>
	);
}
