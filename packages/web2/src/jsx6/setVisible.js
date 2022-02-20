import { mapProp } from './mapProp'
import { Group } from './core'
import { setAttrBoolean } from './setAttrBoolean'

export function setVisible (obj, sel) {
  if (!obj) return
  if (obj instanceof Group) {
    mapProp(obj, (o, p) => setVisible(o, p === sel))
  } else {
    setAttrBoolean(obj, 'hidden', !sel)
  }
}
