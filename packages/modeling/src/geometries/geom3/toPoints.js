const poly3 = require('../poly3')

const toPolygons = require('./toPolygons')

/**
 * Return the given geometry as a list of points, after applying transforms.
 * The returned array should not be modified as the points are shared with the geometry.
 * @param {geom3} geometry - the geometry
 * @return {Array} list of points, where each sub-array represents a polygon
 * @alias module:modeling/geometries/geom3.toPoints
 */
const toPoints = (geometry) => {
  const polygons = toPolygons(geometry)
  const listofpoints = polygons.map((polygon) => poly3.toPoints(polygon))
  return listofpoints
}

module.exports = toPoints
