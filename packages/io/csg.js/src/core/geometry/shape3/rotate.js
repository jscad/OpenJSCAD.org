const mat4 = require('../../math/mat4')
const transform = require('./transform')

const rotate = (rotationCenter, rotationAxis, degrees, shape3) => {
  // Matrix4x4.rotation(rotationCenter, rotationAxis, degrees)
  const transformMatrix = mat4.fromRotation(degrees, rotationAxis)
  return transform(transformMatrix, shape3)
}

module.exports = rotate
