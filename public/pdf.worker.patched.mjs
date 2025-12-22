// public/pdf.worker.patched.mjs

// Polyfills for older WebKit (Safari 17.1 / older iOS)
if (typeof Promise.withResolvers !== 'function') {
  Promise.withResolvers = function () {
    let resolve, reject
    const promise = new Promise((res, rej) => {
      resolve = res
      reject = rej
    })
    return { promise, resolve, reject }
  }
}

if (typeof URL.parse !== 'function') {
  URL.parse = (input, base) => {
    try {
      const normalizedBase = base && typeof base === 'object' && 'href' in base ? base.href : base
      return new URL(input, normalizedBase)
    } catch {
      return null
    }
  }
}

// Load the actual PDF.js worker (same-origin)
import './pdf.worker.min.mjs'
