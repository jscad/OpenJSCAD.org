var ModuleInstantiation = require('./ModuleInstantiation')

function IfElseModuleInstantiation () {
  ModuleInstantiation.call(this)
  this.name = 'if'
  this.else_children = []
}

IfElseModuleInstantiation.prototype = new ModuleInstantiation()
IfElseModuleInstantiation.prototype.constructor = IfElseModuleInstantiation

module.exports = IfElseModuleInstantiation
