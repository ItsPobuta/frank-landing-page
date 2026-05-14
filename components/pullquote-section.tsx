export function PullquoteSection() {
  return (
    <div className="bg-(--bg-warm) border-y border-(--rule) py-32 px-12 relative overflow-hidden max-[900px]:py-20 max-[900px]:px-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[-0.25em] left-6 [font-family:var(--serif)] text-[clamp(200px,25vw,360px)] leading-none text-(--black) opacity-[0.04] select-none"
      >
        &ldquo;
      </div>
      <div className="max-w-[900px] mx-auto relative">
        <p className="[font-family:var(--serif)] text-[clamp(1.5rem,2.8vw,2.5rem)] italic leading-[1.45] text-(--black) mb-10">
          &ldquo;No credential. No independent verification. Just
          relationships, reputation, and luck.&rdquo;
        </p>
        <div className="flex items-center gap-6">
          <div className="w-10 h-px bg-(--rule) shrink-0" />
          <p className="text-[0.72rem] font-medium tracking-[0.14em] uppercase text-(--light)">
            The state of senior care today
          </p>
        </div>
      </div>
    </div>
  )
}
