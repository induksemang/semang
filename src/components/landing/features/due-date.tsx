import { LedgerSection } from "../shared/ledger";

const firstInvoice = [
	{
		letter: "A",
		title: "Prorata sisa bulan",
		body: "Ditagih sesuai hari terpakai, lalu penuh di periode berikutnya."
	},
	{
		letter: "B",
		title: "Gabung ke depan",
		body: "Sisa bulan digabung jadi satu tagihan dengan periode penuh berikutnya — bukan digratiskan. Cocok untuk penyewa yang gajian di awal bulan."
	},
	{
		letter: "C",
		title: "Penuh bulan ini",
		body: "Sebulan tetap dihitung sebulan, tanggal masuk berapa pun. Untuk kost yang memang begitu aturannya."
	}
];

export function DueDate() {
	return (
		<LedgerSection
			index="02"
			label="Jatuh tempo"
			tone="teal"
			rhythm="section-sm"
			className="border-t border-teal-200 bg-teal-50"
		>
			<h2 className="text-h2-sm mb-3.5 max-w-155 font-extrabold text-balance text-teal-900">
				Dua cara menentukan tanggal, pilih yang sudah kamu jalankan
			</h2>
			<p className="mb-8 max-w-155 text-base leading-relaxed text-teal-700">
				Mengubah mode di tengah jalan boleh, dan hanya berpengaruh ke tagihan yang belum
				dibuat. Tagihan yang sudah terkirim tidak pernah berubah angkanya.
			</p>

			<div className="grid border border-teal-200 bg-white lg:grid-cols-2">
				<div className="p-[clamp(22px,3vw,32px)]">
					<div className="mb-3.5 flex items-center gap-2.5">
						<span className="bg-teal-100 px-2.25 py-1.25 font-mono text-[10.5px] leading-snug font-bold tracking-widest text-teal-700">
							BAWAAN
						</span>
						<h3 className="text-warm-900 text-lg font-extrabold tracking-tight">
							Dari tanggal masuk
						</h3>
					</div>
					<p className="text-warm-600 mb-4.5 text-sm leading-relaxed">
						Tiap penyewa punya tanggal jatuh temponya sendiri. Masuk tanggal 15, maka
						tagihannya jatuh tempo tanggal 15 tiap bulan.
					</p>
					<p className="border-warm-100 text-success-fg border-t pt-3.5 text-sm leading-relaxed font-semibold">
						Tidak pernah ada tagihan pertama yang perlu dipotong sebagian.
					</p>
				</div>

				<div className="bg-warm-25 border-t border-teal-200 p-[clamp(22px,3vw,32px)] lg:border-t-0 lg:border-l">
					<div className="mb-3.5 flex items-center gap-2.5">
						<span className="bg-warm-100 text-muted-foreground px-2.25 py-1.25 font-mono text-[10.5px] leading-snug font-bold tracking-widest">
							PILIHAN
						</span>
						<h3 className="text-warm-900 text-lg font-extrabold tracking-tight">
							Tanggal tetap
						</h3>
					</div>
					<p className="text-warm-600 mb-4.5 text-sm leading-relaxed">
						Satu tanggal yang sama untuk semua penyewa, misalnya tanggal 1. Cocok untuk
						kost yang sudah terbiasa menagih serempak.
					</p>
					<p className="border-warm-100 text-warning-fg border-t pt-3.5 text-sm leading-relaxed font-semibold">
						Penyewa yang masuk di tengah bulan diatur lewat perlakuan tagihan pertama di
						bawah.
					</p>
				</div>
			</div>

			<div className="mt-5 flex flex-col gap-1.75 lg:flex-row lg:items-baseline lg:gap-3.5">
				<span className="font-mono text-[10.5px] leading-snug font-bold tracking-widest whitespace-nowrap text-teal-400">
					TANGGAL 29–31
				</span>
				<p className="text-sm leading-relaxed text-teal-700">
					Bulan yang tidak punya tanggal itu memakai hari terakhirnya. Februari tidak
					pernah membuat satu tagihan pun gagal dibuat.
				</p>
			</div>

			<h3 className="mt-10 mb-1.5 text-xl font-extrabold tracking-tight text-teal-900">
				Perlakuan tagihan pertama
			</h3>
			<p className="mb-5 max-w-155 text-sm leading-relaxed text-teal-700">
				Khusus mode tanggal tetap. Sistem menyarankan yang paling wajar berdasarkan tanggal
				masuk, dan kamu bisa menimpanya dalam satu ketuk.
			</p>
			<div className="grid border-t border-teal-200 lg:grid-cols-3">
				{firstInvoice.map((option) => (
					<div
						key={option.letter}
						className="border-teal-200 pt-5 pb-5.5 not-first:border-t max-lg:last:pb-0 lg:px-6 lg:not-first:border-t-0 lg:not-first:border-l lg:first:pl-0 lg:last:pr-0 lg:nth-2:pb-0"
					>
						<p className="mb-2.5 font-mono text-xs leading-snug font-bold text-teal-400">
							{option.letter}
						</p>
						<h4 className="text-warm-900 mb-1.75 text-base font-extrabold">
							{option.title}
						</h4>
						<p className="text-sm leading-relaxed text-teal-700">{option.body}</p>
					</div>
				))}
			</div>
		</LedgerSection>
	);
}
