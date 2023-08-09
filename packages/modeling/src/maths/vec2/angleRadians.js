/**
 * Calculate the angle of the given vector.
 *
 * @param {Vec2} vector - vector of reference
 * @returns {number} angle in radians
 * @alias module:modeling/maths/vec2.angleRadians
 */
export const angleRadians = (vector) => Math.atan2(vector[1], vector[0]) // y=sin, x=cos
