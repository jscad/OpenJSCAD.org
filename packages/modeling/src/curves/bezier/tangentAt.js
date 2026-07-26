/**
 * Calculates the tangent at a specific arc length along a bezier easing curve.
 *
 * For multidimensional curves, the tangent is the slope of each dimension at the given arc length.
 *
 * @param {Number} t - the position of which to calculate the tangent value; 0 < t < 1
 * @param {Bezier} bezier - a bezier curve
 * @return {Array | Number} the tangent at the requested position.
 * @alias module:modeling/bezier.tangentAt
 *
 * @example
 * const b = bezier.create([[0,0,0], [0,5,10], [10,0,-5], [10,10,10]])
 * let tangent = bezier.tangentAt(t, b)
 */
export const tangentAt = (t, bezier) => {
  if (t < 0 || t > 1) {
    throw new Error('Bezier tangentAt() t must be between 0 and 1')
  }
  if (bezier.pointType === 'float_single') {
    return bezierTangent(bezier, bezier.points, t)
  } else {
    const result = []
    for (let i = 0; i < bezier.dimensions; i++) {
      const singleDimensionPoints = []
      for (let j = 0; j < bezier.points.length; j++) {
        singleDimensionPoints.push(bezier.points[j][i])
      }
      result.push(bezierTangent(bezier, singleDimensionPoints, t))
    }
    return result
  }
}

const bezierTangent = function (bezier, p, t) {
  // from https://pages.mtu.edu/~shene/COURSES/cs3621/NOTES/spline/Bezier/bezier-der.html
  const n = p.length - 1
  let result = 0
  for (let i = 0; i < n; i++) {
    const q = n * (p[i + 1] - p[i])
    result += bezier.tangentPermutations[i] * Math.pow(1 - t, n - 1 - i) * Math.pow(t, i) * q
  }
  return result
}
