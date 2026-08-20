import type { Metadata } from "next";
import { Cta } from "@/components/landing/shared/cta";
import { Footer } from "@/components/landing/shared/footer";
import { MonthlyCycle } from "@/components/landing/how-it-works/monthly-cycle";
import { Nav } from "@/components/landing/shared/nav";
import { PageHeader } from "@/components/landing/shared/page-header";
import { PaymentActivation } from "@/components/landing/how-it-works/payment-activation";
import { PeriodicUpdates } from "@/components/landing/how-it-works/periodic-updates";
import { Wizard } from "@/components/landing/how-it-works/wizard";

export const dynamic = "force-static";

export const metadata: Metadata = {
	title: "Cara kerja",
	description:
		"Kerja kerasnya di lima menit pertama. Setelah itu tagihan, pengingat, dan pencatatan pelunasan berjalan sendiri tiap bulan."
};

export default function CaraKerjaPage() {
	return (
		<main className="overflow-x-clip">
			<Nav />
			<PageHeader
				eyebrow="Cara kerja · dari daftar sampai bulan kesekian"
				title="Kerja kerasnya di lima menit pertama. Sisanya bukan urusanmu lagi."
				description="Halaman ini menjelaskan tiga hal berurutan: apa yang kamu lakukan saat pertama masuk, apa yang terjadi tiap bulan tanpa kamu, dan kapan pembayaran online mulai menyala."
			/>
			<Wizard />
			<MonthlyCycle />
			<PeriodicUpdates />
			<PaymentActivation />
			<Cta
				title="Lima menitnya bisa kamu mulai sekarang"
				description="Contoh tagihannya dikirim ke nomormu sendiri dulu, bukan ke penyewa."
				action="Coba gratis 60 hari"
			/>
			<Footer />
		</main>
	);
}
