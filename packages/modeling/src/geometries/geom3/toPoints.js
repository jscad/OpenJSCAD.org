const poly3 = require('../poly3')

const toPolygons = require('./toPolygons')

/**
 * Return the given geometry as a list of points, after applying transforms.
 * The returned array should not be modified as the points are shared with the geometry.
 * @return {Array} list of polygons, represented as a list of points (3D)
 * @alias module:modeling/geometries/geom3.toPoints
 */
const toPoints = (geometry) => {
  const polygons = toPolygons(geometry)
  const listofpoints = polygons.map((polygon) => poly3.toPoints(polygon))
  return listofpoints
}

module.exports = toPoints
