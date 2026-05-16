import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

export async function POST() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [
      {
        price: process.env.STRIPE_PRICE_ID!,
        quantity: 1,
      },
    ],
    success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/#navigator`,
    allow_promotion_codes: true,
  })

  return NextResponse.json({ url: session.url })
}
