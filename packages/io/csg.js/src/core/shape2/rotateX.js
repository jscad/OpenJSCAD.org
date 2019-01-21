const transform = require('./transform')

const fromXRotation = require('../math//mat4/fromXRotation')
const {degToRad} = require('../math//utils')

function rotateX (deg, shape2) {
  return transform(fromXRotation(degToRad(deg)), shape2)
}

module.exports = rotateX
