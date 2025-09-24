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


// pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

// console.log("[PDFJS] Worker set to:", pdfjs.GlobalWorkerOptions.workerSrc);



  

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
//         onLoadError={(err) => {
//           console.error('[react-pdf] load error', err);
//           setPdfLoading(false);
//         }}
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


//DEBEGGUN

// 'use client';
// import React, { useCallback, useRef, useState, useEffect } from "react";
// import Toolbar from "./toolbar/toolbar";
// import { cn } from "@/app-pdf/_lib/utils";
// import Flipbook from "./flipbook/flipbook";
// import screenfull from 'screenfull';
// import { TransformWrapper } from "react-zoom-pan-pinch";
// import { Document, pdfjs } from "react-pdf";
// import PdfLoading from "./pad-loading/pdf-loading";

// import 'react-pdf/dist/Page/AnnotationLayer.css';
// import 'react-pdf/dist/Page/TextLayer.css';

// // // pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";
// pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

// // pdfjs.GlobalWorkerOptions.workerSrc = new URL(
// //   '/pdf.worker.min.mjs',
// //   import.meta.url,
// // ).toString();

// const DOC_OPTIONS = { wasmUrl: '/wasm/' };

// const FlipbookViewer = ({ pdfUrl, shareUrl, className, disableShare }) => {
//   const containerRef = useRef();
//   const flipbookRef = useRef();
//   const [pdfLoading, setPdfLoading] = useState(true);
//   const [pdfDetails, setPdfDetails] = useState(null);
//   const [isSafari, setIsSafari] = useState(false);
//   const [viewerStates, setViewerStates] = useState({
//     currentPageIndex: 0,
//     zoomScale: 1,
//   });

//   // ✅ Detect Safari (desktop & iOS Safari; excludes Chrome/Edge on iOS)
//   useEffect(() => {
//     if (typeof navigator === "undefined") return;
//     const ua = navigator.userAgent || "";
//     const vendor = navigator.vendor || "";
//     const looksLikeSafari =
//       /safari/i.test(ua) &&
//       !/chrome|chromium|crios|fxios|edg/i.test(ua);
//     const isAppleVendor = /apple/i.test(vendor);
//     setIsSafari(looksLikeSafari || isAppleVendor);
//   }, []);

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

//   // ⛔ Safari: just show text
//   if (isSafari) {
//     return (
//       <div className={cn("p-4 flex flex-col gap-6", className)}>
    
//     <iframe src="/znika_short_compressed.pdf" width="100%" height="600px"></iframe>

//     </div>
//     );
//   }

//   // ✅ Non-Safari: your original flipbook viewer
//   return (
//     <div
//       ref={containerRef}
//       className={cn("relative w-full", className)}
//     >
//       {pdfLoading && <PdfLoading />}
//       <Document
//         file={pdfUrl}
//         options={DOC_OPTIONS}
//         onLoadSuccess={onDocumentLoadSuccess}
//         onLoadError={(err) => {
//           console.error('[react-pdf] load error', err);
//           setPdfLoading(false);
//         }}
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




// 'use client';
// import React, { useCallback, useRef, useState, useEffect } from "react";
// import Toolbar from "./toolbar/toolbar";
// import { cn } from "@/app-pdf/_lib/utils";
// import Flipbook from "./flipbook/flipbook";
// import screenfull from 'screenfull';
// import { TransformWrapper } from "react-zoom-pan-pinch";
// import { Document, Page, pdfjs } from "react-pdf";
// import PdfLoading from "./pad-loading/pdf-loading";

// import 'react-pdf/dist/Page/AnnotationLayer.css';
// import 'react-pdf/dist/Page/TextLayer.css';

// pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
// console.log("pdfjs.version", pdfjs.version);
// console.log("workerSrc", pdfjs.GlobalWorkerOptions.workerSrc);
// const DOC_OPTIONS = { wasmUrl: '/wasm/' };

// const FlipbookViewer = ({ pdfUrl, shareUrl, className, disableShare }) => {
//   const containerRef = useRef();
//   const flipbookRef = useRef();
//   const [pdfLoading, setPdfLoading] = useState(true);
//   const [pdfDetails, setPdfDetails] = useState(null);
//   const [isSafari, setIsSafari] = useState(false);
//   const [viewerStates, setViewerStates] = useState({
//     currentPageIndex: 0,
//     zoomScale: 1,
//   });

