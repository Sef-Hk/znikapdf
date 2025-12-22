//DEBUG

// 'use client'

// import React, { useMemo, useState, useCallback } from 'react'
// import localFont from 'next/font/local'

// const relivaRegular = localFont({
//   src: '../../fonts/Reliva-Regular.otf',
//   variable: '--font-reliva',
//   weight: '400',
// })

// const relivaRough = localFont({
//   src: '../../fonts/Reliva-Rough.otf',
//   variable: '--font-reliva-rough',
// })

// function resolveMediaUrl(v) {
//   if (!v) return ''
//   if (typeof v === 'object') return v?.url || ''
//   if (typeof v === 'string') return v
//   return ''
// }

// function isLikelyMobile() {
//   if (typeof window === 'undefined') return false
//   const small = window.matchMedia?.('(max-width: 767px)')?.matches ?? false
//   const ua = navigator.userAgent || ''
//   const ios = /iPhone|iPad|iPod/i.test(ua)
//   const android = /Android/i.test(ua)
//   return small || ios || android
// }

// function getGrecaptcha() {
//   if (typeof window === 'undefined') return null
//   return window.grecaptcha || null
// }

// /**
//  * Get a v3 token.
//  * We pass siteKey as an argument (instead of process.env) so it works reliably in production builds.
//  */
// async function getRecaptchaToken(siteKey, action) {
//   const grecaptcha = getGrecaptcha()
//   if (!grecaptcha || !siteKey) return ''

//   await new Promise((resolve) => grecaptcha.ready(resolve))
//   return await grecaptcha.execute(siteKey, { action })
// }

// export default function BrochureForm(props) {
//   // ✅ Pass this from the server page:
//   // <BrochureForm siteKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ''} ... />
//   const siteKey = props.siteKey || ''

//   const desktopUrl = useMemo(() => resolveMediaUrl(props.submitPdfDesktop), [props.submitPdfDesktop])
//   const mobileUrl = useMemo(() => resolveMediaUrl(props.submitPdfMobile), [props.submitPdfMobile])

//   const PdfUrlSub = useMemo(() => {
//     const mobile = isLikelyMobile()
//     return (mobile ? mobileUrl : desktopUrl) || desktopUrl || mobileUrl || ''
//   }, [desktopUrl, mobileUrl])

//   const [form, setForm] = useState({
//     nom: '',
//     prenom: '',
//     email: '',
//     domaineProfessionnel: '',
//   })

//   const [status, setStatus] = useState({
//     loading: false,
//     ok: null, // null | true | false
//     msg: '',
//   })



//   const handleChange = useCallback((e) => {
//     const { name, value } = e.target
//     setForm((s) => ({ ...s, [name]: value }))
//   }, [])

//   const handleSubmit = useCallback(
//     async (e) => {
//       e.preventDefault()
//       setStatus({ loading: true, ok: null, msg: '' })

//       const grecaptcha = getGrecaptcha()
//       const grecaptchaPresent = !!grecaptcha
//       setDebug((d) => ({ ...d, grecaptchaPresent, lastError: '', lastApiBody: '', lastApiStatus: null }))

//       try {
//         // ---- Client sanity logs ----
//         if (!siteKey) {
//           setStatus({
//             loading: false,
//             ok: false,
//             msg:
//               "reCAPTCHA: site key manquant. Vérifie que tu passes `siteKey` depuis la page serveur.",
//           })
//           setDebug((d) => ({
//             ...d,
//             lastError: 'Missing siteKey prop',
//           }))
//           return
//         }

//         if (!grecaptchaPresent) {
//           setStatus({
//             loading: false,
//             ok: false,
//             msg: "reCAPTCHA indisponible (script non chargé). Rechargez la page.",
//           })
//           setDebug((d) => ({
//             ...d,
//             lastError: 'window.grecaptcha is missing',
//           }))
//           return
//         }

//         // 1) token
//         const recaptchaToken = await getRecaptchaToken(siteKey, 'brochure_submit')
//         setDebug((d) => ({ ...d, lastTokenLen: recaptchaToken?.length || 0 }))

