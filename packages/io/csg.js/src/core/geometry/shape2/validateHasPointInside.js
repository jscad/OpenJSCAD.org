
const c1 = (p0, p1, p2) => (p1[1] > p0[1]) !== (p2[1] > p0[1])
const c2 = (p0, p1, p2) => (p0[0] < (p2[0] - p1[0]) * (p0[1] - p1[1]) / (p2[1] - p1[1]) + p1[0])

/** Check if the point stay inside the 2d shape
* ray-casting algorithm based on :
* https://github.com/substack/point-in-polygon/blob/master/index.js
* http://www.ecse.rp1.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
* originaly writed for https://github.com/lautr3k/SLAcer.js/blob/dev/js/slacer/slicer.js#L82
* @param {Shape2} shape - Shape2 object
* @param {Object} p0 - Vertex2 like object
* @returns {Boolean}
*/
const hasPointInside = function (shape, p0) {
  let p1 = null
  let p2 = null
  let inside = false
  shape.sides.forEach(side => {
    p1 = side[0]
    p2 = side[1]
    if (c1(p0, p1, p2) && c2(p0, p1, p2)) {
      inside = !inside
    }
  })
  return inside
}

module.exports = hasPointInside
