export = fromPoints;
/**
 * Create a slice from the given points.
 *
 * @param {Array} points - list of points, where each point is either 2D or 3D
 * @returns {slice} a new slice
 * @alias module:modeling/extrusions/slice.fromPoints
 *
 * @example
 * const points = [
 *   [0,  0],
 *   [0, 10],
 *   [0, 10]
 * ]
 * const slice = fromPoints(points)
 */
declare function fromPoints(points: any[]): any;
