'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = group;

var _csg = require('../csg');

function group() {
  // experimental
  var o;
  var i = 0;
  var a = arguments;
  if (a[0].length) a = a[0];

  if (_typeof(a[i]) == 'object' && a[i] instanceof _csg.CAG) {
    o = a[i].extrude({ offset: [0, 0, 0.1] }); // -- convert a 2D shape to a thin solid, note: do not a[i] = a[i].extrude()
  } else {
    o = a[i++];
  }
  for (; i < a.length; i++) {
    var obj = a[i];
    if (_typeof(a[i]) == 'object' && a[i] instanceof _csg.CAG) {
      obj = a[i].extrude({ offset: [0, 0, 0.1] }); // -- convert a 2D shape to a thin solid:
    }
    o = o.unionForNonIntersecting(obj);
  }
  return o;
}