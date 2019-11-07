const mat4 = require('../../math/mat4')
const transform = require('./transform')

/** return a clone of the input shape, rotated by parameter
 * the clone's geometry still points to the original's, but the transforms are changed
 * @param  {Vec3} rotationCenter the rotation center
 * @param  {Vec3} rotationAxis the rotation axis
 * @param  {float} degrees the amount of rotation, in degrees
 * @param  {Shape3} shape the original shape
 * @returns {Shape3} the rotated shape
 */
const rotate = (rotationCenter, rotationAxis, degrees, shape) => {
  // Matrix4x4.rotation(rotationCenter, rotationAxis, degrees)
  const transformMatrix = mat4.fromRotation(degrees, rotationAxis)
  return transform(transformMatrix, shape)
}

module.exports = rotate
