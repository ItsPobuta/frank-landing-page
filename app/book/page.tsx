'use client'

import { useState } from 'react'
import Image from 'next/image'
import { AlertTriangle, Eye, Compass, Heart } from 'lucide-react'

import { BookNav } from '@/components/book-nav'
import { BookFooter } from '@/components/book-footer'
import { trackEvent } from '@/lib/analytics'

// ── DATA ──────────────────────────────────────────────────────────────────────

const chapters = [
  {
    num: 'Ch. 1',
    title: 'Understanding What Just Happened',
    desc: 'Before the data and the decisions — the human truth of where you are right now.',
  },
  {
    num: 'Ch. 2',
    title: 'The Full Map of Care',
    desc: 'Every level of care explained honestly, and why choosing the wrong one causes real harm.',
  },
  {
    num: 'Ch. 3',
    title: 'Home Care and Home Health',
    desc: 'Two names. Two very different things. One covered by Medicare. One not.',
  },
  {
    num: 'Ch. 5 & 6',
    title: 'Assisted Living & CCRCs',
    desc: "Everything the brochure won't tell you — the base rate, the reassessments, the bill you weren't expecting.",
  },
  {
    num: 'Ch. 7',
    title: 'Skilled Nursing & Memory Care',
    desc: 'The chapter families need at 2am. How to choose a SNF in 48 hours — without regret.',
  },
  {
    num: 'Ch. 8',
    title: 'How to Read the Data',
    desc: 'The government publishes everything. This chapter teaches you to use it in twenty minutes.',
  },
  {
    num: 'Ch. 9',
    title: 'Medicare Deep-Dive',
    desc: "What it covers, what it doesn't, the observation status trap, and your right to appeal.",
  },
  {
    num: 'Ch. 10',
    title: 'The Financial Side of Care',
    desc: 'Private pay, Medicaid, the five-year look-back, veterans benefits, and when you need an elder law attorney.',
  },
  {
    num: 'Ch. 11',
    title: 'How to Tour Any Care Setting',
    desc: 'The tour is a performance. This chapter teaches you to see past it.',
  },
  {
    num: 'Ch. 13',
    title: "Your Loved One's Rights",
    desc: 'Federal law protects every nursing home resident. Most families never know it exists until something goes wrong.',
  },
  {
    num: 'Ch. 15',
    title: 'When Something Goes Wrong',
    desc: 'The pattern test. The five-step response. When to move.',
  },
  {
    num: 'Ch. 16',
    title: 'Hospice',
    desc: 'What it actually is. Why families wait too long. What the end of a life looks like when you are present for it.',
  },
]

const forCards = [
  {
    icon: AlertTriangle,
    title: "You're already in it",
    desc: "A fall. A diagnosis. A phone call you weren't expecting. Go directly to the chapter that matches where you are. The guide is organized for exactly this moment.",
  },
  {
    icon: Eye,
    title: "You're watching a parent age",
    desc: "Nothing has happened yet, but you've noticed something small. This book gives you a map before you need it, so when the moment comes, you're not starting from zero.",
  },
  {
    icon: Compass,
    title: 'You want to stay in control',
    desc: 'The families who navigate this best are the ones where the person at the center made their wishes known before the crisis hit. This book gives you that language.',
  },
  {
    icon: Heart,
    title: 'Someone you love is in it',
    desc: "You can read it and share what matters. You can give it directly to them. Either way, the fact that you found it means you're already doing something right.",
  },
]

// ── PAGE ──────────────────────────────────────────────────────────────────────

