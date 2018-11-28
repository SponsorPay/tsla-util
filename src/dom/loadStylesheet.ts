import {defer} from "../promise/defer"
import {poll, PollOptions} from "../promise/poll"

export interface LoadStylesheetOptions {
  pollOptions?: PollOptions
  doc?: Document
  appendTo?: HTMLElement
}

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
  options: LoadStylesheetOptions = {},
) {
  return Promise.race([
    loadStylesheetPreload(href, options),
    loadStylesheetPoll(href, options),
  ])
}

export async function loadStylesheetPoll(
  href: string,
  options: LoadStylesheetOptions = {},
) {
  const {doc = document, appendTo = document.head, pollOptions} = options
  const {promise, resolve} = defer<void>()
  const link = doc.createElement("link")
  link.setAttribute("href", href)
  link.setAttribute("as", "style")
  link.setAttribute("rel", "stylesheet")
  appendTo.appendChild(link)
  return poll(() => isStylesheetInPage(href, doc.styleSheets), pollOptions)
}

export async function loadStylesheetPreload(
  href: string,
  options: LoadStylesheetOptions = {},
) {
  const {doc = document, appendTo = document.head} = options
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
