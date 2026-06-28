# frank. — Domain Glossary

## frank.
The brand and company. Written lowercase with a period. Never "Frank" or "FRANK".

## The Care Navigator
The paid book product. A 16-chapter PDF guide for families navigating senior care decisions. Sold at $27.99 via Stripe. Lives at `/book`. Delivered via Supabase signed URL sent by email after purchase.

## The Guides
The free checklist toolkit. 12 items organized into 4 groups (see below). Lives at `/guides`. Families select a checklist, view it interactively on screen, and print via browser. No account or purchase required.

## Checklist Groups
The 4 groups within The Guides:
- **Tour Checklists** — Pre-Tour Data Review, Nursing Home Tour, SNF/Short-Stay Rehab Tour, Assisted Living Tour, Memory Care Tour
- **Agency Evaluations** — Home Care & Home Health, Hospice Agency, CCRC Financial Due Diligence
- **Reference Cards** — Medicare Quick Reference, Resident Rights Reference, Financial Planning Guide
- **Know My Parent** — A fillable form families give to care staff. Print-only; treated separately from the interactive selector.

## For Families
The section on the homepage (`#navigator`) that surfaces both frank. products: The Care Navigator (book) and The Guides (free checklists). Nav link label for this section.

## whatsfrank
The logo/brand identifier in the navigation bar. Renders as a dropdown with three destinations: Home (`/`), The Book (`/book`), Guides (`/guides`).

## /directory
A facility directory route. Built but not yet live — pending adjustments before official launch. Will appear in the whatsfrank dropdown when ready.
