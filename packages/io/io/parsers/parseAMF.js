/*
## License

Copyright (c) 2016 Z3 Development https://github.com/z3dev
Copyright (c) 2013-2016 by Rene K. Mueller <spiritdude@gmail.com>
Copyright (c) 2016 by Z3D Development

All code released under MIT license

History:
  2016/06/27: 0.5.1: rewrote using SAX XML parser, enhanced for multiple objects, materials, units by Z3Dev
  2013/04/11: 0.018: added alpha support to AMF export

Notes:
1) All functions extend other objects in order to maintain namespaces.
*/

/*
// import the required modules if necessary
if(typeof module !== 'undefined') {    // used via nodejs
  if (typeof module.CAG === 'undefined') {
    CSG = require(lib+'../csg.js').CSG;
  }
  if (typeof module.OpenJsCad === 'undefined') {
    OpenJsCad = require(lib+'../openjscad.js').OpenJsCad;
  }
  var sax = require(lib+"lib/sax-js-1.1.5/lib/sax");
}

(function(module) {
*/
////////////////////////////////////////////
//
// AMF is a language for describing three-dimensional graphics in XML
// See http://www.astm.org/Standards/ISOASTM52915.htm
// See http://amf.wikispaces.com/
//
////////////////////////////////////////////
var sax = require('sax')
import { echo } from '../../modeling/debug'
import { version } from '../../jscad/version'

sax.SAXParser.prototype.inchMM = (1/0.039370);       // used for scaling AMF (inch) to CAG coordinates(MM)

// processing controls
sax.SAXParser.prototype.amfLast       = null;  // last object found
sax.SAXParser.prototype.amfDefinition = 0;     // definitions beinging created
                                               //   0-AMF,1-object,2-material,3-texture,4-constellation,5-metadata
// high level elements / definitions
sax.SAXParser.prototype.amfObjects    = [];    // list of objects
sax.SAXParser.prototype.amfMaterials  = [];    // list of materials
sax.SAXParser.prototype.amfTextures   = [];    // list of textures
sax.SAXParser.prototype.amfConstels   = [];    // list of constellations
sax.SAXParser.prototype.amfMetadata   = [];    // list of metadata

sax.SAXParser.prototype.amfObj      = null;  // amf in object form

sax.SAXParser.prototype.amfAmf = function(element) {
// default SVG with no viewport
  var obj = {type: 'amf', unit: 'mm', scale: 1.0};

  if ('UNIT' in element)  { obj.unit  = element.UNIT.toLowerCase(); }
// set scaling
  switch (obj.unit.toLowerCase()) {
    case 'inch':
      obj.scale = this.inchMM;
      break
    case 'foot':
      obj.scale = this.inchMM*12.0;
      break;
    case 'meter':
      obj.scale = 1000.0;
      break;
    case 'micron':
      obj.scale = 0.001;
      break;
    case 'millimeter':
    default:
      break;
  }

  obj.objects = [];
  return obj;
}

sax.SAXParser.prototype.amfObject = function(element) {
  var obj = {type: 'object', id: 'JSCAD'+(this.amfObjects.length)}; // default ID

  if ('ID' in element)  { obj.id  = element.ID; }

  obj.objects = [];
  return obj;
}

sax.SAXParser.prototype.amfMesh = function(element) {
  var obj = {type: 'mesh'};

  obj.objects = [];
  return obj;
}

// Note: TBD Vertices can have a color, which is used to interpolate a face color (from the 3 vertices)
sax.SAXParser.prototype.amfVertices = function(element) {
  var obj = {type: 'vertices'};

  obj.objects = [];
  return obj;
}

sax.SAXParser.prototype.amfCoordinates = function(element) {
  var obj = {type: 'coordinates'};

  obj.objects = [];
  return obj;
}
sax.SAXParser.prototype.amfNormal = function(element) {
  var obj = {type: 'normal'};

  obj.objects = [];
  return obj;
}
sax.SAXParser.prototype.amfX = function(element) {
  return {type: 'x', value: '0'};
}
sax.SAXParser.prototype.amfY = function(element) {
  return {type: 'y', value: '0'};
}
sax.SAXParser.prototype.amfZ = function(element) {
  return {type: 'z', value: '0'};
}

