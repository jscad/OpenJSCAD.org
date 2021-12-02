import { isObj } from './core'

export function mapProp (obj, callback) {
  if (obj && isObj(obj)) {
    const out = {}
    for (const p in obj) {
      out[p] = callback(obj[p], p, obj)
    }
    return out
  }
}
