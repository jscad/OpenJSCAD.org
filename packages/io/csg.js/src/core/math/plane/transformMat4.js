module.exports = transformMat4
const mat4 = require('../mat4')
const vec3 = require('../vec3')

const fromVector3Ds = require('./fromVector3Ds')
const flip = require('./flip')
const toString = require('../vec4/toString')

/**
 * Transform the given plane using the given matrix
 * @return {Array} a new plane with properly typed values
 */
function transformMat4 (matrix, plane) {
  const ismirror = mat4.isMirroring(matrix)
  // get two vectors in the plane:
  let r = vec3.random(plane)
  let u = vec3.cross(plane, r)
  let v = vec3.cross(plane, u)
  // get 3 points in the plane:
  let point1 = vec3.multiply(plane, [plane[3], plane[3], plane[3]])
  let point2 = vec3.add(point1, u)
  let point3 = vec3.add(point1, v)
  // transform the points:
  point1 = vec3.transformMat4(matrix, point1)
  point2 = vec3.transformMat4(matrix, point2)
  point3 = vec3.transformMat4(matrix, point3)
  // and create a new plane from the transformed points:
  let newplane = fromVector3Ds(point1, point2, point3)
  if (ismirror) {
    // the transform is mirroring so mirror the plane
    newplane = flip(newplane)
  }
  return newplane
}
