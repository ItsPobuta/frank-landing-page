'use client'

import { useEffect } from 'react'

const problems = [
  {
    label: 'Families',
    num: '01',
    title: 'Navigating blind.',
    desc: 'When a family needs to place a parent in a skilled nursing facility, they have no trusted, independent signal to rely on. They Google and hope.',
  },
  {
    label: 'Operators',
    num: '02',
    title: 'Cannot verify who they work with.',
    desc: 'Every vendor claims 20 years of experience and a spotless record. None of it is verified. Procurement defaults to price and relationships — not demonstrated quality.',
  },
  {
    label: 'Discharge Planners',
    num: '03',
    title: 'Default to familiarity.',
    desc: 'Hospital discharge decisions — among the most consequential moments in post-acute care — are driven by who called last week, not who has the best outcomes.',
  },
  {
    label: 'Investors',
    num: '04',
    title: 'No institutional trust layer.',
    desc: 'Private equity entering senior care at record pace has no framework for evaluating operator quality. Due diligence is relationship-dependent.',
  },
]

export function ProblemSection() {
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

    const items = document.querySelectorAll('.problem-item')
    items.forEach((el, i) => {
      ;(el as HTMLElement).dataset.delay = String(i * 110)
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="why"
      className="py-32 px-12 max-[900px]:py-20 max-[900px]:px-6"
    >
      <div className="max-w-300 mx-auto">
      <p className="text-[0.68rem] font-semibold tracking-[0.2em] uppercase text-(--light) mb-6">
        01 &nbsp;·&nbsp; Why Frank Exists
      </p>
      <div className="w-full h-px bg-(--rule) mb-20" />
      <div className="grid grid-cols-2 gap-24 items-start max-[900px]:grid-cols-1 max-[900px]:gap-12">
        <div className="sticky top-32 max-[900px]:static">
          <h2 className="text-[clamp(1.9rem,3.2vw,2.8rem)] font-bold leading-[1.08] tracking-[-0.025em] text-(--black) mb-10">
            The deeper problem is{' '}
            <em className="italic [font-family:var(--serif)] font-normal">
              structural.
            </em>
          </h2>
          <p className="text-[0.95rem] font-light text-(--mid) leading-[1.75] max-w-[38ch]">
            Senior care is one of the largest and most consequential industries
            in America. It has no institutional trust layer. Every participant
            is navigating blind.
          </p>
        </div>
        <div className="flex flex-col">
          {problems.map(p => (
            <div
              className="problem-item py-[2.2rem] border-b border-(--rule) first:border-t first:border-(--rule) opacity-0 translate-y-6 [&.visible]:opacity-100 [&.visible]:translate-y-0 transition-[opacity,transform] duration-[650ms] ease-out"
              key={p.num}
            >
              <div className="flex items-baseline justify-between mb-[0.8rem]">
                <span className="text-[0.68rem] font-semibold tracking-[0.16em] uppercase text-(--light)">
                  {p.label}
                </span>
                <span className="text-[0.65rem] font-bold tracking-[0.12em] text-(--rule)">
                  {p.num}
                </span>
              </div>
              <h3 className="text-[1.05rem] font-bold text-(--black) mb-[0.6rem] tracking-[-0.015em]">
                {p.title}
              </h3>
              <p className="text-[0.92rem] font-light text-(--mid) leading-[1.7]">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
      </div>
    </section>
  )
}
