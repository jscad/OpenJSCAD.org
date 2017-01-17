import makeBlob from '../../utils/Blob'
const Blob = makeBlob()

export default function CSGToStla (CSG) {
  var result = 'solid csg.js\n'
  CSG.polygons.map(function (p) {
    result += CSGPolygontoStlString(p)
  })
  result += 'endsolid csg.js\n'
  return new Blob([result], {
    type: 'application/sla'
  })
}

function CSGVector3DtoStlString (v) {
  return v._x + ' ' + v._y + ' ' + v._z
}

function CSGVertextoStlString (vertex) {
  return 'vertex ' + CSGVector3DtoStlString(vertex.pos) + '\n'
}

function CSGPolygontoStlString (polygon) {
  var result = ''
  if (polygon.vertices.length >= 3) // should be!
  {
    // STL requires triangular polygons. If our polygon has more vertices, create
    // multiple triangles:
    var firstVertexStl = CSGVertextoStlString(polygon.vertices[0])
    for (var i = 0; i < polygon.vertices.length - 2; i++) {
      result += 'facet normal ' + CSGVector3DtoStlString(polygon.plane.normal) + '\nouter loop\n'
      result += firstVertexStl
      result += CSGVertextoStlString(polygon.vertices[i + 1])
      result += CSGVertextoStlString(polygon.vertices[i + 2])
      result += 'endloop\nendfacet\n'
    }
  }
  return result
}
