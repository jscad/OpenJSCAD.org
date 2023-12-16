import { retessellate } from '../modifiers/retessellate.js'

import { intersectGeom3Sub } from './intersectGeom3Sub.js'

/*
 * Return a new 3D geometry representing space in both the first geometry and
 * in the subsequent geometries. None of the given geometries are modified.
 * @param {Geom3[]} geometries - a flat list of 3D geometries
 * @returns {Geom3} new 3D geometry
 */
export const intersectGeom3 = (geometries) => {
  let newGeometry = geometries.shift()
  geometries.forEach((geometry) => {
    newGeometry = intersectGeom3Sub(newGeometry, geometry)
  })

  newGeometry = retessellate(newGeometry)
  return newGeometry
}
