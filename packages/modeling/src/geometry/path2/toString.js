const vec2 = require('../../math/vec2')

const toPoints = require('./toPoints')

/**
 * Create a string representing the contents of the given path.
 * @returns {String} a representive string
 * @example
 * console.out(toString(path))
 */
const toString = (geometry) => {
  let points = toPoints(geometry)
  let result = 'path (' + points.length + ' points, ' + geometry.isClosed + '):\n[\n'
  points.forEach((point) => {
    result += '  ' + vec2.toString(point) + ',\n'
  })
  result += ']\n'
  return result
}

module.exports = toString
