const vec3 = require('../vec3')
const fromNormalAndPoint = require('./fromNormalAndPoint')

/**
 * Create a best-fit plane from the given noisy vertices.
 *
 * NOTE: There are two possible orientations for every plane.
 *       This function always produces positive orientations.
 *
 * See http://www.ilikebigbits.com for the original discussion
 *
 * @param {Plane} out - receiving plane
 * @param {Array} vertices - list of vertices in any order or position
 * @returns {Plane} out
 * @alias module:modeling/maths/plane.fromNoisyPoints
 */
const fromNoisyPoints = (out, ...vertices) => {
  out[0] = 0.0
  out[1] = 0.0
  out[2] = 0.0
  out[3] = 0.0

  // calculate the centroid of the vertices
  // NOTE: out is the centriod
  const n = vertices.length
  vertices.forEach((v) => {
    vec3.add(out, out, v)
  })
  vec3.scale(out, out, 1.0 / n)

  // Calculate full 3x3 covariance matrix, excluding symmetries
  let xx = 0.0
  let xy = 0.0
  let xz = 0.0
  let yy = 0.0
  let yz = 0.0
  let zz = 0.0

  const vn = vec3.create()
  vertices.forEach((v) => {
    // NOTE: out is the centriod
    vec3.subtract(vn, v, out)
    xx += vn[0] * vn[0]
    xy += vn[0] * vn[1]
    xz += vn[0] * vn[2]
    yy += vn[1] * vn[1]
    yz += vn[1] * vn[2]
    zz += vn[2] * vn[2]
  })

  xx /= n
  xy /= n
  xz /= n
  yy /= n
  yz /= n
  zz /= n

  // Calculate the smallest Eigenvector of the covariance matrix
  // which becomes the plane normal

  vn[0] = 0.0
  vn[1] = 0.0
  vn[2] = 0.0

  // weighted directional vector
  const wdv = vec3.create()

  // X axis
  let det = yy * zz - yz * yz
  wdv[0] = det
  wdv[1] = xz * yz - xy * zz
  wdv[2] = xy * yz - xz * yy

  let weight = det * det
  vec3.add(vn, vn, vec3.scale(wdv, wdv, weight))

  // Y axis
  det = xx * zz - xz * xz
  wdv[0] = xz * yz - xy * zz
  wdv[1] = det
  wdv[2] = xy * xz - yz * xx

  weight = det * det
  if (vec3.dot(vn, wdv) < 0.0) {
    weight = -weight
  }
  vec3.add(vn, vn, vec3.scale(wdv, wdv, weight))

  // Z axis
  det = xx * yy - xy * xy
  wdv[0] = xy * yz - xz * yy
  wdv[1] = xy * xz - yz * xx
  wdv[2] = det

  weight = det * det
  if (vec3.dot(vn, wdv) < 0.0) {
    weight = -weight
  }
  vec3.add(vn, vn, vec3.scale(wdv, wdv, weight))

  // create the plane from normal and centriod
  // NOTE: out is the centriod
  return fromNormalAndPoint(out, vn, out)
}

module.exports = fromNoisyPoints
