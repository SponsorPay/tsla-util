import "../../src/compose/compose"

require("chai").should()

const addOne = (a: number) => add(a, 1) + ""

const add = (a: number, b: number) => a + b

function double(a: string) {
  return Number(a) * 2
}

describe("compose", function () {
  it("should compose", () => {
    addOne.compose(double).compose(addOne)(1).should.eq("5")
    addOne.compose(double)(1).toFixed(2).should.eq("4.00")
  })
})
