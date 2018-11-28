import {defer} from "../promise/defer"
import {poll} from "../promise/poll"

function isStylesheetInPage(href: string, styleSheets: StyleSheetList) {
  for (let i = 0; i < styleSheets.length; i++) {
    const sheet = styleSheets.item(i)
    if (sheet != null && sheet.href === href) {
      return true
    }
  }
  return false
}

export async function loadStylesheet(
  href: string,
  appendTo: HTMLElement = document.head,
  doc = document
) {
  return Promise.race([
    loadStylesheetPreload(href, appendTo, doc),
    loadStylesheetPoll(href, appendTo, doc),
  ])
}

export async function loadStylesheetPoll(
  href: string,
  appendTo: HTMLElement = document.head,
  doc = document
) {
  const {promise, resolve} = defer<void>()
  const link = doc.createElement("link")
  link.setAttribute("href", href)
  link.setAttribute("as", "style")
  link.setAttribute("rel", "stylesheet")
  appendTo.appendChild(link)
  return poll(() => isStylesheetInPage(href, doc.styleSheets))
}

export async function loadStylesheetPreload(
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
}
