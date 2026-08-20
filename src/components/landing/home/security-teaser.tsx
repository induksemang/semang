import { ArrowLink, LedgerSection } from "../shared/ledger";

const promises = [
	{
		shape: "size-3.5 bg-teal-350",
		title: "Tidak memegang uangmu",
		body: "Tidak ada saldo yang menginap di Semang, tidak ada pencairan yang perlu kamu tunggu."
	},
	{
		shape: "size-3.5 rounded-full bg-teal-350",
		title: "Tidak menjual datamu",
		body: "Data kost dan penyewa dipakai untuk menagih dan mencatat, tidak untuk iklan atau dibagi ke siapa pun."
	},
	{
		shape: "h-0.5 w-3.5 bg-teal-350",
		title: "Tidak menyandera datamu",
		body: "Berhenti berlangganan tidak menghapus apa pun. Kamar, penyewa, dan riwayat tetap utuh dan bisa diekspor."
	}
];

export function SecurityTeaser() {
	return (
		<LedgerSection index="05" label="Kepercayaan" tone="teal" className="bg-teal-900">
			<h2 className="text-h2 mb-3.5 max-w-155 font-extrabold text-balance text-white">
				Uang penyewa tidak pernah melewati Semang
			</h2>
			<p className="mb-9 max-w-150 text-base leading-relaxed text-teal-200">
				Pembayaran mendarat di rekeningmu lewat sub-akun Xendit milikmu sendiri. Kami cuma
				menulis catatannya.
			</p>

			<div className="grid border-y border-teal-600 lg:grid-cols-3">
				{promises.map((promise) => (
					<div
						key={promise.title}
						className="border-t border-teal-600 pt-6.5 pb-7 first:border-t-0 lg:border-t-0 lg:border-l lg:px-7 lg:first:border-l-0 lg:first:pl-0 lg:last:pr-0"
					>
						<div className="mb-4 grid size-10 place-items-center border-[1.5px] border-teal-400">
							<span aria-hidden className={promise.shape} />
						</div>
						<h3 className="mb-2 text-base font-extrabold text-white">
							{promise.title}
						</h3>
						<p className="text-sm leading-relaxed text-teal-200">{promise.body}</p>
					</div>
				))}
			</div>

			<ArrowLink href="/keamanan" className="text-teal-350 mt-8 hover:text-white">
				Cara kami menjaganya
			</ArrowLink>
		</LedgerSection>
	);
}
