
const geom2 = require('../geometry/geom2')

/**
 * Convert a shape2 to a list of points.
 * The returned list of points take the transforms of the given shape into account
 * @param {Shape2} shape the shape to convert
 * @return {points[]} list of points in 2D space
 */
const toPoints = (params, shape) => {
  const transformedGeom = geom2.transform(shape.transforms, shape.geometry)
  return geom2.toPoints(params, transformedGeom)
}

module.exports = toPoints
