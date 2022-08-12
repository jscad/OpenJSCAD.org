const { TAU } = require('../../maths/constants')
const vec2 = require('../../maths/vec2')

const fromPoints = require('./fromPoints')
const toPoints = require('./toPoints')

/**
 * Append a series of points to the given geometry that represent an arc.
 * This implementation follows the SVG specifications.
 * @see http://www.w3.org/TR/SVG/paths.html#PathDataEllipticalArcCommands
 * @param {Object} options - options for construction
 * @param {vec2} options.endpoint - end point of arc (REQUIRED)
 * @param {vec2} [options.radius=[0,0]] - radius of arc (X and Y)
 * @param {Number} [options.xaxisrotation=0] - rotation (RADIANS) of the X axis of the arc with respect to the X axis of the coordinate system
 * @param {Boolean} [options.clockwise=false] - draw an arc clockwise with respect to the center point
 * @param {Boolean} [options.large=false] - draw an arc longer than TAU / 2 radians
 * @param {Number} [options.segments=16] - number of segments per full rotation
 * @param {path2} geometry - the path of which to append the arc
 * @returns {path2} a new path with the appended points
 * @alias module:modeling/geometries/path2.appendArc
 *
 * @example
 * let p1 = path2.fromPoints({}, [[27.5,-22.96875]]);
 * p1 = path2.appendPoints([[27.5,-3.28125]], p1);
 * p1 = path2.appendArc({endpoint: [12.5, -22.96875], radius: [15, -19.6875]}, p1);
 */
const appendArc = (options, geometry) => {
  const defaults = {
    radius: [0, 0], // X and Y radius
    xaxisrotation: 0,
    clockwise: false,
    large: false,
    segments: 16
  }
  let { endpoint, radius, xaxisrotation, clockwise, large, segments } = Object.assign({}, defaults, options)

  // validate the given options
  if (!Array.isArray(endpoint)) throw new Error('endpoint must be an array of X and Y values')
  if (endpoint.length < 2) throw new Error('endpoint must contain X and Y values')
  endpoint = vec2.clone(endpoint)

  if (!Array.isArray(radius)) throw new Error('radius must be an array of X and Y values')
  if (radius.length < 2) throw new Error('radius must contain X and Y values')

  if (segments < 4) throw new Error('segments must be four or more')

  const decimals = 100000

  // validate the given geometry
  if (geometry.isClosed) {
    throw new Error('the given path cannot be closed')
  }

  const points = toPoints(geometry)
  if (points.length < 1) {
    throw new Error('the given path must contain one or more points (as the starting point for the arc)')
  }

  let xradius = radius[0]
  let yradius = radius[1]
  const startpoint = points[points.length - 1]

  // round to precision in order to have determinate calculations
  xradius = Math.round(xradius * decimals) / decimals
  yradius = Math.round(yradius * decimals) / decimals
  endpoint = vec2.fromValues(Math.round(endpoint[0] * decimals) / decimals, Math.round(endpoint[1] * decimals) / decimals)

  const sweepFlag = !clockwise
  let newpoints = []
  if ((xradius === 0) || (yradius === 0)) {
    // http://www.w3.org/TR/SVG/implnote.html#ArcImplementationNotes:
    // If rx = 0 or ry = 0, then treat this as a straight line from (x1, y1) to (x2, y2) and stop
    newpoints.push(endpoint)
  } else {
    xradius = Math.abs(xradius)
    yradius = Math.abs(yradius)

    // see http://www.w3.org/TR/SVG/implnote.html#ArcImplementationNotes :
    const phi = xaxisrotation
    const cosphi = Math.cos(phi)
    const sinphi = Math.sin(phi)
    const minushalfdistance = vec2.subtract(vec2.create(), startpoint, endpoint)
    vec2.scale(minushalfdistance, minushalfdistance, 0.5)
    // F.6.5.1:
    // round to precision in order to have determinate calculations
    const x = Math.round((cosphi * minushalfdistance[0] + sinphi * minushalfdistance[1]) * decimals) / decimals
    const y = Math.round((-sinphi * minushalfdistance[0] + cosphi * minushalfdistance[1]) * decimals) / decimals
    const startTranslated = vec2.fromValues(x, y)
    // F.6.6.2:
    const biglambda = (startTranslated[0] * startTranslated[0]) / (xradius * xradius) + (startTranslated[1] * startTranslated[1]) / (yradius * yradius)
    if (biglambda > 1.0) {
      // F.6.6.3:
      const sqrtbiglambda = Math.sqrt(biglambda)
      xradius *= sqrtbiglambda
      yradius *= sqrtbiglambda
      // round to precision in order to have determinate calculations
      xradius = Math.round(xradius * decimals) / decimals
      yradius = Math.round(yradius * decimals) / decimals
    }
    // F.6.5.2:
    let multiplier1 = Math.sqrt((xradius * xradius * yradius * yradius - xradius * xradius * startTranslated[1] * startTranslated[1] - yradius * yradius * startTranslated[0] * startTranslated[0]) / (xradius * xradius * startTranslated[1] * startTranslated[1] + yradius * yradius * startTranslated[0] * startTranslated[0]))
    if (sweepFlag === large) multiplier1 = -multiplier1
    const centerTranslated = vec2.fromValues(xradius * startTranslated[1] / yradius, -yradius * startTranslated[0] / xradius)
    vec2.scale(centerTranslated, centerTranslated, multiplier1)
    // F.6.5.3:
    let center = vec2.fromValues(cosphi * centerTranslated[0] - sinphi * centerTranslated[1], sinphi * centerTranslated[0] + cosphi * centerTranslated[1])
    center = vec2.add(center, center, vec2.scale(vec2.create(), vec2.add(vec2.create(), startpoint, endpoint), 0.5))

    // F.6.5.5:
    const vector1 = vec2.fromValues((startTranslated[0] - centerTranslated[0]) / xradius, (startTranslated[1] - centerTranslated[1]) / yradius)
    const vector2 = vec2.fromValues((-startTranslated[0] - centerTranslated[0]) / xradius, (-startTranslated[1] - centerTranslated[1]) / yradius)
    const theta1 = vec2.angleRadians(vector1)
    const theta2 = vec2.angleRadians(vector2)
    let deltatheta = theta2 - theta1
    deltatheta = deltatheta % TAU
    if ((!sweepFlag) && (deltatheta > 0)) {
      deltatheta -= TAU
    } else if ((sweepFlag) && (deltatheta < 0)) {
      deltatheta += TAU
    }

    // Ok, we have the center point and angle range (from theta1, deltatheta radians) so we can create the ellipse
    let numsteps = Math.ceil(Math.abs(deltatheta) / TAU * segments) + 1
    if (numsteps < 1) numsteps = 1
    for (let step = 1; step < numsteps; step++) {
      const theta = theta1 + step / numsteps * deltatheta
      const costheta = Math.cos(theta)
      const sintheta = Math.sin(theta)
      // F.6.3.1:
      const point = vec2.fromValues(cosphi * xradius * costheta - sinphi * yradius * sintheta, sinphi * xradius * costheta + cosphi * yradius * sintheta)
      vec2.add(point, point, center)
      newpoints.push(point)
    }
    // ensure end point is precisely what user gave as parameter
    if (numsteps) newpoints.push(options.endpoint)
  }
  newpoints = points.concat(newpoints)
  const result = fromPoints({}, newpoints)
  return result
}

module.exports = appendArc
