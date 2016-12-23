'use strict';

var path = require('path');

// -- input format handlers: helpers for cli & more
function makeInputFormatHandlers(OpenJsCad, modelingHelpers, libPath) {
  var lib = libPath;
  function inputScadHandler(src, inputFile, outputFile) {
    var scadParser = require('openscad-openjscad-translator'); // hardcoded is bad, but works
    src = scadParser.parse(src); //    doing the magick
    src = '// producer: OpenJSCAD ' + OpenJsCad.version + '\n' + src;
    src = '// source: ' + outputFile + '\n\n' + src;
    return src;
  }

  function inputStlHandler(src, inputFile) {
    src = modelingHelpers.parseSTL(src, inputFile);
    return src;
  }

  function inputAmfHandler(src, inputFile) {
    OpenJsCad = require(path.resolve(lib, './js/jscad-parseAMF.js')).OpenJsCad;
    src = OpenJsCad.parseAMF(src, inputFile);
    return src;
  }

  function inputObjHandler(src, inputFile) {
    src = modelingHelpers.parseOBJ(src, inputFile);
    return src;
  }

  function inputGcodeHandler(src, inputFile) {
    src = modelingHelpers.parseGCode(src, inputFile);
    return src;
  }

  function inputSvgHandler(src, inputFile) {
    OpenJsCad = require(path.resolve(lib, './js/jscad-parseSVG.js')).OpenJsCad;
    src = OpenJsCad.parseSVG(src, inputFile);
    return src;
  }

  function inputJsonHandler(src, inputFile) {
    OpenJsCad = require(path.resolve(lib, './js/jscad-parseJSON.js')).OpenJsCad;
    src = OpenJsCad.parseJSON(src, inputFile);
    return src;
  }

  var inputFormatHandlers = {
    'scad': inputScadHandler,
    'stl': inputStlHandler,
    'obj': inputObjHandler,
    'amf': inputAmfHandler,
    'gcode': inputGcodeHandler,
    'svg': inputSvgHandler,
    'json': inputJsonHandler,
    'jscad': function jscad(x) {
      return x;
    },
    undefined: function undefined(x) {
      return x;
    }
  };
  return inputFormatHandlers;
}

module.exports = makeInputFormatHandlers;