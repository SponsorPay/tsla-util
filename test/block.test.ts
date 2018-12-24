import {block} from "../src/block"
import {expect} from "chai"

describe("block.test", function () {
  it("should block", () => {
    expect(block(() => "me")).to.eq("me")
  })
})
