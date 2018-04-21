/**
 * convert color from rgba object to the array of bytes
 * @param   {object} color `{r: r, g: g, b: b, a: a}`
 * @returns {Array}  `[r, g, b, a]`
 */
function colorBytes (colorRGBA) {
  var result = [colorRGBA.r, colorRGBA.g, colorRGBA.b]
  if (colorRGBA.a !== undefined) result.push(colorRGBA.a)
  return result
}

function colorRGBA (colorBytes) {
  var result = {r: colorBytes[0], g: colorBytes[1], b: colorBytes[2]}
  if (colorBytes[3] !== undefined) result.a = colorBytes[3]
  return result
}

function cssFnSingleColor (str) {
  if (str[str.length - 1] === '%') {
    return parseInt(str, 10) / 100
  } else {
    return parseInt(str, 10) / 255
  }
}

function parseColor (color) {
  // hsl, hsv, rgba, and #xxyyzz is supported
  var rx = {
    'html3': /^#([a-f0-9]{3})$/i,
    'html6': /^#([a-f0-9]{6})$/i,
    'fn': /^(rgb|hsl|hsv)a?\s*\(([^\)]+)\)$/i,
  }
  var rgba
  var match
  if (match = color.match(rx.html6)) {
    rgba = [parseInt(match[1], 16), parseInt(match[2], 16), parseInt(match[3], 16), 1]
  } else if (match = color.match(rx.html3)) {
    rgba = [parseInt(match[1] + match[1], 16), parseInt(match[2] + match[2], 16), parseInt(match[3] + match[3], 16), 1]
  } else if (match = color.match(rx.fn)) {
    if (match[1] === 'rgb' || match[1] === 'rgba') {
      // 0-255 or percentage allowed
      var digits = match[2].split(/\s*,\s*/)
      rgba = [cssFnSingleColor(digits[0]), cssFnSingleColor(digits[1]), cssFnSingleColor(digits[2]), parseFloat(digits[3])]
    }
  // rgba = [match[1], match[2], match[3], match[4]]
  // console.log (rgba)
  }
  return rgba
}

module.exports = {
  colorBytes,
  colorRGBA,
  cssFnSingleColor,
  parseColor
}
