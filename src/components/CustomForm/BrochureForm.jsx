// 'use client'
// import React, { useState } from 'react'
// import localFont from "next/font/local";
// // from components/CustomForm → up to src → fonts
// const relivaRegular = localFont({
//   src: "../../fonts/Reliva-Regular.otf",
//   variable: "--font-reliva",
//   weight: "400", // optional
// });

// const relivaRough = localFont({
//   src: "../../fonts/Reliva-Rough.otf",
//   variable: "--font-reliva-rough",
//   // weight not required; many display fonts ignore it
// });

// export default function BrochureForm(props) {
//   // console.log({props});
//   const PdfUrlSub = typeof props.submitpdf  === 'object' &&  props.submitpdf.url
//   const [form, setForm] = useState({
//     nom: '',
//     prenom: '',
//     email: '',
//     domaineProfessionnel: '',
//   })
//   const [status, setStatus] = useState({ loading: false, ok: null, msg: '' })

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setForm((s) => ({ ...s, [name]: value }))
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setStatus({ loading: true, ok: null, msg: '' })
//     try {
//       const res = await fetch('/api/brochure', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(form),
//       })
//       if (!res.ok) throw new Error('send failed')
//       // Keep the fields reset but switch UI to success view
//       setForm({ nom: '', prenom: '', email: '', domaineProfessionnel: '' })
//       setStatus({
//         loading: false,
//         ok: true,
//         msg: 'Brochure envoyée avec succès !\n\nLa brochure a été envoyée à votre boîte de réception. Veuillez la consulter.',
//       })
//     } catch {
//       setStatus({ loading: false, ok: false, msg: 'Une erreur est survenue. Réessayez.' })
//     }
//   }

//   const headerFont = { fontFamily: '"Reliva Sans", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto' }
//   const labelFont  = { fontFamily: '"Instrument Sans", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto' }

//   return (
//     <section
//       className="
//         w-full relative
//         py-8 sm:py-10 md:py-12
//         bg-[linear-gradient(to_top,_#F5F2EB_0%,_#F5F2EB_75%,_transparent_75%)]
//       "
//     >
//       {/* If success, show only the success card */}
//       {status.ok ? (

// <div
//   className="
//     w-full mx-auto
//     max-w-[min(100%,40rem)] md:max-w-3xl
//     rounded-2xl border border-green-200
//     bg-white text-neutral-900 shadow-lg
//     px-4 py-5 sm:px-6 sm:py-6 md:px-8 md:py-8
//   "
//   role="status"
//   aria-live="polite"
// >
//   <h2
//     className={`${relivaRegular.className} text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight mb-3 sm:mb-4 text-center text-green-700`}
//   >
//     Brochure disponible !
//   </h2>

//   <p
//     className={`${relivaRegular.className} text-base sm:text-lg leading-relaxed text-center mb-4`}
//   >
//     Merci pour votre intérêt. Vous pouvez télécharger la brochure directement ici :
//   </p>

//   <div className="text-center">
//     <a
//       href={PdfUrlSub} 
//       target="_blank"
//       rel="noopener noreferrer"
//       download="Znika-Experience-Brochure-2026.pdf"         
//       type="application/pdf"
//       className="
//         inline-block px-6 py-3
//         bg-[#FF6A08] text-white rounded-xl font-medium
//         hover:opacity-90 transition
//       "
//       aria-label="Télécharger la brochure au format PDF"
//     >
//       📥 Télécharger la brochure
//     </a>
//   </div>
// </div>

//       ) : (
//         <form
//           onSubmit={handleSubmit}
//           className="
//             w-full mx-auto
//             max-w-[min(100%,40rem)] md:max-w-3xl
//             rounded-2xl border border-neutral-200
//             bg-white text-neutral-900 shadow-lg
//             px-4 py-5 sm:px-6 sm:py-6 md:px-8 md:py-8
//           "
//         >
//           {/* Header — centered */}
//           {/* <h2
//             className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight mb-4 sm:mb-6 text-center"
//             style={headerFont}
//           >
//             obtenir la brochure complète
//           </h2> */}
// <h2
//   className={`${relivaRegular.className} text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight mb-4 sm:mb-6 text-center`}
// >
//   obtenir la <span className={relivaRough.className}>brochure</span> complète
// </h2>

