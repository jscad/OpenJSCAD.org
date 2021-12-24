import { isObj } from "./core"

export function forEachProp (obj, callback) {
  if (obj && isObj(obj)) {
    for (const p in obj) {
      callback(obj[p], p, obj)
    }
  }
}
