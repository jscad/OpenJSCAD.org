/**
 * Check whether the given polygon is convex.
 * @param {poly2} polygon - the polygon to interrogate
 * @returns {Boolean} true if convex
 * @alias module:modeling/geometries/poly2.isConvex
 */
export const isConvex = (polygon) => {
  const numvertices = polygon.vertices.length
  if (numvertices > 2) {
    const vertices = polygon.vertices
    let prev = 0
    let curr = 0
    for (let i = 0; i < numvertices; i++) {
      curr = crossBetweenSegments(vertices[i], vertices[(i + 1) % numvertices], vertices[(i + 2) % numvertices])
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
 * Calculate cross product between two consecutive line segements; p1 -> p2, p2 -> p3.
 */
const crossBetweenSegments = (p1, p2, p3) => {
  const X1 = p2[0] - p1[0]
  const Y1 = p2[1] - p1[1]
  const X2 = p3[0] - p1[0]
  const Y2 = p3[1] - p1[1]

  return (X1 * Y2 - Y1 * X2)
}

export default isConvex
