const mat4 = require('../../math/mat4')
const vec3 = require('../../math/vec3')

const geom3 = require('../../geometry/geom3')
const poly3 = require('../../geometry/poly3')

// Extrude a polygon in the direction of the offsetvector.
// Returns (geom3) a new geometry
const extrudePolygon = (offsetvector, polygon1) => {
  let direction = vec3.dot(polygon1.plane, offsetvector)
  if (direction > 0) {
    polygon1 = poly3.flip(polygon1)
  }

  let newpolygons = [polygon1]

  let polygon2 = poly3.transform(mat4.fromTranslation(offsetvector), polygon1)
  let numvertices = polygon1.vertices.length
  for (let i = 0; i < numvertices; i++) {
    let sidefacepoints = []
    let nexti = (i < (numvertices - 1)) ? i + 1 : 0
    sidefacepoints.push(polygon1.vertices[i])
    sidefacepoints.push(polygon2.vertices[i])
    sidefacepoints.push(polygon2.vertices[nexti])
    sidefacepoints.push(polygon1.vertices[nexti])
    let sidefacepolygon = poly3.fromPoints(sidefacepoints)
    newpolygons.push(sidefacepolygon)
  }
  newpolygons.push(poly3.flip(polygon2))

  return geom3.create(newpolygons)
}

module.exports = extrudePolygon
