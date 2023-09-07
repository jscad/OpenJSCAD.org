import * as vec3 from '../vec3/index.js'
import { solve2Linear } from '../utils/solve2Linear.js'
import { EPS } from '../constants.js'

import { fromPointAndDirection } from './fromPointAndDirection.js'

/**
 * Create a line the intersection of the given planes.
 *
 * @param {Line3} out - receiving line
 * @param {Plane} plane1 - first plane of reference
 * @param {Plane} plane2 - second plane of reference
 * @returns {Line3} out
 * @alias module:modeling/maths/line3.fromPlanes
 */
export const fromPlanes = (out, plane1, plane2) => {
  let direction = vec3.cross(vec3.create(), plane1, plane2)
  let length = vec3.length(direction)
  if (length < EPS) {
    throw new Error('parallel planes do not intersect')
  }
  length = (1.0 / length)
  direction = vec3.scale(direction, direction, length)

  const absX = Math.abs(direction[0])
  const absY = Math.abs(direction[1])
  const absZ = Math.abs(direction[2])
  let origin
  let r
  if ((absX >= absY) && (absX >= absZ)) {
    // find a point p for which x is zero
    r = solve2Linear(plane1[1], plane1[2], plane2[1], plane2[2], plane1[3], plane2[3])
    origin = vec3.fromValues(0, r[0], r[1])
  } else if ((absY >= absX) && (absY >= absZ)) {
    // find a point p for which y is zero
    r = solve2Linear(plane1[0], plane1[2], plane2[0], plane2[2], plane1[3], plane2[3])
    origin = vec3.fromValues(r[0], 0, r[1])
  } else {
    // find a point p for which z is zero
    r = solve2Linear(plane1[0], plane1[1], plane2[0], plane2[1], plane1[3], plane2[3])
    origin = vec3.fromValues(r[0], r[1], 0)
  }
  return fromPointAndDirection(out, origin, direction)
}