//           {/* 2x2 grid on md+, stacked on mobile */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
//             {/* Nom */}
//             <div className="flex flex-col">
//               <label htmlFor="nom" className="mb-1.5 sm:mb-2 text-sm font-medium opacity-80" style={labelFont}>
//                 Nom
//               </label>
//               <input
//                 id="nom"
//                 name="nom"
//                 autoComplete="family-name"
//                 type="text"
//                 value={form.nom}
//                 onChange={handleChange}
//                 required
//                 placeholder="Votre nom"
//                 className="h-12 w-full rounded-xl border border-neutral-300 bg-white px-4 text-base outline-none focus:ring-2 focus:ring-[#FF6A08]"
//               />
//             </div>

//             {/* Prénom */}
//             <div className="flex flex-col">
//               <label htmlFor="prenom" className="mb-1.5 sm:mb-2 text-sm font-medium opacity-80" style={labelFont}>
//                 Prénom
//               </label>
//               <input
//                 id="prenom"
//                 name="prenom"
//                 autoComplete="given-name"
//                 type="text"
//                 value={form.prenom}
//                 onChange={handleChange}
//                 required
//                 placeholder="Votre prénom"
//                 className="h-12 w-full rounded-xl border border-neutral-300 bg-white px-4 text-base outline-none focus:ring-2 focus:ring-[#FF6A08]"
//               />
//             </div>

//             {/* Email */}
//             <div className="flex flex-col">
//               <label htmlFor="email" className="mb-1.5 sm:mb-2 text-sm font-medium opacity-80" style={labelFont}>
//                 Adresse email
//               </label>
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 inputMode="email"
//                 autoComplete="email"
//                 value={form.email}
//                 onChange={handleChange}
//                 required
//                 placeholder="vous@exemple.com"
//                 className="h-12 w-full rounded-xl border border-neutral-300 bg-white px-4 text-base outline-none focus:ring-2 focus:ring-[#FF6A08]"
//               />
//             </div>

//             {/* Domaine Professionnel (last) */}
//             <div className="flex flex-col">
//               <label htmlFor="domaineProfessionnel" className="mb-1.5 sm:mb-2 text-sm font-medium opacity-80" style={labelFont}>
//                 Domaine Professionnel
//               </label>
//               <input
//                 id="domaineProfessionnel"
//                 name="domaineProfessionnel"
//                 type="text"
//                 value={form.domaineProfessionnel}
//                 onChange={handleChange}
//                 required
//                 placeholder="Ex. Agence de voyage, Événementiel, Architecte…"
//                 className="h-12 w-full rounded-xl border border-neutral-300 bg-white px-4 text-base outline-none focus:ring-2 focus:ring-[#FF6A08]"
//               />
//             </div>
//           </div>

//           {/* Bottom: text left / button right on md+, stacked on mobile */}
//           <div className="mt-4 sm:mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6 items-center">
//             <p className="text-sm sm:text-base opacity-90 leading-relaxed md:pr-4">
//               Cliquez sur « <span className="font-medium">Soumettre</span> » pour recevoir la brochure complète
//               dans votre boîte de réception.
//             </p>

//             <button
//               type="submit"
//               disabled={status.loading}
//               className="
//                 h-12 w-full md:w-full md:justify-self-end
//                 rounded-xl
//                 bg-[#FF6A08] text-white
//                 font-medium
//                 hover:opacity-90
//                 disabled:opacity-60 disabled:cursor-not-allowed
//                 transition
//               "
//             >
//               {status.loading ? 'Envoi…' : 'Soumettre'}
//             </button>
//           </div>

