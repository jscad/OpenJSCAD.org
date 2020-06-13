/**
 * Represents a 3-dimensional vector.
 * See fromValues().
 * @typedef {Array} vec3
 */

/**
 * Creates a new vector initialized to 0,0,0.
 *
 * @returns {vec3} a new vector
 * @alias module:modeling/math/vec3.create
 */
const create = () => new Float32Array(3) // 0, 0, 0

module.exports = create
