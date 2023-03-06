const valueAt = require("./valueAt")

/**
 * Divides the bezier curve into line segments and returns the cumulative length of those segments as an array.
 * Utility function used to calculate the curve's approximate length and determine the equivalence between arc length and time.
 * 
 * @example
 * const b = bezier.create([[0, 0], [0, 10]]);
 * const totalLength = lengths(b).pop(); // the last element of the array is the curve's approximate length
 * 
 * @param {Object} bezier a bezier curve.
 * @param {Number} [segments=100] the number of segments to use when approximating the curve length.
 * @returns an array containing the cumulative length of the segments.
 */
const lengths = (bezier, segments = 100) => {
  let sum = 0
  let lengths = [0]
  let previous = valueAt(0, bezier)
  for (let index = 1; index <= segments; index++) {
    const current = valueAt(index / segments, bezier)
    sum += distanceBetween(current, previous)
    lengths.push(sum)
    previous = current
  }
  return lengths
};

/**
 * Calculates the Euclidean distance between two n-dimensional points.
 *
 * @example
 * const distance = distanceBetween([0, 0], [0, 10]); // calculate distance between 2D points
 * console.log(distance); // output 10
 * 
 * @param {Array} a - first operand.
 * @param {Array} b - second operand.
 * @returns {Number} - distance.
 */
const distanceBetween = (a, b) => {
  if (Number.isFinite(a) && Number.isFinite(b)) {
    return Math.abs(a - b)
  } else if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) {
      throw new Error("The operands must have the same number of dimensions.")
    }
    let sum = 0
    for (let i = 0; i < a.length; i++) {
      sum += (b[i] - a[i]) * (b[i] - a[i])
    }
    return Math.sqrt(sum)
  } else {
    throw new Error("The operands must be of the same type, either number or array.")
  }
};

module.exports = lengths