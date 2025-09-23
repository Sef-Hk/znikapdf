// import React, { forwardRef, memo, useCallback, useState } from 'react'
// import HTMLFlipBook from 'react-pageflip'
// import PdfPage from './pdf-page'
// import { useDebounce } from '@/app-pdf/_hooks/use-debounce';
// import { cn } from '@/app-pdf/_lib/utils';
// import useScreenSize from '@/app-pdf/_hooks/use-screensize';
// const MemoizedPdfPage = memo(PdfPage)

// const FlipbookLoader = forwardRef(({ pdfDetails, scale, viewerStates, setViewerStates, viewRange, setViewRange }, ref) => {
//     const { width } = useScreenSize();
//     const debouncedZoom = useDebounce(viewerStates.zoomScale, 500);
//     // Check if page is in View range or in view window >>>>>>>>
//     const isPageInViewRange = (index) => { return index >= viewRange[0] && index <= viewRange[1] };
//     const isPageInView = (index) => { return viewerStates.currentPageIndex === index || viewerStates.currentPageIndex + 1 === index };

//     // Update pageViewRange on page flip >>>>>>>>
//     const onFlip = useCallback((e) => {
//         let newViewRange;
//         if (e.data > viewerStates.currentPageIndex) {
//             newViewRange = [viewRange[0], Math.max(Math.min(e.data + 4, pdfDetails.totalPages), viewRange[1])]
//         } else if (e.data < viewerStates.currentPageIndex) {
//             newViewRange = [Math.min(Math.max(e.data - 4, 0), viewRange[0]), viewRange[1]]
//         } else {
//             newViewRange = viewRange
//         }
//         setViewRange(newViewRange);
//         setViewerStates({
//             ...viewerStates,
//             currentPageIndex: e.data,
//         });
//     }, [viewerStates, viewRange, setViewRange, setViewerStates, pdfDetails.totalPages]);

//     return (
//         <div className="relative">
//             <HTMLFlipBook
//                 ref={ref}
//                 key={scale}
//                 startPage={viewerStates.currentPageIndex}
//                 width={pdfDetails.width * scale * 5}
//                 height={pdfDetails.height * scale * 5}
//                 size="stretch"
//                 drawShadow={false}
//                 flippingTime={700}
//                 usePortrait={false}
//                 showCover={true}
//                 showPageCorners={false}
//                 onFlip={onFlip}
//                 disableFlipByClick={width < 768 ? true : false}
//                 className={cn(viewerStates.zoomScale > 1 && 'pointer-events-none md:pointer-events-none')}
//             >
//                 {
//                     Array.from({ length: pdfDetails.totalPages }, (_, index) => (
//                         <MemoizedPdfPage
//                             key={index}
//                             height={pdfDetails.height * scale}
//                             zoomScale={debouncedZoom}
//                             page={index + 1}
//                             isPageInViewRange={isPageInViewRange(index)}
//                             isPageInView={isPageInView(index)}
//                         />
//                     ))
//                 }
//             </HTMLFlipBook >
//             {/* <p className="text-background absolute z-50 top-0 -left-10">{viewRange[0] + '-' + viewRange[1]}</p> */}
//         </div>
//     )
// })

// FlipbookLoader.displayName = 'FlipbookLoader'

// export default FlipbookLoader






import React, { forwardRef, memo, useCallback } from 'react'
import HTMLFlipBook from 'react-pageflip'
import PdfPage from './pdf-page'
import { useDebounce } from '@/app-pdf/_hooks/use-debounce'
import { cn } from '@/app-pdf/_lib/utils'
import useScreenSize from '@/app-pdf/_hooks/use-screensize'

const MemoizedPdfPage = memo(PdfPage)

const FlipbookLoader = forwardRef(
  (
    { pdfDetails, scale, viewerStates, setViewerStates, viewRange, setViewRange },
    ref
  ) => {
    const { width } = useScreenSize()
    const debouncedZoom = useDebounce(viewerStates.zoomScale, 500)

    const isPageInViewRange = (index) =>
      index >= viewRange[0] && index <= viewRange[1]
    const isPageInView = (index) =>
      viewerStates.currentPageIndex === index ||
      viewerStates.currentPageIndex + 1 === index

    const onFlip = useCallback(
      (e) => {
        let newViewRange
        if (e.data > viewerStates.currentPageIndex) {
          newViewRange = [
            viewRange[0],
            Math.max(
              Math.min(e.data + 4, pdfDetails.totalPages),
              viewRange[1]
            ),
          ]
        } else if (e.data < viewerStates.currentPageIndex) {
          newViewRange = [
            Math.min(Math.max(e.data - 4, 0), viewRange[0]),
            viewRange[1],
          ]
        } else {
          newViewRange = viewRange
        }
        setViewRange(newViewRange)
        setViewerStates({
          ...viewerStates,
          currentPageIndex: e.data,
        })
      },
      [viewerStates, viewRange, setViewRange, setViewerStates, pdfDetails.totalPages]
    )

    // 👉 check orientation (added in pdfDetails earlier)
    if (pdfDetails.isLandscape) {
      // --- Single-page render for landscape PDFs ---
      return (
        <div className="relative flex flex-col items-center">
          {Array.from({ length: pdfDetails.totalPages }, (_, index) => (
            <MemoizedPdfPage
              key={index}
              height={pdfDetails.height * scale}
              zoomScale={debouncedZoom}
              page={index + 1}
              isPageInViewRange={true} // always render, since single page
              isPageInView={viewerStates.currentPageIndex === index}
            />
          ))}
        </div>
      )
    }

    // --- Default: Two-page flipbook for portrait PDFs ---
    return (
      <div className="relative">
        <HTMLFlipBook
          ref={ref}
          key={scale}
          startPage={viewerStates.currentPageIndex}
          width={pdfDetails.width * scale * 5}
          height={pdfDetails.height * scale * 5}
          size="stretch"
          drawShadow={false}
          flippingTime={700}
          usePortrait={false}
          showCover={true}
          showPageCorners={false}
          onFlip={onFlip}
          disableFlipByClick={width < 768 ? true : false}
          className={cn(
            viewerStates.zoomScale > 1 &&
              'pointer-events-none md:pointer-events-none'
          )}
        >
          {Array.from({ length: pdfDetails.totalPages }, (_, index) => (
            <MemoizedPdfPage
              key={index}
              height={pdfDetails.height * scale}
              zoomScale={debouncedZoom}
              page={index + 1}
              isPageInViewRange={isPageInViewRange(index)}
              isPageInView={isPageInView(index)}
            />
          ))}
        </HTMLFlipBook>
      </div>
    )
  }
)

