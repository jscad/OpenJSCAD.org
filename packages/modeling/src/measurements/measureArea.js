import { flatten } from '../utils/flatten.js'

import * as geom2 from '../geometries/geom2/index.js'
import * as geom3 from '../geometries/geom3/index.js'
import * as path2 from '../geometries/path2/index.js'
import * as poly3 from '../geometries/poly3/index.js'
import * as slice from '../geometries/slice/index.js'

const cache = new WeakMap()

/*
 * Measure the area of the given geometry.
 * NOTE: paths are infinitely narrow and do not have an area
 *
 * @param {Path2} geometry - geometry to measure
 * @returns {number} area of the geometry
 */
const measureAreaOfPath2 = () => 0

/*
 * Measure the area of the given geometry.
 * For a counterclockwise rotating geometry (about Z) the area is positive, otherwise negative.
 *
 * @see https://paulbourke.net/geometry/polygonmesh/
 * @param {Geom2} geometry - 2D geometry to measure
 * @returns {number} area of the geometry
 */
const measureAreaOfGeom2 = (geometry) => {
  let area = cache.get(geometry)
  if (area) return area

  const sides = geom2.toSides(geometry)
  area = sides.reduce((area, side) => area + (side[0][0] * side[1][1] - side[0][1] * side[1][0]), 0)
  area *= 0.5

  cache.set(geometry, area)
  return area
}

/*
 * Measure the area of the given geometry.
 *
 * @param {Geom3} geometry - 3D geometry to measure
 * @returns {number} area of the geometry
 */
const measureAreaOfGeom3 = (geometry) => {
  let area = cache.get(geometry)
  if (area) return area

  const polygons = geom3.toPolygons(geometry)
  area = polygons.reduce((area, polygon) => area + poly3.measureArea(polygon), 0)

  cache.set(geometry, area)
  return area
}

/*
 * Measure the area of the given geometry.
 *
 * @param {Slice} geometry - 3D slice geometry to measure
 * @returns {number} area of the geometry
 */
const measureAreaOfSlice = (geometry) => {
  let area = cache.get(geometry)
  if (area) return area

  // add the area of all contours
  area = 0
  geometry.contours.forEach((contour) => {
    area += poly3.measureArea(poly3.create(contour))
  })

  cache.set(geometry, area)
  return area
}

/**
 * Measure the area of the given geometries.
 * @param {...Object} geometries - the geometries to measure
 * @return {number|Array} the area, or a list of areas for each geometry
 * @alias module:modeling/measurements.measureArea
 *
 * @example
 * let area = measureArea(sphere())
 */
export const measureArea = (...geometries) => {
  geometries = flatten(geometries)

  const results = geometries.map((geometry) => {
    if (path2.isA(geometry)) return measureAreaOfPath2(geometry)
    if (geom2.isA(geometry)) return measureAreaOfGeom2(geometry)
    if (geom3.isA(geometry)) return measureAreaOfGeom3(geometry)
    if (slice.isA(geometry)) return measureAreaOfSlice(geometry)
    return 0
  })
  return results.length === 1 ? results[0] : results
}
