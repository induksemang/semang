import type { Metadata } from "next";
import { MonthlyCycle } from "@/components/landing/how-it-works-page/monthly-cycle";
import { PeriodicUpdates } from "@/components/landing/how-it-works-page/periodic-updates";
import { WizardTimeline } from "@/components/landing/how-it-works-page/wizard-timeline";
import { Cta } from "@/components/landing/shared/cta";
import { Footer } from "@/components/landing/shared/footer";
import { Nav } from "@/components/landing/shared/nav";
import { PageHeader } from "@/components/landing/shared/page-header";

export const dynamic = "force-static";

export const metadata: Metadata = {
	title: "Cara kerja",
	description:
		"Dari daftar sampai tagihan pertama terkirim — di bawah 5 menit. Setelah setup, siklus penagihan berjalan sendiri setiap bulan."
};

export default function CaraKerjaPage() {
	return (
		<main className="overflow-x-clip">
			<Nav />
			<PageHeader
				align="center"
				eyebrow="Cara kerja"
				title="Dari daftar sampai tagihan pertama terkirim — di bawah 5 menit."
				description={
					<>
						Begitu selesai daftar, kamu langsung melihat dua hal dengan mata sendiri:
						tagihan terkirim <i>dan</i> pembayaran diterima. Tanpa menunggu penyewa
						sungguhan.
					</>
				}
			/>
			<WizardTimeline />
			<MonthlyCycle />
			<PeriodicUpdates />
			<Cta />
			<Footer />
		</main>
	);
}
