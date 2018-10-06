import {assert} from "chai"
import {autoBind} from "../src/autoBind"

describe("auto bind", function () {
  it("should auto bind", () => {
    class Foo {
      _bar = "bar"

      @autoBind
      bar() {
        return this._bar
      }
    }

    const foo = new Foo()

    assert(foo.bar === foo.bar, "binds only once")

    assert(foo.bar() === "bar")

    const bar = foo.bar

    assert(bar() === "bar")
  })

  it("should work for methods only", () => {
    let error = false
    try {
      class Foo {
        _bar = "bar"

        @autoBind
        get bar() {
          return this._bar
        }
      }
    } catch (e) {
      error = true
    }
    assert(error)
  })
})
