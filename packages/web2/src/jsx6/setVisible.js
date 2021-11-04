import { setAttrBoolean } from './setAttrBoolean'

export function setVisible (obj, sel) {
  setAttrBoolean(obj, 'hidden', !sel)
}
