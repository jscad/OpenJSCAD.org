/*
// title      : Transparency
// authors    : Rene K. Mueller, Moissette Mark, Simon Clark
// license    : MIT License
// description: showing transparent objects
// tags       : colors, transparency, hsltorgb
// file       : transparency.js
*/

const { colorize, hslToRgb, colorNameToRgb } = require('@jscad/modeling').colors
const { cuboid, cylinder } = require('@jscad/modeling').primitives
const { translate } = require('@jscad/modeling').transforms

const main = () => {
  const shapes = []
  for (let i = 7; i >= 0; i--) {
    // reverse order for seeing through all cylinders (see http://www.opengl.org/wiki/Transparency_Sorting)
    const shapeColor = hslToRgb(i / 8, 1, 0.5, (i + 1) / 8) // hslToRGB can accept a transparency value as well.
    shapes.push(
      colorize(shapeColor, translate([(i - 3) * 7.5, 0, 0], cylinder({ radius: 3, height: 20 })))
    )
  }
  shapes.push(
    colorize(colorNameToRgb('red'), translate([-4, -10, 0], cuboid({ size: [5, 5, 5] })))
  )
  shapes.push(
    colorize([1, 0, 0, 0.5], translate([4, -10, 0], cuboid({ size: [5, 5, 5] })))
  )
  return shapes
}

module.exports = { main }
