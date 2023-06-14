const lengths = require('./lengths')

/**
 * Convert a given arc length along a bezier curve to a t value.
 * Useful for generating equally spaced points along a bezier curve.
 *
 * @example
 * const points = [];
 * const segments = 9; // this will generate 10 equally spaced points
 * const increment = bezier.length(100, bezierCurve) / segments;
 * for(let i = 0; i <= segments; i++) {
 *   const t = bezier.arcLengthToT({distance: i * increment}, bezierCurve);
 *   const point = bezier.valueAt(t, bezierCurve);
 *   points.push(point);
 * }
 * return points;
 *
 * @param {Object} [options] options for construction
 * @param {Number} [options.distance=0] the distance along the bezier curve for which we want to find the corresponding t value.
 * @param {Number} [options.segments=100] the number of segments to use when approximating the curve length.
 * @param {Object} bezier a bezier curve.
 * @returns a number in the [0, 1] interval or NaN if the arcLength is negative or greater than the total length of the curve.
 * @alias module:modeling/curves/bezier.arcLengthToT
 */
const arcLengthToT = (options, bezier) => {
  const defaults = {
    distance: 0,
    segments: 100
  }
  const { distance, segments } = Object.assign({}, defaults, options)

  const arcLengths = lengths(segments, bezier)
  // binary search for the index with largest value smaller than target arcLength
  let startIndex = 0
  let endIndex = segments
  while (startIndex <= endIndex) {
    const middleIndex = Math.floor(startIndex + (endIndex - startIndex) / 2)
    const diff = arcLengths[middleIndex] - distance
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
  if (arcLengths[targetIndex] === distance) {
    return targetIndex / segments
  }
  // we could get finer grain at lengths, or use simple interpolation between two points
  const lengthBefore = arcLengths[targetIndex]
  const lengthAfter = arcLengths[targetIndex + 1]
  const segmentLength = lengthAfter - lengthBefore
  // determine where we are between the 'before' and 'after' points
  const segmentFraction = (distance - lengthBefore) / segmentLength
  // add that fractional amount and return
  return (targetIndex + segmentFraction) / segments
}

module.exports = arcLengthToT
