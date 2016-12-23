'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = env;

var _version = require('./version');

function env() {
  var env = 'OpenJSCAD ' + _version.version;
  if (typeof document !== 'undefined') {
    var w = document.defaultView;
    env = env + ' [' + w.navigator.userAgent + ']';
  } else {
    if (typeof require === 'function') {
      var os = require('os');
      env = env + ' [' + os.type() + ':' + os.release() + ',' + os.platform() + ':' + os.arch() + ']';
    }
  }
  console.log(env);
}