import type { NotificationKind, NotificationChannel } from "@/types";

export interface ComposedMessage {
	url_atau_payload: string;
	preview: string;
}

export interface NotificationSender {
	compose(invoice: InvoiceForNotification, jenis: NotificationKind): ComposedMessage;
	channel(): NotificationChannel;
}

export interface InvoiceForNotification {
	id: string;
	roomLabel: string;
	period: string;
	totalAmount: number;
	dueDate: string;
	ownerPhone: string;
	tenantPhone: string;
	bankAccountNumber: string;
	bankCode: string;
	bankHolder: string;
	uploadToken: string;
	propertyName: string;
}
