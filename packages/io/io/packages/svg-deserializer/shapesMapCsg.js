const {CSG, CAG} = require('@jscad/csg')
const {svg2cagX, svg2cagY, cagLengthX, cagLengthY, cagLengthP, reflect, groupValue} = require('./helpers')
const {cssPxUnit} = require('./constants')

const shapesMap = function (obj, codify, params) {
  const {svgUnitsPmm, svgUnitsX, svgUnitsY, svgUnitsV, svgGroups} = params

  const types = {
    group: (obj) => {
      // cag from nested element
      return codify(obj)
    },

    rect: (obj, svgUnitsPmm, svgUnitsX, svgUnitsY) => {
      let x = cagLengthX(obj.x, svgUnitsPmm, svgUnitsX)
      let y = (0 - cagLengthY(obj.y, svgUnitsPmm, svgUnitsY))
      const w = cagLengthX(obj.width, svgUnitsPmm, svgUnitsX)
      const h = cagLengthY(obj.height, svgUnitsPmm, svgUnitsY)
      const rx = cagLengthX(obj.rx, svgUnitsPmm, svgUnitsX)
      // const ry = cagLengthY(obj.ry, svgUnitsPmm, svgUnitsY)
      if (w > 0 && h > 0) {
        x = (x + (w / 2)).toFixed(4)  // position the object via the center
        y = (y - (h / 2)).toFixed(4)  // position the object via the center
        if (rx === 0) {
          return CAG.rectangle({center: [x, y], radius: [w / 2, h / 2]})
        } else {
          return CAG.roundedRectangle({center: [x, y], radius: [w / 2, h / 2], roundradius: rx})
        }
      }
    },

    circle: (obj, svgUnitsPmm, svgUnitsX, svgUnitsY, svgUnitsV) => {
      const x = cagLengthX(obj.x, svgUnitsPmm, svgUnitsX)
      const y = (0 - cagLengthY(obj.y, svgUnitsPmm, svgUnitsY))
      const r = cagLengthP(obj.radius, svgUnitsPmm, svgUnitsV)

      if (r > 0) {
        return CAG.circle({center: [x, y], radius: r})
      }
    },

    ellipse: (obj, svgUnitsPmm, svgUnitsX, svgUnitsY, svgUnitsV) => {
      const rx = cagLengthX(obj.rx, svgUnitsPmm, svgUnitsX)
      const ry = cagLengthY(obj.ry, svgUnitsPmm, svgUnitsY)
      const cx = cagLengthX(obj.cx, svgUnitsPmm, svgUnitsX)
      const cy = (0 - cagLengthY(obj.cy, svgUnitsPmm, svgUnitsY))
      if (rx > 0 && ry > 0) {
        return CAG.ellipse({center: [cx, cy], radius: [rx, ry]})
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
      const tmpObj = new CSG.Path2D([[x1, y1], [x2, y2]], false)
      .expandToCAG(r, CSG.defaultResolution2D)
      return tmpObj
    },

    polygon: (obj, svgUnitsPmm, svgUnitsX, svgUnitsY) => {
      let points = []
      for (let j = 0; j < obj.points.length; j++) {
        const p = obj.points[j]
        if ('x' in p && 'y' in p) {
          const x = cagLengthX(p.x, svgUnitsPmm, svgUnitsX)
          const y = (0 - cagLengthY(p.y, svgUnitsPmm, svgUnitsY))
          points.push([x, y])
        }
      }
      let tmpObj = new CSG.Path2D(points, true).innerToCAG()
      return tmpObj
    },

    polyline: (obj, svgUnitsPmm, svgUnitsX, svgUnitsY, svgUnitsV) => {
      let points = []
      let r = cssPxUnit // default
      if ('strokeWidth' in obj) {
        r = cagLengthP(obj.strokeWidth, svgUnitsPmm, svgUnitsV) / 2
      } else {
        const v = groupValue(svgGroups, 'strokeWidth')
        if (v !== null) {
          r = cagLengthP(v, svgUnitsPmm, svgUnitsV) / 2
        }
      }
      for (let j = 0; j < obj.points.length; j++) {
        const p = obj.points[j]
        if ('x' in p && 'y' in p) {
          var x = cagLengthX(p.x, svgUnitsPmm, svgUnitsX)
          var y = (0 - cagLengthY(p.y, svgUnitsPmm, svgUnitsY))
          points.push([x, y])
        }
      }
      let tmpObj = new CSG.Path2D(points, false).expandToCAG(r, CSG.defaultResolution2D)
      return tmpObj
    },

    path // paths are a lot more complex, handled seperatly , see below
  }
  return types[obj.type](obj, svgUnitsPmm, svgUnitsX, svgUnitsY, svgUnitsV, svgGroups)
}

module.exports = shapesMap

function path (obj, svgUnitsPmm, svgUnitsX, svgUnitsY, svgUnitsV, svgGroups) {
  let pathCag = new CAG()
  let paths = {}
  const on = '' // not sure

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
  let sx = 0     // starting position
  let sy = 0
  let cx = 0     // current position
  let cy = 0
  let pi = 0     // current path index
  let pathName = on + pi // current path name
  let pc = false // current path closed
  let bx = 0     // 2nd control point from previous C command
  let by = 0     // 2nd control point from previous C command
  let qx = 0     // 2nd control point from previous Q command
  let qy = 0     // 2nd control point from previous Q command

  for (let j = 0; j < obj.commands.length; j++) {
    var co = obj.commands[j]
    var pts = co.p
    // console.log('postion: ['+cx+','+cy+'] before '+co.c);
    switch (co.c) {
      case 'm': // relative move to X,Y
      // special case, if at beginning of path then treat like absolute M
        if (j === 0) {
          cx = 0; cy = 0
        }
      // close the previous path
        if (pi > 0 && pc === false) {
          paths[pathName].expandToCAG(CSG.defaultResolution2D)
          // code += indent + pathName + ' = ' + pathName + '.expandToCAG(' + r + ',CSG.defaultResolution2D);\n'
        }
      // open a new path
        if (pts.length >= 2) {
          cx = cx + parseFloat(pts.shift())
          cy = cy + parseFloat(pts.shift())
          pi++
          pathName = on + pi
          pc = false
          paths[pathName] = new CSG.Path2D([[svg2cagX(cx, svgUnitsPmm), svg2cagY(cy, svgUnitsPmm)]], false)
          sx = cx; sy = cy
        }
      // optional implicit relative lineTo (cf SVG spec 8.3.2)
        while (pts.length >= 2) {
          cx = cx + parseFloat(pts.shift())
          cy = cy + parseFloat(pts.shift())
          paths[pathName].appendPoint([svg2cagX(cx, svgUnitsPmm), svg2cagY(cy, svgUnitsPmm)])
        }
        break
      case 'M': // absolute move to X,Y
      // close the previous path
        if (pi > 0 && pc === false) {
          paths[pathName] = paths[pathName].expandToCAG(CSG.defaultResolution2D)
        }
      // open a new path
        if (pts.length >= 2) {
          cx = parseFloat(pts.shift())
          cy = parseFloat(pts.shift())
          pi++
          pathName = on + pi
          pc = false
          paths[pathName] = new CSG.Path2D([[svg2cagX(cx, svgUnitsPmm), svg2cagY(cy, svgUnitsPmm)]], false)
          sx = cx; sy = cy
        }
      // optional implicit absolute lineTo (cf SVG spec 8.3.2)
        while (pts.length >= 2) {
          cx = parseFloat(pts.shift())
          cy = parseFloat(pts.shift())
          paths[pathName].appendPoint([svg2cagX(cx, svgUnitsPmm), svg2cagY(cy, svgUnitsPmm)])
        }
        break
      case 'a': // relative elliptical arc
        while (pts.length >= 7) {
          var rx = parseFloat(pts.shift())
          var ry = parseFloat(pts.shift())
          var ro = 0 - parseFloat(pts.shift())
          var lf = (pts.shift() === '1')
          var sf = (pts.shift() === '1')
          cx = cx + parseFloat(pts.shift())
          cy = cy + parseFloat(pts.shift())
          paths[pathName].appendArc([svg2cagX(cx, svgUnitsPmm), svg2cagY(cy, svgUnitsPmm)], {xradius: svg2cagX(rx, svgUnitsPmm), yradius: svg2cagY(ry, svgUnitsPmm), xaxisrotation: ro, clockwise: sf, large: lf})
        }
        break
      case 'A': // absolute elliptical arc
        while (pts.length >= 7) {
          var rx = parseFloat(pts.shift())
          var ry = parseFloat(pts.shift())
          var ro = 0 - parseFloat(pts.shift())
          var lf = (pts.shift() === '1')
          var sf = (pts.shift() === '1')
          cx = parseFloat(pts.shift())
          cy = parseFloat(pts.shift())
          paths[pathName].appendArc([svg2cagX(cx, svgUnitsPmm), svg2cagY(cy, svgUnitsPmm)], {xradius: svg2cagX(rx, svgUnitsPmm), yradius: svg2cagY(ry, svgUnitsPmm), xaxisrotation: ro, clockwise: sf, large: lf})
        }
        break
      case 'c': // relative cubic Bézier
        while (pts.length >= 6) {
          var x1 = cx + parseFloat(pts.shift())
          var y1 = cy + parseFloat(pts.shift())
          bx = cx + parseFloat(pts.shift())
          by = cy + parseFloat(pts.shift())
          cx = cx + parseFloat(pts.shift())
          cy = cy + parseFloat(pts.shift())
          paths[pathName] = paths[pathName].appendBezier([[svg2cagX(x1, svgUnitsPmm), svg2cagY(y1, svgUnitsPmm)], [svg2cagX(bx, svgUnitsPmm), svg2cagY(by, svgUnitsPmm)], [svg2cagX(cx, svgUnitsPmm), svg2cagY(cy, svgUnitsPmm)]])
          var rf = reflect(bx, by, cx, cy)
          bx = rf[0]
          by = rf[1]
        }
        break
      case 'C': // absolute cubic Bézier
        while (pts.length >= 6) {
          var x1 = parseFloat(pts.shift())
          var y1 = parseFloat(pts.shift())
          bx = parseFloat(pts.shift())
          by = parseFloat(pts.shift())
          cx = parseFloat(pts.shift())
          cy = parseFloat(pts.shift())
          paths[pathName] = paths[pathName].appendBezier([[svg2cagX(x1, svgUnitsPmm), svg2cagY(y1, svgUnitsPmm)], [svg2cagX(bx, svgUnitsPmm), svg2cagY(by, svgUnitsPmm)], [svg2cagX(cx, svgUnitsPmm), svg2cagY(cy, svgUnitsPmm)]])
          var rf = reflect(bx, by, cx, cy)
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
          paths[pathName] = paths[pathName].appendBezier([[svg2cagX(qx, svgUnitsPmm), svg2cagY(qy, svgUnitsPmm)], [svg2cagX(qx, svgUnitsPmm), svg2cagY(qy, svgUnitsPmm)], [svg2cagX(cx, svgUnitsPmm), svg2cagY(cy, svgUnitsPmm)]])
          var rf = reflect(qx, qy, cx, cy)
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
          paths[pathName] = paths[pathName].appendBezier([[svg2cagX(qx, svgUnitsPmm), svg2cagY(qy, svgUnitsPmm)], [svg2cagX(qx, svgUnitsPmm), svg2cagY(qy, svgUnitsPmm)], [svg2cagX(cx, svgUnitsPmm), svg2cagY(cy, svgUnitsPmm)]])
          var rf = reflect(qx, qy, cx, cy)
          qx = rf[0]
          qy = rf[1]
        }
        break
      case 't': // relative quadratic Bézier shorthand
        while (pts.length >= 2) {
          cx = cx + parseFloat(pts.shift())
          cy = cy + parseFloat(pts.shift())
          paths[pathName] = paths[pathName].appendBezier([[svg2cagX(qx, svgUnitsPmm), svg2cagY(qy, svgUnitsPmm)], [svg2cagX(qx, svgUnitsPmm), svg2cagY(qy, svgUnitsPmm)], [cx, cy]])
          var rf = reflect(qx, qy, cx, cy)
          qx = rf[0]
          qy = rf[1]
        }
        break
      case 'T': // absolute quadratic Bézier shorthand
        while (pts.length >= 2) {
          cx = parseFloat(pts.shift())
          cy = parseFloat(pts.shift())
          paths[pathName] = paths[pathName].appendBezier([[svg2cagX(qx, svgUnitsPmm), svg2cagY(qy, svgUnitsPmm)], [svg2cagX(qx, svgUnitsPmm), svg2cagY(qy, svgUnitsPmm)], [svg2cagX(cx, svgUnitsPmm), svg2cagY(cy, svgUnitsPmm)]])
          var rf = reflect(qx, qy, cx, cy)
          qx = rf[0]
          qy = rf[1]
        }
        break
      case 's': // relative cubic Bézier shorthand
        while (pts.length >= 4) {
          var x1 = bx // reflection of 2nd control point from previous C
          var y1 = by // reflection of 2nd control point from previous C
          bx = cx + parseFloat(pts.shift())
          by = cy + parseFloat(pts.shift())
          cx = cx + parseFloat(pts.shift())
          cy = cy + parseFloat(pts.shift())
          paths[pathName] = paths[pathName].appendBezier([[svg2cagX(x1, svgUnitsPmm), svg2cagY(y1, svgUnitsPmm)], [svg2cagX(bx, svgUnitsPmm), svg2cagY(by, svgUnitsPmm)], [svg2cagX(cx, svgUnitsPmm), svg2cagY(cy, svgUnitsPmm)]])
          var rf = reflect(bx, by, cx, cy)
          bx = rf[0]
          by = rf[1]
        }
        break
      case 'S': // absolute cubic Bézier shorthand
        while (pts.length >= 4) {
          var x1 = bx // reflection of 2nd control point from previous C
          var y1 = by // reflection of 2nd control point from previous C
          bx = parseFloat(pts.shift())
          by = parseFloat(pts.shift())
          cx = parseFloat(pts.shift())
          cy = parseFloat(pts.shift())
          paths[pathName] = paths[pathName].appendBezier([[svg2cagX(x1, svgUnitsPmm), svg2cagY(y1, svgUnitsPmm)], [svg2cagX(bx, svgUnitsPmm), svg2cagY(by, svgUnitsPmm)], [svg2cagX(cx, svgUnitsPmm), svg2cagY(cy, svgUnitsPmm)]])
          var rf = reflect(bx, by, cx, cy)
          bx = rf[0]
          by = rf[1]
        }
        break
      case 'h': // relative Horzontal line to
        while (pts.length >= 1) {
          cx = cx + parseFloat(pts.shift())
          paths[pathName] = paths[pathName].appendPoint([svg2cagX(cx, svgUnitsPmm), svg2cagY(cy, svgUnitsPmm)])
        }
        break
      case 'H': // absolute Horzontal line to
        while (pts.length >= 1) {
          cx = parseFloat(pts.shift())
          paths[pathName] = paths[pathName].appendPoint([svg2cagX(cx, svgUnitsPmm), svg2cagY(cy, svgUnitsPmm)])
        }
        break
      case 'l': // relative line to
        while (pts.length >= 2) {
          cx = cx + parseFloat(pts.shift())
          cy = cy + parseFloat(pts.shift())
          paths[pathName] = paths[pathName].appendPoint([svg2cagX(cx, svgUnitsPmm), svg2cagY(cy, svgUnitsPmm)])
        }
        break
      case 'L': // absolute line to
        while (pts.length >= 2) {
          cx = parseFloat(pts.shift())
          cy = parseFloat(pts.shift())
          paths[pathName] = paths[pathName].appendPoint([svg2cagX(cx, svgUnitsPmm), svg2cagY(cy, svgUnitsPmm)])
        }
        break
      case 'v': // relative Vertical line to
        while (pts.length >= 1) {
          cy = cy + parseFloat(pts.shift())
          paths[pathName] = paths[pathName].appendPoint([svg2cagX(cx, svgUnitsPmm), svg2cagY(cy, svgUnitsPmm)])
        }
        break
      case 'V': // absolute Vertical line to
        while (pts.length >= 1) {
          cy = parseFloat(pts.shift())
          paths[pathName] = paths[pathName].appendPoint([svg2cagX(cx, svgUnitsPmm), svg2cagY(cy, svgUnitsPmm)])
        }
        break
      case 'z': // close current line
      case 'Z':
        paths[pathName] = paths[pathName].close().innerToCAG()
        pathCag = pathCag.union(paths[pathName])
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
    paths[pathName] = paths[pathName].expandToCAG(r, CSG.defaultResolution2D)
    pathCag = pathCag.union(paths[pathName])
  }
  return pathCag
}
