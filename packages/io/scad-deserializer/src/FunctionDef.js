var Context = require('./Context')

function FunctionDef () {
  this.argnames = []
  this.argexpr = []
  this.expr
}

FunctionDef.prototype.evaluate = function (parentContext, call_argnames, call_argvalues) {
  var context = new Context(parentContext)
  context.args(this.argnames, this.argexpr, call_argnames, call_argvalues)

  if (this.expr !== undefined) {
    return this.expr.evaluate(context)
  }

  return undefined
}

module.exports = FunctionDef
