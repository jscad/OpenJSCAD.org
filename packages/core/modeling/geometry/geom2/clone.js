const mat4 = require('../../math/mat4')
const vec2 = require('../../math/vec2')

const create = require('./create')

/**
 * Performs a deep clone of the given geometry.
 * @params {geom2} geometry - the geometry to clone
 * @returns {geom2} new geometry
 */
const clone = (geometry) => {
  let out = create()
  out.sides = geometry.sides.map((side) => {
    return [vec2.clone(side[0]), vec2.clone(side[1])]
  })
  out.transforms = mat4.clone(geometry.transforms)
  return out
}

module.exports = clone
