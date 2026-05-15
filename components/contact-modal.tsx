'use client'

import { useEffect, useState } from 'react'
import { z } from 'zod'

import { supabase } from '@/lib/supabase'

export type LeadType = 'board' | 'membership' | 'info' | 'hello'

const config: Record<LeadType, { label: string; message: string; hasOrgFields: boolean }> = {
  board: {
    label: 'Governing Board',
    message:
      "Thank you for wanting to be part of Frank's board. We think we are onto something significant and we need people like yourself who want to change the industry. Please fill out the form and someone will call you. We are thrilled that you want to be considered.",
    hasOrgFields: true,
  },
  membership: {
    label: 'Charter Membership',
    message:
      'You are about to be part of a big change in the industry. Becoming a member is the first step. To be frank — pun intended — being a member and getting credentialed is a signal to the world that you are committed to delivering quality and compassionate care and willing to prove it. Someone will reach out to discuss next steps once you submit. We look forward to sharing more about what we are building.',
    hasOrgFields: true,
  },
  info: {
    label: 'General Information',
    message:
      'Thank you for inquiring about Frank. Someone will reach out to you after filling out the form. We look forward to sharing more details about what we are building. It might be one of the biggest changes to the long-term care industry we have seen in decades.',
    hasOrgFields: true,
  },
  hello: {
    label: 'Care Navigator',
    message:
      'Choosing a nursing home is a big decision. This is why we created the Frank Care Navigator — to help you make an informed decision and be prepared with what to look for and what questions to ask. This information was gathered from industry experts from both inside and outside the industry. If you have questions, fill out the form and someone will get back to you.',
    hasOrgFields: false,
  },
}

const baseSchema = z.object({
  name: z.string().min(2, 'Please enter your full name'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().regex(/^\(\d{3}\) \d{3}-\d{4}$/, 'Please enter a valid phone number'),
  company: z.string().optional(),
  job_title: z.string().optional(),
})

const orgSchema = baseSchema.extend({
  company: z.string().min(1, 'Please enter your company or organization'),
  job_title: z.string().min(1, 'Please enter your job title'),
})

type FormFields = z.infer<typeof orgSchema>
type FieldErrors = Partial<Record<keyof FormFields, string>>

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 10)
  if (digits.length <= 3) return digits.length ? `(${digits}` : ''
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
}

interface Props {
  type: LeadType
  isOpen: boolean
  onClose: () => void
}

type Status = 'idle' | 'loading' | 'success' | 'error'

export function ContactModal({ type, isOpen, onClose }: Props) {
  const { label, message, hasOrgFields } = config[type]
  const [form, setForm] = useState<FormFields>({
    name: '',
    email: '',
    phone: '',
    company: '',
    job_title: '',
  })
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [submitError, setSubmitError] = useState('')

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen])

  if (!isOpen) return null

  function handleClose() {
    setStatus('idle')
    setSubmitError('')
    setFieldErrors({})
    setForm({ name: '', email: '', phone: '', company: '', job_title: '' })
    onClose()
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    const formatted = name === 'phone' ? formatPhone(value) : value
    setForm(prev => ({ ...prev, [name]: formatted }))
    if (fieldErrors[name as keyof FormFields]) {
      setFieldErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitError('')

    const schema = hasOrgFields ? orgSchema : baseSchema
    const result = schema.safeParse(form)
    if (!result.success) {
      const flat = result.error.flatten().fieldErrors
      setFieldErrors({
        name: flat.name?.[0],
        email: flat.email?.[0],
        phone: flat.phone?.[0],
        company: flat.company?.[0],
        job_title: flat.job_title?.[0],
      })
      return
    }

    setStatus('loading')

    const { error } = await supabase.from('leads').insert({
      type,
      name: result.data.name,
      email: result.data.email,
      phone: result.data.phone || null,
      ...(hasOrgFields
        ? { company: result.data.company || null, job_title: result.data.job_title || null }
        : {}),
    })

    if (error) {
      setStatus('error')
      setSubmitError('Something went wrong. Please email us at hello@whatsfrank.com')
      return
    }

    setStatus('success')
  }

  function inputClass(field: keyof FormFields) {
    const hasError = !!fieldErrors[field]
    return `w-full border bg-transparent px-4 py-3 text-[0.9rem] text-(--black) placeholder:text-(--light) outline-none transition-colors ${
      hasError ? 'border-red-400 focus:border-red-500' : 'border-(--rule) focus:border-(--mid)'
    }`
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/50"
      onClick={handleClose}
    >
      <div
        className="bg-(--white) border border-(--rule) w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-8 pt-8">
          <p className="text-[0.63rem] font-semibold tracking-[0.18em] uppercase text-(--light)">
            Frank &nbsp;·&nbsp; {label}
          </p>
          <button
            type="button"
            onClick={handleClose}
            className="text-[1.4rem] leading-none text-(--light) hover:text-(--black) transition-colors"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {status === 'success' ? (
          <div className="px-8 pb-8 pt-6">
            <div className="w-full h-px bg-(--rule) mb-8" />
            <h3 className="font-bold text-[1.35rem] tracking-[-0.02em] text-(--black) mb-4 leading-tight">
              Thank you.
            </h3>
            <p className="text-[0.9rem] font-light text-(--mid) leading-[1.8]">
              We received your information and someone will be in touch soon.
            </p>
            <button type="button" onClick={handleClose} className="btn-white mt-8">
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="px-8 pb-8 pt-6">
            <div className="w-full h-px bg-(--rule) mb-6" />
            <p className="text-[0.88rem] font-light text-(--mid) leading-[1.8] mb-8">
              {message}
            </p>

            <div className="flex flex-col gap-4">
              <div>
                <input
                  name="name"
                  type="text"
                  placeholder="Full name"
                  value={form.name}
                  onChange={handleChange}
                  className={inputClass('name')}
                />
                {fieldErrors.name && (
                  <p className="text-[0.75rem] text-red-500 mt-1">{fieldErrors.name}</p>
                )}
              </div>

              <div>
                <input
                  name="email"
                  type="email"
                  placeholder="Email address"
                  value={form.email}
                  onChange={handleChange}
                  className={inputClass('email')}
                />
                {fieldErrors.email && (
                  <p className="text-[0.75rem] text-red-500 mt-1">{fieldErrors.email}</p>
                )}
              </div>

              <input
                name="phone"
                type="tel"
                placeholder="Phone number"
                value={form.phone}
                onChange={handleChange}
                className={inputClass('phone')}
              />

              {hasOrgFields && (
                <>
                  <input
                    name="company"
                    type="text"
                    placeholder="Company / Organization"
                    value={form.company}
                    onChange={handleChange}
                    className={inputClass('company')}
                  />
                  <input
                    name="job_title"
                    type="text"
                    placeholder="Job title"
                    value={form.job_title}
                    onChange={handleChange}
                    className={inputClass('job_title')}
                  />
                </>
              )}
            </div>

            {status === 'error' && (
              <p className="text-[0.8rem] text-red-500 mt-4 leading-snug">{submitError}</p>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn-primary w-full text-center mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? 'Submitting…' : 'Submit'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
