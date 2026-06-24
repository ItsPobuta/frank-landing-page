import Link from 'next/link'

export function NavigatorSection() {
  return (
    <div
      className="bg-(--bg-warm) border-y border-(--rule) py-24 px-12 max-[900px]:py-16 max-[900px]:px-6"
      id="navigator"
    >
      <div className="max-w-300 mx-auto grid grid-cols-[1fr_auto] gap-20 items-center max-[900px]:grid-cols-1 max-[900px]:gap-10">
        <div>
          <p className="text-[0.68rem] font-semibold tracking-[0.2em] uppercase text-(--light) mb-6">
            For Families &nbsp;·&nbsp; The Frank Care Navigator
          </p>
          <div className="w-full h-px bg-(--rule) mb-10" />
          <h2 className="font-bold text-[clamp(1.8rem,3vw,2.6rem)] tracking-[-0.03em] leading-[1.06] text-(--black) mb-6">
            The guide families need{' '}
            <em className="italic [font-family:var(--serif)] font-normal">
              before the crisis hits.
            </em>
          </h2>
          <p className="text-[0.95rem] font-light text-(--mid) leading-[1.8] ">
            frank. is a comprehensive plain-language guide that walks families
            through every level of care, every financial decision, and every
            human moment — from the first phone call to the final days. 16
            chapters. $27.99. Instant download.
          </p>
        </div>

        <div className="bg-(--white) border border-(--rule) p-10 flex flex-col items-center text-center min-w-55 max-[900px]:w-full">
          <p className="text-[0.65rem] font-semibold tracking-[0.18em] uppercase text-(--light) mb-6">
            frank. The Care Navigator
          </p>
          <p className="font-bold text-[3rem] tracking-tighter text-(--black) leading-none mb-2">
            $27.99
          </p>
          <p className="text-[0.78rem] font-light text-(--light) mb-4">
            One-time.
            <br /> Instant PDF download.
          </p>
          <Link href="/book" className="btn-white text-center w-full">
            Get the Book
          </Link>
        </div>
      </div>
    </div>
  )
}
