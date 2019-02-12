/* rotate: function (rotationCenter, rotationAxis, degrees) {
  return this.transform(Matrix4x4.rotation(rotationCenter, rotationAxis, degrees))
}, */

const transform = require('./transform')
const mat4 = require('../../math//mat4')
const { degToRad } = require('../../math//utils')

// FIXME : overly complex ??
/** rotate the given shape by the given vector, applying rotateX, rotateY
 * this function does NOT mutate the input data
 * @param  {Vec} vector a vector of at least 2 components, any components > 2 are disregarded
 * @param  {Shape2} shape the shape to scale
 * @returns {Shape2} a new shape, with the same geometry, but new transforms
 */
const rotate = (vector, shape) => {
  const vectorDeg = vector.map(c => degToRad(c))
  const yMat = mat4.fromYRotation(vectorDeg[1])
  const xMat = mat4.fromXRotation(vectorDeg[0])
  const mat = mat4.multiply(xMat, yMat)
  return transform(mat, shape)
}

module.exports = rotate
