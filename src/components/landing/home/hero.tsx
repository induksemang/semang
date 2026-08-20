import { cn } from "@/lib/utils";
import { Action } from "../shared/action";

const stats = [
	{
		value: "Rp0",
		label: "dana penyewa yang dipegang Semang — semuanya masuk ke rekeningmu"
	},
	{
		value: "5 menit",
		label: "dari daftar sampai melihat tagihan pertama kostmu sendiri"
	},
	{
		value: "3 pesan",
		label: "paling banyak per tagihan bulanan: H-3, lalu H+3 dan H+7"
	},
	{
		value: "Rp2.000",
		label: "per kamar terisi tiap bulan — kamar kosong tidak dihitung"
	}
];

export function Hero() {
	return (
		<header className="container pt-[clamp(32px,6vw,84px)]">
			<p className="text-muted-foreground mb-[clamp(20px,3vw,32px)] font-mono text-[11px] leading-normal font-bold tracking-widest uppercase">
				Pengganti buku catatan &amp; chat pribadi
			</p>
			<h1 className="text-display mb-6 max-w-240 font-extrabold text-balance text-teal-900">
				Kostmu ditagih otomatis, uang masuk tercatat sendiri,{" "}
				<span className="text-brand">tanpa kamu menagih siapa-siapa.</span>
			</h1>

			<div className="flex flex-wrap items-end gap-[clamp(28px,4vw,56px)] pb-[clamp(32px,4vw,44px)]">
				<p className="text-warm-600 max-w-140 min-w-0 flex-[1_1_440px] text-base leading-relaxed text-pretty lg:text-lg">
					Tagihan dan pengingat berangkat sendiri ke WhatsApp penyewa. Pembayaran masuk
					langsung ke rekeningmu lewat link, lalu pelunasannya tercatat tanpa kamu buka
					aplikasi. Yang tersisa untukmu cuma melihat hasilnya.
				</p>
				<div className="flex w-full flex-col gap-3 lg:w-auto lg:flex-none">
					<div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
						<Action href="/register">Coba gratis 60 hari</Action>
						<Action href="/cara-kerja" variant="outline">
							Lihat cara kerjanya
						</Action>
					</div>
					<p className="text-muted-foreground font-mono text-[11.5px] leading-normal font-semibold tracking-wider">
						TANPA KARTU KREDIT · FITUR PRO TERBUKA SELAMA TRIAL
					</p>
				</div>
			</div>

			<dl className="border-warm-200 grid auto-rows-fr grid-cols-2 border-t border-b lg:grid-cols-4">
				{stats.map((stat, index) => (
					<div
						key={stat.value}
						className={cn(
							"border-warm-200 py-4.5 lg:pt-5.5 lg:pb-6",
							index % 2 === 1 ? "border-l pl-4" : "pr-4",
							index >= 2 && "border-t",
							"lg:border-t-0 lg:pr-[clamp(14px,2vw,24px)] lg:pl-[clamp(14px,2vw,24px)]",
							index === 0 ? "lg:border-l-0 lg:pl-0" : "lg:border-l",
							index === stats.length - 1 && "lg:pr-0"
						)}
					>
						<dt className="text-[23px] font-extrabold tracking-tight text-teal-900 tabular-nums lg:text-3xl">
							{stat.value}
						</dt>
						<dd className="text-warm-600 mt-1.5 text-xs leading-normal lg:text-sm">
							{stat.label}
						</dd>
					</div>
				))}
			</dl>
		</header>
	);
}
