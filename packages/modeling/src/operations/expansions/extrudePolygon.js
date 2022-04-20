const mat4 = require('../../maths/mat4')
const vec3 = require('../../maths/vec3')

const geom3 = require('../../geometries/geom3')
const poly3 = require('../../geometries/poly3')

// Extrude a polygon in the direction of the offsetvector.
// Returns (geom3) a new geometry
const extrudePolygon = (offsetvector, polygon1) => {
  const direction = vec3.dot(poly3.plane(polygon1), offsetvector)
  if (direction > 0) {
    polygon1 = poly3.invert(polygon1)
  }

  const newpolygons = [polygon1]

  const polygon2 = poly3.transform(mat4.fromTranslation(mat4.create(), offsetvector), polygon1)
  const numvertices = polygon1.vertices.length
  for (let i = 0; i < numvertices; i++) {
    const nexti = (i < (numvertices - 1)) ? i + 1 : 0
    const sideFacePolygon = poly3.create([
      polygon1.vertices[i],
      polygon2.vertices[i],
      polygon2.vertices[nexti],
      polygon1.vertices[nexti]
    ])
    newpolygons.push(sideFacePolygon)
  }
  newpolygons.push(poly3.invert(polygon2))

  return geom3.create(newpolygons)
}

module.exports = extrudePolygon
