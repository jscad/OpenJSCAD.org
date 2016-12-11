function toStlString (CSG) {
  var result = 'solid csg.js\n'
  CSG.polygons.map(function (p) {
    result += p.toStlString()
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
    var firstVertexStl = polygon.vertices[0].toStlString()
    for (var i = 0; i < polygon.vertices.length - 2; i++) {
      result += 'facet normal ' + polygon.plane.normal.toStlString() + '\nouter loop\n'
      result += firstVertexStl
      result += polygon.vertices[i + 1].toStlString()
      result += polygon.vertices[i + 2].toStlString()
      result += 'endloop\nendfacet\n'
    }
  }
  return result
}
