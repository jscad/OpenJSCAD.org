const vec3 = require('../../maths/vec3')
const measureBoundingBox = require('./measureBoundingBox')

/**
 * Measure the bounding sphere of the given polygon.
 * @param {poly3} polygon - the polygon to measure
 * @returns {Array} the computed bounding sphere; center point (3D) and radius
 * @alias module:modeling/geometries/poly3.measureBoundingSphere
 */
const measureBoundingSphere = (poly3) => {
  const box = measureBoundingBox(poly3)
  const center = box[0]
  vec3.add(center, box[0], box[1])
  vec3.scale(center, center, 0.5)
  const radius = vec3.distance(center, box[1])
  return [center, radius]
}

module.exports = measureBoundingSphere
