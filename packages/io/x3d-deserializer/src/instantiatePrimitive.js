const { booleans, geometries, primitives, transforms } = require('@jscad/modeling')

const { x3dTypes } = require('./objects')
const { findNode } = require('./translateHelpers')

const extrudeX3D = require('./extrudeX3D')

const instantiatePrimitive = (options, objects) => {
  let geometry

  // 3D primitives

  let object = findNode(x3dTypes.BOX, objects)
  if (object) {
    geometry = primitives.cuboid({ size: object.size })
    return geometry
  }

  object = findNode(x3dTypes.CONE, objects)
  if (object) {
    geometry = transforms.rotateX(-Math.PI / 2, primitives.cylinderElliptic({
      startRadius: [object.bottomRadius, object.bottomRadius],
      height: object.height,
      segments: object.subdivision,
      endRadius: [object.topRadius, object.topRadius]
    }))
    return geometry
  }

  object = findNode(x3dTypes.CYLINDER, objects)
  if (object) {
    geometry = transforms.rotateX(-Math.PI / 2, primitives.cylinder({
      radius: object.radius,
      height: object.height,
      segments: object.subdivision
    }))
    return geometry
  }

  object = findNode(x3dTypes.SPHERE, objects)
  if (object) {
    geometry = primitives.sphere({ radius: object.radius, segments: object.subdivision })
    return geometry
  }

  object = findNode(x3dTypes.EXTRUSION, objects)
  if (object) {
    geometry = extrudeX3D(object)
    return geometry
  }

  // 2D primitives

  object = findNode(x3dTypes.ARC2D, objects)
  if (object) {
    geometry = primitives.arc({ radius: object.radius, startAngle: object.startAngle, endAngle: object.endAngle, segments: object.subdivision })
    return geometry
  }

  object = findNode(x3dTypes.ARCCLOSE2D, objects)
  if (object) {
    if (object.closureType === 'PIE') {
      geometry = primitives.circle({ radius: object.radius, startAngle: object.startAngle, endAngle: object.endAngle, segments: object.subdivision })
    } else {
      geometry = geometries.geom2.fromPoints(geometries.path2.toPoints(geometries.path2.close(
        primitives.arc({ radius: object.radius, startAngle: object.startAngle, endAngle: object.endAngle, segments: object.subdivision })
      )))
    }
    return geometry
  }

  object = findNode(x3dTypes.CIRCLE2D, objects)
  if (object) {
    // NOTE: X3D circles are really closed arcs (lines)
    geometry = primitives.arc({ radius: object.radius, segments: object.subdivision })
    return geometry
  }

  object = findNode(x3dTypes.DISK2D, objects)
  if (object) {
    if (object.innerRadius === object.outerRadius) {
      geometry = primitives.arc({ radius: object.outerRadius, segments: object.subdivision })
    } else {
      if (object.innerRadius === 0) {
        geometry = primitives.circle({ radius: object.outerRadius, segments: object.subdivision })
      } else {
        geometry = booleans.subtract(primitives.circle({ radius: object.outerRadius, segments: object.subdivision }), primitives.circle({ radius: object.innerRadius, segments: object.subdivision }))
      }
    }
    return geometry
  }

  object = findNode(x3dTypes.POLYLINE2D, objects)
  if (object) {
    geometry = primitives.line([object.lineSegments])
    return geometry
  }

  object = findNode(x3dTypes.RECTANGLE2D, objects)
  if (object) {
    geometry = primitives.rectangle({ size: object.size })
    return geometry
  }

  object = findNode(x3dTypes.TRIANGLESET2D, objects)
  if (object) {
    const vertices = object.vertices
    const numpoints = vertices.length
    const numfaces = Math.trunc(numpoints / 3)
    geometry = []
    for (let i = 0; i < numfaces; i = i + 3) {
      geometry.push(geometries.geom2.fromPoints([vertices[i], vertices[i + 1], vertices[i + 2]]))
    }
    return geometry
  }

  return geometry
}

module.exports = instantiatePrimitive
