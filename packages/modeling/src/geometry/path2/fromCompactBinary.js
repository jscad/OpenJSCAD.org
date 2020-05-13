const mat4 = require('../../math/mat4')
const vec2 = require('../../math/vec2')

const create = require('./create')

/**
 * Create a new path from the given compact binary data.
 * @param {Array} data - compact binary data
 * @returns {path2} a new path
 * @alias module:modeling/geometry/path2.fromCompactBinary
 */
const fromCompactBinary = data => {
  if (data[0] != 2) throw new Error('invalid compact binary data')

  const created = create()

  created.transforms = mat4.clone(data.slice(1, 17))

  created.isClosed = !!data[17]

  for (let i = 18; i < data.length; i += 2) {
    const point = vec2.fromValues(data[i], data[i + 1])
    created.points.push(point)
  }
  // TODO transfer known properties, i.e. color
  return created
}

module.exports = fromCompactBinary
