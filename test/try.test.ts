import {Try, tryCatch} from "../src"

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

  it("should asOption", () => {
    Try.of(() => "result").asOption.getOrElse(() => "bla").should.eq("result")
    Try.of(() => {
      if (Math.random() > 0) {
        throw Error()
      }
      return "result"
    }).asOption.getOrElse(() => "bla").should.eq("bla")
  })

  it("should tryCatch", () => {
    tryCatch(() => "result").getOrElse(() => "bla").should.eq("result")
    tryCatch(() => {
      if (Math.random() > 0) {
        throw Error()
      }
      return "result"
    }).getOrElse(() => "bla").should.eq("bla")
  })
})
