import { isFunc } from "./core"
import { mapProp } from './mapProp'

export function setValue (obj, value) {
  if (obj instanceof window.Element) {
    if (obj.component && isFunc(obj.component.setValue)) {
      obj.component.setValue(value)
    } else if (obj.setValue) {
      obj.setValue(value)
    } else {
      if (obj.tagName === 'INPUT' && obj.type === 'checkbox') {
        obj.checked = value
      } else {
        obj.value = value
      }
    }
  } else {
    value = value || {}
    return mapProp(obj, (o, p) => {
      setValue(o, value[p])
    })
  }
}
