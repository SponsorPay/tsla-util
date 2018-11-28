import {expect} from "chai"
import {loadStylesheet, loadStylesheetPoll, loadStylesheetPreload} from "../../src/dom/loadStylesheet"

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
  it("should loadStylesheetPoll", async () => {
    const doc = new MockDocument()
    const head = new MockElement()
    const promise = loadStylesheetPoll("https://example.com/style.css", {
      appendTo: head,
      doc
    })
    const el = head.elements[0]
    expect(el).to.be.instanceOf(MockElement)
    if (el instanceof MockElement) {
      expect(el.getAttribute("href")).to.eq("https://example.com/style.css")
      expect(el.getAttribute("rel")).to.eq("stylesheet")
      expect(el.getAttribute("as")).to.eq("style")
      setTimeout(() => {
        doc.styleSheets.arr.push({
          href: "https://example.com/style.css"
        } as any)
      }, 10)
      await promise
    }
  })

  it("should loadStylesheetPreload", async () => {
    const doc = new MockDocument()
    const head = new MockElement()
    const promise = loadStylesheetPreload("https://example.com/style.css", {
      appendTo: head, doc
    })
    const el = head.elements[0]
    expect(el).to.be.instanceOf(MockElement)
    if (el instanceof MockElement) {
      expect(el.getAttribute("href")).to.eq("https://example.com/style.css")
      expect(typeof el.onload).to.eq("function")
      expect(el.getAttribute("rel")).to.eq("preload")
      expect(el.getAttribute("as")).to.eq("style")
      el.onload!(null as any)
      await promise
      expect(el.getAttribute("rel")).to.eq("stylesheet")
    }
  })

  it("should loadStylesheet", async () => {
    const doc = new MockDocument()
    const head = new MockElement()
    const promise = loadStylesheet("https://example.com/style.css", {
      appendTo: head, doc
    })
    setTimeout(() => {
      doc.styleSheets.arr.push({
        href: "https://example.com/style.css"
      } as any)
    }, 10)
    await promise
  })
})
