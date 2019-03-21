var requirejs = require('requirejs')

requirejs.config({
  baseUrl: __dirname,
  paths: {
    lib: '../lib'
  },
  nodeRequire: require
})

var parser = requirejs('openscad-parser')
var Globals = requirejs('Globals')
var parser_support = requirejs('openscad-parser-support')
var us = requirejs('lib/underscore')

module.exports = {
  parse: function (text) {
    if (parser.yy === undefined) {
      parser.yy = {}
    }

    var openSCADText = Globals.preParse(text)

    var openJSCADResult = parser.parse(openSCADText)

    return openJSCADResult.lines.join('\n')
  }
}