//         if (!recaptchaToken) {
//           setStatus({
//             loading: false,
//             ok: false,
//             msg: "reCAPTCHA indisponible. Rechargez la page puis réessayez.",
//           })
//           setDebug((d) => ({
//             ...d,
//             lastError: 'Token is empty (execute returned empty string)',
//           }))
//           return
//         }

//         // 2) API call
//         const res = await fetch('/api/brochure', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ ...form, recaptchaToken }),
//         })

//         const text = await res.text().catch(() => '')
//         setDebug((d) => ({
//           ...d,
//           lastApiStatus: res.status,
//           lastApiBody: text,
//         }))

//         if (!res.ok) {
//           // try to extract json message if possible
//           let msg = `Request failed (${res.status})`
//           try {
//             const j = JSON.parse(text || '{}')
//             msg =
//               j?.details
//                 ? `reCAPTCHA failed: ${JSON.stringify(j.details)}`
//                 : j?.message || msg
//           } catch {
//             if (text) msg = text
//           }
//           throw new Error(msg)
//         }

//         // 3) success
//         setForm({ nom: '', prenom: '', email: '', domaineProfessionnel: '' })
//         setStatus({ loading: false, ok: true, msg: '' })
//       } catch (err) {
//         console.error('[BrochureForm] submit error:', err)
//         setDebug((d) => ({ ...d, lastError: err?.message || String(err) }))
//         setStatus({
//           loading: false,
//           ok: false,
//           msg: err?.message || 'Une erreur est survenue. Réessayez.',
//         })
//       }
//     },
//     [form, siteKey],
//   )

//   const labelFont = {
//     fontFamily: '"Instrument Sans", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto',
//   }

//   return (
//     <section
//       className="
//         w-full relative
//         py-8 sm:py-10 md:py-12
//         bg-[linear-gradient(to_top,_#F5F2EB_0%,_#F5F2EB_75%,_transparent_75%)]
//       "
//     >
//       {status.ok ? (
//         <div
//           className="
//             w-full mx-auto
//             max-w-[min(100%,40rem)] md:max-w-3xl
//             rounded-2xl border border-green-200
//             bg-white text-neutral-900 shadow-lg
//             px-4 py-5 sm:px-6 sm:py-6 md:px-8 md:py-8
//           "
//           role="status"
//           aria-live="polite"
//         >
//           <h2
//             className={`${relivaRegular.className} text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight mb-3 sm:mb-4 text-center text-green-700`}
//           >
//             Brochure disponible !
//           </h2>

//           <p className={`${relivaRegular.className} text-base sm:text-lg leading-relaxed text-center mb-4`}>
//             Merci pour votre intérêt. Vous pouvez télécharger la brochure directement ici :
//           </p>

//           <div className="text-center">
//             <a
//               href={PdfUrlSub}
//               target="_blank"
//               rel="noopener noreferrer"
//               download="Znika-Experience-Brochure-2026.pdf"
//               type="application/pdf"
//               className="
//                 inline-block px-6 py-3
//                 bg-[#FF6A08] text-white rounded-xl font-medium
//                 hover:opacity-90 transition
//               "
//               aria-label="Télécharger la brochure au format PDF"
//             >
//               📥 Télécharger la brochure
//             </a>

//             {!PdfUrlSub && (
//               <p className="mt-3 text-sm text-red-600">
//                 PDF non configuré. Veuillez ajouter les fichiers “Submitted PDF (Desktop)” et “Submitted PDF (Mobile)” dans le
//                 PDF Manager.
//               </p>
//             )}
//           </div>

          
//         </div>
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
//           <h2
//             className={`${relivaRegular.className} text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight mb-4 sm:mb-6 text-center`}
//           >
//             obtenir la <span className={relivaRough.className}>brochure</span> complète
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
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

//             <div className="flex flex-col">
//               <label
//                 htmlFor="domaineProfessionnel"
//                 className="mb-1.5 sm:mb-2 text-sm font-medium opacity-80"
//                 style={labelFont}
//               >
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

//           <div className="mt-4 sm:mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6 items-center">
//             <p className="text-sm sm:text-base opacity-90 leading-relaxed md:pr-4">
//               Cliquez sur « <span className="font-medium">Soumettre</span> » pour recevoir la brochure complète dans votre boîte
//               de réception.
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

