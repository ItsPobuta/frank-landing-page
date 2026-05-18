'use client'

import { useState } from 'react'

import { trackEvent } from '@/lib/analytics'
import { ContactModal, type LeadType } from './contact-modal'

const ctaLinks: { type: LeadType; label: string; title: string }[] = [
  {
    type: 'board',
    label: 'Governing Board',
    title: "I'm interested in a board seat",
  },
  {
    type: 'membership',
    label: 'Charter Membership',
    title: 'I want to get credentialed as a member',
  },
  {
    type: 'info',
    label: 'General Information',
    title: "I'd like to learn more and talk about it",
  },
  {
    type: 'hello',
    label: 'Families & Consumers',
    title: "I'm a family member looking for guidance",
  },
]

export function LeadCaptureForm() {
  const [activeType, setActiveType] = useState<LeadType | null>(null)

  return (
    <>
      <div className="flex flex-col gap-px">
        {ctaLinks.map(link => (
          <button
            key={link.label}
            type="button"
            onClick={() => {
              trackEvent('lead_form_open', { label: link.type })
              setActiveType(link.type)
            }}
            className="group flex items-center justify-between py-[1.3rem] px-[1.6rem] bg-(--white) border border-(--rule) mb-2 text-(--black) transition-[background,border-color] duration-200 hover:bg-(--bg) hover:border-(--mid) text-left w-full"
          >
            <div>
              <span className="text-[0.68rem] font-medium tracking-[0.13em] uppercase text-(--light) block mb-1">
                {link.label}
              </span>
              <span className="text-[0.95rem] font-medium tracking-[-0.01em] text-(--black)">
                {link.title}
              </span>
            </div>
            <span className="text-[1.1rem] text-(--light) transition-[color,transform] duration-200 group-hover:text-(--black) group-hover:translate-x-1.25">
              →
            </span>
          </button>
        ))}
      </div>

      {activeType && (
        <ContactModal
          type={activeType}
          isOpen={true}
          onClose={() => setActiveType(null)}
        />
      )}
    </>
  )
}
