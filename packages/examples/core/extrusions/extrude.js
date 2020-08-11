// title      : Balloons
// author     : Z3 Dev
// license    : MIT License
// description: multiple balloons, testing new parameters
// file       : balloons.jscad

/*
// title       : 3D Primitives Demonstration
// author      : Rene K. Mueller, Moissette Mark, Simon Clark
// license     : MIT License
// description : Demonstrating the basics of a variety of 3D primitives
// file        : primitives3D.js
// tags        : cube, cuboid, sphere, ellipsoid, cylinder, torus, shape, 3d
*/

const jscad = require('@jscad/modeling')
const { line } = jscad.primitives
const { extrudeRectangular } = jscad.extrusions

function main () {
  const aLine = line([[0, 0], [0, 5], [2, 8], [5, 9]])
  return extrudeRectangular({ size: 1, height: 1 }, aLine)
}

module.exports = { main }
