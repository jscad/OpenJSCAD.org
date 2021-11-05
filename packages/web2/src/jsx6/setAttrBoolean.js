import { Jsx6 } from './core'

export function setAttrBoolean (obj, attr, value) {
  if (obj) {
    if (obj.setAttribute) {
      if (value) {
        obj.setAttribute(attr, attr)
      } else {
        obj.removeAttribute(attr)
      }
    } else if (obj instanceof Jsx6) {
      setAttrBoolean(obj.el, attr, value)
    } else if (typeof obj === 'object') {
      for (const p in obj) {
        setAttrBoolean(obj[p], attr, p === value)
      }
    }
  }
}
