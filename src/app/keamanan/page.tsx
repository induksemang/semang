import type { Metadata } from "next";
import { Cta } from "@/components/landing/shared/cta";
import { Footer } from "@/components/landing/shared/footer";
import { FundFlow } from "@/components/landing/security/fund-flow";
import { Nav } from "@/components/landing/shared/nav";
import { PromiseSection } from "@/components/landing/security/promise";
import { SecurityHero } from "@/components/landing/security/security-hero";
import { TenantRights } from "@/components/landing/security/tenant-rights";

export const dynamic = "force-static";

export const metadata: Metadata = {
	title: "Keamanan",
	description:
		"Semang mencatat uangmu, tidak pernah memegangnya. Pembayaran penyewa masuk langsung ke rekeningmu lewat sub-akun Xendit atas namamu sendiri."
};

export default function KeamananPage() {
	return (
		<main className="overflow-x-clip">
			<Nav dark />
			<SecurityHero />
			<FundFlow />
			<PromiseSection />
			<TenantRights />
			<Cta
				title="Mulai tanpa menyerahkan apa-apa dulu"
				description="Tagihan sudah bisa berangkat sebelum verifikasi identitas selesai. Data rekening baru diperlukan saat kamu ingin pembayaran online menyala."
				action="Coba gratis 60 hari"
			/>
			<Footer />
		</main>
	);
}
