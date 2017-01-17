import makeBlob from '../../utils/Blob'
const Blob = makeBlob()

export default function CSGToAMF (CSG, m) {
  var result = '<?xml version="1.0" encoding="UTF-8"?>\n<amf' + (m && m.unit ? ' unit="+m.unit"' : '') + '>\n'
  for (var k in m) {
    result += '<metadata type="' + k + '">' + m[k] + '</metadata>\n'
  }
  result += '<object id="0">\n<mesh>\n<vertices>\n'

  CSG.polygons.map(function (p) { // first we dump all vertices of all polygons
    for (var i = 0; i < p.vertices.length; i++) {
      result += CSGVertextoAMFString(p.vertices[i])
    }
  })
  result += '</vertices>\n'

  var n = 0
  CSG.polygons.map(function (p) { // then we dump all polygons
    result += '<volume>\n'
    if (p.vertices.length < 3)
      return
    var color = null
    if (p.shared && p.shared.color) {
      color = p.shared.color
    } else if (p.color) {
      color = p.color
    }
    if (color != null) {
      if (color.length < 4) color.push(1.)
      result += '<color><r>' + color[0] + '</r><g>' + color[1] + '</g><b>' + color[2] + '</b><a>' + color[3] + '</a></color>'
    }

    for (var i = 0; i < p.vertices.length - 2; i++) { // making sure they are all triangles (triangular polygons)
      result += '<triangle>'
      result += '<v1>' + (n) + '</v1>'
      result += '<v2>' + (n + i + 1) + '</v2>'
      result += '<v3>' + (n + i + 2) + '</v3>'
      result += '</triangle>\n'
    }
    n += p.vertices.length
    result += '</volume>\n'
  })
  result += '</mesh>\n</object>\n'
  result += '</amf>\n'

  return new Blob([result], {
    type: 'application/amf+xml'
  })
}

function CSGVectortoAMFString(v){
  return '<x>' + v._x + '</x><y>' + v._y + '</y><z>' + v._z + '</z>'
}

function CSGVertextoAMFString(vertex){
  return '<vertex><coordinates>' + CSGVectortoAMFString(vertex.pos) + '</coordinates></vertex>\n'
}
/*
CSG.Vector3D.prototype.toAMFString = function () {
  return '<x>' + this._x + '</x><y>' + this._y + '</y><z>' + this._z + '</z>'
}

CSG.Vertex.prototype.toAMFString = function () {
  return '<vertex><coordinates>' + this.pos.toAMFString() + '</coordinates></vertex>\n'
}*/
