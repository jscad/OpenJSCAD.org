import { setAttrBoolean } from './setAttrBoolean'

export function setEnabled (obj, sel) {
  setAttrBoolean(obj, 'disabled', !sel)
}
