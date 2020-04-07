/**
 * Represents a 2-dimensional vector.
 * See fromValues().
 * @typedef {Array} vec2
 */

/**
 * Creates a new vector, intialized to 0,0.
 *
 * @returns {vec2} a new vector
 * @alias module:modeling/math/vec2.create
 */
const create = () => {
  return new Float32Array(2) // 0, 0
}

module.exports = create
