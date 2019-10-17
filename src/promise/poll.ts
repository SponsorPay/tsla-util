import {defer, Defer} from "./defer"

export interface PollOptions {
  delay?: number
  retries?: number
}

export class PollLimitError extends Error {
  name = "PollLimitError"
}

export class PollDisposedError extends Error {
  name = "PollDisposedError"
}

export type OrPromise<T> = T | Promise<T>

export type RunCheck<T> = () => OrPromise<T | false>

export interface PollParams<T> extends PollOptions {
  runCheck: RunCheck<T>
}

export interface Poll<T> {}

export class Poll<T> {
  disposed = false
  defer: Defer<T>
  timeoutId?: number | object

  constructor({runCheck, delay = 1000, retries = 50}: PollParams<T>) {
    this.defer = defer()
    const retry = async () => {
      if (!this.disposed) {
        try {
          const result = await runCheck()
          if (result !== false) {
            this.defer.resolve(result)
          } else if (retries-- > 0) {
            this.timeoutId = setTimeout(retry, delay)
          } else {
            this.defer.reject(new PollLimitError())
          }
        } catch (e) {
          this.defer.reject(e)
        }
      } else {
        this.defer.reject(new PollDisposedError())
      }
    }
    retry()
  }

  get promise() {
    return this.defer.promise
  }

  dispose() {
    this.disposed = true
    if (this.timeoutId) {
      clearTimeout(this.timeoutId as number)
      this.defer.reject(new PollDisposedError())
    }
  }
}

export function poll<T>(
  runCheck: RunCheck<T>,
  {delay = 1000, retries = 50}: PollOptions = {},
) {
  return new Poll({
    retries,
    delay,
    runCheck,
  }).promise
}
