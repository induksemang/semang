import type { Metadata } from "next";
import { Cta } from "@/components/landing/shared/cta";
import { Faq } from "@/components/landing/pricing-page/faq";
import { Footer } from "@/components/landing/shared/footer";
import { Comparison } from "@/components/landing/pricing-page/comparison";
import { Nav } from "@/components/landing/shared/nav";
import { PageHeader } from "@/components/landing/shared/page-header";
import { Pricing } from "@/components/landing/pricing-page/pricing";

export const dynamic = "force-static";

export const metadata: Metadata = {
	title: "Harga",
	description:
		"Bayar hanya untuk kamar yang terisi. Empat paket dari Gratis selamanya sampai Bisnis multi-properti — tanpa markup biaya ke penyewa."
};

export default function HargaPage() {
	return (
		<main className="overflow-x-clip">
			<Nav />
			<PageHeader
				eyebrow="Harga"
				title="Bayar hanya untuk kamar yang terisi."
				description="Kamar kosong tidak ditagih. Semua paket termasuk pembayaran online tanpa markup biaya ke penyewa. Coba semua fitur Pro gratis 60 hari — tanpa kartu kredit."
			/>
			<Pricing />
			<Comparison />
			<Faq />
			<Cta />
			<Footer />
		</main>
	);
}
