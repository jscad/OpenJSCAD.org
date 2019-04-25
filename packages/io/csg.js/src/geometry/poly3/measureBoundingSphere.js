const vec3 = require('../../math/vec3')
const measureBoundingBox = require('./measureBoundingBox')

/** Measure the bounding sphere of the given poly3
 * @param {poly3} the poly3 to measure
 * @returns computed bounding sphere; center (vec3) and radius
 */
const measureBoundingSphere = (poly3) => {
  const box = measureBoundingBox(poly3)
  const center = vec3.scale(0.5, vec3.add(box[0], box[1]))
  const radius = vec3.distance(center, box[1])
  return [center, radius]
}

module.exports = measureBoundingSphere
