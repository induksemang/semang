export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
	public: {
		Tables: {
			audit_events: {
				Row: {
					actor_id: string | null;
					created_at: string;
					entity_id: string;
					entity_type: string;
					event_type: string;
					from_status: string | null;
					id: string;
					metadata: Json | null;
					owner_id: string | null;
					to_status: string | null;
				};
				Insert: {
					actor_id?: string | null;
					created_at?: string;
					entity_id: string;
					entity_type: string;
					event_type: string;
					from_status?: string | null;
					id?: string;
					metadata?: Json | null;
					owner_id?: string | null;
					to_status?: string | null;
				};
				Update: {
					actor_id?: string | null;
					created_at?: string;
					entity_id?: string;
					entity_type?: string;
					event_type?: string;
					from_status?: string | null;
					id?: string;
					metadata?: Json | null;
					owner_id?: string | null;
					to_status?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: "audit_events_actor_id_fkey";
						columns: ["actor_id"];
						isOneToOne: false;
						referencedRelation: "users";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "audit_events_owner_id_fkey";
						columns: ["owner_id"];
						isOneToOne: false;
						referencedRelation: "users";
						referencedColumns: ["id"];
					}
				];
			};
			auth_identities: {
				Row: {
					created_at: string;
					id: string;
					last_used_at: string | null;
					provider: string;
					provider_subject: string;
					revoked_at: string | null;
					user_id: string;
				};
				Insert: {
					created_at?: string;
					id?: string;
					last_used_at?: string | null;
					provider: string;
					provider_subject: string;
					revoked_at?: string | null;
					user_id: string;
				};
				Update: {
					created_at?: string;
					id?: string;
					last_used_at?: string | null;
					provider?: string;
					provider_subject?: string;
					revoked_at?: string | null;
					user_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: "auth_identities_user_id_fkey";
						columns: ["user_id"];
						isOneToOne: false;
						referencedRelation: "users";
						referencedColumns: ["id"];
					}
				];
			};
			bank_accounts: {
				Row: {
					account_holder: string;
					account_number: string;
					bank_code: string;
					created_at: string;
					deleted_at: string | null;
					id: string;
					is_default: boolean;
					updated_at: string;
					user_id: string;
				};
				Insert: {
					account_holder: string;
					account_number: string;
					bank_code: string;
					created_at?: string;
					deleted_at?: string | null;
					id?: string;
					is_default?: boolean;
					updated_at?: string;
					user_id: string;
				};
				Update: {
					account_holder?: string;
					account_number?: string;
					bank_code?: string;
					created_at?: string;
					deleted_at?: string | null;
					id?: string;
					is_default?: boolean;
					updated_at?: string;
					user_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: "bank_accounts_user_id_fkey";
						columns: ["user_id"];
						isOneToOne: false;
						referencedRelation: "users";
						referencedColumns: ["id"];
					}
				];
			};
			invoice_counters: {
				Row: {
					created_at: string;
					id: string;
					last_number: number;
					owner_id: string;
					period: string;
					updated_at: string;
				};
				Insert: {
					created_at?: string;
					id?: string;
					last_number?: number;
					owner_id: string;
					period: string;
					updated_at?: string;
				};
				Update: {
					created_at?: string;
					id?: string;
					last_number?: number;
					owner_id?: string;
					period?: string;
					updated_at?: string;
				};
				Relationships: [
					{
						foreignKeyName: "invoice_counters_owner_id_fkey";
						columns: ["owner_id"];
						isOneToOne: false;
						referencedRelation: "users";
						referencedColumns: ["id"];
					}
				];
			};
			invoice_items: {
				Row: {
					amount: number;
					created_at: string;
					description: string;
					id: string;
					invoice_id: string;
					kind: string;
					metadata: Json | null;
				};
				Insert: {
					amount: number;
					created_at?: string;
					description: string;
					id?: string;
					invoice_id: string;
					kind: string;
					metadata?: Json | null;
				};
				Update: {
					amount?: number;
					created_at?: string;
					description?: string;
					id?: string;
					invoice_id?: string;
					kind?: string;
					metadata?: Json | null;
				};
				Relationships: [
					{
						foreignKeyName: "invoice_items_invoice_id_fkey";
						columns: ["invoice_id"];
						isOneToOne: false;
						referencedRelation: "invoices";
						referencedColumns: ["id"];
					}
				];
			};
			invoices: {
				Row: {
					amount_paid: number;
					cancellation_reason: string | null;
					cancelled_at: string | null;
					created_at: string;
					currency: string;
					defaulted_at: string | null;
					discount_total: number;
					due_date: string;
					id: string;
					idempotency_key: string;
					invoice_number: string;
					multi_period_group_id: string | null;
					overdue_at: string | null;
					owner_id: string;
					paid_at: string | null;
					parent_invoice_id: string | null;
					period_end: string;
					period_label: string;
					period_sequence: number | null;
					period_start: string;
					rent_unit: string;
					room_id: string;
					sent_at: string | null;
					status: string;
					subtotal: number;
					tenant_id: string;
					tenant_name_snapshot: string;
					tenant_whatsapp_number_snapshot: string;
					total_amount: number;
					updated_at: string;
				};
				Insert: {
					amount_paid?: number;
					cancellation_reason?: string | null;
					cancelled_at?: string | null;
					created_at?: string;
					currency?: string;
					defaulted_at?: string | null;
					discount_total?: number;
					due_date: string;
					id?: string;
					idempotency_key: string;
					invoice_number: string;
					multi_period_group_id?: string | null;
					overdue_at?: string | null;
					owner_id: string;
					paid_at?: string | null;
					parent_invoice_id?: string | null;
					period_end: string;
					period_label: string;
					period_sequence?: number | null;
					period_start: string;
					rent_unit: string;
					room_id: string;
					sent_at?: string | null;
					status?: string;
					subtotal: number;
					tenant_id: string;
					tenant_name_snapshot: string;
					tenant_whatsapp_number_snapshot: string;
					total_amount: number;
					updated_at?: string;
				};
				Update: {
					amount_paid?: number;
					cancellation_reason?: string | null;
					cancelled_at?: string | null;
					created_at?: string;
					currency?: string;
					defaulted_at?: string | null;
					discount_total?: number;
					due_date?: string;
					id?: string;
					idempotency_key?: string;
					invoice_number?: string;
					multi_period_group_id?: string | null;
					overdue_at?: string | null;
					owner_id?: string;
					paid_at?: string | null;
					parent_invoice_id?: string | null;
					period_end?: string;
					period_label?: string;
					period_sequence?: number | null;
					period_start?: string;
					rent_unit?: string;
					room_id?: string;
					sent_at?: string | null;
					status?: string;
					subtotal?: number;
					tenant_id?: string;
					tenant_name_snapshot?: string;
					tenant_whatsapp_number_snapshot?: string;
					total_amount?: number;
					updated_at?: string;
				};
				Relationships: [
					{
						foreignKeyName: "invoices_multi_period_group_id_fkey";
						columns: ["multi_period_group_id"];
						isOneToOne: false;
						referencedRelation: "multi_period_groups";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "invoices_owner_id_fkey";
						columns: ["owner_id"];
						isOneToOne: false;
						referencedRelation: "users";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "invoices_parent_invoice_id_fkey";
						columns: ["parent_invoice_id"];
						isOneToOne: false;
						referencedRelation: "invoices";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "invoices_room_id_fkey";
						columns: ["room_id"];
						isOneToOne: false;
						referencedRelation: "rooms";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "invoices_tenant_id_fkey";
						columns: ["tenant_id"];
						isOneToOne: false;
						referencedRelation: "tenants";
						referencedColumns: ["id"];
					}
				];
			};
			login_codes: {
				Row: {
					attempt_count: number;
					code_hash: string;
					consumed_at: string | null;
					created_at: string;
					expires_at: string;
					id: string;
					invalidated_at: string | null;
					purpose: string;
					user_id: string | null;
					whatsapp_number: string;
				};
				Insert: {
					attempt_count?: number;
					code_hash: string;
					consumed_at?: string | null;
					created_at?: string;
					expires_at: string;
					id?: string;
					invalidated_at?: string | null;
					purpose: string;
					user_id?: string | null;
					whatsapp_number: string;
				};
				Update: {
					attempt_count?: number;
					code_hash?: string;
					consumed_at?: string | null;
					created_at?: string;
					expires_at?: string;
					id?: string;
					invalidated_at?: string | null;
					purpose?: string;
					user_id?: string | null;
					whatsapp_number?: string;
				};
				Relationships: [
					{
						foreignKeyName: "login_codes_user_id_fkey";
						columns: ["user_id"];
						isOneToOne: false;
						referencedRelation: "users";
						referencedColumns: ["id"];
					}
				];
			};
			maintenance_tickets: {
				Row: {
					assigned_to: string | null;
					created_at: string;
					description: string | null;
					id: string;
					owner_id: string;
					priority: string;
					reported_by_tenant_id: string | null;
					resolved_at: string | null;
					room_id: string;
					status: string;
					title: string;
					updated_at: string;
				};
				Insert: {
					assigned_to?: string | null;
					created_at?: string;
					description?: string | null;
					id?: string;
					owner_id: string;
					priority: string;
					reported_by_tenant_id?: string | null;
					resolved_at?: string | null;
					room_id: string;
					status: string;
					title: string;
					updated_at?: string;
				};
				Update: {
					assigned_to?: string | null;
					created_at?: string;
					description?: string | null;
					id?: string;
					owner_id?: string;
					priority?: string;
					reported_by_tenant_id?: string | null;
					resolved_at?: string | null;
					room_id?: string;
					status?: string;
					title?: string;
					updated_at?: string;
				};
				Relationships: [
					{
						foreignKeyName: "maintenance_tickets_assigned_to_fkey";
						columns: ["assigned_to"];
						isOneToOne: false;
						referencedRelation: "users";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "maintenance_tickets_owner_id_fkey";
						columns: ["owner_id"];
						isOneToOne: false;
						referencedRelation: "users";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "maintenance_tickets_reported_by_tenant_id_fkey";
						columns: ["reported_by_tenant_id"];
						isOneToOne: false;
						referencedRelation: "tenants";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "maintenance_tickets_room_id_fkey";
						columns: ["room_id"];
						isOneToOne: false;
						referencedRelation: "rooms";
						referencedColumns: ["id"];
					}
				];
			};
			message_cost_months: {
				Row: {
					billable_count: number;
					charged_amount: number;
					delivered_count: number;
					id: string;
					month: string;
					owner_id: string;
					property_id: string | null;
					summarised_at: string;
				};
				Insert: {
					billable_count?: number;
					charged_amount?: number;
					delivered_count?: number;
					id?: string;
					month: string;
					owner_id: string;
					property_id?: string | null;
					summarised_at?: string;
				};
				Update: {
					billable_count?: number;
					charged_amount?: number;
					delivered_count?: number;
					id?: string;
					month?: string;
					owner_id?: string;
					property_id?: string | null;
					summarised_at?: string;
				};
				Relationships: [
					{
						foreignKeyName: "message_cost_months_owner_id_fkey";
						columns: ["owner_id"];
						isOneToOne: false;
						referencedRelation: "users";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "message_cost_months_property_id_fkey";
						columns: ["property_id"];
						isOneToOne: false;
						referencedRelation: "properties";
						referencedColumns: ["id"];
					}
				];
			};
			message_rates: {
				Row: {
					category: string;
					created_at: string;
					currency: string;
					effective_from: string;
					effective_to: string | null;
					id: string;
					market: string;
					rate_per_message: number;
					read_at: string;
					source_url: string | null;
				};
				Insert: {
					category: string;
					created_at?: string;
					currency?: string;
					effective_from: string;
					effective_to?: string | null;
					id?: string;
					market?: string;
					rate_per_message: number;
					read_at: string;
					source_url?: string | null;
				};
				Update: {
					category?: string;
					created_at?: string;
					currency?: string;
					effective_from?: string;
					effective_to?: string | null;
					id?: string;
					market?: string;
					rate_per_message?: number;
					read_at?: string;
					source_url?: string | null;
				};
				Relationships: [];
			};
			message_templates: {
				Row: {
					approved_at: string | null;
					category: string;
					code: string;
					created_at: string;
					id: string;
					language: string;
					meta_template_name: string | null;
					status: string;
					updated_at: string;
					version: number;
				};
				Insert: {
					approved_at?: string | null;
					category: string;
					code: string;
					created_at?: string;
					id?: string;
					language?: string;
					meta_template_name?: string | null;
					status: string;
					updated_at?: string;
					version: number;
				};
				Update: {
					approved_at?: string | null;
					category?: string;
					code?: string;
					created_at?: string;
					id?: string;
					language?: string;
					meta_template_name?: string | null;
					status?: string;
					updated_at?: string;
					version?: number;
				};
				Relationships: [];
			};
			messages: {
				Row: {
					cancelled_at: string | null;
					charged_amount: number | null;
					created_at: string;
					delivered_at: string | null;
					error_code: string | null;
					failed_at: string | null;
					id: string;
					idempotency_key: string;
					invoice_id: string | null;
					is_billable: boolean | null;
					kind: string;
					login_code_id: string | null;
					message_rate_id: string | null;
					owner_id: string;
					payload: Json;
					pricing_category: string | null;
					pricing_type: string | null;
					property_id: string | null;
					recipient_user_id: string | null;
					recipient_whatsapp_number: string;
					scheduled_at: string;
					sent_at: string | null;
					status: string;
					subscription_id: string | null;
					template_id: string;
					template_version: number;
					updated_at: string;
					whatsapp_message_id: string | null;
				};
				Insert: {
					cancelled_at?: string | null;
					charged_amount?: number | null;
					created_at?: string;
					delivered_at?: string | null;
					error_code?: string | null;
					failed_at?: string | null;
					id?: string;
					idempotency_key: string;
					invoice_id?: string | null;
					is_billable?: boolean | null;
					kind: string;
					login_code_id?: string | null;
					message_rate_id?: string | null;
					owner_id: string;
					payload: Json;
					pricing_category?: string | null;
					pricing_type?: string | null;
					property_id?: string | null;
					recipient_user_id?: string | null;
					recipient_whatsapp_number: string;
					scheduled_at: string;
					sent_at?: string | null;
					status?: string;
					subscription_id?: string | null;
					template_id: string;
					template_version: number;
					updated_at?: string;
					whatsapp_message_id?: string | null;
				};
				Update: {
					cancelled_at?: string | null;
					charged_amount?: number | null;
					created_at?: string;
					delivered_at?: string | null;
					error_code?: string | null;
					failed_at?: string | null;
					id?: string;
					idempotency_key?: string;
					invoice_id?: string | null;
					is_billable?: boolean | null;
					kind?: string;
					login_code_id?: string | null;
					message_rate_id?: string | null;
					owner_id?: string;
					payload?: Json;
					pricing_category?: string | null;
					pricing_type?: string | null;
					property_id?: string | null;
					recipient_user_id?: string | null;
					recipient_whatsapp_number?: string;
					scheduled_at?: string;
					sent_at?: string | null;
					status?: string;
					subscription_id?: string | null;
					template_id?: string;
					template_version?: number;
					updated_at?: string;
					whatsapp_message_id?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: "messages_invoice_id_fkey";
						columns: ["invoice_id"];
						isOneToOne: false;
						referencedRelation: "invoices";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "messages_login_code_id_fkey";
						columns: ["login_code_id"];
						isOneToOne: false;
						referencedRelation: "login_codes";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "messages_message_rate_id_fkey";
						columns: ["message_rate_id"];
						isOneToOne: false;
						referencedRelation: "message_rates";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "messages_owner_id_fkey";
						columns: ["owner_id"];
						isOneToOne: false;
						referencedRelation: "users";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "messages_property_id_fkey";
						columns: ["property_id"];
						isOneToOne: false;
						referencedRelation: "properties";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "messages_recipient_user_id_fkey";
						columns: ["recipient_user_id"];
						isOneToOne: false;
						referencedRelation: "users";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "messages_subscription_id_fkey";
						columns: ["subscription_id"];
						isOneToOne: false;
						referencedRelation: "subscriptions";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "messages_template_id_fkey";
						columns: ["template_id"];
						isOneToOne: false;
						referencedRelation: "message_templates";
						referencedColumns: ["id"];
					}
				];
			};
			meter_readings: {
				Row: {
					created_at: string;
					id: string;
					invoice_item_id: string | null;
					kilowatt_hours: number;
					owner_id: string;
					photo_storage_key: string | null;
					reading_date: string;
					recorded_by: string | null;
					room_id: string;
				};
				Insert: {
					created_at?: string;
					id?: string;
					invoice_item_id?: string | null;
					kilowatt_hours: number;
					owner_id: string;
					photo_storage_key?: string | null;
					reading_date: string;
					recorded_by?: string | null;
					room_id: string;
				};
				Update: {
					created_at?: string;
					id?: string;
					invoice_item_id?: string | null;
					kilowatt_hours?: number;
					owner_id?: string;
					photo_storage_key?: string | null;
					reading_date?: string;
					recorded_by?: string | null;
					room_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: "meter_readings_invoice_item_id_fkey";
						columns: ["invoice_item_id"];
						isOneToOne: false;
						referencedRelation: "invoice_items";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "meter_readings_owner_id_fkey";
						columns: ["owner_id"];
						isOneToOne: false;
						referencedRelation: "users";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "meter_readings_recorded_by_fkey";
						columns: ["recorded_by"];
						isOneToOne: false;
						referencedRelation: "users";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "meter_readings_room_id_fkey";
						columns: ["room_id"];
						isOneToOne: false;
						referencedRelation: "rooms";
						referencedColumns: ["id"];
					}
				];
			};
			multi_period_groups: {
				Row: {
					amount_after_discount: number;
					amount_before_discount: number;
					created_at: string;
					created_by: string;
					discount_invoice_id: string | null;
					discount_kind: string;
					discount_value: number;
					id: string;
					owner_id: string;
					period_count: number;
					tenant_id: string;
				};
				Insert: {
					amount_after_discount: number;
					amount_before_discount: number;
					created_at?: string;
					created_by: string;
					discount_invoice_id?: string | null;
					discount_kind: string;
					discount_value: number;
					id?: string;
					owner_id: string;
					period_count: number;
					tenant_id: string;
				};
				Update: {
					amount_after_discount?: number;
					amount_before_discount?: number;
					created_at?: string;
					created_by?: string;
					discount_invoice_id?: string | null;
					discount_kind?: string;
					discount_value?: number;
					id?: string;
					owner_id?: string;
					period_count?: number;
					tenant_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: "multi_period_groups_created_by_fkey";
						columns: ["created_by"];
						isOneToOne: false;
						referencedRelation: "users";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "multi_period_groups_discount_invoice_id_fkey";
						columns: ["discount_invoice_id"];
						isOneToOne: false;
						referencedRelation: "invoices";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "multi_period_groups_owner_id_fkey";
						columns: ["owner_id"];
						isOneToOne: false;
						referencedRelation: "users";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "multi_period_groups_tenant_id_fkey";
						columns: ["tenant_id"];
						isOneToOne: false;
						referencedRelation: "tenants";
						referencedColumns: ["id"];
					}
				];
			};
			payment_links: {
				Row: {
					amount: number;
					created_at: string;
					expires_at: string | null;
					id: string;
					invoice_id: string;
					status: string;
					superseded_at: string | null;
					updated_at: string;
					url: string;
					xendit_invoice_id: string;
				};
				Insert: {
					amount: number;
					created_at?: string;
					expires_at?: string | null;
					id?: string;
					invoice_id: string;
					status: string;
					superseded_at?: string | null;
					updated_at?: string;
					url: string;
					xendit_invoice_id: string;
				};
				Update: {
					amount?: number;
					created_at?: string;
					expires_at?: string | null;
					id?: string;
					invoice_id?: string;
					status?: string;
					superseded_at?: string | null;
					updated_at?: string;
					url?: string;
					xendit_invoice_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: "payment_links_invoice_id_fkey";
						columns: ["invoice_id"];
						isOneToOne: false;
						referencedRelation: "invoices";
						referencedColumns: ["id"];
					}
				];
			};
			payments: {
				Row: {
					amount: number;
					created_at: string;
					currency: string;
					id: string;
					idempotency_key: string;
					invoice_id: string;
					is_auto_verified: boolean;
					note: string | null;
					owner_id: string;
					paid_at: string;
					payment_link_id: string | null;
					provider_fee: number | null;
					provider_payload: Json | null;
					provider_reference: string | null;
					recorded_by: string | null;
					source: string;
					status: string;
					updated_at: string;
				};
				Insert: {
					amount: number;
					created_at?: string;
					currency?: string;
					id?: string;
					idempotency_key: string;
					invoice_id: string;
					is_auto_verified?: boolean;
					note?: string | null;
					owner_id: string;
					paid_at: string;
					payment_link_id?: string | null;
					provider_fee?: number | null;
					provider_payload?: Json | null;
					provider_reference?: string | null;
					recorded_by?: string | null;
					source: string;
					status: string;
					updated_at?: string;
				};
				Update: {
					amount?: number;
					created_at?: string;
					currency?: string;
					id?: string;
					idempotency_key?: string;
					invoice_id?: string;
					is_auto_verified?: boolean;
					note?: string | null;
					owner_id?: string;
					paid_at?: string;
					payment_link_id?: string | null;
					provider_fee?: number | null;
					provider_payload?: Json | null;
					provider_reference?: string | null;
					recorded_by?: string | null;
					source?: string;
					status?: string;
					updated_at?: string;
				};
				Relationships: [
					{
						foreignKeyName: "payments_invoice_id_fkey";
						columns: ["invoice_id"];
						isOneToOne: false;
						referencedRelation: "invoices";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "payments_owner_id_fkey";
						columns: ["owner_id"];
						isOneToOne: false;
						referencedRelation: "users";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "payments_payment_link_id_fkey";
						columns: ["payment_link_id"];
						isOneToOne: false;
						referencedRelation: "payment_links";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "payments_recorded_by_fkey";
						columns: ["recorded_by"];
						isOneToOne: false;
						referencedRelation: "users";
						referencedColumns: ["id"];
					}
				];
			};
			plan_features: {
				Row: {
					created_at: string;
					enabled: boolean;
					feature_key: string;
					id: string;
					limit_value: number | null;
					plan_id: string;
				};
				Insert: {
					created_at?: string;
					enabled: boolean;
					feature_key: string;
					id?: string;
					limit_value?: number | null;
					plan_id: string;
				};
				Update: {
					created_at?: string;
					enabled?: boolean;
					feature_key?: string;
					id?: string;
					limit_value?: number | null;
					plan_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: "plan_features_plan_id_fkey";
						columns: ["plan_id"];
						isOneToOne: false;
						referencedRelation: "plans";
						referencedColumns: ["id"];
					}
				];
			};
			plans: {
				Row: {
					code: string;
					created_at: string;
					id: string;
					is_active: boolean;
					is_purchasable: boolean;
					maximum_properties: number | null;
					maximum_rooms: number | null;
					minimum_monthly_amount: number;
					name: string;
					price_per_room: number;
					updated_at: string;
				};
				Insert: {
					code: string;
					created_at?: string;
					id?: string;
					is_active?: boolean;
					is_purchasable: boolean;
					maximum_properties?: number | null;
					maximum_rooms?: number | null;
					minimum_monthly_amount: number;
					name: string;
					price_per_room: number;
					updated_at?: string;
				};
				Update: {
					code?: string;
					created_at?: string;
					id?: string;
					is_active?: boolean;
					is_purchasable?: boolean;
					maximum_properties?: number | null;
					maximum_rooms?: number | null;
					minimum_monthly_amount?: number;
					name?: string;
					price_per_room?: number;
					updated_at?: string;
				};
				Relationships: [];
			};
			properties: {
				Row: {
					created_at: string;
					default_rent: number;
					deleted_at: string | null;
					due_date_mode: string;
					fixed_due_day: number | null;
					id: string;
					name: string;
					owner_id: string;
					region_id: string | null;
					timezone: string | null;
					updated_at: string;
				};
				Insert: {
					created_at?: string;
					default_rent: number;
					deleted_at?: string | null;
					due_date_mode?: string;
					fixed_due_day?: number | null;
					id?: string;
					name: string;
					owner_id: string;
					region_id?: string | null;
					timezone?: string | null;
					updated_at?: string;
				};
				Update: {
					created_at?: string;
					default_rent?: number;
					deleted_at?: string | null;
					due_date_mode?: string;
					fixed_due_day?: number | null;
					id?: string;
					name?: string;
					owner_id?: string;
					region_id?: string | null;
					timezone?: string | null;
					updated_at?: string;
				};
				Relationships: [
					{
						foreignKeyName: "properties_owner_id_fkey";
						columns: ["owner_id"];
						isOneToOne: false;
						referencedRelation: "users";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "properties_region_id_fkey";
						columns: ["region_id"];
						isOneToOne: false;
						referencedRelation: "regions";
						referencedColumns: ["id"];
					}
				];
			};
			property_staff: {
				Row: {
					accepted_at: string | null;
					created_at: string;
					id: string;
					invited_at: string | null;
					owner_id: string;
					property_id: string;
					revoked_at: string | null;
					role: string;
					user_id: string;
				};
				Insert: {
					accepted_at?: string | null;
					created_at?: string;
					id?: string;
					invited_at?: string | null;
					owner_id: string;
					property_id: string;
					revoked_at?: string | null;
					role: string;
					user_id: string;
				};
				Update: {
					accepted_at?: string | null;
					created_at?: string;
					id?: string;
					invited_at?: string | null;
					owner_id?: string;
					property_id?: string;
					revoked_at?: string | null;
					role?: string;
					user_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: "property_staff_owner_id_fkey";
						columns: ["owner_id"];
						isOneToOne: false;
						referencedRelation: "users";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "property_staff_property_id_fkey";
						columns: ["property_id"];
						isOneToOne: false;
						referencedRelation: "properties";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "property_staff_user_id_fkey";
						columns: ["user_id"];
						isOneToOne: false;
						referencedRelation: "users";
						referencedColumns: ["id"];
					}
				];
			};
			provinces: {
				Row: {
					created_at: string;
					id: string;
					is_active: boolean;
					name: string;
					statistics_code: string;
					timezone: string;
					updated_at: string;
				};
				Insert: {
					created_at?: string;
					id?: string;
					is_active?: boolean;
					name: string;
					statistics_code: string;
					timezone: string;
					updated_at?: string;
				};
				Update: {
					created_at?: string;
					id?: string;
					is_active?: boolean;
					name?: string;
					statistics_code?: string;
					timezone?: string;
					updated_at?: string;
				};
				Relationships: [];
			};
			public_tokens: {
				Row: {
					created_at: string;
					expires_at: string;
					id: string;
					kind: string;
					owner_id: string;
					revoked_at: string | null;
					target_id: string;
					target_type: string;
					token_hash: string;
					used_at: string | null;
				};
				Insert: {
					created_at?: string;
					expires_at: string;
					id?: string;
					kind: string;
					owner_id: string;
					revoked_at?: string | null;
					target_id: string;
					target_type: string;
					token_hash: string;
					used_at?: string | null;
				};
				Update: {
					created_at?: string;
					expires_at?: string;
					id?: string;
					kind?: string;
					owner_id?: string;
					revoked_at?: string | null;
					target_id?: string;
					target_type?: string;
					token_hash?: string;
					used_at?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: "public_tokens_owner_id_fkey";
						columns: ["owner_id"];
						isOneToOne: false;
						referencedRelation: "users";
						referencedColumns: ["id"];
					}
				];
			};
			regions: {
				Row: {
					created_at: string;
					id: string;
					is_active: boolean;
					kind: string;
					name: string;
					province_id: string;
					statistics_code: string;
					superseded_by_region_id: string | null;
					updated_at: string;
				};
				Insert: {
					created_at?: string;
					id?: string;
					is_active?: boolean;
					kind: string;
					name: string;
					province_id: string;
					statistics_code: string;
					superseded_by_region_id?: string | null;
					updated_at?: string;
				};
				Update: {
					created_at?: string;
					id?: string;
					is_active?: boolean;
					kind?: string;
					name?: string;
					province_id?: string;
					statistics_code?: string;
					superseded_by_region_id?: string | null;
					updated_at?: string;
				};
				Relationships: [
					{
						foreignKeyName: "regions_province_id_fkey";
						columns: ["province_id"];
						isOneToOne: false;
						referencedRelation: "provinces";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "regions_superseded_by_region_id_fkey";
						columns: ["superseded_by_region_id"];
						isOneToOne: false;
						referencedRelation: "regions";
						referencedColumns: ["id"];
					}
				];
			};
			request_limits: {
				Row: {
					blocked_until: string | null;
					created_at: string;
					id: string;
					request_count: number;
					scope: string;
					scope_key: string;
					updated_at: string;
					violation_count: number;
					window_start: string;
				};
				Insert: {
					blocked_until?: string | null;
					created_at?: string;
					id?: string;
					request_count?: number;
					scope: string;
					scope_key: string;
					updated_at?: string;
					violation_count?: number;
					window_start: string;
				};
				Update: {
					blocked_until?: string | null;
					created_at?: string;
					id?: string;
					request_count?: number;
					scope?: string;
					scope_key?: string;
					updated_at?: string;
					violation_count?: number;
					window_start?: string;
				};
				Relationships: [];
			};
			room_assignments: {
				Row: {
					created_at: string;
					ended_on: string | null;
					id: string;
					kind: string;
					owner_id: string;
					reason: string | null;
					returns_to_room_id: string | null;
					room_id: string;
					started_on: string;
					tenant_id: string;
					updated_at: string;
				};
				Insert: {
					created_at?: string;
					ended_on?: string | null;
					id?: string;
					kind?: string;
					owner_id: string;
					reason?: string | null;
					returns_to_room_id?: string | null;
					room_id: string;
					started_on: string;
					tenant_id: string;
					updated_at?: string;
				};
				Update: {
					created_at?: string;
					ended_on?: string | null;
					id?: string;
					kind?: string;
					owner_id?: string;
					reason?: string | null;
					returns_to_room_id?: string | null;
					room_id?: string;
					started_on?: string;
					tenant_id?: string;
					updated_at?: string;
				};
				Relationships: [
					{
						foreignKeyName: "room_assignments_owner_id_fkey";
						columns: ["owner_id"];
						isOneToOne: false;
						referencedRelation: "users";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "room_assignments_returns_to_room_id_fkey";
						columns: ["returns_to_room_id"];
						isOneToOne: false;
						referencedRelation: "rooms";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "room_assignments_room_id_fkey";
						columns: ["room_id"];
						isOneToOne: false;
						referencedRelation: "rooms";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "room_assignments_tenant_id_fkey";
						columns: ["tenant_id"];
						isOneToOne: false;
						referencedRelation: "tenants";
						referencedColumns: ["id"];
					}
				];
			};
			room_types: {
				Row: {
					created_at: string;
					deleted_at: string | null;
					id: string;
					name: string;
					owner_id: string;
					property_id: string;
					rent: number;
					updated_at: string;
				};
				Insert: {
					created_at?: string;
					deleted_at?: string | null;
					id?: string;
					name: string;
					owner_id: string;
					property_id: string;
					rent: number;
					updated_at?: string;
				};
				Update: {
					created_at?: string;
					deleted_at?: string | null;
					id?: string;
					name?: string;
					owner_id?: string;
					property_id?: string;
					rent?: number;
					updated_at?: string;
				};
				Relationships: [
					{
						foreignKeyName: "room_types_owner_id_fkey";
						columns: ["owner_id"];
						isOneToOne: false;
						referencedRelation: "users";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "room_types_property_id_fkey";
						columns: ["property_id"];
						isOneToOne: false;
						referencedRelation: "properties";
						referencedColumns: ["id"];
					}
				];
			};
			rooms: {
				Row: {
					created_at: string;
					deleted_at: string | null;
					id: string;
					label: string | null;
					owner_id: string;
					property_id: string;
					rent_override: number | null;
					room_number: number;
					room_type_id: string | null;
					status: string;
					unavailable_reason: string | null;
					updated_at: string;
				};
				Insert: {
					created_at?: string;
					deleted_at?: string | null;
					id?: string;
					label?: string | null;
					owner_id: string;
					property_id: string;
					rent_override?: number | null;
					room_number: number;
					room_type_id?: string | null;
					status?: string;
					unavailable_reason?: string | null;
					updated_at?: string;
				};
				Update: {
					created_at?: string;
					deleted_at?: string | null;
					id?: string;
					label?: string | null;
					owner_id?: string;
					property_id?: string;
					rent_override?: number | null;
					room_number?: number;
					room_type_id?: string | null;
					status?: string;
					unavailable_reason?: string | null;
					updated_at?: string;
				};
				Relationships: [
					{
						foreignKeyName: "rooms_owner_id_fkey";
						columns: ["owner_id"];
						isOneToOne: false;
						referencedRelation: "users";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "rooms_property_id_fkey";
						columns: ["property_id"];
						isOneToOne: false;
						referencedRelation: "properties";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "rooms_room_type_id_fkey";
						columns: ["room_type_id"];
						isOneToOne: false;
						referencedRelation: "room_types";
						referencedColumns: ["id"];
					}
				];
			};
			subscription_invoices: {
				Row: {
					attempt_count: number;
					billing_cycle: string;
					computed_amount: number;
					created_at: string;
					discount_amount: number;
					failure_reason: string | null;
					id: string;
					idempotency_key: string;
					last_attempt_at: string | null;
					minimum_monthly_applied: boolean;
					occupied_rooms_snapshot: number;
					owner_id: string;
					paid_at: string | null;
					period_end: string;
					period_start: string;
					plan_id: string;
					price_per_room: number;
					provider_reference: string | null;
					snapshot_taken_at: string;
					status: string;
					subscription_id: string;
					total_amount: number;
					updated_at: string;
				};
				Insert: {
					attempt_count?: number;
					billing_cycle: string;
					computed_amount: number;
					created_at?: string;
					discount_amount?: number;
					failure_reason?: string | null;
					id?: string;
					idempotency_key: string;
					last_attempt_at?: string | null;
					minimum_monthly_applied: boolean;
					occupied_rooms_snapshot: number;
					owner_id: string;
					paid_at?: string | null;
					period_end: string;
					period_start: string;
					plan_id: string;
					price_per_room: number;
					provider_reference?: string | null;
					snapshot_taken_at: string;
					status: string;
					subscription_id: string;
					total_amount: number;
					updated_at?: string;
				};
				Update: {
					attempt_count?: number;
					billing_cycle?: string;
					computed_amount?: number;
					created_at?: string;
					discount_amount?: number;
					failure_reason?: string | null;
					id?: string;
					idempotency_key?: string;
					last_attempt_at?: string | null;
					minimum_monthly_applied?: boolean;
					occupied_rooms_snapshot?: number;
					owner_id?: string;
					paid_at?: string | null;
					period_end?: string;
					period_start?: string;
					plan_id?: string;
					price_per_room?: number;
					provider_reference?: string | null;
					snapshot_taken_at?: string;
					status?: string;
					subscription_id?: string;
					total_amount?: number;
					updated_at?: string;
				};
				Relationships: [
					{
						foreignKeyName: "subscription_invoices_owner_id_fkey";
						columns: ["owner_id"];
						isOneToOne: false;
						referencedRelation: "users";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "subscription_invoices_plan_id_fkey";
						columns: ["plan_id"];
						isOneToOne: false;
						referencedRelation: "plans";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "subscription_invoices_subscription_id_fkey";
						columns: ["subscription_id"];
						isOneToOne: false;
						referencedRelation: "subscriptions";
						referencedColumns: ["id"];
					}
				];
			};
			subscriptions: {
				Row: {
					billing_cycle: string | null;
					cancellation_effective_at: string | null;
					cancellation_requested_at: string | null;
					created_at: string;
					current_period_end: string | null;
					current_period_start: string | null;
					grace_period_ends_at: string | null;
					id: string;
					owner_id: string;
					plan_id: string;
					status: string;
					trial_ends_at: string | null;
					trial_started_at: string | null;
					updated_at: string;
				};
				Insert: {
					billing_cycle?: string | null;
					cancellation_effective_at?: string | null;
					cancellation_requested_at?: string | null;
					created_at?: string;
					current_period_end?: string | null;
					current_period_start?: string | null;
					grace_period_ends_at?: string | null;
					id?: string;
					owner_id: string;
					plan_id: string;
					status: string;
					trial_ends_at?: string | null;
					trial_started_at?: string | null;
					updated_at?: string;
				};
				Update: {
					billing_cycle?: string | null;
					cancellation_effective_at?: string | null;
					cancellation_requested_at?: string | null;
					created_at?: string;
					current_period_end?: string | null;
					current_period_start?: string | null;
					grace_period_ends_at?: string | null;
					id?: string;
					owner_id?: string;
					plan_id?: string;
					status?: string;
					trial_ends_at?: string | null;
					trial_started_at?: string | null;
					updated_at?: string;
				};
				Relationships: [
					{
						foreignKeyName: "subscriptions_owner_id_fkey";
						columns: ["owner_id"];
						isOneToOne: true;
						referencedRelation: "users";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "subscriptions_plan_id_fkey";
						columns: ["plan_id"];
						isOneToOne: false;
						referencedRelation: "plans";
						referencedColumns: ["id"];
					}
				];
			};
			tenants: {
				Row: {
					anonymized_at: string | null;
					consent_at: string | null;
					consent_version: string | null;
					created_at: string;
					first_invoice_treatment: string | null;
					id: string;
					messaging_opted_out_at: string | null;
					moved_in_at: string;
					moved_out_at: string | null;
					name: string | null;
					next_due_date: string | null;
					owner_id: string;
					property_id: string;
					rent_unit: string;
					unit_amount: number;
					unit_amount_is_override: boolean;
					updated_at: string;
					user_id: string | null;
					whatsapp_number: string | null;
				};
				Insert: {
					anonymized_at?: string | null;
					consent_at?: string | null;
					consent_version?: string | null;
					created_at?: string;
					first_invoice_treatment?: string | null;
					id?: string;
					messaging_opted_out_at?: string | null;
					moved_in_at: string;
					moved_out_at?: string | null;
					name?: string | null;
					next_due_date?: string | null;
					owner_id: string;
					property_id: string;
					rent_unit?: string;
					unit_amount: number;
					unit_amount_is_override?: boolean;
					updated_at?: string;
					user_id?: string | null;
					whatsapp_number?: string | null;
				};
				Update: {
					anonymized_at?: string | null;
					consent_at?: string | null;
					consent_version?: string | null;
					created_at?: string;
					first_invoice_treatment?: string | null;
					id?: string;
					messaging_opted_out_at?: string | null;
					moved_in_at?: string;
					moved_out_at?: string | null;
					name?: string | null;
					next_due_date?: string | null;
					owner_id?: string;
					property_id?: string;
					rent_unit?: string;
					unit_amount?: number;
					unit_amount_is_override?: boolean;
					updated_at?: string;
					user_id?: string | null;
					whatsapp_number?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: "tenants_owner_id_fkey";
						columns: ["owner_id"];
						isOneToOne: false;
						referencedRelation: "users";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "tenants_property_id_fkey";
						columns: ["property_id"];
						isOneToOne: false;
						referencedRelation: "properties";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "tenants_user_id_fkey";
						columns: ["user_id"];
						isOneToOne: false;
						referencedRelation: "users";
						referencedColumns: ["id"];
					}
				];
			};
			users: {
				Row: {
					created_at: string;
					deleted_at: string | null;
					deletion_requested_at: string | null;
					email: string | null;
					id: string;
					locale: string;
					name: string | null;
					updated_at: string;
					whatsapp_number: string | null;
					whatsapp_number_verified_at: string | null;
				};
				Insert: {
					created_at?: string;
					deleted_at?: string | null;
					deletion_requested_at?: string | null;
					email?: string | null;
					id: string;
					locale?: string;
					name?: string | null;
					updated_at?: string;
					whatsapp_number?: string | null;
					whatsapp_number_verified_at?: string | null;
				};
				Update: {
					created_at?: string;
					deleted_at?: string | null;
					deletion_requested_at?: string | null;
					email?: string | null;
					id?: string;
					locale?: string;
					name?: string | null;
					updated_at?: string;
					whatsapp_number?: string | null;
					whatsapp_number_verified_at?: string | null;
				};
				Relationships: [];
			};
			webhook_events: {
				Row: {
					attempt_count: number;
					created_at: string;
					event_type: string;
					external_id: string;
					id: string;
					last_error: string | null;
					payload: Json;
					processed: boolean;
					processed_at: string | null;
					source: string;
					updated_at: string;
				};
				Insert: {
					attempt_count?: number;
					created_at?: string;
					event_type: string;
					external_id: string;
					id?: string;
					last_error?: string | null;
					payload: Json;
					processed?: boolean;
					processed_at?: string | null;
					source: string;
					updated_at?: string;
				};
				Update: {
					attempt_count?: number;
					created_at?: string;
					event_type?: string;
					external_id?: string;
					id?: string;
					last_error?: string | null;
					payload?: Json;
					processed?: boolean;
					processed_at?: string | null;
					source?: string;
					updated_at?: string;
				};
				Relationships: [];
			};
			xendit_sub_accounts: {
				Row: {
					created_at: string;
					id: string;
					settlement_bank_account_id: string | null;
					updated_at: string;
					user_id: string;
					verification_completed_at: string | null;
					verification_rejection_reason: string | null;
					verification_status: string;
					verification_submitted_at: string | null;
					xendit_account_id: string | null;
				};
				Insert: {
					created_at?: string;
					id?: string;
					settlement_bank_account_id?: string | null;
					updated_at?: string;
					user_id: string;
					verification_completed_at?: string | null;
					verification_rejection_reason?: string | null;
					verification_status?: string;
					verification_submitted_at?: string | null;
					xendit_account_id?: string | null;
				};
				Update: {
					created_at?: string;
					id?: string;
					settlement_bank_account_id?: string | null;
					updated_at?: string;
					user_id?: string;
					verification_completed_at?: string | null;
					verification_rejection_reason?: string | null;
					verification_status?: string;
					verification_submitted_at?: string | null;
					xendit_account_id?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: "xendit_sub_accounts_settlement_bank_account_id_fkey";
						columns: ["settlement_bank_account_id"];
						isOneToOne: false;
						referencedRelation: "bank_accounts";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "xendit_sub_accounts_user_id_fkey";
						columns: ["user_id"];
						isOneToOne: true;
						referencedRelation: "users";
						referencedColumns: ["id"];
					}
				];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			show_limit: { Args: never; Returns: number };
			show_trgm: { Args: { "": string }; Returns: string[] };
			uuid_generate_v7: { Args: never; Returns: string };
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">];

