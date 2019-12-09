// title      : Expand
// author     : OpenSCAD.org, adapted by Rene K. Mueller
// license    : MIT License
// description: testing expand() function
// file       : expand.jscad

const { cube, cylinder  } = require('@jscad/modeling').primitives
const { translate, scale } = require('@jscad/modeling').transforms
const { union, difference } = require('@jscad/modeling').booleans
const { expand } = require('@jscad/modeling').expansions

const main = () => {
  return scale(10, union(
    expand({ delta: 0.2, corners: 'round', segments: 8 }, difference(cube(2), translate([0.3, -0.3, 0.3], cube(2)))),

    translate([-4, 0, 0], difference(cube(2), translate([0.3, -0.3, 0.3], cube(2)))),

    translate([0, -3, 0], expand({ delta: 0.3, segments: 8 }, cube(2))),

    translate([-4, -3, 0], cube(2)),

    translate([0, 4, 0],
      expand({ delta: 0.3, segments: 4 }, cylinder({ r: 1, h: 2, fn: 16 }))
    ),

    translate([-4, 4, 0], cylinder({ r: 1, h: 2 }))
  ))
}

module.exports = { main }
