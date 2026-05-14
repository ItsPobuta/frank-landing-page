'use client'

import { useEffect } from 'react'

const layers = [
  {
    num: '01',
    title: 'The Credentialing Model',
    desc: 'A governed, multi-factor scoring methodology. Not self-reported. Not purchased. Not algorithmic. Verified by Frank, governed by the board. Every credentialed entity carries a Frank score that is earned, maintained, and subject to review.',
  },
  {
    num: '02',
    title: 'The B2B Network',
    desc: 'Once the credentialing model is established, Frank becomes the platform where credentialed parties transact. Operators sourcing vendors. Investors evaluating operators. Discharge planners identifying qualified providers. B2B commerce built on verified trust.',
  },
  {
    num: '03',
    title: 'The Consumer Standard',
    desc: "The ultimate measure of Frank's success: families making the hardest decisions with one trusted signal. Frank Credentialed. They do not need to understand the score. They need to know the verification is real.",
  },
]

export function LayersSection() {
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

    const cards = document.querySelectorAll('.layer-card')
    cards.forEach((el, i) => {
      ;(el as HTMLElement).dataset.delay = String(i * 130)
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="model"
      className="py-32 px-12 max-[900px]:py-20 max-[900px]:px-6"
    >
      <div className="max-w-300 mx-auto">
      <p className="text-[0.68rem] font-semibold tracking-[0.2em] uppercase text-(--light) mb-6">
        02 &nbsp;·&nbsp; What Frank Is Building
      </p>
      <div className="w-full h-px bg-(--rule) mb-20" />
      <div className="grid grid-cols-[1.1fr_1fr] gap-20 items-end mb-16 max-[900px]:grid-cols-1 max-[900px]:gap-12">
        <h2 className="text-[clamp(1.9rem,3.2vw,2.8rem)] font-bold leading-[1.08] tracking-tight">
          Three layers. One{' '}
          <em className="italic [font-family:var(--serif)] font-normal">
            institution.
          </em>
        </h2>
        <p className="text-[0.95rem] font-light text-(--mid) leading-[1.75]">
          Frank is not a directory, a staffing platform, or a trade publication.
          It is the institutional trust layer this industry has never had —
          built in a deliberate sequence.
        </p>
      </div>
      <div className="grid grid-cols-3 border border-(--rule) max-[900px]:grid-cols-1">
        {layers.map(l => (
          <div
            className="layer-card group py-12 px-10 border-r border-(--rule) last:border-r-0 opacity-0 translate-y-5 [&.visible]:opacity-100 [&.visible]:translate-y-0 transition-[opacity,transform,background] duration-[600ms] ease-out hover:bg-(--bg-warm) max-[900px]:border-r-0 max-[900px]:border-b max-[900px]:last:border-b-0"
            key={l.num}
          >
            <p className="text-[0.68rem] font-bold tracking-[0.18em] text-(--rule) mb-8">
              {l.num}
            </p>
            <h3 className="text-[1.05rem] font-bold tracking-[-0.015em] text-(--black) mb-4 leading-[1.3]">
              {l.title}
            </h3>
            <div className="w-7 h-[1.5px] bg-(--rule) mb-[1.2rem] transition-[width,background] duration-[300ms] ease-out group-hover:w-12 group-hover:bg-(--black)" />
            <p className="text-[0.88rem] font-light text-(--mid) leading-[1.7]">
              {l.desc}
            </p>
          </div>
        ))}
      </div>
      </div>
    </section>
  )
}
