import React from 'react'
import FlipbookClient from '../FlipbookClient'
import BrochureForm from '@/components/CustomForm/BrochureForm'
import ZnikaLogo from '@/components/ZnikaLogo/ZnikaLogo'

export default function Page() {
  return (
    <div className="flex flex-col">
      {/* Top centered logo */}
      {/* <header className="w-full flex justify-center pt-6">
        <ZnikaLogo width={160} height={52} priority />
      </header> */}
      <header className="w-full flex items-center justify-center py-6 ">
        <ZnikaLogo width={160} height={52} priority />
      </header>
      {/* Flipbook */}
      <div className="mt-6">
        <FlipbookClient />
      </div>

      {/* CTA link to the form */}

      {/* Form (anchor target) */}
      <section id="brochure-form" className="mt-6 scroll-mt-24">
        <BrochureForm />
      </section>
    </div>
  )
}
