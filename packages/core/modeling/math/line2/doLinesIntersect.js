const { EPS } = require('../constants')
const { solve2Linear } = require('../utils')
const vec2 = require('../vec2')

// see if the line between p0start and p0end intersects with the line between p1start and p1end
// returns true if the lines strictly intersect, the end points are not counted!
/**
 * @param  {vec} p0start
 * @param  {vec} p0end
 * @param  {vec} p1start
 * @param  {vec} p1end
 */
const doLinesIntersect = function (p0start, p0end, p1start, p1end) {
  if (vec2.equals(p0end, p1start) || vec2.equals(p1end, p0start)) {
    const unitVec1 = vec2.normalize(vec2.subtract(p1end, p1start))
    const unitVec2 = vec2.normalize(vec2.subtract(p0end, p0start))
    let d = vec2.length(vec2.add(unitVec1, unitVec2))
    if (d < EPS) {
      return true
    }
  } else {
    const d0 = vec2.subtract(p0end, p0start)
    const d1 = vec2.subtract(p1end, p1start)
    // FIXME These epsilons need review and testing
    if (Math.abs(vec2.cross(d0, d1)) < 1e-9) return false // lines are parallel
    let alphas = solve2Linear(-d0[0], d1[0], -d0[1], d1[1], p0start[0] - p1start[0], p0start[1] - p1start[1])
    if ((alphas[0] > 1e-6) && (alphas[0] < 0.999999) && (alphas[1] > 1e-5) && (alphas[1] < 0.999999)) return true
  }
  return false
}

module.exports = doLinesIntersect
