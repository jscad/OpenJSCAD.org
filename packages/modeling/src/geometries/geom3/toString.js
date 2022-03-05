const poly3 = require('../poly3')

const toPolygons = require('./toPolygons')

/**
 * Create a string representing the contents of the given geometry.
 * @param {geom3} geometry - the geometry
 * @returns {String} a representative string
 * @alias module:modeling/geometries/geom3.toString
 *
 * @example
 * console.out(toString(geometry))
 */
const toString = (geometry) => {
  const polygons = toPolygons(geometry)
  let result = 'geom3 (' + polygons.length + ' polygons):\n'
  polygons.forEach((polygon) => {
    result += '  ' + poly3.toString(polygon) + '\n'
  })
  return result
}

module.exports = toString
