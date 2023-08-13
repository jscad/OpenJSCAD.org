/**
 * Compare the given vectors for equality.
 *
 * @param {Vec2} a - first operand
 * @param {Vec2} b - second operand
 * @returns {Boolean} true if a and b are equal
 * @alias module:modeling/maths/vec2.equals
 */
export const equals = (a, b) => (a[0] === b[0]) && (a[1] === b[1])
