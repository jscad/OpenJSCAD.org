import { toDomNode } from './toDomNode'

export function findParent (el, filter, stopFilter) {
  let p = toDomNode(el)
  while (p) {
    if (stopFilter && stopFilter(p)) break
    if (filter(p)) return p
    p = p.parentNode
  }
}
