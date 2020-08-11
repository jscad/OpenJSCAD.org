/*
// title      : Basic Colors
// authors    : Moissette Mark
// license    : MIT License
// description: showing various color functions
// tags       : colors, transparency, hsltorgb, hsvtorgb, rgb, rgba
// file       : basicColors.js
*/

const jscad = require('@jscad/modeling')
const { colorize, hslToRgb, colorNameToRgb, hexToRgb, hsvToRgb } = jscad.colors
const { cuboid, sphere } = jscad.primitives
const { translate } = jscad.transforms

const main = () => {
  // the color() function applies a color (rgb, or rgba) to the given object
  const simple = colorize([0, 1, 0, 0.8], cuboid())

  // you can also generate a color from a color name using colorNameToRgb
  const fromColorName = colorize(
    colorNameToRgb('lightblue'), // Using css color shortcuts
    translate([5, 0, 0], sphere()) // colorize should be applied after any other operations (tranforms, booleans, etc)
  )

  // or use a hex color value using fromHexValue
  const fromHexValue = colorize(
    hexToRgb('#ffd834'), // bright yellow
    translate([-5, 0, 0], sphere())
  )

  // or hsl (hue, saturation, lightness) input using hslToRgb
  const fromHsl = colorize(
    hslToRgb([0.78, 1, 0.5]), // fully saturated purple
    translate([0, 5, 0], sphere())
  )

  // hsv (hue, saturation, value) works as well, using hsvToRgb
  const fromHsv = colorize(
    hsvToRgb([0, 1, 1]), // 0 is red on the color wheel
    translate([0, -5, 0], sphere())
  )

  // we also provide a few helpers to convert colors the other way around. (rgbToHex, rgbToHsl, rgbToHsv)

  return [
    simple,
    fromColorName,
    fromHexValue,
    fromHsl,
    fromHsv
  ]
}

module.exports = { main }
