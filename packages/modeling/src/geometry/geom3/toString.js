const poly3 = require('../poly3')

const toPolygons = require('./toPolygons')

/**
 * Create a string representing the contents of the given geometry.
 * @returns {String} a representive string
 * @example
 * console.out(toString(geometry))
 */
const toString = function (geometry) {
  const polygons = toPolygons(geometry)
  let result = 'geom3 (' + polygons.length + ' polygons):\n'
  polygons.forEach(function (polygon) {
    result += '  ' + poly3.toString(polygon) + '\n'
  })
  return result
}

module.exports = toString
