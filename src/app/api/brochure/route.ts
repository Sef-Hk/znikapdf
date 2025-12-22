// import { NextResponse } from 'next/server'

// export const runtime = 'nodejs'

// export async function POST(req: Request) {
//   try {
//     const { nom = '', prenom = '', domaineProfessionnel = '', email } = await req.json()

//     if (!email) {
//       return NextResponse.json({ message: 'Missing email' }, { status: 400 })
//     }

//     // --- Ajout des données dans Google Sheet via Apps Script ---
//     await fetch(
//       'https://script.google.com/macros/s/AKfycbzrbOzHS3pr_LNPJtsVVidgYwePO8edtQP0FXjRuSYRft2otmyrpQ9IzOxum6aaZ07s/exec',
//       {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ nom, prenom, domaineProfessionnel, email }),
//       },
//     )

//     return NextResponse.json(
//       {
//         message: 'Données enregistrées avec succès',
//       },
//       { status: 200 },
//     )
//   } catch (err: any) {
//     console.error('Brochure API error:', err.response?.body || err.message || err)
//     return NextResponse.json(
//       {
//         message: 'Erreur interne',
//         error: err.response?.body || err.message || String(err),
//       },
//       { status: 500 },
//     )
//   }
// }

import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  try {
    const { nom = '', prenom = '', domaineProfessionnel = '', email } = await req.json()

    if (!email) {
      return NextResponse.json({ message: 'Missing email' }, { status: 400 })
    }

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
