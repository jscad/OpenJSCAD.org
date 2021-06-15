const origin = require('./origin')

/**
 * Determine the X coordinate of the given line at the Y coordinate.
 *
 * The X coordinate will be Infinity if the line is parallel to the X axis.
 *
 * @param {line2} line - line of reference
 * @param {Number} y - Y coordinate on the line
 * @return {Number} the X coordinate on the line
 * @alias module:modeling/maths/line2.xAtY
 */
const xAtY = (line, y) => {
  let x = (line[2] - (line[1] * y)) / line[0]
  if (Number.isNaN(x)) {
    const org = origin(line)
    x = org[0]
  }
  return x
}

module.exports = xAtY
