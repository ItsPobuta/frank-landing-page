type LeadType = 'board' | 'membership' | 'info' | 'hello'

const RESEND_API = 'https://api.resend.com/emails'
const FRANK_FROM = 'frank. <hello@whatsfrank.com>'
const RON_EMAIL = 'hello@whatsfrank.com'

const LEAD_FROM: Record<LeadType, string> = {
  board: 'frank. <board@whatsfrank.com>',
  membership: 'frank. <membership@whatsfrank.com>',
  info: 'frank. <hello@whatsfrank.com>',
  hello: 'frank. <hello@whatsfrank.com>',
}

const LEAD_LABEL: Record<LeadType, string> = {
  board: 'Governing Board',
  membership: 'Charter Membership',
  info: 'General Information',
  hello: 'Families & Consumers',
}

async function sendEmail(params: {
  from: string
  to: string
  subject: string
  html: string
}) {
  const res = await fetch(RESEND_API, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    console.error('[resend] error:', err)
  }
}

export async function sendCareNavigatorEmail(
  buyerEmail: string,
  buyerName: string | null,
  downloadUrl: string
) {
  const firstName = buyerName?.split(' ')[0] ?? null
  const greeting = firstName ? `Hi ${firstName},` : 'Hi,'

  try {
    await sendEmail({
      from: FRANK_FROM,
      to: buyerEmail,
      subject: 'Your Frank Care Navigator',
      html: careNavigatorHtml(greeting, downloadUrl),
    })
  } catch (err) {
    console.error('[email] care navigator delivery failed:', err)
  }
}

export async function sendPurchaseNotification(
  buyerName: string | null,
  buyerEmail: string,
  amountCents: number
) {
  const amount = `$${(amountCents / 100).toFixed(2)}`

  try {
    await sendEmail({
      from: FRANK_FROM,
      to: RON_EMAIL,
      subject: `New Care Navigator purchase — ${buyerName ?? buyerEmail}`,
      html: purchaseNotificationHtml(buyerName, buyerEmail, amount),
    })
  } catch (err) {
    console.error('[email] purchase notification failed:', err)
  }
}

export async function sendLeadNotification(lead: {
  type: LeadType
  name: string
  email: string
  phone: string
  company?: string | null
  job_title?: string | null
}) {
  const label = LEAD_LABEL[lead.type]

  try {
    await sendEmail({
      from: LEAD_FROM[lead.type],
      to: RON_EMAIL,
      subject: `New lead — ${label} — ${lead.name}`,
      html: leadNotificationHtml(label, lead),
    })
  } catch (err) {
    console.error('[email] lead notification failed:', err)
  }
}

function careNavigatorHtml(greeting: string, downloadUrl: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Your Frank Care Navigator</title>
</head>
<body style="margin:0;padding:0;background:#f9f9f7;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9f9f7;padding:48px 16px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #e8e8e4;">
          <tr>
            <td style="padding:40px 48px 32px;border-bottom:1px solid #e8e8e4;">
              <p style="margin:0;font-size:11px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;color:#999990;">frank.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:40px 48px;">
              <p style="margin:0 0 20px;font-size:15px;color:#111110;line-height:1.6;">${greeting}</p>
              <p style="margin:0 0 20px;font-size:15px;color:#555550;line-height:1.8;font-weight:300;">
                [PLACEHOLDER — Ron will provide the final copy here.]
              </p>
              <p style="margin:0 0 32px;font-size:15px;color:#555550;line-height:1.8;font-weight:300;">
                One important note: the Care Navigator is a standalone guide. It does not grant access to the frank. platform or directory. The frank. directory — where facilities are scored and listed — is still under development and will be available once all facilities have been evaluated. We'll be in touch as that milestone approaches.
              </p>
              <table cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
                <tr>
                  <td style="background:#111110;">
                    <a href="${downloadUrl}" target="_blank" style="display:inline-block;padding:14px 32px;background:#111110;color:#ffffff;font-size:12px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;text-decoration:none;">
                      Download Care Navigator
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin:0;font-size:13px;color:#999990;line-height:1.6;">
                This link expires in 48 hours. If you need a new one, reply to this email and we'll send a fresh copy.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 48px;border-top:1px solid #e8e8e4;">
              <p style="margin:0;font-size:12px;color:#bbbbaa;line-height:1.6;">frank. &nbsp;·&nbsp; <a href="https://whatsfrank.com" style="color:#bbbbaa;text-decoration:none;">whatsfrank.com</a></p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

function purchaseNotificationHtml(
  name: string | null,
  email: string,
  amount: string
): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>New Purchase</title></head>
<body style="margin:0;padding:0;background:#f9f9f7;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9f9f7;padding:48px 16px;">
    <tr>
      <td align="center">
        <table width="480" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #e8e8e4;">
          <tr>
            <td style="padding:32px 40px 24px;border-bottom:1px solid #e8e8e4;">
              <p style="margin:0;font-size:11px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;color:#999990;">frank. &nbsp;·&nbsp; New Purchase</p>
            </td>
          </tr>
          <tr>
            <td style="padding:32px 40px;">
              <table cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #f0f0ec;font-size:12px;color:#999990;text-transform:uppercase;letter-spacing:0.1em;">Name</td>
                  <td style="padding:10px 0;border-bottom:1px solid #f0f0ec;font-size:14px;color:#111110;text-align:right;">${name ?? '—'}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #f0f0ec;font-size:12px;color:#999990;text-transform:uppercase;letter-spacing:0.1em;">Email</td>
                  <td style="padding:10px 0;border-bottom:1px solid #f0f0ec;font-size:14px;color:#111110;text-align:right;">${email}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;font-size:12px;color:#999990;text-transform:uppercase;letter-spacing:0.1em;">Amount</td>
                  <td style="padding:10px 0;font-size:14px;color:#111110;font-weight:600;text-align:right;">${amount}</td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

function leadNotificationHtml(
  label: string,
  lead: {
    name: string
    email: string
    phone: string
    company?: string | null
    job_title?: string | null
  }
): string {
  const rows: [string, string][] = [
    ['Name', lead.name],
    ['Email', lead.email],
    ['Phone', lead.phone],
    ...(lead.company ? ([['Company', lead.company]] as [string, string][]) : []),
    ...(lead.job_title ? ([['Title', lead.job_title]] as [string, string][]) : []),
  ]

  const rowsHtml = rows
    .map(
      ([field, value], i) => `
      <tr>
        <td style="padding:10px 0;${i < rows.length - 1 ? 'border-bottom:1px solid #f0f0ec;' : ''}font-size:12px;color:#999990;text-transform:uppercase;letter-spacing:0.1em;">${field}</td>
        <td style="padding:10px 0;${i < rows.length - 1 ? 'border-bottom:1px solid #f0f0ec;' : ''}font-size:14px;color:#111110;text-align:right;">${value}</td>
      </tr>`
    )
    .join('')

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>New Lead</title></head>
<body style="margin:0;padding:0;background:#f9f9f7;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9f9f7;padding:48px 16px;">
    <tr>
      <td align="center">
        <table width="480" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #e8e8e4;">
          <tr>
            <td style="padding:32px 40px 24px;border-bottom:1px solid #e8e8e4;">
              <p style="margin:0;font-size:11px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;color:#999990;">frank. &nbsp;·&nbsp; New Lead &nbsp;·&nbsp; ${label}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:32px 40px;">
              <table cellpadding="0" cellspacing="0" width="100%">
                ${rowsHtml}
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}
