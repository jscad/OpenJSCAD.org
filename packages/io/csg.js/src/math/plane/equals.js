/**
 * Compare the given planes for equality
 *
 * @param {plane} a - the first plane
 * @param {plane} b - the second plane
 * @return {boolean} true if planes are equal
 */
const equals = (a, b) => {
  return ((a[0] === b[0]) && (a[1] === b[1]) && (a[2] === b[2]) && (a[3] === b[3]))
}

module.exports = equals
