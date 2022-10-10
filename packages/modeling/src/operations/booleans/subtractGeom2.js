import flatten from '../../utils/flatten.js'

import * as geom3 from '../../geometries/geom3/index.js'

import measureEpsilon from '../../measurements/measureEpsilon.js'

import fromFakePolygons from './fromFakePolygons.js'
import to3DWalls from './to3DWalls.js'
import subtractGeom3 from './subtractGeom3.js'

/*
 * Return a new 2D geometry representing space in the first geometry but
 * not in the subsequent geometries. None of the given geometries are modified.
 * @param {...geom2} geometries - list of geometries
 * @returns {geom2} new 2D geometry
 */
export const subtractGeom2 = (...geometries) => {
  geometries = flatten(geometries)
  const newgeometries = geometries.map((geometry) => to3DWalls({ z0: -1, z1: 1 }, geometry))

  const newgeom3 = subtractGeom3(newgeometries)
  const epsilon = measureEpsilon(newgeom3)

  return fromFakePolygons(epsilon, geom3.toPolygons(newgeom3))
}

export default subtractGeom2
