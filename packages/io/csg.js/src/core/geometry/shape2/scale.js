const transform = require('./transform')

const fromScaling = require('../../math/mat4/fromScaling')

function scale (vector, shape2) {
  return transform(fromScaling(vector), shape2)
}

module.exports = scale
