var _ = require('lodash')
var Context = require('./Context')
var Globals = require('./Globals')

function PrimitiveModule () {};

function Sphere (a) {
  PrimitiveModule.call(this, a)
};

Sphere.prototype.evaluate = function (parentContext, inst) {
  var context = new Context(parentContext)

  var argnames = ['r', '$fn']
  var argexpr = []

  context.args(argnames, argexpr, inst.argnames, inst.argvalues)

  var r = Context.contextVariableLookup(context, 'r', 1)

  var resolution = Context.get_fragments_from_r(r, context)

  var openjscadParameters = { center: [0, 0, 0], resolution: resolution, radius: r }

  return _.template('CSG.sphere({center: [<%=String(center)%>], radius: <%= radius %>, resolution: <%= resolution%>})')(openjscadParameters)
}

function Cylinder (a) {
  PrimitiveModule.call(this, a)
};

Cylinder.prototype.evaluate = function (parentContext, inst) {
  var context = new Context(parentContext)

  var argnames = ['h', 'r1', 'r2', 'center', '$fn', '$fa', '$fs']
  var argexpr = []

  context.args(argnames, argexpr, inst.argnames, inst.argvalues)

  var openjscadArgs = { start: [0, 0, 0], end: [0, 0, 1], radiusStart: 1, radiusEnd: 1, resolution: Globals.DEFAULT_RESOLUTION }
  var isCentered = Context.contextVariableLookup(context, 'center', false)
  var h = Context.contextVariableLookup(context, 'h', 1)
  var r = Context.contextVariableLookup(context, 'r', 1)
  var r1 = Context.contextVariableLookup(context, 'r1', undefined)
  var r2 = Context.contextVariableLookup(context, 'r2', undefined)

  var startZ = isCentered ? -(h / 2) : 0
  var endZ = isCentered ? h / 2 : h

  openjscadArgs.start = [0, 0, startZ]
  openjscadArgs.end = [0, 0, endZ]

  /* we have to check the context vars directly here in case a parent module in the context stack has the same parameters, e.g. r1 which would be used as default.
 Example testcad case:
      module ring(r1, r2, h) {
          cylinder(r = 3, h = h);
      }
      ring(8, 6, 10);
*/

  if (_.has(context.vars, 'r')) {
    openjscadArgs.radiusStart = r
    openjscadArgs.radiusEnd = r
  }
  if (_.has(context.vars, 'r1')) {
    openjscadArgs.radiusStart = r1
  }
  if (_.has(context.vars, 'r2')) {
    openjscadArgs.radiusEnd = r2
  }
  openjscadArgs.resolution = Context.get_fragments_from_r(Math.max(openjscadArgs.radiusStart, openjscadArgs.radiusEnd), context)

  if (openjscadArgs.radiusStart == 0 && openjscadArgs.radiusEnd == 0) {
    return undefined
  }

  return _.template('CSG.cylinder({start: [<%=start%>], end: [<%=end%>],radiusStart: <%=radiusStart%>, radiusEnd: <%=radiusEnd%>, resolution: <%=resolution%>})')(openjscadArgs)
}

function Cube (a) {
  PrimitiveModule.call(this, a)
};

Cube.prototype.evaluate = function (parentContext, inst) {
  var context = Context.newContext(parentContext, ['size', 'center'], [], inst)

  var openjscadArgs = { resolution: Globals.DEFAULT_RESOLUTION }
  var isCentered = Context.contextVariableLookup(context, 'center', false)
  var size = Context.contextVariableLookup(context, 'size', 1)

  if (size instanceof Array) {
    openjscadArgs.radius = [size[0] / 2, size[1] / 2, size[2] / 2]
  } else {
    openjscadArgs.radius = [size / 2, size / 2, size / 2]
  }

  if (isCentered) {
    openjscadArgs.centerVector = [0, 0, 0]
  } else {
    openjscadArgs.centerVector = [openjscadArgs.radius[0], openjscadArgs.radius[1], openjscadArgs.radius[2]]
  }

  return _.template('CSG.cube({center: [<%=String(centerVector)%>],radius: [<%= radius %>], resolution: <%= resolution%>})')(openjscadArgs)
}

