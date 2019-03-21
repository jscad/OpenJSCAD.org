var _ = require('lodash')
var Context = require('./Context')
var Globals = require('./Globals')

function TransformModule (factory) {
  var factory = factory

  this.transformChildren = function (children, context, cb) {
    var childModules = []

    for (var i = 0; i < children.length; i++) {
      var childInst = children[i]
      childInst.argvalues = []

      _.each(childInst.argexpr, function (expr, index, list) {
        childInst.argvalues.push(expr.evaluate(context))
      })
      var childAdaptor = factory.getAdaptor(childInst)
      var transformedChild = childAdaptor.evaluate(context, childInst)
      if (transformedChild) {
        transformedChild += cb()
        childModules.push(transformedChild)
      }
    }

    if (childModules.length == 1) {
      return childModules[0]
    } else if (childModules.length > 1) {
      return _.first(childModules) + '.union([' + _.tail(childModules) + '])'
    }
  }
}

function ColorTransform (a) {
  TransformModule.call(this, a)
}

ColorTransform.prototype.evaluate = function (parentContext, inst) {
  inst.argvalues = []

  _.each(inst.argexpr, function (expr, index, list) {
    inst.argvalues.push(expr.evaluate(parentContext))
  })

  var context = Context.newContext(parentContext, ['c', 'alpha'], [], inst)

  var c = Context.contextVariableLookup(context, 'c', undefined)
  var color = 'white'
  if (c !== undefined) {
    color = _.isString(c) ? colorNameLookup[Globals.stripString(c.toLowerCase())] : c
  }

  var alpha = Context.contextVariableLookup(context, 'alpha', undefined)
  if (alpha !== undefined) {
    color[3] = alpha
  }

  return this.transformChildren(inst.children, context, function () {
    return _.template('.setColor(<%=color%>)')({ color: color })
  })
}

function MirrorTransform (a) {
  TransformModule.call(this, a)
}

MirrorTransform.prototype.evaluate = function (parentContext, inst) {
  inst.argvalues = []

  _.each(inst.argexpr, function (expr, index, list) {
    inst.argvalues.push(expr.evaluate(parentContext))
  })

  var context = Context.newContext(parentContext, ['v'], [], inst)

  var v = Context.contextVariableLookup(context, 'v', [0, 0, 0])

  if (!(v instanceof Array)) {
    var val = v
    v = [val, val, val]
  }

  return this.transformChildren(inst.children, context, function () {
    return _.template('.mirrored(CSG.Plane.fromNormalAndPoint([<%=v%>], [0,0,0]))')({ v: v })
  })
}

function RotateTransform (a) {
  TransformModule.call(this, a)
}

RotateTransform.prototype.evaluate = function (parentContext, inst) {
  inst.argvalues = []

  _.each(inst.argexpr, function (expr, index, list) {
    inst.argvalues.push(expr.evaluate(parentContext))
  })

  var context = Context.newContext(parentContext, ['a', 'v'], [], inst)

  var a = Context.contextVariableLookup(context, 'a', undefined)

  if (_.isArray(a)) {
    return this.transformChildren(inst.children, context, function () {
      return _.template('.rotateX(<%=degreeX%>).rotateY(<%=degreeY%>).rotateZ(<%=degreeZ%>)')
      ({ degreeX: a[0], degreeY: a[1], degreeZ: a[2] })
    })
  } else {
    var v = Context.contextVariableLookup(context, 'v', undefined)
    return this.transformChildren(inst.children, context, function () {
      if (v === undefined || v.toString() == '0,0,0') {
        v = [0, 0, 1]
      }
      return _.template('.transform(CSG.Matrix4x4.rotation([0,0,0], [<%=vector%>], <%=degree%>))')({ degree: a, vector: v })
    })
  }
}

function ScaleTransform (a) {
  TransformModule.call(this, a)
}