//           {/* Error only (success replaces UI) */}
//           {!status.ok && status.msg && (
//             <div className="mt-3 sm:mt-4 text-sm text-red-600" role="status" aria-live="polite">
//               {status.msg}
//             </div>
//           )}
//         </form>
//       )}
//     </section>
//   )
// }



'use client'
import React, { useMemo, useState } from 'react'
import localFont from 'next/font/local'

const relivaRegular = localFont({
  src: '../../fonts/Reliva-Regular.otf',
  variable: '--font-reliva',
  weight: '400',
})

const relivaRough = localFont({
  src: '../../fonts/Reliva-Rough.otf',
  variable: '--font-reliva-rough',
})

function resolveMediaUrl(v) {
  if (!v) return ''
  // Payload upload relation at depth>=1 usually gives an object with .url
  if (typeof v === 'object') return v?.url || ''
  // sometimes it can already be a string
  if (typeof v === 'string') return v
  return ''
}

function isLikelyMobile() {
  if (typeof window === 'undefined') return false
  // width-based
  const small = window.matchMedia?.('(max-width: 767px)')?.matches ?? false
  // UA-based fallback (useful for iPhone/iPad)
  const ua = navigator.userAgent || ''
  const ios = /iPhone|iPad|iPod/i.test(ua)
  const android = /Android/i.test(ua)
  return small || ios || android
}

