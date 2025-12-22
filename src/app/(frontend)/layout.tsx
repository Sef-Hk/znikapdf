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
