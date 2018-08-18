/** Check if the point stay inside the CAG shape
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
    p1 = side.vertex0.pos
    p2 = side.vertex1.pos
    if (hasPointInside.c1(p0, p1, p2) && hasPointInside.c2(p0, p1, p2)) {
      inside = !inside
    }
  })
  return inside
}

hasPointInside.c1 = (p0, p1, p2) => (p1.y > p0.y) !== (p2.y > p0.y)
hasPointInside.c2 = (p0, p1, p2) => (p0.x < (p2.x - p1.x) * (p0.y - p1.y) / (p2.y - p1.y) + p1.x)

module.exports = hasPointInside
