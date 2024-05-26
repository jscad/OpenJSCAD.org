const quickhull = require('../../operations/hulls/quickhull')
const create = require('./create')
const poly3 = require('../poly3')

/**
 * Construct a new convex 3D geometry from a list of unique points.
 * @param {Array} uniquePoints - list of points to construct convex 3D geometry
 * @returns {geom3} a new geometry
 * @alias module:modeling/geometries/geom3.fromPointsConvex
 */
const fromPointsConvex = (uniquePoints) => {
  if (!Array.isArray(uniquePoints)) {
    throw new Error('the given points must be an array')
  }

  const faces = quickhull(uniquePoints, { skipTriangulation: true })

  const polygons = faces.map((face) => {
    const vertices = face.map((index) => uniquePoints[index])
    return poly3.create(vertices)
  })

  return create(polygons)
}

module.exports = fromPointsConvex
