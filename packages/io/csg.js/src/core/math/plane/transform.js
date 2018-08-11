module.exports = transform
const mat4 = require('../mat4')
const vec3 = require('../vec3')
const fromVector3Ds = require('./fromVector3Ds')
const flip = require('./flip')

/**
 * Transform the given plane using the given matrix
 * @return {Array} a new plane with properly typed values
 */
function transform (plane, matrix) {
  const ismirror = mat4.isMirroring(matrix)
  // get two vectors in the plane:
  let r = vec3.randomNonParallelVector(plane)
  let u = vec3.cross(plane, r)
  let v = vec3.cross(plane, u)
  // get 3 points in the plane:
  let point1 = vec3.times(plane, plane[3])
  let point2 = vec3.plus(point1, u)
  let point3 = vec3.plus(point1, v)
  // transform the points:
  point1 = vec3.multiply4x4(point1, matrix4x4)
  point2 = vec3.multiply4x4(point2, matrix4x4)
  point3 = vec3.multiply4x4(point3, matrix4x4)
  // and create a new plane from the transformed points:
  let newplane = fromVector3Ds(point1, point2, point3)
  if (ismirror) {
    // the transform is mirroring so mirror the plane
    newplane = flip(newplane)
  }
  return newplane
}
