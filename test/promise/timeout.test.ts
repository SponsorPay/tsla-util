import {expect} from "chai"

import {delay} from "../../src/promise/delay"
import {PromiseTimeoutError} from "../../src/promise/timeout"
import "../../src/promise/timeout"

require("chai").should()

describe("timeout.test", function () {
  it("should throw timeout error", async () => {
    try {
      await delay(200).timeout(100)
    } catch (e) {
      expect(e.name).to.eq("PromiseTimeoutError")
    }
  })

  it("should not throw timeout error", async () => {
    const result = await (async () => {
      await delay(100)
      return "success"
    })().timeout(200)
    expect(result).to.eq("success")
    await delay(150)
  })
})
