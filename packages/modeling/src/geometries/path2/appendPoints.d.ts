export = appendPoints;
/**
 * Append the given list of points to the end of the given geometry.
 * @param {Array} points - the points (2D) to concatenate
 * @param {path2} geometry - the given path
 * @returns {path2} a new path with the appended points
 * @alias module:modeling/geometries/path2.appendPoints
 *
 * @example
 * let newpath = concat(fromPoints({}, [[1, 2]]), fromPoints({}, [[3, 4]]))
 */
declare function appendPoints(points: any[], geometry: any): any;
