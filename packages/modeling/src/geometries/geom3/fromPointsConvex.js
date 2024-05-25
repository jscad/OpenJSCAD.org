const quickhull = require('../../operations/hulls/quickhull')
const create = require('./create')
const poly3 = require('../poly3')

/**
 * Construct a new convex 3D geometry from a list of points.
 * @param {Array} listofpoints - list of points to construct convex 3D geometry
 * @returns {geom3} a new geometry
 * @alias module:modeling/geometries/geom3.fromPointsConvex
 */
const fromPointsConvex = (listofpoints) => {
  if (!Array.isArray(listofpoints)) {
    throw new Error('the given points must be an array')
  }

  const faces = quickhull(listofpoints, { skipTriangulation: true })

  const polygons = faces.map((face) => {
    const vertices = face.map((index) => listofpoints[index])
    return poly3.create(vertices)
  })

  return create(polygons)
}

module.exports = fromPointsConvex
