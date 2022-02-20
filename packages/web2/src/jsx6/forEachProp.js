import { isArray } from '.'
import { isObj } from './core'

export function forEachProp (obj, callback) {
  if (obj) {
    if (isObj(obj)) {
      for (const p in obj) {
        callback(obj[p], p, obj)
      }
    } else if (isArray(obj)) {
      obj.forEach(callback)
    }
  }
}
