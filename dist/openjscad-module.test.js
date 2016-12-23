'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var openjscad = require('./openjscad-module');

_ava2.default.beforeEach(function (t) {});

// FIXME: this goes perhaps into too much implementation detail ?
(0, _ava2.default)('compile', function (t) {
  var compile = openjscad.compile;

  var inputPath = _path2.default.resolve(__dirname, '../examples/logo.jscad');
  var script = _fs2.default.readFileSync(inputPath, 'UTF8');

  var expProperties = {
    cube: { center: { _x: 0, _y: 0, _z: 15 },
      facecenters: [{
        point: {
          _x: 15,
          _y: 0,
          _z: 15
        },
        axisvector: {
          _x: 1,
          _y: 0,
          _z: 0
        },
        normalvector: {
          _x: 0,
          _y: 0,
          _z: 1
        }
      }, {
        point: {
          _x: -15,
          _y: 0,
          _z: 15
        },
        axisvector: {
          _x: -1,
          _y: 0,
          _z: 0
        },
        normalvector: {
          _x: 0,
          _y: 0,
          _z: 1
        }
      }, {
        point: {
          _x: 0,
          _y: 15,
          _z: 15
        },
        axisvector: {
          _x: 0,
          _y: 1,
          _z: 0
        },
        normalvector: {
          _x: 0,
          _y: 0,
          _z: 1
        }
      }, {
        point: {
          _x: 0,
          _y: -15,
          _z: 15
        },
        axisvector: {
          _x: 0,
          _y: -1,
          _z: 0
        },
        normalvector: {
          _x: 0,
          _y: 0,
          _z: 1
        }
      }, {
        point: {
          _x: 0,
          _y: 0,
          _z: 30
        },
        axisvector: {
          _x: 0,
          _y: 0,
          _z: 1
        },
        normalvector: {
          _x: 1,
          _y: 0,
          _z: 0
        }
      }, {
        point: {
          _x: 0,
          _y: 0,
          _z: 0
        },
        axisvector: {
          _x: 0,
          _y: 0,
          _z: -1
        },
        normalvector: {
          _x: 1,
          _y: 0,
          _z: 0
        }
      }]
    },
    sphere: { center: { _x: 0, _y: 0, _z: 15 },
      facepoint: { _x: 20, _y: 0, _z: 15 } } };

  return compile(script, {}).then(function (ir) {
    ir = ir[0];
    t.deepEqual(Object.keys(ir).sort(), ['polygons', 'properties', 'isCanonicalized', 'isRetesselated'].sort());
    t.deepEqual(ir.polygons.length, 610);
    t.deepEqual(ir.properties, expProperties);
    t.deepEqual(ir.isCanonicalized, true);
    t.deepEqual(ir.isRetesselated, true);
  });
});

(0, _ava2.default)('generateOutput(stl)', function (t) {
  var generateOutput = openjscad.generateOutput;
  // FIXME : create a fake csgObject rather than using output from another function
  // NOT so easy because of prototypes (typeOf in convertToBlob (could be replaced by fields on ojbects))

  var inputPath = _path2.default.resolve(__dirname, '../examples/logo.jscad');
  var script = _fs2.default.readFileSync(inputPath, 'UTF8');

  return openjscad.compile(script, {}).then(function (input) {
    var output = generateOutput('stl', input);
    var type = output.type,
        encoding = output.encoding,
        size = output.size; // FIXME for some reason this fails ?t.is(output.encoding, 'foo' when falsy)

    t.is(type, 'application/sla');
    t.is(encoding, 'utf8');
    t.is(size, 326185);
  });
});

(0, _ava2.default)('generateOutput(stla)', function (t) {
  var generateOutput = openjscad.generateOutput;
  // FIXME : create a fake csgObject rather than using output from another function

  var inputPath = _path2.default.resolve(__dirname, '../examples/logo.jscad');
  var script = _fs2.default.readFileSync(inputPath, 'UTF8');
  // const input = openjscad.compile(script, {})

  return openjscad.compile(script, {}).then(function (input) {
    var output = generateOutput('stla', input);
    var type = output.type,
        encoding = output.encoding,
        size = output.size; // FIXME for some reason this fails ?t.is(output.encoding, 'foo' when falsy)

    t.is(type, 'application/sla');
    t.is(encoding, 'utf8');
    t.is(size, 326185);
  });
});

(0, _ava2.default)('generateOutput(stlb)', function (t) {
  var generateOutput = openjscad.generateOutput;
  // FIXME : create a fake csgObject rather than using output from another function

  var inputPath = _path2.default.resolve(__dirname, '../examples/logo.jscad');
  var script = _fs2.default.readFileSync(inputPath, 'UTF8');
  // const input = openjscad.compile(script, {})

  return openjscad.compile(script, {}).then(function (input) {
    var output = generateOutput('stlb', input);
    var type = output.type,
        encoding = output.encoding,
        size = output.size; // FIXME for some reason this fails ?t.is(output.encoding, 'foo' when falsy)

    t.is(type, 'application/sla');
    t.is(encoding, 'utf8');
    t.is(size, 70284);
  });
});

(0, _ava2.default)('generateOutput(amf)', function (t) {
  var generateOutput = openjscad.generateOutput;
  // FIXME : create a fake csgObject rather than using output from another function

  var inputPath = _path2.default.resolve(__dirname, '../examples/logo.jscad');
  var script = _fs2.default.readFileSync(inputPath, 'UTF8');
  // const input = openjscad.compile(script, {})
  return openjscad.compile(script, {}).then(function (input) {
    var output = generateOutput('amf', input);
    var type = output.type,
        encoding = output.encoding,
        size = output.size; // FIXME for some reason this fails ?t.is(output.encoding, 'foo' when falsy)

    t.is(type, 'application/amf+xml');
    t.is(encoding, 'utf8');
    t.is(size, 385246); // FIXME: verify: original value was 385255
  });
});