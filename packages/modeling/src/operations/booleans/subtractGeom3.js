import flatten from '../../utils/flatten.js'

import retessellate from '../modifiers/retessellate.js'

import subtractSub from './subtractGeom3Sub.js'

/*
 * Return a new 3D geometry representing space in this geometry but not in the given geometries.
 * Neither this geometry nor the given geometries are modified.
 * @param {...geom3} geometries - list of geometries
 * @returns {geom3} new 3D geometry
 */
export const subtractGeom3 = (...geometries) => {
  geometries = flatten(geometries)

  let newgeometry = geometries.shift()
  geometries.forEach((geometry) => {
    newgeometry = subtractSub(newgeometry, geometry)
  })

  newgeometry = retessellate(newgeometry)
  return newgeometry
}
