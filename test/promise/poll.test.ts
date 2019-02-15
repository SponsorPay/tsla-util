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
})
