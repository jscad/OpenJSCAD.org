const jscad = require('@jscad/modeling')

const { createColors, findNode } = require('./translateHelpers')
const { x3dTypes } = require('./objects')

const convertLine = (options, objects) => {
  let shape = findNode(x3dTypes.INDEXEDLINESET, objects)
  if (shape) {
    const coordinate = findNode(x3dTypes.COORDINATE, shape.objects)
    const indexes = shape.indexes
    const color = findNode(x3dTypes.COLOR, shape.objects)
    if (coordinate && indexes) {
      const pointsSet = indexes.map((index) => {
        let points = index.map((i) => coordinate.points[i])
        const is3D = points.findIndex((p) => p[2] !== 0)
        if (is3D >= 0) {
          console.warn('WARNING: unsupported 3D indexed line set was ignored')
          points = []
        }
        return points
      })
      if (shape.colorPerVertex === true) {
        shape.colorIndex = indexes
      } else {
        shape.colorIndex = indexes.map((index, i) => i)
      }
      const colors = createColors(shape, color)

      return { pointsSet, colors }
    }
  }

  shape = findNode(x3dTypes.LINESET, objects)
  if (shape) {
    const coordinate = findNode(x3dTypes.COORDINATE, shape.objects)
    const color = findNode(x3dTypes.COLOR, shape.objects)
    const counts = shape.vertexCount
    if (coordinate && counts) {
      let vi = 0
      const pointsSet = counts.map((count) => {
        let points = []
        for (let i = 0; i < count; i++) {
          points.push(coordinate.points[vi])
          vi++
        }
        const is3D = points.findIndex((p) => p[2] !== 0)
        if (is3D >= 0) {
          console.warn('WARNING: unsupported 3D line set was ignored')
          points = []
        }
        return points
      })
      if (shape.colorPerVertex === true) {
        let ci = 0
        shape.colorIndex = counts.map((count) => {
          const index = []
          for (let i = 0; i < count; i++) {
            index.push(ci)
            ci++
          }
          return index
        })
      } else {
        shape.colorIndex = pointsSet.map((ps, i) => i)
      }
      const colors = createColors(shape, color)

      return { pointsSet, colors }
    }
  }
  return null
}

const instantiateLine = (options, objects) => {
  let geometry

  const components = convertLine(options, objects)
  if (components) {
    const { pointsSet, colors } = components
    geometry = pointsSet.map((points, i) => {
      let line
      if (colors) {
        line = jscad.colors.colorize(colors[i], jscad.primitives.line(points))
      } else {
        line = jscad.primitives.line(points)
      }
      return line
    })
  }

  return geometry
}

module.exports = {
  convertLine,
  instantiateLine
}
