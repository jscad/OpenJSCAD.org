const mat4 = require('../mat4')
const vec3 = require('../vec3')

const fromPoints = require('./fromPoints')
const flip = require('./flip')

/**
 * Transform the given plane using the given matrix
 * @param {mat4} matrix - the matrix to transform with
 * @param {plane} plane - the plane to transform
 * @return {Array} a new plane
 * @alias module:modeling/maths/plane.transform
 */
const transform = (matrix, plane) => {
  const ismirror = mat4.isMirroring(matrix)
  // get two vectors in the plane:
  const r = vec3.orthogonal(plane)
  const u = vec3.cross(plane, r)
  const v = vec3.cross(plane, u)
  // get 3 points in the plane:
  let point1 = vec3.multiply(plane, [plane[3], plane[3], plane[3]])
  let point2 = vec3.add(point1, u)
  let point3 = vec3.add(point1, v)
  // transform the points:
  point1 = vec3.transform(matrix, point1)
  point2 = vec3.transform(matrix, point2)
  point3 = vec3.transform(matrix, point3)
  // and create a new plane from the transformed points:
  let newplane = fromPoints(point1, point2, point3)
  if (ismirror) {
    // the transform is mirroring so mirror the plane
    newplane = flip(newplane)
  }
  return newplane
}

module.exports = transform
