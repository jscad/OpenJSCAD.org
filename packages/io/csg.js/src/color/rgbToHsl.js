/**
 * Converts an RGB color value to HSL.
 *
 * @see http://en.wikipedia.org/wiki/HSL_color_space.
 * @see http://axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c
 * @param {Array} values - RGB color values
 * @return Array HSL color values
 */
const rgbToHsl = (values) => {
  if (!Array.isArray(values)) throw new Error('values must be an array')
  if (values.length < 3) throw new Error('values must contain R, G and B values')

  let r = values[0]
  let g = values[1]
  let b = values[2]

  let max = Math.max(r, g, b)
  let min = Math.min(r, g, b)
  let h
  let s
  let l = (max + min) / 2

  if (max === min) {
    h = s = 0 // achromatic
  } else {
    let d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
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
    // add alpha value if provided
    let a = values[3]
    return [h, s, l, a]
  }
  return [h, s, l]
}

module.exports = rgbToHsl
