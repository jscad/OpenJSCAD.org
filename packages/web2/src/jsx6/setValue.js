import { isFunc } from './core'
import { mapProp } from './mapProp'

export function setValue (obj, value) {
  if (obj === null || obj === undefined) return obj

  if (isFunc(obj.setValue)) return obj.setValue(value)
  if (isFunc(obj)) return setValue(obj(), value)

  if (obj instanceof window.Element) {
    if (obj.tagName === 'INPUT' && obj.type === 'checkbox') {
      obj.checked = value
    } else {
      obj.value = value
    }
  } else {
    value = value || {}
    mapProp(value, (o, p) => {
      if (obj[p]) setValue(obj[p], value[p])
    })
  }
}
