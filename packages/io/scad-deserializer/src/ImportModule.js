var Context = require('./Context')
var Globals = require('./Globals')
var StlDecoder = require('./StlDecoder')

function Import (factory) {
  this.factory = factory
}

Import.prototype.evaluate = function (parentContext, inst) {
  var context = new Context(parentContext)

  var argnames = ['file', 'filename', 'convexity']
  var argexpr = []

  context.args(argnames, argexpr, inst.argnames, inst.argvalues)

  var filename = Context.contextVariableLookup(context, 'file', null) || Context.contextVariableLookup(context, 'filename', null)

  var convexity = Context.contextVariableLookup(context, 'convexity', 5)

  var importCache = Context.contextVariableLookup(context, 'importCache', {})

  var fileContents = importCache[filename]

  if (fileContents !== undefined) {
    var stlDecoder = new StlDecoder(atob(fileContents))
    stlDecoder.decode()
    return stlDecoder.getCSGString()
  }

  return undefined
}

module.Exports = Import
