'use strict'; // only needed in node 4 & co , not in node > 6

var fs = require('fs');
var path = require('path');
var evaluateSource = require('./utils/evaluateSource');
var convertToBlob = require('./io/convertToBlob').default;

/**
 * compile openjscad code and generates intermediate representation
 * ordering of parameters created with curying in mind
 * @param  {String} source the openjscad script we want to compile
 * @param  {Object} params the set of parameters to use  (optional)
 */
function compile(source, params, options) {
  params = params || {};
  var defaults = {
    implicitGlobals: true
  };
  options = Object.assign({}, defaults, options);
  var _options = options,
      implicitGlobals = _options.implicitGlobals;


  var globals = void 0;
  if (implicitGlobals) {
    globals = {
      oscad: require('./modeling/index').default
    };
  }
  var rebuildSolidSync = require('./jscad/rebuildSolid').rebuildSolidSync;

  return new Promise(function (resolve, reject) {
    var callback = function callback(err, result) {
      if (!err) {
        return resolve(result);
      }
      reject(err);
    };
    rebuildSolidSync(source, '', params, globals, callback);
  });
}

/**
 * generate output file from intermediate representation
 * @param  {String} outputFormat the output file format
 * @param  {Object} objects the openjscad intermediate representation
 */
function generateOutput(outputFormat, objects) {
  return convertToBlob(objects, { format: outputFormat, formatInfo: { convertCAG: true, convertCSG: true } });
}

module.exports = { compile: compile, generateOutput: generateOutput };