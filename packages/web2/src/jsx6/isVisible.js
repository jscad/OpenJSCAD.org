import { getAttrBoolean } from './getAttrBoolean'

export function isVisible (obj, sel) {
  return getAttrBoolean(obj, 'hidden', true)
}
