import * as mat4 from '../../maths/mat4/index.js'
import * as vec2 from '../../maths/vec2/index.js'

import create from './create.js'

/**
 * Create a new 2D geometry from the given compact binary data.
 * @param {Array} data - compact binary data
 * @returns {geom2} a new geometry
 * @alias module:modeling/geometries/geom2.fromCompactBinary
 */
export const fromCompactBinary = (data) => {
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

export default fromCompactBinary
