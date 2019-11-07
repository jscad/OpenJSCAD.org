/**
 * Converts an RGB color value to HSV.
 *
 * @see http://en.wikipedia.org/wiki/HSV_color_space.
 * @param {Number[]} values - RGB color values
 * @return {Number[]} HSV color values
 * @alias module:color.rgbToHsv
 */
const rgbToHsv = (values) => {
  if (!Array.isArray(values)) throw new Error('values must be an array')
  if (values.length < 3) throw new Error('values must contain R, G and B values')

  let r = values[0]
  let g = values[1]
  let b = values[2]

  let max = Math.max(r, g, b)
  let min = Math.min(r, g, b)
  let h
  let s
  let v = max

  let d = max - min
  s = max === 0 ? 0 : d / max

  if (max === min) {
    h = 0 // achromatic
  } else {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h /= 6
  }

  if (values.length > 3) {
    // add alpha if provided
    let a = values[3]
    return [h, s, v, a]
  }
  return [h, s, v]
}

module.exports = rgbToHsv
