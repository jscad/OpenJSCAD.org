const vec2 = require('../../maths/vec2')

const toPoints = require('./toPoints')

/**
 * Create a string representing the contents of the given path.
 * @param {path2} geometry - the path
 * @returns {String} a representative string
 * @alias module:modeling/geometries/path2.toString
 *
 * @example
 * console.out(toString(path))
 */
const toString = (geometry) => {
  const points = toPoints(geometry)
  let result = 'path (' + points.length + ' points, ' + geometry.isClosed + '):\n[\n'
  points.forEach((point) => {
    result += '  ' + vec2.toString(point) + ',\n'
  })
  result += ']\n'
  return result
}

module.exports = toString
