import * as vec3 from '../vec3/index.js'

/**
 * Determine the closest point on the given plane to the given line.
 *
 * NOTES:
 * The point of intersection will be invalid if the line is parallel to the plane, e.g. NaN.
 *
 * @param {Line3} line - line of reference
 * @param {Plane} plane - plane of reference
 * @returns {Vec3} a point on the line
 * @alias module:modeling/maths/line3.intersectPointOfLineAndPlane
 */
export const intersectPointOfLineAndPlane = (line, plane) => {
  // plane: plane.normal * p = plane.w
  const pNormal = plane
  const pw = plane[3]

  const lPoint = line[0]
  const lDirection = line[1]

  // point: p = line.point + labda * line.direction
  const labda = (pw - vec3.dot(pNormal, lPoint)) / vec3.dot(pNormal, lDirection)

  return vec3.add(vec3.create(), lPoint, vec3.scale(vec3.create(), lDirection, labda))
}
