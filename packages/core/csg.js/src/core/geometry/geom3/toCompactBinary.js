const canonicalize = require('./canonicalize')

/** returns a compact binary representation of this csg
   * usually used to transfer Geom3 objects to/from webworkes
   * NOTE: very interesting compact format, with a lot of reusable ideas
   * @returns {Object} compact binary representation of a Geom3
   */
const toCompactBinary = (_csg) => {
  let csg = canonicalize(_csg)
  let numPolygons = csg.polygons.length
  let numpolygonvertices = 0

  let numvertices = 0
  let vertexmap = {}
  let vertices = []

  let numplanes = 0
  let planemap = {}
  let planes = []

  let shareds = []
  let sharedmap = {}
  let numshared = 0
  // for (let i = 0, iMax = csg.polygons.length; i < iMax; i++) {
  //  let p = csg.polygons[i];
  //  for (let j = 0, jMax = p.length; j < jMax; j++) {
  //      ++numpolygonvertices;
  //      let vertextag = p[j].getTag();
  //      if(!(vertextag in vertexmap)) {
  //          vertexmap[vertextag] = numvertices++;
  //          vertices.push(p[j]);
  //      }
  //  }
  csg.polygons.map(function (polygon) {
    // FIXME: why use map if we do not return anything ?
    // either for... or forEach
    polygon.vertices.map(function (vertex) {
      ++numpolygonvertices
      let vertextag = vertex.getTag()
      if (!(vertextag in vertexmap)) {
        vertexmap[vertextag] = numvertices++
        vertices.push(vertex)
      }
    })

    let planetag = polygon.plane.getTag()
    if (!(planetag in planemap)) {
      planemap[planetag] = numplanes++
      planes.push(polygon.plane)
    }
    let sharedtag = polygon.shared.getTag()
    if (!(sharedtag in sharedmap)) {
      sharedmap[sharedtag] = numshared++
      shareds.push(polygon.shared)
    }
  })

  let numVerticesPerPolygon = new Uint32Array(numPolygons)
  let polygonSharedIndices = new Uint32Array(numPolygons)
  let polygonVertices = new Uint32Array(numpolygonvertices)
  let polygonPlaneIndices = new Uint32Array(numPolygons)
  let vertexData = new Float64Array(numvertices * 3)
  let planeData = new Float64Array(numplanes * 4)
  let polygonVerticesIndex = 0

  // FIXME: doublecheck : why does it go through the whole polygons again?
  // can we optimise that ? (perhap due to needing size to init buffers above)
  for (let polygonindex = 0; polygonindex < numPolygons; ++polygonindex) {
    let polygon = csg.polygons[polygonindex]
    numVerticesPerPolygon[polygonindex] = polygon.vertices.length
    polygon.vertices.map(function (vertex) {
      let vertextag = vertex.getTag()
      let vertexindex = vertexmap[vertextag]
      polygonVertices[polygonVerticesIndex++] = vertexindex
    })
    let planetag = polygon.plane.getTag()
    let planeindex = planemap[planetag]
    polygonPlaneIndices[polygonindex] = planeindex
    let sharedtag = polygon.shared.getTag()
    let sharedindex = sharedmap[sharedtag]
    polygonSharedIndices[polygonindex] = sharedindex
  }
  let verticesArrayIndex = 0
  vertices.map(function (vertex) {
    const pos = vertex.pos
    vertexData[verticesArrayIndex++] = pos._x
    vertexData[verticesArrayIndex++] = pos._y
    vertexData[verticesArrayIndex++] = pos._z
  })
  let planesArrayIndex = 0
  planes.map(function (plane) {
    const normal = plane.normal
    planeData[planesArrayIndex++] = normal._x
    planeData[planesArrayIndex++] = normal._y
    planeData[planesArrayIndex++] = normal._z
    planeData[planesArrayIndex++] = plane.w
  })

  let result = {
    'class': 'Geom3',
    numPolygons,
    numVerticesPerPolygon,
    polygonPlaneIndices,
    polygonSharedIndices,
    polygonVertices,
    vertexData: vertexData,
    planeData: planeData,
    shared: shareds
  }
  return result
}

module.exports = toCompactBinary