//           {status.ok === false && status.msg && (
//             <div className="mt-3 sm:mt-4 text-sm text-red-600" role="status" aria-live="polite">
//               {status.msg}
//             </div>
//           )}

          
//         </form>
//       )}
//     </section>
//   )
// }

// 'use client'
// import React, { useMemo, useState } from 'react'
// import localFont from 'next/font/local'

// const relivaRegular = localFont({
//   src: '../../fonts/Reliva-Regular.otf',
//   variable: '--font-reliva',
//   weight: '400',
// })

// const relivaRough = localFont({
//   src: '../../fonts/Reliva-Rough.otf',
//   variable: '--font-reliva-rough',
// })

// function resolveMediaUrl(v) {
//   if (!v) return ''
//   // Payload upload relation at depth>=1 usually gives an object with .url
//   if (typeof v === 'object') return v?.url || ''
//   // sometimes it can already be a string
//   if (typeof v === 'string') return v
//   return ''
// }

// function isLikelyMobile() {
//   if (typeof window === 'undefined') return false
//   // width-based
//   const small = window.matchMedia?.('(max-width: 767px)')?.matches ?? false
//   // UA-based fallback (useful for iPhone/iPad)
//   const ua = navigator.userAgent || ''
//   const ios = /iPhone|iPad|iPod/i.test(ua)
//   const android = /Android/i.test(ua)
//   return small || ios || android
// }


// //RECAPTCHA 
// async function getRecaptchaToken(action) {

//   if (typeof window === 'undefined') return ''
//   const grecaptcha = window.grecaptcha
//   const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

//   if (!grecaptcha || !siteKey) return ''

//   // grecaptcha.ready is async
//   await new Promise((resolve) => grecaptcha.ready(resolve))

//   return await grecaptcha.execute(siteKey, { action })
// }


// export default function BrochureForm(props) {
//   const desktopUrl = useMemo(() => resolveMediaUrl(props.submitPdfDesktop), [props.submitPdfDesktop])
//   const mobileUrl = useMemo(() => resolveMediaUrl(props.submitPdfMobile), [props.submitPdfMobile])

//   // Choose at render time (after submit it matters most)
//   const PdfUrlSub = useMemo(() => {
//     const mobile = isLikelyMobile()
//     return (mobile ? mobileUrl : desktopUrl) || desktopUrl || mobileUrl || ''
//   }, [desktopUrl, mobileUrl])

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

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault()
//   //   setStatus({ loading: true, ok: null, msg: '' })
//   //   try {
//   //     const res = await fetch('/api/brochure', {
//   //       method: 'POST',
//   //       headers: { 'Content-Type': 'application/json' },
//   //       body: JSON.stringify(form),
//   //     })
//   //     if (!res.ok) throw new Error('send failed')

//   //     setForm({ nom: '', prenom: '', email: '', domaineProfessionnel: '' })
//   //     setStatus({
//   //       loading: false,
//   //       ok: true,
//   //       msg:
//   //         'Brochure envoyée avec succès !\n\nLa brochure a été envoyée à votre boîte de réception. Veuillez la consulter.',
//   //     })
//   //   } catch {
//   //     setStatus({ loading: false, ok: false, msg: 'Une erreur est survenue. Réessayez.' })
//   //   }
//   // }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setStatus({ loading: true, ok: null, msg: '' })
  
//     try {
//       const recaptchaToken = await getRecaptchaToken('brochure_submit')
  
//       const res = await fetch('/api/brochure', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ ...form, recaptchaToken }),
//       })
  
//       const data = await res.json().catch(() => ({}))
//       if (!res.ok) throw new Error(data?.message || 'send failed')
  
//       setForm({ nom: '', prenom: '', email: '', domaineProfessionnel: '' })
//       setStatus({
//         loading: false,
//         ok: true,
//         msg:
//           'Brochure envoyée avec succès !\n\nLa brochure a été envoyée à votre boîte de réception. Veuillez la consulter.',
//       })
//     } catch (err) {
//       setStatus({
//         loading: false,
//         ok: false,
//         msg: 'Une erreur est survenue. Réessayez.',
//       })
//     }
//   }
  

