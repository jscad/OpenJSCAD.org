const transform = require('./transform')
const mat4 = require('../../math/mat4')

function translate (vector, shape3) {
  return transform(shape3, mat4.fromTranslation(vector))
}

module.exports = translate
