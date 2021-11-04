import { mapProp } from './mapProp'

export function getValue (obj) {
  if (obj instanceof window.HTMLElement) {
    if (obj.component && typeof obj.component.getValue === 'function') {
      return obj.component.getValue
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
