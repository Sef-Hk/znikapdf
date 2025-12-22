'use client'

import React, { useCallback, useRef, useState, useMemo } from 'react'
import Toolbar from './toolbar/toolbar'
import { cn } from '@/app-pdf/_lib/utils'
import Flipbook from './flipbook/flipbook'
import screenfullImport from 'screenfull'
import { TransformWrapper } from 'react-zoom-pan-pinch'
import { Document, pdfjs } from 'react-pdf'
import PdfLoading from './pad-loading/pdf-loading'

import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

if (typeof window !== 'undefined') {
  pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.patched.mjs'
}

const DOC_OPTIONS = { wasmUrl: '/wasm/' }

function getSafeScreenfull() {
  const sf = screenfullImport?.default ?? screenfullImport
  const ok =
    !!sf &&
    sf.isEnabled === true &&
    typeof sf.on === 'function' &&
    typeof sf.off === 'function' &&
    typeof sf.toggle === 'function'
  return ok ? sf : null
}

const FlipbookViewer = ({ pdfUrl, shareUrl, className, disableShare }) => {
  const containerRef = useRef(null)
  const flipbookRef = useRef(null)

  const [pdfLoading, setPdfLoading] = useState(true)
  const [pdfDetails, setPdfDetails] = useState(null)
  const [viewerStates, setViewerStates] = useState({ currentPageIndex: 0, zoomScale: 1 })

  // compute once per render; safeScreenfull will be null on iPhone/iOS
  const safeScreenfull = useMemo(() => getSafeScreenfull(), [])

  const onDocumentLoadSuccess = useCallback(async (document) => {
    try {
      const pageDetails = await document.getPage(1)
      setPdfDetails({
        totalPages: document.numPages,
        width: pageDetails.view[2],
        height: pageDetails.view[3],
      })
      setPdfLoading(false)
    } catch (error) {
      console.error('Error loading document:', error)
    }
  }, [])
 //className={cn('relative min-h-svh w-full overflow-hidden', className)}
  return (
    <div ref={containerRef} className={cn('relative w-full overflow-hidden', className)}>
      {pdfLoading && <PdfLoading />}

      <Document file={pdfUrl} options={DOC_OPTIONS} onLoadSuccess={onDocumentLoadSuccess} loading={<></>}>
        {pdfDetails && !pdfLoading && (
          <TransformWrapper
            doubleClick={{ disabled: true }}
            pinch={{ step: 2 }}
            disablePadding={viewerStates.zoomScale <= 1}
            initialScale={1}
            minScale={1}
            maxScale={5}
            onTransformed={({ state }) => setViewerStates((s) => ({ ...s, zoomScale: state.scale }))}
          >
            <div className="w-full h-full relative flex flex-col justify-between">
              <Flipbook
                viewerStates={viewerStates}
                setViewerStates={setViewerStates}
                flipbookRef={flipbookRef}
                screenfull={safeScreenfull}
                pdfDetails={pdfDetails}
              />

              <Toolbar
                viewerStates={viewerStates}
                setViewerStates={setViewerStates}
                containerRef={containerRef}
                flipbookRef={flipbookRef}
                screenfull={safeScreenfull}
                pdfDetails={pdfDetails}
                shareUrl={shareUrl}
                disableShare={disableShare}
              />
            </div>
          </TransformWrapper>
        )}
      </Document>
    </div>
  )
}

export default FlipbookViewer

