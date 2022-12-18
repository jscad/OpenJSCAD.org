import flatten from '../../utils/flatten.js'

import * as martinez from './martinez/index.js'

/*
 * Return a new 2D geometry representing space in both the first geometry and
 * in the subsequent geometries. None of the given geometries are modified.
 * @param {...geom2} geometries - list of 2D geometries
 * @returns {geom2} new 2D geometry
 */
export const intersectGeom2 = (...geometries) => {
  geometries = flatten(geometries)

  let newgeometry = geometries.shift()
  geometries.forEach((geometry) => {
    newgeometry = martinez.intersection(newgeometry, geometry)
  })

  return newgeometry
}

export default intersectGeom2
