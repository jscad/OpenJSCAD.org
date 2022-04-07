const geom2 = require("../geometries/geom2");
const geom3 = require("../geometries/geom3");
const path2 = require("../geometries/path2");

/*
 * Return the unique vertices of a geometry
 */
const uniquePoints = (geometries) => {
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
      geom3.toPoints(geometry).forEach(addPoint)
    } else if (path2.isA(geometry)) {
      path2.toPoints(geometry).forEach(addPoint)
    }
  })

  return uniquePoints
}

module.exports = uniquePoints
