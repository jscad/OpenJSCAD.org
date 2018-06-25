const vec2 = require('../../core/math/vec2')
const {fromPoints} = require('../../core/geometry/shape2')
const {parseOptionAs2DVector, parseOptionAsFloat, parseOptionAsInt} = require('../optionParsers')
const {isArray, isBoolean, isNumber} = require('../../core/utils')

const getCenterFromOptionsAndSize = (center = [0.5, 0.5], options, size) => {
  if (options && !options.center) {
    center = [size[0] * 0.5, size[1] * 0.5]
  }
  if (options && options.center && isBoolean(options.center) && options.center === true) {
    center = [0, 0]
  }
  if (options && options.center && isArray(options.center) && options.center.length > 1) {
    if (isBoolean(options.center[0])) {
      center[0] = options.center[0] === true ? 0 : size[0] * 0.5
    }
    if (isBoolean(options.center[1])) {
      center[1] = options.center[1] === true ? 0 : size[1] * 0.5
    }
    if (isNumber(options.center[0])) {
      center[0] = options.center[0]
    }
    if (isNumber(options.center[1])) {
      center[1] = options.center[1]
    }
  }
  return center
}

/** Construct a rectangle
 * @param {Object} [options] - options for construction
 * @param {Float} [options.size=1] - size of the square, either as array or scalar
 * @param {Boolean|Array} [options.center=false] - wether to center the rectangle/square or not: can
 * either be a single boolean, array of booleans, or array of floats
 * @returns {CAG} new rectangle
 * @example
 * let rectangle1 = rectangle({
 *   size: 10
 * })
 */
const rectangle = function (options) {
  const defaults = {
    size: [1, 1],
    center: [0.5, 0.5]
  }
  let params = {}
  if (isArray(options)) {
    params.size = options
  }
  if (isNumber(options)) {
    params.size = [options, options]
  }

  let {size, center} = Object.assign({}, defaults, options, params)

  if (options && !options.center) {
    center = [size[0] * 0.5, size[1] * 0.5]
  }
  if (options && options.center && isBoolean(options.center) && options.center === true) {
    center = [0, 0]
  }
  if (options && options.center && isArray(options.center) && options.center.length > 1) {
    if (isBoolean(options.center[0])) {
      center[0] = options.center[0] === true ? 0 : size[0] * 0.5
    }
    if (isBoolean(options.center[1])) {
      center[1] = options.center[1] === true ? 0 : size[1] * 0.5
    }
    if (isNumber(options.center[0])) {
      center[0] = options.center[0]
    }
    if (isNumber(options.center[1])) {
      center[1] = options.center[1]
    }
  }

  const halfWidth = size[0] * 0.5
  const halfLength = size[1] * 0.5
  const points = [
    [center[0] - halfWidth, center[1] - halfLength],
    [center[0] + halfWidth, center[1] - halfLength],
    [center[0] + halfWidth, center[1] + halfLength],
    [center[0] - halfWidth, center[1] + halfLength]
  ]
  return fromPoints(points)
}

/** Construct a rounded rectangle.
 * @param {Object} [options] - options for construction
 * @param {vec2} [options.center=[0,0]] - center of rounded rectangle
 * @param {vec2} [options.radius=[1,1]] - radius of rounded rectangle, width and height
 * @param {vec2} [options.corner1=[0,0]] - bottom left corner of rounded rectangle (alternate)
 * @param {vec2} [options.corner2=[0,0]] - upper right corner of rounded rectangle (alternate)
 * @param {Number} [options.roundradius=0.2] - round radius of corners
 * @param {Number} [options.resolution=defaultResolution2D] - number of sides per 360 rotation
 * @returns {CAG} new CAG object
 *
 * @example
 * let r = roundedRectangle({
 *   center: [0, 0],
 *   radius: [5, 10],
 *   roundradius: 2,
 *   resolution: 36,
 * });
 */
const roundedRectangle = function (options) {
  options = options || {}
  let center, radius
  if (('corner1' in options) || ('corner2' in options)) {
    if (('center' in options) || ('radius' in options)) {
      throw new Error('roundedRectangle: should either give a radius and center parameter, or a corner1 and corner2 parameter')
    }
    let corner1 = parseOptionAs2DVector(options, 'corner1', [0, 0])
    let corner2 = parseOptionAs2DVector(options, 'corner2', [1, 1])
    center = corner1.plus(corner2).times(0.5)
    radius = corner2.minus(corner1).times(0.5)
  } else {
    center = parseOptionAs2DVector(options, 'center', [0, 0])
    radius = parseOptionAs2DVector(options, 'radius', [1, 1])
  }
  radius = radius.abs() // negative radii make no sense
  let roundradius = parseOptionAsFloat(options, 'roundradius', 0.2)
  let resolution = parseOptionAsInt(options, 'resolution', defaultResolution2D)
  let maxroundradius = Math.min(radius.x, radius.y)
  maxroundradius -= 0.1
  roundradius = Math.min(roundradius, maxroundradius)
  roundradius = Math.max(0, roundradius)
  radius = vec2.fromValues(radius.x - roundradius, radius.y - roundradius)
  let rect = rectangle({
    center: center,
    radius: radius
  })
  if (roundradius > 0) {
    rect = rect.expand(roundradius, resolution)
  }
  return rect
}

module.exports = rectangle
