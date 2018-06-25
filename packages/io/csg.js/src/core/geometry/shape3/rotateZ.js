const transform = require('./transform')
const mat4 = require('../../math/mat4')

const rotateZ = (deg, shape3) => {
  return transform(mat4.fromZRotation(deg), shape3)
}

module.exports = rotateZ
