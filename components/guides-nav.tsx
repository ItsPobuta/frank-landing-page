'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

const dropdownLinks = [
  { label: 'Home', href: '/' },
  { label: 'The Book', href: '/book' },
  { label: 'Guides', href: '/guides' },
]

export function GuidesNav() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    if (!dropdownOpen) return
    function handleOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') setDropdownOpen(false)
    }
    document.addEventListener('mousedown', handleOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [dropdownOpen])

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-20 flex items-center justify-between py-[1.4rem] px-12 backdrop-blur-md border-b border-(--rule) transition-[background] duration-400 max-[900px]:py-[1.2rem] max-[900px]:px-6 print:hidden',
        scrolled ? 'bg-[rgba(248,248,245,0.97)]' : 'bg-[rgba(248,248,245,0.90)]'
      )}
    >
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setDropdownOpen(o => !o)}
          className="flex items-center gap-1.5 font-bold text-[1.35rem] tracking-[-0.03em] text-(--black) bg-transparent border-0 cursor-pointer p-0"
        >
          whatsfrank.
          <span
            className={cn(
              'text-[0.6rem] text-(--light) leading-none mt-0.5 transition-transform duration-200',
              dropdownOpen && 'rotate-180'
            )}
          >
            ▾
          </span>
        </button>

        {dropdownOpen && (
          <div className="absolute top-full left-0 mt-3 min-w-36 border border-(--rule) bg-(--bg) shadow-sm z-30">
            {dropdownLinks.map(l => (
              <Link
                key={l.href}
                href={l.href}
                onClick={(e) => {
                  if (pathname === l.href) {
                    e.preventDefault()
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }
                  setDropdownOpen(false)
                }}
                className="block px-5 py-3 text-[0.72rem] font-medium tracking-[0.1em] uppercase text-(--mid) no-underline hover:text-(--black) hover:bg-(--bg-warm2) transition-colors duration-150"
              >
                {l.label}
              </Link>
            ))}
          </div>
        )}
      </div>

      <Link
        href="/book"
        className="text-[0.72rem] font-semibold tracking-[0.08em] text-nowrap uppercase text-(--white) bg-(--black) py-[0.55rem] px-[1.3rem] no-underline transition-opacity duration-200 hover:opacity-75"
      >
        Get the Book — $27.99
      </Link>
    </nav>
  )
}
