import React from 'react'
import FlipbookClient from '../FlipbookClient'
import BrochureForm from '@/components/CustomForm/BrochureForm'
import ZnikaLogo from '@/components/ZnikaLogo/ZnikaLogo'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const global = await payload.findGlobal({
    slug: 'pdfmanager',
    depth: 2,
  })

  console.log('global', { global })

  return (
    <div className="flex flex-col">
      {/* Top centered logo */}
      {/* <header className="w-full flex justify-center pt-6">
        <ZnikaLogo width={160} height={52} priority />
      </header> */}
      <header className="w-full flex items-center justify-center py-6 ">
        <ZnikaLogo width={160} height={52} priority imageUrl={global.logo} />
      </header>
      {/* Flipbook */}
      <div className="mt-6">
        <FlipbookClient pdfUrl={global.displayPDF} />
      </div>

      {/* CTA link to the form */}

      {/* Form (anchor target) */}
      <section id="brochure-form" className="mt-6 scroll-mt-24">
        <BrochureForm submitpdf={global.submittedPDF} />
      </section>
    </div>
  )
}
