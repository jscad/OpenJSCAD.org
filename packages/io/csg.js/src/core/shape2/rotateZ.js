const transform = require('./transform')

const fromZRotation = require('../../math/mat4/fromZRotation')
const { degToRad } = require('../../math/utils')

function rotateZ (deg, shape2) {
  return transform(fromZRotation(degToRad(deg)), shape2)
}

module.exports = rotateZ
