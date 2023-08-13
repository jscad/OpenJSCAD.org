import { flatten } from '../../utils/flatten.js'

import { UNION } from './martinez/operation.js'
import { boolean } from './martinez/index.js'

/*
 * Return a new 2D geometry representing the total space in the given 2D geometries.
 * @param {...geom2} geometries - list of 2D geometries to union
 * @returns {Geom2} new 2D geometry
 */
export const unionGeom2 = (...geometries) => {
  geometries = flatten(geometries)

  let newGeometry = geometries.shift()
  geometries.forEach((geometry) => {
    newGeometry = boolean(newGeometry, geometry, UNION)
  })

  return newGeometry
}
