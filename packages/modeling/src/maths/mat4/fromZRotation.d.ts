export = fromZRotation;
/**
 * Creates a matrix from the given angle around the Z axis.
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateZ(dest, dest, rad);
 *
 * @param {mat4} [out] - mat4 receiving operation result
 * @param {Number} rad - the angle to rotate the matrix by
 * @returns {mat4} a new matrix
 * @alias module:modeling/maths/mat4.fromZRotation
 */
declare function fromZRotation(...params: any[]): any;
