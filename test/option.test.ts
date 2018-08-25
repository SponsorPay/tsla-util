import {Option} from "../src"
import {expect} from "chai"
require("chai").should()

describe("option", function () {
  it("should option", () => {
    Option.of("result").getOrElse("fb").should.eq("result")
    Option.of(null as string | null).getOrElse("fb").should.eq("fb")
    expect(Option.of({a: 1}).map(e => e.a).get).to.eq(1)
    expect(Option.of({a: 1}).flatMap(e => Option.of(e.a)).get).to.eq(1)
    expect(Option.of(null! as {a: number}).map(e => e.a).get).to.eq(null)
    expect(Option.of(null).isEmpty).to.be.true
    expect(Option.of({a: 1}).isNotEmpty).to.be.true
  })

  it("Option.none should be safe", () => {
    const none = Option.none as Option<any>
    none.map(x => x.toString()).should.eq(Option.of(null))
    none.flatMap(x => Option.of(x.toString())).should.eq(Option.of(null))
  })
})
