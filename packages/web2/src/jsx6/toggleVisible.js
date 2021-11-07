import { setAttrBoolean } from './setAttrBoolean'

export function toggleVisible (obj, sel) {
  setAttrBoolean(obj, 'hidden', !sel)
}
