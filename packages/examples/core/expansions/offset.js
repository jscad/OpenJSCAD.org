/*
// title      : Offset Example
// author     : Moissette Mark, Simon Clark
// license    : MIT License
// description: offset() function. Moves all points in a 2d path or 2D geometry perpendicular to the line's tangent.
// tags: offset, expansion
// file        : offset.js
*/

const { arc, rectangle } = require('@jscad/modeling').primitives
const { offset } = require('@jscad/modeling').expansions
const { colorize, colorNameToRgb } = require('@jscad/modeling').colors

const main = () => {
  // 2d paths can be offset
  const path2Example = colorize(colorNameToRgb('black'), arc({ radius: 15, startAngle: Math.PI / 4, endAngle: 3 * Math.PI / 4 }))
  const expandedPath2Rounded = colorize(colorNameToRgb('red'),
    offset({ delta: 2, corners: 'round' }, path2Example)
  )

  // 2d geometry can also be offset
  const geom2Example = colorize(
    colorNameToRgb('black'),
    rectangle({ size: [16, 16] })
  )

  const contractedGeom2 = colorize(
    colorNameToRgb('blue'),
    offset({ delta: -2, corners: 'round', segments: 8 }, geom2Example)
  )
  const expandedGeom2Chamfered = colorize(
    colorNameToRgb('red'),
    offset({ delta: 1.8, corners: 'chamfer', segments: 8 }, geom2Example)
  )
  const expandedGeom2Rounded = colorize(
    colorNameToRgb('red'),
    offset({ delta: 2, corners: 'round', segments: 32 }, geom2Example)
  )
  const expandedGeom2Edged = colorize(
    colorNameToRgb('red'),
    offset({ delta: 2.2, corners: 'edge', segments: 8 }, geom2Example)
  )

  // 3d geometry can not be offset yet.

  return [
    path2Example,
    expandedPath2Rounded,

    geom2Example,
    expandedGeom2Chamfered,
    expandedGeom2Rounded,
    expandedGeom2Edged,
    contractedGeom2
  ]
}

module.exports = { main }
