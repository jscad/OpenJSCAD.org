
const transform = require('./transform')
const mat4 = require('../../math/mat4')

const rotateY = (deg, shape3) => {
  return transform(mat4.fromYRotation(deg), shape3)
}

module.exports = rotateY
