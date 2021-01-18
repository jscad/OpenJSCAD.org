const { maths, geometries } = require('@jscad/modeling')

const createMat4Transform = require('./createTransform')
const calculateSCPTransforms = require('./calculateSCPTransforms')

const findType = (type, objects) => {
  return objects.find((object) => object.type === type)
}

const findColor = (objects, options) => {
  let appearance = findType('appearance', objects)
  let material
  if (appearance) {
    material = findType('material', appearance.objects)
    if (material) {
      return material.color ? material.color : null
    }
  }

  material = findType('material', objects)
  if (material) {
    return material.color ? material.color : null
  }
  return null
}

const pointToString = (point) => {
  return `[${point}]`
}

const pointsToString = (triangle) => {
  const strings = triangle.map((point) => pointToString(point))
  return `[
    ${strings.join(',\n    ')}
  ]`
}

// horrific order of transforms... see http://edutechwiki.unige.ch/en/X3D_grouping_and_transforms
const createTransform = (object, index, options) => {
  let code = `
// transform
const createObjects${object.id} = (options) => {
  let objects = []
`

  const objects = object.objects
  for (let i = 0; i < objects.length; i++) {
    const obj = objects[i]
    code += `  objects.push(...createObjects${obj.id}(options))\n`
  }

  const matrix = createMat4Transform(object.center, object.rotation, object.scale, object.scaleOrientation, object.translation)

  // apply the transforms if any
    code += `
  const matrix = [${matrix}]
  return applyTransform(matrix, objects)
}
`

  code += createDefinitions(objects, options)

  return code
}

const createGroup = (object, index, options) => {
  let code = `
// group
const createObjects${object.id} = (options) => {
  let objects = []
`

  const objects = object.objects
  for (let i = 0; i < objects.length; i++) {
    const obj = objects[i]
    code += `  objects.push(...createObjects${obj.id}(options))\n`
  }

  code += `
  return objects
}
`

  code += createDefinitions(objects, options)

  return code
}

const createMesh = (type, points, faces, orientation) => {
  const code = `
  // 3D ${type} set: ${points.length} points, ${faces.length} faces
  const points = ${pointsToString(points)}
  const faces = ${pointsToString(faces)}
  const orientation = '${orientation}'
`
  return code
}

