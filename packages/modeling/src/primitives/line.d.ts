export = line;
/**
 * Construct a new line in two dimensional space from the given points.
 * The points must be provided as an array, where each element is 2D point.
 * @param {Array} points - array of points from which to create the path
 * @returns {path2} new 2D path
 * @alias module:modeling/primitives.line
 *
 * @example
 * let myshape = line([[10, 10], [-10, 10]])
 */
declare function line(points: any[]): any;
