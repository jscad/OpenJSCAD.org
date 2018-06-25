/**
 * Converts a HTML5 color value (string) to RGB values
 * See the color input type of HTML5 forms
 * Conversion formula:
 * - split the string; "#RRGGBB" into RGB components
 * - convert the HEX value into RGB values
 */
const hexToRgb = s => {
  let r = 0
  let g = 0
  let b = 0
  if (s.length === 7) {
    r = parseInt('0x' + s.slice(1, 3)) / 255
    g = parseInt('0x' + s.slice(3, 5)) / 255
    b = parseInt('0x' + s.slice(5, 7)) / 255
  }
  return [r, g, b]
}

module.exports = hexToRgb
