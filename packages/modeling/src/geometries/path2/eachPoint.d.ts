export = eachPoint;
/**
 * Calls a function for each point in the geometry.
 * @param {Object} options - options
 * @param {Function} thunk - the function to call
 * @param {path2} geometry - the geometry to traverse
 * @alias module:modeling/geometries/path2.eachPoint
 *
 * @example
 * eachPoint({}, accumulate, geometry)
 */
declare function eachPoint(options: any, thunk: Function, path: any): void;
