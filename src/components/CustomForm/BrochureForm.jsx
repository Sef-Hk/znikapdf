// // /src/components/CustomForm/BrochureForm.jsx
// 'use client'
// import React, { useState } from 'react'

// export default function BrochureForm() {
//   const [form, setForm] = useState({
//     nom: '',
//     prenom: '',
//     telephone: '',
//     email: '',
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
//       setStatus({ loading: false, ok: true, msg: 'Brochure envoyée à votre email.' })
//       setForm({ nom: '', prenom: '', telephone: '', email: '' })
//     } catch {
//       setStatus({ loading: false, ok: false, msg: 'Une erreur est survenue. Réessayez.' })
//     }
//   }

//   return (
//     <section
//     className="
//       w-full relative
//       py-8 sm:py-10 md:py-12
//       bg-[linear-gradient(to_top,_#F5F2EB_0%,_#F5F2EB_75%,_transparent_75%)]
//     "
//   >
//       {/* Background: bottom 75% colored, top 25% transparent (layout bg) */}
   

//       <form
//         onSubmit={handleSubmit}
//         className="
//           w-full mx-auto
//           max-w-[min(100%,40rem)] md:max-w-3xl
//           rounded-2xl border border-neutral-200
//           bg-white text-neutral-900 shadow-lg
//           px-4 py-5 sm:px-6 sm:py-6 md:px-8 md:py-8
//         "
//       >
//         {/* Header */}
//         <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight mb-4 sm:mb-6">
//           obtenir la brochure complète
//         </h2>

//         {/* 2x2 grid on md+, stacked on mobile */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
//           {/* Nom */}
//           <div className="flex flex-col">
//             <label htmlFor="nom" className="mb-1.5 sm:mb-2 text-sm font-medium opacity-80">
//               Nom
//             </label>
//             <input
//               id="nom"
//               name="nom"
//               autoComplete="family-name"
//               type="text"
//               value={form.nom}
//               onChange={handleChange}
//               required
//               placeholder="Votre nom"
//               className="h-12 w-full rounded-xl border border-neutral-300 bg-white px-4 text-base outline-none focus:ring-2 focus:ring-primary"
//             />
//           </div>

//           {/* Prénom */}
//           <div className="flex flex-col">
//             <label htmlFor="prenom" className="mb-1.5 sm:mb-2 text-sm font-medium opacity-80">
//               Prénom
//             </label>
//             <input
//               id="prenom"
//               name="prenom"
//               autoComplete="given-name"
//               type="text"
//               value={form.prenom}
//               onChange={handleChange}
//               required
//               placeholder="Votre prénom"
//               className="h-12 w-full rounded-xl border border-neutral-300 bg-white px-4 text-base outline-none focus:ring-2 focus:ring-primary"
//             />
//           </div>

//           {/* Téléphone */}
//           <div className="flex flex-col">
//             <label htmlFor="telephone" className="mb-1.5 sm:mb-2 text-sm font-medium opacity-80">
//               Numéro de téléphone
//             </label>
//             <input
//               id="telephone"
//               name="telephone"
//               type="tel"
//               inputMode="tel"
//               autoComplete="tel"
//               value={form.telephone}
//               onChange={handleChange}
//               required
//               placeholder="+213 ..."
//               className="h-12 w-full rounded-xl border border-neutral-300 bg-white px-4 text-base outline-none focus:ring-2 focus:ring-primary"
//             />
//           </div>

//           {/* Email */}
//           <div className="flex flex-col">
//             <label htmlFor="email" className="mb-1.5 sm:mb-2 text-sm font-medium opacity-80">
//               Adresse email
//             </label>
//             <input
//               id="email"
//               name="email"
//               type="email"
//               inputMode="email"
//               autoComplete="email"
//               value={form.email}
//               onChange={handleChange}
//               required
//               placeholder="vous@exemple.com"
//               className="h-12 w-full rounded-xl border border-neutral-300 bg-white px-4 text-base outline-none focus:ring-2 focus:ring-primary"
//             />
//           </div>
//         </div>

//         {/* Bottom: text left / button right on md+, stacked on mobile */}
//         <div className="mt-4 sm:mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6 items-center">
//           <p className="text-sm sm:text-base opacity-90 leading-relaxed md:pr-4">
//             Cliquez sur « <span className="font-medium">Soumettre</span> » pour recevoir la brochure complète
//             dans votre boîte de réception.
//           </p>

