import {Component, Element, IO, render} from "../../src/compose"
import {delay} from "../../src/promise/delay"

class AddOne implements Component<number | string, number> {
  constructor(public child: Element<number, any>) {
  }

  apply = <R>(next: IO<number, R>) => (n: number | string) => {
    console.log("add 1 to", n)
    return next(Number(n) + 1)
  }

  render() {
    return this.child
  }
}

class Square implements Component<number, number> {
  constructor(public child: Element<number, any>) {
  }

  apply = <R>(next: (n: number) => R) => (n: number) => {
    console.log("square", n)
    return next(Math.pow(n, 2))
  }

  render() {
    return this.child
  }
}

class AsyncData implements Component<number, string> {
  context!: {
    service: () => Promise<string>
  }

  constructor(public child: Element<string, any>) {
  }

  apply = <R>(next: (n: string) => R) => async (source: number) => {
    console.log("waiting for service, source is", source)
    const addition = await this.context.service()
    console.log("addition is", addition)
    const rand = String(Number(addition) + Math.round(Math.random() * source))
    console.log("finished wait, got:", rand)
    return next(rand)
  }

  render() {
    return this.child
  }
}

class AddOneAndSquare implements Component<number, number> {
  apply = <R>(next: (n: number) => R) => {
    console.log("hardcoded")
    return next(20)
  }

  getChildContext() {
    return {
      service: async () => {
        await delay(500)
        return "5"
      }
    }
  }

  render() {
    return new AsyncData(
      new AddOne(
        new Square(null)
      )
    )
  }
}

describe("render.test", function () {
  it("should", async () => {
    const apply = render(new AddOneAndSquare())
    console.log(await apply())
  })
})
