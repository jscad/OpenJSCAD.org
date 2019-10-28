const mat4 = require('../../math/mat4')
const geom2 = require('../geometry/geom2')

// TODO: deal with properties etc
const toString = shape => {
  return ` ${mat4.toString(shape.transforms)}
  ${geom2.toString(shape.geometry)}
  `
}
module.exports = toString
