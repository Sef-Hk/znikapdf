// import React from 'react'
// import FlipbookClient from '../FlipbookClient'
// import BrochureForm from '@/components/CustomForm/BrochureForm'
// import ZnikaLogo from '@/components/ZnikaLogo/ZnikaLogo'
// import configPromise from '@payload-config'
// import { getPayload } from 'payload'

// // ---- added (1) force dynamic so Next does NOT build this page statically ----
// export const dynamic = 'force-dynamic'
// export const fetchCache = 'force-no-store'

// // ---- added (2) metadata ----
// export const metadata = {
//   title: 'Guide | Znika experience',
// }

// export default async function Page() {
//   const payload = await getPayload({ config: configPromise })

//   const global = await payload.findGlobal({
//     slug: 'pdfmanager',
//     depth: 2,
//   })

//   // console.log('global', { global })

//   return (
//     <div className="flex flex-col">
//       <header className="w-full flex items-center justify-center py-6 ">
//         <ZnikaLogo width={160} height={52} priority imageUrl={global.logo} />
//       </header>

//       <div className="mt-6">
//         <FlipbookClient pdfUrl={global.displayPDF} />
//       </div>

//       <section id="brochure-form" className="mt-6 scroll-mt-24">
//         <BrochureForm submitpdf={global.submittedPDF} />
//       </section>
//     </div>
//   )
// }

import React from 'react'
import FlipbookClient from '../FlipbookClient'
import BrochureForm from '@/components/CustomForm/BrochureForm'
import ZnikaLogo from '@/components/ZnikaLogo/ZnikaLogo'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export const metadata = {
  title: 'Guide | Znika experience',
}

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const global = await payload.findGlobal({
    slug: 'pdfmanager',
    depth: 2,
  })

  return (
    <div className="flex flex-col">
      <header className="w-full flex items-center justify-center py-6">
        <ZnikaLogo width={160} height={52} priority imageUrl={global.logo} />
      </header>

      <div className="mt-6">
        <FlipbookClient pdfUrl={global.displayPDF} />
      </div>

      <section id="brochure-form" className="mt-6 scroll-mt-24">
        <BrochureForm
          siteKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ''}
          submitPdfDesktop={global.submittedPDFDesktop}
          submitPdfMobile={global.submittedPDFMobile}
        />
      </section>
    </div>
  )
}
