import * as geom2 from '../geometries/geom2/index.js'

/**
 * Construct a polygon in two dimensional space from a list of points, or a list of points and paths.
 * NOTE: The ordering of points is VERY IMPORTANT.
 * @param {Object} options - options for construction
 * @param {Array} options.points - points of the polygon : either flat or nested array of 2D points
 * @param {Array} [options.paths] - paths of the polygon : either flat or nested array of point indexes
 * @returns {geom2} new 2D geometry
 * @alias module:modeling/primitives.polygon
 *
 * @example
 * let roof = [[10,11], [0,11], [5,20]]
 * let wall = [[0,0], [10,0], [10,10], [0,10]]
 *
 * let poly = polygon({ points: roof })
 * or
 * let poly = polygon({ points: [roof, wall] })
 * or
 * let poly = polygon({ points: roof, paths: [0, 1, 2] })
 * or
 * let poly = polygon({ points: [roof, wall], paths: [[0, 1, 2], [3, 4, 5, 6]] })
 */
export const polygon = (options) => {
  const defaults = {
    points: [],
    paths: []
  }
  const { points, paths } = Object.assign({}, defaults, options)

  if (!(Array.isArray(points) && Array.isArray(paths))) throw new Error('points and paths must be arrays')

  let listOfPolys = points
  if (Array.isArray(points[0])) {
    if (!Array.isArray(points[0][0])) {
      // points is an array of something... convert to list
      listOfPolys = [points]
    }
  }

  listOfPolys.forEach((list, i) => {
    if (!Array.isArray(list)) throw new Error('list of points ' + i + ' must be an array')
    if (list.length < 3) throw new Error('list of points ' + i + ' must contain three or more points')
    list.forEach((point, j) => {
      if (!Array.isArray(point)) throw new Error('list of points ' + i + ', point ' + j + ' must be an array')
      if (point.length < 2) throw new Error('list of points ' + i + ', point ' + j + ' must contain by X and Y values')
    })
  })

  let listOfPaths = paths
  if (paths.length === 0) {
    // create a list of paths based on the points
    let count = 0
    listOfPaths = listOfPolys.map((list) => list.map((point) => count++))
  }

  // flatten the listOfPoints for indexed access
  const allPoints = []
  listOfPolys.forEach((list) => list.forEach((point) => allPoints.push(point)))

  const outlines = []
  listOfPaths.forEach((path) => {
    const setOfPoints = path.map((index) => allPoints[index])
    outlines.push(setOfPoints)
  })
  return geom2.create(outlines)
}
