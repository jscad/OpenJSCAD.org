import * as geom3 from '../../geometries/geom3/index.js'

import { Tree } from './trees/index.js'

import { mayOverlap } from './mayOverlap.js'

/*
 * Return a new 3D geometry representing the space in the given geometries.
 * @param {Geom3} geometry1 - geometry to union
 * @param {Geom3} geometry2 - geometry to union
 * @returns {Geom3} new 3D geometry
 */
export const unionGeom3Sub = (geometry1, geometry2) => {
  if (!mayOverlap(geometry1, geometry2)) {
    return unionForNonIntersecting(geometry1, geometry2)
  }

  const a = new Tree(geom3.toPolygons(geometry1))
  const b = new Tree(geom3.toPolygons(geometry2))

  a.clipTo(b, false)
  // b.clipTo(a, true); // ERROR: doesn't work
  b.clipTo(a)
  b.invert()
  b.clipTo(a)
  b.invert()

  const newPolygons = a.allPolygons().concat(b.allPolygons())
  return geom3.create(newPolygons)
}

// Like union, but when we know that the two solids are not intersecting
// Do not use if you are not completely sure that the solids do not intersect!
const unionForNonIntersecting = (geometry1, geometry2) => {
  let newpolygons = geom3.toPolygons(geometry1)
  newpolygons = newpolygons.concat(geom3.toPolygons(geometry2))
  return geom3.create(newpolygons)
}
