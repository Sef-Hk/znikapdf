// src/app-pdf/_lib/pdfjs-setup.js
import { pdfjs } from 'react-pdf'

// ✅ Force Safari-safe worker
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js'

// Debug log
console.log('[PDFJS] Worker set to:', pdfjs.GlobalWorkerOptions.workerSrc)

export { pdfjs }
