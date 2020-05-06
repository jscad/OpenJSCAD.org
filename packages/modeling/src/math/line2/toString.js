/**
 * Return a string representing the given line.
 *
 * @param {line2} line the 2D line of reference
 * @returns {String} string representation
 * @alias module:modeling/math/line2.toString
 */
const toString = (line) => {
  return `line2: (${line[0].toFixed(7)}, ${line[1].toFixed(7)}, ${line[2].toFixed(7)})`
  // return `line2: (${line[0]}, ${line[1]}, ${line[2]})`
}

module.exports = toString
