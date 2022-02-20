import { isArray } from '.'
import { isObj } from './core'

export function mapProp (obj, callback) {
  if (obj) {
    if (isObj(obj)) {
      const out = {}
      for (const p in obj) {
        out[p] = callback(obj[p], p, obj)
      }
      return out
    } else if (isArray(obj)) {
      return obj.map(callback)
    }
  }
}