//           <button
//             type="submit"
//             disabled={status.loading}
//             className="
//               h-12 w-full md:w-full md:justify-self-end
//               rounded-xl
//               bg-primary text-primary-foreground
//               font-medium
//               hover:opacity-90
//               disabled:opacity-60 disabled:cursor-not-allowed
//               transition
//             "
//           >
//             {status.loading ? 'Envoi…' : 'Soumettre'}
//           </button>
//         </div>

//         {/* Status message */}
//         {status.msg && (
//           <div
//             className={`mt-3 sm:mt-4 text-sm ${status.ok ? 'text-green-600' : 'text-red-600'}`}
//             role="status"
//           >
//             {status.msg}
//           </div>
//         )}
//       </form>
//     </section>
//   )
// }





// /src/components/CustomForm/BrochureForm.jsx
// 'use client'
// import React, { useState } from 'react'

// export default function BrochureForm() {
//   const [form, setForm] = useState({
//     nom: '',
//     prenom: '',
//     telephone: '',
//     email: '',
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
//       setStatus({ loading: false, ok: true, msg: 'Brochure envoyée à votre email.' })
//       setForm({ nom: '', prenom: '', telephone: '', email: '' })
//     } catch {
//       setStatus({ loading: false, ok: false, msg: 'Une erreur est survenue. Réessayez.' })
//     }
//   }

//   // Inline font fallbacks—works even if fonts aren’t yet wired in globally
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
//       <form
//         onSubmit={handleSubmit}
//         className="
//           w-full mx-auto
//           max-w-[min(100%,40rem)] md:max-w-3xl
//           rounded-2xl border border-neutral-200
//           bg-white text-neutral-900 shadow-lg
//           px-4 py-5 sm:px-6 sm:py-6 md:px-8 md:py-8
//         "
//       >
//         {/* Header — centered + Reliva Sans */}
//         <h2
//           className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight mb-4 sm:mb-6 text-center"
//           style={headerFont}
//         >
//           obtenir la brochure complète
//         </h2>

//         {/* 2x2 grid on md+, stacked on mobile */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
//           {/* Nom */}
//           <div className="flex flex-col">
//             <label htmlFor="nom" className="mb-1.5 sm:mb-2 text-sm font-medium opacity-80" style={labelFont}>
//               Nom
//             </label>
//             <input
//               id="nom"
//               name="nom"
//               autoComplete="family-name"
//               type="text"
//               value={form.nom}
//               onChange={handleChange}
//               required
//               placeholder="Votre nom"
//               className="h-12 w-full rounded-xl border border-neutral-300 bg-white px-4 text-base outline-none focus:ring-2 focus:ring-[#FF6A08]"
//             />
//           </div>

//           {/* Prénom */}
//           <div className="flex flex-col">
//             <label htmlFor="prenom" className="mb-1.5 sm:mb-2 text-sm font-medium opacity-80" style={labelFont}>
//               Prénom
//             </label>
//             <input
//               id="prenom"
//               name="prenom"
//               autoComplete="given-name"
//               type="text"
//               value={form.prenom}
//               onChange={handleChange}
//               required
//               placeholder="Votre prénom"
//               className="h-12 w-full rounded-xl border border-neutral-300 bg-white px-4 text-base outline-none focus:ring-2 focus:ring-[#FF6A08]"
//             />
//           </div>

//           {/* Téléphone */}
//           <div className="flex flex-col">
//             <label htmlFor="telephone" className="mb-1.5 sm:mb-2 text-sm font-medium opacity-80" style={labelFont}>
//               Numéro de téléphone
//             </label>
//             <input
//               id="telephone"
//               name="telephone"
//               type="tel"
//               inputMode="tel"
//               autoComplete="tel"
//               value={form.telephone}
//               onChange={handleChange}
//               required
//               placeholder="+213 ..."
//               className="h-12 w-full rounded-xl border border-neutral-300 bg-white px-4 text-base outline-none focus:ring-2 focus:ring-[#FF6A08]"
//             />
//           </div>