//   // ✅ new state (always declared, not inside if)
//   const [currentPage, setCurrentPage] = useState(1);

//   // ✅ Detect Safari
//   useEffect(() => {
//     if (typeof navigator === "undefined") return;
//     const ua = navigator.userAgent || "";
//     const vendor = navigator.vendor || "";
//     const looksLikeSafari =
//       /safari/i.test(ua) &&
//       !/chrome|chromium|crios|fxios|edg/i.test(ua);
//     const isAppleVendor = /apple/i.test(vendor);
//     setIsSafari(looksLikeSafari || isAppleVendor);
//   }, []);

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

//   // ✅ Safari Slider View
//   if (isSafari) {

//     const goNext = () => {
//       if (pdfDetails && currentPage < pdfDetails.totalPages) {
//         setCurrentPage((p) => p + 1);
//       }
//     };

//     const goPrev = () => {
//       if (currentPage > 1) {
//         setCurrentPage((p) => p - 1);
//       }
//     };

//     return (
//       <div className={cn("flex flex-col items-center gap-4", className)}>
//         <Document
//           file={pdfUrl}
//           onLoadSuccess={(doc) => {
//             setPdfDetails({ totalPages: doc.numPages });
//           }}
//           onLoadError={(err) => console.error("Safari PDF load error:", err)}
//         >
//           <Page pageNumber={currentPage} width={600} />
//         </Document>

//         <div className="flex gap-4 mt-2">
//           <button
//             onClick={goPrev}
//             disabled={currentPage === 1}
//             className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
//           >
//             Previous
//           </button>
//           <span>
//             {currentPage} / {pdfDetails?.totalPages || "?"}
//           </span>
//           <button
//             onClick={goNext}
//             disabled={pdfDetails && currentPage === pdfDetails.totalPages}
//             className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // ✅ Non-Safari (original flipbook)
//   return (
//     <div ref={containerRef} className={cn("relative w-full", className)}>
//       {pdfLoading && <PdfLoading />}
//       <Document
//         file={pdfUrl}
//         options={DOC_OPTIONS}
//         onLoadSuccess={onDocumentLoadSuccess}
//         onLoadError={(err) => {
//           console.error('[react-pdf] load error', err);
//           setPdfLoading(false);
//         }}
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
import React, { useCallback, useRef, useState, useEffect } from "react";
import Toolbar from "./toolbar/toolbar";
import { cn } from "@/app-pdf/_lib/utils";
import Flipbook from "./flipbook/flipbook";
import screenfull from "screenfull";
import { TransformWrapper } from "react-zoom-pan-pinch";
import { Document, Page, pdfjs } from "react-pdf";
import PdfLoading from "./pad-loading/pdf-loading";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// ✅ Worker (for non-Safari)
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const DOC_OPTIONS = {};

