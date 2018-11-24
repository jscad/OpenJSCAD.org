var _ = require('lodash')
var Context = require('./Context')
var Globals = require('./Globals')
var Range = require('./Range')

function ControlModule (factory) {
  this.factory = factory
};

function IfStatement (a) {
  ControlModule.call(this, a)
};

IfStatement.prototype.evaluate = function (parentContext, inst) {
  inst.argvalues = []

  _.each(inst.argexpr, function (expr, index, list) {
    inst.argvalues.push(expr.evaluate(parentContext))
  })

  var context = Context.newContext(parentContext, [], [], inst)

  var childrenToEvaluate = (inst.argvalues.length > 0 && inst.argvalues[0]) ? inst.children : inst.else_children

  var childModules = []

  for (var i = 0; i < childrenToEvaluate.length; i++) {
    var childInst = childrenToEvaluate[i]

    childInst.argvalues = []

    _.each(childInst.argexpr, function (expr, index, list) {
      childInst.argvalues.push(expr.evaluate(context))
    })

    var childAdaptor = this.factory.getAdaptor(childInst)

    childModules.push(childAdaptor.evaluate(context, childInst))
  };
  if (_.isEmpty(childModules)) {
    return undefined
  } else {
    if (childModules.length > 1) {
      return _.first(childModules) + '.union([' + _.tail(childModules) + '])'
    } else {
      return childModules[0]
    }
  }
}

function ForLoopStatement (factory, args) {
  ControlModule.call(this, factory)
  this.csgOp = args.csgOp
  this.evaluatedChildren = []

  this.forEval = function (parentEvaluatedChildren, inst, recurs_length, call_argnames, call_argvalues, arg_context) {
    this.evaluatedChildren = parentEvaluatedChildren

    if (call_argnames.length > recurs_length) {
      var it_name = call_argnames[recurs_length]
      var it_values = call_argvalues[recurs_length]
      var context = new Context(arg_context)

      if (it_values instanceof Range) {
        var range = it_values
        if (range.end < range.begin) {
          var t = range.begin
          range.begin = range.end
          range.end = t
        }
        if (range.step > 0 && (range.begin - range.end) / range.step < 10000) {
          for (var i = range.begin; i <= range.end; i += range.step) {
            context.setVariable(it_name, i)
            this.forEval(this.evaluatedChildren, inst, recurs_length + 1, call_argnames, call_argvalues, context)
          }
        }
      } else if (_.isArray(it_values)) {
        for (var i = 0; i < it_values.length; i++) {
          context.setVariable(it_name, it_values[i])
          this.forEval(this.evaluatedChildren, inst, recurs_length + 1, call_argnames, call_argvalues, context)
        }
      }
    } else if (recurs_length > 0) {
      var evaluatedInstanceChildren = inst.evaluateChildren(arg_context)
      if (_.isArray(evaluatedInstanceChildren)) {
        this.evaluatedChildren = this.evaluatedChildren.concat(evaluatedInstanceChildren)
      } else {
        this.evaluatedChildren.push(evaluatedInstanceChildren)
      }
    }
    if (_.isArray(this.evaluatedChildren)) {
      // remove empty arrays (e.g. for loops containing only echo statements)
      this.evaluatedChildren = _.reject(this.evaluatedChildren, function (x) { return _.isEmpty(x) })
    }

    // Note: we union here so subsequent actions (e.g. translate) can be performed on the entire result of the for loop.
    if (_.isArray(this.evaluatedChildren) && this.evaluatedChildren.length > 1) {
      var unionedEvaluatedChildren = _.first(this.evaluatedChildren) + '.' + this.csgOp + '([' + _.tail(this.evaluatedChildren) + '])'
      this.evaluatedChildren = [unionedEvaluatedChildren]
    }

    return this.evaluatedChildren
  }
};

ForLoopStatement.prototype.evaluate = function (context, inst) {
  if (inst.context === undefined) {
    inst.context = context
  }
  return this.forEval([], inst, 0, inst.argnames, inst.argvalues, inst.context)
}

function Echo (a) {
  ControlModule.call(this, a)
};

Echo.prototype.evaluate = function (parentContext, inst) {
  var context = new Context(parentContext)
  var argvalues = []

  _.each(inst.argexpr, function (expr, index, list) {
    argvalues.push(Globals.convertForStrFunction(expr.evaluate(context)))
  })

  console.log(_.template('ECHO: <%=argvalues%>')({ argvalues: argvalues }))

  return undefined
}

module.exports = {
  Echo: Echo,
  ForLoopStatement: ForLoopStatement,
  IfStatement: IfStatement
}
