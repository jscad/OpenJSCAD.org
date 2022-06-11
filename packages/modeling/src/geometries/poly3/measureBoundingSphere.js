const vec3 = require('../../maths/vec3')

const cache = new WeakMap()

/**
 * Measure the bounding sphere of the given polygon.
 * @param {poly3} polygon - the polygon to measure
 * @returns {Array} the computed bounding sphere; center point (3D) and radius
 * @alias module:modeling/geometries/poly3.measureBoundingSphere
 */
const measureBoundingSphere = (polygon) => {
  let boundingSphere = cache.get(polygon)
  if (boundingSphere) return boundingSphere

  const vertices = polygon.vertices
  const center = vec3.create()

  if (vertices.length === 0) {
    center[0] = 0
    center[1] = 0
    center[2] = 0
    return [center, 0]
  }

  // keep a list of min/max vertices by axis
  let minx = vertices[0]
  let miny = minx
  let minz = minx
  let maxx = minx
  let maxy = minx
  let maxz = minx

  vertices.forEach((v) => {
    if (minx[0] > v[0]) minx = v
    if (miny[1] > v[1]) miny = v
    if (minz[2] > v[2]) minz = v
    if (maxx[0] < v[0]) maxx = v
    if (maxy[1] < v[1]) maxy = v
    if (maxz[2] < v[2]) maxz = v
  })

  center[0] = (minx[0] + maxx[0]) * 0.5 // center of sphere
  center[1] = (miny[1] + maxy[1]) * 0.5
  center[2] = (minz[2] + maxz[2]) * 0.5
  const x = center[0] - maxx[0]
  const y = center[1] - maxy[1]
  const z = center[2] - maxz[2]
  const radius = Math.sqrt(x * x + y * y + z * z) // radius of sphere

  const out = [center, radius]
  cache.set(polygon, out)

  return out
}

module.exports = measureBoundingSphere