FlipbookLoader.displayName = 'FlipbookLoader'

export default FlipbookLoader






// flip wihtou book :
// /app-pdf/_components/ui/flipbook-viewer/flipbook/flipbook-loader.jsx
// 'use client';

// import React, {
//   forwardRef,
//   memo,
//   useCallback,
//   useImperativeHandle,
// } from 'react';
// import PdfPage from './pdf-page';
// import { useDebounce } from '@/app-pdf/_hooks/use-debounce';
// import useScreenSize from '@/app-pdf/_hooks/use-screensize';
// import { cn } from '@/app-pdf/_lib/utils';

// const MemoizedPdfPage = memo(PdfPage);

// /**
//  * Single-page pager:
//  * - Always renders ONE page (currentPageIndex) centered inside a fixed page box
//  * - Exposes a `pageFlip()` shim so your Toolbar can keep calling .flipNext(), .flipPrev(), .turnToPage(i)
//  */
// const FlipbookLoader = forwardRef(
//   (
//     { pdfDetails, scale, viewerStates, setViewerStates },
//     ref
//   ) => {
//     const { width: screenW } = useScreenSize();
//     const debouncedZoom = useDebounce(viewerStates.zoomScale, 300);

//     const total = pdfDetails.totalPages;
//     const PAGE_W = pdfDetails.pageBox.width * scale;   // single page box (scaled)
//     const PAGE_H = pdfDetails.pageBox.height * scale;

//     const goTo = useCallback(
//       (idx) => {
//         const next = Math.max(0, Math.min(idx, total - 1));
//         if (next !== viewerStates.currentPageIndex) {
//           setViewerStates(s => ({ ...s, currentPageIndex: next }));
//         }
//       },
//       [setViewerStates, total, viewerStates.currentPageIndex]
//     );

//     const flipNext = useCallback(() => goTo(viewerStates.currentPageIndex + 1), [goTo, viewerStates.currentPageIndex]);
//     const flipPrev = useCallback(() => goTo(viewerStates.currentPageIndex - 1), [goTo, viewerStates.currentPageIndex]);

//     // Expose a minimal API compatible with your Toolbar calls
//     useImperativeHandle(ref, () => ({
//       pageFlip() {
//         return {
//           flipNext,
//           flipPrev,
//           turnToPage: goTo,
//           getCurrentPageIndex: () => viewerStates.currentPageIndex,
//         };
//       },
//     }), [flipNext, flipPrev, goTo, viewerStates.currentPageIndex]);

//     return (
//       <div
//         className={cn(
//           'relative mx-auto flex items-center justify-center',
//           // disable interactions while zoomed if you want (kept from your original):
//           viewerStates.zoomScale > 1 && 'pointer-events-none md:pointer-events-none'
//         )}
//         style={{
//           width: `${PAGE_W}px`,
//           height: `${PAGE_H}px`,
//         }}
//       >
//         {/* Exactly ONE page, centered in the page box */}
//         <div className="w-full h-full flex items-center justify-center overflow-hidden">
//           <MemoizedPdfPage
//             key={viewerStates.currentPageIndex}
//             page={viewerStates.currentPageIndex + 1}
//             height={pdfDetails.pageBox.height * scale} // lock by height, width auto
//             zoomScale={debouncedZoom}
//             isPageInViewRange // irrelevant now; always true
//             isPageInView
//           />
//         </div>

//         {/* Optional: arrow-click areas (kept invisible, Toolbar can still control via ref) */}
//         {screenW >= 768 && (
//           <>
//             <button
//               aria-label="Previous page"
//               onClick={flipPrev}
//               className="absolute left-0 top-0 h-full w-1/4 outline-none"
//               style={{ background: 'transparent' }}
//             />
//             <button
//               aria-label="Next page"
//               onClick={flipNext}
//               className="absolute right-0 top-0 h-full w-1/4 outline-none"
//               style={{ background: 'transparent' }}
//             />
//           </>
//         )}
//       </div>
//     );
//   }
// );

// FlipbookLoader.displayName = 'FlipbookLoader';
// export default FlipbookLoader;
