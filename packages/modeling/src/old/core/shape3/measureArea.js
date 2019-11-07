const geom3 = require('../geometry/geom3')

/** Compute & return the area of the given shape
 * @param  {Shape3} shape
 * @returns  {float} the computed area
 */
const measureArea = shape => {
  // FIXME: we might be able to get measurements without having to apply transforms ?
  const transformedGeom = geom3.transform(shape.transforms, shape.geometry)
  const geomArea = geom3.measureArea(transformedGeom)
  return geomArea
}

module.exports = measureArea
