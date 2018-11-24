const {svg2cagX, svg2cagY, cagLengthX, cagLengthY, cagLengthP, reflect, groupValue} = require('./helpers')
const {cssPxUnit} = require('./constants')

const shapesMap = function (obj, codify, params) {
  const {level, indent, on, svgUnitsPmm, svgUnitsX, svgUnitsY, svgUnitsV, svgGroups} = params

  const types = {
    group: (obj) => {
      let code = codify(obj)
      code += indent + 'var ' + on + ' = cag' + (level + 1) + ';\n'
      return code
    },

    rect: (obj, svgUnitsPmm, svgUnitsX, svgUnitsY) => {
      let x = cagLengthX(obj.x, svgUnitsPmm, svgUnitsX)
      let y = (0 - cagLengthY(obj.y, svgUnitsPmm, svgUnitsY))
      const w = cagLengthX(obj.width, svgUnitsPmm, svgUnitsX)
      const h = cagLengthY(obj.height, svgUnitsPmm, svgUnitsY)
      const rx = cagLengthX(obj.rx, svgUnitsPmm, svgUnitsX)
      // const ry = cagLengthY(obj.ry, svgUnitsPmm, svgUnitsY)
      if (w > 0 && h > 0) {
        x = (x + (w / 2)).toFixed(4) // position the object via the center
        y = (y - (h / 2)).toFixed(4) // position the object via the center
        if (rx === 0) {
          return indent + 'var ' + on + ' = CAG.rectangle({center: [' + x + ',' + y + '], radius: [' + w / 2 + ',' + h / 2 + ']});\n'
        } else {
          return indent + 'var ' + on + ' = CAG.roundedRectangle({center: [' + x + ',' + y + '], radius: [' + w / 2 + ',' + h / 2 + '], roundradius: ' + rx + '});\n'
        }
      }
    },

    circle: (obj, svgUnitsPmm, svgUnitsX, svgUnitsY, svgUnitsV) => {
      const x = cagLengthX(obj.x, svgUnitsPmm, svgUnitsX)
      const y = (0 - cagLengthY(obj.y, svgUnitsPmm, svgUnitsY))
      const r = cagLengthP(obj.radius, svgUnitsPmm, svgUnitsV)
      if (r > 0) {
        return indent + 'var ' + on + ' = CAG.circle({center: [' + x + ',' + y + '], radius: ' + r + '});\n'
      }
    },

    ellipse: (obj, svgUnitsPmm, svgUnitsX, svgUnitsY, svgUnitsV) => {
      const rx = cagLengthX(obj.rx, svgUnitsPmm, svgUnitsX)
      const ry = cagLengthY(obj.ry, svgUnitsPmm, svgUnitsY)
      const cx = cagLengthX(obj.cx, svgUnitsPmm, svgUnitsX)
      const cy = (0 - cagLengthY(obj.cy, svgUnitsPmm, svgUnitsY))
      if (rx > 0 && ry > 0) {
        return indent + 'var ' + on + ' = CAG.ellipse({center: [' + cx + ',' + cy + '], radius: [' + rx + ',' + ry + ']});\n'
      }
    },

    line: (obj, svgUnitsPmm, svgUnitsX, svgUnitsY, svgUnitsV) => {
      const x1 = cagLengthX(obj.x1, svgUnitsPmm, svgUnitsX)
      const y1 = (0 - cagLengthY(obj.y1, svgUnitsPmm, svgUnitsY))
      const x2 = cagLengthX(obj.x2, svgUnitsPmm, svgUnitsX)
      const y2 = (0 - cagLengthY(obj.y2, svgUnitsPmm, svgUnitsY))
      let r = cssPxUnit // default
      if ('strokeWidth' in obj) {
        r = cagLengthP(obj.strokeWidth, svgUnitsPmm, svgUnitsV) / 2
      } else {
        const v = groupValue(svgGroups, 'strokeWidth')
        if (v !== null) {
          r = cagLengthP(v, svgUnitsPmm, svgUnitsV) / 2
        }
      }

      let tmpCode = indent + 'var ' + on + ' = new CSG.Path2D([[' + x1 + ',' + y1 + '],[' + x2 + ',' + y2 + ']],false);\n'
      tmpCode += indent + on + ' = ' + on + '.expandToCAG(' + r + ',CSG.defaultResolution2D);\n'

      return tmpCode
    },

    polygon: (obj, svgUnitsPmm, svgUnitsX, svgUnitsY) => {
      let tmpCode = indent + 'var ' + on + ' = new CSG.Path2D([\n'

      for (let j = 0; j < obj.points.length; j++) {
        const p = obj.points[j]
        if ('x' in p && 'y' in p) {
          const x = cagLengthX(p.x, svgUnitsPmm, svgUnitsX)
          const y = (0 - cagLengthY(p.y, svgUnitsPmm, svgUnitsY))
          tmpCode += indent + '  [' + x + ',' + y + '],\n'
        }
      }
      tmpCode += indent + '],true);\n'
      tmpCode += indent + on + ' = ' + on + '.innerToCAG();\n'
      return tmpCode
    },

    polyline: (obj, svgUnitsPmm, svgUnitsX, svgUnitsY, svgUnitsV) => {
      let r = cssPxUnit // default
      if ('strokeWidth' in obj) {
        r = cagLengthP(obj.strokeWidth, svgUnitsPmm, svgUnitsV) / 2
      } else {
        const v = groupValue(svgGroups, 'strokeWidth')
        if (v !== null) {
          r = cagLengthP(v, svgUnitsPmm, svgUnitsV) / 2
        }
      }
      let tmpCode = indent + 'var ' + on + ' = new CSG.Path2D([\n'
      for (let j = 0; j < obj.points.length; j++) {
        const p = obj.points[j]
        if ('x' in p && 'y' in p) {
          var x = cagLengthX(p.x, svgUnitsPmm, svgUnitsX)
          var y = (0 - cagLengthY(p.y, svgUnitsPmm, svgUnitsY))
          tmpCode += indent + '  [' + x + ',' + y + '],\n'
        }
      }
      tmpCode += indent + '],false);\n'
      tmpCode += indent + on + ' = ' + on + '.expandToCAG(' + r + ',CSG.defaultResolution2D);\n'
      return tmpCode
    },

    path
  }
  return types[obj.type](obj, svgUnitsPmm, svgUnitsX, svgUnitsY, svgUnitsV, params, svgGroups)
}

