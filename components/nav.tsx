'use client'

import { useEffect, useState } from 'react'

import { cn } from '@/lib/utils'

const links = [
  { id: 'why', label: 'Why Frank', href: '#why' },
  { id: 'model', label: 'The Model', href: '#model' },
  { id: 'board', label: 'The Board', href: '#board' },
  { id: 'charter', label: 'Charter Members', href: '#charter' },
  { id: 'navigator', label: 'Care Navigator', href: '#navigator' },
]

const navLinkClass =
  "text-[0.72rem] font-medium tracking-[0.12em] uppercase text-nowrap text-(--light) no-underline transition-colors duration-200 relative hover:text-(--black) after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-px after:bg-(--black) after:transition-[width] after:duration-250 after:ease-out hover:after:w-full"

function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - 80
  window.scrollTo({ top, behavior: 'smooth' })
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

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

  const close = () => setMenuOpen(false)

  return (
    <>
      <nav
        id="nav"
        className={cn(
          'fixed top-0 left-0 right-0 z-20 flex items-center justify-between py-[1.4rem] px-12 backdrop-blur-md border-b transition-[border-color,background] duration-400 max-[900px]:py-[1.2rem] max-[900px]:px-6',
          scrolled
            ? 'border-(--rule) bg-[rgba(248,248,245,0.97)]'
            : 'border-transparent bg-[rgba(248,248,245,0.90)]'
        )}
      >
        <a
          href="#top"
          className="font-bold text-[1.35rem] tracking-[-0.03em] text-(--black) no-underline"
        >
          frank.
        </a>

        {/* Desktop links */}
        <ul className="flex gap-10 list-none items-center m-0 p-0 max-[900px]:hidden">
          {links.map(l => (
            <li key={l.id}>
              <a href={l.href} className={navLinkClass}>
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              className="text-[0.72rem] font-semibold tracking-[0.08em] text-nowrap uppercase text-(--white) bg-(--black) py-[0.55rem] px-[1.3rem] no-underline transition-opacity duration-200 hover:opacity-75"
            >
              Get Involved
            </a>
          </li>
        </ul>

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
      </nav>

      {/* Full-screen overlay — mobile only */}
      <div
        className={cn(
          'fixed inset-0 z-10 transition-[opacity,visibility] duration-400',
          menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        )}
      >
        {/* Backdrop — clicking empty space closes overlay */}
        <button
          type="button"
          aria-label="Close menu"
          tabIndex={menuOpen ? 0 : -1}
          onClick={close}
          className="absolute inset-0 w-full h-full bg-(--bg) cursor-default"
        />

        {/* Nav links — above backdrop */}
        <div className="relative z-1 flex flex-col items-center justify-center h-full gap-8">
          {links.map(l => (
            <button
              key={l.id}
              type="button"
              tabIndex={menuOpen ? 0 : -1}
              onClick={() => {
                close()
                scrollToId(l.id)
              }}
              className="text-[0.82rem] font-medium tracking-[0.2em] uppercase text-(--mid) bg-transparent border-0 cursor-pointer transition-colors duration-200 hover:text-(--black)"
            >
              {l.label}
            </button>
          ))}
          <button
            type="button"
            tabIndex={menuOpen ? 0 : -1}
            onClick={() => {
              close()
              scrollToId('contact')
            }}
            className="mt-4 text-[0.78rem] font-semibold tracking-[0.08em] uppercase text-(--white) bg-(--black) py-4 px-10 border-0 cursor-pointer transition-opacity duration-200 hover:opacity-75"
          >
            Get Involved
          </button>
        </div>
      </div>
    </>
  )
}
