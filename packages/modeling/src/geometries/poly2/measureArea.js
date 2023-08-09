import { area } from '../../maths/utils/area.js'

/**
 * Measure the area under the given polygon.
 *
 * @param {Poly2} polygon - the polygon to measure
 * @return {number} the area of the polygon
 * @alias module:modeling/geometries/poly2.measureArea
 */
export const measureArea = (polygon) => area(polygon.points)
