// //without redis :
// import { NextResponse } from 'next/server'

// export const runtime = 'nodejs'

// type RecaptchaVerifyResponse = {
//   success: boolean
//   score?: number
//   action?: string
//   hostname?: string
//   challenge_ts?: string
//   'error-codes'?: string[]
//   _reason?: 'missing_secret' | 'missing_token'
// }

// const DEBUG = process.env.RECAPTCHA_DEBUG === 'true'

// async function verifyRecaptcha(token: string, remoteip?: string): Promise<RecaptchaVerifyResponse> {
//   const secret = process.env.RECAPTCHA_SECRET_KEY

//   if (!secret) return { success: false, _reason: 'missing_secret' }
//   if (!token) return { success: false, _reason: 'missing_token' }

//   const body = new URLSearchParams()
//   body.set('secret', secret)
//   body.set('response', token)
//   if (remoteip) body.set('remoteip', remoteip)

//   const r = await fetch('https://www.google.com/recaptcha/api/siteverify', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//     body,
//     cache: 'no-store',
//   })

//   // Google returns JSON, but we still parse defensively
//   const text = await r.text().catch(() => '')
//   try {
//     return JSON.parse(text)
//   } catch {
//     return { success: false, 'error-codes': ['invalid-json-from-google'] }
//   }
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

//     const xff = req.headers.get('x-forwarded-for') || ''
//     const remoteip = xff.split(',')[0]?.trim() || undefined

//     const result = await verifyRecaptcha(recaptchaToken, remoteip)

//     // ---- Checks ----
//     const expectedAction = 'brochure_submit'
//     const scoreThreshold = 0.5

//     const hostnameOk =
//       typeof result.hostname === 'string'
//         ? result.hostname === 'brochure.znikaexperience.com' ||
//           result.hostname.endsWith('.znikaexperience.com') ||
//           result.hostname === 'znikaexperience.com'
//         : true

//     // const scoreOk = typeof result.score === 'number' ? result.score >= scoreThreshold : true
//     const scoreOk = typeof result.score === 'number' && result.score >= scoreThreshold

//     // const actionOk = typeof result.action === 'string' ? result.action === expectedAction : true
//     const actionOk = typeof result.action === 'string' && result.action === expectedAction

//     if (DEBUG) {
//       console.log('[recaptcha]', {
//         success: result?.success,
//         hostname: result?.hostname,
//         action: result?.action,
//         score: result?.score,
//         codes: result?.['error-codes'],
//         scoreThreshold,
//         expectedAction,
//         hostnameOk,
//         scoreOk,
//         actionOk,
//         reason: result?._reason,
//       })
//     }

//     if (!result.success || !scoreOk || !actionOk || !hostnameOk) {
//       // Return minimal info to client (don’t leak too much)
//       return NextResponse.json(
//         {
//           message: 'reCAPTCHA failed',
//           // you can keep codes (useful) but remove if you want ultra-minimal
//           code: result?.['error-codes']?.[0] || 'recaptcha_failed',
//         },
//         { status: 403 },
//       )
//     }

//     // ---- Google Sheet call ----
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
//       if (DEBUG)
//         console.error('[brochure] google script failed', {
//           status: r.status,
//           text: text?.slice(0, 300),
//         })
//       return NextResponse.json({ message: 'Google Script failed' }, { status: 502 })
//     }

//     return NextResponse.json({ message: 'OK' }, { status: 200 })
//   } catch (err: any) {
//     if (DEBUG) console.error('[brochure] api error', err)
//     return NextResponse.json({ message: 'Erreur interne' }, { status: 500 })
//   }
// }

//Using Redis :
import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { getRedis } from '@/lib/redis'

export const runtime = 'nodejs'

type RecaptchaVerifyResponse = {
  success: boolean
  score?: number
  action?: string
  hostname?: string
  challenge_ts?: string
  'error-codes'?: string[]
  _reason?: 'missing_secret' | 'missing_token' | 'verify_failed'
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
    return { success: false, _reason: 'verify_failed', 'error-codes': ['invalid-json-from-google'] }
  }
}

function getClientIp(req: Request) {
  // Railway / Proxies
  const xff = req.headers.get('x-forwarded-for') || ''
  const ipFromXff = xff.split(',')[0]?.trim()
  const xrip = req.headers.get('x-real-ip')?.trim()
  return ipFromXff || xrip || ''
}

function hashEmail(email: string) {
  const norm = email.trim().toLowerCase()
  return crypto.createHash('sha256').update(norm).digest('hex').slice(0, 16)
}

// Atomic INCR + EXPIRE
const INCR_EXPIRE_LUA = `
local current = redis.call("INCR", KEYS[1])
if current == 1 then
  redis.call("EXPIRE", KEYS[1], ARGV[1])
end
return current
`

