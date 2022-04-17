import { throwErr, ERR_REQUIRE_PARENT } from './core'
import { toDomNode } from './toDomNode'

export function insertBefore (parent, newChild, before) {
  if (!parent) throwErr(ERR_REQUIRE_PARENT, { parent, newChild, before })
  const _parent = parent.insertBefore ? parent : toDomNode(parent)
  if (!_parent.insertBefore) console.error('missing insertBefore', _parent, parent)
  if (newChild.__init) {
    newChild.setParent(parent)
    newChild.__init()
  }
  _parent.insertBefore(toDomNode(newChild), toDomNode(before))
  return newChild
}
