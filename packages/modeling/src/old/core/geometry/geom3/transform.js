const poly3 = require('../poly3')

const fromPolygons = require('./fromPolygons')

/**
 * Return a new geometry that is transformed using the given Matrix.
 * This goes over EVERY point of EVERY polygon and applies the given
 * transformation matrix
 * @param {Mat4} matrix - 4x4 matrix (mat4) to be applied
 * @returns {Geom3} new Geom3 object
 * @example
 * let m = mat4.create()
 * m = mat4.multiply(mat4.rotateX(40, m))
 * m = mat4.multiply(mat4.translate([-.5, 0, 0], m))
 * const geom2 = transform(m, shapeA)
 */
const transform = (matrix, geometry) => {
  const newpolygons = geometry.polygons.map((polygon) => {
    return poly3.transform(matrix, polygon)
  })
  // create a new geometry from the transformed polygons
  const result = fromPolygons(newpolygons)
  // and retain the same state as the original
  result.isRetesselated = geometry.isRetesselated
  result.isCanonicalized = geometry.isCanonicalized
  return result
}

module.exports = transform
