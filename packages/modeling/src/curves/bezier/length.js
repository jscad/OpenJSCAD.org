const lengths = require('./lengths')

/**
 * Approximates the length of the bezier curve by sampling it at a sequence of points, then adding up all the distances.
 * This is equivalent to flattening the curve into lines and adding up all the line lengths.
 *
 * @example
 * const b = bezier.create([[0, 0], [0, 10]]);
 * console.log(length(b)) // output 10
 * 
 * @param {Object} bezier a bezier curve.
 * @param {Number} [segments=100] the number of segments to use when approximating the curve length.
 * @returns an approximation of the curve's length.
 * @alias module:modeling/curves/bezier.length
 */
const length = (bezier, segments = 100) => {
  return lengths(bezier, segments)[segments]
};

module.exports = length