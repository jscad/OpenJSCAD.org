const mat4 = require('../../maths/mat4')
const vec2 = require('../../maths/vec2')

const create = require('./create')

/**
 * Create a new 2D geometry from the given compact binary data.
 * @param {Array} data - compact binary data
 * @returns {geom2} a new geometry
 * @alias module:modeling/geometries/geom2.fromCompactBinary
 */
const fromCompactBinary = (data) => {
  if (data[0] !== 0) throw new Error('invalid compact binary data')

  const created = create()

  created.transforms = mat4.clone(data.slice(1, 17))

  for (let i = 21; i < data.length; i += 4) {
    const point0 = vec2.fromValues(data[i + 0], data[i + 1])
    const point1 = vec2.fromValues(data[i + 2], data[i + 3])
    created.sides.push([point0, point1])
  }
  // transfer known properties, i.e. color
  if (data[17] >= 0) {
    created.color = [data[17], data[18], data[19], data[20]]
  }
  // TODO: how about custom properties or fields ?
  return created
}

module.exports = fromCompactBinary
