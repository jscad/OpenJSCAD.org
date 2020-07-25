const vec3 = require('../../maths/vec3')

/**
 * Measure the area of the given polygon.
 * @see 2000 softSurfer http://geomalgorithms.com
 * @param {poly3} polygon - the polygon to measure
 * @return {Number} area of the polygon
 * @alias module:modeling/geometries/poly3.measureArea
 */
const measureArea = (poly3) => {
  const n = poly3.vertices.length
  if (n < 3) {
    return 0 // degenerate polygon
  }
  const vertices = poly3.vertices

  // calculate a real normal
  const a = vertices[0]
  const b = vertices[1]
  const c = vertices[2]
  const ba = vec3.subtract(b, a)
  const ca = vec3.subtract(c, a)
  const normal = vec3.cross(ba, ca)

  // determin direction of projection
  const ax = Math.abs(normal[0])
  const ay = Math.abs(normal[1])
  const az = Math.abs(normal[2])
  const an = Math.sqrt((ax * ax) + (ay * ay) + (az * az)) // length of normal

  let coord = 3 // ignore Z coordinates
  if ((ax > ay) && (ax > az)) {
    coord = 1 // ignore X coordinates
  } else
  if (ay > az) {
    coord = 2 // ignore Y coordinates
  }

  let area = 0
  let h = 0
  let i = 1
  let j = 2
  switch (coord) {
    case 1: // ignore X coordinates
      // compute area of 2D projection
      for (i = 1; i < n; i++) {
        h = i - 1
        j = (i + 1) % n
        area += (vertices[i][1] * (vertices[j][2] - vertices[h][2]))
      }
      area += (vertices[0][1] * (vertices[1][2] - vertices[n - 1][2]))
      // scale to get area
      area *= (an / (2 * normal[0]))
      break

    case 2: // ignore Y coordinates
      // compute area of 2D projection
      for (i = 1; i < n; i++) {
        h = i - 1
        j = (i + 1) % n
        area += (vertices[i][2] * (vertices[j][0] - vertices[h][0]))
      }
      area += (vertices[0][2] * (vertices[1][0] - vertices[n - 1][0]))
      // scale to get area
      area *= (an / (2 * normal[1]))
      break

    case 3: // ignore Z coordinates
    default:
      // compute area of 2D projection
      for (i = 1; i < n; i++) {
        h = i - 1
        j = (i + 1) % n
        area += (vertices[i][0] * (vertices[j][1] - vertices[h][1]))
      }
      area += (vertices[0][0] * (vertices[1][1] - vertices[n - 1][1]))
      // scale to get area
      area *= (an / (2 * normal[2]))
      break
  }
  return area
}

module.exports = measureArea
