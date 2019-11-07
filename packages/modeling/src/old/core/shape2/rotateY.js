const transform = require('./transform')

const fromYRotation = require('../../math/mat4/fromXRotation')
const {degToRad} = require('../../math/utils')

function rotateY (deg, shape2) {
  return transform(fromYRotation(degToRad(deg)), shape2)
}

module.exports = rotateY
