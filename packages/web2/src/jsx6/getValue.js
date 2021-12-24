import { isFunc } from './core'
import { mapProp } from './mapProp'

export function getValue (obj) {
  if (obj instanceof window.Element) {
    if (obj.component && isFunc(obj.component.getValue)) {
      return obj.component.getValue()
    } else if (obj.getValue) {
      return obj.getValue()
    } else {
      if (obj.tagName === 'INPUT' && obj.type === 'checkbox') {
        return obj.checked
      }
      return obj.value
    }
  } else {
    return mapProp(obj, getValue)
  }
}
