const measureArea = require('./measureArea')
const flip = require('./flip')

/**
 * Determine if the given points are inside the given polygon.
 *
 * @param {Array} points - a list of points, where each point is an array with X and Y values
 * @param {poly2} polygon - a 2D polygon
 * @return {Integer} 1 if all points are inside, 0 if some or none are inside
 * @alias module:modeling/geometries/poly2.arePointsInside
 */
const arePointsInside = (points, polygon) => {
  if (points.length === 0) return 0 // nothing to check

  const vertices = polygon.vertices
  if (vertices.length < 3) return 0 // nothing can be inside an empty polygon

  if (measureArea(polygon) < 0) {
    polygon = flip(polygon) // CCW is required
  }

  const sum = points.reduce((acc, point) => acc + isPointInside(point, vertices), 0)
  return sum === points.length ? 1 : 0
}

/*
 * Determine if the given point is inside the polygon.
 *
 * @see http://erich.realtimerendering.com/ptinpoly/ (Crossings Test)
 * @param {Array} point - an array with X and Y values
 * @param {Array} polygon - a list of points, where each point is an array with X and Y values
 * @return {Integer} 1 if the point is inside, 0 if outside
 */
const isPointInside = (point, polygon) => {
  const numverts = polygon.length

  const tx = point[0]
  const ty = point[1]

  let vtx0 = polygon[numverts - 1]
  let vtx1 = polygon[0]

  let yflag0 = (vtx0[1] > ty)

  let insideFlag = 0

  let i = 0
  for (let j = (numverts + 1); --j;) {
    /*
     * check if Y endpoints straddle (are on opposite sides) of point's Y
     * if so, +X ray could intersect this edge.
     */
    const yflag1 = (vtx1[1] > ty)
    if (yflag0 !== yflag1) {
      /*
       * check if X endpoints are on same side of the point's X
       * if so, it's easy to test if edge hits or misses.
       */
      const xflag0 = (vtx0[0] > tx)
      const xflag1 = (vtx1[0] > tx)
      if (xflag0 && xflag1) {
        /* if edge's X values are both right of the point, then the point must be inside */
        insideFlag = !insideFlag
      } else {
        /*
         * if X endpoints straddle the point, then
         * the compute intersection of polygon edge with +X ray
         * if intersection >= point's X then the +X ray hits it.
         */
        if ((vtx1[0] - (vtx1[1] - ty) * (vtx0[0] - vtx1[0]) / (vtx0[1] - vtx1[1])) >= tx) {
          insideFlag = !insideFlag
        }
      }
    }
    /* move to next pair of vertices, retaining info as possible */
    yflag0 = yflag1
    vtx0 = vtx1
    vtx1 = polygon[++i]
  }
  return insideFlag
}

module.exports = arePointsInside
