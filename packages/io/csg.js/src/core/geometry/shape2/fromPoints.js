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

// new implementation

/** Construct a Shape2 from a list of points (a polygon) or an nested array of points.
 * The rotation direction of the points is not relevant.
 * The points can define a convex or a concave polygon.
 * The polygon must not self intersect.
 * Hole detection follows the even/odd rule,
 * which means that the order of the paths is not important.
 * @param {points[]|Array.<points[]>} points - (nested) list of points in 2D space
 * @returns {Shape2} new Shape2 object
 */
const fromPoints3 = function (points) {
  if (!points) {
    throw new Error('points parameter must be defined')
  }
  if (!Array.isArray(points)) {
    throw new Error('points parameter must be an array')
  }
  if (points[0].x !== undefined || typeof points[0][0] === 'number') {
    return fromPointsArray(points)
  }
  if (typeof points[0][0] === 'object') {
    return fromNestedPointsArray(points)
  }
  throw new Error('Unsupported points list format')
}

// Do not export the two following function (code splitting for fromPoints())
const fromPointsArray = function (points) {
  if (points.length < 3) {
    throw new Error('CAG shape needs at least 3 points')
  }
  let sides = []
  let prevvertex = new Vertex2(new Vector2D(points[points.length - 1]))
  points.map(function (point) {
    let vertex = new Vertex2(new Vector2D(point))
    sides.push(new Side(prevvertex, vertex))
    prevvertex = vertex
  })
  let result = fromSides(sides)
  if (isSelfIntersecting(result)) {
    throw new Error('Polygon is self intersecting!')
  }
  let area = measureArea(result)
  if (Math.abs(area) < areaEPS) {
    throw new Error('Degenerate polygon!')
  }
  if (area < 0) {
    result = flip(result)
  }
  return canonicalize(result)
}

const fromNestedPointsArray = function (points) {
  if (points.length === 1) {
    return fromPoints(points[0])
  }
  // First pass: create a collection of CAG paths
  let paths = []
  points.forEach(path => {
    paths.push(fromPointsArray(path))
  })
  // Second pass: make a tree of paths
  let tree = {}
    // for each polygon extract parents and childs polygons
  paths.forEach((p1, i) => {
    // check for intersection
    paths.forEach((p2, y) => {
      if (p1 !== p2) {
        // create default node
        tree[i] || (tree[i] = { parents: [], isHole: false })
        tree[y] || (tree[y] = { parents: [], isHole: false })
        // check if polygon2 stay in poylgon1
        if (contains(p2, p1)) {
          // push parent and child; odd parents number ==> hole
          tree[i].parents.push(y)
          tree[i].isHole = !! (tree[i].parents.length % 2)
          tree[y].isHole = !! (tree[y].parents.length % 2)
        }
      }
    })
  })
  // Third pass: subtract holes
  let path = null
  for (key in tree) {
    path = tree[key]
    if (path.isHole) {
      delete tree[key] // remove holes for final pass
      path.parents.forEach(parentKey => {
        paths[parentKey] = difference(paths[parentKey], paths[key])
      })
    }
  }
  // Fourth and last pass: create final CAG object
  let cag = fromSides([])
  for (key in tree) {
    cag = union(cag, paths[key])
  }
  return cag
}

module.exports = fromPoints
