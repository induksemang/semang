import Link from "next/link";
import { SectionHeading } from "../shared/section-heading";

export function PricingTeaser() {
	return (
		<section className="@container container py-10 md:py-14 lg:py-18">
			<div className="flex flex-col items-center gap-y-5 sm:gap-y-8 @3xl:flex-row @3xl:flex-wrap @3xl:justify-center @3xl:gap-x-12">
				<div className="min-w-0 space-y-6 @3xl:flex-1 @3xl:basis-95">
					<SectionHeading
						align="left"
						eyebrow="Harga"
						title="Bayar hanya untuk kamar yang terisi."
						description="Kamar kosong tidak ditagih. Empat paket, dari Gratis selamanya sampai Bisnis multi-properti — semua termasuk pembayaran online tanpa markup ke penyewa."
					/>
					<Link
						href="/harga"
						className="text-primary hidden items-center gap-1.5 text-sm font-bold transition-colors hover:text-teal-600 @3xl:inline-flex"
					>
						Lihat semua paket &amp; FAQ →
					</Link>
				</div>

				<div className="mx-auto max-w-85 min-w-0 sm:mx-0 @3xl:flex-1 @3xl:basis-75">
					<div className="relative rounded-lg border border-teal-700 bg-teal-700 p-6.5 shadow-[0_16px_36px_rgba(39,87,79,0.28)] lg:rounded-xl lg:p-7">
						<span className="bg-primary absolute -top-2.75 left-6 rounded-full px-3 py-1.25 text-xs font-extrabold tracking-wide text-white uppercase">
							Paling pas
						</span>
						<h3 className="text-lg font-extrabold text-white">Starter</h3>
						<p className="mb-4.5 text-sm font-semibold text-teal-300">
							Kost yang mulai berkembang
						</p>
						<div className="text-3xl font-extrabold tracking-tight text-white">
							Rp2.000
							<span className="text-sm font-semibold text-teal-200">
								{" "}
								/ kamar terisi / bln
							</span>
						</div>
						<p className="mt-2.5 mb-5 text-xs font-semibold text-teal-300">
							sampai 15 kamar · minimum Rp20.000/bln
						</p>
						<Link
							href="/harga"
							className="block rounded-md bg-white py-3.25 text-center text-sm font-bold text-teal-900 transition-colors hover:bg-teal-50"
						>
							Coba 60 hari gratis
						</Link>
					</div>
					<Link
						href="/harga"
						className="text-primary mt-3.5 inline-flex items-center gap-1.5 text-sm font-bold transition-colors hover:text-teal-600 @3xl:hidden"
					>
						Lihat semua paket &amp; FAQ →
					</Link>
				</div>
			</div>
		</section>
	);
}
