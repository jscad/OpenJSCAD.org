import flatten from '../../utils/flatten.js'

import { UNION } from './martinez/operation.js'
import boolean from './martinez/index.js'

/*
 * Return a new 2D geometry representing the total space in the given 2D geometries.
 * @param {...geom2} geometries - list of 2D geometries to union
 * @returns {geom2} new 2D geometry
 */
export const unionGeom2 = (...geometries) => {
  geometries = flatten(geometries)

  let newgeometry = geometries.shift()
  geometries.forEach((geometry) => {
    newgeometry = boolean(newgeometry, geometry, UNION)
  })

  return newgeometry
}

export default unionGeom2
