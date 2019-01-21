const vec3 = require('../../math/vec3')
const vert3 = require('../vert3')
const poly3 = require('../poly3')
const fromPolygons = require('../../shape3/fromPolygons')
const Plane = require('./math/Plane')

/** Reconstruct a Geom3 from the output of toCompactBinary().
 * @param {CompactBinary} bin - see toCompactBinary().
 * @returns {Geom3} new Geom3 object
 */
function fromCompactBinary (bin) {
  if (bin['class'] !== 'Geom3') throw new Error('Not a Geom3')
  let planes = []
  let planeData = bin.planeData
  let numplanes = planeData.length / 4
  let arrayindex = 0
  let x, y, z, w, normal, plane
  for (let planeindex = 0; planeindex < numplanes; planeindex++) {
    x = planeData[arrayindex++]
    y = planeData[arrayindex++]
    z = planeData[arrayindex++]
    w = planeData[arrayindex++]
    normal = vec3.fromValues(x, y, z)
    plane = new Plane(normal, w)
    planes.push(plane)
  }

  let vertices = []
  const vertexData = bin.vertexData
  const numvertices = vertexData.length / 3
  let pos
  let vertex
  arrayindex = 0
  for (let vertexindex = 0; vertexindex < numvertices; vertexindex++) {
    x = vertexData[arrayindex++]
    y = vertexData[arrayindex++]
    z = vertexData[arrayindex++]
    // pos = vec3.fromValues(x, y, z)
    vertex = vert3.fromValues(x, y, z) // Vertex(pos)
    vertices.push(vertex)
  }

  let shareds = bin.shared.map(function (shared) {
    return Polygon3.Shared.fromObject(shared)
  })

  let polygons = []
  let numpolygons = bin.numPolygons
  let numVerticesPerPolygon = bin.numVerticesPerPolygon
  let polygonVertices = bin.polygonVertices
  let polygonPlaneIndexes = bin.polygonPlaneIndexes
  let polygonSharedIndexes = bin.polygonSharedIndexes
  let numpolygonvertices
  let polygonvertices
  let shared
  let polygon // already defined plane,
  arrayindex = 0
  for (let polygonindex = 0; polygonindex < numpolygons; polygonindex++) {
    numpolygonvertices = numVerticesPerPolygon[polygonindex]
    polygonvertices = []
    for (let i = 0; i < numpolygonvertices; i++) {
      polygonvertices.push(vertices[polygonVertices[arrayindex++]])
    }
    plane = planes[polygonPlaneIndexes[polygonindex]]
    shared = shareds[polygonSharedIndexes[polygonindex]]
    polygon = poly3.fromData(polygonvertices, shared, plane)
    polygons.push(polygon)
  }
  const shape3 = fromPolygons(polygons)
  shape3.isCanonicalized = true
  shape3.isRetesselated = true
  return shape3
}

module.exports = fromCompactBinary
