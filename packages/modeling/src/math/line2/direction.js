const vec2 = require('../vec2')

/**
 * Return the direction of the given line.
 *
 * @param {line2} line - the 2D line for calculations
 * @return {vec2} a new relative vector in the direction of the line
 */
const direction = (line) => {
  const vector = vec2.normal(line)
  vec2.negate(vector, vector)
  return vector
}

module.exports = direction
