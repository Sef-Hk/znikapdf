'use client'

import React, { memo, useState, useEffect, useCallback, useRef } from 'react'
import useRefSize from '@/app-pdf/_hooks/use-ref-size'
import FlipbookLoader from './flipbook-loader'
import { cn } from '@/app-pdf/_lib/utils'
import { TransformComponent } from 'react-zoom-pan-pinch'

const Flipbook = memo(function Flipbook({ viewerStates, setViewerStates, flipbookRef, pdfDetails, screenfull }) {
  const { ref, width, height, refreshSize } = useRefSize()
  const [scale, setScale] = useState(1)
  const [wrapperCss, setWrapperCss] = useState({})
  const [viewRange, setViewRange] = useState([0, 4])

  // Track gesture direction so vertical scroll keeps scrolling the page (better UX)
  const touchStartRef = useRef(null)

  useEffect(() => {
    if (pdfDetails && width && height) {
      const calculatedScale = Math.min(width / (2 * pdfDetails.width), height / pdfDetails.height)
      setScale(calculatedScale)
      setWrapperCss({
        width: `${pdfDetails.width * calculatedScale * 2}px`,
        height: `${pdfDetails.height * calculatedScale}px`,
      })
    }
  }, [pdfDetails, width, height])

  const shrinkPageLoadingRange = useCallback(() => {
    if (!pdfDetails?.totalPages) return
    setViewRange([
      Math.max(viewerStates.currentPageIndex - 2, 0),
      Math.min(viewerStates.currentPageIndex + 2, pdfDetails.totalPages),
    ])
  }, [viewerStates.currentPageIndex, pdfDetails?.totalPages])

  const handleFullscreenChange = useCallback(() => {
    shrinkPageLoadingRange()
    refreshSize()
  }, [shrinkPageLoadingRange, refreshSize])

  useEffect(() => {
    if (!screenfull) return
    screenfull.on('change', handleFullscreenChange)
    return () => screenfull.off('change', handleFullscreenChange)
  }, [screenfull, handleFullscreenChange])

  const isFullscreen = !!screenfull?.isFullscreen

  return (
    <div
      ref={ref}
      className={cn(
        // touch-pan-y helps mobile keep vertical page scrolling natural
        'relative h-[15rem] xs:h-[20rem] lg:h-[28rem] xl:h-[30rem] w-full bg-transparent flex justify-center items-center overflow-hidden touch-pan-y',
        isFullscreen &&
          'h-[calc(100vh-5.163rem)] xs:h-[calc(100vh-5.163rem)] lg:h-[calc(100vh-5.163rem)] xl:h-[calc(100vh-4.66rem)]',
      )}
      // Desktop: if user scrolls vertically over the flipbook, scroll the page (not the viewer)
      onWheelCapture={(e) => {
        const dx = Math.abs(e.deltaX || 0)
        const dy = Math.abs(e.deltaY || 0)

        // Keep ctrl/cmd+wheel behaviour free (often used for browser zoom)
        if (e.ctrlKey || e.metaKey) return

        // Mostly vertical scroll -> forward to page scroll
        if (dy >= dx) {
          e.preventDefault()
          e.stopPropagation()
          window.scrollBy({ top: e.deltaY, left: 0 })
        }
      }}
      // Mobile: detect swipe direction; if vertical, don't let viewer hijack it
      onTouchStartCapture={(e) => {
        const t = e.touches && e.touches[0]
        if (!t) return
        touchStartRef.current = { x: t.clientX, y: t.clientY }
      }}
      onTouchMoveCapture={(e) => {
        const t = e.touches && e.touches[0]
        const s = touchStartRef.current
        if (!t || !s) return

        const dx = Math.abs(t.clientX - s.x)
        const dy = Math.abs(t.clientY - s.y)

        // Vertical swipe => let the page scroll (do not preventDefault)
        if (dy > dx) {
          e.stopPropagation()
        }
      }}
      onTouchEndCapture={() => {
        touchStartRef.current = null
      }}
    >
      <TransformComponent wrapperStyle={{ width: '100%', height: '100%' }} contentStyle={{ width: '100%', height: '100%' }}>
        <div className="overflow-hidden flex justify-center items-center h-full w-full">
          {pdfDetails && scale ? (
            <div style={wrapperCss}>
              <FlipbookLoader
                ref={flipbookRef}
                pdfDetails={pdfDetails}
                scale={scale}
                viewRange={viewRange}
                setViewRange={setViewRange}
                viewerStates={viewerStates}
                setViewerStates={setViewerStates}
              />
            </div>
          ) : null}
        </div>
      </TransformComponent>
    </div>
  )
})

