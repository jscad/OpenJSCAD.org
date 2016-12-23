'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = getParamDefinitions;
// parse the jscad script to get the parameter definitions
function getParamDefinitions(script) {
  var scriptisvalid = true;
  script += '\nfunction include() {}'; // at least make it not throw an error so early
  try {
    // first try to execute the script itself
    // this will catch any syntax errors
    //    BUT we can't introduce any new function!!!
    new Function(script)();
  } catch (e) {
    scriptisvalid = false;
  }
  var params = [];
  if (scriptisvalid) {
    var script1 = "if(typeof(getParameterDefinitions) == 'function') {return getParameterDefinitions();} else {return [];} ";
    script1 += script;
    var f = new Function(script1);
    params = f();
    if ((typeof params === 'undefined' ? 'undefined' : _typeof(params)) !== 'object' || typeof params.length !== 'number') {
      throw new Error('The getParameterDefinitions() function should return an array with the parameter definitions');
    }
  }
  return params;
}