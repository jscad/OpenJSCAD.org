const mat4 = require('../../math/mat4')
const vec2 = require('../../math/vec2')

const create = require('./create')

/**
 * Create a new 2D geometry from the given compact binary data.
 * @param {Array} data - compact binary data
 * @returns {geom2} a new geometry
 * @alias module:modeling/geometry/geom2.fromCompactBinary
 */
const fromCompactBinary = data => {
  if (data[0] !== 0) throw new Error('invalid compact binary data')

  const created = create()

  created.transforms = mat4.clone(data.slice(1, 17))

  for (let i = 17; i < data.length; i += 4) {
    const point0 = vec2.fromValues(data[i + 0], data[i + 1])
    const point1 = vec2.fromValues(data[i + 2], data[i + 3])
    created.sides.push([point0, point1])
  }
  return created
}

module.exports = fromCompactBinary
