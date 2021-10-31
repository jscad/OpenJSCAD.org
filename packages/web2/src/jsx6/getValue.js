import mapProp from './mapProp'

export default function getValue (obj) {
  if (obj instanceof HTMLElement) {
    if (obj.component && typeof obj.component.getValue === 'function') {
      return obj.component.getValue
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
