const lengths = require('./lengths')

/**
 * Approximates the length of the bezier curve by sampling it at a sequence of points, then adding up all the distances.
 * This is equivalent to flattening the curve into lines and adding up all the line lengths.
 *
 * @example
 * const b = bezier.create([[0, 0], [0, 10]]);
 * console.log(length(100, b)) // output 10
 *
 * @param {Number} segments the number of segments to use when approximating the curve length.
 * @param {Object} bezier a bezier curve.
 * @returns an approximation of the curve's length.
 * @alias module:modeling/curves/bezier.length
 */
const length = (segments, bezier) => lengths(segments, bezier)[segments]

module.exports = length
