module.exports = equals

/**
 * Compare the given planes for equality
 * @return {boolean} true if planes are equal
 */
function equals (a, b) {
  return ((a[0] === b[0]) && (a[1] === b[1]) && (a[2] === b[2]) && (a[3] === b[3]))
}
