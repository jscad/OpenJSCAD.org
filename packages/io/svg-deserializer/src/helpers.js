const { inchMM, ptMM, pcMM, svgColors } = require('./constants')

// Calculate the CAG length/size from the given SVG value (float)
const svg2cagX = (v, svgUnitsPmm) => (v / svgUnitsPmm[0])

const svg2cagY = (v, svgUnitsPmm) => 0 - (v / svgUnitsPmm[1])

// Calculate the CAG length/size from the given CSS value (string)
const cagLengthX = (css, svgUnitsPmm, svgUnitsX) => {
  if (css.indexOf('%') < 0) {
    return css2cag(css, svgUnitsPmm[0])
  }
  // calculate the units as a percentage of the width
  let v = parseFloat(css) // number part
  if (isNaN(v)) { return 0.0 }
  if (v === 0) return v
  v = (v / 100) * svgUnitsX
  // convert the units to mm
  v = v / svgUnitsPmm[0]
  return Math.round(v * 100000) / 100000
}

const cagLengthY = (css, svgUnitsPmm, svgUnitsY) => {
  if (css.indexOf('%') < 0) {
    return css2cag(css, svgUnitsPmm[1])
  }
  // calculate the units as a percentage of the width
  let v = parseFloat(css) // number part
  if (isNaN(v)) { return 0.0 }
  if (v === 0) return v
  v = (v / 100) * svgUnitsY
  // convert the units to mm
  v = v / svgUnitsPmm[1]
  return Math.round(v * 100000) / 100000
}

const cagLengthP = (css, svgUnitsPmm, svgUnitsV) => {
  if (css.indexOf('%') < 0) {
    return css2cag(css, svgUnitsPmm[1])
  }
  // calculate the units as a percentage of the viewport
  let v = parseFloat(css) // number part
  if (isNaN(v)) { return 0.0 }
  if (v === 0) return v
  v = (v / 100) * svgUnitsV
  // convert the units to mm
  v = v / svgUnitsPmm[0] // FIXME should this use X units?
  return v
}

const css2cag = (css, unit) => {
  let v = parseFloat(css) // number part
  if (isNaN(v)) { return 0.0 }
  if (v === 0) return v
  if (css.search(/EM/i) > 0) { // FIXME self assignment , useless ?
    // v = v // font size
  } else
  if (css.search(/EX/i) > 0) { // FIXME self assignment , useless ?
    // v = v // x-height of font
  } else
  if (css.search(/MM/i) > 0) { // FIXME self assignment , useless ?
    // v = v // absolute millimeters
  } else
  if (css.search(/CM/i) > 0) {
    v = (v * 10) // absolute centimeters > millimeters
  } else
  if (css.search(/IN/i) > 0) {
    v = (v / inchMM) // absolute inches > millimeters
  } else
  if (css.search(/PT/i) > 0) {
    v = (v / ptMM) // absolute points > millimeters
  } else
  if (css.search(/PC/i) > 0) {
    v = (v / pcMM) // absolute picas > millimeters
  } else {
    v = (v / unit) // absolute pixels(units) > millimeters
  }
  return v
}

// convert the SVG color specification to CAG RGB
const cagColor = (value) => {
  // let rgb = [0,0,0]; // default is black
  let rgb
  value = value.toLowerCase()
  if (value in svgColors) {
    rgb = svgColors[value]
    rgb = [rgb[0] / 255, rgb[1] / 255, rgb[2] / 255] // converted to 0.0-1.0 values
  } else {
    if (value[0] === '#') {
      if (value.length === 4) {
      // short HEX specification
        value = '#' + value[1] + value[1] + value[2] + value[2] + value[3] + value[3]
      }
      if (value.length === 7) {
      // HEX specification
        rgb = [
          parseInt('0x' + value.slice(1, 3)) / 255,
          parseInt('0x' + value.slice(3, 5)) / 255,
          parseInt('0x' + value.slice(5, 7)) / 255
        ]
      }
    } else {
      const pat = /rgb\(.+,.+,.+\)/
      let s = pat.exec(value)
      if (s !== null) {
      // RGB specification
        s = s[0]
        s = s.slice(s.indexOf('(') + 1, s.indexOf(')'))
        rgb = s.split(',')
        if (s.indexOf('%') > 0) {
        // rgb(#%,#%,#%)
          rgb = [parseInt(rgb[0]), parseInt(rgb[1]), parseInt(rgb[2])]
          rgb = [rgb[0] / 100, rgb[1] / 100, rgb[2] / 100] // converted to 0.0-1.0 values
        } else {
        // rgb(#,#,#)
          rgb = [parseInt(rgb[0]), parseInt(rgb[1]), parseInt(rgb[2])]
          rgb = [rgb[0] / 255, rgb[1] / 255, rgb[2] / 255] // converted to 0.0-1.0 values
        }
      }
    }
  }
  return rgb
}

const cssStyle = (element, name) => {
  if ('style' in element) {
    const list = element.style + ';'
    const pat = name + '\\s*:\\s*(\\S+);'
    const exp = new RegExp(pat, 'i')
    let v = exp.exec(list)
    if (v !== null) {
      v = v[0] // name plus value
      let i = v.indexOf(':') + 1 // skip past the ':'
      while (v[i] === ' ') i++
      v = v.slice(i, v.indexOf(';'))
      return v
    }
  }
  return undefined
}

const reflect = (x, y, px, py) => {
  const ox = x - px
  const oy = y - py
  if (x === px && y === px) return [x, y]
  if (x === px) return [x, py + (-oy)]
  if (y === py) return [px + (-ox), y]
  return [px + (-ox), py + (-oy)]
}

// Return the value for the given attribute from the group hiearchy
const groupValue = (svgGroups, name) => {
  let i = svgGroups.length
  while (i > 0) {
    const g = svgGroups[i - 1]
    if (name in g) {
      return g[name]
    }
    i--
  }
  return undefined
}

const svgColorForTarget = (target, svgObject) => {
  let color = null
  if (target === 'path') {
    if (svgObject.stroke) {
      color = [svgObject.stroke[0], svgObject.stroke[1], svgObject.stroke[2], 1]
    } else {
      if (svgObject.fill) {
        color = [svgObject.fill[0], svgObject.fill[1], svgObject.fill[2], 1]
      }
    }
  } else {
    // target is geom2
    if (svgObject.fill) {
      color = [svgObject.fill[0], svgObject.fill[1], svgObject.fill[2], 1]
    } else {
      if (svgObject.stroke) {
        color = [svgObject.stroke[0], svgObject.stroke[1], svgObject.stroke[2], 1]
      }
    }
  }
  return color
}

module.exports = {
  svg2cagX,
  svg2cagY,
  cagLengthX,
  cagLengthY,
  cagLengthP,
  css2cag,
  cagColor,
  cssStyle,
  reflect,
  groupValue,
  svgColorForTarget
}
