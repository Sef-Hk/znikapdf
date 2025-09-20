// import PageTemplate, { generateMetadata } from './[slug]/page'

// export default PageTemplate

// export { generateMetadata }

// import React from 'react'
// import FlipbookClient from './FlipbookClient'
// import BrochureForm from '../../components/CustomForm/BrochureForm'
// function page() {
//   return (
//     <div>
//       <div className="block mt-10">
//         <FlipbookClient />
//       </div>
//       <div>
//         <BrochureForm />
//       </div>
//     </div>
//   )
// }
// export default page

// import React from 'react'
// import FlipbookClient from './FlipbookClient'
// import BrochureForm from '../../components/CustomForm/BrochureForm'
// import ZnikaLogo from '@/components/ZnikaLogo/ZnikaLogo'
// export default function Page() {
//   return (
//     <div className="flex flex-col">
//       {/* Top centered logo */}
//       <header className="w-full flex justify-center pt-6">
//         <ZnikaLogo width={160} height={52} priority />
//       </header>

//       {/* Flipbook */}
//       <div className="mt-6">
//         <FlipbookClient />
//       </div>

//       {/* Form */}
//       <div className="">
//         <BrochureForm />
//       </div>
//     </div>
//   )
// }

import React from 'react'
import FlipbookClient from './FlipbookClient'
import BrochureForm from '../../components/CustomForm/BrochureForm'
import ZnikaLogo from '@/components/ZnikaLogo/ZnikaLogo'

export default function Page() {
  return (
    <div className="flex flex-col">
      {/* Top centered logo */}
      {/* <header className="w-full flex justify-center pt-6">
        <ZnikaLogo width={160} height={52} priority />
      </header> */}
      <header className="w-full flex items-center justify-center py-6 bg-gradient-to-b from-[rgba(1,2,147,1)] to-[rgba(255,255,255,0)]">
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

//// FORM AND PDF ARE IN THE SAME LEVEL
// /src/app/(frontend)/page.tsx

// import React from 'react'
// import FlipbookClient from './FlipbookClient'
// import BrochureForm from '../../components/CustomForm/BrochureForm'
// import ZnikaLogo from '@/components/ZnikaLogo/ZnikaLogo'

// export default function Page() {
//   return (
//     <div className="min-h-svh bg-white">
//       {/* Top centered logo (sticks on scroll for a nice feel) */}
//       <header className="sticky top-0 z-10 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
//         <div className="max-w-7xl mx-auto flex justify-center py-4">
//           <ZnikaLogo width={160} height={52} priority />
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-6 md:py-10">
//         <div className="grid grid-cols-1 md:grid-cols-[1.35fr_1fr] gap-6 md:gap-10 items-start">
//           {/* Flipbook */}
//           <section className="md:min-h-0">
//             <div className="rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
//               {/* min-h-0 avoids flex/grid children forcing extra height */}
//               <div className="min-h-0">
//                 <FlipbookClient />
//               </div>
//             </div>
//           </section>

//           {/* Form (sticky so it's visible without scrolling past the flipbook) */}
//           <aside className="md:sticky md:top-24">
//             <BrochureForm />
//           </aside>
//         </div>
//       </main>
//     </div>
//   )
// }
