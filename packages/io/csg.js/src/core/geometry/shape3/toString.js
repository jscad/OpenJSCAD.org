const poly3 = require('../poly3')

const toString = shape3 => {
  return shape3.polygons.reduce((result, polygon) => {
    result += poly3.toString(polygon)
    return result
  }, 'CSG solid:\n')
}

module.exports = toString
