import { mapProp } from './mapProp'
import { Group } from './core'
import { setAttrBoolean } from './setAttrBoolean'

export function setEnabled (obj, sel) {
  if (!obj) return
  if (obj instanceof Group) {
    mapProp(obj, (o, p) => setEnabled(o, p === sel))
  } else {
    setAttrBoolean(obj, 'disabled', !sel)
  }
}
