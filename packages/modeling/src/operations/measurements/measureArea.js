const flatten = require('../../utils/flatten')

const { geom2, geom3, path2, poly3 } = require('../../geometry')

/*
 * Measure the area of the given geometry.
 * NOTE: paths are infinitely narrow and do not have an area
 *
 * @param {path2} geometry - geometry to measure
 * @returns {Number} area of the geometry
 */
const measureAreaOfPath2 = () => 0

/*
 * Measure the area of the given geometry.
 * For a counter clockwise rotating geometry (about Z) the area is positive, otherwise negative.
 *
 * @see http://paulbourke.net/geometry/polygonmesh/
 * @param {geom2} geometry - 2D geometry to measure
 * @returns {Number} area of the geometry
 */
const measureAreaOfGeom2 = (geometry) => {
  const sides = geom2.toSides(geometry)
  let area = sides.reduce((area, side) => area + (side[0][0] * side[1][1] - side[0][1] * side[1][0]), 0)
  area *= 0.5
  return area
}

/*
 * Measure the area of the given geometry.
 *
 * @param {geom3} geometry - 3D geometry to measure
 * @returns {Number} area of the geometry
 */
const measureAreaOfGeom3 = (geometry) => {
  const polygons = geom3.toPolygons(geometry)
  return polygons.reduce((area, polygon) => area + poly3.measureArea(polygon), 0)
}

/**
 * Measure the area of the given geometry(s).
 * @param {...geometries} geometries - the geometry(s) to measure
 * @return {Number|Number[]} the area for each geometry
 *
 * @example
 * let area = measureArea(sphere())
 */
const measureArea = (...geometries) => {
  geometries = flatten(geometries)
  if (geometries.length === 0) throw new Error('wrong number of arguments')

  const results = geometries.map((geometry) => {
    if (path2.isA(geometry)) return measureAreaOfPath2(geometry)
    if (geom2.isA(geometry)) return measureAreaOfGeom2(geometry)
    if (geom3.isA(geometry)) return measureAreaOfGeom3(geometry)
    return 0
  })
  return results.length === 1 ? results[0] : results
}

module.exports = measureArea
