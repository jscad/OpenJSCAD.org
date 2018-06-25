const transform = require('./transform')
const fromScaling = require('../../math/mat4/fromScaling')

function scale (vector, shape3) {
  return transform(fromScaling(vector), shape3)
}

module.exports = scale
