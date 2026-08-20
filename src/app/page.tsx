import { CtaCentered } from "@/components/landing/shared/cta";
import { Features } from "@/components/landing/home/features";
import { Footer } from "@/components/landing/shared/footer";
import { Hero } from "@/components/landing/home/hero";
import { HowItWorks } from "@/components/landing/home/how-it-works";
import { Nav } from "@/components/landing/shared/nav";
import { PaymentPaths } from "@/components/landing/home/payment-paths";
import { PricingTeaser } from "@/components/landing/home/pricing-teaser";
import { Problems } from "@/components/landing/home/problems";
import { SecurityTeaser } from "@/components/landing/home/security-teaser";
import { TwoMessages } from "@/components/landing/home/two-messages";

export const dynamic = "force-static";

export default function LandingPage() {
	return (
		<main className="overflow-x-clip">
			<Nav />
			<Hero />
			<TwoMessages />
			<Problems />
			<HowItWorks />
			<Features />
			<PaymentPaths />
			<SecurityTeaser />
			<PricingTeaser />
			<CtaCentered />
			<Footer />
		</main>
	);
}
