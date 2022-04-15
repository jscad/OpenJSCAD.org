import { isArray } from '.'
import { isObj } from './core'

export const mapPropArray = (obj, callback) => mapProp(obj, callback, true)

export function mapProp (obj, callback, asArray) {
  if (obj) {
    if (isObj(obj)) {
      const out = isArray ? [] : {}
      if (asArray) {
        for (const p in obj) {
          out.push(callback(obj[p], p, obj))
        }
      } else {
        const out = {}
        for (const p in obj) {
          out[p] = callback(obj[p], p, obj)
        }
      }
      return out
    } else if (isArray(obj)) {
      return obj.map(callback)
    }
  }
}