//   const headerFont = {
//     fontFamily: '"Reliva Sans", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto',
//   }
//   const labelFont = {
//     fontFamily: '"Instrument Sans", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto',
//   }

//   return (
//     <section
//       className="
//         w-full relative
//         py-8 sm:py-10 md:py-12
//         bg-[linear-gradient(to_top,_#F5F2EB_0%,_#F5F2EB_75%,_transparent_75%)]
//       "
//     >
//       {status.ok ? (
//         <div
//           className="
//             w-full mx-auto
//             max-w-[min(100%,40rem)] md:max-w-3xl
//             rounded-2xl border border-green-200
//             bg-white text-neutral-900 shadow-lg
//             px-4 py-5 sm:px-6 sm:py-6 md:px-8 md:py-8
//           "
//           role="status"
//           aria-live="polite"
//         >
//           <h2
//             className={`${relivaRegular.className} text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight mb-3 sm:mb-4 text-center text-green-700`}
//           >
//             Brochure disponible !
//           </h2>

//           <p className={`${relivaRegular.className} text-base sm:text-lg leading-relaxed text-center mb-4`}>
//             Merci pour votre intérêt. Vous pouvez télécharger la brochure directement ici :
//           </p>

//           <div className="text-center">
//             <a
//               href={PdfUrlSub}
//               target="_blank"
//               rel="noopener noreferrer"
//               download="Znika-Experience-Brochure-2026.pdf"
//               type="application/pdf"
//               className="
//                 inline-block px-6 py-3
//                 bg-[#FF6A08] text-white rounded-xl font-medium
//                 hover:opacity-90 transition
//               "
//               aria-label="Télécharger la brochure au format PDF"
//             >
//               📥 Télécharger la brochure
//             </a>

//             {!PdfUrlSub && (
//               <p className="mt-3 text-sm text-red-600">
//                 PDF non configuré. Veuillez ajouter les fichiers “Submitted PDF (Desktop)” et “Submitted PDF (Mobile)” dans le
//                 PDF Manager.
//               </p>
//             )}
//           </div>
//         </div>
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
//           <h2 className={`${relivaRegular.className} text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight mb-4 sm:mb-6 text-center`}>
//             obtenir la <span className={relivaRough.className}>brochure</span> complète
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
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

//             <div className="flex flex-col">
//               <label
//                 htmlFor="domaineProfessionnel"
//                 className="mb-1.5 sm:mb-2 text-sm font-medium opacity-80"
//                 style={labelFont}
//               >
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

//           <div className="mt-4 sm:mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6 items-center">
//             <p className="text-sm sm:text-base opacity-90 leading-relaxed md:pr-4">
//               Cliquez sur « <span className="font-medium">Soumettre</span> » pour recevoir la brochure complète dans votre boîte
//               de réception.
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


// 'use client'

// import React, { useMemo, useState, useCallback } from 'react'
// import localFont from 'next/font/local'

// const relivaRegular = localFont({
//   src: '../../fonts/Reliva-Regular.otf',
//   variable: '--font-reliva',
//   weight: '400',
// })

// const relivaRough = localFont({
//   src: '../../fonts/Reliva-Rough.otf',
//   variable: '--font-reliva-rough',
// })

// function resolveMediaUrl(v) {
//   if (!v) return ''
//   if (typeof v === 'object') return v?.url || ''
//   if (typeof v === 'string') return v
//   return ''
// }

// function isLikelyMobile() {
//   if (typeof window === 'undefined') return false
//   const small = window.matchMedia?.('(max-width: 767px)')?.matches ?? false
//   const ua = navigator.userAgent || ''
//   const ios = /iPhone|iPad|iPod/i.test(ua)
//   const android = /Android/i.test(ua)
//   return small || ios || android
// }

// function getGrecaptcha() {
//   if (typeof window === 'undefined') return null
//   return window.grecaptcha || null
// }

// async function getRecaptchaToken(action) {
//   const grecaptcha = getGrecaptcha()
//   const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

//   if (!grecaptcha || !siteKey) return ''

