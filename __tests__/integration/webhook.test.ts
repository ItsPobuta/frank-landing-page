import { describe, expect, it, vi, beforeEach } from 'vitest'
import type Stripe from 'stripe'

const mockConstructEvent = vi.fn()
const mockInsert = vi.fn().mockResolvedValue({ error: null })
const mockFrom = vi.fn(() => ({ insert: mockInsert }))

vi.mock('@/lib/stripe', () => ({
  stripe: { webhooks: { constructEvent: mockConstructEvent } },
}))

vi.mock('@/lib/supabase', () => ({
  supabase: { from: mockFrom },
}))

vi.mock('next/headers', () => ({
  headers: vi.fn().mockResolvedValue({
    get: vi.fn().mockReturnValue('test-signature'),
  }),
}))

const { POST } = await import('@/app/api/webhook/route')

function makeRequest(body: string) {
  return new Request('http://localhost:3000/api/webhook', {
    method: 'POST',
    body,
  })
}

function makeSession(overrides = {}): Stripe.Checkout.Session {
  return {
    id: 'cs_test_123',
    payment_intent: 'pi_test_123',
    amount_total: 2599,
    customer_details: { email: 'buyer@example.com', name: 'Jane Smith' },
    ...overrides,
  } as unknown as Stripe.Checkout.Session
}

describe('POST /api/webhook', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockInsert.mockResolvedValue({ error: null })
    mockFrom.mockReturnValue({ insert: mockInsert })
  })

  it('returns 400 for invalid signature', async () => {
    mockConstructEvent.mockImplementation(() => { throw new Error('Invalid signature') })
    const res = await POST(makeRequest('bad-body'))
    expect(res.status).toBe(400)
  })

  it('inserts purchase record on checkout.session.completed', async () => {
    const session = makeSession()
    mockConstructEvent.mockReturnValue({ type: 'checkout.session.completed', data: { object: session } })

    const res = await POST(makeRequest('{}'))
    expect(res.status).toBe(200)
    expect(mockFrom).toHaveBeenCalledWith('purchases')
    expect(mockInsert).toHaveBeenCalledWith(
      expect.objectContaining({
        email: 'buyer@example.com',
        stripe_session_id: 'cs_test_123',
        status: 'completed',
      })
    )
  })

  it('does nothing for unhandled event types', async () => {
    mockConstructEvent.mockReturnValue({ type: 'payment_intent.created', data: { object: {} } })

    const res = await POST(makeRequest('{}'))
    expect(res.status).toBe(200)
    expect(mockInsert).not.toHaveBeenCalled()
  })

  it('returns received: true on success', async () => {
    mockConstructEvent.mockReturnValue({ type: 'payment_intent.created', data: { object: {} } })
    const res = await POST(makeRequest('{}'))
    const data = await res.json()
    expect(data).toEqual({ received: true })
  })
})
