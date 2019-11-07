const {fromPoints} = require('../../core/geometry/shape2')

/** Construct a 2D polygon either from arrays of paths and points, or just arrays of points
 * nested paths (multiple paths) and flat paths are supported
 * @param {Object} [options] - options for construction
 * @param {Array} [options.paths] - paths of the polygon : either flat or nested array
 * @param {Array} [options.points] - points of the polygon : either flat or nested array
 * @returns {Shape2} new polygon
 *
 * @example
 * let poly = polygon([0,1,2,3,4])
 * or
 * let poly = polygon({path: [0,1,2,3,4]})
 * or
 * let poly = polygon({path: [0,1,2,3,4], points: [2,1,3]})
 */
function polygon (params) { // array of po(ints) and pa(ths)
  let points = [ ]
  if (params.paths && params.paths.length && params.paths[0].length) { // pa(th): [[0,1,2],[2,3,1]] (two paths)
    for (let j = 0; j < params.paths.length; j++) {
      for (let i = 0; i < params.paths[j].length; i++) {
        points[i] = params.points[params.paths[j][i]]
      }
    }
  } else if (params.paths && params.paths.length) { // pa(th): [0,1,2,3,4] (single path)
    for (let i = 0; i < params.paths.length; i++) {
      points[i] = params.points[params.paths[i]]
    }
  } else { // pa(th) = po(ints)
    if (params.length) {
      points = params
    } else {
      points = params.points
    }
  }
  return fromPoints(points)
}

// FIXME: errr this is kinda just a special case of a polygon , why do we need it ?
/** Construct a triangle
 * @returns {Shape2} new triangle
 *
 * @example
 * let triangle = trangle({
 *   length: 10
 * })
 */
/* function triangle () {
  let a = arguments
  if (a[0] && a[0].length) a = a[0]
  return fromPoints(a)
} */

module.exports = polygon
