/**
 * Compare the given vectors for equality.
 *
 * @param {vec3} a - first operand
 * @param {vec3} b - second operand
 * @returns {Boolean} true if a and b are equal
 * @alias module:modeling/maths/vec3.equals
 */
const equals = (a, b) => (a[0] === b[0]) && (a[1] === b[1]) && (a[2] === b[2])

module.exports = equals
