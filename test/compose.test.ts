import "../src/compose"

require("chai").should()

const addOne = (a: number) => add(a, 1) + ""

const add = (a: number, b: number) => a + b

function double(a: string) {
  return Number(a) * 2
}

describe("compose.test", function () {
  it("should compose", () => {
    addOne.compose(double).compose(addOne)(1).should.eq("5")
    addOne.compose(double)(1).toFixed(2).should.eq("4.00")
    add.compose(addOne)(1, 1).should.eq("3")
  })

  it("should compose decorators", () => {
    function decorator1(target: any, key: string, descriptor: PropertyDescriptor) {
      const fn = descriptor.value
      console.log("defineProperty decorator1")
      return {
        value(...args: any[]) {
          console.log("decorator1")
          return fn.apply(this, ...args)
        },
      }
    }

    function decorator2(target: any, key: string, descriptor: PropertyDescriptor) {
      const fn = descriptor.value
      return {
        value(...args: any[]) {
          console.log("decorator2")
          return fn.apply(this, ...args)
        },
      }
    }

    function decorator3(target: any, key: string, descriptor: PropertyDescriptor) {
      const fn = descriptor.value
      return {
        value(...args: any[]) {
          console.log("decorator3")
          return fn.apply(this, ...args)
        },
      }
    }

    function decorator(target: any, key: string, descriptor: PropertyDescriptor) {
      return decorator1(target, key, decorator2(target, key, decorator3(target, key, descriptor)))
    }

    class MyClass {
      @decorator
      fn() {
        console.log("original function")
      }
    }

    new MyClass().fn()
  })
})
