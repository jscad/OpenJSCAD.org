/*
// title      : Transparency
// authors     : Rene K. Mueller, Moissette Mark
// license    : MIT License
// description: showing transparent objects
// tags       : colors, transparency, hsl3rgb
*/

const { color, hsl2rgb } = require('@jscad/modeling').color
const { cuboid, cylinder } = require('@jscad/modeling').primitives
const { translate } = require('@jscad/modeling').transforms

const main = () => {
  const shapes = []
  for (let i = 7; i >= 0; i--) { // reverse order for seeing through all cylinders (see http://www.opengl.org/wiki/Transparency_Sorting)
    // hsl to rgb, creating rainbow [r,g,b]
    const shapeColor = hsl2rgb(i / 8, 1, 0.5).concat(1 / 8 + i / 8) // and add to alpha to make it [r,g,b,a]
    shapes.push(
      color(shapeColor, translate([(i - 3) * 7.5, 0, 0], cylinder({ r: 3, h: 20 })))
    )
  }
  shapes.push(
    color('red', translate([-4, -10, 0], cuboid(5)))
  )
  shapes.push(
    color('red', 0.5, translate([4, -10, 0], cuboid(5)))
  )
  return shapes
}

module.exports = { main }
