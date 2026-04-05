create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  role text not null default 'guest' check (role in ('guest', 'admin')),
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.menu_items (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  description text not null,
  price numeric(10, 2) not null check (price > 0),
  category text not null check (category in ('Starters', 'Main Course', 'Desserts', 'Drinks')),
  image_url text not null,
  rating numeric(2, 1) not null check (rating between 1 and 5),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.favorites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  menu_item_id uuid not null references public.menu_items (id) on delete cascade,
  created_at timestamptz not null default timezone('utc', now()),
  unique (user_id, menu_item_id)
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

drop trigger if exists menu_items_set_updated_at on public.menu_items;
create trigger menu_items_set_updated_at
before update on public.menu_items
for each row
execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data ->> 'full_name')
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row
execute procedure public.handle_new_user();

create or replace function public.is_admin(user_id uuid)
returns boolean
language sql
stable
security definer set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = user_id and role = 'admin'
  );
$$;

alter table public.profiles enable row level security;
alter table public.menu_items enable row level security;
alter table public.favorites enable row level security;

drop policy if exists "Profiles are viewable by owner" on public.profiles;
create policy "Profiles are viewable by owner"
on public.profiles
for select
to authenticated
using (auth.uid() = id);

drop policy if exists "Profiles are editable by owner" on public.profiles;
create policy "Profiles are editable by owner"
on public.profiles
for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

drop policy if exists "Menu items are readable by authenticated users" on public.menu_items;
create policy "Menu items are readable by authenticated users"
on public.menu_items
for select
to authenticated
using (true);

drop policy if exists "Menu items are manageable by admins" on public.menu_items;
create policy "Menu items are manageable by admins"
on public.menu_items
for all
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

drop policy if exists "Favorites are viewable by owner" on public.favorites;
create policy "Favorites are viewable by owner"
on public.favorites
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Favorites are insertable by owner" on public.favorites;
create policy "Favorites are insertable by owner"
on public.favorites
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "Favorites are removable by owner" on public.favorites;
create policy "Favorites are removable by owner"
on public.favorites
for delete
to authenticated
using (auth.uid() = user_id);

