const { geometry, primitives } = require('@jscad/csg')

const { svg2cagX, svg2cagY, cagLengthX, cagLengthY, cagLengthP, reflect, groupValue } = require('./helpers')
const { cssPxUnit } = require('./constants')

const shapesMapCsg = (obj, objectify, params) => {
  const { svgUnitsPmm, svgUnitsX, svgUnitsY, svgUnitsV, svgGroups, target } = params

  const types = {
    group: (obj) => objectify({ target }, obj),

    rect: (obj, svgUnitsPmm, svgUnitsX, svgUnitsY) => {
      let x = cagLengthX(obj.x, svgUnitsPmm, svgUnitsX)
      let y = (0 - cagLengthY(obj.y, svgUnitsPmm, svgUnitsY))
      const w = cagLengthX(obj.width, svgUnitsPmm, svgUnitsX)
      const h = cagLengthY(obj.height, svgUnitsPmm, svgUnitsY)
      const rx = cagLengthX(obj.rx, svgUnitsPmm, svgUnitsX)
      // const ry = cagLengthY(obj.ry, svgUnitsPmm, svgUnitsY)

      let shape
      if (w > 0 && h > 0) {
        x = (x + (w / 2)).toFixed(4) // position the object via the center
        y = (y - (h / 2)).toFixed(4) // position the object via the center
        if (rx === 0) {
          shape = primitives.rectangle({ center: [x, y], size: [w / 2, h / 2] })
        } else {
          shape = primitives.roundedRectangle({ center: [x, y], size: [w / 2, h / 2], roundRadius: rx })
        }
        if (target === '1D') {
          shape = geometry.path2.fromPoints({ }, geometry.geom2.toPoints(shape))
        }
      }
      return shape
    },

    circle: (obj, svgUnitsPmm, svgUnitsX, svgUnitsY, svgUnitsV) => {
      const x = cagLengthX(obj.x, svgUnitsPmm, svgUnitsX)
      const y = (0 - cagLengthY(obj.y, svgUnitsPmm, svgUnitsY))
      const r = cagLengthP(obj.radius, svgUnitsPmm, svgUnitsV)

      let shape
      if (r > 0) {
        shape = primitives.circle({ center: [x, y], radius: r })
        if (target === '1D') {
          shape = geometry.path2.fromPoints({}, geometry.geom2.toPoints(shape))
        }
      }
      return shape
    },

    ellipse: (obj, svgUnitsPmm, svgUnitsX, svgUnitsY, svgUnitsV) => {
      const rx = cagLengthX(obj.rx, svgUnitsPmm, svgUnitsX)
      const ry = cagLengthY(obj.ry, svgUnitsPmm, svgUnitsY)
      const cx = cagLengthX(obj.cx, svgUnitsPmm, svgUnitsX)
      const cy = (0 - cagLengthY(obj.cy, svgUnitsPmm, svgUnitsY))

      let shape
      if (rx > 0 && ry > 0) {
        shape = primitives.ellipse({ center: [cx, cy], radius: [rx, ry] })
        if (target === '1D') {
          shape = geometry.path2.fromPoints({}, geometry.geom2.toPoints(shape))
        }
      }
      return shape
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

      let shape = primitives.line([[x1, y1], [x2, y2]])
      if (target === '2D') {
        // FIXME expand if 2D target
      }
      return shape
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
      if (target === '2D') {
        return geometry.geom2.fromPoints(points)
      }
      return geometry.path2.fromPoints({}, points)
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
          let x = cagLengthX(p.x, svgUnitsPmm, svgUnitsX)
          let y = (0 - cagLengthY(p.y, svgUnitsPmm, svgUnitsY))
          points.push([x, y])
        }
      }

      let shape = primitives.line(points)
      if (target === '2D') {
        // FIXME expand if 2D target
        // .expandToCAG(r, CSG.defaultResolution2D)
      }
      return shape
    },

    path: (obj, svgUnitsPmm, svgUnitsX, svgUnitsY, svgUnitsV, svgGroups) => {
      let listofpaths = expandPath(obj, svgUnitsPmm, svgUnitsX, svgUnitsY, svgUnitsV, svgGroups)
      // order is important
      let shapes
      let listofentries = Object.entries(listofpaths).sort((a, b) => a[0].localeCompare(b[0]))
      if (target === '2D') {
        // convert each path to geometry
        for (let [key, path] of listofentries) {
          // FIXME this needs to be implemented once extrude is available
          // if closed then create a 2D geometry
        }
      }
      if (target === '1D') {
        shapes = listofentries.map((entry) => entry[1])
        // if (listofentries.length !== 1) throw new Error('malformed path specification')
        // for (let [key, path] of listofentries) {
        //   shapes = path
        // }
      }
      return shapes
      /*
        switch (closedpath.getTurn()) {
          default:
          case 'clockwise':
            pathCag = pathCag.union(paths[pathName])
            break;
          case 'counter-clockwise':
            pathCag = pathCag.subtract(paths[pathName])
            break;
        }
      paths[pathName] = paths[pathName] // .expandToCAG(r, CSG.defaultResolution2D)
      pathCag = pathCag.union(paths[pathName])
      */
    }
  }
  return types[obj.type](obj, svgUnitsPmm, svgUnitsX, svgUnitsY, svgUnitsV, svgGroups)
}

