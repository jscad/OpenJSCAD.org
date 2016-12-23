'use strict';

var _jscadFunction = require('./jscad-function');

var _jscadFunction2 = _interopRequireDefault(_jscadFunction);

var _csg = require('../csg');

var _misc = require('../utils/misc');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (self) {
  self.onmessage = function (e) {
    var r = { cmd: 'error', txt: 'try again' };
    if (e.data instanceof Object) {
      var data = e.data;
      if (data.cmd === 'render') {
        var _e$data = e.data,
            fullurl = _e$data.fullurl,
            script = _e$data.script,
            parameters = _e$data.parameters;


        var globals = {
          oscad: require('../modeling/index').default
        };
        var func = (0, _jscadFunction2.default)(script, globals);
        var objects = func(parameters, function (x) {
          return x;
        }, globals);
        objects = (0, _misc.toArray)(objects).map(function (object) {
          if (object instanceof _csg.CAG || object instanceof _csg.CSG) {
            return object.toCompactBinary();
          }
        });

        if (objects.length === 0) {
          throw new Error('The JSCAD script must return one or more CSG or CAG solids.');
        }
        self.postMessage({ cmd: 'rendered', objects: objects });
      }
    }
  };
}; // jscad-worker.js
//
// == OpenJSCAD.org, Copyright (c) 2013-2016, Licensed under MIT License
//
// History:
//   2016/02/02: 0.4.0: GUI refactored, functionality split up into more files, mostly done by Z3 Dev

// Create an worker (thread) for processing the JSCAD script into CSG/CAG objects