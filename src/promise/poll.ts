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
  promise: Promise<void>

  constructor({runCheck, delay = 1000, retries = 50}: PollParams) {
    this.promise = new Promise(
      (resolve, reject) => {
        const retry = async () => {
          if (!this.disposed) {
            if (await runCheck()) {
              resolve()
            } else if (retries-- > 0) {
              setTimeout(retry, delay)
            } else {
              reject(new PollLimitError())
            }
          } else {
            reject(new PollDisposedError())
          }
        }
        retry()
      }
    )
  }

  dispose() {
    this.disposed = true
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