async function hitLimit(key: string, limit: number, windowSec: number) {
  const redis = getRedis()
  if (!redis) {
    // 👉 Si pas de Redis configuré: fail-open (ne bloque pas le site)
    return { ok: true, remaining: limit }
  }

  // Ensure connection (lazyConnect)
  try {
    if (redis.status === 'wait') await redis.connect()
  } catch {
    // Redis down -> fail-open
    return { ok: true, remaining: limit }
  }

  try {
    const current = Number(await redis.eval(INCR_EXPIRE_LUA, 1, key, String(windowSec)))
    const remaining = Math.max(0, limit - current)
    return { ok: current <= limit, remaining }
  } catch {
    // Redis down -> fail-open
    return { ok: true, remaining: limit }
  }
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

    const ip = getClientIp(req)
    const windowSec = 10 * 60 // 10 minutes

    // ---- Rate limit: IP 8 / 10 min ----
    if (ip) {
      const ipKey = `rl:brochure:ip:${ip}`
      const ipRes = await hitLimit(ipKey, 8, windowSec)
      if (!ipRes.ok) {
        return NextResponse.json(
          { message: 'Too many requests (ip). Please try again later.' },
          { status: 429 },
        )
      }
    }

    // ---- Rate limit: Email 3 / 10 min ----
    const emailKey = `rl:brochure:email:${hashEmail(email)}`
    const emRes = await hitLimit(emailKey, 3, windowSec)
    if (!emRes.ok) {
      return NextResponse.json(
        { message: 'Too many requests (email). Please try again later.' },
        { status: 429 },
      )
    }

    // ---- reCAPTCHA v3 verify ----
    const remoteip = ip || undefined
    const result = await verifyRecaptcha(recaptchaToken, remoteip)

    const expectedAction = 'brochure_submit'
    const scoreThreshold = 0.5

    const hostnameOk =
      typeof result.hostname === 'string'
        ? result.hostname === 'brochure.znikaexperience.com' ||
          result.hostname.endsWith('.znikaexperience.com') ||
          result.hostname === 'znikaexperience.com'
        : true

    const scoreOk = typeof result.score === 'number' && result.score >= scoreThreshold
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
      'https://script.google.com/macros/s/AKfycbzPQ3B2wtC4wscSnmPl-Vdzuo-Q_DftQZSyuj4j2IABZCZCDEaXsuTUaM77eHJfw58a7g/exec',
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

// //debug
// import { NextResponse } from 'next/server'

// export const runtime = 'nodejs'

// type RecaptchaVerifyResponse = {
//   success: boolean
//   score?: number
//   action?: string
//   hostname?: string
//   challenge_ts?: string
//   'error-codes'?: string[]
//   _reason?: 'missing_secret' | 'missing_token'
// }

// async function verifyRecaptcha(token: string, remoteip?: string): Promise<RecaptchaVerifyResponse> {
//   const secret = process.env.RECAPTCHA_SECRET_KEY

//   if (!secret) return { success: false, _reason: 'missing_secret' }
//   if (!token) return { success: false, _reason: 'missing_token' }

//   const body = new URLSearchParams()
//   body.set('secret', secret)
//   body.set('response', token)
//   if (remoteip) body.set('remoteip', remoteip)

//   const r = await fetch('https://www.google.com/recaptcha/api/siteverify', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//     body,
//     cache: 'no-store',
//   })

//   const text = await r.text().catch(() => '')
//   try {
//     return JSON.parse(text)
//   } catch {
//     return { success: false, 'error-codes': ['invalid-json-from-google'] }
//   }
// }

// function safeTail(v?: string) {
//   if (!v) return undefined
//   return v.slice(-4)
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

//     // Optional: you can forward client IP if your platform provides it.
//     // Railway often sets x-forwarded-for
//     const xff = req.headers.get('x-forwarded-for') || ''
//     const remoteip = xff.split(',')[0]?.trim() || undefined

//     const result = await verifyRecaptcha(recaptchaToken, remoteip)

//     // ✅ SAFE debug (Railway logs)
//     console.log('[recaptcha-env]', {
//       siteKeyPresent: !!process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
//       secretPresent: !!process.env.RECAPTCHA_SECRET_KEY,
//       siteKeyTail: safeTail(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY),
//       secretTail: safeTail(process.env.RECAPTCHA_SECRET_KEY),
//     })

//     console.log('[recaptcha]', {
//       _reason: result._reason,
//       success: result?.success,
//       hostname: result?.hostname,
//       action: result?.action,
//       score: result?.score,
//       codes: result?.['error-codes'],
//     })

//     // ---- Checks ----
//     const expectedAction = 'brochure_submit'
//     const scoreThreshold = 0.3

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

//     // ---- Google Sheet call ----
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
