const { TAU } = require('../maths/constants')
const vec2 = require('../maths/vec2')

const geom2 = require('../geometries/geom2')

const { isGT, isGTE, isNumberArray } = require('./commonChecks')

// @see http://www.jdawiseman.com/papers/easymath/surds_star_inner_radius.html
const getRadiusRatio = (vertices, density) => {
  if (vertices > 0 && density > 1 && density < vertices / 2) {
    return Math.cos(Math.PI * density / vertices) / Math.cos(Math.PI * (density - 1) / vertices)
  }
  return 0
}

const getPoints = (vertices, radius, startAngle, center) => {
  const a = TAU / vertices

  const points = []
  for (let i = 0; i < vertices; i++) {
    const point = vec2.fromAngleRadians(vec2.create(), a * i + startAngle)
    vec2.scale(point, point, radius)
    vec2.add(point, center, point)
    points.push(point)
  }
  return points
}

/**
 * Construct a star in two dimensional space.
 * @see https://en.wikipedia.org/wiki/Star_polygon
 * @param {Object} [options] - options for construction
 * @param {Array} [options.center=[0,0]] - center of star
 * @param {Number} [options.vertices=5] - number of vertices (P) on the star
 * @param {Number} [options.density=2] - density (Q) of star
 * @param {Number} [options.outerRadius=1] - outer radius of vertices
 * @param {Number} [options.innerRadius=0] - inner radius of vertices, or zero to calculate
 * @param {Number} [options.startAngle=0] - starting angle for first vertice, in radians
 * @returns {geom2} new 2D geometry
 * @alias module:modeling/primitives.star
 *
 * @example
 * let star1 = star({vertices: 8, outerRadius: 10}) // star with 8/2 density
 * let star2 = star({vertices: 12, outerRadius: 40, innerRadius: 20}) // star with given radius
 */
const star = (options) => {
  const defaults = {
    center: [0, 0],
    vertices: 5,
    outerRadius: 1,
    innerRadius: 0,
    density: 2,
    startAngle: 0
  }
  let { center, vertices, outerRadius, innerRadius, density, startAngle } = Object.assign({}, defaults, options)

  if (!isNumberArray(center, 2)) throw new Error('center must be an array of X and Y values')
  if (!isGTE(vertices, 2)) throw new Error('vertices must be two or more')
  if (!isGT(outerRadius, 0)) throw new Error('outerRadius must be greater than zero')
  if (!isGTE(innerRadius, 0)) throw new Error('innerRadius must be greater than zero')
  if (!isGTE(startAngle, 0)) throw new Error('startAngle must be greater than zero')

  // force integers
  vertices = Math.floor(vertices)
  density = Math.floor(density)

  startAngle = startAngle % TAU

  if (innerRadius === 0) {
    if (!isGTE(density, 2)) throw new Error('density must be two or more')
    innerRadius = outerRadius * getRadiusRatio(vertices, density)
  }

  const centerv = vec2.clone(center)

  const outerPoints = getPoints(vertices, outerRadius, startAngle, centerv)
  const innerPoints = getPoints(vertices, innerRadius, startAngle + Math.PI / vertices, centerv)

  const allPoints = []
  for (let i = 0; i < vertices; i++) {
    allPoints.push(outerPoints[i])
    allPoints.push(innerPoints[i])
  }

  return geom2.fromPoints(allPoints)
}

module.exports = star
