const lengths = require('./lengths')

/**
 * Convert a given arc length along a bezier curve to a t value.
 * Useful for generating equally spaced points along a bezier curve.
 * 
 * @example
 * const points = [];
 * const segments = 9; // this will generate 10 equally spaced points
 * const increment = bezier.length(bezierCurve) / segments;
 * for(let i = 0; i <= segments; i++) {
 *   const t = bezier.arcLengthToT(i * increment, bezierCurve);
 *   const point = bezier.valueAt(t, bezierCurve);
 *   points.push(point);
 * }
 * return points;
 * 
 * @param {Number} arcLength the arc length for which we want to find the corresponding t value.
 * @param {Object} bezier a bezier curve.
 * @param {Number} [segments=100] the number of segments to use when approximating the curve length.
 * @returns a number in the [0, 1] interval or NaN if the arcLength is negative or greater than the total length of the curve.
 * @alias module:modeling/curves/bezier.arcLengthToT
 */
const arcLengthToT = (arcLength, bezier, segments = 100) => {
  const arcLengths = lengths(bezier, segments)
  // binary search for the index with largest value smaller than target arcLength
  let startIndex = 0
  let endIndex = segments
  while (startIndex <= endIndex) {
    const middleIndex = Math.floor(startIndex + (endIndex - startIndex) / 2)
    const diff = arcLengths[middleIndex] - arcLength
    if (diff < 0) {
      startIndex = middleIndex + 1
    } else if (diff > 0) {
      endIndex = middleIndex - 1
    } else {
      endIndex = middleIndex
      break
    }
  }
  // if we have an exact match, return it
  const targetIndex = endIndex
  if (arcLengths[targetIndex] === arcLength) {
    return targetIndex / segments
  }
  // we could get finer grain at lengths, or use simple interpolation between two points
  const lengthBefore = arcLengths[targetIndex]
  const lengthAfter = arcLengths[targetIndex + 1]
  const segmentLength = lengthAfter - lengthBefore
  // determine where we are between the 'before' and 'after' points
  const segmentFraction = (arcLength - lengthBefore) / segmentLength
  // add that fractional amount and return
  return (targetIndex + segmentFraction) / segments
};

module.exports = arcLengthToT