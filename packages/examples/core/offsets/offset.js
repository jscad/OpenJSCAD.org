/**
 * Offsetting 2D and 3D Shapes
 * @category Manipulating Shapes
 * @skillLevel 5
 * @description Exploring the offset() function on 2D and 3D geometries
 * @tags offset, expand, expansion, operations
 * @authors Rene K. Mueller, Simon Clark, platypii
 * @licence MIT License
 */

const { cuboid, arc, rectangle } = require('@jscad/modeling').primitives
const { offset } = require('@jscad/modeling').offsets
const { colorize, colorNameToRgb } = require('@jscad/modeling').colors
const { translate } = require('@jscad/modeling').transforms

const main = () => {
  // 2d paths can be expanded
  const path2Example = colorize(colorNameToRgb('black'), arc({ radius: 12, endAngle: Math.PI / 2 }))
  const expandedPath2Round = colorize(
    [0.5, 0.5, 1],
    offset({ delta: 1.7, corners: 'round', segments: 16 }, path2Example)
  )
  const expandedPath2Edge = colorize(
    [0.3, 1, 0.3],
    offset({ delta: 1.5, corners: 'edge', segments: 16 }, path2Example)
  )

  // 2d geometry can also be expanded
  const geom2Example = colorize(
    colorNameToRgb('black'),
    rectangle({ size: [16, 16] })
  )

  const expandedGeom2Chamfer = colorize(
    [1, 0.5, 0.5],
    offset({ delta: 1.8, corners: 'chamfer', segments: 16 }, geom2Example)
  )
  const expandedGeom2Round = colorize(
    [0.5, 0.5, 1],
    offset({ delta: 2, corners: 'round', segments: 16 }, geom2Example)
  )
  const expandedGeom2Edge = colorize(
    [0.3, 1, 0.3],
    offset({ delta: 2.2, corners: 'edge', segments: 16 }, geom2Example)
  )

  const contractedGeom2 = colorize(
    [1, 0.5, 0.5],
    offset({ delta: -2, corners: 'round', segments: 8 }, geom2Example)
  )

  // and 3d geometry
  const geom3Example = colorize(
    colorNameToRgb('green'),
    cuboid({ size: [2, 7, 4] })
  )
  const expandedGeom3 = colorize(
    [1, 0, 0, 0.8],
    offset({ delta: 1, corners: 'round', segments: 32 }, geom3Example)
  )

  return [
    path2Example,
    expandedPath2Round,
    expandedPath2Edge,

    translate([30, 10, 0], [
      geom2Example,
      expandedGeom2Edge,
      expandedGeom2Chamfer,
      expandedGeom2Round,
      contractedGeom2
    ]),

    translate([50, 10, 0], [
      geom3Example,
      expandedGeom3
    ])
  ]
}

module.exports = { main }
