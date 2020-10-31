export = valueAt;
/**
 * Calculates the position at a specific point along a bezier easing curve.
 * For multidimensional curves, the tangent is the slope of each dimension at that point.
 * See the extrudeAlongPath.js example to see this in use.
 * Math and explanation comes from {@link https://www.freecodecamp.org/news/nerding-out-with-bezier-curves-6e3c0bc48e2f/}
 *
 * @example
 * const b = bezier.create([0,0,0], [0,5,10], [10,0,-5], [10,10,10]]) // a cubic 3 dimensional easing curve that can generate position arrays for modelling
 * let position = bezier.valueAt(t,b) // where 0 < t < 1
 *
 * @param {number} t The position that you want the bezier's tangent value at.
 * @param {Object} bezier A bezier curve created with bezier.create().
 * @returns {array | number} the tangent at the position t.
 * @alias module:modeling/curves/bezier.valueAt
 */
declare function valueAt(t: number, bezier: any): any[] | number;
