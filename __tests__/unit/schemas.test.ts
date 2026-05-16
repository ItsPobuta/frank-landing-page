import { describe, expect, it } from 'vitest'
import { baseSchema, orgSchema } from '@/lib/schemas'

const validBase = {
  name: 'Jane Smith',
  email: 'jane@example.com',
  phone: '(555) 123-4567',
}

const validOrg = {
  ...validBase,
  company: 'Sunrise Care',
  job_title: 'COO',
}

describe('baseSchema', () => {
  it('passes with valid data', () => {
    expect(baseSchema.safeParse(validBase).success).toBe(true)
  })

  it('fails when name is too short', () => {
    const result = baseSchema.safeParse({ ...validBase, name: 'J' })
    expect(result.success).toBe(false)
    if (!result.success) {
      const nameIssue = result.error.issues.find(i => i.path[0] === 'name')
      expect(nameIssue?.message).toBe('Please enter your full name')
    }
  })

  it('fails with invalid email', () => {
    const result = baseSchema.safeParse({ ...validBase, email: 'not-an-email' })
    expect(result.success).toBe(false)
    if (!result.success) {
      const emailIssue = result.error.issues.find(i => i.path[0] === 'email')
      expect(emailIssue?.message).toBe('Please enter a valid email address')
    }
  })

  it('fails with phone not matching US format', () => {
    const result = baseSchema.safeParse({ ...validBase, phone: '5551234567' })
    expect(result.success).toBe(false)
    if (!result.success) {
      const phoneIssue = result.error.issues.find(i => i.path[0] === 'phone')
      expect(phoneIssue?.message).toBe('Please enter a valid phone number')
    }
  })

  it('passes with correctly formatted phone', () => {
    expect(baseSchema.safeParse({ ...validBase, phone: '(555) 123-4567' }).success).toBe(true)
  })

  it('fails when name is missing', () => {
    const result = baseSchema.safeParse({ ...validBase, name: '' })
    expect(result.success).toBe(false)
  })

  it('fails when email is missing', () => {
    const result = baseSchema.safeParse({ ...validBase, email: '' })
    expect(result.success).toBe(false)
  })
})

describe('orgSchema', () => {
  it('passes with all org fields', () => {
    expect(orgSchema.safeParse(validOrg).success).toBe(true)
  })

  it('fails when company is missing', () => {
    const result = orgSchema.safeParse({ ...validOrg, company: '' })
    expect(result.success).toBe(false)
    if (!result.success) {
      const issue = result.error.issues.find(i => i.path[0] === 'company')
      expect(issue?.message).toBe('Please enter your company or organization')
    }
  })

  it('fails when job_title is missing', () => {
    const result = orgSchema.safeParse({ ...validOrg, job_title: '' })
    expect(result.success).toBe(false)
    if (!result.success) {
      const issue = result.error.issues.find(i => i.path[0] === 'job_title')
      expect(issue?.message).toBe('Please enter your job title')
    }
  })
})
