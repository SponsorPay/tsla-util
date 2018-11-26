import {measureAndGetResult, measureTimeMillis} from "../../src/fun/measureTimeMillis"
import {delay} from "../../src/promise/delay"
import {expect} from "chai"

describe("measureTimeMillis.test", function () {
  it("should measureTimeMillis", async () => {
    const millis = await measureTimeMillis(() => delay(100))
    expect(millis >= 100).to.eq(true)
  })

  it("should measureAndGetResult", async () => {
    let millis = 0
    const result = await measureAndGetResult(
      async () => {
        await delay(100)
        return "result"
      },
      m => millis = m
    )
    expect(result).to.eq("result")
    expect(millis > 0).to.eq(true)
  })
})
