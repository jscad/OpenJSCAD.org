/*
// title      : Colors
// authors     : Moissette Mark
// license    : MIT License
// description: showing various color functions
// tags       : colors, transparency, hsl3rgb
*/

const { color, hslToRgb, colorNameToRgb, hexToRgb, hsvToRgb } = require('@jscad/modeling').color
const { cuboid, sphere } = require('@jscad/modeling').primitives
const { translate } = require('@jscad/modeling').transforms

const main = () => {
  // the color() function applies a color (rgb, or rgba) to the given object
  const simple = color([0, 1, 0, 0.8], cuboid())

  // you can also generate a color from a color name using colorNameToRgb
  const fromColorName = color(colorNameToRgb('lightblue'), sphere())

  // or use a hex color value using fromHexValue
  const fromHexValue = color(hexToRgb('#000080'), sphere()) // navy blue

  // or hsl input using hslToRgb
  const fromHsl = color(hslToRgb([0.9166666666666666, 1, 0.5]), sphere())

  // hsl works as well ! using hsvToRgb
  const fromHsv = color(hsvToRgb([0.9166666666666666, 1, 1]), sphere())

  // we also provide a few helpers to convert colors the other way around
  // rgbToHex
  // rgbToHsl
  // rgbToHsv

  return [
    simple,
    translate([5, 0, 0], fromColorName),
    translate([-5, 0, 0], fromHexValue),
    translate([0, 5, 0], fromHsl),
    translate([0, -5, 0], fromHsv)
  ]
}

module.exports = { main }
