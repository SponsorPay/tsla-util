import { expect } from "chai"
import { Option } from "../src/option/option"
import { None } from "../src/option/none"

require("chai").should()

describe("option", function () {
  it("should option", () => {
    Option.of("result")
      .getOrElse("fb")
      .should.eq("result")
    Option.of(null as string | null)
      .getOrElse("fb")
      .should.eq("fb")
    expect(Option.of({ a: 1 }).map(e => e.a).get).to.eq(1)
    expect(Option.of({ a: 1 }).flatMap(e => Option.of(e.a)).get).to.eq(1)
    expect(Option.of(null! as { a: number }).map(e => e.a).get).to.eq(null)
    expect(Option.of(null).isEmpty).to.eq(true)
    expect(Option.of({ a: 1 }).isNotEmpty).to.eq(true)
  })

  it("Option.none should be safe", () => {
    None.none<{}>().map(x => x.toString()).should.eq(Option.of(null))
    None.none<{}>().flatMap(x => Option.of(x.toString())).should.eq(Option.of(null))
  })

  it("Some(null) should be safe", () => {
    Option.of("value")
      .map(() => null)
      .map(() => null)
      .should.eq(None.none())
    // const some = new Some(null) as Option<any>
    // some.map(x => x.toString()).should.eq(Option.of(null))
    // some.flatMap(x => Option.of(x!.toString())).should.eq(Option.of(null))
  })

  it("Option.map should be safe", () => {
    Option.of({ a: null as any })
      .map(e => e.a)
      .map(e => e.b)
      .should.eq(None.none())
  })

  it("Option.isNone", () => {
    const option = Option.of(undefined as string | undefined)
    expect(option.isNone()).to.eq(true)
    expect(option.isSome()).to.eq(false)
  })

  it("Option.isSome", () => {
    const option = Option.of("result")
    expect(option.isNone()).to.eq(false)
    expect(option.isSome()).to.eq(true)

    if (option.isSome()) {
      expect(option.value).to.eq("result")
    }
  })

  it("filter", () => {
    None.none().filter(() => true).should.eq(None.none())
    Option.of("result").filter(() => false)
    Option.of("result").filter(r => r.startsWith("re")).get!.should.eq("result")
  })

  it("orElse", () => {
    expect(None.none().orElse(() => Option.of("else")).get).to.eq("else")
    expect(Option.of("result").orElse(() => Option.of("else")).get).to.eq("result")
  })
})
