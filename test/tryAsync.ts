import * as assert from "assert"
import {TryAsync, Option} from "../src/"

require("chai").should()

describe("tryAsync", function () {
  it("should getOrElse", async () => {
    let tryAsync = TryAsync.of(async () => "result")
    let r: string | null = await tryAsync.getOrElse(() => "jojo")

    assert(r == "result")

    tryAsync = TryAsync.of(async () => {
      if (Math.random() > -1) {
        throw new Error()
      }
      return "result"
    })

    r = await tryAsync.getOrElse(() => "jojo")

    assert(r == "jojo")

    r = await tryAsync.get()

    assert(r == null)
  })
})
