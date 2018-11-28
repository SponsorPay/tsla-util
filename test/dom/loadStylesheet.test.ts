import {expect} from "chai"
import {loadStylesheet} from "../../src/dom/loadStylesheet"

interface MockElement extends HTMLElement {

}

class MockElement implements HTMLElement {
  elements: Node[] = []
  attrs: Map<string, string> = new Map()

  appendChild<T extends Node>(newChild: T) {
    this.elements.push(newChild)
    return newChild
  }

  onload: ((ev: Event) => any) | null = null

  setAttribute(qualifiedName: string, value: string) {
    this.attrs.set(qualifiedName, value)
  }

  getAttribute(name: string) {
    return this.attrs.get(name) as string | null
  }
}

interface MockStyleSheets extends StyleSheetList {

}

class MockStyleSheets implements StyleSheetList {
  arr: StyleSheet[] = []

  item(index: number) {
    return this.arr[index]
  }

  [index: number]: StyleSheet

  get length() {
    return this.arr.length
  }
}

interface MockDocument extends Document {

}

class MockDocument implements Document {
  styleSheets = new MockStyleSheets()

  createElement<K extends keyof HTMLElementTagNameMap>(tagName: K, options?: ElementCreationOptions): HTMLElement {
    return new MockElement();
  }
}

describe("loadStylesheet.test", function () {
  it("should loadStylesheet", async () => {
    const doc = new MockDocument()
    const head = new MockElement()
    const promise = loadStylesheet("https://example.com/style.css", head, doc)
    expect(head.elements.length).to.eq(2)
    expect(head.elements.every(el => {
      return el instanceof MockElement &&
        el.getAttribute("href") === "https://example.com/style.css"
    })).to.eq(true)
  })
})
