import {
  arc,
  circle,
  cuboid,
  cylinder,
  cylinderElliptic,
  geom2,
  line,
  path2,
  rectangle,
  rotateX,
  sphere,
  subtract
} from '@jscad/modeling'

import { x3dTypes } from './objects.js'
import { findNode } from './translateHelpers.js'

import { extrudeX3D } from './extrudeX3D.js'

export const instantiatePrimitive = (options, objects) => {
  let geometry

  // 3D primitives

  let object = findNode(x3dTypes.BOX, objects)
  if (object) {
    geometry = cuboid({ size: object.size })
    return geometry
  }

  object = findNode(x3dTypes.CONE, objects)
  if (object) {
    geometry = rotateX(-Math.PI / 2, cylinderElliptic({
      startRadius: [object.bottomRadius, object.bottomRadius],
      height: object.height,
      segments: object.subdivision,
      endRadius: [object.topRadius, object.topRadius]
    }))
    return geometry
  }

  object = findNode(x3dTypes.CYLINDER, objects)
  if (object) {
    geometry = rotateX(-Math.PI / 2, cylinder({
      radius: object.radius,
      height: object.height,
      segments: object.subdivision
    }))
    return geometry
  }

  object = findNode(x3dTypes.SPHERE, objects)
  if (object) {
    geometry = sphere({ radius: object.radius, segments: object.subdivision })
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
    geometry = arc({ radius: object.radius, startAngle: object.startAngle, endAngle: object.endAngle, segments: object.subdivision })
    return geometry
  }

  object = findNode(x3dTypes.ARCCLOSE2D, objects)
  if (object) {
    if (object.closureType === 'PIE') {
      geometry = circle({ radius: object.radius, startAngle: object.startAngle, endAngle: object.endAngle, segments: object.subdivision })
    } else {
      geometry = geom2.create([path2.toPoints(path2.close(
        arc({ radius: object.radius, startAngle: object.startAngle, endAngle: object.endAngle, segments: object.subdivision })
      ))])
    }
    return geometry
  }

  object = findNode(x3dTypes.CIRCLE2D, objects)
  if (object) {
    // NOTE: X3D circles are really closed arcs (lines)
    geometry = arc({ radius: object.radius, segments: object.subdivision })
    return geometry
  }

  object = findNode(x3dTypes.DISK2D, objects)
  if (object) {
    if (object.innerRadius === object.outerRadius) {
      geometry = arc({ radius: object.outerRadius, segments: object.subdivision })
    } else {
      if (object.innerRadius === 0) {
        geometry = circle({ radius: object.outerRadius, segments: object.subdivision })
      } else {
        geometry = subtract(circle({ radius: object.outerRadius, segments: object.subdivision }), circle({ radius: object.innerRadius, segments: object.subdivision }))
      }
    }
    return geometry
  }

  object = findNode(x3dTypes.POLYLINE2D, objects)
  if (object) {
    geometry = line([object.lineSegments])
    return geometry
  }

  object = findNode(x3dTypes.RECTANGLE2D, objects)
  if (object) {
    geometry = rectangle({ size: object.size })
    return geometry
  }

  object = findNode(x3dTypes.TRIANGLESET2D, objects)
  if (object) {
    const vertices = object.vertices
    const numpoints = vertices.length
    const numfaces = Math.trunc(numpoints / 3)
    geometry = []
    for (let i = 0; i < numfaces; i = i + 3) {
      geometry.push(geom2.create([[vertices[i], vertices[i + 1], vertices[i + 2]]]))
    }
    return geometry
  }

  return geometry
}
