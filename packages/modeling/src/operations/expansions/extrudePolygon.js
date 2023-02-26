import * as mat4 from '../../maths/mat4/index.js'
import * as vec3 from '../../maths/vec3/index.js'

import * as geom3 from '../../geometries/geom3/index.js'
import * as poly3 from '../../geometries/poly3/index.js'

// Extrude a polygon in the direction of the offset vector.
// Returns (geom3) a new geometry
export const extrudePolygon = (offsetVector, polygon1) => {
  const direction = vec3.dot(poly3.plane(polygon1), offsetVector)
  if (direction > 0) {
    polygon1 = poly3.invert(polygon1)
  }

  const newpolygons = [polygon1]

  const polygon2 = poly3.transform(mat4.fromTranslation(mat4.create(), offsetVector), polygon1)
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
