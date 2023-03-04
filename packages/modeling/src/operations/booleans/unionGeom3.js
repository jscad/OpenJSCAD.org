import { flatten } from '../../utils/index.js'

import { retessellate } from '../modifiers/retessellate.js'

import { unionGeom3Sub } from './unionGeom3Sub.js'

/*
 * Return a new 3D geometry representing the space in the given 3D geometries.
 * @param {...objects} geometries - list of geometries to union
 * @returns {geom3} new 3D geometry
 */
export const unionGeom3 = (...geometries) => {
  geometries = flatten(geometries)

  // combine geometries in a way that forms a balanced binary tree pattern
  let i
  for (i = 1; i < geometries.length; i += 2) {
    geometries.push(unionGeom3Sub(geometries[i - 1], geometries[i]))
  }
  let newGeometry = geometries[i - 1]
  newGeometry = retessellate(newGeometry)
  return newGeometry
}
