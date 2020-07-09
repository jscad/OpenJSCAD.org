const fromValues = require('./fromValues')

/**
 * Create a new vector by extending a 2D vector with a Z value.
 * @param {Array} vector - the vector of values
 * @param {Number} [z=0] - Z value
 * @alias module:modeling/maths/vec3.fromVec2
 */
const fromVector2 = (vec2, z = 0) => fromValues(vec2[0], vec2[1], z)

module.exports = fromVector2
