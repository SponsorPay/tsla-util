import {expect} from "chai"
import {defer} from "../../src/promise/defer"

require("chai").should()

describe("defer", function () {
  it("should resolve", async () => {
    const {promise, resolve} = defer<string>()
    resolve("result")
    const result = await promise
    expect(result).to.eq("result")
  })
})
