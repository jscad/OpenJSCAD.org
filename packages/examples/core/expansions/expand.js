/* title      : Expand
// author     : OpenSCAD.org, adapted by Rene K. Mueller
// license    : MIT License
// description: expand() function
*/

const { geom2, geom3, line2, path2 } = require('@jscad/modeling').geometry
const { cuboid, cylinder } = require('@jscad/modeling').primitives
const { translate, scale } = require('@jscad/modeling').transforms
const { union, difference } = require('@jscad/modeling').booleans
const { expand } = require('@jscad/modeling').expansions
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
  const expandedPath2 = expand({ delta: 2, corners: 'round', segments: 8 }, path2Example)

  // but also 2d geometry
  const geom2Example = geom2.fromPoints([[-8, -8], [8, -8], [8, 8], [-8, 8]])
  const expandedGeom2 = color('red',
    expand({ delta: 2, corners: 'round', segments: 8 }, geom2Example)
  )
  const contractedGeom2 = color('red',
    expand({ delta: -2, corners: 'round', segments: 8 }, geom2Example)
  )

  // aaand 3d geometry
  const geom3Example = color('black',
    cuboid()
  )
  const expandedGeom3 = color('red',
    expand({ delta: 2, corners: 'round', segments: 8 }, geom2Example)
  )
  const contractedGeom3 = color('red',
    expand({ delta: -2, corners: 'round', segments: 8 }, geom2Example)
  )

  return [
    path2Example,
    expandedPath2,
    //
    geom2Example,
    expandedGeom2,
    contractedGeom2,
    //
    geom3Example,
    expandedGeom3,
    contractedGeom3

  ]
  /*
  // old example
  return scale(10, union(
    expand({ delta: 0.2, corners: 'round', segments: 8 }, difference(cube(2), translate([0.3, -0.3, 0.3], cube(2)))),

    translate([-4, 0, 0], difference(cube(2), translate([0.3, -0.3, 0.3], cube(2)))),

    translate([0, -3, 0], expand({ delta: 0.3, segments: 8 }, cube(2))),

    translate([-4, -3, 0], cube(2)),

    translate([0, 4, 0],
      expand({ delta: 0.3, segments: 4 }, cylinder({ r: 1, h: 2, fn: 16 }))
    ),

    translate([-4, 4, 0], cylinder({ r: 1, h: 2 }))
  )) */
}

module.exports = { main }