export default function BrochureForm(props) {
  const desktopUrl = useMemo(() => resolveMediaUrl(props.submitPdfDesktop), [props.submitPdfDesktop])
  const mobileUrl = useMemo(() => resolveMediaUrl(props.submitPdfMobile), [props.submitPdfMobile])

  // Choose at render time (after submit it matters most)
  const PdfUrlSub = useMemo(() => {
    const mobile = isLikelyMobile()
    return (mobile ? mobileUrl : desktopUrl) || desktopUrl || mobileUrl || ''
  }, [desktopUrl, mobileUrl])

  const [form, setForm] = useState({
    nom: '',
    prenom: '',
    email: '',
    domaineProfessionnel: '',
  })
  const [status, setStatus] = useState({ loading: false, ok: null, msg: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((s) => ({ ...s, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus({ loading: true, ok: null, msg: '' })
    try {
      const res = await fetch('/api/brochure', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('send failed')

      setForm({ nom: '', prenom: '', email: '', domaineProfessionnel: '' })
      setStatus({
        loading: false,
        ok: true,
        msg:
          'Brochure envoyée avec succès !\n\nLa brochure a été envoyée à votre boîte de réception. Veuillez la consulter.',
      })
    } catch {
      setStatus({ loading: false, ok: false, msg: 'Une erreur est survenue. Réessayez.' })
    }
  }

  const headerFont = {
    fontFamily: '"Reliva Sans", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto',
  }
  const labelFont = {
    fontFamily: '"Instrument Sans", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto',
  }

  return (
    <section
      className="
        w-full relative
        py-8 sm:py-10 md:py-12
        bg-[linear-gradient(to_top,_#F5F2EB_0%,_#F5F2EB_75%,_transparent_75%)]
      "
    >
      {status.ok ? (
        <div
          className="
            w-full mx-auto
            max-w-[min(100%,40rem)] md:max-w-3xl
            rounded-2xl border border-green-200
            bg-white text-neutral-900 shadow-lg
            px-4 py-5 sm:px-6 sm:py-6 md:px-8 md:py-8
          "
          role="status"
          aria-live="polite"
        >
          <h2
            className={`${relivaRegular.className} text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight mb-3 sm:mb-4 text-center text-green-700`}
          >
            Brochure disponible !
          </h2>

          <p className={`${relivaRegular.className} text-base sm:text-lg leading-relaxed text-center mb-4`}>
            Merci pour votre intérêt. Vous pouvez télécharger la brochure directement ici :
          </p>

          <div className="text-center">
            <a
              href={PdfUrlSub}
              target="_blank"
              rel="noopener noreferrer"
              download="Znika-Experience-Brochure-2026.pdf"
              type="application/pdf"
              className="
                inline-block px-6 py-3
                bg-[#FF6A08] text-white rounded-xl font-medium
                hover:opacity-90 transition
              "
              aria-label="Télécharger la brochure au format PDF"
            >
              📥 Télécharger la brochure
            </a>

            {!PdfUrlSub && (
              <p className="mt-3 text-sm text-red-600">
                PDF non configuré. Veuillez ajouter les fichiers “Submitted PDF (Desktop)” et “Submitted PDF (Mobile)” dans le
                PDF Manager.
              </p>
            )}
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="
            w-full mx-auto
            max-w-[min(100%,40rem)] md:max-w-3xl
            rounded-2xl border border-neutral-200
            bg-white text-neutral-900 shadow-lg
            px-4 py-5 sm:px-6 sm:py-6 md:px-8 md:py-8
          "
        >
          <h2 className={`${relivaRegular.className} text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight mb-4 sm:mb-6 text-center`}>
            obtenir la <span className={relivaRough.className}>brochure</span> complète
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
            <div className="flex flex-col">
              <label htmlFor="nom" className="mb-1.5 sm:mb-2 text-sm font-medium opacity-80" style={labelFont}>
                Nom
              </label>
              <input
                id="nom"
                name="nom"
                autoComplete="family-name"
                type="text"
                value={form.nom}
                onChange={handleChange}
                required
                placeholder="Votre nom"
                className="h-12 w-full rounded-xl border border-neutral-300 bg-white px-4 text-base outline-none focus:ring-2 focus:ring-[#FF6A08]"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="prenom" className="mb-1.5 sm:mb-2 text-sm font-medium opacity-80" style={labelFont}>
                Prénom
              </label>
              <input
                id="prenom"
                name="prenom"
                autoComplete="given-name"
                type="text"
                value={form.prenom}
                onChange={handleChange}
                required
                placeholder="Votre prénom"
                className="h-12 w-full rounded-xl border border-neutral-300 bg-white px-4 text-base outline-none focus:ring-2 focus:ring-[#FF6A08]"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="email" className="mb-1.5 sm:mb-2 text-sm font-medium opacity-80" style={labelFont}>
                Adresse email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="vous@exemple.com"
                className="h-12 w-full rounded-xl border border-neutral-300 bg-white px-4 text-base outline-none focus:ring-2 focus:ring-[#FF6A08]"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="domaineProfessionnel"
                className="mb-1.5 sm:mb-2 text-sm font-medium opacity-80"
                style={labelFont}
              >
                Domaine Professionnel
              </label>
              <input
                id="domaineProfessionnel"
                name="domaineProfessionnel"
                type="text"
                value={form.domaineProfessionnel}
                onChange={handleChange}
                required
                placeholder="Ex. Agence de voyage, Événementiel, Architecte…"
                className="h-12 w-full rounded-xl border border-neutral-300 bg-white px-4 text-base outline-none focus:ring-2 focus:ring-[#FF6A08]"
              />
            </div>
          </div>

          <div className="mt-4 sm:mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6 items-center">
            <p className="text-sm sm:text-base opacity-90 leading-relaxed md:pr-4">
              Cliquez sur « <span className="font-medium">Soumettre</span> » pour recevoir la brochure complète dans votre boîte
              de réception.
            </p>

            <button
              type="submit"
              disabled={status.loading}
              className="
                h-12 w-full md:w-full md:justify-self-end
                rounded-xl
                bg-[#FF6A08] text-white
                font-medium
                hover:opacity-90
                disabled:opacity-60 disabled:cursor-not-allowed
                transition
              "
            >
              {status.loading ? 'Envoi…' : 'Soumettre'}
            </button>
          </div>

          {!status.ok && status.msg && (
            <div className="mt-3 sm:mt-4 text-sm text-red-600" role="status" aria-live="polite">
              {status.msg}
            </div>
          )}
        </form>
      )}
    </section>
  )
}
