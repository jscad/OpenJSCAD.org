const transform = require('./transform')

const fromTranslation = require('../../math/mat4/fromTranslation')

function translate (vector, shape2) {
  return transform(fromTranslation(vector), shape2)
}

module.exports = translate
