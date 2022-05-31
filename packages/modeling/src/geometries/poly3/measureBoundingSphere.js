const vec3 = require('../../maths/vec3')
const measureBoundingBox = require('./measureBoundingBox')

const cache = new WeakMap()

/**
 * Measure the bounding sphere of the given polygon.
 * @param {poly3} polygon - the polygon to measure
 * @returns {Array} the computed bounding sphere; center point (3D) and radius
 * @alias module:modeling/geometries/poly3.measureBoundingSphere
 */
const measureBoundingSphere = (polygon) => {
  let boundingBox = cache.get(polygon)
  if (boundingBox) return boundingBox

  const box = measureBoundingBox(polygon)
  const center = vec3.create()
  vec3.add(center, box[0], box[1])
  vec3.scale(center, center, 0.5)
  const radius = vec3.distance(center, box[1])

  boundingSphere = [center, radius]
  cache.set(polygon, boundingSphere)

  return boundingSphere
}

module.exports = measureBoundingSphere
