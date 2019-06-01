const {EPS} = require('../math/constants')

const vec2 = require('../math/vec2')

const {geom2} = require('../geometry')

/** Construct a rounded rectangle.
 * @param {Object} [options] - options for construction
 * @param {Array} [options.center=[0,0]] - center of rounded rectangle
 * @param {Array} [options.size=[1,1]] - size of rounded rectangle, width and height
 * @param {Number} [options.roundRadius=0.2] - round radius of corners
 * @param {Number} [options.segments=16] - number of segments to create per 360 rotation
 * @returns {geom2} new 2D geometry
 *
 * @example
 * let myrectangle = roundedRectangle({size: [5, 10], roundRadius: 2})
 */
const roundedRectangle = (options) => {
  const defaults = {
    center: [0, 0],
    size: [1, 1],
    roundRadius: 0.2,
    segments: 16
  }
  const {size, center, roundRadius, segments} = Object.assign({}, defaults, options)

  if (roundRadius > (size[0] - EPS) || roundRadius > (size[1] - EPS)) throw new Error('roundRadius must be smaller then the size')

  let cornersegments = Math.floor(segments / 4)
  if (cornersegments < 1) throw new Error('segments must be four or more')

  // create sets of points that define the corners
  let corner0 = vec2.add(center, [size[0] - roundRadius, size[1] - roundRadius])
  let corner1 = vec2.add(center, [roundRadius - size[0], size[1] - roundRadius])
  let corner2 = vec2.add(center, [roundRadius - size[0], roundRadius - size[1]])
  let corner3 = vec2.add(center, [size[0] - roundRadius, roundRadius - size[1]])
  let corner0Points = []
  let corner1Points = []
  let corner2Points = []
  let corner3Points = []
  for (let i = 0; i <= cornersegments; i++) {
    let radians = Math.PI / 2 * i / cornersegments
    let point = vec2.fromAngleRadians(radians)
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
