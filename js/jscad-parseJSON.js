/*
## License

Copyright (c) 2016 Z3 Development https://github.com/z3dev

All code released under MIT license

History:
  2016/10/15: 0.5.2: initial version

Notes:
1) All functions extend other objects in order to maintain namespaces.
*/

// import the required modules if necessary
if(typeof module !== 'undefined') {    // used via nodejs
  if (typeof module.CAG === 'undefined') {
    CSG = require(lib+'../csg.js').CSG;
  }
  if (typeof module.OpenJsCad === 'undefined') {
    OpenJsCad = require(lib+'../openjscad.js').OpenJsCad;
  }
}

(function(module) {

////////////////////////////////////////////
//
// JSON (JavaScript Object Notation) is a lightweight data-interchange format
// See http://json.org/
//
////////////////////////////////////////////

OpenJsCad.toSourceCSGVertex = function(ver) {
    return 'new CSG.Vertex(new CSG.Vector3D(' + ver._x + ',' + ver._y + ',' + ver._z + '))';
};

// convert the give CSG object to JSCAD source
OpenJsCad.toSourceCSG = function(csg) {
  var code = '  var polygons = [];\n';
  csg.polygons.map(function(p) {
    code += '  poly = new CSG.Polygon([\n';
    for(var i=0; i<p.vertices.length; i++) {
      code += '                         '+OpenJsCad.toSourceCSGVertex(p.vertices[i].pos)+',\n';
    }
    code += '                         ])';
    if (p.shared && p.shared.color && p.shared.color.length) {
      code += '.setColor('+JSON.stringify(p.shared.color)+');\n';
    } else {
      code += ';\n';
    }
    code += '  polygons.push(poly);\n';
  });
  code += '  return CSG.fromPolygons(polygons);\n'
  return code;
};

OpenJsCad.toSourceCAGVertex = function(ver) {
    return 'new CAG.Vertex(new CSG.Vector2D('+ver.pos._x+','+ver.pos._y+'))';
};
OpenJsCad.toSourceSide = function(side) {
    return 'new CAG.Side('+OpenJsCad.toSourceCAGVertex(side.vertex0)+','+OpenJsCad.toSourceCAGVertex(side.vertex1)+')';
};

// convert the give CAG object to JSCAD source
OpenJsCad.toSourceCAG = function(cag) {
  var code = '  var sides = [];\n';
  cag.sides.map(function(s) {
    code += '  sides.push('+OpenJsCad.toSourceSide(s)+');\n';
  });
  code += '  return CAG.fromSides(sides);\n'
  return code;
}

// convert an anonymous CSG/CAG object to JSCAD source
OpenJsCad.toSource = function(obj) {
  if (obj.type && obj.type === 'csg') {
    var csg = CSG.fromObject(obj);
    return OpenJsCad.toSourceCSG(csg);
  }
  if (obj.type && obj.type === 'cag') {
    var cag = CAG.fromObject(obj);
    return OpenJsCad.toSourceCAG(cag);
  }
  return '';
};

//
// Parse the given JSON source and return a JSCAD script
//
// fn (optional) original filename of JSON source
//
OpenJsCad.parseJSON = function(src, fn, options) {
  var fn = fn || 'amf';
  var options = options || {};

// convert the JSON into an anonymous object
  var obj = JSON.parse(src);
// convert the internal objects to JSCAD code
  var code = '';
  code += '//\n';
  code += "// producer: OpenJSCAD.org "+OpenJsCad.version+" JSON Importer\n";
  code += "// date: "+(new Date())+"\n";
  code += "// source: "+fn+"\n";
  code += '//\n';
  code += "function main() {\n";
  code += OpenJsCad.toSource(obj);
  code += '};\n';
  return code;
};

// export the extended prototypes
  module.CAG = CAG;
  module.OpenJsCad = OpenJsCad;
})(this);
