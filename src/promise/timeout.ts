import {delay} from "./delay"
import {extension} from "ts-trait/build/extension"

export class PromiseTimeoutError extends Error {
  name = "PromiseTimeoutError"
}

declare global {
  interface Promise<T> extends PromiseTimeout<T> {}
}

@extension([Promise])
export class PromiseTimeout<T> {
  timeout(this: Promise<T>, ms = 0): Promise<T> {
    return Promise.race([
      this,
      delay(ms).then(() => {
        throw new PromiseTimeoutError()
      })
    ])
  }
}
