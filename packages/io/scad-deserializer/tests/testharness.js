var parser = require('../src/OpenscadOpenjscadParser')
var fs = require('fs')

var openSCADText = fs.readFileSync(__dirname + '/test.scad', 'UTF8')
var openJSCADResult = parser.parse(openSCADText)

console.log(openJSCADResult)
