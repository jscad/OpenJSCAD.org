export = fromScaling;
/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.scale(dest, dest, vec);
 *
 * @param {mat4} [out] - mat4 receiving operation result
 * @param {vec3} v - Scaling vector
 * @returns {mat4} a new matrix
 * @alias module:modeling/maths/mat4.fromScaling
 */
declare function fromScaling(...params: any[]): any;
