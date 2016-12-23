'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _primitives3d = require('./primitives3d');

var primitives3d = _interopRequireWildcard(_primitives3d);

var _primitives2d = require('./primitives2d');

var primitives2d = _interopRequireWildcard(_primitives2d);

var _opsBooleans = require('./ops-booleans');

var booleanOps = _interopRequireWildcard(_opsBooleans);

var _transformations = require('./transformations');

var transformations = _interopRequireWildcard(_transformations);

var _extrusion = require('./extrusion');

var extrusion = _interopRequireWildcard(_extrusion);

var _color = require('./color');

var color = _interopRequireWildcard(_color);

var _maths = require('./maths');

var maths = _interopRequireWildcard(_maths);

var _csg = require('../csg');

var _text = require('./text');

var text = _interopRequireWildcard(_text);

var _log = require('../jscad/log');

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var exportedApi = {
  csg: { CAG: _csg.CAG, CSG: _csg.CSG },
  primitives2d: primitives2d,
  primitives3d: primitives3d,
  booleanOps: booleanOps,
  transformations: transformations,
  extrusion: extrusion,
  color: color,
  maths: maths,
  text: text,
  OpenJsCad: { Openjscad: { log: _log2.default } }
};

exports.default = exportedApi;