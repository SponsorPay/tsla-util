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

export interface PollParams extends PollOptions {
  runCheck: () => boolean | Promise<boolean>
}

export interface Poll {
}

export class Poll {
  disposed = false
  defer: Defer<void>
  timeoutId?: number | object

  constructor({runCheck, delay = 1000, retries = 50}: PollParams) {
    this.defer = defer()
    const retry = async () => {
      if (!this.disposed) {
        if (await runCheck()) {
          this.defer.resolve()
        } else if (retries-- > 0) {
          this.timeoutId = setTimeout(retry, delay)
        } else {
          this.defer.reject(new PollLimitError())
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

export function poll(
  runCheck: () => boolean | Promise<boolean>,
  {delay = 1000, retries = 50}: PollOptions = {},
) {
  return new Poll({
    retries,
    delay,
    runCheck,
  }).promise
}
