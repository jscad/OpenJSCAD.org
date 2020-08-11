/*
// title      : Dodecahedron
// author     : Rene K. Mueller
// license    : MIT License
// description: building dodecahedron() from cuboids
// file       : dodecahedron.js
// tags        : boolean, intersect, dodecahedron
// from http://en.wikibooks.org/wiki/OpenSCAD_User_Manual/Commented_Example_Projects
*/

const jscad = require('@jscad/modeling')
const { cuboid } = jscad.primitives
const { intersect } = jscad.booleans
const { rotateX, rotateZ, scale } = jscad.transforms
const { degToRad } = jscad.utils

const dodecahedron = (h) => {
  let cuboid1 = cuboid({ size: [2, 2, 1] })
  for (let i = 0; i <= 4; i++) {
    // loop i from 0 to 4, and intersect results
    // make a cube, rotate it 116.565 degrees around the X axis,
    // then 72*i around the Z axis
    cuboid1 = intersect(
      cuboid1,
      rotateX(degToRad(116.565),
        rotateZ(i * degToRad(72),
          cuboid({ size: [2, 2, 1] }))
      )
    )
  }
  return scale([h, h, h], cuboid1) // scale by height parameter
}

const main = () => {
  // TODO - Understand why scaling this up causes shading problems
  return dodecahedron(1)
}

module.exports = { main }
