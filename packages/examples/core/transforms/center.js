/* title      : Center
// authors     : Rene K. Mueller, Mark Moissette
// license    : MIT License
// description: testing all the different options of the OpenSCAD-like OpenJSCAD functions (aside of the strict object oriented approaches)
// tags       : 2d,cnc
*/
/*
// title       : Center function demonstration
// author      : Rene K. Mueller, Moissette Mark, Simon Clark
// license     : MIT License
// description : Demonstrating the basics of a variety of 3D primitives
// file        : primitives3D.js
// tags        : cube, cuboid, sphere, ellipsoid, cylinder, torus, shape, 3d
*/

const jscad = require('@jscad/modeling')
const { polygon } = jscad.primitives
const { extrudeLinear } = jscad.extrusions
const { center } = jscad.transforms

const getParameterDefinitions = () => {
  return [
    { name: 'centerx', type: 'checkbox', checked: false, caption: 'Center on X:' },
    { name: 'centery', type: 'checkbox', checked: false, caption: 'Center on Y:' },
    { name: 'centerz', type: 'checkbox', checked: false, caption: 'Center on Z:' }
  ]
}

function main (params) {
  let crossHair3D = crosshair()
  if (params.centerx || params.centery || params.centerz) {
    crossHair3D = center([params.centerx, params.centery, params.centerz], crossHair3D)
  }
  return crossHair3D
}

function crosshair () {
  const poly = polygon({
    points: [
      [0, 0], [10, 0], [10, 4], [9, 4], [9, 1], [6, 1], [5, 3],
      [4, 1], [1, 1], [1, 4], [3, 5],
      [1, 6], [1, 9], [4, 9], [5, 7],
      [6, 9], [9, 9], [9, 6], [10, 6], [10, 10], [0, 10]
    ]
  })
  return extrudeLinear({ height: 5 }, poly)
}

module.exports = { main, getParameterDefinitions }
