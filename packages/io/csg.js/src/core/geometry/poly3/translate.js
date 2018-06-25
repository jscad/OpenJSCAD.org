const transform = require('./transform')
const mat4 = require('../../math/mat4')

const translate = (offset, poly3) => {
  return transform(mat4.translate(offset, mat4.create()), poly3)
}

module.exports = translate
