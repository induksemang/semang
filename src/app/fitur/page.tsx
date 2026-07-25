import type { Metadata } from "next";
import { Cta } from "@/components/landing/shared/cta";
import { PropertyManagement } from "@/components/landing/features/property-management";
import { BillStatus } from "@/components/landing/features/bill-status";
import { AutoInvoicing } from "@/components/landing/features/auto-invoicing";
import { OccupancyReport } from "@/components/landing/features/occupancy-report";
import { Footer } from "@/components/landing/shared/footer";
import { Nav } from "@/components/landing/shared/nav";
import { PageHeader } from "@/components/landing/shared/page-header";

export const dynamic = "force-static";

export const metadata: Metadata = {
	title: "Fitur",
	description:
		"Semua logika penagihan kost-mu, otomatis — jatuh tempo fleksibel, unit sewa bulanan/mingguan/harian, cicilan, dan laporan kas."
};

export default function FiturPage() {
	return (
		<main className="overflow-x-clip">
			<Nav />
			<PageHeader
				eyebrow="Fitur"
				title="Semua logika penagihan kost-mu, otomatis."
				description="Bukan aplikasi generik yang memaksamu berubah — Semang mengikuti pola jatuh tempo, unit sewa, dan cara bayar yang sudah kamu pakai bertahun-tahun."
			/>
			<PropertyManagement />
			<AutoInvoicing />
			<BillStatus />
			<OccupancyReport />
			<Cta />
			<Footer />
		</main>
	);
}
