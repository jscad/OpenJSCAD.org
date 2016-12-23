'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = convertToSolid;

var _csg = require('../csg');

// FIXME: is there not too much overlap with convertToBlob ?
function convertToSolid(objects) {
  if (objects.length === undefined) {
    if (objects instanceof _csg.CAG || objects instanceof _csg.CSG) {
      var obj = objects;
      objects = [obj];
    } else {
      throw new Error('Cannot convert object (' + (typeof objects === 'undefined' ? 'undefined' : _typeof(objects)) + ') to solid');
    }
  }

  var solid = null;
  for (var i = 0; i < objects.length; i++) {
    var _obj = objects[i];
    if (_obj instanceof _csg.CAG) {
      _obj = _obj.extrude({ offset: [0, 0, 0.1] }); // convert CAG to a thin solid CSG
    }
    if (solid !== null) {
      solid = solid.unionForNonIntersecting(_obj);
    } else {
      solid = _obj;
    }
  }
  return solid;
}