import { createClient } from '@supabase/supabase-js'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import type Stripe from 'stripe'

import { sendCareNavigatorEmail, sendPurchaseNotification } from '@/lib/email'
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
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const buyerEmail = session.customer_details?.email ?? ''
    const buyerName = session.customer_details?.name ?? null
    const amountCents = session.amount_total ?? 2799

    await supabase.from('purchases').insert({
      email: buyerEmail,
      name: buyerName,
      stripe_session_id: session.id,
      stripe_payment_intent: session.payment_intent as string,
      amount_cents: amountCents,
      status: 'completed',
    })

    try {
      const supabaseAdmin = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE!
      )

      const { data, error } = await supabaseAdmin.storage
        .from('ebooks')
        .createSignedUrl('frank_care_navigator.pdf', 60 * 60 * 48)

      if (error) {
        console.error('[webhook] signed URL generation failed:', error)
      } else {
        await sendCareNavigatorEmail(buyerEmail, buyerName, data.signedUrl)
      }
    } catch (err) {
      console.error('[webhook] storage client error:', err)
    }

    await sendPurchaseNotification(buyerName, buyerEmail, amountCents)
  }

  return NextResponse.json({ received: true })
}