export type Tables<
	DefaultSchemaTableNameOrOptions extends
		| keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
		| { schema: keyof DatabaseWithoutInternals },
	TableName extends (DefaultSchemaTableNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
				DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
		: never) = never
> = DefaultSchemaTableNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
			DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
			Row: infer R;
		}
		? R
		: never
	: DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
				DefaultSchema["Views"])
		? (DefaultSchema["Tables"] &
				DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
				Row: infer R;
			}
			? R
			: never
		: never;

export type TablesInsert<
	DefaultSchemaTableNameOrOptions extends
		keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
	TableName extends (DefaultSchemaTableNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
		: never) = never
> = DefaultSchemaTableNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Insert: infer I;
		}
		? I
		: never
	: DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
		? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
				Insert: infer I;
			}
			? I
			: never
		: never;

export type TablesUpdate<
	DefaultSchemaTableNameOrOptions extends
		keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
	TableName extends (DefaultSchemaTableNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
		: never) = never
> = DefaultSchemaTableNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Update: infer U;
		}
		? U
		: never
	: DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
		? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
				Update: infer U;
			}
			? U
			: never
		: never;

export type Enums<
	DefaultSchemaEnumNameOrOptions extends
		keyof DefaultSchema["Enums"] | { schema: keyof DatabaseWithoutInternals },
	EnumName extends (DefaultSchemaEnumNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
		: never) = never
> = DefaultSchemaEnumNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
	: DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
		? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
		: never;

export type CompositeTypes<
	PublicCompositeTypeNameOrOptions extends
		keyof DefaultSchema["CompositeTypes"] | { schema: keyof DatabaseWithoutInternals },
	CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
		: never) = never
> = PublicCompositeTypeNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
	: PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
		? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
		: never;

export const Constants = {
	public: {
		Enums: {}
	}
} as const;
