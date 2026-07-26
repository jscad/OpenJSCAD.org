import { area } from '../../maths/utils/area.js'

/**
 * Measure the area under the given polygon.
 *
 * @param {Poly2} polygon - the polygon to measure
 * @return {Number} the area of the polygon
 * @alias module:modeling/poly2.measureArea
 *
 * @example
 * const area = poly2.measureArea(geometry)
 */
export const measureArea = (polygon) => area(polygon.points)
