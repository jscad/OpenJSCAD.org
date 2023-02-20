import * as geom2 from '../../geometries/geom2/index.js'
import * as geom3 from '../../geometries/geom3/index.js'
import * as path2 from '../../geometries/path2/index.js'

/*
 * Return the unique vertices of a geometry
 */
export const toUniquePoints = (geometries) => {
  const found = new Set()
  const uniquePoints = []

  const addPoint = (point) => {
    const key = point.toString()
    if (!found.has(key)) {
      uniquePoints.push(point)
      found.add(key)
    }
  }

  geometries.forEach((geometry) => {
    if (geom2.isA(geometry)) {
      geom2.toPoints(geometry).forEach(addPoint)
    } else if (geom3.isA(geometry)) {
      // points are grouped by polygon
      geom3.toPoints(geometry).forEach((points) => points.forEach(addPoint))
    } else if (path2.isA(geometry)) {
      path2.toPoints(geometry).forEach(addPoint)
    }
  })

  return uniquePoints
}
