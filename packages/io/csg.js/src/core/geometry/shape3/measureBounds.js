const vec3 = require('../../math/vec3')
const measureBoundingBox = require('../poly3/measureBoundingBox')
/**
 * Returns an array of Vector3D, providing minimum coordinates and maximum coordinates
 * of this solid.
 * @returns {Vector3D[]}
 * @example
 * let bounds = A.getBounds()
 * let minX = bounds[0].x
 */
const bounds = function (shape) {
  if (!shape.cachedBoundingBox) {
    let minpoint = vec3.create()
    let maxpoint = vec3.create()
    let polygons = shape.polygons
    let numpolygons = polygons.length
    for (let i = 0; i < numpolygons; i++) {
      let polygon = polygons[i]
      let bounds = measureBoundingBox(polygon)
      if (i === 0) {
        minpoint = bounds[0]
        maxpoint = bounds[1]
      } else {
        minpoint = vec3.min(minpoint, bounds[0])
        maxpoint = vec3.max(maxpoint, bounds[1])
      }
    }
    // FIXME: not ideal, we are mutating the input, we need to move some of it out
    shape.cachedBoundingBox = [minpoint, maxpoint]
  }
  return shape.cachedBoundingBox
}

module.exports = bounds
