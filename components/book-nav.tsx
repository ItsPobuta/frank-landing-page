'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

const links = [
  { label: 'Why This Book', href: '#why' },
  { label: "What's Inside", href: '#guides' },
  { label: "Who It's For", href: '#for-who' },
]

const dropdownLinks = [
  { label: 'Home', href: '/' },
  { label: 'The Book', href: '/book' },
  { label: 'Guides', href: '/guides' },
]

const navLinkClass =
  "text-[0.72rem] font-medium tracking-[0.12em] uppercase text-nowrap text-(--light) no-underline transition-colors duration-200 relative hover:text-(--black) after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-px after:bg-(--black) after:transition-[width] after:duration-250 after:ease-out hover:after:w-full"

export function BookNav() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

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

  const close = () => setMenuOpen(false)

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-20 flex items-center justify-between py-[1.4rem] px-12 backdrop-blur-md border-b border-(--rule) transition-[background] duration-400 max-[900px]:py-[1.2rem] max-[900px]:px-6',
          scrolled ? 'bg-[rgba(248,248,245,0.97)]' : 'bg-[rgba(248,248,245,0.90)]'
        )}
      >
        {/* Logo — dropdown trigger */}
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

        <div className="flex items-center gap-10">
          {/* Desktop links */}
          <ul className="flex gap-10 list-none items-center m-0 p-0 max-[900px]:hidden">
            {links.map(l => (
              <li key={l.href}>
                <a href={l.href} className={navLinkClass}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <a
            href="#get-it"
            className="text-[0.72rem] font-semibold tracking-[0.08em] text-nowrap uppercase text-(--white) bg-(--black) py-[0.55rem] px-[1.3rem] no-underline transition-opacity duration-200 hover:opacity-75 max-[900px]:hidden"
          >
            Get Book — $27.99
          </a>

          {/* Hamburger — mobile only */}
          <button
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(o => !o)}
            className="hidden max-[900px]:flex flex-col justify-center items-center w-8 h-8 gap-[5px] bg-transparent border-0 cursor-pointer p-0"
          >
            <span
              className={cn(
                'block w-5 h-px bg-(--black) transition-transform duration-300 origin-center',
                menuOpen && 'translate-y-1.5 rotate-45'
              )}
            />
            <span
              className={cn(
                'block w-5 h-px bg-(--black) transition-opacity duration-300',
                menuOpen && 'opacity-0'
              )}
            />
            <span
              className={cn(
                'block w-5 h-px bg-(--black) transition-transform duration-300 origin-center',
                menuOpen && '-translate-y-[6px] -rotate-45'
              )}
            />
          </button>
        </div>
      </nav>

      {/* Full-screen overlay — mobile only */}
      <div
        className={cn(
          'fixed inset-0 z-10 transition-[opacity,visibility] duration-400',
          menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        )}
      >
        <button
          type="button"
          aria-label="Close menu"
          tabIndex={menuOpen ? 0 : -1}
          onClick={close}
          className="absolute inset-0 w-full h-full bg-(--bg) cursor-default"
        />

        <div className="relative z-1 flex flex-col items-center justify-center h-full gap-7">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              tabIndex={menuOpen ? 0 : -1}
              onClick={close}
              className="text-[0.82rem] font-medium tracking-[0.2em] uppercase text-(--mid) no-underline transition-colors duration-200 hover:text-(--black)"
            >
              {l.label}
            </a>
          ))}

          <a
            href="#get-it"
            tabIndex={menuOpen ? 0 : -1}
            onClick={close}
            className="mt-4 text-[0.78rem] font-semibold tracking-[0.08em] uppercase text-(--white) bg-(--black) py-4 px-10 no-underline transition-opacity duration-200 hover:opacity-75"
          >
            Get Book — $27.99
          </a>
        </div>
      </div>
    </>
  )
}
