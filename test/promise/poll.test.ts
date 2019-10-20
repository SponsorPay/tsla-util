import {Poll, poll, PollLimitError} from "../../src/promise/poll"
import {expect} from "chai"

describe("poll.test", function () {
  it("should poll", async () => {
    let n = false
    setTimeout(() => n = true, 50)
    await poll(() => n, {delay: 5})
  })

  it("should fail after X retries", async () => {
    let n = false
    setTimeout(() => n = true, 50)
    let error
    try {
      await poll(() => n, {delay: 5, retries: 2})
    } catch (e) {
      error = e
    }
    expect(error).to.be.instanceOf(Error)
    expect(error.name).to.eq("PollLimitError")
  })

  it("should dispose", async () => {
    let n = false
    setTimeout(() => n = true, 50)
    const poll = new Poll({
      runCheck: () => n,
      delay: 5
    })
    setTimeout(() => poll.dispose(), 25)
    let error
    try {
      await poll.promise
    } catch (e) {
      error = e
    }
    expect(error.name).to.eq("PollDisposedError")
  })

  it("should dispose before first run", async () => {
    const poll = new Poll({
      runCheck: () => false,
      delay: 50
    })
    poll.dispose()
    let error
    try {
      await poll.promise
    } catch (e) {
      error = e
    }
    expect(error.name).to.eq("PollDisposedError")
  })

  it("should resolve if disposed after poll success", async () => {
    let n = false
    setTimeout(() => n = true, 50)
    const poll = new Poll({
      runCheck: () => n,
      delay: 5
    })
    setTimeout(() => poll.dispose(), 75)
    await poll.promise
  })

  it("should not swallow promise rejection", async () => {
    const poll = new Poll({
      runCheck: async () => {
        throw new Error("Error inside runCheck")
      },
      delay: 5
    })
    let error: Error
    try {
      await poll.promise
    } catch (e) {
      error = e
    }
    expect(error!.message).to.eq("Error inside runCheck")
  })

  it("should get result from promise", async () => {
    let flag = 0
    const poll = new Poll({
      runCheck: async () => {
        if (flag > 0) {
          return "RESULT"
        }
        flag++
        return false
      },
      delay: 5
    })
    const result = await poll.promise
    expect(result).to.eq("RESULT")
  })
})
