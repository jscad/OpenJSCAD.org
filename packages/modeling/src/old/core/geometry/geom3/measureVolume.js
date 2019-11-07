const poly3 = require('../poly3')

/*
 * Measure the volume of the given geometry.
 *
 * @param {Geom3} geometry - 3D geometry to measure
 * @returns {Number} volume of the geometry
 */
const measureVolume = (geometry) => {
  let result = geometry.polygons.reduce((volume, polygon) => volume + poly3.measureSignedVolume(polygon), 0)
  return result
}

module.exports = measureVolume
