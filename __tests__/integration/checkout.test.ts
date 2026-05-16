import { describe, expect, it, vi, beforeEach } from 'vitest'

const mockCreate = vi.fn()

vi.mock('@/lib/stripe', () => ({
  stripe: {
    checkout: {
      sessions: {
        create: mockCreate,
      },
    },
  },
}))

// import after mock is set up
const { POST } = await import('@/app/api/checkout/route')

describe('POST /api/checkout', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockCreate.mockResolvedValue({ url: 'https://checkout.stripe.com/pay/cs_test_123' })
    process.env.STRIPE_PRICE_ID = 'price_test_123'
    process.env.NEXT_PUBLIC_SITE_URL = 'http://localhost:3000'
  })

  it('returns a checkout URL', async () => {
    const res = await POST()
    const data = await res.json()
    expect(data.url).toBe('https://checkout.stripe.com/pay/cs_test_123')
  })

  it('creates session with correct price ID', async () => {
    await POST()
    expect(mockCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        line_items: [{ price: 'price_test_123', quantity: 1 }],
        mode: 'payment',
      })
    )
  })

  it('sets success_url with session_id placeholder', async () => {
    await POST()
    expect(mockCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        success_url: expect.stringContaining('{CHECKOUT_SESSION_ID}'),
      })
    )
  })

  it('sets cancel_url pointing back to navigator section', async () => {
    await POST()
    expect(mockCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        cancel_url: expect.stringContaining('#navigator'),
      })
    )
  })
})
