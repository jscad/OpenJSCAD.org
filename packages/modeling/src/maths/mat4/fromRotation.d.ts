export = fromRotation;
/**
 * Creates a matrix from a given angle around a given axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotate(dest, dest, rad, axis);
 *
 * @param {mat4} [out] - mat4 receiving operation result
 * @param {Number} rad - the angle to rotate the matrix by
 * @param {vec3} axis - the axis to rotate around
 * @returns {mat4} a new matrix
 * @alias module:modeling/maths/mat4.fromRotation
 */
declare function fromRotation(...params: any[]): any;
