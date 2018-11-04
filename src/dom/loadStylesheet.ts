import {defer} from "../promise/defer"

export async function loadStylesheet<T>(
  href: string,
  appendTo: HTMLElement = document.head,
  doc = document
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
