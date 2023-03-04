import { EPS, TAU } from '../maths/constants.js'
import { sin, cos } from '../maths/utils/index.js'

import * as vec3 from '../maths/vec3/index.js'

import * as geom3 from '../geometries/geom3/index.js'
import * as poly3 from '../geometries/poly3/index.js'

import { isGT, isGTE, isNumberArray } from './commonChecks.js'

/**
 * Construct a Z axis-aligned solid cylinder in three dimensional space with rounded ends.
 * @param {Object} [options] - options for construction
 * @param {Array} [options.center=[0,0,0]] - center of cylinder
 * @param {Number} [options.height=2] - height of cylinder
 * @param {Number} [options.radius=1] - radius of cylinder
 * @param {Number} [options.roundRadius=0.2] - radius of rounded edges
 * @param {Number} [options.segments=32] - number of segments to create per full rotation
 * @returns {geom3} new 3D geometry
 * @alias module:modeling/primitives.roundedCylinder
 *
 * @example
 * let myshape = roundedCylinder({ height: 10, radius: 2, roundRadius: 0.5 })
 */
export const roundedCylinder = (options) => {
  const defaults = {
    center: [0, 0, 0],
    height: 2,
    radius: 1,
    roundRadius: 0.2,
    segments: 32
  }
  const { center, height, radius, roundRadius, segments } = Object.assign({}, defaults, options)

  if (!isNumberArray(center, 3)) throw new Error('center must be an array of X, Y and Z values')
  if (!isGT(height, 0)) throw new Error('height must be greater then zero')
  if (!isGT(radius, 0)) throw new Error('radius must be greater then zero')
  if (!isGT(roundRadius, 0)) throw new Error('roundRadius must be greater then zero')
  if (roundRadius > (radius - EPS)) throw new Error('roundRadius must be smaller then the radius')
  if (!isGTE(segments, 4)) throw new Error('segments must be four or more')

  const start = [0, 0, -(height / 2)]
  const end = [0, 0, height / 2]
  const direction = vec3.subtract(vec3.create(), end, start)
  const length = vec3.length(direction)

  if ((2 * roundRadius) > (length - EPS)) throw new Error('height must be larger than twice roundRadius')

  let defaultNormal
  if (Math.abs(direction[0]) > Math.abs(direction[1])) {
    defaultNormal = vec3.fromValues(0, 1, 0)
  } else {
    defaultNormal = vec3.fromValues(1, 0, 0)
  }

  const zVector = vec3.scale(vec3.create(), vec3.normalize(vec3.create(), direction), roundRadius)
  const xVector = vec3.scale(vec3.create(), vec3.normalize(vec3.create(), vec3.cross(vec3.create(), zVector, defaultNormal)), radius)
  const yVector = vec3.scale(vec3.create(), vec3.normalize(vec3.create(), vec3.cross(vec3.create(), xVector, zVector)), radius)

  vec3.add(start, start, zVector)
  vec3.subtract(end, end, zVector)

  const qSegments = Math.floor(0.25 * segments)

  const fromPoints = (points) => {
    // adjust the points to center
    const newPoints = points.map((point) => vec3.add(point, point, center))
    return poly3.create(newPoints)
  }

  const polygons = []
  const v1 = vec3.create()
  const v2 = vec3.create()
  let prevCylinderPoint
  for (let slice1 = 0; slice1 <= segments; slice1++) {
    const angle = TAU * slice1 / segments
    const cylinderPoint = vec3.add(vec3.create(), vec3.scale(v1, xVector, cos(angle)), vec3.scale(v2, yVector, sin(angle)))
    if (slice1 > 0) {
      // cylinder wall
      let points = []
      points.push(vec3.add(vec3.create(), start, cylinderPoint))
      points.push(vec3.add(vec3.create(), start, prevCylinderPoint))
      points.push(vec3.add(vec3.create(), end, prevCylinderPoint))
      points.push(vec3.add(vec3.create(), end, cylinderPoint))
      polygons.push(fromPoints(points))

      let prevCosPitch, prevSinPitch
      for (let slice2 = 0; slice2 <= qSegments; slice2++) {
        const pitch = TAU / 4 * slice2 / qSegments
        const cosPitch = cos(pitch)
        const sinPitch = sin(pitch)
        if (slice2 > 0) {
          // cylinder rounding, start
          points = []
          let point
          point = vec3.add(vec3.create(), start, vec3.subtract(v1, vec3.scale(v1, prevCylinderPoint, prevCosPitch), vec3.scale(v2, zVector, prevSinPitch)))
          points.push(point)
          point = vec3.add(vec3.create(), start, vec3.subtract(v1, vec3.scale(v1, cylinderPoint, prevCosPitch), vec3.scale(v2, zVector, prevSinPitch)))
          points.push(point)
          if (slice2 < qSegments) {
            point = vec3.add(vec3.create(), start, vec3.subtract(v1, vec3.scale(v1, cylinderPoint, cosPitch), vec3.scale(v2, zVector, sinPitch)))
            points.push(point)
          }
          point = vec3.add(vec3.create(), start, vec3.subtract(v1, vec3.scale(v1, prevCylinderPoint, cosPitch), vec3.scale(v2, zVector, sinPitch)))
          points.push(point)

          polygons.push(fromPoints(points))

          // cylinder rounding, end
          points = []
          point = vec3.add(vec3.create(), vec3.scale(v1, prevCylinderPoint, prevCosPitch), vec3.scale(v2, zVector, prevSinPitch))
          vec3.add(point, point, end)
          points.push(point)
          point = vec3.add(vec3.create(), vec3.scale(v1, cylinderPoint, prevCosPitch), vec3.scale(v2, zVector, prevSinPitch))
          vec3.add(point, point, end)
          points.push(point)
          if (slice2 < qSegments) {
            point = vec3.add(vec3.create(), vec3.scale(v1, cylinderPoint, cosPitch), vec3.scale(v2, zVector, sinPitch))
            vec3.add(point, point, end)
            points.push(point)
          }
          point = vec3.add(vec3.create(), vec3.scale(v1, prevCylinderPoint, cosPitch), vec3.scale(v2, zVector, sinPitch))
          vec3.add(point, point, end)
          points.push(point)
          points.reverse()

          polygons.push(fromPoints(points))
        }
        prevCosPitch = cosPitch
        prevSinPitch = sinPitch
      }
    }
    prevCylinderPoint = cylinderPoint
  }
  return geom3.create(polygons)
}
