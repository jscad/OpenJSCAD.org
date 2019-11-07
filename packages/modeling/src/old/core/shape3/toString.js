const geom3 = require('../geometry/geom3')
const mat4 = require('../../math/mat4')

// TODO: deal with properties etc
const toString = shape => {
  return ` ${mat4.toString(shape.transforms)}
  ${geom3.toString(shape.geometry)}
  `
}

module.exports = toString
