'use client'

import { useState } from 'react'
import { ContactModal } from './contact-modal'

export function NavigatorBanner() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <div className="bg-(--bg-warm) border-y border-(--rule) py-20 px-12 max-[900px]:py-14 max-[900px]:px-6">
        <div className="max-w-300 mx-auto grid grid-cols-[1fr_auto] gap-16 items-center max-[900px]:grid-cols-1 max-[900px]:gap-12">
          <div>
            <p className="text-[0.68rem] font-semibold tracking-[0.18em] uppercase text-(--light) mb-4">
              For Families &nbsp;·&nbsp; The Frank Care Navigator
            </p>
            <h2 className="font-bold text-[clamp(1.5rem,2.5vw,2.2rem)] tracking-tight leading-[1.1] text-(--black) mb-4">
              The document your family needs{' '}
              <em className="italic [font-family:var(--serif)] font-normal">
                before
              </em>{' '}
              the crisis hits.
            </h2>
            <p className="text-[0.95rem] font-light text-(--mid) leading-[1.75] max-w-[58ch]">
              Most families begin researching senior care facilities in the middle
              of an emergency. The Frank Care Navigator is a plain-language guide
              that walks families through exactly what to ask, what to look for,
              and what the data actually means — so when the moment comes, you are
              not starting from zero. Written by people who have seen what happens
              when families are not prepared.
            </p>
          </div>
          <div className="flex flex-col items-center text-center bg-(--white) border border-(--rule) py-10 px-[2.8rem] min-w-60 shrink-0">
            <p className="text-[0.65rem] font-semibold tracking-[0.18em] uppercase text-(--light) mb-2">
              One-Time Purchase
            </p>
            <p className="font-bold text-[2.6rem] tracking-[-0.04em] text-(--black) leading-none mb-[0.3rem]">
              $25.99
            </p>
            <p className="text-[0.78rem] font-light text-(--light) mb-[1.8rem]">
              Instant digital download
            </p>
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="btn-primary w-full text-center"
            >
              Get the Navigator
            </button>
          </div>
        </div>
      </div>

      <ContactModal type="hello" isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}
