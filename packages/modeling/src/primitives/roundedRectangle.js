import { EPS, TAU } from '../maths/constants.js'

import * as vec2 from '../maths/vec2/index.js'

import * as geom2 from '../geometries/geom2/index.js'

import { isGTE, isNumberArray } from './commonChecks.js'

import { rectangle } from './rectangle.js'

/**
 * Construct an axis-aligned rectangle in two dimensional space with rounded corners.
 * @param {object} [options] - options for construction
 * @param {Array} [options.center=[0,0]] - center of rounded rectangle
 * @param {Array} [options.size=[2,2]] - dimension of rounded rectangle; width and length
 * @param {number} [options.roundRadius=0.2] - round radius of corners
 * @param {number} [options.segments=32] - number of segments to create per full rotation
 * @returns {Geom2} new 2D geometry
 * @alias module:modeling/primitives.roundedRectangle
 *
 * @example
 * let myshape = roundedRectangle({size: [10, 20], roundRadius: 2})
 */
export const roundedRectangle = (options) => {
  const defaults = {
    center: [0, 0],
    size: [2, 2],
    roundRadius: 0.2,
    segments: 32
  }
  let { center, size, roundRadius, segments } = Object.assign({}, defaults, options)

  if (!isNumberArray(center, 2)) throw new Error('center must be an array of X and Y values')
  if (!isNumberArray(size, 2)) throw new Error('size must be an array of X and Y values')
  if (!size.every((n) => n >= 0)) throw new Error('size values must be positive')
  if (!isGTE(roundRadius, 0)) throw new Error('roundRadius must be positive')
  if (!isGTE(segments, 4)) throw new Error('segments must be four or more')

  // if any size is zero return empty geometry
  if (size[0] === 0 || size[1] === 0) return geom2.create()

  // if roundRadius is zero, return rectangle
  if (roundRadius === 0) return rectangle({ center, size })

  size = size.map((v) => v / 2) // convert to radius

  if (roundRadius > (size[0] - EPS) ||
      roundRadius > (size[1] - EPS)) throw new Error('roundRadius must be smaller than the radius of all dimensions')

  const cornerSegments = Math.floor(segments / 4)

  // create sets of points that define the corners
  const corner0 = vec2.add(vec2.create(), center, [size[0] - roundRadius, size[1] - roundRadius])
  const corner1 = vec2.add(vec2.create(), center, [roundRadius - size[0], size[1] - roundRadius])
  const corner2 = vec2.add(vec2.create(), center, [roundRadius - size[0], roundRadius - size[1]])
  const corner3 = vec2.add(vec2.create(), center, [size[0] - roundRadius, roundRadius - size[1]])
  const corner0Points = []
  const corner1Points = []
  const corner2Points = []
  const corner3Points = []
  for (let i = 0; i <= cornerSegments; i++) {
    const radians = TAU / 4 * i / cornerSegments
    const point = vec2.fromAngleRadians(vec2.create(), radians)
    vec2.scale(point, point, roundRadius)
    corner0Points.push(vec2.add(vec2.create(), corner0, point))
    vec2.rotate(point, point, vec2.create(), TAU / 4)
    corner1Points.push(vec2.add(vec2.create(), corner1, point))
    vec2.rotate(point, point, vec2.create(), TAU / 4)
    corner2Points.push(vec2.add(vec2.create(), corner2, point))
    vec2.rotate(point, point, vec2.create(), TAU / 4)
    corner3Points.push(vec2.add(vec2.create(), corner3, point))
  }

  const points = corner0Points.concat(corner1Points, corner2Points, corner3Points)
  return geom2.create([points])
}
