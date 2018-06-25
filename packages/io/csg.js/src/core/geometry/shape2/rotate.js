/* rotate: function (rotationCenter, rotationAxis, degrees) {
  return this.transform(Matrix4x4.rotation(rotationCenter, rotationAxis, degrees))
}, */

const transform = require('./transform')
const fromRotation = require('../../math/mat4/fromRotation')

function rotate (vector, shape2) {
  return transform(fromRotation(vector), shape2)
}

module.exports = rotate
