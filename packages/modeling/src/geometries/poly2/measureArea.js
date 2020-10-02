/**
 * Measure the area under the given polygon.
 *
 * @param {poly2} polygon - the polygon to measure
 * @return {Number} the area of the polygon
 * @alias module:modeling/geometries/poly2.measureArea
 */
const area = require('../../maths/utils/area')

const measureArea = (polygon) => area(polygon.vertices)

module.exports = measureArea
