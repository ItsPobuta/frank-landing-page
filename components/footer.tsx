const links = [
  { href: '#why', label: 'Why Frank' },
  { href: '#model', label: 'The Model' },
  { href: '#board', label: 'The Board' },
  { href: '#charter', label: 'Charter Members' },
  { href: '#navigator', label: 'Care Navigator' },
]

const linkClass =
  'text-[0.68rem] font-medium tracking-[0.1em] uppercase text-(--light) no-underline transition-colors duration-[200ms] hover:text-(--black)'

export function Footer() {
  return (
    <footer className="py-[2.2rem] px-12 border-t border-(--rule) flex items-center justify-between bg-(--bg) max-[900px]:flex-col max-[900px]:gap-6 max-[900px]:text-center">
      <span className="font-bold text-[1rem] tracking-[-0.03em] text-(--black)">
        frank.
      </span>
      <div className="flex items-center gap-10 max-[900px]:flex-col max-[900px]:gap-4">
        <nav className="flex gap-8">
          {links.map(l => (
            <a key={l.href} href={l.href} className={linkClass}>
              {l.label}
            </a>
          ))}
        </nav>
        <span className="text-[0.7rem] text-(--light) tracking-[0.06em]">
          whatsfrank.com &nbsp;·&nbsp; Confidential &nbsp;·&nbsp; 2026
        </span>
      </div>
    </footer>
  )
}
