/**
 * Compare the given lines for equality.
 *
 * @param {line2} a - the first line to compare
 * @param {line2} b - the second line to compare
 * @return {Boolean} true if lines are equal
 * @alias module:modeling/math/line2.equals
 */
const equals = (line1, line2) => {
  return (line1[0] === line2[0]) && (line1[1] === line2[1] && (line1[2] === line2[2]))
}

module.exports = equals
