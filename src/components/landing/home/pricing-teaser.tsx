import { Action } from "../shared/action";
import { LedgerSection } from "../shared/ledger";

export function PricingTeaser() {
	return (
		<LedgerSection index="06" label="Harga" className="border-warm-200 bg-warm-canvas border-t">
			<div className="flex flex-wrap items-end justify-between gap-[clamp(24px,4vw,56px)]">
				<div className="min-w-0 flex-[1_1_420px]">
					<h2 className="text-h2 mb-3.5 max-w-140 font-extrabold text-balance text-teal-900">
						Dihitung per kamar terisi, mulai Rp2.000
					</h2>
					<p className="text-warm-600 max-w-140 text-base leading-relaxed">
						Kamar yang kosong tidak menagihmu. Kost 10 kamar dengan 8 terisi membayar
						Rp20.000 sebulan — kira-kira seharga sekali parkir dan segelas kopi.
					</p>
				</div>
				<Action href="/harga" className="w-full flex-none lg:w-auto">
					Lihat semua paket
				</Action>
			</div>
		</LedgerSection>
	);
}
