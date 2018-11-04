import {defer} from "../promise/defer"

export type Linkable = Pick<HTMLElement, "setAttribute" | "onload">

export interface ChildAppendable {
  appendChild<T extends Node>(newChild: T): T;
}

export interface ElementCreator {
  createElement<K extends keyof HTMLElementTagNameMap>(
    tagName: K,
    options?: ElementCreationOptions
  ): HTMLElement
}

export async function loadStylesheet<T>(
  href: string,
  appendTo: ChildAppendable = document.head,
  doc: ElementCreator = document
) {
  const {promise, resolve} = defer<void>()
  const link = doc.createElement("link")
  link.setAttribute("href", href)
  link.setAttribute("as", "style")
  link.setAttribute("rel", "preload")
  link.onload = () => resolve()
  appendTo.appendChild(link)
  await promise
  link.setAttribute("rel", "stylesheet")
  return promise
}