Flipbook.displayName = 'Flipbook'
export default Flipbook



// without zoome :
// 'use client'
// import React, { memo, useState, useEffect, useCallback } from 'react'
// import useRefSize from '@/app-pdf/_hooks/use-ref-size'
// import FlipbookLoader from './flipbook-loader'
// import { cn } from '@/app-pdf/_lib/utils'
// import { TransformComponent } from 'react-zoom-pan-pinch'

// const Flipbook = memo(({ viewerStates, setViewerStates, flipbookRef, pdfDetails, screenfull }) => {
//   const { ref, width, height, refreshSize } = useRefSize()
//   const [scale, setScale] = useState(1)
//   const [wrapperCss, setWrapperCss] = useState({})
//   const [viewRange, setViewRange] = useState([0, 4])

//   useEffect(() => {
//     if (pdfDetails && width && height) {
//       const calculatedScale = Math.min(width / (2 * pdfDetails.width), height / pdfDetails.height)
//       setScale(calculatedScale)
//       setWrapperCss({
//         width: `${pdfDetails.width * calculatedScale * 2}px`,
//         height: `${pdfDetails.height * calculatedScale}px`,
//       })
//     }
//   }, [pdfDetails, width, height])

//   const shrinkPageLoadingRange = useCallback(() => {
//     if (!pdfDetails?.totalPages) return
//     setViewRange([
//       Math.max(viewerStates.currentPageIndex - 2, 0),
//       Math.min(viewerStates.currentPageIndex + 2, pdfDetails.totalPages),
//     ])
//   }, [viewerStates.currentPageIndex, pdfDetails?.totalPages])

//   const handleFullscreenChange = useCallback(() => {
//     shrinkPageLoadingRange()
//     refreshSize()
//   }, [shrinkPageLoadingRange, refreshSize])

//   useEffect(() => {
//     if (!screenfull) return
//     screenfull.on('change', handleFullscreenChange)
//     return () => screenfull.off('change', handleFullscreenChange)
//   }, [screenfull, handleFullscreenChange])

//   const isFullscreen = !!screenfull?.isFullscreen

//   return (
//     <div
//       ref={ref}
//       className={cn(
//         'relative h-[15rem] xs:h-[20rem] lg:h-[28rem] xl:h-[30rem] w-full bg-transparent flex justify-center items-center overflow-hidden',
//         isFullscreen &&
//           'h-[calc(100vh-5.163rem)] xs:h-[calc(100vh-5.163rem)] lg:h-[calc(100vh-5.163rem)] xl:h-[calc(100vh-4.66rem)]',
//       )}
//     >
//       <TransformComponent wrapperStyle={{ width: '100%', height: '100%' }} contentStyle={{ width: '100%', height: '100%' }}>
//         <div className="overflow-hidden flex justify-center items-center h-full w-full">
//           {pdfDetails && scale && (
//             <div style={wrapperCss}>
//               <FlipbookLoader
//                 ref={flipbookRef}
//                 pdfDetails={pdfDetails}
//                 scale={scale}
//                 viewRange={viewRange}
//                 setViewRange={setViewRange}
//                 viewerStates={viewerStates}
//                 setViewerStates={setViewerStates}
//               />
//             </div>
//           )}
//         </div>
//       </TransformComponent>
//     </div>
//   )
// })

// Flipbook.displayName = 'Flipbook'
// export default Flipbook