ScaleTransform.prototype.evaluate = function (parentContext, inst) {
  inst.argvalues = []

  _.each(inst.argexpr, function (expr, index, list) {
    inst.argvalues.push(expr.evaluate(parentContext))
  })

  var context = Context.newContext(parentContext, ['v'], [], inst)

  var v = Context.contextVariableLookup(context, 'v', [0, 0, 0])

  if (!(v instanceof Array)) {
    var val = v
    v = [val, val, val]
  }

  return this.transformChildren(inst.children, context, function () {
    return _.template('.scale([<%=v%>])')({ v: v })
  })
}

function TranslateTransform (a) {
  TransformModule.call(this, a)
}

TranslateTransform.prototype.evaluate = function (parentContext, inst) {
  inst.argvalues = []

  _.each(inst.argexpr, function (expr, index, list) {
    inst.argvalues.push(expr.evaluate(parentContext))
  })

  var context = Context.newContext(parentContext, ['v'], [], inst)

  var v = Context.contextVariableLookup(context, 'v', [0, 0, 0])

  return this.transformChildren(inst.children, context, function () {
    return _.template('.translate([<%=v%>])')({ v: v })
  })
}

function RenderModule (a) {
  TransformModule.call(this, a)
}

RenderModule.prototype.evaluate = function (parentContext, inst) {
  inst.argvalues = []

  _.each(inst.argexpr, function (expr, index, list) {
    inst.argvalues.push(expr.evaluate(parentContext))
  })

  var context = Context.newContext(parentContext, [], [], inst)

  var childIndex = 0
  if (inst.argvalues[0] !== undefined) {
    childIndex = inst.argvalues[0]
  }

  return this.transformChildren(inst.children, context, function () {
    return ''
  })
}

function MultimatrixTransform (a) {
  TransformModule.call(this, a)

  this.transposeMatrix = function (m) {
    var t = []
    var ti = 0

    for (var j in _.range(4)) {
      for (var i in _.range(4)) {
        t[ti++] = m[i][j]
      }
    }
    return t
  }
}

MultimatrixTransform.prototype.evaluate = function (parentContext, inst) {
  inst.argvalues = []

  _.each(inst.argexpr, function (expr, index, list) {
    inst.argvalues.push(expr.evaluate(parentContext))
  })

  var context = Context.newContext(parentContext, ['m'], [], inst)

  var m = Context.contextVariableLookup(context, 'm', undefined)

  var matrix
  if (m !== undefined) {
    matrix = this.transposeMatrix(m)
  }

  return this.transformChildren(inst.children, context, function () {
    return _.template('.transform(new CSG.Matrix4x4( [<%= matrix %>] ))')({ matrix: matrix })
  })
}

function ExtrudeTransform (a) {
  TransformModule.call(this, a)
}

ExtrudeTransform.prototype.evaluate = function (parentContext, inst) {
  inst.argvalues = []

  _.each(inst.argexpr, function (expr, index, list) {
    inst.argvalues.push(expr.evaluate(parentContext))
  })

  var context = Context.newContext(parentContext, ['file', 'layer', 'height', 'origin', 'scale', 'center', 'twist', 'slices', '$fn', '$fs', '$fa'], [], inst)

  var height = Context.contextVariableLookup(context, 'height', 100)
  var center = Context.contextVariableLookup(context, 'center', false)
  var twist = Number(Context.contextVariableLookup(context, 'twist', 0)) / -1 // note inverse for openjscad
  var slices = Context.contextVariableLookup(context, 'slices', undefined)
  var fn = Context.contextVariableLookup(context, '$fn', Globals.FN_DEFAULT)
  var fs = Context.contextVariableLookup(context, '$fs', Globals.FS_DEFAULT)
  var fa = Context.contextVariableLookup(context, '$fa', Globals.FA_DEFAULT)

  if (slices === undefined) {
    slices = parseInt(Math.max(2, Math.abs(Context.get_fragments_from_r(height, context) * twist / 360)))
  }

  return this.transformChildren(inst.children, context, function () {
    var template = _.template('.extrude({offset: [0, 0, <%=height%>], twistangle: <%=twist%>,twiststeps: <%=slices%>})')
    ({ height: height, twist: twist, slices: slices })
    if (center) {
      var offset = -height / 2
      template += _.template('.translate([0,0,<%=offset%>])')({ offset: offset })
    }
    return template
  })
}

