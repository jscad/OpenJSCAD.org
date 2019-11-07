const mat4 = require('../../math/mat4')

const poly3 = require('../poly3')

const create = require('./create')

/**
 * Performs a deep clone of the given geometry.
 * @params {geom3} geometry - the geometry to clone
 * @returns {geom3} a new geometry
 */
const clone = (geometry) => {
  let out = create()
  out.polygons = geometry.polygons.map((polygon) => poly3.clone(polygon))
  out.isRetesselated = geometry.isRetesselated
  out.transforms = mat4.clone(geometry.transforms)
  return out
}

module.exports = clone
