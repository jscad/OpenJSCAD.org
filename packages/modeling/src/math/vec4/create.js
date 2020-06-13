/**
 * Represents a 4-dimensional vector.
 * See fromValues().
 * @typedef {Array} vec4
 */

/**
 * Creates a new vector initialized to zero.
 *
 * @returns {vec4} a new vector
 * @alias module:modeling/math/vec4.create
 */
const create = () => new Float32Array(4) // 0, 0, 0, 0

module.exports = create
