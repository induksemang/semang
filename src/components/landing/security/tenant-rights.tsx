import { ArrowLink, LedgerSection } from "../shared/ledger";

const rights = [
	{
		title: "Penghapusan yang tidak melubangi laporan",
		body: "Nama dan nomor penyewa benar-benar dikosongkan. Catatan tagihannya tetap ada, karena nama di tagihan lama adalah salinan yang dibuat saat tagihan itu terbit — seperti kuitansi kertas yang sudah tercetak."
	},
	{
		title: "Berhenti menerima pesan tanpa keluar dari kost",
		body: "Penyewa boleh meminta berhenti dikirimi pesan. Tagihannya tetap ada dan tetap terlihat olehmu, lalu kamu menagih dengan caramu sendiri."
	},
	{
		title: "Persetujuan tercatat, bukan diasumsikan",
		body: "Formulir isi mandiri memberi tahu penyewa untuk apa datanya dipakai, dan Semang menyimpan waktu serta versi teks yang ia setujui."
	},
	{
		title: "Yang tidak pernah kami minta",
		body: "Foto bukti transfer, nomor rekening atau kartu penyewa, dan lokasi GPS tidak dikumpulkan sama sekali. Yang tidak ada tidak bisa bocor."
	}
];

export function TenantRights() {
	return (
		<LedgerSection
			index="03"
			label="Penyewa"
			rhythm="section-sm"
			className="bg-warm-canvas border-t border-teal-200"
		>
			<h2 className="text-h2-sm mb-3.5 max-w-155 font-extrabold text-balance text-teal-900">
				Penyewamu punya hak atas datanya, dan itu tidak merepotkanmu
			</h2>
			<p className="text-warm-600 mb-7.5 max-w-165 text-base leading-relaxed">
				UU PDP memberi penyewa hak untuk mengakses, memperbaiki, dan menghapus datanya.
				Semang dirancang supaya hak itu bisa dijalankan tanpa merusak pembukuanmu.
			</p>

			<div className="border-warm-200 grid auto-rows-fr border-y lg:grid-cols-2">
				{rights.map((right) => (
					<div
						key={right.title}
						className="border-warm-200 py-5.5 not-first:border-t lg:odd:pr-7 lg:even:border-l lg:even:pl-7 lg:nth-2:border-t-0"
					>
						<h3 className="text-warm-900 mb-1.75 text-base font-extrabold">
							{right.title}
						</h3>
						<p className="text-warm-600 text-sm leading-relaxed">{right.body}</p>
					</div>
				))}
			</div>

			<ArrowLink href="/privasi" className="mt-6.5">
				Baca Kebijakan Privasi selengkapnya
			</ArrowLink>
		</LedgerSection>
	);
}
