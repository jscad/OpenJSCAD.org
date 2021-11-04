export function forEachProp (obj, callback) {
  if (obj && typeof obj === 'object') {
    for (const p in obj) {
      callback(obj[p], p, obj)
    }
  }
}