//           {/* Email */}
//           <div className="flex flex-col">
//             <label htmlFor="email" className="mb-1.5 sm:mb-2 text-sm font-medium opacity-80" style={labelFont}>
//               Adresse email
//             </label>
//             <input
//               id="email"
//               name="email"
//               type="email"
//               inputMode="email"
//               autoComplete="email"
//               value={form.email}
//               onChange={handleChange}
//               required
//               placeholder="vous@exemple.com"
//               className="h-12 w-full rounded-xl border border-neutral-300 bg-white px-4 text-base outline-none focus:ring-2 focus:ring-[#FF6A08]"
//             />
//           </div>
//         </div>

//         {/* Bottom: text left / button right on md+, stacked on mobile */}
//         <div className="mt-4 sm:mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6 items-center">
//           <p className="text-sm sm:text-base opacity-90 leading-relaxed md:pr-4">
//             Cliquez sur « <span className="font-medium">Soumettre</span> » pour recevoir la brochure complète
//             dans votre boîte de réception.
//           </p>

//           {/* Button — #FF6A08 */}
//           <button
//             type="submit"
//             disabled={status.loading}
//             className="
//               h-12 w-full md:w-full md:justify-self-end
//               rounded-xl
//               bg-[#FF6A08] text-white
//               font-medium
//               hover:opacity-90
//               disabled:opacity-60 disabled:cursor-not-allowed
//               transition
//             "
//           >
//             {status.loading ? 'Envoi…' : 'Soumettre'}
//           </button>
//         </div>

//         {/* Status message */}
//         {status.msg && (
//           <div
//             className={`mt-3 sm:mt-4 text-sm ${status.ok ? 'text-green-600' : 'text-red-600'}`}
//             role="status"
//           >
//             {status.msg}
//           </div>
//         )}
//       </form>
//     </section>
//   )
// }


'use client'
import React, { useState } from 'react'
import localFont from "next/font/local";
// from components/CustomForm → up to src → fonts
const relivaRegular = localFont({
  src: "../../fonts/Reliva-Regular.otf",
  variable: "--font-reliva",
  weight: "400", // optional
});

const relivaRough = localFont({
  src: "../../fonts/Reliva-Rough.otf",
  variable: "--font-reliva-rough",
  // weight not required; many display fonts ignore it
});

export default function BrochureForm() {
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
      // Keep the fields reset but switch UI to success view
      setForm({ nom: '', prenom: '', email: '', domaineProfessionnel: '' })
      setStatus({
        loading: false,
        ok: true,
        msg: 'Brochure envoyée avec succès !\n\nLa brochure a été envoyée à votre boîte de réception. Veuillez la consulter.',
      })
    } catch {
      setStatus({ loading: false, ok: false, msg: 'Une erreur est survenue. Réessayez.' })
    }
  }

  const headerFont = { fontFamily: '"Reliva Sans", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto' }
  const labelFont  = { fontFamily: '"Instrument Sans", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto' }

  return (
    <section
      className="
        w-full relative
        py-8 sm:py-10 md:py-12
        bg-[linear-gradient(to_top,_#F5F2EB_0%,_#F5F2EB_75%,_transparent_75%)]
      "
    >
      {/* If success, show only the success card */}
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
  Brochure envoyée avec succès !
</h2>

<p
  className={`${relivaRegular.className} text-base sm:text-lg leading-relaxed text-center`}
>
  La brochure a été envoyée à votre boîte de réception. Veuillez la consulter.
</p>
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
          {/* Header — centered */}
          {/* <h2
            className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight mb-4 sm:mb-6 text-center"
            style={headerFont}
          >
            obtenir la brochure complète
          </h2> */}
<h2
  className={`${relivaRegular.className} text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight mb-4 sm:mb-6 text-center`}
>
  obtenir la <span className={relivaRough.className}>brochure</span> complète
</h2>

          {/* 2x2 grid on md+, stacked on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
            {/* Nom */}
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

            {/* Prénom */}
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

            {/* Email */}
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

            {/* Domaine Professionnel (last) */}
            <div className="flex flex-col">
              <label htmlFor="domaineProfessionnel" className="mb-1.5 sm:mb-2 text-sm font-medium opacity-80" style={labelFont}>
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

          {/* Bottom: text left / button right on md+, stacked on mobile */}
          <div className="mt-4 sm:mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6 items-center">
            <p className="text-sm sm:text-base opacity-90 leading-relaxed md:pr-4">
              Cliquez sur « <span className="font-medium">Soumettre</span> » pour recevoir la brochure complète
              dans votre boîte de réception.
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

          {/* Error only (success replaces UI) */}
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

