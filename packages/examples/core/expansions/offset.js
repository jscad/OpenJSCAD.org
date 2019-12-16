/* title      : Offset
// author     : Moissette Mark
// license    : MIT License
// description: offset() function
*/

const { geom2, geom3, line2, path2 } = require('@jscad/modeling').geometry
const { cuboid } = require('@jscad/modeling').primitives
const { offset } = require('@jscad/modeling').expansions
const { color } = require('@jscad/modeling').color

const main = () => {
  // you can expand 2d paths
  const points = [
    [10, 0],
    [9.510565162951535, 3.090169943749474],
    [8.090169943749475, 5.877852522924732],
    [5.877852522924732, 8.090169943749475],
    [3.0901699437494745, 9.510565162951535],
    [6.123233995736766e-16, 10]
  ]
  const path2Example = color('black',
    path2.fromPoints({ }, points) // it also works with ccw points ie points.reverse()
  )
  const expandedPath2Rounded = color('red',
    offset({ delta: 2, corners: 'round' }, path2Example)
  )
  const expandedPath2Chamfered = color('red',
    offset({ delta: 2, corners: 'chamfer' }, path2Example)
  )

  const expandedPath2Edged = color('red',
    offset({ delta: 2, corners: 'edge' }, path2Example)
  )

  // but also 2d geometry
  const geom2Example = geom2.fromPoints([[-8, -8], [8, -8], [8, 8], [-8, 8]])
  const expandedGeom2 = color('red',
    offset({ delta: 2, corners: 'round', segments: 8 }, geom2Example)
  )
  const contractedGeom2 = color('red',
    offset({ delta: -2, corners: 'round', segments: 8 }, geom2Example)
  )

  return [
    path2Example,
    expandedPath2Rounded,
    expandedPath2Chamfered,
    expandedPath2Edged,
    //
    geom2Example,
    expandedGeom2,
    contractedGeom2
  ]
}

module.exports = { main }
