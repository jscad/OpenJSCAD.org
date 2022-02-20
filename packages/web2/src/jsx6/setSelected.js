import { mapProp } from './mapProp'
import { Group } from './core'
import { setAttrBoolean } from './setAttrBoolean'

export function setSelected (obj, sel) {
  if (!obj) return
  if (obj instanceof Group) {
    mapProp(obj, (o, p) => setSelected(o, p === sel))
  } else {
    setAttrBoolean(obj, 'selected', sel)
  }
}
