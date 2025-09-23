// 'use client';
// import React, { useCallback, useRef, useState } from "react";
// import Toolbar from "./toolbar/toolbar";
// import { cn } from "@/app-pdf/_lib/utils";
// import Flipbook from "./flipbook/flipbook";
// import screenfull from 'screenfull';
// import { TransformWrapper } from "react-zoom-pan-pinch";
// import { Document, pdfjs } from "react-pdf";      // ✅ import both here
// import PdfLoading from "./pad-loading/pdf-loading";

// import 'react-pdf/dist/Page/AnnotationLayer.css';
// import 'react-pdf/dist/Page/TextLayer.css';

// // ✅ Worker (keep versions in sync)
// pdfjs.GlobalWorkerOptions.workerSrc =
//   `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// // ✅ Tell pdf.js where the wasm files live (folder URL, trailing slash!)
// const DOC_OPTIONS = { wasmUrl: '/wasm/' };

// const FlipbookViewer = ({ pdfUrl, shareUrl, className, disableShare }) => {
//   const containerRef = useRef();
//   const flipbookRef = useRef();
//   const [pdfLoading, setPdfLoading] = useState(true);
//   const [pdfDetails, setPdfDetails] = useState(null);
//   const [viewerStates, setViewerStates] = useState({
//     currentPageIndex: 0,
//     zoomScale: 1,
//   });

//   const onDocumentLoadSuccess = useCallback(async (document) => {
//     try {
//       const pageDetails = await document.getPage(1);
//       setPdfDetails({
//         totalPages: document.numPages,
//         width: pageDetails.view[2],
//         height: pageDetails.view[3],
//       });
//       setPdfLoading(false);
//     } catch (error) {
//       console.error('Error loading document:', error);
//     }
//   }, []);

//   return (
//     <div ref={containerRef} className={cn("relative min-h-svh w-full overflow-hidden ", className)}>
//       {pdfLoading && <PdfLoading />}
//       <Document
//         file={pdfUrl}
//         options={DOC_OPTIONS}                 // ✅ add this
//         onLoadSuccess={onDocumentLoadSuccess}
//         loading={<></>}
//       >
//         {pdfDetails && !pdfLoading && (
//           <TransformWrapper
//             doubleClick={{ disabled: true }}
//             pinch={{ step: 2 }}
//             disablePadding={viewerStates?.zoomScale <= 1}
//             initialScale={1}
//             minScale={1}
//             maxScale={5}
//             onTransformed={({ state }) =>
//               setViewerStates({ ...viewerStates, zoomScale: state.scale })
//             }
//           >
//             <div className="w-full h-full relative flex flex-col justify-between">
//               <Flipbook
//                 viewerStates={viewerStates}
//                 setViewerStates={setViewerStates}
//                 flipbookRef={flipbookRef}
//                 screenfull={screenfull}
//                 pdfDetails={pdfDetails}
//               />
//               <Toolbar
//                 viewerStates={viewerStates}
//                 setViewerStates={setViewerStates}
//                 containerRef={containerRef}
//                 flipbookRef={flipbookRef}
//                 screenfull={screenfull}
//                 pdfDetails={pdfDetails}
//                 shareUrl={shareUrl}
//                 disableShare={disableShare}
//               />
//             </div>
//           </TransformWrapper>
//         )}
//       </Document>
//     </div>
//   );
// };

// export default FlipbookViewer;


// 'use client';
// import React, { useCallback, useRef, useState } from "react";
// import Toolbar from "./toolbar/toolbar";
// import { cn } from "@/app-pdf/_lib/utils";
// import Flipbook from "./flipbook/flipbook";
// import screenfull from 'screenfull';
// import { TransformWrapper } from "react-zoom-pan-pinch";
// import { Document, pdfjs } from "react-pdf";
// import PdfLoading from "./pad-loading/pdf-loading";

// import 'react-pdf/dist/Page/AnnotationLayer.css';
// import 'react-pdf/dist/Page/TextLayer.css';

// // ✅ Worker
// pdfjs.GlobalWorkerOptions.workerSrc =
//   `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// const DOC_OPTIONS = { wasmUrl: '/wasm/' };

// const FlipbookViewer = ({ pdfUrl, shareUrl, className, disableShare }) => {
//   const containerRef = useRef();
//   const flipbookRef = useRef();
//   const [pdfLoading, setPdfLoading] = useState(true);
//   const [pdfDetails, setPdfDetails] = useState(null);
//   const [viewerStates, setViewerStates] = useState({
//     currentPageIndex: 0,
//     zoomScale: 1,
//   });

//   const onDocumentLoadSuccess = useCallback(async (document) => {
//     try {
//       const pageDetails = await document.getPage(1);
//       setPdfDetails({
//         totalPages: document.numPages,
//         width: pageDetails.view[2],
//         height: pageDetails.view[3],
//       });
//       setPdfLoading(false);
//     } catch (error) {
//       console.error('Error loading document:', error);
//     }
//   }, []);

