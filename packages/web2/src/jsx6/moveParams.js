
export function moveParams (defaults, params, obj = {}) {
  for (const p in defaults) {
    if (p in params) {
      obj[p] = params[p]
      delete params[p]
    } else {
      obj[p] = defaults[p]
    }
  }
  return obj
}
