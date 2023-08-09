import * as geom3 from '../../geometries/geom3/index.js'

import { Tree } from './trees/index.js'

import { mayOverlap } from './mayOverlap.js'

/*
 * Return a new 3D geometry representing the space in the first geometry but not
 * in the second geometry. None of the given geometries are modified.
 * @param {Geom3} geometry1 - a geometry
 * @param {Geom3} geometry2 - a geometry
 * @returns {Geom3} new 3D geometry
 */
export const subtractGeom3Sub = (geometry1, geometry2) => {
  if (!mayOverlap(geometry1, geometry2)) {
    return geom3.clone(geometry1)
  }

  const a = new Tree(geom3.toPolygons(geometry1))
  const b = new Tree(geom3.toPolygons(geometry2))

  a.invert()
  a.clipTo(b)
  b.clipTo(a, true)
  a.addPolygons(b.allPolygons())
  a.invert()

  const newPolygons = a.allPolygons()
  return geom3.create(newPolygons)
}
