import flatten from '../../utils/flatten.js'

import * as geom3 from '../../geometries/geom3/index.js'

import measureEpsilon from '../../measurements/measureEpsilon.js'

import fromFakePolygons from './fromFakePolygons.js'
import to3DWalls from './to3DWalls.js'
import unionGeom3 from './unionGeom3.js'

/*
 * Return a new 2D geometry representing the total space in the given 2D geometries.
 * @param {...geom2} geometries - list of 2D geometries to union
 * @returns {geom2} new 2D geometry
 */
export const unionGeom2 = (...geometries) => {
  geometries = flatten(geometries)
  const newgeometries = geometries.map((geometry) => to3DWalls({ z0: -1, z1: 1 }, geometry))

  const newgeom3 = unionGeom3(newgeometries)
  const epsilon = measureEpsilon(newgeom3)

  return fromFakePolygons(epsilon, geom3.toPolygons(newgeom3))
}

export default unionGeom2
