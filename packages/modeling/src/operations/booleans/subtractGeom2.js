import flatten from '../../utils/flatten.js'

import * as martinez from './martinez/index.js'

/*
 * Return a new 2D geometry representing space in the first geometry but
 * not in the subsequent geometries. None of the given geometries are modified.
 * @param {...geom2} geometries - list of geometries
 * @returns {geom2} new 2D geometry
 */
export const subtractGeom2 = (...geometries) => {
  geometries = flatten(geometries)

  let newgeometry = geometries.shift()
  geometries.forEach((geometry) => {
    newgeometry = martinez.diff(newgeometry, geometry)
  })

  return newgeometry
}

export default subtractGeom2
