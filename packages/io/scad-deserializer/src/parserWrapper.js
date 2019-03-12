var parser = require('./parserCJS')
var Globals = require('./Globals')

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
