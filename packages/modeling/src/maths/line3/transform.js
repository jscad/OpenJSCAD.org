import * as vec3 from '../vec3/index.js'

import { fromPointAndDirection } from './fromPointAndDirection.js'

/**
 * Transforms the given line using the given matrix.
 *
 * @param {line3} out - line to update
 * @param {line3} line - line to transform
 * @param {mat4} matrix - matrix to transform with
 * @returns {line3} a new unbounded line
 * @alias module:modeling/maths/line3.transform
 */
export const transform = (out, line, matrix) => {
  const point = line[0]
  const direction = line[1]
  const pointPlusDirection = vec3.add(vec3.create(), point, direction)

  const newPoint = vec3.transform(vec3.create(), point, matrix)
  const newPointPlusDirection = vec3.transform(pointPlusDirection, pointPlusDirection, matrix)
  const newDirection = vec3.subtract(newPointPlusDirection, newPointPlusDirection, newPoint)

  return fromPointAndDirection(out, newPoint, newDirection)
}
