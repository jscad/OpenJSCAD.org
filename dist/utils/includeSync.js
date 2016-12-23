'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = include;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _vm = require('vm');

var _vm2 = _interopRequireDefault(_vm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function include(scad, fn) {
  var includes = [];
  // console.log(arguments.callee.caller,"include:"+fn)
  if (0) {
    // var script = vm.createScript(fs.readFileSync(fn),fn)
    // script.runInThisContext()
    var script = _vm2.default.runInThisContext(_fs2.default.readFileSync(fn), fn);
    return script;
  } else if (0) {
    includes.push(fn);
  } else {
    var src = _fs2.default.readFileSync(fn, { encoding: 'utf8' });
    // console.log("include: ",src)
    var r;
    try {
      r = eval(src + scad);
    } catch (e) {
      if (e instanceof SyntaxError) {
        console.log(e.message);
      }
    }
    // echo("result:",r)
    return r;
  }
}