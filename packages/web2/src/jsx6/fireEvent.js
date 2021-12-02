import { toDomNode } from './toDomNode'

export function fireEvent (el, name, detail, opts) {
  toDomNode(el).dispatchEvent(new CustomEvent(name, { detail, ...opts }))
}
