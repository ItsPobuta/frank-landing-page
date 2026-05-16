import { describe, expect, it } from 'vitest'
import { formatPhone } from '@/lib/format-phone'

describe('formatPhone', () => {
  it('returns empty string for empty input', () => {
    expect(formatPhone('')).toBe('')
  })

  it('formats area code only', () => {
    expect(formatPhone('123')).toBe('(123')
  })

  it('formats partial number', () => {
    expect(formatPhone('1234')).toBe('(123) 4')
    expect(formatPhone('123456')).toBe('(123) 456')
  })

  it('formats full 10-digit number', () => {
    expect(formatPhone('1234567890')).toBe('(123) 456-7890')
  })

  it('strips non-digit characters before formatting', () => {
    expect(formatPhone('(123) 456-7890')).toBe('(123) 456-7890')
    expect(formatPhone('123-456-7890')).toBe('(123) 456-7890')
    expect(formatPhone('123.456.7890')).toBe('(123) 456-7890')
  })

  it('truncates to 10 digits', () => {
    expect(formatPhone('12345678901234')).toBe('(123) 456-7890')
  })

  it('handles single digit input', () => {
    expect(formatPhone('1')).toBe('(1')
  })
})
