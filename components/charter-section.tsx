'use client'

import { trackEvent } from '@/lib/analytics'

export function CharterSection() {
  return (
    <div className="bg-(--bg-warm) border-y border-(--rule) py-32 px-12 max-[900px]:py-20 max-[900px]:px-6" id="charter">
      <div className="max-w-300 mx-auto">
        <p className="text-[0.68rem] font-semibold tracking-[0.2em] uppercase text-(--light) mb-6">
          04 &nbsp;·&nbsp; Charter Members
        </p>
        <div className="w-full h-px bg-(--rule) mb-20" />
        <div className="grid grid-cols-2 gap-24 items-center max-[900px]:grid-cols-1 max-[900px]:gap-12">
          <div>
            <h2 className="text-[clamp(1.9rem,3.2vw,2.8rem)] font-bold leading-[1.08] tracking-[-0.025em] mb-[1.8rem]">
              Be among the first{' '}
              <em className="italic [font-family:var(--serif)] font-normal">
                credentialed.
              </em>
            </h2>
            <p className="text-[0.95rem] font-light text-(--mid) leading-[1.8] mb-8">
              Charter membership is the founding cohort of Frank. Operators,
              vendors, and providers who get in at the ground floor — before
              the standard is public, before the mark carries consumer weight,
              when being early still means something.
            </p>
            <p className="text-[0.95rem] font-light text-(--mid) leading-[1.8] mb-8">
              Charter members help shape the credentialing process, receive
              priority review, and carry the distinction of having held the
              standard from day one.
            </p>
            <button
              type="button"
              className="btn-primary"
              onClick={() => {
                trackEvent('cta_click', { label: 'charter_apply' })
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Apply for Charter Status
            </button>
          </div>
          <div>
            <div className="grid grid-cols-2 bg-(--white) border border-(--rule)">
              <div className="py-10 px-[2.2rem] border-r border-b border-(--rule) hover:bg-(--bg-warm) transition-[background] duration-[250ms]">
                <p className="font-bold text-[2.2rem] tracking-[-0.045em] text-(--black) leading-none mb-[0.6rem]">
                  $450B
                </p>
                <p className="text-[0.72rem] font-normal text-(--light) tracking-[0.05em] leading-[1.45]">
                  Total senior care
                  <br />
                  economy (US)
                </p>
              </div>
              <div className="py-10 px-[2.2rem] border-b border-(--rule) hover:bg-(--bg-warm) transition-[background] duration-[250ms]">
                <p className="font-bold text-[2.2rem] tracking-[-0.045em] text-(--black) leading-none mb-[0.6rem]">
                  61,700
                </p>
                <p className="text-[0.72rem] font-normal text-(--light) tracking-[0.05em] leading-[1.45]">
                  Credentialable
                  <br />
                  entities
                </p>
              </div>
              <div className="py-10 px-[2.2rem] border-r border-(--rule) hover:bg-(--bg-warm) transition-[background] duration-[250ms]">
                <p className="font-bold text-[2.2rem] tracking-[-0.045em] text-(--black) leading-none mb-[0.6rem]">
                  0
                </p>
                <p className="text-[0.72rem] font-normal text-(--light) tracking-[0.05em] leading-[1.45]">
                  Independent trust
                  <br />
                  standards today
                </p>
              </div>
              <div className="py-10 px-[2.2rem] hover:bg-(--bg-warm) transition-[background] duration-[250ms]">
                <p className="font-bold text-[2.2rem] tracking-[-0.045em] text-(--black) leading-none mb-[0.6rem]">
                  Now.
                </p>
                <p className="text-[0.72rem] font-normal text-(--light) tracking-[0.05em] leading-[1.45]">
                  When to get
                  <br />
                  involved
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
