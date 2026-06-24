'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const links = [
  { label: 'Why This Book', href: '#why' },
  { label: "What's Inside", href: '#guides' },
  { label: "Who It's For", href: '#for-who' },
]

const navLinkClass =
  "text-[0.72rem] font-medium tracking-[0.12em] uppercase text-nowrap text-(--light) no-underline transition-colors duration-200 relative hover:text-(--black) after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-px after:bg-(--black) after:transition-[width] after:duration-250 after:ease-out hover:after:w-full"

export function BookNav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-20 flex items-center justify-between py-[1.4rem] px-12 backdrop-blur-md border-b border-(--rule) transition-[background] duration-400 max-[900px]:py-[1.2rem] max-[900px]:px-6',
        scrolled ? 'bg-[rgba(248,248,245,0.97)]' : 'bg-[rgba(248,248,245,0.90)]'
      )}
    >
      <Link
        href="/"
        className="font-bold text-[1.35rem] tracking-[-0.03em] text-(--black) no-underline"
      >
        frank.
      </Link>

      <div className="flex items-center gap-10">
        {/* Desktop links only */}
        <ul className="flex gap-10 list-none items-center m-0 p-0 max-[900px]:hidden">
          {links.map(l => (
            <li key={l.href}>
              <a href={l.href} className={navLinkClass}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#get-it"
          className="text-[0.72rem] font-semibold tracking-[0.08em] text-nowrap uppercase text-(--white) bg-(--black) py-[0.55rem] px-[1.3rem] no-underline transition-opacity duration-200 hover:opacity-75"
        >
          Get Book — $27.99
        </a>
      </div>
    </nav>
  )
}
