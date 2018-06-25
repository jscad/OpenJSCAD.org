const transform = require('./transform')
const mat4 = require('../../math/mat4')

const rotateX = (deg, shape3) => {
  return transform(mat4.fromXRotation(deg), shape3)
}

module.exports = rotateX
