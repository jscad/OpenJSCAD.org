const vec2 = require('../../math/vec2')

const geom2 = require('../../geometry/geom2')

const fromFakePolygon = (epsilon, polygon) => {
  // this can happen based on union, seems to be residuals -
  // return null and handle in caller
  if (polygon.vertices.length < 4) {
    return null
  }
  const vert1Indices = []
  const points3D = polygon.vertices.filter((vertex, i) => {
    if (vertex[2] > 0) {
      vert1Indices.push(i)
      return true
    }
    return false
  })

  if (points3D.length !== 2) {
    throw new Error('Assertion failed: fromFakePolygon: not enough points found') // TBD remove later
  }

  const points2D = points3D.map((v3) => {
    let x = Math.round(v3[0] / epsilon) * epsilon + 0 // no more -0
    let y = Math.round(v3[1] / epsilon) * epsilon + 0 // no more -0
    return vec2.fromValues(x, y)
  })

  const d = vert1Indices[1] - vert1Indices[0]
  if (d === 1 || d === 3) {
    if (d === 1) {
      points2D.reverse()
    }
  } else {
    throw new Error('Assertion failed: fromFakePolygon: unknown index ordering')
  }
  return points2D
}

/*
 * Convert the given polygons to a list of sides.
 * The polygons must have only z coordinates +1 and -1, as constructed by to3DWalls().
 */
const fromFakePolygons = (epsilon, polygons) => {
  let sides = polygons.map((polygon) => fromFakePolygon(epsilon, polygon)).filter((polygon) => (polygon !== null))
  return geom2.create(sides)
}

module.exports = fromFakePolygons
