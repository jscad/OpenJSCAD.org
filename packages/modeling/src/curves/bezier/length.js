import { lengths } from './lengths.js'

/**
 * Approximates the length of the bezier curve by sampling it at a sequence of points.
 *
 * This is equivalent to flattening the curve into line segments and summing all the lengths.
 *
 * @param {Number} segments - the number of segments to use when approximating the curve length
 * @param {Bezier} bezier - a bezier curve
 * @returns {Number} an approximation of the length
 * @alias module:modeling/bezier.length
 *
 * @example
 * const b = bezier.create([[0, 0], [0, 10]])
 * console.log(length(100, b)) // output 10
 */
export const length = (segments, bezier) => lengths(segments, bezier)[segments]