sax.SAXParser.prototype.amfVolume = function(element) {
  var obj = {type: 'volume'};

  if ('MATERIALID' in element)  { obj.materialid = element.MATERIALID; }

  obj.objects = [];
  return obj;
}

sax.SAXParser.prototype.amfTriangle = function(element) {
  var obj = {type: 'triangle'};

  obj.objects = [];
  return obj;
}
sax.SAXParser.prototype.amfV1 = function(element) {
  return {type: 'v1', value: '0'};
}
sax.SAXParser.prototype.amfV2 = function(element) {
  return {type: 'v2', value: '0'};
}
sax.SAXParser.prototype.amfV3 = function(element) {
  return {type: 'v3', value: '0'};
}

sax.SAXParser.prototype.amfVertex = function(element) {
  var obj = {type: 'vertex'};

  obj.objects = [];
  return obj;
}

sax.SAXParser.prototype.amfEdge = function(element) {
  var obj = {type: 'edge'};

  obj.objects = [];
  return obj;
}

sax.SAXParser.prototype.amfMetadata = function(element) {
  var obj = {type: 'metadata'};

  if ('TYPE' in element)  { obj.mtype = element.TYPE; }
  if ('ID' in element)    { obj.id   = element.ID; }

  return obj;
}

sax.SAXParser.prototype.amfMaterial = function(element) {
  var obj = {type: 'material'};

  if ('ID' in element)    { obj.id   = element.ID; }

  obj.objects = [];
  return obj;
}

sax.SAXParser.prototype.amfColor = function(element) {
  var obj = {type: 'color'};

  obj.objects = [];
  return obj;
}
sax.SAXParser.prototype.amfR = function(element) {
  return {type: 'r', value: '1'};
}
sax.SAXParser.prototype.amfG = function(element) {
  return {type: 'g', value: '1'};
}
sax.SAXParser.prototype.amfB = function(element) {
  return {type: 'b', value: '1'};
}
sax.SAXParser.prototype.amfA = function(element) {
  return {type: 'a', value: '1'};
}

sax.SAXParser.prototype.amfMap = function(element) {
  var obj = {type: 'map'};

  if ('GTEXID' in element) { obj.gtexid = element.GTEXID; }
  if ('BTEXID' in element) { obj.btexid = element.BTEXID; }
  if ('RTEXID' in element) { obj.rtexid = element.RTEXID; }

  obj.objects = [];
  return obj;
}
sax.SAXParser.prototype.amfU1 = function(element) {
  return {type: 'u1', value: '0'};
}
sax.SAXParser.prototype.amfU2 = function(element) {
  return {type: 'u2', value: '0'};
}
sax.SAXParser.prototype.amfU3 = function(element) {
  return {type: 'u3', value: '0'};
}