function Circle (a) {
  PrimitiveModule.call(this, a)
};

Circle.prototype.evaluate = function (parentContext, inst) {
  var context = Context.newContext(parentContext, ['r', '$fn'], [], inst)

  var r = Context.contextVariableLookup(context, 'r', 1)
  var resolution = Context.get_fragments_from_r(r, context)

  return _.template('CAG.circle({center: [0,0], radius: <%=r%>, resolution: <%=resolution%>})')({ r: r, resolution: resolution })
}

function Square (a) {
  PrimitiveModule.call(this, a)
};

Square.prototype.evaluate = function (parentContext, inst) {
  var context = Context.newContext(parentContext, ['size', 'center'], [], inst)

  var size = Context.contextVariableLookup(context, 'size', [0.5, 0.5])
  var center = Context.contextVariableLookup(context, 'center', false)
  var radius = _.isArray(size) ? radius = [size[0] / 2, size[1] / 2] : [size / 2, size / 2]
  var centerPoint = [0, 0]
  if (!center) {
    centerPoint = [size[0] / 2, size[1] / 2]
  }

  return _.template('CAG.rectangle({center: [<%=centerPoint%>], radius: [<%=radius%>]})')({ centerPoint: centerPoint, radius: radius })
}

function Polygon (a) {
  PrimitiveModule.call(this, a)
};

Polygon.prototype.evaluate = function (parentContext, inst) {
  var context = Context.newContext(parentContext, ['points', 'paths', 'convexity'], [], inst)

  var points = Context.contextVariableLookup(context, 'points', [])
  var paths = Context.contextVariableLookup(context, 'paths', [])
  var pointsMap = []

  function formatPoints (points) {
    return _.map(points, function (x) { return _.template('[<%=x%>]')({ x: x }) })
  }

  if (_.isEmpty(paths)) {
    return _.template('CAG.fromPoints([<%=points%>])')({ points: formatPoints(points) })
  }

  if (paths.length > 1) {
    var lines = ''

    _.each(_.first(paths), function (x) {
      pointsMap.push(points[x])
    })
    lines += _.template('(new CSG.Path2D([<%=points%>],true)).innerToCAG().subtract([')({ points: formatPoints(pointsMap) })

    var holes = []

    _.each(_.tail(paths), function (shape) {
      pointsMap = []
      _.each(shape, function (x) {
        pointsMap.push(points[x])
      })
      holes.push(_.template('(new CSG.Path2D([<%=points%>],true)).innerToCAG()')({ points: formatPoints(pointsMap) }))
    })

    lines += holes.join(',') + '])'

    return lines
  } else {
    _.each(paths[0], function (x) {
      pointsMap.push(points[x])
    })
    return _.template('(new CSG.Path2D([<%=points%>],true)).innerToCAG()')({ points: formatPoints(pointsMap) })
  }
}

function Polyhedron (a) {
  PrimitiveModule.call(this, a)
};

Polyhedron.prototype.evaluate = function (parentContext, inst) {
  var context = Context.newContext(parentContext, ['points', 'triangles', 'convexity'], [], inst)

  var points = Context.contextVariableLookup(context, 'points', [])
  var triangles = Context.contextVariableLookup(context, 'triangles', [])

  var polygons = []

  _.each(triangles, function (triangle) {
    polygons.push(
      _.template('new CSG.Polygon([new CSG.Vertex(new CSG.Vector3D([<%=vec1%>])),new CSG.Vertex(new CSG.Vector3D([<%=vec2%>])),new CSG.Vertex(new CSG.Vector3D([<%=vec3%>]))])')
      ({ vec1: points[triangle[2]],
        vec2: points[triangle[1]],
        vec3: points[triangle[0]] }))
  })

  return _.template('CSG.fromPolygons([<%=polygons%>])')({ polygons: polygons })
}

module.exports = {
  Sphere: Sphere,
  Cube: Cube,
  Cylinder: Cylinder,
  Circle: Circle,
  Square: Square,
  Polygon: Polygon,
  Polyhedron: Polyhedron
}
