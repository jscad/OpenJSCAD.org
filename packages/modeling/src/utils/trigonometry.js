const { NEPS } = require('../maths/constants')

/*
 * Returns zero if n is within epsilon of zero, otherwise return n
 */
const rezero = (n) => Math.abs(n) < NEPS ? 0 : n

/**
 * Return Math.sin but accurate for 90 degree rotations.
 * Fixes rounding errors when sin should be 0.
 *
 * @param {Number} radians - angle in radians
 * @returns {Number} sine of the given angle
 * @alias module:modeling/utils.sin
 * @example
 * sin(Math.PI) == 0
 * sin(2 * Math.PI) == 0
 */
const sin = (radians) => rezero(Math.sin(radians))

/**
 * Return Math.cos but accurate for 90 degree rotations.
 * Fixes rounding errors when cos should be 0.
 *
 * @param {Number} radians - angle in radians
 * @returns {Number} cosine of the given angle
 * @alias module:modeling/utils.cos
 * @example
 * cos(0.5 * Math.PI) == 0
 * cos(1.5 * Math.PI) == 0
 */
const cos = (radians) => rezero(Math.cos(radians))

module.exports = { sin, cos }
