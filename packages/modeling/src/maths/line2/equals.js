/**
 * Compare the given lines for equality.
 *
 * @param {line2} a - first line to compare
 * @param {line2} b - second line to compare
 * @return {Boolean} true if lines are equal
 * @alias module:modeling/maths/line2.equals
 */
const equals = (line1, line2) => (line1[0] === line2[0]) && (line1[1] === line2[1] && (line1[2] === line2[2]))

module.exports = equals
