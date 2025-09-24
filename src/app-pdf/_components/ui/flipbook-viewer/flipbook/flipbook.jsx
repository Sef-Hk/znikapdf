'use client';
import React, { memo, useState, useEffect, useCallback } from 'react';
import useRefSize from '@/app-pdf/_hooks/use-ref-size';
import FlipbookLoader from './flipbook-loader';
import { cn } from '@/app-pdf/_lib/utils';
import { TransformComponent } from 'react-zoom-pan-pinch';
// import screenfull from 'screenfull';
import screenfull from 'screenfull';
const sf = screenfull;

const Flipbook = memo(({ viewerStates, setViewerStates, flipbookRef, pdfDetails }) => {
    const { ref, width, height, refreshSize } = useRefSize();
    const [scale, setScale] = useState(1); // Max scale for flipbook
    const [wrapperCss, setWrapperCss] = useState({});
    const [viewRange, setViewRange] = useState([0, 4]);

    // Calculate scale when pageSize or dimensions change >>>>>>>>
    useEffect(() => {
        if (pdfDetails && width && height) {
            const calculatedScale = Math.min(
                width / (2 * pdfDetails.width),
                height / pdfDetails.height
            );
            setScale(calculatedScale);
            setWrapperCss({
                width: `${pdfDetails.width * calculatedScale * 2}px`,
                height: `${pdfDetails.height * calculatedScale}px`,
            });
        }
    }, [pdfDetails, width, height]);

    



    // Refresh flipbook size & page range on window resize >>>>>>>>
    const shrinkPageLoadingRange = useCallback(() => {
        setViewRange([Math.max(viewerStates.currentPageIndex - 2, 0), Math.min(viewerStates.currentPageIndex + 2, pdfDetails.totalPages)]);
    }, [viewerStates.currentPageIndex, pdfDetails.totalPages, setViewRange]);

    const handleFullscreenChange = useCallback(() => {
        shrinkPageLoadingRange();
        refreshSize();
    }, [shrinkPageLoadingRange, refreshSize]);

    useEffect(() => {
        if (screenfull) {
            screenfull.on('change', handleFullscreenChange);
        }
        // Clean up the event listener
        return () => {
            if (screenfull) {
                screenfull.off('change', handleFullscreenChange);
            }
        };
    }, [handleFullscreenChange]);

    return (
        <div ref={ref} className={cn("relative h-[15rem] xs:h-[20rem] lg:h-[28rem] xl:h-[30rem] w-full bg-transparent flex justify-center items-center overflow-hidden", screenfull?.isFullscreen && 'h-[calc(100vh-5.163rem)] xs:h-[calc(100vh-5.163rem)] lg:h-[calc(100vh-5.163rem)] xl:h-[calc(100vh-4.66rem)]')}>
            <TransformComponent wrapperStyle={{ width: "100%", height: "100%" }} contentStyle={{ width: "100%", height: "100%" }}>
                <div className='overflow-hidden flex justify-center items-center h-full w-full'>
                    {pdfDetails && scale && (
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
                    )}
                </div>
            </TransformComponent>
        </div>
    );
});

Flipbook.displayName = 'Flipbook';
export default Flipbook;
















//////////////////// Version two 



// 'use client'
// import React, { memo, useState, useEffect, useCallback } from 'react'
// import useRefSize from '@/app-pdf/_hooks/use-ref-size'
// import FlipbookLoader from './flipbook-loader'
// import { cn } from '@/app-pdf/_lib/utils'
// import { TransformComponent } from 'react-zoom-pan-pinch'
// import screenfull from 'screenfull'

// /** ================================
//  *  TUNING KNOBS (edit these)
//  *  ================================ */


// const HEIGHTS = {
//   base: 'h-[34rem]',   // ~288px
//   xs:   'xs:h-[38rem]',
//   lg:   'lg:h-[46rem]',
//   xl:   'xl:h-[50rem]',
// }

// // If you want editor IntelliSense, keep this JSDoc. Otherwise just write: const FIT = 'contain'
// /** @type {'contain' | 'cover'} */
// const FIT = 'contain'

// // Nudge the base render bigger/smaller (1 = no change; 1.10 = +10%, 0.9 = -10%)
// const SCALE_MULTIPLIER = 1.10
// // Soft cap relative to the fit (avoid going wild while tweaking)
// const SCALE_CAP_FACTOR = 1.6
// /** ================================= */

// const Flipbook = memo(({ viewerStates, setViewerStates, flipbookRef, pdfDetails }) => {
//   const { ref, width, height, refreshSize } = useRefSize()
//   const [scale, setScale] = useState(1)
//   const [wrapperCss, setWrapperCss] = useState({})
//   const [viewRange, setViewRange] = useState([0, 4])

//   useEffect(() => {
//     if (pdfDetails && width && height) {
//       // Spread = two pages wide
//       const fitScaleWidth  = width  / (2 * pdfDetails.width)
//       const fitScaleHeight = height / pdfDetails.height

//       const fit = FIT === 'cover'
//         ? Math.max(fitScaleWidth, fitScaleHeight)
//         : Math.min(fitScaleWidth, fitScaleHeight)

//       const boosted = fit * SCALE_MULTIPLIER
//       const calculatedScale = Math.min(boosted, fit * SCALE_CAP_FACTOR)

//       setScale(calculatedScale)
//       setWrapperCss({
//         width:  `${pdfDetails.width  * calculatedScale * 2}px`,
//         height: `${pdfDetails.height * calculatedScale}px`,
//       })
//     }
//   }, [pdfDetails, width, height])

//   // Keep only nearby pages rendered (perf)
//   const shrinkPageLoadingRange = useCallback(() => {
//     const total = pdfDetails?.totalPages ?? 0
//     setViewRange([
//       Math.max(viewerStates.currentPageIndex - 2, 0),
//       Math.min(viewerStates.currentPageIndex + 2, total),
//     ])
//   }, [viewerStates.currentPageIndex, pdfDetails?.totalPages])

//   // Handle fullscreen size changes
//   const handleFullscreenChange = useCallback(() => {
//     shrinkPageLoadingRange()
//     refreshSize()
//   }, [shrinkPageLoadingRange, refreshSize])

//   useEffect(() => {
//     if (screenfull?.isEnabled) {
//       screenfull.on('change', handleFullscreenChange)
//       return () => screenfull.off('change', handleFullscreenChange)
//     }
//   }, [handleFullscreenChange])

//   return (
//     <div
//       ref={ref}
//       className={cn(
//         'relative w-full bg-transparent flex justify-center items-center overflow-hidden pt-10',
//         HEIGHTS.base, HEIGHTS.xs, HEIGHTS.lg, HEIGHTS.xl,
//         screenfull?.isFullscreen && 'h-[calc(100svh-5.163rem)]'
//       )}
//     >
//       <TransformComponent
//         wrapperStyle={{ width: '100%', height: '100%' }}
//         contentStyle={{ width: '100%', height: '100%' }}
//       >
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



