const poly3 = require('../poly3')

const create = require('./create')
const toPolygons = require('./toPolygons')

/**
 * Invert the given geometry, transposing solid and empty space.
 * @param {geom3} geometry - the geometry to invert
 * @return {geom3} a new geometry
 * @alias module:modeling/geometries/geom3.invert
 */
const invert = (geometry) => {
  const polygons = toPolygons(geometry)
  const newpolygons = polygons.map((polygon) => poly3.invert(polygon))
  return create(newpolygons)
}

module.exports = invert
