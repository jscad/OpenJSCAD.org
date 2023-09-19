import { retessellate } from '../modifiers/retessellate.js'

import { subtractGeom3Sub } from './subtractGeom3Sub.js'

/*
 * Return a new 3D geometry representing space in this geometry but not in the given geometries.
 * Neither this geometry nor the given geometries are modified.
 * @param {...Geom3} geometries - a flat list of 3D geometries
 * @returns {Geom3} new 3D geometry
 */
export const subtractGeom3 = (geometries) => {
  let newGeometry = geometries.shift()
  geometries.forEach((geometry) => {
    newGeometry = subtractGeom3Sub(newGeometry, geometry)
  })

  newGeometry = retessellate(newGeometry)
  return newGeometry
}