function createAmfParser(src, pxPmm) {
// create a parser for the XML
  var parser = sax.parser(false, {trim: true, lowercase: false, position: true});

// extend the parser with functions
  parser.onerror = function (e) {
    console.log('error: line '+e.line+', column '+e.column+', bad character ['+e.c+']');
  };

  //parser.ontext = function (t) {
  //};

  parser.onopentag = function (node) {
    //console.log('opentag: '+node.name+' at line '+this.line+' position '+this.column);
    //for (x in node.attributes) {
    //  console.log('    '+x+'='+node.attributes[x]);
    //}
    var obj = null;
    switch (node.name) {
    // top level elements
      case 'AMF':
        obj = this.amfAmf(node.attributes);
        break;
      case 'OBJECT':
        obj = this.amfObject(node.attributes);
        if (this.amfDefinition == 0) this.amfDefinition = 1; // OBJECT processing
        break;
      case 'MESH':
        obj = this.amfMesh(node.attributes);
        break;
      case 'VERTICES':
        obj = this.amfVertices(node.attributes);
        break;
      case 'VERTEX':
        obj = this.amfVertex(node.attributes);
        break;
      case 'EDGE':
        obj = this.amfEdge(node.attributes);
        break;
      case 'VOLUME':
        obj = this.amfVolume(node.attributes);
        break;
      case 'MATERIAL':
        obj = this.amfMaterial(node.attributes);
        if (this.amfDefinition == 0) this.amfDefinition = 2; // MATERIAL processing
        break;
      case 'COMPOSITE':
        break;
      case 'TEXTURE':
        if (this.amfDefinition == 0) this.amfDefinition = 3; // TEXTURE processing
        break;
      case 'CONSTELLATION':
        if (this.amfDefinition == 0) this.amfDefinition = 4; // CONSTELLATION processing
        break;
      case 'METADATA':
        obj = this.amfMetadata(node.attributes);
        if (this.amfDefinition == 0) this.amfDefinition = 5; // METADATA processing
        break;
    // coordinate elements
      case 'COORDINATES':
        obj = this.amfCoordinates(node.attributes);
        break;
      case 'NORMAL':
        obj = this.amfNormal(node.attributes);
        break;
      case 'X':
      case 'NX':
        obj = this.amfX(node.attributes);
        break;
      case 'Y':
      case 'NY':
        obj = this.amfY(node.attributes);
        break;
      case 'Z':
      case 'NZ':
        obj = this.amfZ(node.attributes);
        break;
    // triangle elements
      case 'TRIANGLE':
        obj = this.amfTriangle(node.attributes);
        break;
      case 'V1':
      case 'VTEX1':
        obj = this.amfV1(node.attributes);
        break;
      case 'V2':
      case 'VTEX2':
        obj = this.amfV2(node.attributes);
        break;
      case 'V3':
      case 'VTEX3':
        obj = this.amfV3(node.attributes);
        break;
    // color elements
      case 'COLOR':
        obj = this.amfColor(node.attributes);
        break;
      case 'R':
        obj = this.amfR(node.attributes);
        break;
      case 'G':
        obj = this.amfG(node.attributes);
        break;
      case 'B':
        obj = this.amfB(node.attributes);
        break;
      case 'A':
        obj = this.amfA(node.attributes);
        break;
    // map elements
      case 'MAP':
      case 'TEXMAP':
        obj = this.amfMap(node.attributes);
        break;
      case 'U1':
      case 'UTEX1':
      case 'VTEX1':
      case 'WTEX1':
        obj = this.amfU1(node.attributes);
        break;
      case 'U2':
      case 'UTEX2':
      case 'VTEX2':
      case 'WTEX2':
        obj = this.amfU2(node.attributes);
        break;
      case 'U3':
      case 'UTEX3':
      case 'VTEX3':
      case 'WTEX3':
        obj = this.amfU3(node.attributes);
        break;
      default:
        //console.log('opentag: '+node.name+' at line '+this.line+' position '+this.column);
        break;
    }

    if (obj !== null) {
      //console.log('definitinon '+this.amfDefinition);
      switch (this.amfDefinition) {
        case 0: // definition of AMF
          if ('objects' in obj) {
            //console.log('push object ['+obj.type+']');
            this.amfObjects.push(obj);
          }
          break;
        case 1: // definition of OBJECT
          if (this.amfObjects.length > 0) {
            var group = this.amfObjects.pop();
          // add the object to the active group if necessary
            if ('objects' in group) {
              //console.log('object '+group.type+' adding ['+obj.type+']');
              //console.log(JSON.stringify(obj));
              group.objects.push(obj);
            }
            this.amfObjects.push(group);
          // and push this object as a group object if necessary
            if ('objects' in obj) {
              //console.log('object group ['+obj.type+']');
              this.amfObjects.push(obj);
            }
          }
          break;
        case 2: // definition of MATERIAL
          if (obj.type == 'material') {
            //console.log('push material ['+obj.type+']');
            this.amfMaterials.push(obj);
          } else {
            if (this.amfMaterials.length > 0) {
              var group = this.amfMaterials.pop();
            // add the object to the active group if necessary
              if ('objects' in group) {
                //console.log('material '+group.type+' adding ['+obj.type+']');
                //console.log(JSON.stringify(obj));
                group.objects.push(obj);
              }
              this.amfMaterials.push(group);
            // and push this object as a group object if necessary
              if ('objects' in obj) {
                //console.log('push material ['+obj.type+']');
                this.amfMaterials.push(obj);
              }
            }
          }
          break;
        case 3: // definition of TEXTURE
          break;
        case 4: // definition of CONSTELLATION
          break;
        case 5: // definition of METADATA
          break;
        default:
          console.log('ERROR: invalid AMF definition');
          break;
      }
      this.amfLast = obj; // retain this object in order to add values
    }
  };

  parser.onclosetag = function (node) {
//console.log('onclosetag: '+this.amfDefinition);
    switch (node) {
    // list those which have objects
      case 'AMF':
      case 'OBJECT':
      case 'MESH':
      case 'VERTICES':
      case 'VERTEX':
      case 'EDGE':
      case 'COORDINATES':
      case 'NORMAL':
      case 'VOLUME':
      case 'TRIANGLE':
      case 'MATERIAL':
      case 'COLOR':
      case 'MAP':
      case 'TEXMAP':
        break;
      case 'TEXTURE':
        if (this.amfDefinition == 3) { this.amfDefinition = 0; } // resume processing
        return;
      case 'CONSTELLATION':
        if (this.amfDefinition == 4) { this.amfDefinition = 0; } // resume processing
        return;
      case 'METADATA':
        if (this.amfDefinition == 5) { this.amfDefinition = 0; } // resume processing
        return;
      default:
        //console.log('closetag: '+node);
        return;
    }

    var obj = null;
    switch (this.amfDefinition) {
      case 0: // definition of AMF
      case 1: // definition of OBJECT
        if (this.amfObjects.length > 0) {
          obj = this.amfObjects.pop();
          //console.log('pop object ['+obj.type+']');
          if (obj.type == 'object') {
            this.amfDefinition = 0; // AMF processing
          }
        }
      // check for completeness
        if (this.amfObjects.length === 0) {
          this.amfObj = obj;
        }
        break;
      case 2: // definition of MATERIAL
        if (this.amfMaterials.length > 0) {
          obj = this.amfMaterials.pop();
          //console.log('pop material ['+obj.type+']');
          if (obj.type == 'material') {
            this.amfMaterials.push(obj); // keep a list of materials
            this.amfDefinition = 0; // AMF processing
          }
        }
        break;
      case 3: // definition of TEXTURE
        this.amfDefinition = 0; // AMF processing
        break;
      case 4: // definition of CONSTELLATION
        this.amfDefinition = 0; // AMF processing
        break;
      case 5: // definition of METADATA
        this.amfDefinition = 0; // AMF processing
        break;
      default:
        break;
    }
  };

  parser.ontext = function (value) {
    if (value !== null) {
      if (this.amfLast && this.amfDefinition != 0) {
        this.amfLast.value = value;
        //console.log(JSON.stringify(this.amfLast));
      }
    }
  };

  //parser.onattribute = function (attr) {
  //};

  parser.onend = function () {
    //console.log('AMF parsing completed');
  };

// start the parser
  parser.write(src).close();

  return parser;
}

