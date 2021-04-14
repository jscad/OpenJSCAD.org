/**
 * Compare the given planes for equality.
 *
 * @param {plane} a - the first plane
 * @param {plane} b - the second plane
 * @return {Boolean} true if planes are equal
 * @alias module:modeling/maths/plane.equals
 */
const equals = (a, b) => ((a[0] === b[0]) && (a[1] === b[1]) && (a[2] === b[2]) && (a[3] === b[3]))

module.exports = equals
