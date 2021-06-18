const { pointsToString } = require('./translateHelpers')

const { convertLine } = require('./instantiateLine')

const translateLine = (options, objects) => {
  const components = convertLine(options, objects)
  if (components) {
    const { pointsSet, colors } = components
    let code = '  let lines = []\n'
    pointsSet.forEach((points, i) => {
      if (colors) {
        const lineColor = colors[i]
        code += `  const line${i} = colorize([${lineColor}], primitives.line(${pointsToString(points)}))
  lines.push(line${i})
`
      } else {
        code += `  const line${i} = primitives.line(${pointsToString(points)})
  lines.push(line${i})
`
      }
    })
    const primitive = '...lines'
    return { primitive, code }
  }
  return null
}

module.exports = translateLine
