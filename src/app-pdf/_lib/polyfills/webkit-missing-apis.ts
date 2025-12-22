// Must run BEFORE react-pdf/pdfjs-dist is imported.
export {}

// --------------------
// Promise.withResolvers (Safari < 17.4)
// --------------------
if (typeof (Promise as any).withResolvers !== 'function') {
  ;(Promise as any).withResolvers = function <T>() {
    let resolve!: (value: T | PromiseLike<T>) => void
    let reject!: (reason?: any) => void

    const promise = new Promise<T>((res, rej) => {
      resolve = res
      reject = rej
    })

    return { promise, resolve, reject }
  }
}

// --------------------
// URL.parse (Safari < 18)
// PDF.js sometimes calls URL.parse(val, window.location)
// --------------------
if (typeof (URL as any).parse !== 'function') {
  ;(URL as any).parse = (input: string, base?: any) => {
    try {
      // handle base being Location (window.location)
      const normalizedBase = base && typeof base === 'object' && 'href' in base ? base.href : base

      return new URL(input, normalizedBase)
    } catch {
      return null
    }
  }
}