module.exports = shapesMapCsg

const expandPath = (obj, svgUnitsPmm, svgUnitsX, svgUnitsY, svgUnitsV, svgGroups) => {
  let paths = {}
  const on = 'path'

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
          // FIXME paths[pathName] =  paths[pathName]
        }
        // open a new path
        if (pts.length >= 2) {
          cx = cx + parseFloat(pts.shift())
          cy = cy + parseFloat(pts.shift())
          pi++
          pathName = on + pi
          pc = false
          paths[pathName] = geometry.path2.fromPoints({ }, [[svg2cagX(cx, svgUnitsPmm), svg2cagY(cy, svgUnitsPmm)]])
          sx = cx; sy = cy
        }
        // optional implicit relative lineTo (cf SVG spec 8.3.2)
        while (pts.length >= 2) {
          cx = cx + parseFloat(pts.shift())
          cy = cy + parseFloat(pts.shift())
          paths[pathName] = geometry.path2.appendPoints([[svg2cagX(cx, svgUnitsPmm), svg2cagY(cy, svgUnitsPmm)]], paths[pathName])
        }
        break
      case 'M': // absolute move to X,Y
        // close the previous path
        if (pi > 0 && pc === false) {
          // FIXME paths[pathName] = paths[pathName]
        }
        // open a new path
        if (pts.length >= 2) {
          cx = parseFloat(pts.shift())
          cy = parseFloat(pts.shift())
          pi++
          pathName = on + pi
          pc = false
          paths[pathName] = geometry.path2.fromPoints({ }, [[svg2cagX(cx, svgUnitsPmm), svg2cagY(cy, svgUnitsPmm)]])
          sx = cx; sy = cy
        }
        // optional implicit absolute lineTo (cf SVG spec 8.3.2)
        while (pts.length >= 2) {
          cx = parseFloat(pts.shift())
          cy = parseFloat(pts.shift())
          paths[pathName] = geometry.path2.appendPoints([[svg2cagX(cx, svgUnitsPmm), svg2cagY(cy, svgUnitsPmm)]], paths[pathName])
        }
        break
      case 'a': // relative elliptical arc
        while (pts.length >= 7) {
          let rx = parseFloat(pts.shift())
          let ry = parseFloat(pts.shift())
          let ro = 0 - parseFloat(pts.shift()) * 0.017453292519943295 // radians
          let lf = (pts.shift() === '1')
          let sf = (pts.shift() === '1')
          cx = cx + parseFloat(pts.shift())
          cy = cy + parseFloat(pts.shift())
          paths[pathName] = geometry.path2.appendArc({ endpoint: [svg2cagX(cx, svgUnitsPmm), svg2cagY(cy, svgUnitsPmm)], radius: [svg2cagX(rx, svgUnitsPmm), svg2cagY(ry, svgUnitsPmm)], xaxisrotation: ro, clockwise: sf, large: lf }, paths[pathName])
        }
        break
      case 'A': // absolute elliptical arc
        while (pts.length >= 7) {
          let rx = parseFloat(pts.shift())
          let ry = parseFloat(pts.shift())
          let ro = 0 - parseFloat(pts.shift()) * 0.017453292519943295 // radians
          let lf = (pts.shift() === '1')
          let sf = (pts.shift() === '1')
          cx = parseFloat(pts.shift())
          cy = parseFloat(pts.shift())
          paths[pathName] = geometry.path2.appendArc({ endpoint: [svg2cagX(cx, svgUnitsPmm), svg2cagY(cy, svgUnitsPmm)], radius: [svg2cagX(rx, svgUnitsPmm), svg2cagY(ry, svgUnitsPmm)], xaxisrotation: ro, clockwise: sf, large: lf }, paths[pathName])
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
          paths[pathName] = geometry.path2.appendBezier({ controlPoints: [[svg2cagX(x1, svgUnitsPmm), svg2cagY(y1, svgUnitsPmm)], [svg2cagX(bx, svgUnitsPmm), svg2cagY(by, svgUnitsPmm)], [svg2cagX(cx, svgUnitsPmm), svg2cagY(cy, svgUnitsPmm)]] }, paths[pathName])
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
          paths[pathName] = geometry.path2.appendBezier({ controlPoints: [[svg2cagX(x1, svgUnitsPmm), svg2cagY(y1, svgUnitsPmm)], [svg2cagX(bx, svgUnitsPmm), svg2cagY(by, svgUnitsPmm)], [svg2cagX(cx, svgUnitsPmm), svg2cagY(cy, svgUnitsPmm)]] }, paths[pathName])
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
          paths[pathName] = geometry.path2.appendBezier({ controlPoints: [[svg2cagX(qx, svgUnitsPmm), svg2cagY(qy, svgUnitsPmm)], [svg2cagX(qx, svgUnitsPmm), svg2cagY(qy, svgUnitsPmm)], [svg2cagX(cx, svgUnitsPmm), svg2cagY(cy, svgUnitsPmm)]] }, paths[pathName])
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
          paths[pathName] = paths[pathName].appendBezier([[svg2cagX(qx, svgUnitsPmm), svg2cagY(qy, svgUnitsPmm)], [svg2cagX(qx, svgUnitsPmm), svg2cagY(qy, svgUnitsPmm)], [svg2cagX(cx, svgUnitsPmm), svg2cagY(cy, svgUnitsPmm)]])
          let rf = reflect(qx, qy, cx, cy)
          qx = rf[0]
          qy = rf[1]
        }
        break
      case 't': // relative quadratic Bézier shorthand
        while (pts.length >= 2) {
          cx = cx + parseFloat(pts.shift())
          cy = cy + parseFloat(pts.shift())
          paths[pathName] = paths[pathName].appendBezier([[svg2cagX(qx, svgUnitsPmm), svg2cagY(qy, svgUnitsPmm)], [svg2cagX(qx, svgUnitsPmm), svg2cagY(qy, svgUnitsPmm)], [cx, cy]])
          let rf = reflect(qx, qy, cx, cy)
          qx = rf[0]
          qy = rf[1]
        }
        break
      case 'T': // absolute quadratic Bézier shorthand
        while (pts.length >= 2) {
          cx = parseFloat(pts.shift())
          cy = parseFloat(pts.shift())
          paths[pathName] = paths[pathName].appendBezier([[svg2cagX(qx, svgUnitsPmm), svg2cagY(qy, svgUnitsPmm)], [svg2cagX(qx, svgUnitsPmm), svg2cagY(qy, svgUnitsPmm)], [svg2cagX(cx, svgUnitsPmm), svg2cagY(cy, svgUnitsPmm)]])
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
          paths[pathName] = paths[pathName].appendBezier([[svg2cagX(x1, svgUnitsPmm), svg2cagY(y1, svgUnitsPmm)], [svg2cagX(bx, svgUnitsPmm), svg2cagY(by, svgUnitsPmm)], [svg2cagX(cx, svgUnitsPmm), svg2cagY(cy, svgUnitsPmm)]])
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
          paths[pathName] = paths[pathName].appendBezier([[svg2cagX(x1, svgUnitsPmm), svg2cagY(y1, svgUnitsPmm)], [svg2cagX(bx, svgUnitsPmm), svg2cagY(by, svgUnitsPmm)], [svg2cagX(cx, svgUnitsPmm), svg2cagY(cy, svgUnitsPmm)]])
          let rf = reflect(bx, by, cx, cy)
          bx = rf[0]
          by = rf[1]
        }
        break
      case 'h': // relative Horzontal line to
        while (pts.length >= 1) {
          cx = cx + parseFloat(pts.shift())
          paths[pathName] = geometry.path2.appendPoints([[svg2cagX(cx, svgUnitsPmm), svg2cagY(cy, svgUnitsPmm)]], paths[pathName])
        }
        break
      case 'H': // absolute Horzontal line to
        while (pts.length >= 1) {
          cx = parseFloat(pts.shift())
          paths[pathName] = geometry.path2.appendPoints([[svg2cagX(cx, svgUnitsPmm), svg2cagY(cy, svgUnitsPmm)]], paths[pathName])
        }
        break
      case 'l': // relative line to
        while (pts.length >= 2) {
          cx = cx + parseFloat(pts.shift())
          cy = cy + parseFloat(pts.shift())
          paths[pathName] = geometry.path2.appendPoints([[svg2cagX(cx, svgUnitsPmm), svg2cagY(cy, svgUnitsPmm)]], paths[pathName])
        }
        break
      case 'L': // absolute line to
        while (pts.length >= 2) {
          cx = parseFloat(pts.shift())
          cy = parseFloat(pts.shift())
          paths[pathName] = geometry.path2.appendPoints([[svg2cagX(cx, svgUnitsPmm), svg2cagY(cy, svgUnitsPmm)]], paths[pathName])
        }
        break
      case 'v': // relative Vertical line to
        while (pts.length >= 1) {
          cy = cy + parseFloat(pts.shift())
          paths[pathName] = geometry.path2.appendPoints([[svg2cagX(cx, svgUnitsPmm), svg2cagY(cy, svgUnitsPmm)]], paths[pathName])
        }
        break
      case 'V': // absolute Vertical line to
        while (pts.length >= 1) {
          cy = parseFloat(pts.shift())
          paths[pathName] = geometry.path2.appendPoints([[svg2cagX(cx, svgUnitsPmm), svg2cagY(cy, svgUnitsPmm)]], paths[pathName])
        }
        break
      case 'z': // close current line
      case 'Z':
        let closedpath = geometry.path2.close(paths[pathName])
        paths[pathName] = closedpath
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
  return paths
}
