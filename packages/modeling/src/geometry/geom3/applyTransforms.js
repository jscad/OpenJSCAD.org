const mat4 = require('../../math/mat4')

const poly3 = require('../poly3')

/**
 * Apply the transforms of the given geometry.
 * NOTE: This function must be called BEFORE exposing any data. See toPolygons.
 * @param {geom3} geometry - the geometry to transform
 * @returns {geom3} the given geometry
 * @example
 * geometry = applyTransforms(geometry)
 */
const applyTransforms = (geometry) => {
  if (mat4.equals(geometry.transforms, mat4.identity())) return geometry

  // apply transforms to each polygon
  const isMirror = mat4.isMirroring(geometry.transforms)
  geometry.polygons = geometry.polygons.map((polygon) => {
    // TBD if (isMirror) newvertices.reverse()
    return poly3.transform(geometry.transforms, polygon)
  })
  mat4.identity(geometry.transforms)
  return geometry
}

module.exports = applyTransforms