//   // wait until grecaptcha is ready
//   await new Promise((resolve) => grecaptcha.ready(resolve))

//   // v3 token
//   return await grecaptcha.execute(siteKey, { action })
// }

// export default function BrochureForm(props) {
//   const desktopUrl = useMemo(() => resolveMediaUrl(props.submitPdfDesktop), [props.submitPdfDesktop])
//   const mobileUrl = useMemo(() => resolveMediaUrl(props.submitPdfMobile), [props.submitPdfMobile])

//   const PdfUrlSub = useMemo(() => {
//     const mobile = isLikelyMobile()
//     return (mobile ? mobileUrl : desktopUrl) || desktopUrl || mobileUrl || ''
//   }, [desktopUrl, mobileUrl])

//   const [form, setForm] = useState({
//     nom: '',
//     prenom: '',
//     email: '',
//     domaineProfessionnel: '',
//   })

//   const [status, setStatus] = useState({
//     loading: false,
//     ok: null, // null | true | false
//     msg: '',
//   })

//   const handleChange = useCallback((e) => {
//     const { name, value } = e.target
//     setForm((s) => ({ ...s, [name]: value }))
//   }, [])

//   const handleSubmit = useCallback(
//     async (e) => {
//       e.preventDefault()
//       setStatus({ loading: true, ok: null, msg: '' })

//       try {
//         // 1) token
//         const recaptchaToken = await getRecaptchaToken('brochure_submit')

//         if (!recaptchaToken) {
//           setStatus({
//             loading: false,
//             ok: false,
//             msg: "reCAPTCHA indisponible. Rechargez la page puis réessayez.",
//           })
//           return
//         }

//         // 2) API
//         const res = await fetch('/api/brochure', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ ...form, recaptchaToken }),
//         })

//         // try json; fallback to text for better debugging
//         const contentType = res.headers.get('content-type') || ''
//         const payload =
//           contentType.includes('application/json')
//             ? await res.json().catch(() => ({}))
//             : await res.text().catch(() => '')

//         if (!res.ok) {
//           const serverMsg =
//             typeof payload === 'string'
//               ? payload
//               : payload?.details
//                 ? `reCAPTCHA failed: ${JSON.stringify(payload.details)}`
//                 : payload?.message || `Request failed (${res.status})`

//           throw new Error(serverMsg)
//         }

//         // 3) success
//         setForm({ nom: '', prenom: '', email: '', domaineProfessionnel: '' })
//         setStatus({
//           loading: false,
//           ok: true,
//           msg: '',
//         })
//       } catch (err) {
//         console.error('[BrochureForm] submit error:', err)
//         setStatus({
//           loading: false,
//           ok: false,
//           msg: err?.message || 'Une erreur est survenue. Réessayez.',
//         })
//       }
//     },
//     [form],
//   )

//   const labelFont = {
//     fontFamily: '"Instrument Sans", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto',
//   }

//   return (
//     <section
//       className="
//         w-full relative
//         py-8 sm:py-10 md:py-12
//         bg-[linear-gradient(to_top,_#F5F2EB_0%,_#F5F2EB_75%,_transparent_75%)]
//       "
//     >
//       {status.ok ? (
//         <div
//           className="
//             w-full mx-auto
//             max-w-[min(100%,40rem)] md:max-w-3xl
//             rounded-2xl border border-green-200
//             bg-white text-neutral-900 shadow-lg
//             px-4 py-5 sm:px-6 sm:py-6 md:px-8 md:py-8
//           "
//           role="status"
//           aria-live="polite"
//         >
//           <h2
//             className={`${relivaRegular.className} text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight mb-3 sm:mb-4 text-center text-green-700`}
//           >
//             Brochure disponible !
//           </h2>

//           <p className={`${relivaRegular.className} text-base sm:text-lg leading-relaxed text-center mb-4`}>
//             Merci pour votre intérêt. Vous pouvez télécharger la brochure directement ici :
//           </p>

