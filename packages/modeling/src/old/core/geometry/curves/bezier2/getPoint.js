
const {cubicBezier} = require('../interpolations')
const vec2 = require('../../../math/vec2')

/**
 * get a point on the curve
 * NOTE: this is largely based on THREE.js implementation
 * @param {float} t - A position on the curve. In in the range [ 0, 1 ]
 * @param {curve} curve the bezier curve to get the point from
 * @returns {vec2} the resulting point
 */
const getPoint = (t, curve) => {
  const point = vec2.create()

  const [v0, v1, v2, v3] = curve.controlPoints


  point.set(
    cubicBezier(t, v0.x, v1.x, v2.x, v3.x),
    cubicBezier(t, v0.y, v1.y, v2.y, v3.y)
  )

  return point
}

module.exports = getPoint
