import { TAU } from '../../maths/constants.js'
import * as vec2 from '../../maths/vec2/index.js'

import { fromPoints } from './fromPoints.js'
import { toPoints } from './toPoints.js'

/**
 * Append a series of points to the given geometry that represent an arc.
 * This implementation follows the SVG specifications.
 * @see http://www.w3.org/TR/SVG/paths.html#PathDataEllipticalArcCommands
 * @param {object} options - options for construction
 * @param {Vec2} options.endpoint - end point of arc (REQUIRED)
 * @param {Vec2} [options.radius=[0,0]] - radius of arc (X and Y)
 * @param {number} [options.xaxisRotation=0] - rotation (RADIANS) of the X axis of the arc with respect to the X axis of the coordinate system
 * @param {boolean} [options.clockwise=false] - draw an arc clockwise with respect to the center point
 * @param {boolean} [options.large=false] - draw an arc longer than TAU / 2 radians
 * @param {number} [options.segments=16] - number of segments per full rotation
 * @param {Path2} geometry - the path of which to append the arc
 * @returns {Path2} a new path with the appended points
 * @alias module:modeling/geometries/path2.appendArc
 *
 * @example
 * let myShape = fromPoints({}, [[27.5,-22.96875]]);
 * myShape = appendPoints([[27.5,-3.28125]], myShape);
 * myShape = appendArc({endpoint: [12.5, -22.96875], radius: [15, -19.6875]}, myShape);
 */
export const appendArc = (options, geometry) => {
  const defaults = {
    radius: [0, 0], // X and Y radius
    xaxisRotation: 0,
    clockwise: false,
    large: false,
    segments: 16
  }
  let { endpoint, radius, xaxisRotation, clockwise, large, segments } = Object.assign({}, defaults, options)

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

  let xRadius = radius[0]
  let yRadius = radius[1]
  const startpoint = points[points.length - 1]

  // round to precision in order to have determinate calculations
  xRadius = Math.round(xRadius * decimals) / decimals
  yRadius = Math.round(yRadius * decimals) / decimals
  endpoint = vec2.fromValues(Math.round(endpoint[0] * decimals) / decimals, Math.round(endpoint[1] * decimals) / decimals)

  const sweepFlag = !clockwise
  let newPoints = []
  if ((xRadius === 0) || (yRadius === 0)) {
    // http://www.w3.org/TR/SVG/implnote.html#ArcImplementationNotes:
    // If rx = 0 or ry = 0, then treat this as a straight line from (x1, y1) to (x2, y2) and stop
    newPoints.push(endpoint)
  } else {
    xRadius = Math.abs(xRadius)
    yRadius = Math.abs(yRadius)

    // see http://www.w3.org/TR/SVG/implnote.html#ArcImplementationNotes :
    const phi = xaxisRotation
    const cosPhi = Math.cos(phi)
    const sinPhi = Math.sin(phi)
    const minusHalfDistance = vec2.subtract(vec2.create(), startpoint, endpoint)
    vec2.scale(minusHalfDistance, minusHalfDistance, 0.5)
    // F.6.5.1:
    // round to precision in order to have determinate calculations
    const x = Math.round((cosPhi * minusHalfDistance[0] + sinPhi * minusHalfDistance[1]) * decimals) / decimals
    const y = Math.round((-sinPhi * minusHalfDistance[0] + cosPhi * minusHalfDistance[1]) * decimals) / decimals
    const startTranslated = vec2.fromValues(x, y)
    // F.6.6.2:
    const bigLambda = (startTranslated[0] * startTranslated[0]) / (xRadius * xRadius) + (startTranslated[1] * startTranslated[1]) / (yRadius * yRadius)
    if (bigLambda > 1.0) {
      // F.6.6.3:
      const sqrtBigLambda = Math.sqrt(bigLambda)
      xRadius *= sqrtBigLambda
      yRadius *= sqrtBigLambda
      // round to precision in order to have determinate calculations
      xRadius = Math.round(xRadius * decimals) / decimals
      yRadius = Math.round(yRadius * decimals) / decimals
    }
    // F.6.5.2:
    let multiplier1 = Math.sqrt((xRadius * xRadius * yRadius * yRadius - xRadius * xRadius * startTranslated[1] * startTranslated[1] - yRadius * yRadius * startTranslated[0] * startTranslated[0]) / (xRadius * xRadius * startTranslated[1] * startTranslated[1] + yRadius * yRadius * startTranslated[0] * startTranslated[0]))
    if (sweepFlag === large) multiplier1 = -multiplier1
    const centerTranslated = vec2.fromValues(xRadius * startTranslated[1] / yRadius, -yRadius * startTranslated[0] / xRadius)
    vec2.scale(centerTranslated, centerTranslated, multiplier1)
    // F.6.5.3:
    let center = vec2.fromValues(cosPhi * centerTranslated[0] - sinPhi * centerTranslated[1], sinPhi * centerTranslated[0] + cosPhi * centerTranslated[1])
    center = vec2.add(center, center, vec2.scale(vec2.create(), vec2.add(vec2.create(), startpoint, endpoint), 0.5))

    // F.6.5.5:
    const vector1 = vec2.fromValues((startTranslated[0] - centerTranslated[0]) / xRadius, (startTranslated[1] - centerTranslated[1]) / yRadius)
    const vector2 = vec2.fromValues((-startTranslated[0] - centerTranslated[0]) / xRadius, (-startTranslated[1] - centerTranslated[1]) / yRadius)
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
    let numSteps = Math.ceil(Math.abs(deltatheta) / TAU * segments) + 1
    if (numSteps < 1) numSteps = 1
    for (let step = 1; step < numSteps; step++) {
      const theta = theta1 + step / numSteps * deltatheta
      const cosTheta = Math.cos(theta)
      const sinTheta = Math.sin(theta)
      // F.6.3.1:
      const point = vec2.fromValues(cosPhi * xRadius * cosTheta - sinPhi * yRadius * sinTheta, sinPhi * xRadius * cosTheta + cosPhi * yRadius * sinTheta)
      vec2.add(point, point, center)
      newPoints.push(point)
    }
    // ensure end point is precisely what user gave as parameter
    if (numSteps) newPoints.push(options.endpoint)
  }
  newPoints = points.concat(newPoints)
  const result = fromPoints({}, newPoints)
  return result
}
