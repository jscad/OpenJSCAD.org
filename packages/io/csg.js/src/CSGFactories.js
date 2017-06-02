const Vector3D = require('./math/Vector3')
const Vertex = require('./math/Vertex3')
const Plane = require('./math/Plane')
const Polygon2D = require('./math/Polygon2')
const Polygon3D = require('./math/Polygon3')

/** Construct a CSG solid from a list of pre-generated slices.
 * See Polygon.prototype.solidFromSlices() for details.
 * @param {Object} options - options passed to solidFromSlices()
 * @returns {CSG} new CSG object
 */
function fromSlices (options) {
  return (new Polygon2D.createFromPoints([
        [0, 0, 0],
        [1, 0, 0],
        [1, 1, 0],
        [0, 1, 0]
  ])).solidFromSlices(options)
}

/** Reconstruct a CSG solid from an object with identical property names.
 * @param {Object} obj - anonymous object, typically from JSON
 * @returns {CSG} new CSG object
 */
function fromObject (obj) {
  const CSG = require('./CSG')
  let polygons = obj.polygons.map(function (p) {
    return Polygon3D.fromObject(p)
  })
  let csg = CSG.fromPolygons(polygons)
  csg.isCanonicalized = obj.isCanonicalized
  csg.isRetesselated = obj.isRetesselated
  return csg
}

/** Reconstruct a CSG from the output of toCompactBinary().
 * @param {CompactBinary} bin - see toCompactBinary().
 * @returns {CSG} new CSG object
 */
function fromCompactBinary (bin) {
  const CSG = require('./CSG') // FIXME: circular dependency ??

  if (bin['class'] !== 'CSG') throw new Error('Not a CSG')
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
    normal = Vector3D.Create(x, y, z)
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
    pos = Vector3D.Create(x, y, z)
    vertex = new Vertex(pos)
    vertices.push(vertex)
  }

  let shareds = bin.shared.map(function (shared) {
    return Polygon3D.Shared.fromObject(shared)
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
    polygon = new Polygon3D(polygonvertices, shared, plane)
    polygons.push(polygon)
  }
  let csg = CSG.fromPolygons(polygons)
  csg.isCanonicalized = true
  csg.isRetesselated = true
  return csg
}

module.exports = {
  //fromPolygons,
  fromSlices,
  fromObject,
  fromCompactBinary
}
