import { toDomNode } from './toDomNode'

export function insertBefore (parent, newChild, before) {
  return toDomNode(parent).insertBefore(toDomNode(newChild), toDomNode(before))
}
