import { LedgerSection } from "../shared/ledger";

const statuses = [
	["Kosong", "Siap disewakan"],
	["Terisi", "Ada penyewa yang menempati"],
	["Dipesan", "Ditahan untuk penyewa yang sedang dipindah sementara"],
	["Sedang dibangun", "Belum pernah bisa disewakan"],
	["Sedang direnovasi", "Sudah ada, sementara tidak bisa ditempati"],
	["Tidak tersedia", "Sebab lain, alasannya dicatat"]
];

const notes = [
	{
		title: "Tipe kamar dengan harga sendiri",
		body: "Standar, AC, kamar mandi dalam. Kamar tanpa tipe memakai harga bawaan kost, dan satu kamar tertentu tetap bisa dipatok khusus."
	},
	{
		title: "Penyewa mengisi datanya sendiri",
		body: "Tiap kamar punya link isi mandiri bertoken. Sebar ke grup WA kost, penyewa isi nama dan nomornya dari browser. Input manual tetap ada kalau lebih praktis."
	},
	{
		title: "Pindah kamar tanpa memecah riwayat",
		body: "Pindah tetap boleh menyesuaikan sewa. Pindah sementara karena renovasi tidak: sewanya tidak berubah meski kamar penggantinya lebih mahal, kamar asalnya ditahan supaya tidak tersewakan ke orang lain, dan penyewanya tetap satu orang yang sama."
	}
];

export function Rooms() {
	return (
		<LedgerSection
			index="01"
			label="Kost & kamar"
			rhythm="section-sm"
			className="border-warm-200 bg-warm-25 border-t"
		>
			<h2 className="text-h2-sm mb-3.5 max-w-155 font-extrabold text-balance text-teal-900">
				Kamar yang belum jadi tidak membuat okupansimu terlihat buruk
			</h2>
			<p className="text-warm-600 mb-8 max-w-160 text-base leading-relaxed">
				Kost punya nama, jumlah kamar, harga bawaan, dan wilayah — kota atau kabupaten yang
				dipilih dari daftar, bukan diketik. Wilayah itu yang menentukan zona waktu
				penagihan, jadi kamu tidak perlu memikirkan zona waktu sama sekali.
			</p>

			<div className="grid gap-[clamp(24px,3vw,48px)] lg:grid-cols-[1.1fr_1fr]">
				<table className="w-full border-collapse text-left">
					<thead>
						<tr>
							<th
								colSpan={2}
								className="border-warm-200 text-muted-foreground border-b pb-2.5 font-mono text-[10.5px] leading-snug font-bold tracking-widest uppercase"
							>
								Enam status kamar
							</th>
						</tr>
					</thead>
					<tbody>
						{statuses.map(([name, meaning]) => (
							<tr
								key={name}
								className="max-lg:last:[&>*]:border-b-warm-200 max-lg:last:[&>*]:border-b"
							>
								<th
									scope="row"
									className="border-warm-100 text-warm-900 border-t py-3.25 pr-4 text-left text-sm font-bold whitespace-nowrap"
								>
									{name}
								</th>
								<td className="border-warm-100 text-warm-600 border-t py-3.25 text-sm leading-normal">
									{meaning}
								</td>
							</tr>
						))}
					</tbody>
				</table>

				<div>
					{notes.map((note) => (
						<div
							key={note.title}
							className="not-first:border-warm-200 py-4.5 not-first:border-t last:pb-0"
						>
							<h3 className="text-warm-900 mb-1.75 text-base font-extrabold">
								{note.title}
							</h3>
							<p className="text-warm-600 text-sm leading-relaxed">{note.body}</p>
						</div>
					))}
				</div>
			</div>
		</LedgerSection>
	);
}
