const mat4 = require('../../math/mat4')
const vec2 = require('../../math/vec2')

const create = require('./create')

/**
 * Performs a deep clone of the give path.
 * @param {path2} geometry - the geometry to clone
 * @returns {path2} new path
 */
const clone = (geometry) => {
  let out = create()
  out.points = geometry.points.map((point) => vec2.clone(point))
  out.isClosed = geometry.isClosed
  out.transforms = mat4.clone(geometry.transforms)
  return out
}

module.exports = clone
