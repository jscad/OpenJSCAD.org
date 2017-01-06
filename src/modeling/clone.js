export function clone (obj) {
  if (obj === null || typeof obj !== 'object') return obj
  var copy = obj.constructor()
  for (var attr in obj) {
    if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr]
  }
  return copy
}
