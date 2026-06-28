import { Clock, FileDown, Lock, Shield } from "lucide-react";

const points = [
	{
		icon: Shield,
		title: "Kami tak pegang uangmu",
		body: "Uang mengalir langsung penghuni → rekeningmu. Platform hanya pembawa pesan dan pencatat."
	},
	{
		icon: Lock,
		title: "Data tiap pemilik terpisah",
		body: "Data tiap pemilik dipisah aman di sistem. Link bukti bayar pakai kode acak yang tak bisa ditebak untuk tiap tagihan."
	},
	{
		icon: FileDown,
		title: "Datamu tetap milikmu",
		body: "Bisa kamu unduh kapan saja. Turun ke paket Gratis pun, semua datamu tetap utuh."
	},
	{
		icon: Clock,
		title: "Satu harga, jujur",
		body: "Tanpa komisi tersembunyi, tanpa bayar untuk membalas pesan. Gratis selamanya untuk ≤5 kamar."
	}
];

export function Trust() {
	return (
		<section className="border-border bg-warm-50 border-y">
			<div className="container grid gap-5 py-10 sm:grid-cols-2 md:py-14 lg:grid-cols-4 lg:py-18">
				{points.map((point) => (
					<div key={point.title}>
						<div className="border-border bg-card mb-4 flex size-11 items-center justify-center rounded-md border text-teal-500">
							<point.icon className="size-5.5" strokeWidth={2} />
						</div>
						<h3 className="text-warm-900 mb-1.75 text-base font-bold">{point.title}</h3>
						<p className="text-warm-600 text-sm leading-relaxed">{point.body}</p>
					</div>
				))}
			</div>
		</section>
	);
}
