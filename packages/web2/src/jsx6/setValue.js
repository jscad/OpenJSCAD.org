import { mapProp } from './mapProp'

export function setValue (obj, value) {
  if (obj instanceof window.HTMLElement) {
    if (obj.component && typeof obj.component.getValue === 'function') {
      return obj.component.getValue(value)
    } else if (obj.getValue) {
      return obj.setValue(value)
    } else {
      if (obj.tagName === 'INPUT' && obj.type === 'checkbox') {
        obj.checked = value
      } else {
        obj.value = value
      }
    }
  } else {
    value = value || {}
    return mapProp(obj, (o, p) => setValue(o, value[p]))
  }
}
