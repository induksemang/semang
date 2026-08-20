import type { Metadata } from "next";
import { Comparison } from "@/components/landing/pricing/comparison";
import { Cta } from "@/components/landing/shared/cta";
import { Faq } from "@/components/landing/pricing/faq";
import { Footer } from "@/components/landing/shared/footer";
import { Nav } from "@/components/landing/shared/nav";
import { PageHeader } from "@/components/landing/shared/page-header";
import { Pricing } from "@/components/landing/pricing/pricing";

export const dynamic = "force-static";

export const metadata: Metadata = {
	title: "Harga",
	description:
		"Dihitung per kamar terisi, mulai Rp2.000. Kamar kosong, yang sedang dibangun, atau direnovasi tidak masuk hitungan."
};

export default function HargaPage() {
	return (
		<main className="overflow-x-clip">
			<Nav />
			<PageHeader
				eyebrow="Harga · dihitung per kamar terisi"
				title="Kamar kosong tidak menagihmu"
				description="Yang dihitung adalah jumlah penyewa aktif pada tanggal penagihan langganan. Kamar yang belum ada penghuninya, yang sedang dibangun, atau yang sedang direnovasi tidak masuk hitungan."
				leadClassName="max-w-165"
			/>
			<Pricing />
			<Comparison />
			<Faq />
			<Cta
				title="Hitung sendiri dengan jumlah kamarmu"
				description="Dua bulan pertama gratis. Setelah itu, kamu sudah punya angka nyata untuk memutuskan."
				action="Mulai trial 60 hari"
			/>
			<Footer />
		</main>
	);
}
