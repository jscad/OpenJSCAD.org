export = fromTranslation;
/**
 * Creates a matrix from a vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, dest, vec);
 *
 * @param {mat4} [out] - mat4 receiving operation result
 * @param {vec3} v - Translation vector
 * @returns {mat4} a new matrix
 * @alias module:modeling/maths/mat4.fromTranslation
 */
declare function fromTranslation(...params: any[]): any;
