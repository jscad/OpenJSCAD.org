import { toDomNode } from './toDomNode'

export function insertBefore (parent, newChild, before) {
  const _parent = toDomNode(parent)
  if (!_parent) console.error('null parent', _parent, parent, newChild, before)
  _parent.insertBefore(toDomNode(newChild), toDomNode(before))
  return newChild
}
