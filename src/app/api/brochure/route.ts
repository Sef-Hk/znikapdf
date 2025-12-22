// import { NextResponse } from 'next/server'

// export const runtime = 'nodejs'

// export async function POST(req: Request) {
//   try {
//     const { nom = '', prenom = '', domaineProfessionnel = '', email } = await req.json()

//     if (!email) {
//       return NextResponse.json({ message: 'Missing email' }, { status: 400 })
//     }

//     const r = await fetch(
//       'https://script.google.com/macros/s/AKfycbzrbOzHS3pr_LNPJtsVVidgYwePO8edtQP0FXjRuSYRft2otmyrpQ9IzOxum6aaZ07s/exec',
//       {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ nom, prenom, domaineProfessionnel, email }),
//         cache: 'no-store',
//       },
//     )

//     if (!r.ok) {
//       const text = await r.text().catch(() => '')
//       return NextResponse.json(
//         { message: 'Google Script failed', error: text || `status ${r.status}` },
//         { status: 502 },
//       )
//     }

//     return NextResponse.json({ message: 'Données enregistrées avec succès' }, { status: 200 })
//   } catch (err: any) {
//     console.error('Brochure API error:', err?.message || err)
//     return NextResponse.json(
//       { message: 'Erreur interne', error: err?.message || String(err) },
//       { status: 500 },
//     )
//   }
// }

import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

async function verifyRecaptcha(token: string, remoteip?: string) {
  const secret = process.env.RECAPTCHA_SECRET_KEY
  if (!secret) return { ok: false, reason: 'missing_secret' }
  if (!token) return { ok: false, reason: 'missing_token' }

  const body = new URLSearchParams()
  body.set('secret', secret)
  body.set('response', token)
  if (remoteip) body.set('remoteip', remoteip)

  const r = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
    cache: 'no-store',
  })

  const data = await r.json()

  return data
}

export async function POST(req: Request) {
  try {
    const {
      nom = '',
      prenom = '',
      domaineProfessionnel = '',
      email,
      recaptchaToken,
    } = await req.json()

    if (!email) {
      return NextResponse.json({ message: 'Missing email' }, { status: 400 })
    }

    // ✅ Verify reCAPTCHA first
    const result: any = await verifyRecaptcha(recaptchaToken)

    // v3 returns: success + score + action + hostname ... :contentReference[oaicite:2]{index=2}
    const scoreOk = typeof result.score === 'number' ? result.score >= 0.5 : true
    const actionOk = result.action ? result.action === 'brochure_submit' : true

    if (!result.success || !scoreOk || !actionOk) {
      return NextResponse.json(
        {
          message: 'reCAPTCHA failed',
          details: {
            success: result.success,
            score: result.score,
            action: result.action,
            hostname: result.hostname,
            'error-codes': result['error-codes'],
          },
        },
        { status: 403 },
      )
    }

    // --- your Google Sheet call ---
    const r = await fetch(
      'https://script.google.com/macros/s/AKfycbzrbOzHS3pr_LNPJtsVVidgYwePO8edtQP0FXjRuSYRft2otmyrpQ9IzOxum6aaZ07s/exec',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nom, prenom, domaineProfessionnel, email }),
        cache: 'no-store',
      },
    )

    if (!r.ok) {
      const text = await r.text().catch(() => '')
      return NextResponse.json(
        { message: 'Google Script failed', error: text || `status ${r.status}` },
        { status: 502 },
      )
    }

    return NextResponse.json({ message: 'Données enregistrées avec succès' }, { status: 200 })
  } catch (err: any) {
    console.error('Brochure API error:', err?.message || err)
    return NextResponse.json(
      { message: 'Erreur interne', error: err?.message || String(err) },
      { status: 500 },
    )
  }
}
