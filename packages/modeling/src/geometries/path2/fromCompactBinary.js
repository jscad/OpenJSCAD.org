import * as mat4 from '../../maths/mat4/index.js'
import * as vec2 from '../../maths/vec2/index.js'

import { create } from './create.js'

/**
 * Create a new path from the given compact binary data.
 * @param {TypedArray} data - compact binary data
 * @returns {Path2} a new path
 * @alias module:modeling/geometries/path2.fromCompactBinary
 */
export const fromCompactBinary = (data) => {
  if (data[0] !== 2) throw new Error('invalid compact binary data')

  const created = create()

  created.transforms = mat4.clone(data.slice(1, 17))

  created.isClosed = !!data[17]

  for (let i = 22; i < data.length; i += 2) {
    const point = vec2.fromValues(data[i], data[i + 1])
    created.points.push(point)
  }
  // transfer known properties, i.e. color
  if (data[18] >= 0) {
    created.color = [data[18], data[19], data[20], data[21]]
  }
  // TODO: how about custom properties or fields ?
  return created
}
