const poly3 = require('../poly3')

/*
 * Measure the area of the given geometry.
 *
 * @param {Geom3} geometry - 3D geometry to measure
 * @returns {Number} area of the geometry
 */
const measureArea = (geometry) => {
  let result = geometry.polygons.reduce((area, polygon) => area + poly3.measureArea(polygon), 0)
  return result
}

module.exports = measureArea
