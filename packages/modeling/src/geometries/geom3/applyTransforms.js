const mat4 = require('../../maths/mat4')

const poly3 = require('../poly3')

/*
 * Apply the transforms of the given geometry.
 * NOTE: This function must be called BEFORE exposing any data. See toPolygons.
 * @param {geom3} geometry - the geometry to transform
 * @returns {geom3} the given geometry
 * @example
 * geometry = applyTransforms(geometry)
 */
const applyTransforms = (geometry) => {
  if (mat4.isIdentity(geometry.transforms)) return geometry

  // apply transforms to each polygon
  geometry.polygons = geometry.polygons.map((polygon) => poly3.transform(geometry.transforms, polygon))
  // reset transforms
  geometry.transforms = mat4.create()
  return geometry
}

module.exports = applyTransforms
