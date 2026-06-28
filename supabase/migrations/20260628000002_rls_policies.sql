-- Enable RLS semua tabel
alter table users enable row level security;
alter table bank_accounts enable row level security;
alter table properties enable row level security;
alter table property_staff enable row level security;
alter table subscriptions enable row level security;
alter table subscription_addons enable row level security;
alter table plans enable row level security;
alter table plan_features enable row level security;
alter table rooms enable row level security;
alter table tenants enable row level security;
alter table invoices enable row level security;
alter table invoice_items enable row level security;
alter table proofs enable row level security;
alter table payments enable row level security;
alter table invoice_events enable row level security;
alter table notifications enable row level security;
alter table public_tokens enable row level security;
alter table webhook_logs enable row level security;

-- ============================================================
-- LEVEL 1: DIRECT OWNERSHIP
-- ============================================================

create policy "users: own row only"
  on users for all using (id = auth.uid());

create policy "bank_accounts: owner only"
  on bank_accounts for all using (user_id = auth.uid());

create policy "properties: owner only"
  on properties for all using (owner_id = auth.uid());

create policy "subscriptions: owner only"
  on subscriptions for all using (owner_id = auth.uid());

create policy "subscription_addons: via subscription"
  on subscription_addons for all using (
    exists (
      select 1 from subscriptions
      where subscriptions.id = subscription_addons.subscription_id
        and subscriptions.owner_id = auth.uid()
    )
  );

-- Plans & features: semua bisa baca (publik untuk onboarding)
create policy "plans: public read"
  on plans for select using (true);

create policy "plan_features: public read"
  on plan_features for select using (true);

-- ============================================================
-- LEVEL 2: VIA PROPERTIES JOIN
-- ============================================================

create policy "property_staff: property owner"
  on property_staff for all using (
    exists (
      select 1 from properties
      where properties.id = property_staff.property_id
        and properties.owner_id = auth.uid()
    )
  );

create policy "rooms: via property owner"
  on rooms for all using (
    exists (
      select 1 from properties
      where properties.id = rooms.property_id
        and properties.owner_id = auth.uid()
    )
  );

-- ============================================================
-- LEVEL 3: VIA ROOMS → PROPERTIES JOIN
-- ============================================================

create policy "tenants: via property owner"
  on tenants for all using (
    exists (
      select 1 from rooms
      join properties on properties.id = rooms.property_id
      where rooms.id = tenants.room_id
        and properties.owner_id = auth.uid()
    )
  );

create policy "invoices: via property owner"
  on invoices for all using (
    exists (
      select 1 from rooms
      join properties on properties.id = rooms.property_id
      where rooms.id = invoices.room_id
        and properties.owner_id = auth.uid()
    )
  );

-- ============================================================
-- LEVEL 4: VIA INVOICES → ROOMS → PROPERTIES JOIN
-- ============================================================

create policy "invoice_items: via property owner"
  on invoice_items for all using (
    exists (
      select 1 from invoices
      join rooms on rooms.id = invoices.room_id
      join properties on properties.id = rooms.property_id
      where invoices.id = invoice_items.invoice_id
        and properties.owner_id = auth.uid()
    )
  );

create policy "proofs: via property owner"
  on proofs for all using (
    exists (
      select 1 from invoices
      join rooms on rooms.id = invoices.room_id
      join properties on properties.id = rooms.property_id
      where invoices.id = proofs.invoice_id
        and properties.owner_id = auth.uid()
    )
  );

create policy "payments: via property owner"
  on payments for all using (
    exists (
      select 1 from invoices
      join rooms on rooms.id = invoices.room_id
      join properties on properties.id = rooms.property_id
      where invoices.id = payments.invoice_id
        and properties.owner_id = auth.uid()
    )
  );

create policy "invoice_events: via property owner"
  on invoice_events for all using (
    exists (
      select 1 from invoices
      join rooms on rooms.id = invoices.room_id
      join properties on properties.id = rooms.property_id
      where invoices.id = invoice_events.invoice_id
        and properties.owner_id = auth.uid()
    )
  );

create policy "notifications: via property owner"
  on notifications for all using (
    exists (
      select 1 from invoices
      join rooms on rooms.id = invoices.room_id
      join properties on properties.id = rooms.property_id
      where invoices.id = notifications.invoice_id
        and properties.owner_id = auth.uid()
    )
  );

-- ============================================================
-- NO DIRECT ACCESS — hanya via service role (RPC)
-- ============================================================

-- public_tokens diakses halaman publik via Postgres RPC function dengan service role
create policy "public_tokens: no direct client access"
  on public_tokens for all using (false);

-- webhook_logs hanya diakses service role (cron endpoint)
create policy "webhook_logs: no direct client access"
  on webhook_logs for all using (false);
