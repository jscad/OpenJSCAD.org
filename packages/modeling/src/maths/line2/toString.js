/**
 * Return a string representing the given line.
 *
 * @param {line2} line - line of reference
 * @returns {String} string representation
 * @alias module:modeling/maths/line2.toString
 */
const toString = (line) => `line2: (${line[0].toFixed(7)}, ${line[1].toFixed(7)}, ${line[2].toFixed(7)})`

module.exports = toString
