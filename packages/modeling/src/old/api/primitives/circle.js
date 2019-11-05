const {defaultResolution2D} = require('../../core/constants')
const vec2 = require('../../core/math/vec2')
const {parseOptionAs2DVector, parseOptionAsFloat, parseOptionAsInt} = require('../optionParsers')
const fromPoints = require('../../core/geometry/shape2/fromPoints')

/** Construct a circle
 * @param {Object} [options] - options for construction
 * @param {Float} [options.r=1] - radius of the circle
 * @param {Integer} [options.fn=32] - segments of circle (ie quality/ resolution)
 * @param {Boolean} [options.center=true] - wether to center the circle or not
 * @returns {CAG} new circle
 *
 * @example
 * let circle1 = circle({
 *   r: 10
 * })
 */
function circle (params) {
  const defaults = {
    r: 1,
    fn: 32,
    center: false
  }
  let {r, fn, center} = Object.assign({}, defaults, params)
  if (params && !params.r && !params.fn && !params.center) r = params
  let offset = center === true ? [0, 0] : [r, r]
  return _circle({center: offset, radius: r, resolution: fn})
}

/** Construct a circle NON API !!
 * @param {Object} [options] - options for construction
 * @param {Vector2D} [options.center=[0,0]] - center of circle
 * @param {Number} [options.radius=1] - radius of circle
 * @param {Number} [options.resolution=defaultResolution2D] - number of sides per 360 rotation
 * @returns {CAG} new CAG object
 */
const _circle = function (options) {
  options = options || {}
  let center = parseOptionAs2DVector(options, 'center', [0, 0])
  let radius = parseOptionAsFloat(options, 'radius', 1)
  let resolution = parseOptionAsInt(options, 'resolution', defaultResolution2D)
  let points = []
  for (let i = 0; i < resolution; i++) {
    let radians = 2 * Math.PI * i / resolution
    let point = vec2.add(
      vec2.scale(
        vec2.fromAngleRadians(radians),
        radius
      ),
      center
    )
    points.push(point)
  }
  return fromPoints(points)
}

module.exports = circle
