const vec3 = require('../vec3')

/**
 * Create a copy of the given 3D line.
 *
 * @param {line3} out - the receiving line
 * @param {line3} line - the line to copy
 * @returns {line3} out
 * @alias module:modeling/maths/line3.copy
 */
const copy = (out, line) => {
  vec3.copy(out[0], line[0])
  vec3.copy(out[1], line[1])
  return out
}

module.exports = copy
