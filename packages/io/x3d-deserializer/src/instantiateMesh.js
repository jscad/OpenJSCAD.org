const { primitives } = require('@jscad/modeling')

const { x3dTypes } = require('./objects')
const { findNode, createColors } = require('./translateHelpers')

const convertMesh = (options, objects) => {
  let shape = findNode(x3dTypes.TRIANGLESET, objects)
  if (shape) {
    const coordinate = findNode(x3dTypes.COORDINATE, shape.objects)
    const color = findNode(x3dTypes.COLOR, shape.objects)
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
      shape.colorIndex = faces
      const colors = createColors(shape, color)
      const type = 'triangles'

      return { type, points, faces, colors, orientation }
    }
  }

  shape = findNode(x3dTypes.TRIANGLEFANSET, objects)
  if (shape) {
    const fanCount = shape.fanCount
    const coordinate = findNode(x3dTypes.COORDINATE, shape.objects)
    const color = findNode(x3dTypes.COLOR, shape.objects)
    if (coordinate) {
      const points = coordinate.points
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
      shape.colorIndex = faces
      const colors = createColors(shape, color)
      const type = `triangle fans (${numfans})`

      return { type, points, faces, colors, orientation }
    }
  }

  shape = findNode(x3dTypes.TRIANGLESTRIPSET, objects)
  if (shape) {
    const stripCount = shape.stripCount
    const coordinate = findNode(x3dTypes.COORDINATE, shape.objects)
    const color = findNode(x3dTypes.COLOR, shape.objects)
    if (coordinate) {
      const points = coordinate.points
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
      shape.colorIndex = faces
      const colors = createColors(shape, color)
      const orientation = shape.ccw ? 'outward' : 'inward'
      const type = `triangle strip (${numstrips})`

      return { type, points, faces, colors, orientation }
    }
  }

  shape = findNode(x3dTypes.QUADSET, objects)
  if (shape) {
    const coordinate = findNode(x3dTypes.COORDINATE, shape.objects)
    const color = findNode(x3dTypes.COLOR, shape.objects)
    if (coordinate) {
      const points = coordinate.points
      const numpoints = points.length
      const numquads = Math.trunc(numpoints / 4)
      const faces = []
      for (let qi = 0; qi < numquads; qi++) {
        const pi = qi * 4
        faces.push([pi, pi + 1, pi + 2, pi + 3])
      }
      shape.colorIndex = faces
      const colors = createColors(shape, color)
      const orientation = shape.ccw ? 'outward' : 'inward'
      const type = `quad (${numquads})`

      return { type, points, faces, colors, orientation }
    }
  }

  shape = findNode(x3dTypes.INDEXEDTRIANGLESET, objects)
  if (shape) {
    const coordinate = findNode(x3dTypes.COORDINATE, shape.objects)
    const color = findNode(x3dTypes.COLOR, shape.objects)
    const index = shape.index
    if (coordinate && index && index.length > 2) {
      const points = coordinate.points
      const numfaces = Math.trunc(index.length / 3)
      const faces = []
      for (let fi = 0; fi < numfaces; fi++) {
        const pi = fi * 3
        faces.push([index[pi], index[pi + 1], index[pi + 2]])
      }
      shape.colorIndex = faces
      const colors = createColors(shape, color)
      const orientation = shape.ccw ? 'outward' : 'inward'
      const type = 'indexed triangle'

      return { type, points, faces, colors, orientation }
    }
  }

  shape = findNode(x3dTypes.INDEXEDTRIANGLEFANSET, objects)
  if (shape) {
    const coordinate = findNode(x3dTypes.COORDINATE, shape.objects)
    const color = findNode(x3dTypes.COLOR, shape.objects)
    const fans = shape.fans
    if (coordinate && fans && fans.length > 0) {
      const points = coordinate.points
      const numfans = fans.length
      const faces = []
      for (let fi = 0; fi < numfans; fi++) {
        const fan = fans[fi]
        const numvertices = fan.length
        for (let vi = 1; vi < (numvertices - 1); vi++) {
          faces.push([fan[0], fan[vi], fan[vi + 1]])
        }
      }
      shape.colorIndex = faces
      const colors = createColors(shape, color)
      const orientation = shape.ccw ? 'outward' : 'inward'
      const type = `indexed triangle fan (${numfans})`

      return { type, points, faces, colors, orientation }
    }
  }

  shape = findNode(x3dTypes.INDEXEDTRIANGLESTRIPSET, objects)
  if (shape) {
    const coordinate = findNode(x3dTypes.COORDINATE, shape.objects)
    const color = findNode(x3dTypes.COLOR, shape.objects)
    const strips = shape.strips
    if (coordinate && strips && strips.length > 0) {
      const points = coordinate.points
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
      shape.colorIndex = faces
      const colors = createColors(shape, color)
      const orientation = shape.ccw ? 'outward' : 'inward'
      const type = `indexed triangle strip (${numstrips})`

      return { type, points, faces, colors, orientation }
    }
  }

  shape = findNode(x3dTypes.INDEXEDQUADSET, objects)
  if (shape) {
    const coordinate = findNode(x3dTypes.COORDINATE, shape.objects)
    const color = findNode(x3dTypes.COLOR, shape.objects)
    const index = shape.index
    if (coordinate && index && index.length > 3) {
      const points = coordinate.points
      const numquads = Math.trunc(index.length / 4)
      const faces = []
      for (let qi = 0; qi < numquads; qi++) {
        const ii = qi * 4
        faces.push([index[ii], index[ii + 1], index[ii + 2], index[ii + 3]])
      }
      shape.colorIndex = faces
      const colors = createColors(shape, color)
      const orientation = shape.ccw ? 'outward' : 'inward'
      const type = `indexed quad (${numquads})`

      return { type, points, faces, colors, orientation }
    }
  }

  shape = findNode(x3dTypes.INDEXEDFACESET, objects)
  if (shape) {
    const coordinate = findNode(x3dTypes.COORDINATE, shape.objects)
    const faces = shape.faces
    const color = findNode(x3dTypes.COLOR, shape.objects)
    if (coordinate && faces && faces.length > 0) {
      const points = coordinate.points
      const numfaces = faces.length
      const colors = createColors(shape, color)
      const orientation = shape.ccw ? 'outward' : 'inward'
      const type = `indexed faces (${numfaces})`

      return { type, points, faces, colors, orientation }
    }
  }

  shape = findNode(x3dTypes.ELEVATIONGRID, objects)
  if (shape) {
    const height = shape.height
    const color = findNode(x3dTypes.COLOR, shape.objects)
    if (height && height.length > 0) {
      const xDimension = shape.xDimension
      const xSpacing = shape.xSpacing
      const zDimension = shape.zDimension
      const zSpacing = shape.zSpacing

      // convert the height map into a set of points
      const points = []
      let vi = 0
      for (let z0 = 0; z0 < zDimension; ++z0) {
        for (let x0 = 0; x0 < xDimension; ++x0) {
          const x = x0 * xSpacing
          const z = z0 * zSpacing
          const y = height[vi]

          vi++

          points.push([x, y, z])
        }
      }
      // convert the height map quadrilaterals into faces (2 triangles)
      const faces = []
      for (let z0 = 0; z0 < zDimension - 1; ++z0) {
        for (let x0 = 0; x0 < xDimension - 1; ++x0) {
          const iTL = x0 + (z0 * xDimension)
          const iTR = (x0 + 1) + (z0 * xDimension)
          const iBL = x0 + ((z0 + 1) * xDimension)
          const iBR = (x0 + 1) + ((z0 + 1) * xDimension)
          // determine apex of faces
          const distances = [Math.abs(height[iTL]), Math.abs(height[iTR]), Math.abs(height[iBL]), Math.abs(height[iBR])]
          let apexi = 0
          if (distances[1] >= distances[0] && distances[1] >= distances[2] && distances[1] >= distances[3]) apexi = 1
          if (distances[2] >= distances[0] && distances[2] >= distances[1] && distances[2] >= distances[3]) apexi = 2
          if (distances[3] >= distances[0] && distances[3] >= distances[1] && distances[3] >= distances[2]) apexi = 3
          // create faces
          if (apexi === 0) faces.push([iTL, iBR, iTR], [iTL, iBL, iBR])
          if (apexi === 1) faces.push([iTR, iBL, iBR], [iTR, iTL, iBL])
          if (apexi === 2) faces.push([iBL, iTR, iTL], [iBL, iBR, iTR])
          if (apexi === 3) faces.push([iBR, iTL, iBL], [iBR, iTR, iTL])
        }
      }
      // TODO determine orientation from face 0
      const orientation = shape.ccw ? 'outward' : 'inward'
      // convert colors if necessary
      if (shape.colorPerVertex === true) {
        shape.colorIndex = faces // use the same indexs for colors
      } else {
        // create an color index per face
      }
      const colors = createColors(shape, color)
      const type = `elevation grid (${xDimension} X ${zDimension})`

      return { type, points, faces, colors, orientation }
    }
  }

  return null
}

const instantiateMesh = (options, objects) => {
  let geometry

  const components = convertMesh(options, objects)
  if (components) {
    geometry = primitives.polyhedron(components)
  }
  return geometry
}

module.exports = {
  convertMesh,
  instantiateMesh
}
