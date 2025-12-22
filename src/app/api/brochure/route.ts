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

// import { NextResponse } from 'next/server'

// export const runtime = 'nodejs'

// async function verifyRecaptcha(token: string) {
//   const secret = process.env.RECAPTCHA_SECRET_KEY

//   if (!secret) {
//     return { success: false, _reason: 'missing_secret' as const }
//   }
//   if (!token) {
//     return { success: false, _reason: 'missing_token' as const }
//   }

//   const body = new URLSearchParams()
//   body.set('secret', secret)
//   body.set('response', token)

//   const r = await fetch('https://www.google.com/recaptcha/api/siteverify', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//     body,
//     cache: 'no-store',
//   })

//   const data = await r.json()
//   return data
// }

// export async function POST(req: Request) {
//   try {
//     const {
//       nom = '',
//       prenom = '',
//       domaineProfessionnel = '',
//       email,
//       recaptchaToken,
//     } = await req.json()

//     if (!email) {
//       return NextResponse.json({ message: 'Missing email' }, { status: 400 })
//     }

//     const result: any = await verifyRecaptcha(recaptchaToken)

//     console.log('[recaptcha]', {
//       success: result?.success,
//       hostname: result?.hostname,
//       action: result?.action,
//       score: result?.score,
//       codes: result?.['error-codes'],
//     })

//     // ---- Helpful checks ----
//     const expectedAction = 'brochure_submit'
//     const scoreThreshold = 0.3 // ✅ start low, tune later
//     const hostnameOk =
//       typeof result.hostname === 'string'
//         ? result.hostname === 'brochure.znikaexperience.com' ||
//           result.hostname.endsWith('.znikaexperience.com') ||
//           result.hostname === 'znikaexperience.com'
//         : true

//     const scoreOk = typeof result.score === 'number' ? result.score >= scoreThreshold : true
//     const actionOk = typeof result.action === 'string' ? result.action === expectedAction : true

//     if (!result.success || !scoreOk || !actionOk || !hostnameOk) {
//       return NextResponse.json(
//         {
//           message: 'reCAPTCHA failed',
//           details: {
//             _reason: result._reason,
//             success: result.success,
//             score: result.score,
//             action: result.action,
//             hostname: result.hostname,
//             scoreThreshold,
//             expectedAction,
//             hostnameOk,
//             scoreOk,
//             actionOk,
//             'error-codes': result['error-codes'],
//           },
//         },
//         { status: 403 },
//       )
//     }

//     // ---- Your Google Sheet call ----
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

type RecaptchaVerifyResponse = {
  success: boolean
  score?: number
  action?: string
  hostname?: string
  challenge_ts?: string
  'error-codes'?: string[]
  _reason?: 'missing_secret' | 'missing_token'
}

async function verifyRecaptcha(token: string, remoteip?: string): Promise<RecaptchaVerifyResponse> {
  const secret = process.env.RECAPTCHA_SECRET_KEY

  if (!secret) return { success: false, _reason: 'missing_secret' }
  if (!token) return { success: false, _reason: 'missing_token' }

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

  const text = await r.text().catch(() => '')
  try {
    return JSON.parse(text)
  } catch {
    return { success: false, 'error-codes': ['invalid-json-from-google'] }
  }
}

function safeTail(v?: string) {
  if (!v) return undefined
  return v.slice(-4)
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

    // Optional: you can forward client IP if your platform provides it.
    // Railway often sets x-forwarded-for
    const xff = req.headers.get('x-forwarded-for') || ''
    const remoteip = xff.split(',')[0]?.trim() || undefined

    const result = await verifyRecaptcha(recaptchaToken, remoteip)

    // ✅ SAFE debug (Railway logs)
    console.log('[recaptcha-env]', {
      siteKeyPresent: !!process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
      secretPresent: !!process.env.RECAPTCHA_SECRET_KEY,
      siteKeyTail: safeTail(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY),
      secretTail: safeTail(process.env.RECAPTCHA_SECRET_KEY),
    })

    console.log('[recaptcha]', {
      _reason: result._reason,
      success: result?.success,
      hostname: result?.hostname,
      action: result?.action,
      score: result?.score,
      codes: result?.['error-codes'],
    })

    // ---- Checks ----
    const expectedAction = 'brochure_submit'
    const scoreThreshold = 0.3

    const hostnameOk =
      typeof result.hostname === 'string'
        ? result.hostname === 'brochure.znikaexperience.com' ||
          result.hostname.endsWith('.znikaexperience.com') ||
          result.hostname === 'znikaexperience.com'
        : true

    const scoreOk = typeof result.score === 'number' ? result.score >= scoreThreshold : true
    const actionOk = typeof result.action === 'string' ? result.action === expectedAction : true

    if (!result.success || !scoreOk || !actionOk || !hostnameOk) {
      return NextResponse.json(
        {
          message: 'reCAPTCHA failed',
          details: {
            _reason: result._reason,
            success: result.success,
            score: result.score,
            action: result.action,
            hostname: result.hostname,
            scoreThreshold,
            expectedAction,
            hostnameOk,
            scoreOk,
            actionOk,
            'error-codes': result['error-codes'],
          },
        },
        { status: 403 },
      )
    }

    // ---- Google Sheet call ----
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
