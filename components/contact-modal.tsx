'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type { z } from 'zod'

import { trackEvent } from '@/lib/analytics'
import { formatPhone } from '@/lib/format-phone'
import { baseSchema, orgSchema } from '@/lib/schemas'

export type LeadType = 'board' | 'membership' | 'info' | 'hello'

const config: Record<
  LeadType,
  { label: string; message: string; hasOrgFields: boolean }
> = {
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

type FormFields = z.infer<typeof orgSchema>
type FieldErrors = Partial<Record<keyof FormFields, string>>

interface Props {
  type: LeadType
  isOpen: boolean
  onClose: () => void
}

type Status = 'idle' | 'loading' | 'success' | 'error'

const emptyForm: FormFields = {
  name: '',
  email: '',
  phone: '',
  company: '',
  job_title: '',
}

export function ContactModal({ type, isOpen, onClose }: Props) {
  const { label, message, hasOrgFields } = config[type]
  const [form, setForm] = useState<FormFields>(emptyForm)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [submitError, setSubmitError] = useState('')
  const onCloseRef = useRef(onClose)
  useEffect(() => {
    onCloseRef.current = onClose
  })

  const handleClose = useCallback(() => {
    setStatus('idle')
    setSubmitError('')
    setFieldErrors({})
    setForm(emptyForm)
    onCloseRef.current()
  }, [])

  useEffect(() => {
    const nav = document.getElementById('nav')
    document.body.style.overflow = isOpen ? 'hidden' : ''
    if (isOpen) {
      nav?.setAttribute('inert', '')
    } else {
      nav?.removeAttribute('inert')
    }
    return () => {
      document.body.style.overflow = ''
      nav?.removeAttribute('inert')
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, handleClose])

  if (!isOpen) return null

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    const formatted = name === 'phone' ? formatPhone(value) : value
    setForm(prev => ({ ...prev, [name]: formatted }))
    if (fieldErrors[name as keyof FormFields]) {
      setFieldErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitError('')

    const schema = hasOrgFields ? orgSchema : baseSchema
    const result = schema.safeParse(form)

    if (!result.success) {
      const errors: FieldErrors = {}
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof FormFields
        if (key && !errors[key]) errors[key] = issue.message
      }
      setFieldErrors(errors)
      return
    }

    setStatus('loading')

    const res = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, ...result.data }),
    })

    if (!res.ok) {
      setStatus('error')
      setSubmitError(
        'Something went wrong. Please email us at hello@whatsfrank.com'
      )
      return
    }

    trackEvent('lead_form_submit', { label: type })
    setStatus('success')
  }

  function inputClass(field: keyof FormFields) {
    return `w-full border bg-transparent px-4 py-3 text-[0.9rem] text-(--black) placeholder:text-(--light) outline-none transition-colors ${
      fieldErrors[field]
        ? 'border-red-400 focus:border-red-500'
        : 'border-(--rule) focus:border-(--mid)'
    }`
  }

  return createPortal(
    <div className="fixed inset-0 z-30 flex items-center justify-center p-6">
      {/* backdrop */}
      <button
        type="button"
        aria-label="Close modal"
        className="absolute inset-0 bg-black/50 cursor-default"
        onClick={handleClose}
      />

      {/* panel */}
      <div
        role="dialog"
        aria-modal="true"
        className="relative bg-(--white) border border-(--rule) w-full max-w-lg max-h-[90vh] overflow-y-auto"
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
            <button
              type="button"
              onClick={handleClose}
              className="btn-white mt-8"
            >
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
                  <p className="text-[0.75rem] text-red-500 mt-1">
                    {fieldErrors.name}
                  </p>
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
                  <p className="text-[0.75rem] text-red-500 mt-1">
                    {fieldErrors.email}
                  </p>
                )}
              </div>

              <div>
                <input
                  name="phone"
                  type="tel"
                  placeholder="Phone number"
                  value={form.phone}
                  onChange={handleChange}
                  className={inputClass('phone')}
                />
                {fieldErrors.phone && (
                  <p className="text-[0.75rem] text-red-500 mt-1">
                    {fieldErrors.phone}
                  </p>
                )}
              </div>

              {hasOrgFields && (
                <>
                  <div>
                    <input
                      name="company"
                      type="text"
                      placeholder="Company / Organization"
                      value={form.company}
                      onChange={handleChange}
                      className={inputClass('company')}
                    />
                    {fieldErrors.company && (
                      <p className="text-[0.75rem] text-red-500 mt-1">
                        {fieldErrors.company}
                      </p>
                    )}
                  </div>
                  <div>
                    <input
                      name="job_title"
                      type="text"
                      placeholder="Job title"
                      value={form.job_title}
                      onChange={handleChange}
                      className={inputClass('job_title')}
                    />
                    {fieldErrors.job_title && (
                      <p className="text-[0.75rem] text-red-500 mt-1">
                        {fieldErrors.job_title}
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>

            {status === 'error' && (
              <p className="text-[0.8rem] text-red-500 mt-4 leading-snug">
                {submitError}
              </p>
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
    </div>,
    document.body
  )
}