const createShape = (object, index, options) => {
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
  let shape = findType('box', objects)
  if (shape) {
    primitive = `primitives.cuboid({size: [${shape.size}]})`
  } else {
    shape = findType('cone', objects)
    if (shape) {
      code += `  const shape = transforms.rotateX(-Math.PI/2, primitives.cylinderElliptic({startRadius: [${shape.bottomRadius},${shape.bottomRadius}], height: ${shape.height}, segments: ${shape.subdivision}, endRadius: [${shape.topRadius}, ${shape.topRadius}]}))
`
      primitive = 'shape'
    } else {
      shape = findType('cylinder', objects)
      if (shape) {
        code += `  const shape = transforms.rotateX(-Math.PI/2, primitives.cylinder({radius: ${shape.radius}, height: ${shape.height}, segments: ${shape.subdivision}}))
`
        primitive = 'shape'
      } else {
        shape = findType('sphere', objects)
        if (shape) {
          primitive = `primitives.sphere({radius: ${shape.radius}, segments: ${shape.subdivision}})`
        } else {
          shape = findType('extrusion', objects)
          if (shape) {
            const isCapped = shape.beginCap || shape.endCap
            const transforms = calculateSCPTransforms(shape.spine, shape.orientation, shape.scale)
            code += `
  const ccw = ${shape.ccw}
  const crossSection = ${pointsToString(shape.crossSection)}
  const sides = []
  for (let i = 1; i < crossSection.length; i++) {
    sides.push([crossSection[i - 1], crossSection[i]])
  }
  let baseSlice = extrusions.slice.fromSides(sides)
  if (!ccw) extrusions.slice.reverse(baseSlice, baseSlice)
  baseSlice = extrusions.slice.transform(maths.mat4.fromXRotation(Math.PI / 2), baseSlice)
console.log(baseSlice)

  const scptransforms = ${pointsToString(transforms)}
  const createSection = (progress, index, base) => {
console.log(index)
    const transform = scptransforms[index]
    return extrusions.slice.transform(transform, base)
  }
  const extrudeOptions = {numberOfSlices: scptransforms.length, isCapped: ${isCapped}, callback: createSection}
`
            primitive = `extrusions.extrudeFromSlices(extrudeOptions, baseSlice)`
          }
        }
      }
    }
  }

  if (!primitive) {
    // 2D geometries
    shape = findType('arc2d', objects)
    if (shape) {
      primitive = `primitives.arc({radius: ${shape.radius}, startAngle: ${shape.startAngle}, endAngle: ${shape.endAngle}, segments: ${shape.subdivision}})`
    } else {
      shape = findType('arcClose2d', objects)
      if (shape) {
        if (shape.closureType === 'PIE') {
          primitive = `primitives.circle({radius: ${shape.radius}, startAngle: ${shape.startAngle}, endAngle: ${shape.endAngle}, segments: ${shape.subdivision}})`
        } else {
          primitive = `geometries.geom2.fromPoints(geometries.path2.toPoints(geometries.path2.close(primitives.arc({radius: ${shape.radius}, startAngle: ${shape.startAngle}, endAngle: ${shape.endAngle}, segments: ${shape.subdivision}}))))`
        }
      } else {
        shape = findType('circle2d', objects)
        if (shape) {
          // NOTE: X3D circles are really closed arcs (lines)
          primitive = `primitives.arc({radius: ${shape.radius}, segments: ${shape.subdivision}})`
        } else {
          shape = findType('disk2d', objects)
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
            shape = findType('polyline2d', objects)
            if (shape) {
              const lineSegments = shape.lineSegments.join('], [')
              primitive = `primitives.line([[${lineSegments}]])`
            } else {
              shape = findType('rectangle2d', objects)
              if (shape) {
                primitive = `primitives.rectangle({size: [${shape.size}]})`
              } else {
                shape = findType('triangleset2d', objects)
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
                   primitive = `triangles`
                }
              }
            }
          }
        }
      }
    }
  }

  if (!primitive) {
    // MESH
    shape = findType('triangleset', objects)
    if (shape) {
      const coordinate = findType('coordinate', shape.objects)
      if (coordinate) {
        const points = coordinate.points
        const numpoints = points.length
        const numfaces = Math.trunc(numpoints / 3)
        const faces = []
        for (let ti = 0; ti < numfaces; ti++) {
          const pi = ti * 3
          faces.push([pi, pi + 1, pi + 2])
        }
        const orientation = shape.ccw ? 'outward' : 'inward'
        code += createMesh('triangle', points, faces, orientation)
        primitive = `primitives.polyhedron({points, faces, orientation})`
      }
    } else {
      shape = findType('trianglefanset', objects)
      if (shape) {
        const fanCount = shape.fanCount
        const coordinate = findType('coordinate', shape.objects)
        if (coordinate) {
          const points = coordinate.points
          const numpoints = points.length
          const numfans = fanCount.length
          const faces = []
          let fo = 0
          for (let fi = 0; fi < numfans; fi++) {
            const numvertices = Math.trunc(fanCount[fi])
            for (let vi = 1; vi < (numvertices - 1); vi++) {
              faces.push([fo, fo + vi, fo + vi + 1])
            }
            fo += numvertices
          }
          const orientation = shape.ccw ? 'outward' : 'inward'
          code += createMesh(`triangle fan (${numfans})`, points, faces, orientation)
          primitive = `primitives.polyhedron({points, faces, orientation})`
        }
      } else {
        shape = findType('trianglestripset', objects)
        if (shape) {
          const stripCount = shape.stripCount
          const coordinate = findType('coordinate', shape.objects)
          if (coordinate) {
            const points = coordinate.points
            const numpoints = points.length
            const numstrips = stripCount.length
            const faces = []
            let so = 0
            for (let si = 0; si < numstrips; si++) {
              const numvertices = Math.trunc(stripCount[si])
              for (let vi = 0; vi < (numvertices - 2); vi++) {
                const face = [so + vi, so + vi + 1, so + vi + 2]
                if ((vi % 2) === 1) face.reverse()
                faces.push(face)
              }
              so += numvertices
            }
            const orientation = shape.ccw ? 'outward' : 'inward'
            code += createMesh(`triangle strip (${numstrips})`, points, faces, orientation)
            primitive = `primitives.polyhedron({points, faces, orientation})`
          }
        } else {
          shape = findType('quadset', objects)
          if (shape) {
            const coordinate = findType('coordinate', shape.objects)
            if (coordinate) {
              const points = coordinate.points
              const numpoints = points.length
              const numquads = Math.trunc(numpoints / 4)
              const faces = []
              for (let qi = 0; qi < numquads; qi++) {
                const pi = qi * 4
                faces.push([pi, pi + 1, pi + 2, pi + 3])
              }
              const orientation = shape.ccw ? 'outward' : 'inward'
              code += createMesh(`quad (${numquads})`, points, faces, orientation)
              primitive = `primitives.polyhedron({points, faces, orientation})`
            }
          } else {
            shape = findType('indexedtriangleset', objects)
            if (shape) {
              const coordinate = findType('coordinate', shape.objects)
              const index = shape.index
              if (coordinate && index) {
                const points = coordinate.points
                const numpoints = points.length
                const numfaces = Math.trunc(index.length / 3)
                const faces = []
                for (let fi = 0; fi < numfaces; fi++) {
                  const pi = fi * 3
                  faces.push([index[pi], index[pi + 1], index[pi + 2]])
                }
                const orientation = shape.ccw ? 'outward' : 'inward'
                code += createMesh('indexed triangle', points, faces, orientation)
                primitive = `primitives.polyhedron({points, faces, orientation})`
              }
            } else {
              shape = findType('indexedtrianglefanset', objects)
              if (shape) {
                const coordinate = findType('coordinate', shape.objects)
                const fans = shape.fans
                if (coordinate && fans) {
                  const points = coordinate.points
                  const numpoints = points.length
                  const numfans = fans.length
                  const faces = []
                  for (let fi = 0; fi < numfans; fi++) {
                    const fan = fans[fi]
                    const numvertices = fan.length
                    for (let vi = 1; vi < (numvertices - 1); vi++) {
                      faces.push([fan[0], fan[vi], fan[vi + 1]])
                    }
                  }
                  const orientation = shape.ccw ? 'outward' : 'inward'
                  code += createMesh(`indexed triangle fan (${numfans})`, points, faces, orientation)
                  primitive = `primitives.polyhedron({points, faces, orientation})`
                }
              } else {
                shape = findType('indexedtrianglestripset', objects)
                if (shape) {
                  const coordinate = findType('coordinate', shape.objects)
                  const strips = shape.strips
                  if (coordinate && strips) {
                    const points = coordinate.points
                    const numpoints = points.length
                    const numstrips = strips.length
                    const faces = []
                    for (let si = 0; si < numstrips; si++) {
                      const strip = strips[si]
                      const numvertices = strip.length
                      for (let vi = 0; vi < (numvertices - 2); vi++) {
                        const face = [strip[vi], strip[vi + 1], strip[vi + 2]]
                        if ((vi % 2) === 1) face.reverse()
                        faces.push(face)
                      }
                    }
                    const orientation = shape.ccw ? 'outward' : 'inward'
                    code += createMesh(`indexed triangle strip (${numstrips})`, points, faces, orientation)
                    primitive = `primitives.polyhedron({points, faces, orientation})`
                  }
                } else {
                  shape = findType('indexedquadset', objects)
                  if (shape) {
                    const coordinate = findType('coordinate', shape.objects)
                    const index = shape.index
                    if (coordinate && index) {
                      const points = coordinate.points
                      const numpoints = points.length
                      const numquads = Math.trunc(index.length / 4)
                      const faces = []
                      for (let qi = 0; qi < numquads; qi++) {
                        const ii = qi * 4
                        faces.push([index[ii], index[ii + 1], index[ii + 2], index[ii + 3]])
                      }
                      const orientation = shape.ccw ? 'outward' : 'inward'
                      code += createMesh(`indexed quad (${numquads})`, points, faces, orientation)
                      primitive = `primitives.polyhedron({points, faces, orientation})`
                    }
                  } else {
                    shape = findType('indexedfaceset', objects)
                    if (shape) {
                      const coordinate = findType('coordinate', shape.objects)
                      const faces = shape.faces
                      if (coordinate && faces) {
                        const points = coordinate.points
                        const numpoints = points.length
                        const numfaces = faces.length
                        const orientation = shape.ccw ? 'outward' : 'inward'
                        code += createMesh(`indexed faces (${numfaces})`, points, faces, orientation)
                        primitive = `primitives.polyhedron({points, faces, orientation})`
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  if (primitive) {
    if (color) {
      code += `  objects.push(colors.colorize([${color}], ${primitive}))`
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

const createdList = []

const createDefintion = (object, index, options) => {
  if (createdList.includes(object.id)) return ''

  createdList.push(object.id)

  let code = ''
  switch (object.type) {
    case 'transform':
      code += createTransform(object, index, options )
      break
    case 'shape':
      code += createShape(object, index, options )
      break
    case 'group':
      code += createGroup(object, index, options )
      break
    default:
      console.log('WARNING: unknown definition: ' + object.type)
      break
  }
  return code
}

// convert the given X3D objects into a series of JSCAD function definitions
const createDefinitions = (objects, options) => {
  // console.log('createDefinitions',objects,options)
  return objects.reduce((code, object, index) => code += createDefintion(object, index, options), '')
}

module.exports = createDefinitions
