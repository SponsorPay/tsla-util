import {expect} from "chai"
import {delay} from "../../src/promise/delay"

require("chai").should()

describe("delay.test", function () {
  it("should delay", async () => {
    let flag = false
    setTimeout(() => {
      flag = true
    }, 50)
    expect(flag).to.eq(false)
    await delay(100)
    expect(flag).to.eq(true)
  })
})
