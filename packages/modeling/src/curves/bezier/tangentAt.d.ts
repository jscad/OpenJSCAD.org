export = tangentAt;
/**
 * Calculates the tangent at a specific point along a bezier easing curve.
 * For multidimensional curves, the tangent is the slope of each dimension at that point.
 * See the extrudeAlongPath.js example to see this in use.
 *
 * @example
 * const b = bezier.create([0,0,0], [0,5,10], [10,0,-5], [10,10,10]]) // a cubic 3 dimensional easing curve that can generate position arrays for modelling
 * let tangent = bezier.tangentAt(t,b) // where 0 < t < 1
 *
 * @param {number} t The position that you want the bezier's tangent value at.
 * @param {Object} bezier An array with at least 2 elements of either all numbers, or all arrays of numbers that are the same size.
 * @returns {array | number} the tangent at the position.
 * @alias module:modeling/curves/bezier.tangentAt
 */
declare function tangentAt(t: number, bezier: any): any[] | number;
