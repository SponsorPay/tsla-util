export interface PollOptions {
  delay?: number
  retries?: number
}

export class PollLimitError extends Error {
  name = "PollLimitError"
}

export function poll(runCheck: () => boolean | Promise<boolean>, {delay = 1000, retries = 50}: PollOptions = {}) {
  return new Promise((resolve, reject) => {
    const retry = async () => {
      if (await runCheck()) {
        resolve()
      } else if (retries-- > 0) {
        setTimeout(retry, delay)
      } else {
        reject(new PollLimitError())
      }
    }
    retry()
  })
}
