'use client'

import { useEffect } from 'react'

const seats = [
  {
    num: '01',
    title: 'Operator Voice',
    desc: 'A senior care operator with 10+ years running facilities at scale. Clean regulatory record. No active vendor conflicts.',
  },
  {
    num: '02',
    title: 'Clinical Voice',
    desc: 'A physician or senior clinical leader who can evaluate clinical quality claims without deference to business interests.',
  },
  {
    num: '03',
    title: 'Regulatory Voice',
    desc: 'A healthcare attorney specializing in long-term care, or a former CMS or state surveyor.',
  },
  {
    num: '04',
    title: 'Family & Consumer Voice',
    desc: 'An ombudsman or patient rights advocate. The seat that keeps the board honest about who the standard ultimately serves.',
  },
  {
    num: '05',
    title: 'Finance & Investment Voice',
    desc: 'A PE principal, REIT representative, or family office investor with an active senior care portfolio.',
  },
]

const liClass =
  "text-[0.88rem] font-light text-(--mid) pl-6 relative leading-[1.55] before:content-['—'] before:absolute before:left-0 before:text-(--rule)"

export function BoardSection() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            const delay = parseInt(el.dataset.delay ?? '0', 10)
            setTimeout(() => el.classList.add('visible'), delay)
            observer.unobserve(el)
          }
        }
      },
      { threshold: 0.1 }
    )

    const seatEls = document.querySelectorAll('.seat')
    seatEls.forEach((el, i) => {
      ;(el as HTMLElement).dataset.delay = String(i * 80)
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="board"
      className="py-32 px-12 border-t border-(--rule) max-[900px]:py-20 max-[900px]:px-6"
    >
      <div className="max-w-300 mx-auto">
      <p className="text-[0.68rem] font-semibold tracking-[0.2em] uppercase text-(--light) mb-6">
        03 &nbsp;·&nbsp; The Governing Board
      </p>
      <div className="w-full h-px bg-(--rule) mb-20" />
      <div className="grid grid-cols-[1.1fr_1fr] gap-20 items-end mb-16 max-[900px]:grid-cols-1 max-[900px]:gap-12">
        <h2 className="text-[clamp(1.9rem,3.2vw,2.8rem)] font-bold leading-[1.08] tracking-[-0.025em]">
          The board is not advisory.{' '}
          <em className="italic [font-family:var(--serif)] font-normal">
            It is the standard.
          </em>
        </h2>
        <p className="text-[0.95rem] font-light text-(--mid) leading-[1.75]">
          Frank&apos;s credibility is a function of its governance. The
          Governing Board holds binding authority over the credentialing
          standard — who gets in, who gets removed, and what the score
          actually measures. Five seats. Real accountability.
        </p>
      </div>

      <div className="grid grid-cols-5 border-t border-l border-(--rule) mb-16 max-[1024px]:grid-cols-3 max-[900px]:grid-cols-2 max-[580px]:grid-cols-1">
        {seats.map(s => (
          <div
            className="seat py-10 px-[1.8rem] border-r border-b border-(--rule) opacity-0 translate-y-4 [&.visible]:opacity-100 [&.visible]:translate-y-0 transition-[opacity,transform,background] duration-[500ms] ease-out hover:bg-(--bg-warm)"
            key={s.num}
          >
            <p className="text-[1.6rem] font-bold text-(--rule) tracking-[-0.03em] leading-none mb-[1.2rem]">
              {s.num}
            </p>
            <h3 className="text-[0.82rem] font-bold text-(--black) mb-3 tracking-[-0.01em] leading-[1.35]">
              {s.title}
            </h3>
            <p className="text-[0.78rem] font-light text-(--mid) leading-[1.65]">
              {s.desc}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-20 pt-14 border-t border-(--rule) max-[900px]:grid-cols-1 max-[900px]:gap-12">
        <div>
          <p className="text-[0.68rem] font-semibold tracking-[0.18em] uppercase text-(--light) mb-8">
            The Commitment
          </p>
          <ul className="list-none flex flex-col gap-4">
            <li className={liClass}>
              Two-year terms, staggered. Maximum four years consecutive.
            </li>
            <li className={liClass}>
              Binding authority over inclusion criteria, scoring methodology,
              and enforcement.
            </li>
            <li className={liClass}>
              Annual review of the credentialing standard.
            </li>
            <li className={liClass}>
              Public governance report published each year.
            </li>
            <li className={liClass}>
              Annual conflict-of-interest disclosure. Mandatory recusal.
            </li>
            <li className={liClass}>
              Quarterly meetings. Frank covers reasonable travel.
            </li>
          </ul>
        </div>
        <div>
          <p className="text-[0.68rem] font-semibold tracking-[0.18em] uppercase text-(--light) mb-8">
            This Is Not a Resume Line
          </p>
          <p className="text-[0.95rem] font-light text-(--mid) leading-[1.8] mb-8">
            The governing board is being constituted now. Seats are limited by
            design. If you have spent years in this industry and you know what
            is broken — this is the opportunity to be part of fixing it at the
            foundation.
          </p>
          <a href="#contact" className="btn-primary">
            Start the Conversation
          </a>
        </div>
      </div>
      </div>
    </section>
  )
}
