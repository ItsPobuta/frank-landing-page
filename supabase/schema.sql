-- ============================================================
-- Frank — Supabase Schema
-- ============================================================

-- Enable pgcrypto for gen_random_uuid() on older Postgres versions
-- (Supabase already exposes gen_random_uuid() via the extensions schema,
--  but this is a safe no-op if it's already active)
create extension if not exists "pgcrypto";


-- ============================================================
-- leads
-- Captures form submissions from all contact entry points:
--   board     → Board interest form
--   membership → Membership interest form
--   info      → General info request
--   hello     → Care Navigator / family inquiry
-- ============================================================

create table if not exists leads (
  id           uuid        primary key default gen_random_uuid(),
  created_at   timestamptz not null    default now(),

  -- which form the lead came from
  type         text        not null
                 check (type in ('board', 'membership', 'info', 'hello')),

  -- core contact fields (all form types)
  name         text        not null,
  email        text        not null,
  phone        text,

  -- board / membership / info only (null for 'hello')
  company      text,
  job_title    text
);

-- index for admin queries sorted by recency
create index if not exists leads_created_at_idx on leads (created_at desc);
create index if not exists leads_type_idx        on leads (type);


-- ============================================================
-- purchases
-- Records Care Navigator purchases via Stripe.
-- ============================================================

create table if not exists purchases (
  id                      uuid        primary key default gen_random_uuid(),
  created_at              timestamptz not null    default now(),

  -- buyer info (captured at checkout)
  name                    text,
  email                   text        not null,

  -- Stripe identifiers
  stripe_session_id       text        unique,
  stripe_payment_intent   text        unique,

  -- financials (store in cents to avoid float precision issues)
  amount_cents            integer     not null default 2599,  -- $25.99
  currency                text        not null default 'usd',

  -- lifecycle
  status                  text        not null default 'pending'
                            check (status in ('pending', 'completed', 'refunded')),

  product                 text        not null default 'care_navigator'
);

create index if not exists purchases_created_at_idx on purchases (created_at desc);
create index if not exists purchases_email_idx      on purchases (email);
create index if not exists purchases_status_idx     on purchases (status);


-- ============================================================
-- Row-Level Security
-- ============================================================

alter table leads     enable row level security;
alter table purchases enable row level security;


-- leads: anyone (anon) can insert; only authenticated users can read
create policy "leads: public insert"
  on leads for insert
  to anon
  with check (true);

create policy "leads: authenticated read"
  on leads for select
  to authenticated
  using (true);


-- purchases: anyone (anon) can insert (Stripe webhook / checkout flow);
-- only authenticated users can read
create policy "purchases: public insert"
  on purchases for insert
  to anon
  with check (true);

create policy "purchases: authenticated read"
  on purchases for select
  to authenticated
  using (true);
