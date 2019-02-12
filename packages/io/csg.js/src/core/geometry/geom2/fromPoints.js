const { areaEPS } = require('../../constants')
const vec2 = require('../../../math/vec2')

const fromSides = require('../../shape2/fromSides')
// const fromCurves = require('./fromCurves')
const flip = require('./flip')
const measureArea = require('./measureArea')
const isSelfIntersecting = require('./validateIsSelfIntersecting')
const canonicalize = require('./canonicalize')

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
const fromPoints = points => {
  if (!points) {
    throw new Error('points parameter must be defined')
  }
  if (!Array.isArray(points)) {
    throw new Error('points parameter must be an array')
  }
  if (typeof points[0][0] === 'number') {
    return fromPointsArray(points)
  }
  if (typeof points[0][0] === 'object') {
    // return fromNestedPointsArray(points)
  }
  throw new Error('Unsupported points list format')
}

// Do not export the two following function (code splitting for fromPoints())
const fromPointsArray = points => {
  if (points.length < 3) {
    throw new Error('shape2 needs at least 3 points')
  }
  let sides = []
  let prevVertex = vec2.fromArray(points[points.length - 1])
  points.map( point => {
    const vertex = vec2.fromArray(point)
    sides.push([prevVertex, vertex])
    prevVertex = vertex
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

/*
const fromNestedPointsArray = function (points) {
  if (points.length === 1) {
    return fromPoints(points[0])
  }
  // First pass: create a collection of Geom2 paths
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
          tree[i].isHole = !!(tree[i].parents.length % 2)
          tree[y].isHole = !!(tree[y].parents.length % 2)
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
  // Fourth and last pass: create final Geom2 object
  let cag = fromSides([])
  for (key in tree) {
    cag = union(cag, paths[key])
  }
  return cag
}
*/
module.exports = fromPoints
