/*
## License

Copyright (c) 2016 Z3 Development https://github.com/z3dev

All code released under MIT license

History:
  2016/10/15: 0.5.2: initial version

Notes:
1) All functions extend other objects in order to maintain namespaces.
*/

// import { CSG } from '@jscad/csg'
const {CSG} = require('@jscad/csg')

// //////////////////////////////////////////
//
// JSON (JavaScript Object Notation) is a lightweight data-interchange format
// See http://json.org/
//
// //////////////////////////////////////////

function toSourceCSGVertex (ver) {
  return 'new CSG.Vertex(new CSG.Vector3D(' + ver._x + ',' + ver._y + ',' + ver._z + '))'
}

// convert the give CSG object to JSCAD source
function toSourceCSG (csg) {
  var code = '  var polygons = [];\n'
  csg.polygons.map(function (p) {
    code += '  poly = new CSG.Polygon([\n'
    for (var i = 0; i < p.vertices.length; i++) {
      code += '                         ' + toSourceCSGVertex(p.vertices[i].pos) + ',\n'
    }
    code += '                         ])'
    if (p.shared && p.shared.color && p.shared.color.length) {
      code += '.setColor(' + JSON.stringify(p.shared.color) + ');\n'
    } else {
      code += ';\n'
    }
    code += '  polygons.push(poly);\n'
  })
  code += '  return CSG.fromPolygons(polygons);\n'
  return code
};

function toSourceCAGVertex (ver) {
  return 'new CAG.Vertex(new CSG.Vector2D(' + ver.pos._x + ',' + ver.pos._y + '))'
};
function toSourceSide (side) {
  return 'new CAG.Side(' + toSourceCAGVertex(side.vertex0) + ',' + toSourceCAGVertex(side.vertex1) + ')'
};

// convert the give CAG object to JSCAD source
function toSourceCAG (cag) {
  var code = '  var sides = [];\n'
  cag.sides.map(function (s) {
    code += '  sides.push(' + toSourceSide(s) + ');\n'
  })
  code += '  return CAG.fromSides(sides);\n'
  return code
}

// convert an anonymous CSG/CAG object to JSCAD source
function toSource (obj) {
  if (obj.type && obj.type === 'csg') {
    var csg = CSG.fromObject(obj)
    return toSourceCSG(csg)
  }
  if (obj.type && obj.type === 'cag') {
    var cag = CAG.fromObject(obj)
    return toSourceCAG(cag)
  }
  return ''
};

//
// deserialize the given JSON source and return a JSCAD script
//
// fn (optional) original filename of JSON source
//
function deserialize (src, fn, options) {
  fn = fn || 'amf'
  const defaults = {version: '0.0.0'}
  options = Object.assign({}, defaults, options)
  const {version} = options

// convert the JSON into an anonymous object
  var obj = JSON.parse(src)
// convert the internal objects to JSCAD code
  var code = ''
  code += '//\n'
  code += '// producer: OpenJSCAD.org ' + version + ' JSON Importer\n'
  code += '// date: ' + (new Date()) + '\n'
  code += '// source: ' + fn + '\n'
  code += '//\n'
  code += 'function main() {\n'
  code += toSource(obj)
  code += '};\n'
  return code
};

module.exports = {
  deserialize
}
