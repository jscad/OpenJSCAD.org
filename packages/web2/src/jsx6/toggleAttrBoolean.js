import { setAttrBoolean } from './setAttrBoolean'
import { getAttrBoolean } from './getAttrBoolean'

export function toggleAttrBoolean (obj, attr, sel) {
  if (sel === undefined) sel = !getAttrBoolean(obj, attr)
  setAttrBoolean(obj, attr, sel)
  return sel
}
