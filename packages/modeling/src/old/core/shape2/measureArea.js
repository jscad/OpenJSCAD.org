const geom2 = require('../geometry/geom2')

/** Calculate the area of the given Shape2
 * @param  {Shape2} shape
 * @returns {float} the area of the 2d geometry
 * @example
 * const area = measureArea(rectangle())
 */
const measureArea = shape => {
  const transformedGeom = geom2.transform(shape.transforms, shape.geometry)
  return geom2.measureArea(transformedGeom)
}

module.exports = measureArea
