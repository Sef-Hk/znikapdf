declare global {
  interface PromiseConstructor {
    withResolvers<T = unknown>(): {
      promise: Promise<T>
      resolve: (value: T | PromiseLike<T>) => void
      reject: (reason?: unknown) => void
    }
  }
}
export {}
