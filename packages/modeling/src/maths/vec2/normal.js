const create = require('./create')
const rotate = require('./rotate')

/**
 * Calculates the normal of the given vector.
 * The normal value is the given vector rotated 90 degress.
 *
 * @param {vec2} out - receiving vector
 * @param {vec2} vector - given value
 * @returns {vec2} out
 * @alias module:modeling/maths/vec2.normal
 */
const normal = (out, vector) => rotate(out, vector, create(), (Math.PI / 2))

module.exports = normal
