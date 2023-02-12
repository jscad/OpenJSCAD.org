import { flatten } from '../../utils/flatten.js'

import * as vec2 from '../../maths/vec2/index.js'

import * as geom2 from '../../geometries/geom2/index.js'
import * as geom3 from '../../geometries/geom3/index.js'
import * as path2 from '../../geometries/path2/index.js'
import * as poly2 from '../../geometries/poly2/index.js'

import { measureEpsilon } from '../../measurements/index.js'

import { snapPolygons } from './snapPolygons.js'

const snapPath2 = (geometry) => {
  const epsilon = measureEpsilon(geometry)
  const points = path2.toPoints(geometry)
  const newpoints = points.map((point) => vec2.snap(vec2.create(), point, epsilon))
  // snap can produce duplicate points, remove those
  return path2.create(newpoints)
}

const snapGeom2 = (geometry) => {
  const epsilon = measureEpsilon(geometry)
  const outlines = geom2.toOutlines(geometry)
  let newOutlines = outlines.map((outline) => {
    let prev = vec2.snap(vec2.create(), outline[outline.length - 1], epsilon)
    const newOutline = []
    outline.forEach((point) => {
      const snapped = vec2.snap(vec2.create(), point, epsilon)
      // remove duplicate points
      if (!vec2.equals(prev, snapped)) {
        newOutline.push(snapped)
      }
      prev = snapped
    })
    return newOutline
  })
  // remove zero-area outlines
  newOutlines = newOutlines.filter((outline) => poly2.measureArea(poly2.create(outline)))
  return geom2.create(newOutlines)
}

const snapGeom3 = (geometry) => {
  const epsilon = measureEpsilon(geometry)
  const polygons = geom3.toPolygons(geometry)
  const newpolygons = snapPolygons(epsilon, polygons)
  return geom3.create(newpolygons)
}

/**
 * Snap the given geometries to the overall precision (epsilon) of the geometry.
 * @see measurements.measureEpsilon()
 * @param {...Object} geometries - the geometries to snap
 * @return {Object|Array} the snapped geometry, or a list of snapped geometries
 * @alias module:modeling/modifiers.snap
 */
export const snap = (...geometries) => {
  geometries = flatten(geometries)
  if (geometries.length === 0) throw new Error('wrong number of arguments')

  const results = geometries.map((geometry) => {
    if (path2.isA(geometry)) return snapPath2(geometry)
    if (geom2.isA(geometry)) return snapGeom2(geometry)
    if (geom3.isA(geometry)) return snapGeom3(geometry)
    return geometry
  })
  return results.length === 1 ? results[0] : results
}
