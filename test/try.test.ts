import {Try} from "../src"

require("chai").should()

describe("try", function () {
  it("should getOrElse", () => {
    Try.of(() => "result").getOrElse(() => "bla").should.eq("result")
    Try.of(() => {
      if (Math.random() > 0) {
        throw Error()
      }
      return "result"
    }).getOrElse(() => "bla").should.eq("bla")
  })
})
