var Context = require('./Context')
var Globals = require('./Globals')
var _ = require('lodash')

function CSGModule (factory, csgOperation) {
  this.csgOperation = csgOperation
  this.factory = factory
};

CSGModule.prototype.evaluate = function (parentContext, inst) {
  var context = new Context(parentContext)

  var childModules = []

  for (var i = 0; i < inst.children.length; i++) {
    var childInst = inst.children[i]
    childInst.argvalues = []
    _.each(childInst.argexpr, function (expr, index, list) {
      childInst.argvalues.push(expr.evaluate(context))
    })

    var childAdaptor = this.factory.getAdaptor(childInst)
    var evaluatedChild = childAdaptor.evaluate(parentContext, childInst)
    if (evaluatedChild !== undefined) {
      childModules.push(evaluatedChild)
    }
  };

  if (childModules.length <= 1) {
    return childModules[0]
  } else {
    return childModules[0] + '.' + this.csgOperation + '([' + childModules.slice(1).join(',\n') + '])'
  }
}

module.exports = CSGModule