module.exports = shapesMap

function path (obj, svgUnitsPmm, svgUnitsX, svgUnitsY, svgUnitsV, params, svgGroups) {
  const {indent, on} = params
  let tmpCode = indent + 'var ' + on + ' = new CAG();\n'

  let r = cssPxUnit // default
  if ('strokeWidth' in obj) {
    r = cagLengthP(obj.strokeWidth, svgUnitsPmm, svgUnitsV) / 2
  } else {
    const v = groupValue(svgGroups, 'strokeWidth')
    if (v !== null) {
      r = cagLengthP(v, svgUnitsPmm, svgUnitsV) / 2
    }
  }
  // Note: All values are SVG values
  let sx = 0 // starting position
  let sy = 0
  let cx = 0 // current position
  let cy = 0
  let pi = 0 // current path index
  let pathName = on + pi // current path name
  let pc = false // current path closed
  let bx = 0 // 2nd control point from previous C command
  let by = 0 // 2nd control point from previous C command
  let qx = 0 // 2nd control point from previous Q command
  let qy = 0 // 2nd control point from previous Q command

  for (let j = 0; j < obj.commands.length; j++) {
    let co = obj.commands[j]
    let pts = co.p
    // console.log('postion: ['+cx+','+cy+'] before '+co.c);
    switch (co.c) {
      case 'm': // relative move to X,Y
        // special case, if at beginning of path then treat like absolute M
        if (j === 0) {
          cx = 0; cy = 0
        }
        // close the previous path
        if (pi > 0 && pc === false) {
          tmpCode += indent + pathName + ' = ' + pathName + '.expandToCAG(' + r + ',CSG.defaultResolution2D);\n'
        }
        // open a new path
        if (pts.length >= 2) {
          cx = cx + parseFloat(pts.shift())
          cy = cy + parseFloat(pts.shift())
          pi++
          pathName = on + pi
          pc = false
          tmpCode += indent + 'var ' + pathName + ' = new CSG.Path2D([[' + svg2cagX(cx, svgUnitsPmm) + ',' + svg2cagY(cy, svgUnitsPmm) + ']],false);\n'
          sx = cx; sy = cy
        }
        // optional implicit relative lineTo (cf SVG spec 8.3.2)
        while (pts.length >= 2) {
          cx = cx + parseFloat(pts.shift())
          cy = cy + parseFloat(pts.shift())
          tmpCode += indent + pathName + ' = ' + pathName + '.appendPoint([' + svg2cagX(cx, svgUnitsPmm) + ',' + svg2cagY(cy, svgUnitsPmm) + ']);\n'
        }
        break
      case 'M': // absolute move to X,Y
        // close the previous path
        if (pi > 0 && pc === false) {
          tmpCode += indent + pathName + ' = ' + pathName + '.expandToCAG(' + r + ',CSG.defaultResolution2D);\n'
        }
        // open a new path
        if (pts.length >= 2) {
          cx = parseFloat(pts.shift())
          cy = parseFloat(pts.shift())
          pi++
          pathName = on + pi
          pc = false
          tmpCode += indent + 'var ' + pathName + ' = new CSG.Path2D([[' + svg2cagX(cx, svgUnitsPmm) + ',' + svg2cagY(cy, svgUnitsPmm) + ']],false);\n'
          sx = cx; sy = cy
        }
        // optional implicit absolute lineTo (cf SVG spec 8.3.2)
        while (pts.length >= 2) {
          cx = parseFloat(pts.shift())
          cy = parseFloat(pts.shift())
          tmpCode += indent + pathName + ' = ' + pathName + '.appendPoint([' + svg2cagX(cx, svgUnitsPmm) + ',' + svg2cagY(cy, svgUnitsPmm) + ']);\n'
        }
        break
      case 'a': // relative elliptical arc
        while (pts.length >= 7) {
          let rx = parseFloat(pts.shift())
          let ry = parseFloat(pts.shift())
          let ro = 0 - parseFloat(pts.shift())
          let lf = (pts.shift() === '1')
          let sf = (pts.shift() === '1')
          cx = cx + parseFloat(pts.shift())
          cy = cy + parseFloat(pts.shift())
          tmpCode += indent + pathName + ' = ' + pathName + '.appendArc([' + svg2cagX(cx, svgUnitsPmm) + ',' + svg2cagY(cy, svgUnitsPmm) + '],{xradius: ' + svg2cagX(rx, svgUnitsPmm) + ',yradius: ' + svg2cagY(ry, svgUnitsPmm) + ',xaxisrotation: ' + ro + ',clockwise: ' + sf + ',large: ' + lf + '});\n'
        }
        break
      case 'A': // absolute elliptical arc
        while (pts.length >= 7) {
          let rx = parseFloat(pts.shift())
          let ry = parseFloat(pts.shift())
          let ro = 0 - parseFloat(pts.shift())
          let lf = (pts.shift() === '1')
          let sf = (pts.shift() === '1')
          cx = parseFloat(pts.shift())
          cy = parseFloat(pts.shift())
          tmpCode += indent + pathName + ' = ' + pathName + '.appendArc([' + svg2cagX(cx, svgUnitsPmm) + ',' + svg2cagY(cy, svgUnitsPmm) + '],{xradius: ' + svg2cagX(rx, svgUnitsPmm) + ',yradius: ' + svg2cagY(ry, svgUnitsPmm) + ',xaxisrotation: ' + ro + ',clockwise: ' + sf + ',large: ' + lf + '});\n'
        }
        break
      case 'c': // relative cubic Bézier
        while (pts.length >= 6) {
          let x1 = cx + parseFloat(pts.shift())
          let y1 = cy + parseFloat(pts.shift())
          bx = cx + parseFloat(pts.shift())
          by = cy + parseFloat(pts.shift())
          cx = cx + parseFloat(pts.shift())
          cy = cy + parseFloat(pts.shift())
          tmpCode += indent + pathName + ' = ' + pathName + '.appendBezier([[' + svg2cagX(x1, svgUnitsPmm) + ',' + svg2cagY(y1, svgUnitsPmm) + '],[' + svg2cagX(bx, svgUnitsPmm) + ',' + svg2cagY(by, svgUnitsPmm) + '],[' + svg2cagX(cx, svgUnitsPmm) + ',' + svg2cagY(cy, svgUnitsPmm) + ']]);\n'
          let rf = reflect(bx, by, cx, cy)
          bx = rf[0]
          by = rf[1]
        }
        break
      case 'C': // absolute cubic Bézier
        while (pts.length >= 6) {
          let x1 = parseFloat(pts.shift())
          let y1 = parseFloat(pts.shift())
          bx = parseFloat(pts.shift())
          by = parseFloat(pts.shift())
          cx = parseFloat(pts.shift())
          cy = parseFloat(pts.shift())
          tmpCode += indent + pathName + ' = ' + pathName + '.appendBezier([[' + svg2cagX(x1, svgUnitsPmm) + ',' + svg2cagY(y1, svgUnitsPmm) + '],[' + svg2cagX(bx, svgUnitsPmm) + ',' + svg2cagY(by, svgUnitsPmm) + '],[' + svg2cagX(cx, svgUnitsPmm) + ',' + svg2cagY(cy, svgUnitsPmm) + ']]);\n'
          let rf = reflect(bx, by, cx, cy)
          bx = rf[0]
          by = rf[1]
        }
        break
      case 'q': // relative quadratic Bézier
        while (pts.length >= 4) {
          qx = cx + parseFloat(pts.shift())
          qy = cy + parseFloat(pts.shift())
          cx = cx + parseFloat(pts.shift())
          cy = cy + parseFloat(pts.shift())
          tmpCode += indent + pathName + ' = ' + pathName + '.appendBezier([[' + svg2cagX(qx, svgUnitsPmm) + ',' + svg2cagY(qy, svgUnitsPmm) + '],[' + svg2cagX(qx, svgUnitsPmm) + ',' + svg2cagY(qy, svgUnitsPmm) + '],[' + svg2cagX(cx, svgUnitsPmm) + ',' + svg2cagY(cy, svgUnitsPmm) + ']]);\n'
          let rf = reflect(qx, qy, cx, cy)
          qx = rf[0]
          qy = rf[1]
        }
        break
      case 'Q': // absolute quadratic Bézier
        while (pts.length >= 4) {
          qx = parseFloat(pts.shift())
          qy = parseFloat(pts.shift())
          cx = parseFloat(pts.shift())
          cy = parseFloat(pts.shift())
          tmpCode += indent + pathName + ' = ' + pathName + '.appendBezier([[' + svg2cagX(qx, svgUnitsPmm) + ',' + svg2cagY(qy, svgUnitsPmm) + '],[' + svg2cagX(qx, svgUnitsPmm) + ',' + svg2cagY(qy, svgUnitsPmm) + '],[' + svg2cagX(cx, svgUnitsPmm) + ',' + svg2cagY(cy, svgUnitsPmm) + ']]);\n'
          let rf = reflect(qx, qy, cx, cy)
          qx = rf[0]
          qy = rf[1]
        }
        break
      case 't': // relative quadratic Bézier shorthand
        while (pts.length >= 2) {
          cx = cx + parseFloat(pts.shift())
          cy = cy + parseFloat(pts.shift())
          tmpCode += indent + pathName + ' = ' + pathName + '.appendBezier([[' + svg2cagX(qx, svgUnitsPmm) + ',' + svg2cagY(qy, svgUnitsPmm) + '],[' + svg2cagX(qx, svgUnitsPmm) + ',' + svg2cagY(qy, svgUnitsPmm) + '],[' + cx + ',' + cy + ']]);\n'
          let rf = reflect(qx, qy, cx, cy)
          qx = rf[0]
          qy = rf[1]
        }
        break
      case 'T': // absolute quadratic Bézier shorthand
        while (pts.length >= 2) {
          cx = parseFloat(pts.shift())
          cy = parseFloat(pts.shift())
          tmpCode += indent + pathName + ' = ' + pathName + '.appendBezier([[' + svg2cagX(qx, svgUnitsPmm) + ',' + svg2cagY(qy, svgUnitsPmm) + '],[' + svg2cagX(qx, svgUnitsPmm) + ',' + svg2cagY(qy, svgUnitsPmm) + '],[' + svg2cagX(cx, svgUnitsPmm) + ',' + svg2cagY(cy, svgUnitsPmm) + ']]);\n'
          let rf = reflect(qx, qy, cx, cy)
          qx = rf[0]
          qy = rf[1]
        }
        break
      case 's': // relative cubic Bézier shorthand
        while (pts.length >= 4) {
          let x1 = bx // reflection of 2nd control point from previous C
          let y1 = by // reflection of 2nd control point from previous C
          bx = cx + parseFloat(pts.shift())
          by = cy + parseFloat(pts.shift())
          cx = cx + parseFloat(pts.shift())
          cy = cy + parseFloat(pts.shift())
          tmpCode += indent + pathName + ' = ' + pathName + '.appendBezier([[' + svg2cagX(x1, svgUnitsPmm) + ',' + svg2cagY(y1, svgUnitsPmm) + '],[' + svg2cagX(bx, svgUnitsPmm) + ',' + svg2cagY(by, svgUnitsPmm) + '],[' + svg2cagX(cx, svgUnitsPmm) + ',' + svg2cagY(cy, svgUnitsPmm) + ']]);\n'
          let rf = reflect(bx, by, cx, cy)
          bx = rf[0]
          by = rf[1]
        }
        break
      case 'S': // absolute cubic Bézier shorthand
        while (pts.length >= 4) {
          let x1 = bx // reflection of 2nd control point from previous C
          let y1 = by // reflection of 2nd control point from previous C
          bx = parseFloat(pts.shift())
          by = parseFloat(pts.shift())
          cx = parseFloat(pts.shift())
          cy = parseFloat(pts.shift())
          tmpCode += indent + pathName + ' = ' + pathName + '.appendBezier([[' + svg2cagX(x1, svgUnitsPmm) + ',' + svg2cagY(y1, svgUnitsPmm) + '],[' + svg2cagX(bx, svgUnitsPmm) + ',' + svg2cagY(by, svgUnitsPmm) + '],[' + svg2cagX(cx, svgUnitsPmm) + ',' + svg2cagY(cy, svgUnitsPmm) + ']]);\n'
          let rf = reflect(bx, by, cx, cy)
          bx = rf[0]
          by = rf[1]
        }
        break
      case 'h': // relative Horzontal line to
        while (pts.length >= 1) {
          cx = cx + parseFloat(pts.shift())
          tmpCode += indent + pathName + ' = ' + pathName + '.appendPoint([' + svg2cagX(cx, svgUnitsPmm) + ',' + svg2cagY(cy, svgUnitsPmm) + ']);\n'
        }
        break
      case 'H': // absolute Horzontal line to
        while (pts.length >= 1) {
          cx = parseFloat(pts.shift())
          tmpCode += indent + pathName + ' = ' + pathName + '.appendPoint([' + svg2cagX(cx, svgUnitsPmm) + ',' + svg2cagY(cy, svgUnitsPmm) + ']);\n'
        }
        break
      case 'l': // relative line to
        while (pts.length >= 2) {
          cx = cx + parseFloat(pts.shift())
          cy = cy + parseFloat(pts.shift())
          tmpCode += indent + pathName + ' = ' + pathName + '.appendPoint([' + svg2cagX(cx, svgUnitsPmm) + ',' + svg2cagY(cy, svgUnitsPmm) + ']);\n'
        }
        break
      case 'L': // absolute line to
        while (pts.length >= 2) {
          cx = parseFloat(pts.shift())
          cy = parseFloat(pts.shift())
          tmpCode += indent + pathName + ' = ' + pathName + '.appendPoint([' + svg2cagX(cx, svgUnitsPmm) + ',' + svg2cagY(cy, svgUnitsPmm) + ']);\n'
        }
        break
      case 'v': // relative Vertical line to
        while (pts.length >= 1) {
          cy = cy + parseFloat(pts.shift())
          tmpCode += indent + pathName + ' = ' + pathName + '.appendPoint([' + svg2cagX(cx, svgUnitsPmm) + ',' + svg2cagY(cy, svgUnitsPmm) + ']);\n'
        }
        break
      case 'V': // absolute Vertical line to
        while (pts.length >= 1) {
          cy = parseFloat(pts.shift())
          tmpCode += indent + pathName + ' = ' + pathName + '.appendPoint([' + svg2cagX(cx, svgUnitsPmm) + ',' + svg2cagY(cy, svgUnitsPmm) + ']);\n'
        }
        break
      case 'z': // close current line
      case 'Z':
        tmpCode += indent + pathName + ' = ' + pathName + '.close();\n'
        tmpCode += indent + 'switch (' + pathName + '.getTurn()) {\n';
        tmpCode += indent + '  default:\n';
        tmpCode += indent + '  case "clockwise":\n';
        tmpCode += indent + '  ' + pathName + ' = ' + pathName + '.innerToCAG();\n'
        tmpCode += indent + '  ' + on + ' = ' + on + '.union(' + pathName + ');\n'
        tmpCode += indent + '  break;\n';
        tmpCode += indent + '  case "counter-clockwise":\n';
        tmpCode += indent + '  ' + pathName + ' = ' + pathName + '.innerToCAG();\n'
        tmpCode += indent + '  ' + on + ' = ' + on + '.subtract(' + pathName + ');\n'
        tmpCode += indent + '  break;\n';
        tmpCode += indent + '}\n';
        cx = sx
        cy = sy // return to the starting point
        pc = true
        break
      default:
        console.log('Warning: Unknow PATH command [' + co.c + ']')
        break
    }
    // console.log('postion: ['+cx+','+cy+'] after '+co.c);
  }
  if (pi > 0 && pc === false) {
    tmpCode += indent + pathName + ' = ' + pathName + '.expandToCAG(' + r + ',CSG.defaultResolution2D);\n'
    tmpCode += indent + on + ' = ' + on + '.union(' + pathName + ');\n'
  }
  return tmpCode
}
