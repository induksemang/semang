-- ============================================================
-- Dua peringatan Database Linter Supabase, satu berkas.
--
-- 1. extension_in_public — pg_trgm terpasang di skema public.
-- 2. rls_enabled_no_policy — enam tabel menyalakan RLS tanpa satu pun
--    kebijakan.
-- ============================================================

-- ------------------------------------------------------------
-- pg_trgm pindah dari public ke extensions
--
-- Skema public dibaca peran anon dan authenticated lewat Data API. Objek
-- ekstensi yang duduk di sana ikut terlihat dan ikut tertimpa saat nama
-- fungsinya bertabrakan dengan fungsi milik aplikasi. Skema extensions adalah
-- tempat yang sudah disediakan Supabase untuk itu dan sudah ada di search_path
-- bawaan peran database.
--
-- Indeks idx_regions_name_trgm menyimpan referensi ke operator class lewat OID,
-- bukan lewat nama, jadi indeksnya tetap terpakai setelah ekstensinya pindah.
-- Pencarian wilayah memakai ilike, yang operatornya berasal dari pg_catalog,
-- sehingga tidak bergantung pada search_path sama sekali.
--
-- Blok DO membuatnya aman dijalankan di lingkungan mana pun: kalau pg_trgm
-- sudah berada di extensions — misalnya database yang dibangun ulang dari nol
-- setelah berkas ini ada — perintahnya dilewati, bukan gagal.
-- ------------------------------------------------------------

create schema if not exists extensions;

do $$
begin
  if exists (
    select 1
    from pg_extension e
    join pg_namespace n on n.oid = e.extnamespace
    where e.extname = 'pg_trgm'
      and n.nspname = 'public'
  ) then
    alter extension pg_trgm set schema extensions;
  end if;
end;
$$;

-- ------------------------------------------------------------
-- Kebijakan tolak-semua untuk tabel tanpa akses klien
--
-- Enam tabel ini memang hanya disentuh service role, dan service role melewati
-- RLS sepenuhnya. Tanpa kebijakan, hasilnya sudah benar: nol baris untuk anon
-- dan authenticated.
--
-- Yang berubah di sini bukan perilakunya, melainkan cara niatnya tercatat.
-- "Tidak ada kebijakan" tidak bisa dibedakan dari "kebijakannya lupa ditulis",
-- dan linter memperingatkan justru karena tidak bisa membedakannya. Kebijakan
-- using (false) menyatakannya secara eksplisit: nol baris karena memang
-- diniatkan nol, bukan karena ada yang terlewat.
--
-- with check (false) menutup sisi tulisnya dengan cara yang sama, meski hak
-- akses tabel sudah lebih dulu menghentikan insert dan update dari klien.
-- ------------------------------------------------------------

create policy "login_codes: tanpa akses klien" on login_codes
  as permissive for all to anon, authenticated
  using (false) with check (false);

create policy "request_limits: tanpa akses klien" on request_limits
  as permissive for all to anon, authenticated
  using (false) with check (false);

create policy "message_templates: tanpa akses klien" on message_templates
  as permissive for all to anon, authenticated
  using (false) with check (false);

create policy "message_rates: tanpa akses klien" on message_rates
  as permissive for all to anon, authenticated
  using (false) with check (false);

create policy "public_tokens: tanpa akses klien" on public_tokens
  as permissive for all to anon, authenticated
  using (false) with check (false);

create policy "webhook_events: tanpa akses klien" on webhook_events
  as permissive for all to anon, authenticated
  using (false) with check (false);
