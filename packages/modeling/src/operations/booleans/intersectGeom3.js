import { flatten } from '../../utils/flatten.js'

import { retessellate } from '../modifiers/retessellate.js'

import { intersectGeom3Sub } from './intersectGeom3Sub.js'

/*
 * Return a new 3D geometry representing space in both the first geometry and
 * in the subsequent geometries. None of the given geometries are modified.
 * @param {...geom3} geometries - list of 3D geometries
 * @returns {geom3} new 3D geometry
 */
export const intersectGeom3 = (...geometries) => {
  geometries = flatten(geometries)

  let newGeometry = geometries.shift()
  geometries.forEach((geometry) => {
    newGeometry = intersectGeom3Sub(newGeometry, geometry)
  })

  newGeometry = retessellate(newGeometry)
  return newGeometry
}
