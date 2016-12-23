'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = convertToBlob;

var _version = require('../jscad/version');

var _csg = require('../csg');

var _CSGToStla = require('../io/writers/CSGToStla');

var _CSGToStla2 = _interopRequireDefault(_CSGToStla);

var _CSGToStlb = require('../io/writers/CSGToStlb');

var _CSGToStlb2 = _interopRequireDefault(_CSGToStlb);

var _CSGToAMF = require('../io/writers/CSGToAMF');

var _CSGToAMF2 = _interopRequireDefault(_CSGToAMF);

var _CSGToX3D = require('../io/writers/CSGToX3D');

var _CSGToX3D2 = _interopRequireDefault(_CSGToX3D);

var _CAGtoSvg = require('../io/writers/CAGtoSvg');

var _CAGtoSvg2 = _interopRequireDefault(_CAGtoSvg);

var _CAGToJson = require('../io/writers/CAGToJson');

var _CAGToJson2 = _interopRequireDefault(_CAGToJson);

var _CAGtoDxf = require('../io/writers/CAGtoDxf');

var _CAGtoDxf2 = _interopRequireDefault(_CAGtoDxf);

var _misc = require('../utils/misc');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Blob = typeof window !== 'undefined' ? window.Blob : require('../utils/Blob').default;

function convertToBlob(objects, params) {
  var format = params.format,
      formatInfo = params.formatInfo;


  var object = void 0;

  if (format === 'jscad') {
    object = objects;
  } else {
    objects = (0, _misc.toArray)(objects);
    //console.log('convertToBlob', objects, format)
    //console.log('object', objects[0], objects[0] instanceof CSG)

    // review the given objects
    var foundCSG = false;
    var foundCAG = false;
    for (var i = 0; i < objects.length; i++) {
      if (objects[i] instanceof _csg.CSG) {
        foundCSG = true;
      }
      if (objects[i] instanceof _csg.CAG) {
        foundCAG = true;
      }
    }
    // convert based on the given format
    foundCSG = foundCSG && formatInfo.convertCSG;
    foundCAG = foundCAG && formatInfo.convertCAG;
    if (foundCSG && foundCAG) {
      foundCAG = false;
    } // use 3D conversion

    object = !foundCSG ? new _csg.CAG() : new _csg.CSG();

    for (var _i = 0; _i < objects.length; _i++) {
      if (foundCSG === true && objects[_i] instanceof _csg.CAG) {
        object = object.union(objects[_i].extrude({ offset: [0, 0, 0.1] })); // convert CAG to a thin solid CSG
        continue;
      }
      if (foundCAG === true && objects[_i] instanceof _csg.CSG) {
        continue;
      }
      object = object.union(objects[_i]);
    }
  }

  var meta = {
    producer: 'OpenJSCAD.org ' + _version.version,
    date: new Date()
  };

  var outputFormatHandlers = {
    amf: function amf(object) {
      return (0, _CSGToAMF2.default)(object, meta);
    }, // CSG to AMF
    stl: function stl(object) {
      return (0, _CSGToStla2.default)(object);
    }, // CSG to STL ASCII
    stla: function stla(object) {
      return (0, _CSGToStla2.default)(object);
    }, // CSG to STL ASCII
    stlb: function stlb(object) {
      return (0, _CSGToStlb2.default)(object, { webBlob: true });
    }, // CSG to STL BINARY
    dxf: function dxf(object) {
      return (0, _CAGtoDxf2.default)(object);
    }, // CAG to DXF
    svg: function svg(object) {
      return (0, _CAGtoSvg2.default)(object);
    }, // CAG to SVG
    x3d: function x3d(object) {
      return (0, _CSGToX3D2.default)(object.fixTJunctions());
    }, // CSG to X3D Only possible via browsers
    json: function json(object) {
      return (0, _CAGToJson2.default)(object);
    }, // CSG or CAG to JSON
    js: function js(object) {
      return object;
    }, // js , pass through
    jscad: function jscad(object) {
      return object;
    }, // jscad, pass through
    undefined: function undefined() {
      throw new Error('Not supported : only jscad, stl, amf, dxf, svg or json as output format');
    }
  };

  var blob = outputFormatHandlers[format](object);

  if (format === 'jscad') {
    blob = new Blob([blob], { type: formatInfo.mimetype });
  }
  return blob;
}