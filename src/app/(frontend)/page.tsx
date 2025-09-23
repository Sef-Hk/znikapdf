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

//Worked version;

// import React from 'react'
// import FlipbookClient from './FlipbookClient'
// import BrochureForm from '../../components/CustomForm/BrochureForm'
// import ZnikaLogo from '@/components/ZnikaLogo/ZnikaLogo'

// export default function Page() {
//   return (
//     <div className="flex flex-col">
//       {/* Top centered logo */}
//       {/* <header className="w-full flex justify-center pt-6">
//         <ZnikaLogo width={160} height={52} priority />
//       </header> */}
//       <header className="w-full flex items-center justify-center py-6 ">
//         <ZnikaLogo width={160} height={52} priority />
//       </header>
//       {/* Flipbook */}
//       <div className="mt-6">
//         <FlipbookClient />
//       </div>

//       {/* CTA link to the form */}

//       {/* Form (anchor target) */}
//       <section id="brochure-form" className="mt-6 scroll-mt-24">
//         <BrochureForm />
//       </section>
//     </div>
//   )
// }

// /src/app/(frontend)/page.tsx
import { redirect } from 'next/navigation'

export default function HomePage() {
  // Redirect immediately to /guide
  redirect('/guide')
}
