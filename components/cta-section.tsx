import { LeadCaptureForm } from './lead-capture-form'

export function CtaSection() {
  return (
    <div
      className="bg-(--bg-warm) border-t border-(--rule) py-36 px-12 relative overflow-hidden max-[900px]:py-20 max-[900px]:px-6"
      id="contact"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-0.15em] right-[-0.02em] font-bold text-[clamp(160px,24vw,360px)] leading-none text-(--black) opacity-[0.1] select-none tracking-[-0.04em]"
      >
        frank.
      </div>
      <div className="max-w-300 mx-auto grid grid-cols-[1.1fr_1fr] gap-24 items-start relative z-1 max-[900px]:grid-cols-1 max-[900px]:gap-12">
        <h2 className="font-bold text-[clamp(2rem,4vw,3.8rem)] leading-[1.02] tracking-[-0.03em] text-(--black)">
          Every conversation{' '}
          <em className="italic [font-family:var(--serif)] font-normal">
            starts somewhere.
          </em>
        </h2>
        <div>
          <p className="text-[0.95rem] font-light text-(--mid) leading-[1.8] mb-10">
            No formal process. No commitment required. The right next step is a
            direct conversation with the Frank team — whatever your reason for
            being here.
          </p>
          <LeadCaptureForm />
        </div>
      </div>
    </div>
  )
}
