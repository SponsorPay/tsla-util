import {expect} from "chai"
import {parseBool, parseNumber, parseString} from "../../src/parse"

require("chai").should()

describe("parse", function () {
  it("should parseString", () => {
    expect(parseString("nice")).to.eq("nice")
    expect(parseString(null)).to.eq("")
    expect(parseString(undefined)).to.eq("")
  })

  it("should parseBool", () => {
    expect(parseBool(true)).to.eq(true)
    expect(parseBool(1)).to.eq(true)
    expect(parseBool(false)).to.eq(false)
    expect(parseBool(0)).to.eq(false)
    expect(parseBool(null)).to.eq(false)
    expect(parseBool(undefined)).to.eq(false)
  })

  it("should parseNumber", () => {
    expect(parseNumber(74.5)).to.eq(74.5)
    expect(parseNumber(null)).to.eq(0)
    expect(parseNumber(undefined)).to.eq(0)
    expect(parseNumber({})).to.eq(0)
  })
})
