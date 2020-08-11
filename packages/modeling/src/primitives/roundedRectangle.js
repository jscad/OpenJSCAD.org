const { EPS } = require('../maths/constants')

const vec2 = require('../maths/vec2')

const geom2 = require('../geometries/geom2')

/**
 * Construct a rounded rectangle in two dimensional space.
 * @param {Object} [options] - options for construction
 * @param {Array} [options.center=[0,0]] - center of rounded rectangle
 * @param {Array} [options.size=[2,2]] - dimension of rounded rectangle; width and length
 * @param {Number} [options.roundRadius=0.2] - round radius of corners
 * @param {Number} [options.segments=32] - number of segments to create per full rotation
 * @returns {geom2} new 2D geometry
 * @alias module:modeling/primitives.roundedRectangle
 *
 * @example
 * let myshape = roundedRectangle({size: [10, 20], roundRadius: 2})
 */
const roundedRectangle = (options) => {
  const defaults = {
    center: [0, 0],
    size: [2, 2],
    roundRadius: 0.2,
    segments: 32
  }
  let { center, size, roundRadius, segments } = Object.assign({}, defaults, options)

  if (!Array.isArray(size)) throw new Error('size must be an array')
  if (size.length < 2) throw new Error('size must contain width and length values')

  if (!Number.isFinite(roundRadius)) throw new Error('roundRadius must be a number')

  size = size.map((v) => v / 2) // convert to radius

  if (roundRadius > (size[0] - EPS) ||
      roundRadius > (size[1] - EPS)) throw new Error('roundRadius must be smaller then the radius of all dimensions')

  const cornersegments = Math.floor(segments / 4)
  if (cornersegments < 1) throw new Error('segments must be four or more')

  // create sets of points that define the corners
  const corner0 = vec2.add(center, [size[0] - roundRadius, size[1] - roundRadius])
  const corner1 = vec2.add(center, [roundRadius - size[0], size[1] - roundRadius])
  const corner2 = vec2.add(center, [roundRadius - size[0], roundRadius - size[1]])
  const corner3 = vec2.add(center, [size[0] - roundRadius, roundRadius - size[1]])
  const corner0Points = []
  const corner1Points = []
  const corner2Points = []
  const corner3Points = []
  for (let i = 0; i <= cornersegments; i++) {
    const radians = Math.PI / 2 * i / cornersegments
    const point = vec2.fromAngleRadians(radians)
    vec2.scale(point, roundRadius, point)
    corner0Points.push(vec2.add(corner0, point))
    vec2.rotate(point, Math.PI / 2, point)
    corner1Points.push(vec2.add(corner1, point))
    vec2.rotate(point, Math.PI / 2, point)
    corner2Points.push(vec2.add(corner2, point))
    vec2.rotate(point, Math.PI / 2, point)
    corner3Points.push(vec2.add(corner3, point))
  }

  return geom2.fromPoints(corner0Points.concat(corner1Points, corner2Points, corner3Points))
}

module.exports = roundedRectangle