//
// convert the internal repreentation into JSCAD code
//
sax.SAXParser.prototype.codify = function(amf) {
  if (amf.type != 'amf' || (!amf.objects)) throw new Error("AMF malformed");

let code = ''

// hack due to lack of this in array map()
  var objects = amf.objects;
  var materials = this.amfMaterials;
  var lastmaterial = null;
  function findMaterial(id) {
    if (lastmaterial && lastmaterial.id == id) return lastmaterial;
    for (let i = 0; i < materials.length; i++) {
      if (materials[i].id && materials[i].id == id) {
        lastmaterial = materials[i];
        return lastmaterial;
      }
    }
    return null;
  }
  function getValue(objects,type) {
    for (let i = 0; i < objects.length; i++) {
      if (objects[i].type == type) return objects[i].value;
    }
    return null;
  }
  function getColor(objects) {
    for (let i = 0; i < objects.length; i++) {
      var obj = objects[i];
      if (obj.type == 'color') {
        var r = parseFloat(getValue(obj.objects,'r'));
        var g = parseFloat(getValue(obj.objects,'g'));
        var b = parseFloat(getValue(obj.objects,'b'));
        var a = parseFloat(getValue(obj.objects,'a'));
        if (Number.isNaN(r)) r = 1.0; // AMF default color
        if (Number.isNaN(g)) g = 1.0;
        if (Number.isNaN(b)) b = 1.0;
        if (Number.isNaN(a)) a = 1.0;
        return [r,g,b,a];
      }
    }
    return null;
  }
  function findColorByMaterial(id) {
    var m = findMaterial(id);
    if (m) {
      return getColor(m.objects);
    }
    return null;
  }

// convert high level definitions
  function createDefinition(obj,didx) {
//console.log(materials.length);
    switch (obj.type) {
      case 'object':
        createObject(obj,didx);
        break;
      case 'metadata':
        break;
      case 'material':
        break;
      default:
        console.log('Warning: unknown definition: '+obj.type);
        break;
    }
  }
// convert all objects to CSG based code
  function createObject(obj,oidx) {
    var vertices = [];    // [x,y,z]
    var faces    = [];    // [v1,v2,v3]
    var colors   = [];    // [r,g,b,a]

    function addCoord(coord,cidx) {
      if (coord.type == 'coordinates') {
        var x = parseFloat(getValue(coord.objects,'x'));
        var y = parseFloat(getValue(coord.objects,'y'));
        var z = parseFloat(getValue(coord.objects,'z'));
//console.log('['+x+','+y+','+z+']');
        vertices.push([x,y,z]);
      }
    // normal is possible
    }
    function addVertex(vertex,vidx) {
//console.log(vertex.type);
      if (vertex.type == 'vertex') {
        vertex.objects.map(addCoord);
      }
    // edge is possible
    }
    function addTriangle(tri,tidx) {
      if (tri.type == 'triangle') {
        var v1 = parseInt(getValue(tri.objects,'v1'));
        var v2 = parseInt(getValue(tri.objects,'v2'));
        var v3 = parseInt(getValue(tri.objects,'v3'));
//console.log('['+v1+','+v2+','+v3+']');
        faces.push([v1,v2,v3]);        // HINT: reverse order for polyhedron()
        var c = getColor(tri.objects);
        if (c) {
          colors.push(c);
        } else {
          colors.push(tricolor);
        }
      }
    }
    var tricolor    = null; // for found colors
    function addPart(part,pidx) {
//console.log(part.type);
      switch (part.type) {
        case 'vertices':
          part.objects.map(addVertex, this);
          break;
        case 'volume':
          tricolor = getColor(part.objects);
          if (part.materialid) {
          // convert material to color
            tricolor = findColorByMaterial(part.materialid);
          }
          part.objects.map(addTriangle, this);
          break;
        default:
          break;
      }
    }
    function addMesh(mesh,midx) {
//console.log(mesh.type);
      if (mesh.type == 'mesh') {
        mesh.objects.map(addPart, this);
      }
    }

    if (obj.objects.length > 0) {
      obj.objects.map(addMesh, this);

      var fcount = faces.length;
      var vcount = vertices.length;

      code += '// Object '+obj.id+'\n';
      code += '//  faces   : '+fcount+'\n';
      code += '//  vertices: '+vcount+'\n';
      code += 'function createObject'+obj.id+'() {\n';
      code += '  var polys = [];\n';

    // convert the results into function calls
      for(var i=0; i<fcount; i++) {
         code += '  polys.push(\n';
         code += '    PP([\n';
         for(var j=0; j<faces[i].length; j++) {
            if(faces[i][j]<0||faces[i][j]>=vcount) {
               if(err.length=='') err += "bad index for vertice (out of range)";
               continue;
            }
            if(j) code += ',\n';
            code += '      VV('+vertices[faces[i][j]]+')';
         }
         code += '])';
         if(colors[i]) {
           var c = colors[i];
           code += ".setColor(["+c[0]+','+c[1]+','+c[2]+','+c[3]+"])";
         }
         code += ');\n';
      }
      code += '  return CSG.fromPolygons(polys);\n';
      code += '}\n';
    }
  }

// start everthing
  code  = '// Objects  : '+objects.length+'\n'
  code += '// Materials: '+materials.length+'\n'
  code += '\n';
  code += '// helper functions\n';
  if (amf.scale != 1.0) {
    code += 'var SCALE = '+amf.scale+'; // scaling units ('+amf.unit+')\n'
    code += 'var VV = function(x,y,z) { return new CSG.Vertex(new CSG.Vector3D(x*SCALE,y*SCALE,z*SCALE)); };\n';
  } else {
    code += 'var VV = function(x,y,z) { return new CSG.Vertex(new CSG.Vector3D(x,y,z)); };\n';
  }
  code += 'var PP = function(a) { return new CSG.Polygon(a); };\n';
  code += '\n';
  code += 'function main() {\n';
  code += '  var csgs = [];\n';
  for (let i = 0; i < objects.length; i++) {
    var obj = objects[i];
    if (obj.type == 'object') {
      code += '  csgs.push(createObject'+obj.id+'());\n';
    }
  }
  code += '  return union(csgs);\n';
  code += '}\n';
  code += '\n';

  objects.map(createDefinition, this);

  return code;
}