//           <div className="text-center">
//             <a
//               href={PdfUrlSub}
//               target="_blank"
//               rel="noopener noreferrer"
//               download="Znika-Experience-Brochure-2026.pdf"
//               type="application/pdf"
//               className="
//                 inline-block px-6 py-3
//                 bg-[#FF6A08] text-white rounded-xl font-medium
//                 hover:opacity-90 transition
//               "
//               aria-label="Télécharger la brochure au format PDF"
//             >
//               📥 Télécharger la brochure
//             </a>

//             {!PdfUrlSub && (
//               <p className="mt-3 text-sm text-red-600">
//                 PDF non configuré. Veuillez ajouter les fichiers “Submitted PDF (Desktop)” et “Submitted PDF (Mobile)” dans le
//                 PDF Manager.
//               </p>
//             )}
//           </div>
//         </div>
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
//           <h2
//             className={`${relivaRegular.className} text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight mb-4 sm:mb-6 text-center`}
//           >
//             obtenir la <span className={relivaRough.className}>brochure</span> complète
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
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

//             <div className="flex flex-col">
//               <label
//                 htmlFor="domaineProfessionnel"
//                 className="mb-1.5 sm:mb-2 text-sm font-medium opacity-80"
//                 style={labelFont}
//               >
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

//           <div className="mt-4 sm:mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6 items-center">
//             <p className="text-sm sm:text-base opacity-90 leading-relaxed md:pr-4">
//               Cliquez sur « <span className="font-medium">Soumettre</span> » pour recevoir la brochure complète dans votre boîte
//               de réception.
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

//           {status.ok === false && status.msg && (
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

import React, { useMemo, useState, useCallback } from 'react'
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
  if (typeof v === 'object') return v?.url || ''
  if (typeof v === 'string') return v
  return ''
}

function isLikelyMobile() {
  if (typeof window === 'undefined') return false
  const small = window.matchMedia?.('(max-width: 767px)')?.matches ?? false
  const ua = navigator.userAgent || ''
  const ios = /iPhone|iPad|iPod/i.test(ua)
  const android = /Android/i.test(ua)
  return small || ios || android
}

function getGrecaptcha() {
  if (typeof window === 'undefined') return null
  return window.grecaptcha || null
}

/**
 * Get a v3 token.
 * We pass siteKey as an argument (instead of process.env) so it works reliably in production builds.
 */
async function getRecaptchaToken(siteKey, action) {
  const grecaptcha = getGrecaptcha()
  if (!grecaptcha || !siteKey) return ''

  await new Promise((resolve) => grecaptcha.ready(resolve))
  return await grecaptcha.execute(siteKey, { action })
}

