-- ============================================================
-- Mencabut paparan otomatis bawaan proyek lama.
--
-- Proyek Supabase yang dibuat sebelum default "tidak diekspos otomatis"
-- masih memberi anon dan authenticated hak akses ke setiap tabel baru di
-- skema public. Akibatnya terlihat saat membandingkan lingkungan: di database
-- lokal `select` dari `login_codes` sebagai anon dijawab "permission denied",
-- sedangkan di proyek yang tertaut dijawab 200 dengan nol baris.
--
-- Nol baris itu memang hasil kerja Row Level Security — tabel tanpa kebijakan
-- tidak meloloskan satu baris pun — jadi tidak ada data yang bocor. Yang
-- hilang adalah lapisan keduanya. Hak akses tabel seharusnya menghentikan
-- kueri sebelum RLS sempat dipanggil, dan satu kebijakan yang salah tulis
-- kelak tidak boleh langsung berarti tabel itu terbuka.
--
-- Karena itu seluruh hak akses dicabut lebih dulu, lalu diberikan ulang
-- persis seperti di 20260815000004. Setelah blok ini, hasilnya sama di
-- lingkungan mana pun, tidak lagi bergantung pada umur proyeknya.
-- ============================================================

revoke all on all tables in schema public from anon, authenticated;

grant usage on schema public to anon, authenticated, service_role;
grant all on all tables in schema public to service_role;

-- Data referensi, dibaca juga sebelum pemilik masuk.
grant select on provinces, regions, plans, plan_features to anon, authenticated;

-- Data pemilik yang memang diubah dari antarmuka.
grant select, insert, update, delete on
  bank_accounts,
  properties,
  room_types,
  rooms,
  room_assignments,
  multi_period_groups,
  invoice_counters,
  invoices,
  invoice_items,
  payment_links,
  maintenance_tickets,
  meter_readings
to authenticated;

-- Lahir dari cron, webhook, dan penagihan langganan — bukan dari antarmuka.
grant select on
  messages,
  subscription_invoices,
  audit_events,
  message_cost_months
to authenticated;

-- Hak tulis yang dipersempit ke kolom tertentu. Alasan tiap pembatasan
-- dijelaskan di 20260815000004.
grant select on subscriptions to authenticated;
grant update (cancellation_requested_at) on subscriptions to authenticated;

grant select on auth_identities to authenticated;
grant select on xendit_sub_accounts to authenticated;
grant select on property_staff to authenticated;

grant select on users to authenticated;
grant update (name, locale, deletion_requested_at) on users to authenticated;

grant select on payments to authenticated;
grant insert (
  invoice_id, owner_id, source, amount, currency, status,
  idempotency_key, recorded_by, note, paid_at
) on payments to authenticated;
grant update (status, note, paid_at) on payments to authenticated;
grant delete on payments to authenticated;

grant select on tenants to authenticated;
grant insert (
  property_id, owner_id, name, whatsapp_number, rent_unit, unit_amount,
  unit_amount_is_override, first_invoice_treatment, moved_in_at, moved_out_at,
  next_due_date, consent_at, consent_version, messaging_opted_out_at,
  anonymized_at
) on tenants to authenticated;
grant update (
  name, whatsapp_number, rent_unit, unit_amount, unit_amount_is_override,
  first_invoice_treatment, moved_in_at, moved_out_at, next_due_date,
  consent_at, consent_version, messaging_opted_out_at, anonymized_at
) on tenants to authenticated;
grant delete on tenants to authenticated;

-- Tetap tanpa akses klien: login_codes, request_limits, message_templates,
-- message_rates, webhook_events, dan public_tokens.
