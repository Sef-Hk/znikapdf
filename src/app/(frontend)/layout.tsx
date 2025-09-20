// import type { Metadata } from 'next'

// import { cn } from '@/utilities/ui'
// import { GeistMono } from 'geist/font/mono'
// import { GeistSans } from 'geist/font/sans'
// import React from 'react'

// import { AdminBar } from '@/components/AdminBar'
// import { Footer } from '@/Footer/Component'
// import { Header } from '@/Header/Component'
// import { Providers } from '@/providers'
// import { InitTheme } from '@/providers/Theme/InitTheme'
// import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
// import { draftMode } from 'next/headers'

// import './globals.css'
// import { getServerSideURL } from '@/utilities/getURL'

// export default async function RootLayout({ children }: { children: React.ReactNode }) {
//   const { isEnabled } = await draftMode()

//   return (
//     <html className={cn(GeistSans.variable, GeistMono.variable)} lang="en" suppressHydrationWarning>
//       <head>
//         <InitTheme />
//         <link href="/favicon.ico" rel="icon" sizes="32x32" />
//         <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
//       </head>
//       <body>
//         <Providers>
//           <AdminBar
//             adminBarProps={{
//               preview: isEnabled,
//             }}
//           />

//           <Header />
//           {children}
//           <Footer />
//         </Providers>
//       </body>
//     </html>
//   )
// }

// export const metadata: Metadata = {
//   metadataBase: new URL(getServerSideURL()),
//   openGraph: mergeOpenGraph(),
//   twitter: {
//     card: 'summary_large_image',
//     creator: '@payloadcms',
//   },
// }

// /src/app/(frontend)/layout.tsx
// import '@/app-pdf/_styles/globals.css'
// import { Inter as FontSans } from 'next/font/google'
// import { cn } from '@/app-pdf/_lib/utils'

// import NprogressProviders from '@/app-pdf/_providers/nprogress-provider'
// import ThemeProvider from '@/app-pdf/_providers/theme-provider'
// import { Toaster } from '@/app-pdf/_components/ui/toaster'
// import React from 'react'

// export const fontSans = FontSans({
//   weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
//   subsets: ['latin'],
//   variable: '--font-sans',
// })

// // Polyfill Promise.withResolvers (react-pdf issue)
// if (typeof Promise.withResolvers === 'undefined') {
//   if (typeof window !== 'undefined') {
//     // @ts-expect-error polyfill
//     window.Promise.withResolvers = function () {
//       let resolve: (v?: unknown) => void, reject: (r?: unknown) => void
//       const promise = new Promise((res, rej) => {
//         resolve = res
//         reject = rej
//       })
//       return { promise, resolve: resolve!, reject: reject! }
//     }
//   } else {
//     ;(globalThis as any).Promise.withResolvers = function () {
//       let resolve: (v?: unknown) => void, reject: (r?: unknown) => void
//       const promise = new Promise((res, rej) => {
//         resolve = res
//         reject = rej
//       })
//       return { promise, resolve: resolve!, reject: reject! }
//     }
//   }
// }

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
//         <NprogressProviders>
//           <ThemeProvider attribute="class" defaultTheme="dark">
//             {children}
//             <Toaster />
//           </ThemeProvider>
//         </NprogressProviders>
//       </body>
//     </html>
//   )
// }

// /src/app/(frontend)/layout.tsx
import '@/app-pdf/_styles/globals.css'
import { Inter as FontSans } from 'next/font/google'
import { cn } from '@/app-pdf/_lib/utils'

import NprogressProviders from '@/app-pdf/_providers/nprogress-provider'
import ThemeProvider from '@/app-pdf/_providers/theme-provider'
import { Toaster } from '@/app-pdf/_components/ui/toaster'
import React from 'react'

export const fontSans = FontSans({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-sans',
})

// Polyfill Promise.withResolvers (react-pdf issue)
if (typeof Promise.withResolvers === 'undefined') {
  if (typeof window !== 'undefined') {
    // @ts-expect-error polyfill
    window.Promise.withResolvers = function () {
      let resolve: (v?: unknown) => void, reject: (r?: unknown) => void
      const promise = new Promise((res, rej) => {
        resolve = res
        reject = rej
      })
      return { promise, resolve: resolve!, reject: reject! }
    }
  } else {
    ;(globalThis as any).Promise.withResolvers = function () {
      let resolve: (v?: unknown) => void, reject: (r?: unknown) => void
      const promise = new Promise((res, rej) => {
        resolve = res
        reject = rej
      })
      return { promise, resolve: resolve!, reject: reject! }
    }
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="min-h-svh bg-[url('/znikaBg.jpg')] bg-cover bg-center bg-no-repeat"
    >
      <body className={cn('min-h-svh font-sans antialiased bg-transparent', fontSans.variable)}>
        <NprogressProviders>
          <ThemeProvider attribute="class" defaultTheme="dark">
            {children}
            <Toaster />
          </ThemeProvider>
        </NprogressProviders>
      </body>
    </html>
  )
}
