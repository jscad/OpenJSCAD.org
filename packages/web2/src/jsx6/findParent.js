import { toDomNode } from './toDomNode'

export function findParent (el, filter) {
  let p = toDomNode(el)
  while (p) {
    if (filter(p)) return p
    p = p.parentNode
  }
}
