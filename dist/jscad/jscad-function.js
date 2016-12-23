'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createJscadFunction;
// == OpenJSCAD.org, Copyright (c) 2013-2016, Licensed under MIT License
//
// History:
//   2016/02/02: 0.4.0: GUI refactored, functionality split up into more files, mostly done by Z3 Dev

/**
 * Create an function for processing the JSCAD script into CSG/CAG objects
 * @param {String} script the script
 * @param {Object} globals the globals to use when evaluating the script: these are not ..
 * ...ACTUAL globals, merely functions/ variable accessible AS IF they were globals !
 */
function createJscadFunction(script, globals) {
  // console.log('globals', globals)
  // not a fan of this, we have way too many explicit api elements
  var globalsList = '';
  // each top key is a library ie : openscad helpers etc
  // one level below that is the list of libs
  // last level is the actual function we want to export to 'local' scope
  Object.keys(globals).forEach(function (libKey) {
    var lib = globals[libKey];
    // console.log(`lib:${libKey}: ${lib}`)
    Object.keys(lib).forEach(function (libItemKey) {
      var libItems = lib[libItemKey];
      // console.log('libItems', libItems)
      Object.keys(libItems).forEach(function (toExposeKey) {
        // console.log('toExpose',toExpose )
        var text = 'const ' + toExposeKey + ' = globals[\'' + libKey + '\'][\'' + libItemKey + '\'][\'' + toExposeKey + '\']\n';
        globalsList += text;
      });
    });
  });

  var source = '// SYNC WORKER\n    ' + globalsList + '\n\n    //user defined script(s)\n    ' + script + '\n\n    if (typeof (main) !== \'function\') {\n      throw new Error(\'The JSCAD script must contain a function main() which returns one or more CSG or CAG solids.\')\n    }\n\n    return main(params)\n  ';

  var f = new Function('params', 'include', 'globals', source);
  return f;
}