var colorNameLookup = { 'indianred': [0.804, 0.361, 0.361], 'lightcoral': [0.941, 0.502, 0.502], 'salmon': [0.980, 0.502, 0.447], 'darksalmon': [0.914, 0.588, 0.478], 'lightsalmon': [1, 0.627, 0.478], 'red': [1, 0, 0], 'crimson': [0.863, 0.078, 0.235], 'firebrick': [0.698, 0.133, 0.133], 'darkred': [0.545, 0, 0], 'pink': [1, 0.753, 0.796], 'lightpink': [1, 0.714, 0.757], 'hotpink': [1, 0.412, 0.706], 'deeppink': [1, 0.078, 0.576], 'mediumvioletred': [0.780, 0.082, 0.522], 'palevioletred': [0.859, 0.439, 0.576], 'lightsalmon': [1, 0.627, 0.478], 'coral': [1, 0.498, 0.314], 'tomato': [1, 0.388, 0.278], 'orangered': [1, 0.271, 0], 'darkorange': [1, 0.549, 0], 'orange': [1, 0.647, 0], 'gold': [1, 0.843, 0], 'yellow': [1, 1, 0], 'lightyellow': [1, 1, 0.878], 'lemonchiffon': [1, 0.980, 0.804], 'lightgoldenrodyellow': [0.980, 0.980, 0.824], 'papayawhip': [1, 0.937, 0.835], 'moccasin': [1, 0.894, 0.710], 'peachpuff': [1, 0.855, 0.725], 'palegoldenrod': [0.933, 0.910, 0.667], 'khaki': [0.941, 0.902, 0.549], 'darkkhaki': [0.741, 0.718, 0.420], 'lavender': [0.902, 0.902, 0.980], 'thistle': [0.847, 0.749, 0.847], 'plum': [0.867, 0.627, 0.867], 'violet': [0.933, 0.510, 0.933], 'orchid': [0.855, 0.439, 0.839], 'fuchsia': [1, 0, 1], 'magenta': [1, 0, 1], 'mediumorchid': [0.729, 0.333, 0.827], 'mediumpurple': [0.576, 0.439, 0.859], 'blueviolet': [0.541, 0.169, 0.886], 'darkviolet': [0.580, 0, 0.827], 'darkorchid': [0.600, 0.196, 0.800], 'darkmagenta': [0.545, 0, 0.545], 'purple': [0.502, 0, 0.502], 'indigo': [0.294, 0, 0.510], 'darkslateblue': [0.282, 0.239, 0.545], 'slateblue': [0.416, 0.353, 0.804], 'mediumslateblue': [0.482, 0.408, 0.933], 'greenyellow': [0.678, 1, 0.184], 'chartreuse': [0.498, 1, 0], 'lawngreen': [0.486, 0.988, 0], 'lime': [0, 1, 0], 'limegreen': [0.196, 0.804, 0.196], 'palegreen': [0.596, 0.984, 0.596], 'lightgreen': [0.565, 0.933, 0.565], 'mediumspringgreen': [0, 0.980, 0.604], 'springgreen': [0, 1, 0.498], 'mediumseagreen': [0.235, 0.702, 0.443], 'seagreen': [0.180, 0.545, 0.341], 'forestgreen': [0.133, 0.545, 0.133], 'green': [0, 0.502, 0], 'darkgreen': [0, 0.392, 0], 'yellowgreen': [0.604, 0.804, 0.196], 'olivedrab': [0.420, 0.557, 0.137], 'olive': [0.502, 0.502, 0], 'darkolivegreen': [0.333, 0.420, 0.184], 'mediumaquamarine': [0.400, 0.804, 0.667], 'darkseagreen': [0.561, 0.737, 0.561], 'lightseagreen': [0.125, 0.698, 0.667], 'darkcyan': [0, 0.545, 0.545], 'teal': [0, 0.502, 0.502], 'aqua': [0, 1, 1], 'cyan': [0, 1, 1], 'lightcyan': [0.878, 1, 1], 'paleturquoise': [0.686, 0.933, 0.933], 'aquamarine': [0.498, 1, 0.831], 'turquoise': [0.251, 0.878, 0.816], 'mediumturquoise': [0.282, 0.820, 0.800], 'darkturquoise': [0, 0.808, 0.820], 'cadetblue': [0.373, 0.620, 0.627], 'steelblue': [0.275, 0.510, 0.706], 'lightsteelblue': [0.690, 0.769, 0.871], 'powderblue': [0.690, 0.878, 0.902], 'lightblue': [0.678, 0.847, 0.902], 'skyblue': [0.529, 0.808, 0.922], 'lightskyblue': [0.529, 0.808, 0.980], 'deepskyblue': [0, 0.749, 1], 'dodgerblue': [0.118, 0.565, 1], 'cornflowerblue': [0.392, 0.584, 0.929], 'royalblue': [0.255, 0.412, 0.882], 'blue': [0, 0, 1], 'mediumblue': [0, 0, 0.804], 'darkblue': [0, 0, 0.545], 'navy': [0, 0, 0.502], 'midnightblue': [0.098, 0.098, 0.439], 'cornsilk': [1, 0.973, 0.863], 'blanchedalmond': [1, 0.922, 0.804], 'bisque': [1, 0.894, 0.769], 'navajowhite': [1, 0.871, 0.678], 'wheat': [0.961, 0.871, 0.702], 'burlywood': [0.871, 0.722, 0.529], 'tan': [0.824, 0.706, 0.549], 'rosybrown': [0.737, 0.561, 0.561], 'sandybrown': [0.957, 0.643, 0.376], 'goldenrod': [0.855, 0.647, 0.125], 'darkgoldenrod': [0.722, 0.525, 0.043], 'peru': [0.804, 0.522, 0.247], 'chocolate': [0.824, 0.412, 0.118], 'saddlebrown': [0.545, 0.271, 0.075], 'sienna': [0.627, 0.322, 0.176], 'brown': [0.647, 0.165, 0.165], 'maroon': [0.502, 0, 0], 'white': [1, 1, 1], 'snow': [1, 0.980, 0.980], 'honeydew': [0.941, 1, 0.941], 'mintcream': [0.961, 1, 0.980], 'azure': [0.941, 1, 1], 'aliceblue': [0.941, 0.973, 1], 'ghostwhite': [0.973, 0.973, 1], 'whitesmoke': [0.961, 0.961, 0.961], 'seashell': [1, 0.961, 0.933], 'beige': [0.961, 0.961, 0.863], 'oldlace': [0.992, 0.961, 0.902], 'floralwhite': [1, 0.980, 0.941], 'ivory': [1, 1, 0.941], 'antiquewhite': [0.980, 0.922, 0.843], 'linen': [0.980, 0.941, 0.902], 'lavenderblush': [1, 0.941, 0.961], 'mistyrose': [1, 0.894, 0.882], 'gainsboro': [0.863, 0.863, 0.863], 'lightgrey': [0.827, 0.827, 0.827], 'silver': [0.753, 0.753, 0.753], 'darkgray': [0.663, 0.663, 0.663], 'gray': [0.502, 0.502, 0.502], 'dimgray': [0.412, 0.412, 0.412], 'lightslategray': [0.467, 0.533, 0.600], 'slategray': [0.439, 0.502, 0.565], 'darkslategray': [0.184, 0.310, 0.310], 'black': [0, 0, 0] }

module.exports = {
  Translate: TranslateTransform,
  Scale: ScaleTransform,
  Rotate: RotateTransform,
  Mirror: MirrorTransform,
  Color: ColorTransform,
  Render: RenderModule,
  Multimatrix: MultimatrixTransform,
  Extrude: ExtrudeTransform
}
