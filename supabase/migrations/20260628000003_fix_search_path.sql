create or replace function public.update_updated_at()
returns trigger as $$
begin
  new.updated_at = pg_catalog.now();
  return new;
end;
$$ language plpgsql
set search_path = '';
