import type { NotificationSender, ComposedMessage, InvoiceForNotification } from "./types";
import type { NotificationKind, NotificationChannel } from "@/types";
import { formatRupiah } from "@/lib/utils";

export class WaLinkSender implements NotificationSender {
	channel(): NotificationChannel {
		return "wa_link";
	}

	compose(invoice: InvoiceForNotification, jenis: NotificationKind): ComposedMessage {
		const uploadUrl = `${process.env.NEXT_PUBLIC_APP_URL}/p/proof/${invoice.uploadToken}`;
		const sapaan = this.getSapaan(jenis);
		const rekening = `${invoice.bankCode} ${invoice.bankAccountNumber} a.n. ${invoice.bankHolder}`;

		const teks = [
			`${sapaan}`,
			``,
			`Tagihan sewa *${invoice.propertyName}* — ${invoice.roomLabel}`,
			`Periode: *${invoice.period}*`,
			`Jumlah: *${formatRupiah(invoice.totalAmount)}*`,
			`Jatuh tempo: *${invoice.dueDate}*`,
			``,
			`Transfer ke:`,
			`${rekening}`,
			``,
			`Setelah transfer, upload buktinya di:`,
			uploadUrl
		].join("\n");

		const encodedTeks = encodeURIComponent(teks);
		const url = `https://wa.me/${invoice.tenantPhone}?text=${encodedTeks}`;

		return { url_atau_payload: url, preview: teks };
	}

	private getSapaan(jenis: NotificationKind): string {
		const sapaan: Record<NotificationKind, string> = {
			tagihan: "Halo! Ini tagihan sewa bulan ini.",
			h_minus_3: "Pengingat: tagihan sewa jatuh tempo 3 hari lagi.",
			hari_h: "Pengingat: tagihan sewa jatuh tempo hari ini.",
			h_plus_3: "Tagihan sewa sudah lewat jatuh tempo. Mohon segera dibayar.",
			h_plus_7: "Tagihan sewa sudah 7 hari lewat jatuh tempo. Harap segera dilunasi."
		};
		return sapaan[jenis];
	}
}
