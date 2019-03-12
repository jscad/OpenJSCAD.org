var _ = require('lodash')
var Context = require('./Context')
var Globals = require('./Globals')

function Child (factory) {
  this.factory = factory
};

Child.prototype.evaluate = function (parentContext, inst) {
  inst.argvalues = []
  _.each(inst.argexpr, function (expr, index, list) {
    inst.argvalues.push(expr.evaluate(parentContext))
  })

  var context = Context.newContext(parentContext, [], [], inst)

  var childIndex = 0
  if (inst.argvalues[0] !== undefined) {
    childIndex = inst.argvalues[0]
  }

  var evaluatedChildren = []

  for (var i = Globals.context_stack.length - 1; i >= 0; i--) {
    var ctx = Globals.context_stack[i]

    if (ctx.inst_p !== undefined) {
      if (childIndex < ctx.inst_p.children.length) {
        var childInst = ctx.inst_p.children[childIndex]

        _.each(childInst.argexpr, function (expr, index, list) {
          childInst.argvalues.push(expr.evaluate(ctx.inst_p.ctx))
        })

        var childAdaptor = this.factory.getAdaptor(childInst)
        evaluatedChildren.push(childAdaptor.evaluate(ctx.inst_p.ctx, childInst))
      }
      return evaluatedChildren
    }
    ctx = ctx.parentContext
  };

  return undefined
}

module.exports = Child
