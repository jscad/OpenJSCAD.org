const mat4 = require('../mat4')
const vec3 = require('../vec3')

const fromPoints = require('./fromPoints')
const flip = require('./flip')

/**
 * Transform the given plane using the given matrix
 *
 * @param {plane} out - receiving plane
 * @param {plane} plane - plane to transform
 * @param {mat4} matrix - matrix to transform with
 * @return {plane} out
 * @alias module:modeling/maths/plane.transform
 */
const transform = (out, plane, matrix) => {
  const ismirror = mat4.isMirroring(matrix)
  // get two vectors in the plane:
  const r = vec3.orthogonal(vec3.create(), plane)
  const u = vec3.cross(r, plane, r)
  const v = vec3.cross(vec3.create(), plane, u)
  // get 3 points in the plane:
  let point1 = vec3.fromScalar(vec3.create(), plane[3])
  vec3.multiply(point1, point1, plane)
  let point2 = vec3.add(vec3.create(), point1, u)
  let point3 = vec3.add(vec3.create(), point1, v)
  // transform the points:
  point1 = vec3.transform(point1, point1, matrix)
  point2 = vec3.transform(point2, point2, matrix)
  point3 = vec3.transform(point3, point3, matrix)
  // and create a new plane from the transformed points:
  fromPoints(out, point1, point2, point3)
  if (ismirror) {
    // the transform is mirroring so flip the plane
    flip(out, out)
  }
  return out
}

module.exports = transform
