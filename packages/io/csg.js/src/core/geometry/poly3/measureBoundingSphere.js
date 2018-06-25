const vec3 = require('../../math/vec3')
const measureBoundingBox = require('./measureBoundingBox')

/** compute's a poly3's bounding sphere
 * returns an array with a vec3 (center point) and a radius
 * @param {poly3} the poly3 to measure
 * @returns the computed bounding sphere
 */
const measureBoundingSphere = poly3 => {
  if (!poly3.cachedBoundingSphere) {
    const box = measureBoundingBox(poly3)
    const middle = vec3.scale(0.5,
      vec3.add(box[0], box[1])
    )
    let radius3 = vec3.subtract(box[1], middle)
    let radius = radius3.length()
    poly3.cachedBoundingSphere = [middle, radius]
  }
  return poly3.cachedBoundingSphere
}

module.exports = measureBoundingSphere
