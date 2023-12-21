import { DIFFERENCE } from './martinez/operation.js'
import { boolean } from './martinez/index.js'

/*
 * Return a new 2D geometry representing space in the first geometry but
 * not in the subsequent geometries. None of the given geometries are modified.
 * @param {Geom2[]} geometries - a flat list of 2D geometries
 * @returns {Geom2} new 2D geometry
 */
export const subtractGeom2 = (geometries) => {
  let newGeometry = geometries.shift()
  geometries.forEach((geometry) => {
    newGeometry = boolean(newGeometry, geometry, DIFFERENCE)
  })

  return newGeometry
}
