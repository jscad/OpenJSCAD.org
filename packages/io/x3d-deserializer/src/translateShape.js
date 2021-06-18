const { geometries } = require('@jscad/modeling')

const { geom3, poly3 } = geometries

const extrudeX3D = require('./extrudeX3D')

const { x3dTypes } = require('./objects')
const { findNode, findColor, pointsToString } = require('./translateHelpers')

const translateLine = require('./translateLine')
const translateMesh = require('./translateMesh')

const translateShape = (options, object) => {
  let code = `
// shape
const createObjects${object.id} = (options) => {
  let objects = []
`

  const objects = object.objects
  // look for the color
  const color = findColor(objects, options)

  // look for one of the known shapes
  let primitive

  // 3D geometries
  let shape = findNode(x3dTypes.BOX, objects)
  if (shape) {
    primitive = `primitives.cuboid({size: [${shape.size}]})`
  } else {
    shape = findNode(x3dTypes.CONE, objects)
    if (shape) {
      code += `  const shape = transforms.rotateX(-Math.PI/2, primitives.cylinderElliptic({startRadius: [${shape.bottomRadius},${shape.bottomRadius}], height: ${shape.height}, segments: ${shape.subdivision}, endRadius: [${shape.topRadius}, ${shape.topRadius}]}))
`
      primitive = 'shape'
    } else {
      shape = findNode(x3dTypes.CYLINDER, objects)
      if (shape) {
        code += `  const shape = transforms.rotateX(-Math.PI/2, primitives.cylinder({radius: ${shape.radius}, height: ${shape.height}, segments: ${shape.subdivision}}))
`
        primitive = 'shape'
      } else {
        shape = findNode(x3dTypes.SPHERE, objects)
        if (shape) {
          primitive = `primitives.sphere({radius: ${shape.radius}, segments: ${shape.subdivision}})`
        } else {
          shape = findNode(x3dTypes.EXTRUSION, objects)
          if (shape) {
            // convert the shape into 3D geometry
            const geometry = extrudeX3D(shape)
            // convert the 3D geometry into a call to polyhedron()
            const polygons = geom3.toPolygons(geometry)
            const polysAsStrings = polygons.map((polygon) => pointsToString(poly3.toPoints(polygon)))
            code += `  const polygons = [
  ${polysAsStrings.join(',\n  ')}
]
`
            primitive = 'geometries.geom3.fromPoints(polygons)'
          }
        }
      }
    }
  }

  if (!primitive) {
    // 2D geometries
    shape = findNode(x3dTypes.ARC2D, objects)
    if (shape) {
      primitive = `primitives.arc({radius: ${shape.radius}, startAngle: ${shape.startAngle}, endAngle: ${shape.endAngle}, segments: ${shape.subdivision}})`
    } else {
      shape = findNode(x3dTypes.ARCCLOSE2D, objects)
      if (shape) {
        if (shape.closureType === 'PIE') {
          primitive = `primitives.circle({radius: ${shape.radius}, startAngle: ${shape.startAngle}, endAngle: ${shape.endAngle}, segments: ${shape.subdivision}})`
        } else {
          primitive = `geometries.geom2.fromPoints(geometries.path2.toPoints(geometries.path2.close(primitives.arc({radius: ${shape.radius}, startAngle: ${shape.startAngle}, endAngle: ${shape.endAngle}, segments: ${shape.subdivision}}))))`
        }
      } else {
        shape = findNode(x3dTypes.CIRCLE2D, objects)
        if (shape) {
          // NOTE: X3D circles are really closed arcs (lines)
          primitive = `primitives.arc({radius: ${shape.radius}, segments: ${shape.subdivision}})`
        } else {
          shape = findNode(x3dTypes.DISK2D, objects)
          if (shape) {
            if (shape.innerRadius === shape.outerRadius) {
              primitive = `primitives.arc({radius: ${shape.outerRadius}, segments: ${shape.subdivision}})`
            } else {
              if (shape.innerRadius === 0) {
                primitive = `primitives.circle({radius: ${shape.outerRadius}, segments: ${shape.subdivision}})`
              } else {
                primitive = `booleans.subtract(primitives.circle({radius: ${shape.outerRadius}, segments: ${shape.subdivision}}), primitives.circle({radius: ${shape.innerRadius}, segments: ${shape.subdivision}}))`
              }
            }
          } else {
            shape = findNode(x3dTypes.POLYLINE2D, objects)
            if (shape) {
              const lineSegments = shape.lineSegments.join('], [')
              primitive = `primitives.line([[${lineSegments}]])`
            } else {
              shape = findNode(x3dTypes.RECTANGLE2D, objects)
              if (shape) {
                primitive = `primitives.rectangle({size: [${shape.size}]})`
              } else {
                shape = findNode(x3dTypes.TRIANGLESET2D, objects)
                if (shape) {
                  const numpoints = shape.vertices.length
                  const numfaces = Math.trunc(numpoints / 3)
                  code += `
  // 2D triangle set: ${numpoints} points, ${numfaces} faces
  const vertices = ${pointsToString(shape.vertices)}
  const triangles = []
  for (let i = 0; i < ${numfaces}; i = i + 3) {
    triangles.push(geometries.geom2.fromPoints([vertices[i], vertices[i + 1], vertices[i + 2]]))
  }
`
                  primitive = 'triangles'
                }
              }
            }
          }
        }
      }
    }
  }

  let results = translateMesh(options, objects)
  if (results) {
    primitive = results.primitive
    code += results.code
  }

  results = translateLine(options, objects)
  if (results) {
    primitive = results.primitive
    code += results.code
  }

  if (primitive) {
    if (color) {
      code += `  objects.push(colorize([${color}], ${primitive}))`
    } else {
      code += `  objects.push(${primitive})`
    }
  }

  code += `
  return objects
}
`
  return code
}

module.exports = translateShape
