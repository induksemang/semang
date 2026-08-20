import type { Metadata } from "next";
import { Cashflow } from "@/components/landing/features/cashflow";
import { Cta } from "@/components/landing/shared/cta";
import { DueDate } from "@/components/landing/features/due-date";
import { Footer } from "@/components/landing/shared/footer";
import { InvoiceStatus } from "@/components/landing/features/invoice-status";
import { Nav } from "@/components/landing/shared/nav";
import { PageHeader } from "@/components/landing/shared/page-header";
import { RentUnit } from "@/components/landing/features/rent-unit";
import { Rooms } from "@/components/landing/features/rooms";

export const dynamic = "force-static";

export const metadata: Metadata = {
	title: "Fitur",
	description:
		"Seluruh aturan penagihan kost sudah dipikirkan sampai kasus rewelnya — jatuh tempo, unit sewa, status tagihan, cicilan, dan laporan kas."
};

export default function FiturPage() {
	return (
		<main className="overflow-x-clip">
			<Nav />
			<PageHeader
				eyebrow="Fitur"
				title="Seluruh aturan penagihan kost, sudah dipikirkan sampai kasus rewelnya"
				description="Tanggal 31 di bulan Februari, penyewa yang masuk tanggal 15, sewa mingguan, cicilan yang disepakati lewat chat, kamar yang direnovasi. Semuanya punya jawaban yang sudah ditetapkan, bukan diserahkan ke kebijaksanaanmu tiap bulan."
			/>
			<Rooms />
			<DueDate />
			<RentUnit />
			<InvoiceStatus />
			<Cashflow />
			<Cta
				title="Coba dengan kostmu sendiri, bukan dengan data contoh"
				description="Isi nama kost, jumlah kamar, dan harga sewa. Tagihan pertama tampil dalam beberapa detik."
				action="Mulai gratis"
			/>
			<Footer />
		</main>
	);
}
