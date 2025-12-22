// src/app-pdf/_lib/polyfills/promise-with-resolvers.ts
// Must run BEFORE pdfjs-dist/react-pdf is imported.

export {} // make this a module

declare global {
  interface PromiseConstructor {
    withResolvers<T>(): {
      promise: Promise<T>
      resolve: (value: T | PromiseLike<T>) => void
      reject: (reason?: any) => void
    }
  }
}

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
