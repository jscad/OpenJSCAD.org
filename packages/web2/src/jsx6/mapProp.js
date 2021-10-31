export default function mapProp (obj, callback) {
  if (obj && typeof obj === 'object') {
    const out = {}
    for (const p in obj) {
      out[p] = callback(obj[p], p, obj)
    }
    return out
  }
}
