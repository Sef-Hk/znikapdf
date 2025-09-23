// 'use client'

// import dynamic from 'next/dynamic'

// // Import the .jsx component with SSR disabled (pdfjs/DOM-only)
// const FlipbookViewer = dynamic(
//   () => import('@/app-pdf/_components/ui/flipbook-viewer/flipbook-viewer'),
//   { ssr: false }
// )

// export default function FlipbookClient() {
//   return <FlipbookViewer pdfUrl="/demo.pdf" />
// }

'use client'

import dynamic from 'next/dynamic'

const FlipbookViewer = dynamic(
  () => import('@/app-pdf/_components/ui/flipbook-viewer/flipbook-viewer'),
  { ssr: false },
)

export default function FlipbookClient() {
  return (
    <div className="block">
      <FlipbookViewer
        pdfUrl="/znika_short_compressed.pdf"
        shareUrl={undefined} // or a real URL string if you have one
        className="" // or e.g. "w-full h-full"
        disableShare={false} // or true if you want to hide share
      />
    </div>
  )
}
