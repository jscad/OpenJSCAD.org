export = lerp;
/**
 * Performs a linear interpolation between two vectors.
 *
 * @param {vec3} [out] - the receiving vector
 * @param {Number} t - interpolant (0.0 to 1.0) applied between the two inputs
 * @param {vec3} a - the first operand
 * @param {vec3} b - the second operand
 * @returns {vec3} a new vector
 * @alias module:modeling/maths/vec3.lerp
 */
declare function lerp(...params: any[]): any;
