export = fromPointsRandom;
/**
 * Create a new plane from the given points like fromPoints,
 * but allow the vectors to be on one point or one line.
 * In such a case, a random plane through the given points is constructed.
 * @param {vec3} a - 3D point
 * @param {vec3} b - 3D point
 * @param {vec3} c - 3D point
 * @returns {plane} a new plane
 * @alias module:modeling/maths/plane.fromPointsRandom
 */
declare function fromPointsRandom(a: any, b: any, c: any): any;
