import { area } from '../../maths/utils/index.js'

/**
 * Measure the area under the given polygon.
 *
 * @param {poly2} polygon - the polygon to measure
 * @return {Number} the area of the polygon
 * @alias module:modeling/geometries/poly2.measureArea
 */
export const measureArea = (polygon) => area(polygon.points)
