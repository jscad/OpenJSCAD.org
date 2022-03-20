const { EPS } = require('../../maths/constants')

const measureBoundingBox = require('../../measurements/measureBoundingBox')

/*
 * Determine if the given geometries overlap by comparing min and max bounds.
 * NOTE: This is used in union for performance gains.
 * @param {geom3} geometry1 - geometry for comparison
 * @param {geom3} geometry2 - geometry for comparison
 * @returns {boolean} true if the geometries overlap
 */
const mayOverlap = (geometry1, geometry2) => {
  // FIXME accessing the data structure of the geometry should not be allowed
  if ((geometry1.polygons.length === 0) || (geometry2.polygons.length === 0)) {
    return false
  }

  const bounds1 = measureBoundingBox(geometry1)
  const min1 = bounds1[0]
  const max1 = bounds1[1]

  const bounds2 = measureBoundingBox(geometry2)
  const min2 = bounds2[0]
  const max2 = bounds2[1]

  if ((min2[0] - max1[0]) > EPS) return false
  if ((min1[0] - max2[0]) > EPS) return false
  if ((min2[1] - max1[1]) > EPS) return false
  if ((min1[1] - max2[1]) > EPS) return false
  if ((min2[2] - max1[2]) > EPS) return false
  if ((min1[2] - max2[2]) > EPS) return false
  return true
}

module.exports = mayOverlap