//
// Parse the given AMF source and return a JSCAD script
//
// fn (optional) original filename of AMF source
// options (optional) anonymous object with:
//   pxPmm: pixels per milimeter for calcuations
// FIXME: add openjscad version in a cleaner manner ?
 export function parseAMF(src, fn, options) {
  var fn = fn || 'amf';
  var options = options || {}
  // parse the AMF source
  var parser = createAmfParser(src);
  // convert the internal objects to JSCAD code
  var code = '';
  code += '//\n';
  code += "// producer: OpenJSCAD.org "+version+" AMF Importer\n";
  code += "// date: "+(new Date())+"\n";
  code += "// source: "+fn+"\n";
  code += '//\n';
  if (parser.amfObj !== null) {
    //console.log(JSON.stringify(parser.amfObj));
    //console.log(JSON.stringify(parser.amfMaterials));
    code += parser.codify(parser.amfObj);
  } else {
    console.log('Warning: AMF parsing failed');
  }
  return code;
};


// --------------------------------------------------------------------------------------------

function _old_parseAMF(amf,fn) {      // http://en.wikipedia.org/wiki/Additive_Manufacturing_File_Format
   var xml, err = '';            // http://api.jquery.com/category/traversing/
// unzip if necessary TBD
// a stream starting without <?xml is considered ZIP compresssed

   try {
      xml = $.parseXML(amf);
   } catch(e) {
      echo("XML parsing error:",e.message.substring(0,120)+"..");
      err += "XML parsing error / invalid XML";
   }
   var v = [];    // vertices
   var f = [];    // faces
   var nv = 0, np = 0;
   var src = '', srci = '';

   srci = "\tvar pgs = [];\n";

   var meta = [];
   var metatag = $(xml).find('metadata');    // -- extract metadata
   metatag.each(function() {
      var el = $(this);
      meta[el.attr('type')] = el.text();
   });

   var obj = $(xml).find('object');
   obj.each(function() {
      var el = $(this);
      var mesh = el.find('mesh');
      mesh.each(function() {
         var el = $(this);
         var c = [];
         var co = el.find('color');
         var rgbm = [];
         if(co.length) {
            rgbm = [co.find('r').first().text(), co.find('g').first().text(), co.find('b').first().text()];
            if(co.find('a').length) rgbm = rgbm.concat(co.find('a').first().text());
         }
         v = []; f = []; nv = 0;        // we create each individual polygon

         var vertices = el.find('vertices');
         var sn = nv;
         vertices.each(function() {
            var el = $(this);
            var vertex = el.find('vertex');
            vertex.each(function() {
               var el = $(this);
               var x = el.find('x').text();
               var y = el.find('y').text();
               var z = el.find('z').text();
               v.push([x,y,z]);
               nv++;
            });
         });
         var volume = el.find('volume');
         volume.each(function() {
            var el = $(this);
            var rgbv = [], co = el.find('color');
            if(co.length) {
               rgbv = [co.find('r').first().text(), co.find('g').first().text(), co.find('b').first().text()];
               if(co.find('a').length) rgbv = rgbv.concat(co.find('a').first().text());
            }
            var triangle = el.find('triangle');
            triangle.each(function() {
               var el = $(this);
               var rgbt = [], co = el.find('color');
               if(co.length) {
                  rgbt = [co.find('r').first().text(), co.find('g').first().text(), co.find('b').first().text()];
                  if(co.find('a').length) rgbt = rgbt.concat(co.find('a').first().text());
               }
               var v1 = parseInt(el.find('v1').first().text()); // -- why: v1 might occur <v1>1</v1><map><v1>0</v1></map> -> find('v1') return '1'+'0' = '10'
               var v2 = parseInt(el.find('v2').first().text());
               var v3 = parseInt(el.find('v3').first().text());
               if(rgbm.length||rgbv.length||rgbt.length)
                  c[f.length] = rgbt.length?rgbt:(rgbv.length?rgbv:rgbm);
               f.push([v1+sn,v2+sn,v3+sn]);        // HINT: reverse order for polyhedron()

               var maps = el.find('map');
               maps.each(function() {
                  ;        // not yet
               });
            });
         });
         var textures = el.find('texture');
         textures.each(function() {
            ; // not yet
         });

         // v[] has the vertices
         // f[] has the faces
         for(var i=0; i<f.length; i++) {
            srci += "\tpgs.push(PP([\n\t\t";
            for(var j=0; j<f[i].length; j++) {
               if(f[i][j]<0||f[i][j]>=v.length) {
                  if(err.length=='') err += "bad index for vertice (out of range)";
                  continue;
               }
               if(j) srci += ",\n\t\t";
               srci += "VV("+v[f[i][j]]+")";
            }
            srci += "])";
            if(c[i]) srci += ".setColor("+c[i]+")";
            srci += ");\n";
            np++;
         }
      });
   });
   var src = "";
   for(var k in meta) {
      src += "// AMF."+k+": "+meta[k]+"\n";
   }
   src += "// producer: OpenJSCAD Compatibility ("+version+") AMF Importer\n";
   src += "// date: "+(new Date())+"\n";
   src += "// source: "+fn+"\n";
   src += "\n";

   if(err) src += "// WARNING: import errors: "+err+" (some triangles might be misaligned or missing)\n";
   src += "// objects: 1\n// object #1: polygons: "+np+"\n\n";
   src += "function main() {\n";
   src += "\tvar PP = function(a) { return new CSG.Polygon(a); };\n";
   src += "\tvar VV = function(x,y,z) { return new CSG.Vertex(new CSG.Vector3D(x,y,z)); };\n";
   src += srci;
   src += "\treturn CSG.fromPolygons(pgs);\n}\n";
   return src;
}

// export the extended prototypes
//module.CAG = CAG;
