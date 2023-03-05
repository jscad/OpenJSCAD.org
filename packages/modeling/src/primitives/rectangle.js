import * as vec2 from '../maths/vec2/index.js'

import * as geom2 from '../geometries/geom2/index.js'

import { isNumberArray } from './commonChecks.js'

/**
 * Construct an axis-aligned rectangle in two dimensional space with four sides at right angles.
 * @param {Object} [options] - options for construction
 * @param {Array} [options.center=[0,0]] - center of rectangle
 * @param {Array} [options.size=[2,2]] - dimension of rectangle, width and length
 * @returns {geom2} new 2D geometry
 * @alias module:modeling/primitives.rectangle
 *
 * @example
 * let myshape = rectangle({size: [10, 20]})
 */
export const rectangle = (options) => {
  const defaults = {
    center: [0, 0],
    size: [2, 2]
  }
  const { center, size } = Object.assign({}, defaults, options)

  if (!isNumberArray(center, 2)) throw new Error('center must be an array of X and Y values')
  if (!isNumberArray(size, 2)) throw new Error('size must be an array of X and Y values')
  if (!size.every((n) => n > 0)) throw new Error('size values must be greater than zero')

  const point = [size[0] / 2, size[1] / 2]
  const swapped = [point[0], -point[1]]

  const points = [
    vec2.subtract(vec2.create(), center, point),
    vec2.add(vec2.create(), center, swapped),
    vec2.add(vec2.create(), center, point),
    vec2.subtract(vec2.create(), center, swapped)
  ]
  return geom2.create([points])
}
