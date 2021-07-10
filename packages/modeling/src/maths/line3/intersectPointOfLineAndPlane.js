const vec3 = require('../vec3')

/**
 * Determine the closest point on the given plane to the given line.
 *
 * NOTES:
 * The point of intersection will be invalid if the line is parallel to the plane, e.g. NaN.
 *
 * @param {line3} line - line of reference
 * @param {plane} plane - plane of reference
 * @returns {vec3} a point on the line
 * @alias module:modeling/maths/line3.intersectPointOfLineAndPlane
 */
const intersectToPlane = (line, plane) => {
  // plane: plane.normal * p = plane.w
  const pnormal = plane
  const pw = plane[3]

  const lpoint = line[0]
  const ldirection = line[1]

  // point: p = line.point + labda * line.direction
  const labda = (pw - vec3.dot(pnormal, lpoint)) / vec3.dot(pnormal, ldirection)

  const point = vec3.add(vec3.create(), lpoint, vec3.scale(vec3.create(), ldirection, labda))
  return point
}

module.exports = intersectToPlane
