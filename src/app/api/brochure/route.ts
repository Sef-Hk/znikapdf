// /src/app/api/brochure/route.ts
import { NextResponse } from 'next/server'
import {
  TransactionalEmailsApi,
  SendSmtpEmail,
  TransactionalEmailsApiApiKeys,
} from '@getbrevo/brevo'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  try {
    const { nom = '', prenom = '', telephone = '', email } = await req.json()

    if (!email) {
      return NextResponse.json({ message: 'Missing email' }, { status: 400 })
    }

    // Initialize Brevo API client
    const api = new TransactionalEmailsApi()
    api.setApiKey(TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY as string)

    // Build the email
    const sendSmtpEmail = new SendSmtpEmail()
    sendSmtpEmail.to = [{ email }]
    sendSmtpEmail.sender = {
      email: process.env.BREVO_SENDER_EMAIL ?? 'no-reply@yourdomain.com',
      name: 'Znika',
    }
    sendSmtpEmail.subject = 'Votre brochure complète'
    // sendSmtpEmail.htmlContent = `
    //   <p>Bonjour ${prenom} ${nom},</p>
    //   <p>Merci pour votre intérêt. Vous pouvez télécharger la brochure ici :</p>
    //   <p><a href="https://yourdomain.com/brochure.pdf" target="_blank">Télécharger la brochure</a></p>
    //   <p><strong>Téléphone :</strong> ${telephone}</p>
    // `

    sendSmtpEmail.htmlContent = `
  <p>Bonjour ${prenom} ${nom},</p>

  <p>Merci de votre intérêt pour <strong>Znika Experience ✨</strong>.</p>
  <p>Comme promis, nous avons le plaisir de vous partager la version complète de notre e-brochure.</p>

  <p>
    À travers ces pages, vous découvrirez nos destinations phares, du Nord au Sud,
    avec la culture et les richesses naturelles propres à chacune de nos régions.
    Vous y retrouverez également nos expériences immersives, pensées pour vous plonger au cœur de chaque univers.
    Et laissez-vous surprendre par une escale singulière au cœur de la Casbah,
    où notre concept store vous réserve une expérience inattendue.
  </p>

  <p>
    <a href="https://www.swisstransfer.com/d/d18f1d98-56c4-4279-90dd-47a43400501d" 
       target="_blank" 
       style="display:inline-block;padding:10px 20px;background:#000;color:#fff;text-decoration:none;border-radius:5px;">
       📥 Télécharger le catalogue complet
    </a>
  </p>

  <p>
    Nous avons hâte de vous accompagner dans la découverte de l’Algérie autrement,
    entre culture, art et rencontres humaines.
  </p>

  <p>À bientôt,<br/>L’équipe Znika Experience.</p>
`
    // Send the email
    const resp = await api.sendTransacEmail(sendSmtpEmail)

    return NextResponse.json(
      {
        message: 'Email envoyé avec succès',
        messageId: (resp as any)?.messageId ?? null,
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

// /src/app/api/brochure/route.ts
// import { NextResponse } from 'next/server'
// import {
//   TransactionalEmailsApi,
//   SendSmtpEmail,
//   TransactionalEmailsApiApiKeys,
// } from '@getbrevo/brevo'

// export const runtime = 'nodejs'

// export async function POST(req: Request) {
//   try {
//     const { nom = '', prenom = '', telephone = '', email } = await req.json()

//     if (!email) {
//       return NextResponse.json({ message: 'Missing email' }, { status: 400 })
//     }

//     // Initialiser l’API Brevo
//     const api = new TransactionalEmailsApi()
//     api.setApiKey(TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY as string)

//     // Construire l’email
//     const sendSmtpEmail = new SendSmtpEmail()
//     sendSmtpEmail.to = [{ email }]
//     sendSmtpEmail.sender = {
//       email: process.env.BREVO_SENDER_EMAIL ?? 'no-reply@yourdomain.com',
//       name: 'Znika Experience',
//     }
//     sendSmtpEmail.subject = 'Votre brochure complète – Znika Experience'
//     sendSmtpEmail.htmlContent = `
//       <p>Bonjour ${prenom} ${nom},</p>

//       <p>Merci de votre intérêt pour <strong>Znika Experience ✨</strong>.</p>

//       <p>Comme promis, nous avons le plaisir de vous partager la version complète de notre e-brochure.</p>

//       <p>
//         À travers ces pages, vous découvrirez nos destinations phares, du Nord au Sud,
//         avec la culture et les richesses naturelles propres à chacune de nos régions.
//         Vous y retrouverez également nos expériences immersives, pensées pour vous plonger au cœur de chaque univers.
//       </p>

//       <p>
//         Et laissez-vous surprendre par une escale singulière au cœur de la Casbah,
//         où notre concept store vous réserve une expérience inattendue.
//       </p>

//       <p>
//         👉 <a href="https://www.swisstransfer.com/d/d18f1d98-56c4-4279-90dd-47a43400501d" target="_blank">
//         Téléchargez le catalogue complet</a>
//       </p>

//       <p>
//         Nous avons hâte de vous accompagner dans la découverte de l’Algérie autrement,
//         entre culture, art et rencontres humaines.
//       </p>

//       <p>À bientôt,<br/>L’équipe Znika Experience</p>

//       <hr/>
//       <p><strong>Informations saisies :</strong><br/>
//       Téléphone : ${telephone || 'Non renseigné'}</p>
//     `

//     // Envoyer l’email
//     const resp = await api.sendTransacEmail(sendSmtpEmail)

//     return NextResponse.json(
//       {
//         message: 'Email envoyé avec succès',
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
