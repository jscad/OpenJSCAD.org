import * as vec2 from '../../maths/vec2/index.js'

/**
 * @param {poly2} polygon - the polygon to measure
 * @returns {Array} an array of two vectors (2D);  minimum and maximum coordinates
 * @alias module:modeling/geometries/poly2.measureBoundingBox
 */
export const measureBoundingBox = (polygon) => {
  const points = polygon.points
  const numPoints = points.length
  const min = numPoints === 0 ? vec2.create() : vec2.clone(points[0])
  const max = vec2.clone(min)
  for (let i = 1; i < numPoints; i++) {
    vec2.min(min, min, points[i])
    vec2.max(max, max, points[i])
  }
  return [min, max]
}
