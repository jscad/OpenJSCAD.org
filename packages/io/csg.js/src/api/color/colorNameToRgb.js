const cssColors = require('./cssColors')

/**
 * Converts an CSS color name to RGB color.
 *
 * @param   String  s       The CSS color name
 * @return  Array           The RGB representation, or [0,0,0] default
 */
const colorNameToRgb = s => {
  return cssColors[s.toLowerCase()]
}

module.exports = colorNameToRgb