export default function BookPage() {
  const [chaptersExpanded, setChaptersExpanded] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handlePurchase() {
    trackEvent('purchase_initiated', { source: 'book_page' })
    setLoading(true)
    const res = await fetch('/api/checkout', { method: 'POST' })
    const { url } = await res.json()
    window.location.href = url
  }

  const visibleChapters = chaptersExpanded ? chapters : chapters.slice(0, 6)

  return (
    // --book-accent drives the orange; swap to #0d0d0d for monochrome preview
    <div id="top" style={{ '--book-accent': '#C8440A' } as React.CSSProperties}>
      <BookNav />

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section
        className="grid grid-cols-2 min-h-svh items-center pt-20 max-[900px]:grid-cols-1 max-[900px]:min-h-0"
        style={{ padding: 0, paddingTop: '5rem' }}
      >
        <div className="px-12 py-20 max-[900px]:px-6 ">
          <p className="text-[0.68rem] font-semibold tracking-[0.18em] uppercase text-(--book-accent) mb-7">
            frank. The Care Navigator
          </p>
          <h1 className=" text-[clamp(3rem,7.5vw,4.5rem)] font-sans font-bold leading-[0.94] tracking-[-0.035em] text-(--black) mb-8">
            The guide{' '}
            <em className="italic [font-family:var(--serif)] font-normal text-(--book-accent) tracking-[-0.01em]">
              nobody
            </em>{' '}
            gave you when you needed it most.
          </h1>
          <p className="[font-family:var(--serif)] italic text-lg text-(--book-accent) leading-normal mb-4 max-w-120">
            Where practical guidance meets the human truth of aging
          </p>
          <p className="text-[1.0625rem] text-(--mid) max-w-120 2xl:max-w-200 mb-11 leading-[1.65]">
            For families who want to make the right decisions — and show up the
            right way.
          </p>
          <div className="flex items-center gap-5 mb-5">
            <span className="font-sans text-5xl font-bold tracking-tighter text-(--black) leading-none">
              $27.99
            </span>
            <span className="text-sm text-(--mid) leading-[1.4]">
              Instant PDF download
              <br />
              All 16 chapters + free checklists
            </span>
          </div>
          <button
            type="button"
            onClick={handlePurchase}
            disabled={loading}
            className="inline-block bg-(--book-accent) text-white px-10 py-4.5 text-base font-semibold tracking-[0.06em] uppercase transition duration-200 hover:opacity-80 hover:-translate-y-0.5 mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Redirecting…' : 'Get Instant Access'}
          </button>
          <p className="text-sm text-(--mid) flex items-center gap-2 ">
            <span className="text-(--book-accent) text-base">↓</span>
            Download immediately after purchase. No waiting.
          </p>
        </div>

        <div className="bg-(--bg-warm2) h-full flex items-center justify-center px-10 py-16 border-l border-(--rule) relative overflow-hidden min-h-135 max-[900px]:border-l-0 max-[900px]:border-t max-[900px]:border-(--rule)">
          <div
            className="absolute inset-0 opacity-[0.018]"
            style={{
              backgroundImage:
                'repeating-linear-gradient(-45deg, transparent, transparent 40px, #000 40px, #000 41px)',
            }}
          />
          <Image
            src="/book-img-v2.webp"
            alt="frank. The Care Navigator book"
            width={560}
            height={560}
            quality={100}
            className="w-full max-w-140 drop-shadow-[0_30px_60px_rgba(0,0,0,0.18)]"
            priority
          />
        </div>
      </section>

      {/* ── HONESTY STRIP ───────────────────────────────────────────────── */}
      <div className="bg-(--black) text-(--bg) px-12 pt-20 max-[900px]:px-6">
        <div className="max-w-300 mx-auto flex items-center gap-12 max-[900px]:flex-col max-[900px]:gap-6 pb-20 2xl:pb-8">
          <p className="[font-family:var(--serif)] italic text-2xl md:text-[1.65rem] flex-1 leading-normal text-center md:text-left">
            &quot;The families who have this conversation early, honestly, and
            with the right information — those are the families who are
            protected.&quot;
          </p>
          <div className="w-px h-16 bg-white/25 shrink-0 max-[900px]:w-35 max-[900px]:h-px" />
          <div className="text-center shrink-0">
            <strong className="block font-sans tracking-tighter text-[2.625rem] font-bold text-(--book-accent) leading-none">
              $10K+
            </strong>
            <span className="text-[0.75rem] tracking-widest uppercase text-white/60">
              avg. monthly
              <br />
              nursing home cost
            </span>
          </div>
          <div className="w-px h-16 bg-white/25 shrink-0 max-[900px]:w-35 max-[900px]:h-px" />
          <div className="text-center shrink-0">
            <strong className="block font-sans tracking-tighter text-[2.625rem] font-bold text-(--book-accent) leading-none">
              16
            </strong>
            <span className="text-[0.75rem] tracking-widest uppercase text-white/60">
              chapters that cover
              <br />
              every level of care
            </span>
          </div>
          <div className="w-px h-16 bg-white/25 shrink-0 max-[900px]:w-35 max-[900px]:h-px" />
          <div className="text-center shrink-0">
            <strong className="block font-sans tracking-tighter text-[2.625rem] font-bold text-(--book-accent) leading-none">
              $27.99
            </strong>
            <span className="text-[0.75rem] tracking-widest uppercase text-white/60">
              the best investment
              <br />
              you&apos;ll make in this
            </span>
          </div>
        </div>
      </div>

      {/* ── DUAL PROMISE ────────────────────────────────────────────────── */}
      <section className="bg-(--black) px-12 py-20 max-[900px]:px-6 max-[900px]:py-16">
        <div className="max-w-300 mx-auto grid grid-cols-2 gap-16 items-start max-[900px]:grid-cols-1 max-[900px]:gap-10">
          <div>
            <p className="text-xs tracking-[0.18em] uppercase text-(--book-accent) font-semibold mb-4">
              The practical
            </p>
            <h3 className="[font-family:var(--serif)] text-2xl text-(--bg) leading-[1.3] mb-5">
              Everything you need to make the right decisions.
            </h3>
            <p className="text-base text-white/60 leading-[1.8]">
              Care types. Medicare. Medicaid. Facility tours. How to read
              government data. The five-year look-back. What to ask. What to
              never sign. The chapter families need at 2am — frank covers every
              practical decision from the first phone call to the final days.
            </p>
          </div>
          <div className="border-l border-white/10 pl-16 max-[900px]:border-l-0 max-[900px]:pl-0 max-[900px]:border-t max-[900px]:border-white/10 max-[900px]:pt-10">
            <p className="text-xs tracking-[0.18em] uppercase text-(--book-accent) font-semibold mb-4">
              The human truth
            </p>
            <h3 className="[font-family:var(--serif)] text-2xl text-(--bg) leading-[1.3] mb-5">
              Everything you need to show up the right way.
            </h3>
            <p className="text-base text-white/60 leading-[1.8]">
              What your parent is actually feeling. What independence means to
              them. The family dynamics nobody names. The grief of the care
              transition. What the person in the bed is living through that no
              one around them can fully see. frank goes there too.
            </p>
          </div>
        </div>
        <div className="max-w-300 mx-auto mt-12 border-t border-white/10 pt-10 text-center">
          <p className="[font-family:var(--serif)] italic text-2xl text-(--bg) leading-[1.6]">
            &quot;Where practical guidance meets the human truth of aging.&quot;
          </p>
        </div>
      </section>

      {/* ── WHY THIS EXISTS ─────────────────────────────────────────────── */}
      <section
        id="why"
        className="px-12 py-25 max-[900px]:px-6 max-[900px]:py-18"
      >
        <div className="max-w-300 mx-auto">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-(--book-accent) mb-5">
            Why this book exists
          </p>
          <h2 className="[font-family:var(--serif)] text-[clamp(2rem,4vw,3.25rem)] font-normal leading-[1.1] tracking-tight text-(--black) mb-9 md:w-1/2">
            The system is not designed for the moment you&apos;re in.
          </h2>
          <div className="grid grid-cols-2 gap-20 items-start max-[900px]:grid-cols-1 max-[900px]:gap-10">
            <div className="flex flex-col gap-5 tracking-tight text-(--mid) leading-[1.8]">
              <p>
                Hospital discharge planners are good people working under
                impossible time pressure. They have{' '}
                <strong className="text-(--black) font-semibold">
                  three days
                </strong>{' '}
                to find your mother a safe place to land. They&apos;re
                coordinating thirty other families at the same time. The social
                worker hands you a list of six facilities and tells you to call
                around. The facilities send glossy brochures. Everyone speaks in
                acronyms.
              </p>
              <p>
                And you&apos;re supposed to make one of the most consequential
                decisions of your life — about someone else&apos;s life — by
                Friday. With no map. No guide. No one telling you what questions
                to even ask.
              </p>
              <p>
                <strong className="text-(--black) font-semibold underline underline-offset-4">
                  That is not okay.
                </strong>{' '}
                This book exists because that is not okay.
              </p>
              <p>
                Frank is what a trusted friend in healthcare would hand you at
                that moment — honest, direct, and built entirely around what you
                actually need to know. Not a brochure. Not a hotline. A friend
                who tells the truth, explains what nobody else explains, and
                sits with you in the hard moments without flinching.
              </p>
            </div>
            <div className="bg-(--black) text-(--bg) p-11 relative">
              <span className="absolute top-4 left-10 [font-family:var(--serif)] text-[5rem] text-(--book-accent) leading-none opacity-70">
                &quot;
              </span>
              <blockquote className="[font-family:var(--serif)] italic text-xl leading-[1.55] py-10">
                Money is not a shameful subject in senior care. It is the
                subject. The level of care your parent can access, the
                facilities available to them, the length of time options remain
                open — all of it flows from understanding what things actually
                cost and who pays for them.
              </blockquote>
              <cite className="text-[0.75rem] tracking-[0.12em] uppercase text-white/50 not-italic">
                — Ron Pobuta, Founder of frank.
              </cite>
            </div>
          </div>
        </div>
      </section>

      {/* ── ROI / MONEY ─────────────────────────────────────────────────── */}
      <section className="bg-(--bg-warm2) border-y border-(--rule) px-12 py-25 max-[900px]:px-6 max-[900px]:py-18">
        <div className="max-w-300 mx-auto">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-(--book-accent) mb-5">
            The best investment you can make
          </p>
          <h2 className="[font-family:var(--serif)] text-[clamp(2rem,4vw,3.25rem)] font-normal leading-[1.1] tracking-tight text-(--black) mb-5">
            One wrong decision costs families thousands.
            <br /> This book costs{' '}
            <span className="text-(--book-accent) font-sans font-bold tracking-tighter">
              $27.99.
            </span>
          </h2>
          <p className="max-w-250 text-(--mid) ">
            Senior care is one of the largest financial and emotional decisions
            most families will ever face. The people who navigate it best are
            the ones who walked in knowing what to ask, what to watch for, and
            what to never sign. That&apos;s exactly what this book gives you.
          </p>
          <div className="grid grid-cols-3 gap-px bg-(--rule) mt-15 max-[900px]:grid-cols-1">
            {[
              {
                num: '$500',
                title: 'The elder law attorney chapter alone',
                body: "Families who understand Medicaid's five-year look-back, spousal protections, and when to hire an elder law attorney routinely protect tens of thousands of dollars. The book lays it all out plainly — before you're in a room signing papers you don't understand.",
              },
              {
                num: 'Day 1',
                title: 'Know when to file for benefits — immediately',
                body: "Long-term care insurance elimination periods don't start until you file. VA Aid & Attendance benefits go unclaimed by thousands of families every year. This book tells you exactly what to file, when to file it, and how not to leave money on the table.",
              },
              {
                num: '48 hrs',
                title: 'Emergency decision framework included',
                body: 'The chapter families need at 2am — how to choose a skilled nursing facility under pressure, what red flags to spot on a facility tour, and how to read government data on any facility in 20 minutes. Decisions that fast require a guide this complete.',
              },
            ].map(card => (
              <div key={card.num} className="bg-(--bg) px-7 py-9">
                <div className="font-sans tracking-tighter text-[3rem] font-bold text-(--book-accent) leading-none mb-3">
                  {card.num}
                </div>
                <h3 className="text-[1rem] font-semibold mb-3 tracking-[-0.01em]">
                  {card.title}
                </h3>
                <p className="text-sm text-(--mid) leading-[1.65]">
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT'S INSIDE ───────────────────────────────────────────────── */}
      <section
        className="px-12 py-25 max-[900px]:px-6 max-[900px]:py-18"
        id="guides"
      >
        <div className="max-w-300 mx-auto">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-(--book-accent) mb-5">
            What&apos;s inside
          </p>
          <h2 className="[font-family:var(--serif)] text-[clamp(2rem,4vw,3.25rem)] font-normal leading-[1.1] tracking-[-0.02em] text-(--black) mb-7 max-w-200">
            16 chapters. Every decision you&apos;ll face — covered.
          </h2>
          <p className="max-w-155 text-(--mid) mb-14 text-[1.0625rem] leading-[1.75]">
            From the first phone call to the final days, frank walks you through
            every practical decision and every human moment. Organized so you
            can read it start-to-finish or jump straight to where you are.
          </p>

          <div className="border border-(--rule)">
            <div className="grid grid-cols-2 max-[900px]:grid-cols-1">
              {visibleChapters.map((ch, i) => {
                const isLastRow = i >= visibleChapters.length - 2
                const isOdd = i % 2 !== 0
                return (
                  <div
                    key={ch.num}
                    className={[
                      'px-8 py-7 transition-colors duration-150 hover:bg-(--bg-warm2)',
                      !isLastRow ? 'border-b border-(--rule)' : '',
                      !isOdd
                        ? 'border-r border-(--rule) max-[900px]:border-r-0 max-[900px]:border-b max-[900px]:border-(--rule)'
                        : '',
                      // on mobile every item gets a bottom border except the last visible one
                      'max-[900px]:last:border-b-0',
                    ].join(' ')}
                  >
                    <p className="text-xs font-semibold tracking-[0.12em] uppercase text-(--book-accent) mb-1.5">
                      {ch.num}
                    </p>
                    <p className="[font-family:var(--serif)] text-[1.125rem] font-normal mb-1.5">
                      {ch.title}
                    </p>
                    <p className="text-sm text-(--mid) leading-[1.55]">
                      {ch.desc}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>

          {!chaptersExpanded && (
            <div className="mt-0 border border-t-0 border-(--rule)">
              <button
                type="button"
                onClick={() => setChaptersExpanded(true)}
                className="w-full py-5 text-[0.75rem] font-semibold tracking-widest uppercase text-(--mid) hover:text-(--black) hover:bg-(--bg-warm2) transition-colors duration-150"
              >
                Show all 12 chapters ↓
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── WHO IS THIS FOR ─────────────────────────────────────────────── */}
      <section
        id="for-who"
        className="bg-(--bg-warm2) border-t border-(--rule) px-12 py-25 max-[900px]:px-6 max-[900px]:py-18"
      >
        <div className="max-w-300 mx-auto">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-(--book-accent) mb-5">
            Who this is for
          </p>
          <h2 className="font-serif font-normal text-[clamp(2rem,4vw,3.25rem)] leading-[1.1] tracking-[-0.02em] text-(--black) mb-12 max-w-200">
            Wherever you&apos;re starting from — frank. is here.
          </h2>
          <div className="grid grid-cols-4 gap-6 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1">
            {forCards.map(({ icon: _Icon, title, desc }) => (
              <div
                key={title}
                className="px-7 py-7 border border-(--rule) bg-(--bg) transition-[border-color,background] duration-200 hover:border-(--book-accent) hover:bg-(--bg-warm2)"
              >
                {/* <_Icon size={24} className="text-(--mid) mb-4" strokeWidth={1.5} /> */}
                <div className="w-2 h-2 rotate-45 bg-(--book-accent) mb-4" />
                <h3 className="text-base font-semibold mb-2.5">{title}</h3>
                <p className="text-[0.8438rem] text-(--mid) leading-[1.6]">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────── */}
      <section
        id="get-it"
        className="bg-(--black) text-(--bg) text-center px-12 py-30 max-[900px]:px-6 max-[900px]:py-20"
      >
        <div className="max-w-300 mx-auto">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-(--book-accent) mb-5">
            Get the book
          </p>
          <h2 className="[font-family:var(--serif)] text-[clamp(2rem,4vw,3.25rem)] font-normal leading-[1.1] tracking-[-0.02em] text-(--bg) mb-6 max-w-200 mx-auto">
            The most important{' '}
            <span className="font-sans font-bold tracking-tighter">$27.99</span>{' '}
            you&apos;ll spend in this process.
          </h2>
          <p className="text-[1.125rem] text-white/65 max-w-135 mx-auto mb-13 leading-[1.7]">
            The families who walk into senior care with this book know what to
            ask, what to avoid, and what their rights are. Instant download.
            Start reading in the next five minutes.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8">
            <span className="font-sans tracking-tighter md:text-6xl text-5xl font-bold text-(--bg) leading-none">
              $27.99
            </span>
            <span className="text-center md:text-left text-sm text-white/50 leading-normal">
              Complete PDF download
              <br />
              All 16 chapters + free checklists
              <br />
              At <a href="#guides">whatsfrank.com/book#guides</a>
            </span>
          </div>
          <button
            type="button"
            onClick={handlePurchase}
            disabled={loading}
            className="inline-block bg-(--book-accent) text-white md:px-14 px-7 py-5.5 text-[1rem] font-semibold tracking-[0.06em] uppercase transition duration-200 hover:opacity-80 hover:-translate-y-0.5 mb-5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Redirecting…' : 'Get Instant Access — $27.99'}
          </button>
          <p className="flex items-center justify-center gap-2 text-white/50 text-sm mb-4">
            <span className="text-(--book-accent) text-base">↓</span>
            Instant PDF download. Read it tonight.
          </p>
          <p className="text-sm text-white/25">
            by Ron Pobuta, Founder of frank. &nbsp;·&nbsp;{' '}
            <a href="whatsfrank.com" className="mr-1">
              whatsfrank.com
            </a>
            &nbsp;·&nbsp;{' '}
            <a href="mailto:hello@whatsfrank.com">hello@whatsfrank.com</a>
          </p>
        </div>
      </section>

      <BookFooter />
    </div>
  )
}
