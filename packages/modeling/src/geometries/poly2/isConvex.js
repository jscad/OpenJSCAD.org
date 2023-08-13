/**
 * Check whether the given polygon is convex.
 * @param {Poly2} polygon - the polygon to interrogate
 * @returns {Boolean} true if convex
 * @alias module:modeling/geometries/poly2.isConvex
 */
export const isConvex = (polygon) => {
  const numPoints = polygon.points.length
  if (numPoints > 2) {
    const points = polygon.points
    let prev = 0
    let curr = 0
    for (let i = 0; i < numPoints; i++) {
      curr = crossBetweenSegments(points[i], points[(i + 1) % numPoints], points[(i + 2) % numPoints])
      if (curr !== 0) {
        // sum angle of crosses, looking for a change in direction
        if (curr * prev < 0) {
          return false
        }
        prev = curr
      }
    }
  }
  return true
}

/*
 * Calculate cross product between two consecutive line segments; p1 -> p2, p2 -> p3.
 */
const crossBetweenSegments = (p1, p2, p3) => {
  const X1 = p2[0] - p1[0]
  const Y1 = p2[1] - p1[1]
  const X2 = p3[0] - p1[0]
  const Y2 = p3[1] - p1[1]

  return (X1 * Y2 - Y1 * X2)
}
