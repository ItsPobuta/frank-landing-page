# Frank — Senior Care Trust Infrastructure

Marketing site for **Frank**, a credentialing and trust standard for the senior care industry. Built with Next.js 16, Tailwind CSS v4, Supabase, and Stripe.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Styling | Tailwind CSS v4 |
| Database | Supabase (Postgres + RLS) |
| Payments | Stripe Checkout |
| Validation | Zod v4 |
| Testing | Vitest + Playwright |

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file at the root (already gitignored):

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PRICE_ID=price_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Site URL (used for Stripe redirect URLs)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Set up the database

Run the schema in **Supabase → SQL Editor**:

```bash
# paste the contents of supabase/schema.sql and run
```

### 4. Run the dev server

```bash
npm run dev
```

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server with Turbopack |
| `npm run build` | Production build |
| `npm run typecheck` | TypeScript check |
| `npm run lint` | ESLint |
| `npm test` | Unit + integration tests (Vitest) |
| `npm run test:watch` | Vitest in watch mode |
| `npm run test:e2e` | End-to-end tests (Playwright) |

---

## Project Structure

```
app/
  api/
    checkout/route.ts   # Creates Stripe Checkout session
    webhook/route.ts    # Handles Stripe events → inserts into purchases table
  success/page.tsx      # Post-purchase confirmation page
  layout.tsx
  page.tsx
components/
  contact-modal.tsx     # Lead capture modal (board / membership / info / hello types)
  lead-capture-form.tsx # Four contact CTAs → opens contact modal
  navigator-section.tsx # Care Navigator product section with purchase button
  navigator-banner.tsx  # Secondary navigator banner (not rendered on main page)
  hero.tsx
  nav.tsx
  board-section.tsx
  charter-section.tsx
  layers-section.tsx
  problem-section.tsx
  pullquote-section.tsx
  cta-section.tsx
  footer.tsx
lib/
  supabase.ts           # Supabase client
  stripe.ts             # Stripe server client
  schemas.ts            # Zod schemas for lead form validation
  format-phone.ts       # US phone number formatter
supabase/
  schema.sql            # Database schema + RLS policies
__tests__/
  unit/                 # formatPhone, Zod schemas
  integration/          # /api/checkout, /api/webhook
e2e/
  purchase.spec.ts      # Playwright: purchase flow + form validation
```

---

## Lead Forms

Four contact types, each opening a modal with a specific message and field set:

| Type | Label | Fields |
|---|---|---|
| `board` | Governing Board | Name, Email, Phone, Company, Job Title |
| `membership` | Charter Membership | Name, Email, Phone, Company, Job Title |
| `info` | General Information | Name, Email, Phone, Company, Job Title |
| `hello` | Families & Consumers | Name, Email, Phone |

All submissions are stored in the `leads` table in Supabase.

---

## Care Navigator Purchase Flow

1. User clicks **"Purchase the Navigator — $25.99"**
2. `POST /api/checkout` creates a Stripe Checkout Session
3. User is redirected to Stripe's hosted checkout page
4. On success, Stripe redirects to `/success?session_id=...`
5. Stripe fires `checkout.session.completed` webhook → `POST /api/webhook` inserts a row into the `purchases` table

### Testing payments locally

Run the Stripe CLI to forward webhook events:

```bash
stripe listen --forward-to localhost:3000/api/webhook
```

Use Stripe test cards:

| Card | Result |
|---|---|
| `4242 4242 4242 4242` | Approved |
| `4000 0000 0000 0002` | Declined |
| `4000 0000 0000 9995` | Insufficient funds |
| `4000 0025 0000 3155` | 3D Secure required |

Any future expiry date, any 3-digit CVC.

---

## Database Schema

### `leads`
Stores all contact form submissions.

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | Primary key |
| `created_at` | timestamptz | Auto |
| `type` | text | `board`, `membership`, `info`, `hello` |
| `name` | text | Required |
| `email` | text | Required |
| `phone` | text | Optional |
| `company` | text | Optional (org types only) |
| `job_title` | text | Optional (org types only) |

### `purchases`
Stores completed Care Navigator purchases.

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | Primary key |
| `created_at` | timestamptz | Auto |
| `email` | text | Required |
| `name` | text | From Stripe customer details |
| `stripe_session_id` | text | Unique |
| `stripe_payment_intent` | text | Unique |
| `amount_cents` | integer | Default 2599 ($25.99) |
| `status` | text | `pending`, `completed`, `refunded` |
| `product` | text | Default `care_navigator` |

**RLS policies:** anonymous users can INSERT, authenticated users can SELECT.

---

## Going to Production

1. Create Stripe product and price in **live mode** and update `STRIPE_PRICE_ID`
2. Replace test Stripe keys with live keys in your hosting platform's env vars
3. Set `NEXT_PUBLIC_SITE_URL` to your production domain
4. In Stripe Dashboard → **Developers → Webhooks → Add endpoint**:
   - URL: `https://yourdomain.com/api/webhook`
   - Event: `checkout.session.completed`
   - Copy the signing secret → set as `STRIPE_WEBHOOK_SECRET`
