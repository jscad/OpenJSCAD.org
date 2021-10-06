const { x3dTypes } = require('./objects')

const findNode = (x3dtype, objects) => objects.find((object) => object.definition === x3dtype)

const findColor = (objects, options) => {
  const appearance = findNode(x3dTypes.APPEARANCE, objects)
  let material
  if (appearance) {
    material = findNode(x3dTypes.MATERIAL, appearance.objects)
    if (material) {
      return material.color ? material.color : null
    }
  }

  material = findNode(x3dTypes.MATERIAL, objects)
  if (material) {
    return material.color ? material.color : null
  }
  return null
}

const pointToString = (point) => `[${point}]`

const pointsToString = (triangle) => {
  const strings = triangle.map((point) => pointToString(point))
  return `[
    ${strings.join(',\n    ')}
  ]`
}

// colorIndex - array of arrays, each subarray containing indexes into vertexColors
const createColorsFromVertexColors = (colorIndex, vertexColors) => {
  if (!(Array.isArray(colorIndex) && Array.isArray(vertexColors))) return null
  if (colorIndex.length < 0 || !Array.isArray(colorIndex[0])) {
    console.log('ERROR: WRONG FORMAT FOR VERTEXCOLORS')
    return null
  }

  // create a set of 'interpreted' colors for the faces
  const colors = []
  for (let i = 0; i < colorIndex.length; i++) {
    const indexes = colorIndex[i]
    let r = 0
    let g = 0
    let b = 0
    const a = 1
    for (let j = 0; j < indexes.length; j++) {
      const vertexColor = vertexColors[indexes[j]]
      if (vertexColor) {
        r += vertexColor[0]
        g += vertexColor[1]
        b += vertexColor[2]
      }
    }
    const color = [r / indexes.length, g / indexes.length, b / indexes.length, a]
    colors.push(color)
  }
  return colors
}

const createColorsFromFaceColors = (colorIndex, faceColors) => {
  if (!(Array.isArray(colorIndex) && Array.isArray(faceColors))) return null

  const colors = colorIndex.map((index) => faceColors[index] ? faceColors[index] : null)
  return colors
}

// create a list of colors from the given shape and color objects
const createColors = (shape, color) => {
  if (!color) return null
  if (!Array.isArray(shape.colorIndex)) return null

  let colors = null
  if (shape.colorPerVertex === true) {
    colors = createColorsFromVertexColors(shape.colorIndex, color.colors)
  } else {
    colors = createColorsFromFaceColors(shape.colorIndex, color.colors)
  }
  return colors
}

module.exports = {
  findNode,
  findColor,

  createColors,

  pointToString,
  pointsToString
}
