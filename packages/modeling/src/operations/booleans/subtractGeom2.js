import { flatten } from '../../utils/index.js'

import { DIFFERENCE } from './martinez/operation.js'
import { boolean } from './martinez/index.js'

/*
 * Return a new 2D geometry representing space in the first geometry but
 * not in the subsequent geometries. None of the given geometries are modified.
 * @param {...geom2} geometries - list of geometries
 * @returns {geom2} new 2D geometry
 */
export const subtractGeom2 = (...geometries) => {
  geometries = flatten(geometries)

  let newGeometry = geometries.shift()
  geometries.forEach((geometry) => {
    newGeometry = boolean(newGeometry, geometry, DIFFERENCE)
  })

  return newGeometry
}
