
function serialize (CSG, options) {
  options && options.statusCallback && options.statusCallback({progress: 0})
  var result = 'solid csg.js\n'
  CSG.polygons.map(function (p, i) {
    result += CSGPolygontoStlString(p)
    options && options.statusCallback && options.statusCallback({progress: 100 * i / CSG.polygons.length})
  })
  result += 'endsolid csg.js\n'
  options && options.statusCallback && options.statusCallback({progress: 100})
  return [result]
}

function CSGVector3DtoStlString (v) {
  return v._x + ' ' + v._y + ' ' + v._z
}

function CSGVertextoStlString (vertex) {
  return 'vertex ' + CSGVector3DtoStlString(vertex.pos) + '\n'
}

function CSGPolygontoStlString (polygon) {
  var result = ''
  if (polygon.vertices.length >= 3) {
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

module.exports = {
  serialize
}
