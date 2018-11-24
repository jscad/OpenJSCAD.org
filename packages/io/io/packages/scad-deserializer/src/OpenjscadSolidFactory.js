var Context = require('./Context')
var Globals = require('./Globals')
var PrimitiveModules = require('./PrimitiveModules')
var TransformModules = require('./TransformModules')
var ControlModules = require('./ControlModules')
var CSGModule = require('./CSGModule')

var ChildModule = require('./ChildModule')
var ModuleAdaptor = require('./ModuleAdaptor')
var ImportModule = require('./ImportModule')

function OpenjscadSolidFactory () {}

OpenjscadSolidFactory.prototype.getAdaptor = function (args) {
  switch (args.name) {
    case 'cube':
      return new PrimitiveModules.Cube()
    case 'sphere':
      return new PrimitiveModules.Sphere()
    case 'cylinder':
      return new PrimitiveModules.Cylinder()
    case 'polyhedron':
      return new PrimitiveModules.Polyhedron()
    case 'circle':
      return new PrimitiveModules.Circle()
    case 'square':
      return new PrimitiveModules.Square()
    case 'polygon':
      return new PrimitiveModules.Polygon()
    case 'union':
      return new CSGModule(this, 'union')
    case 'difference':
      return new CSGModule(this, 'subtract')
    case 'intersect':
    case 'intersection':
      return new CSGModule(this, 'intersect')
    case 'translate':
      return new TransformModules.Translate(this)
    case 'scale':
      return new TransformModules.Scale(this)
    case 'rotate':
      return new TransformModules.Rotate(this)
    case 'mirror':
      return new TransformModules.Mirror(this)
    case 'linear_extrude':
      return new TransformModules.Extrude(this)
    case 'color':
      return new TransformModules.Color(this)
    case 'multmatrix':
      return new TransformModules.Multimatrix(this)
    case 'render':
    case 'assign': // Note: assign does the same as render in this case - re-evaluate the arguments and process the children.
      return new TransformModules.Render(this)
    case 'echo':
      return new ControlModules.Echo(this)
    case 'for':
      return new ControlModules.ForLoopStatement(this, { csgOp: 'union' })
    case 'intersection_for':
      return new ControlModules.ForLoopStatement(this, { csgOp: 'intersect' })
    case 'if':
      return new ControlModules.IfStatement(this)
    case 'import':
      return new ImportModule(this)
    case 'child':
      return new ChildModule(this)
    default:
      return new ModuleAdaptor()
  }
}

module.exports = OpenjscadSolidFactory
