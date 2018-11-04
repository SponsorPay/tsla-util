import {expect} from "chai"
import {ChildAppendable, ElementCreator, Linkable, loadStylesheet} from "../../src/dom/loadStylesheet"

require("chai").should()

interface MockElement extends HTMLElement {

}

class MockElement implements ChildAppendable, Linkable, HTMLElement {
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

class MockDocument implements ElementCreator {
  createElement<K extends keyof HTMLElementTagNameMap>(tagName: K, options?: ElementCreationOptions): HTMLElement {
    return new MockElement();
  }
}

describe("loadStylesheet.test", function () {
  it("should loadStylesheet", async () => {
    const doc = new MockDocument()
    const head = new MockElement()
    const promise = loadStylesheet("https://example.com/style.css", head, doc)
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
})
