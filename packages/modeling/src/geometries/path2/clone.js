const mat4 = require('../../maths/mat4')
const vec2 = require('../../maths/vec2')

const create = require('./create')

/**
 * Performs a deep clone of the give geometry.
 * @param {path2} geometry - the geometry to clone
 * @returns {path2} a new path
 * @alias module:modeling/geometries/path2.clone
 */
const clone = (geometry) => {
  const out = create()
  out.points = geometry.points.map((point) => vec2.clone(point))
  out.isClosed = geometry.isClosed
  out.transforms = mat4.clone(geometry.transforms)
  return out
}

module.exports = clone
