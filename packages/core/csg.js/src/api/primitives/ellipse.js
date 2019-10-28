const {defaultResolution2D} = require('../../core/constants')
const path2 = require('../../core/geometry/path2')
const shape2 = require('../../core/geometry/shape2')
const vec2 = require('../../core/math/vec2')
const {parseOptionAs2DVector, parseOptionAsInt} = require('../optionParsers')

/** Construct an ellispe.
 * @param {Object} [options] - options for construction
 * @param {Vec2} [options.center=[0,0]] - center of ellipse
 * @param {Vec2} [options.radius=[1,1]] - radius of ellipse, width and height
 * @param {Number} [options.resolution=defaultResolution2D] - number of sides per 360 rotation
 * @returns {Shape2} new Shape2 object
 */
const ellipse = function (options) {
  options = options || {}
  const center = parseOptionAs2DVector(options, 'center', [0, 0])
  const radius = vec2.abs(parseOptionAs2DVector(options, 'radius', [1, 1]))// negative radii make no sense
  const segments = parseOptionAsInt(options, 'resolution', defaultResolution2D)

  /* let e2 = path2.fromPoints([[center.x, center.y + radius.y]])
  e2 = e2.appendArc([center.x, center.y - radius.y], {
    xradius: radius.x,
    yradius: radius.y,
    xaxisrotation: 0,
    resolution: segments,
    clockwise: true,
    large: false
  })
  e2 = e2.appendArc([center.x, center.y + radius.y], {
    xradius: radius.x,
    yradius: radius.y,
    xaxisrotation: 0,
    resolution: segments,
    clockwise: true,
    large: false
  })
  e2 = e2.close()
  return fromPath2(e2)
  */

  const result = shape2.fromCurves({
    curves: [
      path2.arc({
        origin: [center[0], center[1] - radius[1]],
        radius: radius,
        xaxisrotation: 0,
        resolution: segments,
        clockwise: true,
        large: false
      }),
      path2.arc({
        origin: [center[0], center[1] + radius[1]],
        radius: radius,
        xaxisrotation: 0,
        resolution: segments,
        clockwise: true,
        large: false
      })
    ]
  })
  return result
}

module.exports = ellipse
