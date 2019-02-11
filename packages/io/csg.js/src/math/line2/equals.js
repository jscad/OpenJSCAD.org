/**
 * Compare the given 2D lines for equality
 *
 * @return {boolean} true if lines are equal
 */
const equals = (line1, line2) => {
  return (line1[0] === line2[0]) && (line1[1] === line2[1] && (line1[2] === line2[2]))
}

module.exports = equals
