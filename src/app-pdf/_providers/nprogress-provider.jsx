// 'use client'
// import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
// import config from '@/tailwind.config.mjs';
// import { Suspense } from 'react';
// const primaryColor = config.theme.extend.colors.primary.DEFAULT; // Primary color of website

// export default function NprogressProviders({ children }) {
//     return (
//         <>
//             {children}
//             <Suspense>
//                 <ProgressBar
//                     height="4px"
//                     color={primaryColor}
//                     options={{ showSpinner: false }}
//                     shallowRouting
//                 />
//             </Suspense>
//         </>
//     );
// };
// /src/app-pdf/_providers/nprogress-provider.jsx
'use client'

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'
import { Suspense } from 'react'

export default function NprogressProviders({ children }) {
  return (
    <>
      {children}
      <Suspense>
        <ProgressBar
          height="4px"
          // Tailwind theme already exposes --primary; use it directly
          color="hsl(var(--primary))"
          options={{ showSpinner: false }}
          shallowRouting
        />
      </Suspense>
    </>
  )
}