export default function BrochureForm(props) {
  // ✅ Pass this from the server page:
  // <BrochureForm siteKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ''} ... />
  const siteKey = props.siteKey || ''

  const desktopUrl = useMemo(() => resolveMediaUrl(props.submitPdfDesktop), [props.submitPdfDesktop])
  const mobileUrl = useMemo(() => resolveMediaUrl(props.submitPdfMobile), [props.submitPdfMobile])

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

  const [status, setStatus] = useState({
    loading: false,
    ok: null, // null | true | false
    msg: '',
  })



  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setForm((s) => ({ ...s, [name]: value }))
  }, [])

  // const handleSubmit = useCallback(
  //   async (e) => {
  //     e.preventDefault()
  //     setStatus({ loading: true, ok: null, msg: '' })

  //     const grecaptcha = getGrecaptcha()
  //     const grecaptchaPresent = !!grecaptcha
  //     setDebug((d) => ({ ...d, grecaptchaPresent, lastError: '', lastApiBody: '', lastApiStatus: null }))

  //     try {
  //       // ---- Client sanity logs ----
  //       if (!siteKey) {
  //         setStatus({
  //           loading: false,
  //           ok: false,
  //           msg:
  //             "reCAPTCHA: site key manquant. Vérifie que tu passes `siteKey` depuis la page serveur.",
  //         })
  //         setDebug((d) => ({
  //           ...d,
  //           lastError: 'Missing siteKey prop',
  //         }))
  //         return
  //       }

  //       if (!grecaptchaPresent) {
  //         setStatus({
  //           loading: false,
  //           ok: false,
  //           msg: "reCAPTCHA indisponible (script non chargé). Rechargez la page.",
  //         })
  //         setDebug((d) => ({
  //           ...d,
  //           lastError: 'window.grecaptcha is missing',
  //         }))
  //         return
  //       }

  //       // 1) token
  //       const recaptchaToken = await getRecaptchaToken(siteKey, 'brochure_submit')
  //       setDebug((d) => ({ ...d, lastTokenLen: recaptchaToken?.length || 0 }))

  //       if (!recaptchaToken) {
  //         setStatus({
  //           loading: false,
  //           ok: false,
  //           msg: "reCAPTCHA indisponible. Rechargez la page puis réessayez.",
  //         })
  //         setDebug((d) => ({
  //           ...d,
  //           lastError: 'Token is empty (execute returned empty string)',
  //         }))
  //         return
  //       }

  //       // 2) API call
  //       const res = await fetch('/api/brochure', {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify({ ...form, recaptchaToken }),
  //       })

  //       const text = await res.text().catch(() => '')
  //       setDebug((d) => ({
  //         ...d,
  //         lastApiStatus: res.status,
  //         lastApiBody: text,
  //       }))

  //       if (!res.ok) {
  //         // try to extract json message if possible
  //         let msg = `Request failed (${res.status})`
  //         try {
  //           const j = JSON.parse(text || '{}')
  //           msg =
  //             j?.details
  //               ? `reCAPTCHA failed: ${JSON.stringify(j.details)}`
  //               : j?.message || msg
  //         } catch {
  //           if (text) msg = text
  //         }
  //         throw new Error(msg)
  //       }

  //       // 3) success
  //       setForm({ nom: '', prenom: '', email: '', domaineProfessionnel: '' })
  //       setStatus({ loading: false, ok: true, msg: '' })
  //     } catch (err) {
  //       console.error('[BrochureForm] submit error:', err)
  //       setDebug((d) => ({ ...d, lastError: err?.message || String(err) }))
  //       setStatus({
  //         loading: false,
  //         ok: false,
  //         msg: err?.message || 'Une erreur est survenue. Réessayez.',
  //       })
  //     }
  //   },
  //   [form, siteKey],
  // )

  const labelFont = {
    fontFamily: '"Instrument Sans", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto',
  }

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault()
      setStatus({ loading: true, ok: null, msg: '' })
  
      try {
        if (!siteKey) {
          setStatus({
            loading: false,
            ok: false,
            msg: "reCAPTCHA: site key manquant. Vérifie que tu passes `siteKey` depuis la page serveur.",
          })
          return
        }
  
        const grecaptchaPresent = !!getGrecaptcha()
        if (!grecaptchaPresent) {
          setStatus({
            loading: false,
            ok: false,
            msg: 'reCAPTCHA indisponible (script non chargé). Rechargez la page.',
          })
          return
        }
  
        const recaptchaToken = await getRecaptchaToken(siteKey, 'brochure_submit')
  
        if (!recaptchaToken) {
          setStatus({
            loading: false,
            ok: false,
            msg: 'reCAPTCHA indisponible. Rechargez la page puis réessayez.',
          })
          return
        }
  
        const res = await fetch('/api/brochure', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...form, recaptchaToken }),
        })
  
        const text = await res.text().catch(() => '')
  
        if (!res.ok) {
          let msg = `Erreur (${res.status})`
          try {
            const j = JSON.parse(text || '{}')
            msg = j?.message || msg
          } catch {
            if (text) msg = text
          }
          throw new Error(msg)
        }
  
        setForm({ nom: '', prenom: '', email: '', domaineProfessionnel: '' })
        setStatus({ loading: false, ok: true, msg: '' })
      } catch (err) {
        console.error('[BrochureForm] submit error:', err)
        setStatus({
          loading: false,
          ok: false,
          msg: err?.message || 'Une erreur est survenue. Réessayez.',
        })
      }
    },
    [form, siteKey],
  )
  

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
          <h2
            className={`${relivaRegular.className} text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight mb-4 sm:mb-6 text-center`}
          >
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

          {status.ok === false && status.msg && (
            <div className="mt-3 sm:mt-4 text-sm text-red-600" role="status" aria-live="polite">
              {status.msg}
            </div>
          )}

          
        </form>
      )}
    </section>
  )
}
