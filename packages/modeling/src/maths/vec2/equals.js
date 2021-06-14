/**
 * Compare the given vectors for equality.
 *
 * @param {vec2} a - first operand
 * @param {vec2} b - second operand
 * @returns {Boolean} true if a and b are equal
 * @alias module:modeling/maths/vec2.equals
 */
const equals = (a, b) => (a[0] === b[0]) && (a[1] === b[1])

module.exports = equals
