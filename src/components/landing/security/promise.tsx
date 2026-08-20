import { LedgerSection } from "../shared/ledger";

const never = [
	"Menahan dana sewamu sebelum dicairkan",
	"Memotong komisi dari uang sewa yang masuk",
	"Menambahkan biaya transaksi ke tagihan penyewa",
	"Menjual atau menyewakan data kost dan penyewa",
	"Mengunci datamu saat kamu berhenti berlangganan",
	"Mengirim pesan promosi ke nomor penyewamu"
];

const always = [
	"Sewa masuk langsung ke rekeningmu",
	"Data kostmu terpisah dari kost lain, dikunci di tingkat basis data",
	"Halaman tanpa login dibuka lewat tautan bertoken acak yang ada masa berlakunya",
	"Semua catatan bisa diekspor ke CSV atau Excel kapan saja",
	"Akun bisa dihapus, dengan tenggang 30 hari sebelum permanen",
	"Pesan ke penyewa hanya berisi tagihan dan pengingat"
];

const kicker = "mb-4.5 font-mono text-[10.5px] leading-snug font-bold tracking-widest uppercase";

export function PromiseSection() {
	return (
		<LedgerSection
			index="02"
			label="Janji kami"
			tone="teal"
			rhythm="section-sm"
			className="border-t border-teal-200 bg-teal-50"
		>
			<h2 className="text-h2-sm mb-7.5 max-w-155 font-extrabold text-balance text-teal-900">
				Dua daftar yang sebaiknya kamu pegang
			</h2>

			<div className="grid border border-teal-200 bg-white lg:grid-cols-2">
				<div className="p-[clamp(22px,3vw,32px)]">
					<h3 className={`${kicker} text-danger-fg`}>Yang tidak akan kami lakukan</h3>
					<ul className="text-muted-foreground flex flex-col gap-3.25 text-sm leading-normal line-through">
						{never.map((item) => (
							<li key={item}>{item}</li>
						))}
					</ul>
				</div>
				<div className="bg-warm-25 border-t border-teal-200 p-[clamp(22px,3vw,32px)] lg:border-t-0 lg:border-l">
					<h3 className={`${kicker} text-success-fg`}>Yang selalu berlaku</h3>
					<ul className="text-warm-900 flex flex-col gap-3.25 text-sm leading-normal">
						{always.map((item) => (
							<li key={item}>{item}</li>
						))}
					</ul>
				</div>
			</div>

			<p className="mt-4.5 max-w-180 text-sm leading-relaxed text-teal-700">
				Semang juga tidak memakai kata sandi sama sekali: masuk lewat akun Google atau kode
				sekali pakai ke nomor WhatsApp-mu. Kata sandi yang tidak pernah disimpan tidak bisa
				ikut bocor.
			</p>
		</LedgerSection>
	);
}
