/**
 * Compare the given vectors for equality.
 *
 * @param {Vec3} a - first operand
 * @param {Vec3} b - second operand
 * @returns {Boolean} true if a and b are equal
 * @alias module:modeling/maths/vec3.equals
 */
export const equals = (a, b) => (a[0] === b[0]) && (a[1] === b[1]) && (a[2] === b[2])