//   return (
//     <div
//       ref={containerRef}
//       className={cn(
//         "relative w-full", // ⬅️ removed min-h-svh so it shrinks to content
//         className
//       )}
//     >
//       {pdfLoading && <PdfLoading />}
//       <Document
//         file={pdfUrl}
//         options={DOC_OPTIONS}
//         onLoadSuccess={onDocumentLoadSuccess}
//         loading={<></>}
//       >
//         {pdfDetails && !pdfLoading && (
//           <TransformWrapper
//             doubleClick={{ disabled: true }}
//             pinch={{ step: 2 }}
//             disablePadding={viewerStates?.zoomScale <= 1}
//             initialScale={1}
//             minScale={1}
//             maxScale={5}
//             onTransformed={({ state }) =>
//               setViewerStates({ ...viewerStates, zoomScale: state.scale })
//             }
//           >
//             {/* ⬇️ Changed flex/height handling */}
//             <div className="w-full flex flex-col">
//               <Flipbook
//                 viewerStates={viewerStates}
//                 setViewerStates={setViewerStates}
//                 flipbookRef={flipbookRef}
//                 screenfull={screenfull}
//                 pdfDetails={pdfDetails}
//               />
//               <Toolbar
//                 viewerStates={viewerStates}
//                 setViewerStates={setViewerStates}
//                 containerRef={containerRef}
//                 flipbookRef={flipbookRef}
//                 screenfull={screenfull}
//                 pdfDetails={pdfDetails}
//                 shareUrl={shareUrl}
//                 disableShare={disableShare}
//               />
//             </div>
//           </TransformWrapper>
//         )}
//       </Document>
//     </div>
//   );
// };

// export default FlipbookViewer;





'use client';
import React, { useCallback, useRef, useState } from "react";
import Toolbar from "./toolbar/toolbar";
import { cn } from "@/app-pdf/_lib/utils";
import Flipbook from "./flipbook/flipbook";
import screenfull from 'screenfull';
import { TransformWrapper } from "react-zoom-pan-pinch";
import { Document, Page, pdfjs } from "react-pdf";
import PdfLoading from "./pad-loading/pdf-loading";
import { isIOS, isSafari } from "react-device-detect";

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// ✅ Worker
pdfjs.GlobalWorkerOptions.workerSrc =
  `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const DOC_OPTIONS = { wasmUrl: '/wasm/' };

const FlipbookViewer = ({ pdfUrl, shareUrl, className, disableShare }) => {
  const containerRef = useRef();
  const flipbookRef = useRef();
  const [pdfLoading, setPdfLoading] = useState(true);
  const [pdfDetails, setPdfDetails] = useState(null);
  const [viewerStates, setViewerStates] = useState({
    currentPageIndex: 0,
    zoomScale: 1,
  });

  const onDocumentLoadSuccess = useCallback(async (document) => {
    try {
      const pageDetails = await document.getPage(1);
      setPdfDetails({
        totalPages: document.numPages,
        width: pageDetails.view[2],
        height: pageDetails.view[3],
      });
      setPdfLoading(false);
    } catch (error) {
      console.error('Error loading document:', error);
    }
  }, []);

  const isSafariIOS = isIOS || isSafari;

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full", className)}
    >
      {pdfLoading && <PdfLoading />}

      <Document
        file={pdfUrl}
        options={DOC_OPTIONS}
        onLoadSuccess={onDocumentLoadSuccess}
        loading={<></>}
      >
        {/* ✅ SAFARI/IOS FALLBACK */}
        {isSafariIOS ? (
          <div className="w-full flex flex-col gap-4">
            {[...Array(pdfDetails?.totalPages || 0)].map((_, i) => (
              <Page key={i} pageNumber={i + 1} width={window.innerWidth - 40} />
            ))}
          </div>
        ) : (
          pdfDetails && !pdfLoading && (
            <TransformWrapper
              doubleClick={{ disabled: true }}
              pinch={{ step: 2 }}
              disablePadding={viewerStates?.zoomScale <= 1}
              initialScale={1}
              minScale={1}
              maxScale={5}
              onTransformed={({ state }) =>
                setViewerStates({ ...viewerStates, zoomScale: state.scale })
              }
            >
              <div className="w-full flex flex-col">
                <Flipbook
                  viewerStates={viewerStates}
                  setViewerStates={setViewerStates}
                  flipbookRef={flipbookRef}
                  screenfull={screenfull}
                  pdfDetails={pdfDetails}
                />
                <Toolbar
                  viewerStates={viewerStates}
                  setViewerStates={setViewerStates}
                  containerRef={containerRef}
                  flipbookRef={flipbookRef}
                  screenfull={screenfull}
                  pdfDetails={pdfDetails}
                  shareUrl={shareUrl}
                  disableShare={disableShare}
                />
              </div>
            </TransformWrapper>
          )
        )}
      </Document>
    </div>
  );
};

export default FlipbookViewer;
