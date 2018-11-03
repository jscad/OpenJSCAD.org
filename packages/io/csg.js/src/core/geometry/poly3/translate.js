const transform = require('./transform')

const mat4 = require('../../math/mat4')

const translate = (vector, poly3) => {
  return transform(mat4.fromTranslation(vector), poly3)
}

module.exports = translate
