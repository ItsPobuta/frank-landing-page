import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

import { stripe } from '@/lib/stripe'
import { supabase } from '@/lib/supabase'

export async function POST(req: Request) {
  const body = await req.text()
  const signature = (await headers()).get('stripe-signature')!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    )
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    await supabase.from('purchases').insert({
      email: session.customer_details?.email ?? '',
      name: session.customer_details?.name ?? null,
      stripe_session_id: session.id,
      stripe_payment_intent: session.payment_intent as string,
      amount_cents: session.amount_total ?? 2599,
      status: 'completed',
    })
  }

  return NextResponse.json({ received: true })
}
