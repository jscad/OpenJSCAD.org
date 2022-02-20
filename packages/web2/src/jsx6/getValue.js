import { isFunc } from './core'
import { mapProp } from './mapProp'

export function getValue (obj) {
  if (obj === null || obj === undefined) return obj

  if (isFunc(obj.getValue)) return obj.getValue()
  if (isFunc(obj)) return getValue(obj())

  if (obj instanceof window.Element) {
    if (obj.tagName === 'INPUT' && obj.type === 'checkbox') {
      return obj.checked
    }
  } else {
    if (typeof obj === 'object') return mapProp(obj, getValue)
  }

  return obj.value
}
