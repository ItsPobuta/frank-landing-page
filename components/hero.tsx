'use client'

import { trackEvent } from '@/lib/analytics'

export function Hero() {
  return (
    <div
      id="top"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden border-b border-(--rule) pt-36 px-12 pb-24 max-[900px]:pt-28 max-[900px]:px-6 max-[900px]:pb-20"
    >
      {/* Watermark background text */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute xl:top-[75%] top-[90%] right-1 -translate-y-1/2 select-none whitespace-nowrap font-bold leading-none tracking-[-0.04em] xl:text-[clamp(260px,25vw,500px)] text-[clamp(140px,8vw,500px)] text-(--black) opacity-[0.075]"
      >
        frank.
      </div>

      <div className="relative z-1 max-w-300">
        {/* Eyebrow — ::before is the decorative rule line */}
        <p className="mb-10 flex items-center gap-4 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-(--light) opacity-0 animate-[fadeUp_0.8s_ease_forwards_0.2s] before:h-px before:w-9 before:shrink-0 before:bg-(--rule) before:content-['']">
          Senior Care &nbsp;·&nbsp; Credentialed Trust Infrastructure
          &nbsp;·&nbsp; 2026
        </p>

        <h1 className="mb-10 max-w-[13ch] font-bold leading-[0.95] tracking-[-0.035em] text-[clamp(3rem,7.5vw,7rem)] max-[580px]:text-[2.6rem] text-(--black) opacity-0 animate-[fadeUp_0.9s_ease_forwards_0.35s]">
          The standard senior care has{' '}
          <em className="font-normal italic tracking-[-0.01em] [font-family:var(--serif)]">
            never had.
          </em>
        </h1>

        <div className="mb-10 h-0.5 w-14 origin-left bg-(--black) opacity-0 animate-[scaleIn_0.6s_ease_forwards_0.55s]" />

        <p className="mb-16 max-w-[55ch] font-light leading-[1.75] text-[clamp(1rem,1.5vw,1.15rem)] text-(--mid) opacity-0 animate-[fadeUp_0.8s_ease_forwards_0.65s]">
          Frank is a governed credentialing model, a B2B network, and a consumer
          mark — built in that order, from the board out. The industry is $450
          billion. The trust infrastructure is nonexistent. That ends here.
        </p>

        <div className="flex flex-wrap gap-4 opacity-0 animate-[fadeUp_0.8s_ease_forwards_0.8s]">
          <button
            type="button"
            className="btn-primary"
            onClick={() => {
              trackEvent('cta_click', { label: 'hero_join_board' })
              document.getElementById('board')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            Join the Governing Board
          </button>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => {
              trackEvent('cta_click', { label: 'hero_become_member' })
              document.getElementById('charter')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            Become a Charter Member
          </button>
        </div>
      </div>

      {/* Vertical scroll indicator */}
      <div className="absolute right-12 bottom-10 flex flex-col items-end gap-4 opacity-0 animate-[fadeIn_1.2s_ease_forwards_1.4s] max-[900px]:hidden">
        <span className="text-[0.65rem] font-medium uppercase tracking-[0.14em] text-(--light) [text-orientation:mixed] [writing-mode:vertical-rl]">
          Scroll to explore
        </span>
        <div className="h-12.5 w-px bg-(--rule)" />
      </div>
    </div>
  )
}
