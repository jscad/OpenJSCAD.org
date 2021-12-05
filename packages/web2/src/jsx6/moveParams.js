
export function moveParams (obj, defaults, params) {
  for (const p in defaults) {
    if (p in params) {
      obj[p] = params[p]
      delete params[p]
    } else {
      obj[p] = defaults[p]
    }
  }
}
