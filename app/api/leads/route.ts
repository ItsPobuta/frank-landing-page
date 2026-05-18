import type { z } from 'zod'
import { NextResponse } from 'next/server'

import { sendLeadNotification } from '@/lib/email'
import { baseSchema, orgSchema } from '@/lib/schemas'
import { supabase } from '@/lib/supabase'

type LeadType = 'board' | 'membership' | 'info' | 'hello'

const ORG_TYPES = new Set<LeadType>(['board', 'membership', 'info'])
const VALID_TYPES = new Set<string>(['board', 'membership', 'info', 'hello'])

export async function POST(req: Request) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { type, ...fields } = body

  if (!VALID_TYPES.has(type as string)) {
    return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
  }

  const leadType = type as LeadType
  const hasOrgFields = ORG_TYPES.has(leadType)
  const schema = hasOrgFields ? orgSchema : baseSchema
  const result = schema.safeParse(fields)

  if (!result.success) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
  }

  const orgData = hasOrgFields
    ? (result.data as z.infer<typeof orgSchema>)
    : null

  const { error } = await supabase.from('leads').insert({
    type: leadType,
    name: result.data.name,
    email: result.data.email,
    phone: result.data.phone || null,
    company: orgData?.company || null,
    job_title: orgData?.job_title || null,
  })

  if (error) {
    console.error('[leads] database insert failed:', error)
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }

  await sendLeadNotification({
    type: leadType,
    name: result.data.name,
    email: result.data.email,
    phone: result.data.phone,
    company: orgData?.company || null,
    job_title: orgData?.job_title || null,
  })

  return NextResponse.json({ ok: true })
}
