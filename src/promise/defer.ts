
export class Defer<T> {
  promise: Promise<T>
  resolve!: (value?: T | PromiseLike<T>) => void
  reject!: (reason?: any) => void

  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve
      this.reject = reject
    })
  }
}

export function defer<T>() {
  return new Defer<T>()
}
