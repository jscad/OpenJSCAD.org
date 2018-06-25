const fromSides = require('./fromSides')
const flip = require('./flip')
const area = require('./measureArea')
const canonicalize = require('./canonicalize')
const {areaEPS} = require('./constants')
const isSelfIntersecting = require('./validateIsSelfIntersecting')
const Side = require('./math/Side')
const vert2 = require('../vert2')
const vec2 = require('../../math/vec2')

/** Construct a Shape2 from a list of points (a polygon).
 * The rotation direction of the points is not relevant.
 * The points can define a convex or a concave polygon.
 * The polygon must not self intersect.
 * @param {points[]} points - list of points in 2D space
 * @returns {Shape2} new Shape2 object
 */
const fromPoints = function (points) {
  const numpoints = points.length
  if (numpoints < 3) throw new Error('shape2 needs at least 3 points')
  let sides = []
  let prevpoint = new Vector2(points[numpoints - 1])
  let prevvertex = new Vertex2(prevpoint)
  points.map(function (p) {
    let point = vec2.fromValues(...p)
    let vertex = vert2.() //new Vertex2(point)
    let side = new Side(prevvertex, vertex)
    sides.push(side)
    prevvertex = vertex
  })

  let result = fromSides(sides)
  if (isSelfIntersecting(result)) {
    throw new Error('Polygon is self intersecting!')
  }

  let resultArea = area(result)
  if (Math.abs(resultArea) < areaEPS) {
    throw new Error('Degenerate polygon!')
  }

  if (resultArea < 0) {
    result = flip(result)
  }
  result = canonicalize(result)
  return result
}

const fromPoints2 = (points) => {
  const numpoints = points.length
  if (numpoints < 3) throw new Error('shape2 needs at least 3 points')
  let sides = []
  let prevpoint = new Vector2(points[numpoints - 1])
  let prevvertex = new Vertex2(prevpoint)
  points.map(function (p) {
    let point = new Vector2(p)
    let vertex = new Vertex2(point)
    let side = new Side(prevvertex, vertex)
    sides.push(side)
    prevvertex = vertex
  })

  let result = fromSides(sides)
  if (isSelfIntersecting(result)) {
    throw new Error('Polygon is self intersecting!')
  }

  let resultArea = area(result)
  if (Math.abs(resultArea) < areaEPS) {
    throw new Error('Degenerate polygon!')
  }

  if (resultArea < 0) {
    result = flip(result)
  }
  result = canonicalize(result)
  return result
}

module.exports = fromPoints
