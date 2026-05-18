'use client'

import { useState } from 'react'

import { trackEvent } from '@/lib/analytics'

const features = [
  {
    num: '01',
    title: 'CMS Data Decoded',
    desc: 'Understand what 5-star ratings actually measure — and what they miss. Learn to read health inspection scores, staffing hours, and quality measures like an insider.',
  },
  {
    num: '02',
    title: 'The Questions to Ask on a Tour',
    desc: 'A facility tour is not a sales visit. The Navigator gives families the exact questions to ask — and the answers that should raise flags.',
  },
  {
    num: '03',
    title: 'Red Flags and What They Mean',
    desc: 'Ownership changes. Staffing turnover. Complaint deficiencies. The Navigator explains what each signal means and how much weight to give it.',
  },
  {
    num: '04',
    title: 'A Framework for Comparison',
    desc: 'How to compare facilities side by side — what matters most, what is negotiable, and how to make a confident decision even when every option feels imperfect.',
  },
  {
    num: '05',
    title: 'Rights, Protections & Advocacy',
    desc: 'What rights residents and families have after placement — and who to call if something goes wrong.',
  },
]

const checklist = [
  'Complete facility evaluation framework',
  'CMS data interpretation guide',
  'Tour question checklist (printable)',
  'Red flag reference sheet',
  'Side-by-side comparison worksheet',
  'Resident rights & advocacy contacts',
  'Updates included as the standard evolves',
]

export function NavigatorSection() {
  const [loading, setLoading] = useState(false)

  async function handlePurchase() {
    trackEvent('purchase_initiated')
    setLoading(true)
    const res = await fetch('/api/checkout', { method: 'POST' })
    const { url } = await res.json()
    window.location.href = url
  }

  return (
    <div
      className="bg-(--bg-warm) border-y border-(--rule) py-32 px-12 relative max-[900px]:py-20 max-[900px]:px-6"
      id="navigator"
    >
      <div className="max-w-300 mx-auto grid grid-cols-2 gap-24 relative z-1 max-[900px]:grid-cols-1 max-[900px]:gap-12">
        <div>
          <p className="text-[0.68rem] font-semibold tracking-[0.2em] uppercase text-(--light) mb-6">
            For Families &nbsp;·&nbsp; The Frank Care Navigator
          </p>
          <div className="w-full h-px bg-(--rule) mb-14" />
          <h2 className="font-bold text-[clamp(2rem,3.5vw,3rem)] tracking-[-0.03em] leading-[1.04] text-(--black) mb-8">
            The hardest decisions deserve{' '}
            <em className="italic [font-family:var(--serif)] font-normal">
              real information.
            </em>
          </h2>
          <p className="text-[0.95rem] font-light text-(--mid) leading-[1.8] mb-6">
            Choosing a skilled nursing facility or senior care provider for a
            parent is one of the most consequential decisions a family will ever
            make. It often happens fast, under stress, without time to research.
            Most families walk in unprepared — and the industry knows it.
          </p>
          <p className="text-[0.95rem] font-light text-(--mid) leading-[1.8] mb-6">
            The Frank Care Navigator changes that. It is a comprehensive,
            plain-language guide that translates CMS inspection data, staffing
            ratios, deficiency reports, and ownership structures into things a
            family can actually use. No jargon. No sales pitch. Just the
            information that matters.
          </p>
          <div className="flex flex-col mt-12">
            {features.map(f => (
              <div
                className="py-6 border-b border-(--rule) flex gap-6 items-start first:border-t first:border-(--rule)"
                key={f.num}
              >
                <span className="text-[0.65rem] font-bold tracking-[0.1em] text-(--rule) pt-[0.15rem] shrink-0">
                  {f.num}
                </span>
                <div>
                  <h4 className="text-[0.95rem] font-semibold text-(--black) mb-[0.3rem] tracking-[-0.01em]">
                    {f.title}
                  </h4>
                  <p className="text-[0.85rem] font-light text-(--mid) leading-[1.65]">
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="bg-(--white) border border-(--rule) p-12 h-fit sticky top-32 max-[900px]:static">
            <p className="text-[0.65rem] font-semibold tracking-[0.18em] uppercase text-(--light) mb-8 pb-6 border-b border-(--rule)">
              The Frank Care Navigator &nbsp;·&nbsp; Digital Guide
            </p>
            <p className="font-bold text-[3.5rem] tracking-tighter text-(--black) leading-none mb-[0.4rem]">
              $25.99
            </p>
            <p className="text-[0.8rem] font-light text-(--light) mb-10">
              One-time purchase. Instant digital download. No subscription.
            </p>
            <ul className="list-none flex flex-col gap-[0.9rem] mb-10">
              {checklist.map(item => (
                <li
                  key={item}
                  className="text-[0.88rem] font-light text-(--mid) flex gap-3 items-start leading-normal before:content-['✓'] before:text-[0.75rem] before:text-(--light) before:shrink-0 before:pt-[0.1rem]"
                >
                  {item}
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={handlePurchase}
              disabled={loading}
              className="btn-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Redirecting…' : 'Purchase the Navigator — $25.99'}
            </button>
            <p className="text-[0.72rem] font-light text-(--light) text-center mt-5 leading-[1.6]">
              Questions? Reach us at
              <br />
              <a
                href="mailto:hello@whatsfrank.com?subject=Care Navigator Purchase"
                className="hover:underline hover:text-black"
                onClick={() => trackEvent('contact_email_click', { label: 'navigator_support' })}
              >
                hello@whatsfrank.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