// ==========================
// Main Component
// ==========================
const FlipbookViewer = ({ pdfUrl, shareUrl, className, disableShare }) => {
  const containerRef = useRef();
  const flipbookRef = useRef();
  const [pdfLoading, setPdfLoading] = useState(true);
  const [pdfDetails, setPdfDetails] = useState(null);
  const [isSafari, setIsSafari] = useState(false);

  // ✅ always declared states
  const [currentPage, setCurrentPage] = useState(1);
  const [viewerStates, setViewerStates] = useState({
    currentPageIndex: 0,
    zoomScale: 1,
  });


  const safeUrl = encodeURI(pdfUrl); // base PDF URL
  const totalPages = 20; // ⚠️ you need to know this or pass as a prop

  // ✅ Detect Safari
  useEffect(() => {
    if (typeof navigator === "undefined") return;
    const ua = navigator.userAgent || "";
    const vendor = navigator.vendor || "";
    const looksLikeSafari =
      /safari/i.test(ua) &&
      !/chrome|chromium|crios|fxios|edg/i.test(ua);
    const isAppleVendor = /apple/i.test(vendor);
    setIsSafari(looksLikeSafari || isAppleVendor);
  }, []);

  // ✅ Flipbook load success
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
      console.error("Error loading document:", error);
    }
  }, []);

  // ==========================
  // SAFARI FALLBACK (simple PDF pages)
  // ==========================
  // if (isSafari) {
  //   return (
  //     <div className="w-full h-[90vh]">
  //       <embed
  //         src={pdfUrl}
  //         type="application/pdf"
  //         width="50%"
  //         height="50%"
  //       />
  //     </div>
  //   );
  // }

  // if (isSafari) {
  //   const safeUrl = encodeURI(pdfUrl); // handles spaces etc.
  //   const pdfWithView = `${safeUrl}#view=FitH`; // nicer initial fit
  
  //   return (
  //     <div
  //       className={cn(
  //         "w-full min-h-[90vh] flex items-center justify-center",
  //         className
  //       )}
  //       style={{ backgroundColor: "#f4f2eb" }}
  //     >
  //       {/* Centered box with responsive max size */}
  //       <div className="w-[min(90vw,900px)] h-[min(85vh,1200px)] shadow-lg rounded-xl overflow-hidden border border-neutral-200 bg-white">
  //         {/* Prefer <object> for Safari; <embed> is a fallback */}
  //         <object
  //           data={pdfWithView}
  //           type="application/pdf"
  //           className="w-full h-full"
  //         >
  //           {/* Fallback if inline preview is blocked */}
  //           <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#f4f2eb]">
  //             <p className="mb-4 text-neutral-700">
  //               Impossible d&apos;afficher l&apos;aperçu PDF directement dans Safari.
  //             </p>
  //             <a
  //               href={safeUrl}
  //               target="_blank"
  //               rel="noopener noreferrer"
  //               className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-neutral-300 hover:bg-neutral-100 transition"
  //             >
  //               Ouvrir le PDF dans un nouvel onglet
  //             </a>
  //           </div>
  //         </object>
  //       </div>
  //     </div>
  //   );
  // }
  
  
  
  if (isSafari) {
    const safeUrl = encodeURI(pdfUrl);
    const pdfWithView = `${safeUrl}#view=FitH`;
  
    return (
      <div
        className={cn(
          // center + mobile padding + safe viewport height
          "w-full min-h-[100dvh] flex items-center justify-center px-4",
          className
        )}
        style={{ backgroundColor: "#f4f2eb" }}
      >
        {/* Card: full width on mobile, capped on larger screens */}
        <div
          className="
            w-full max-w-[900px]
            h-[80dvh] md:h-[85vh]
            rounded-xl overflow-hidden border border-neutral-200 bg-white shadow-lg
          "
        >
          {/* Prefer <object>, add <embed> fallback for some iOS versions */}
          <object data={pdfWithView} type="application/pdf" className="w-full h-full">
            <embed src={pdfWithView} type="application/pdf" className="w-full h-full" />
  
            {/* Final fallback (cross-origin or blocked inline) */}
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#f4f2eb]">
              <p className="mb-4 text-neutral-700">
                Impossible d&apos;afficher l&apos;aperçu PDF directement dans Safari.
              </p>
              <a
                href={safeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-neutral-300 hover:bg-neutral-100 transition"
              >
                Ouvrir le PDF dans un nouvel onglet
              </a>
            </div>
          </object>
        </div>
      </div>
    );
  }
  

  // ==========================
  // NON-SAFARI (Flipbook mode)
  // ==========================
  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      {pdfLoading && <PdfLoading />}
      <Document
        file={pdfUrl}
        options={DOC_OPTIONS}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={(err) => {
          console.error("[react-pdf] load error", err);
          setPdfLoading(false);
        }}
        loading={<></>}
      >
        {pdfDetails && !pdfLoading && (
          <TransformWrapper
            doubleClick={{ disabled: true }}
            pinch={{ step: 2 }}
            disablePadding={viewerStates?.zoomScale <= 1}
            initialScale={1}
            minScale={1}
            maxScale={5}
            onTransformed={({ state }) =>
              setViewerStates({
                ...viewerStates,
                zoomScale: state.scale,
              })
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
        )}
      </Document>
    </div>
  );
};

export default FlipbookViewer;
