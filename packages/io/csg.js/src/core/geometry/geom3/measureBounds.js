const vec3 = require('../../../math/vec3')
const measureBoundingBox = require('../../poly3/measureBoundingBox')

/**
 * Returns the AABB (axis aligned bounding box) of the given geometry
 * as an arry of 
 * @returns {Array[]}
 * @example
 * let bounds = A.getBounds()
 * let minX = bounds[0].x
 */
const measureBounds = geometry => {
  if (!geometry.cachedBoundingBox) {
    let minpoint = vec3.create()
    let maxpoint = vec3.create()
    let polygons = geometry.polygons
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
    geometry.cachedBoundingBox = [minpoint, maxpoint]
  }
  return geometry.cachedBoundingBox
}

module.exports = measureBounds
