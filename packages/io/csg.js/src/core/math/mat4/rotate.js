module.exports = rotate
const create = require('./create')
/**
 * Rotates a mat4 by the given angle
 *
 * @param {mat4} out the receiving matrix
 * @param {Number} rad the angle to rotate the matrix by
 * @param {vec3} axis the axis to rotate around
 * @param {mat4} matrix the matrix to rotate
 * @returns {mat4} out
 */
function rotate (...params) {
  let out
  let matrix
  let rad
  let axis
  if (params.length === 3) {
    out = create()
    rad = params[0]
    axis = params[1]
    matrix = params[2]
  } else {
    out = params[0]
    rad = params[1]
    axis = params[2]
    matrix = params[3]
  }

  let [x, y, z] = axis
  let len = Math.sqrt(x * x + y * y + z * z)
  let s
  let c
  let t
  let a00
  let a01
  let a02
  let a03
  let a10
  let a11
  let a12
  let a13
  let a20
  let a21
  let a22
  let a23
  let b00
  let b01
  let b02
  let b10
  let b11
  let b12
  let b20
  let b21
  let b22

  if (Math.abs(len) < 0.000001) { return null }

  len = 1 / len
  x *= len
  y *= len
  z *= len

  s = Math.sin(rad)
  c = Math.cos(rad)
  t = 1 - c

  a00 = matrix[0]; a01 = matrix[1]; a02 = matrix[2]; a03 = matrix[3]
  a10 = matrix[4]; a11 = matrix[5]; a12 = matrix[6]; a13 = matrix[7]
  a20 = matrix[8]; a21 = matrix[9]; a22 = matrix[10]; a23 = matrix[11]

    // Construct the elements of the rotation matrix
  b00 = x * x * t + c; b01 = y * x * t + z * s; b02 = z * x * t - y * s
  b10 = x * y * t - z * s; b11 = y * y * t + c; b12 = z * y * t + x * s
  b20 = x * z * t + y * s; b21 = y * z * t - x * s; b22 = z * z * t + c

    // Perform rotation-specific matrix multiplication
  out[0] = a00 * b00 + a10 * b01 + a20 * b02
  out[1] = a01 * b00 + a11 * b01 + a21 * b02
  out[2] = a02 * b00 + a12 * b01 + a22 * b02
  out[3] = a03 * b00 + a13 * b01 + a23 * b02
  out[4] = a00 * b10 + a10 * b11 + a20 * b12
  out[5] = a01 * b10 + a11 * b11 + a21 * b12
  out[6] = a02 * b10 + a12 * b11 + a22 * b12
  out[7] = a03 * b10 + a13 * b11 + a23 * b12
  out[8] = a00 * b20 + a10 * b21 + a20 * b22
  out[9] = a01 * b20 + a11 * b21 + a21 * b22
  out[10] = a02 * b20 + a12 * b21 + a22 * b22
  out[11] = a03 * b20 + a13 * b21 + a23 * b22

  if (matrix !== out) { // If the source and destination differ, copy the unchanged last row
    out[12] = matrix[12]
    out[13] = matrix[13]
    out[14] = matrix[14]
    out[15] = matrix[15]
  }
  return out
}
/*
const Vector3 = require('./Vector3')
const Vector2 = require('./Vector2')
const OrthoNormalBasis = require('./OrthoNormalBasis')
const Plane = require('./Plane')

// Matrix for rotation about arbitrary point and axis
Matrix4x4.rotation = function (rotationCenter, rotationAxis, degrees) {
  rotationCenter = new Vector3(rotationCenter)
  rotationAxis = new Vector3(rotationAxis)
  var rotationPlane = Plane.fromNormalAndPoint(rotationAxis, rotationCenter)
  var orthobasis = new OrthoNormalBasis(rotationPlane)
  var transformation = Matrix4x4.translation(rotationCenter.negated())
  transformation = transformation.multiply(orthobasis.getProjectionMatrix())
  transformation = transformation.multiply(Matrix4x4.rotationZ(degrees))
  transformation = transformation.multiply(orthobasis.getInverseProjectionMatrix())
  transformation = transformation.multiply(Matrix4x4.translation(rotationCenter))
  return transformation
} */
