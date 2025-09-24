//With Brevo
// import { NextResponse } from 'next/server'
// import {
//   TransactionalEmailsApi,
//   SendSmtpEmail,
//   TransactionalEmailsApiApiKeys,
// } from '@getbrevo/brevo'

// export const runtime = 'nodejs'

// export async function POST(req: Request) {
//   try {
//     const { nom = '', prenom = '', domaineProfessionnel = '', email } = await req.json()

//     if (!email) {
//       return NextResponse.json({ message: 'Missing email' }, { status: 400 })
//     }

//     // --- Envoi email via Brevo ---
//     const api = new TransactionalEmailsApi()
//     api.setApiKey(TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY as string)

//     const sendSmtpEmail = new SendSmtpEmail()
//     sendSmtpEmail.to = [{ email }]
//     sendSmtpEmail.sender = {
//       email: process.env.BREVO_SENDER_EMAIL ?? 'no-reply@yourdomain.com',
//       name: 'Znika',
//     }
//     sendSmtpEmail.subject = 'Votre brochure complète'
//     sendSmtpEmail.htmlContent = `
//       <p>Bonjour ${prenom} ${nom},</p>
//       <p>Merci de votre intérêt pour <strong>Znika Experience ✨</strong>.</p>
//       <p>Comme promis, nous avons le plaisir de vous partager la version complète de notre e-brochure.</p>
//       <p>
//         <a href="https://www.swisstransfer.com/d/d18f1d98-56c4-4279-90dd-47a43400501d" target="_blank">
//           📥 Télécharger le catalogue complet
//         </a>
//       </p>
//       <p>À bientôt,<br/>L’équipe Znika Experience.</p>
//     `

//     const resp = await api.sendTransacEmail(sendSmtpEmail)

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
//         message: 'Email envoyé et données enregistrées avec succès',
//         messageId: (resp as any)?.messageId ?? null,
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

    // --- Ajout des données dans Google Sheet via Apps Script ---
    await fetch(
      'https://script.google.com/macros/s/AKfycbzrbOzHS3pr_LNPJtsVVidgYwePO8edtQP0FXjRuSYRft2otmyrpQ9IzOxum6aaZ07s/exec',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nom, prenom, domaineProfessionnel, email }),
      },
    )

    return NextResponse.json(
      {
        message: 'Données enregistrées avec succès',
      },
      { status: 200 },
    )
  } catch (err: any) {
    console.error('Brochure API error:', err.response?.body || err.message || err)
    return NextResponse.json(
      {
        message: 'Erreur interne',
        error: err.response?.body || err.message || String(err),
      },
      { status: 500 },
    )
  }
}
