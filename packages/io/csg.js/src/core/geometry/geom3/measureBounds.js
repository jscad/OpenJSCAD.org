const vec3 = require('../../math/vec3')
const measureBoundingBox = require('../poly3/measureBoundingBox')

/**
 * Measure the bounding box of the given geometry.
 *
 * @param {Geom3} geometry - 3D geometry to measure
 * @returns {Array[minpoint, maxpoint]}
 */
const measureBounds = (geometry) => {
  let minpoint = vec3.create()
  let maxpoint = vec3.create()
  for (let i = 0; i < geometry.polygons.length; i++) {
    let bounds = measureBoundingBox(geometry.polygons[i])
    if (i === 0) {
      vec3.clone(minpoint, bounds[0])
      vec3.clone(maxpoint, bounds[1])
    } else {
      vec3.min(minpoint, minpoint, bounds[0])
      vec3.max(maxpoint, maxpoint, bounds[1])
    }
  }
  return [minpoint, maxpoint]
}

module.exports = measureBounds
