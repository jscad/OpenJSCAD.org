const mat4 = require('../../maths/mat4')
const vec2 = require('../../maths/vec2')

const create = require('./create')

/**
 * Performs a deep clone of the given geometry.
 * @param {geom2} geometry - the geometry to clone
 * @returns {geom2} new geometry
 * @alias module:modeling/geometries/geom2.clone
 */
const clone = (geometry) => {
  const out = create()
  out.sides = geometry.sides.map((side) => [vec2.clone(side[0]), vec2.clone(side[1])])
  out.transforms = mat4.clone(geometry.transforms)
  return out
}

module.exports = clone
