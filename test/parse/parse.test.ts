import {expect} from "chai"
import {parseArray, parseBool, parseNumber, parseString} from "../../src/parse"

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

  it("should parseArray", () => {
    expect(parseArray(1, e => e)).to.deep.eq([])
    expect(parseArray(undefined, e => e)).to.deep.eq([])
    expect(parseArray({}, e => e)).to.deep.eq([])
    expect(parseArray(null, e => e)).to.deep.eq([])
    expect(parseArray([1], String)).to.deep.eq(["1"])
  })
})
