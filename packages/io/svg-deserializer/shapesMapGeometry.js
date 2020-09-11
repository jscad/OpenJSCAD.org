const { geometries, primitives, transforms } = require('@jscad/modeling')

const { svg2cagX, svg2cagY, cagLengthX, cagLengthY, cagLengthP, reflect } = require('./helpers')
// const { cssPxUnit } = require('./constants')

const shapesMapGeometry = (obj, objectify, params) => {
  const { svgUnitsPmm, svgUnitsX, svgUnitsY, svgUnitsV, svgGroups, target, segments } = params

  const types = {
    group: (obj) => objectify({ target, segments }, obj),

    rect: (obj, svgUnitsPmm, svgUnitsX, svgUnitsY, svgUnitsV, svgGroups, segments) => {
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
          shape = transforms.center({ center: [x, y, 0] }, primitives.rectangle({ size: [w / 2, h / 2] }))
        } else {
          shape = transforms.center({ center: [x, y, 0] }, primitives.roundedRectangle({ segments, size: [w / 2, h / 2], roundRadius: rx }))
        }
        if (target === 'path') {
          shape = geometries.path2.fromPoints({ }, geometries.geom2.toPoints(shape))
        }
      }
      return shape
    },

    circle: (obj, svgUnitsPmm, svgUnitsX, svgUnitsY, svgUnitsV, svgGroups, segments) => {
      const x = cagLengthX(obj.x, svgUnitsPmm, svgUnitsX)
      const y = (0 - cagLengthY(obj.y, svgUnitsPmm, svgUnitsY))
      const r = cagLengthP(obj.radius, svgUnitsPmm, svgUnitsV)

      let shape
      if (r > 0) {
        shape = transforms.center({ center: [x, y, 0] }, primitives.circle({ segments, radius: r }))
        if (target === 'path') {
          shape = geometries.path2.fromPoints({}, geometries.geom2.toPoints(shape))
        }
      }
      return shape
    },

    ellipse: (obj, svgUnitsPmm, svgUnitsX, svgUnitsY, svgUnitsV, svgGroups, segments) => {
      const rx = cagLengthX(obj.rx, svgUnitsPmm, svgUnitsX)
      const ry = cagLengthY(obj.ry, svgUnitsPmm, svgUnitsY)
      const cx = cagLengthX(obj.cx, svgUnitsPmm, svgUnitsX)
      const cy = (0 - cagLengthY(obj.cy, svgUnitsPmm, svgUnitsY))

      let shape
      if (rx > 0 && ry > 0) {
        shape = transforms.center({ center: [cx, cy, 0] }, primitives.ellipse({ segments, radius: [rx, ry] }))
        if (target === 'path') {
          shape = geometries.path2.fromPoints({}, geometries.geom2.toPoints(shape))
        }
      }
      return shape
    },

    line: (obj, svgUnitsPmm, svgUnitsX, svgUnitsY, svgUnitsV) => {
      const x1 = cagLengthX(obj.x1, svgUnitsPmm, svgUnitsX)
      const y1 = (0 - cagLengthY(obj.y1, svgUnitsPmm, svgUnitsY))
      const x2 = cagLengthX(obj.x2, svgUnitsPmm, svgUnitsX)
      const y2 = (0 - cagLengthY(obj.y2, svgUnitsPmm, svgUnitsY))
      // let r = cssPxUnit // default
      // if ('strokeWidth' in obj) {
      //   r = cagLengthP(obj.strokeWidth, svgUnitsPmm, svgUnitsV) / 2
      // } else {
      //   const v = groupValue(svgGroups, 'strokeWidth')
      //   if (v !== null) {
      //     r = cagLengthP(v, svgUnitsPmm, svgUnitsV) / 2
      //   }
      // }

      const shape = primitives.line([[x1, y1], [x2, y2]])
      if (target === 'geom2') {
        // TODO expand if 2D target
      }
      return shape
    },

    polygon: (obj, svgUnitsPmm, svgUnitsX, svgUnitsY) => {
      const points = []
      for (let j = 0; j < obj.points.length; j++) {
        const p = obj.points[j]
        if ('x' in p && 'y' in p) {
          const x = cagLengthX(p.x, svgUnitsPmm, svgUnitsX)
          const y = (0 - cagLengthY(p.y, svgUnitsPmm, svgUnitsY))
          points.push([x, y])
        }
      }
      if (target === 'geom2') {
        return geometries.geom2.fromPoints(points)
      }
      return geometries.path2.fromPoints({}, points)
    },

    polyline: (obj, svgUnitsPmm, svgUnitsX, svgUnitsY, svgUnitsV) => {
      const points = []
      // let r = cssPxUnit // default
      // if ('strokeWidth' in obj) {
      //   r = cagLengthP(obj.strokeWidth, svgUnitsPmm, svgUnitsV) / 2
      // } else {
      //   const v = groupValue(svgGroups, 'strokeWidth')
      //   if (v !== null) {
      //     r = cagLengthP(v, svgUnitsPmm, svgUnitsV) / 2
      //   }
      // }
      for (let j = 0; j < obj.points.length; j++) {
        const p = obj.points[j]
        if ('x' in p && 'y' in p) {
          const x = cagLengthX(p.x, svgUnitsPmm, svgUnitsX)
          const y = (0 - cagLengthY(p.y, svgUnitsPmm, svgUnitsY))
          points.push([x, y])
        }
      }

      const shape = primitives.line(points)
      if (target === 'geom2') {
        // TODO expand if 2D target
        // .expandToCAG(r, CSG.defaultResolution2D)
      }
      return shape
    },

    path: (obj, svgUnitsPmm, svgUnitsX, svgUnitsY, svgUnitsV, svgGroups, segments) => {
      const listofpaths = expandPath(obj, svgUnitsPmm, svgUnitsX, svgUnitsY, svgUnitsV, svgGroups, segments)
      // order is important
      const listofentries = Object.entries(listofpaths).sort((a, b) => a[0].localeCompare(b[0]))
      const shapes = listofentries.map((entry) => {
        const path = entry[1]
        if (target === 'geom2' && path.isClosed) {
          const points = geometries.path2.toPoints(path).slice()
          points.push(points[0]) // add first point again to create closing sides
          return geometries.geom2.fromPoints(points)
        }
        return path
      })
      return shapes
    }
  }

  return types[obj.type](obj, svgUnitsPmm, svgUnitsX, svgUnitsY, svgUnitsV, svgGroups, segments)
}

module.exports = shapesMapGeometry

const expandPath = (obj, svgUnitsPmm, svgUnitsX, svgUnitsY, svgUnitsV, svgGroups, segments) => {
  const paths = {}
  const on = 'path'

  // let r = cssPxUnit // default
  // if ('strokeWidth' in obj) {
  //   r = cagLengthP(obj.strokeWidth, svgUnitsPmm, svgUnitsV) / 2
  // } else {
  //   const v = groupValue(svgGroups, 'strokeWidth')
  //   if (v !== null) {
  //     r = cagLengthP(v, svgUnitsPmm, svgUnitsV) / 2
  //   }
  // }
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
    const co = obj.commands[j]
    const pts = co.p
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
          paths[pathName] = geometries.path2.fromPoints({ }, [[svg2cagX(cx, svgUnitsPmm), svg2cagY(cy, svgUnitsPmm)]])
          sx = cx; sy = cy
        }
        // optional implicit relative lineTo (cf SVG spec 8.3.2)
        while (pts.length >= 2) {
          cx = cx + parseFloat(pts.shift())
          cy = cy + parseFloat(pts.shift())
          paths[pathName] = geometries.path2.appendPoints([[svg2cagX(cx, svgUnitsPmm), svg2cagY(cy, svgUnitsPmm)]], paths[pathName])
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
          paths[pathName] = geometries.path2.fromPoints({ }, [[svg2cagX(cx, svgUnitsPmm), svg2cagY(cy, svgUnitsPmm)]])
          sx = cx; sy = cy
        }
        // optional implicit absolute lineTo (cf SVG spec 8.3.2)
        while (pts.length >= 2) {
          cx = parseFloat(pts.shift())
          cy = parseFloat(pts.shift())
          paths[pathName] = geometries.path2.appendPoints([[svg2cagX(cx, svgUnitsPmm), svg2cagY(cy, svgUnitsPmm)]], paths[pathName])
        }
        break
      case 'a': // relative elliptical arc
        while (pts.length >= 7) {
          const rx = parseFloat(pts.shift())
          const ry = parseFloat(pts.shift())
          const ro = 0 - parseFloat(pts.shift()) * 0.017453292519943295 // radians
          const lf = (pts.shift() === '1')
          const sf = (pts.shift() === '1')
          cx = cx + parseFloat(pts.shift())
          cy = cy + parseFloat(pts.shift())
          paths[pathName] = geometries.path2.appendArc({ segments, endpoint: [svg2cagX(cx, svgUnitsPmm), svg2cagY(cy, svgUnitsPmm)], radius: [svg2cagX(rx, svgUnitsPmm), svg2cagY(ry, svgUnitsPmm)], xaxisrotation: ro, clockwise: sf, large: lf }, paths[pathName])
        }
        break
      case 'A': // absolute elliptical arc
        while (pts.length >= 7) {
          const rx = parseFloat(pts.shift())
          const ry = parseFloat(pts.shift())
          const ro = 0 - parseFloat(pts.shift()) * 0.017453292519943295 // radians
          const lf = (pts.shift() === '1')
          const sf = (pts.shift() === '1')
          cx = parseFloat(pts.shift())
          cy = parseFloat(pts.shift())
          paths[pathName] = geometries.path2.appendArc({ segments, endpoint: [svg2cagX(cx, svgUnitsPmm), svg2cagY(cy, svgUnitsPmm)], radius: [svg2cagX(rx, svgUnitsPmm), svg2cagY(ry, svgUnitsPmm)], xaxisrotation: ro, clockwise: sf, large: lf }, paths[pathName])
        }
        break
      case 'c': // relative cubic Bézier
        while (pts.length >= 6) {
          const x1 = cx + parseFloat(pts.shift())
          const y1 = cy + parseFloat(pts.shift())
          bx = cx + parseFloat(pts.shift())
          by = cy + parseFloat(pts.shift())
          cx = cx + parseFloat(pts.shift())
          cy = cy + parseFloat(pts.shift())
          paths[pathName] = geometries.path2.appendBezier({ segments, controlPoints: [[svg2cagX(x1, svgUnitsPmm), svg2cagY(y1, svgUnitsPmm)], [svg2cagX(bx, svgUnitsPmm), svg2cagY(by, svgUnitsPmm)], [svg2cagX(cx, svgUnitsPmm), svg2cagY(cy, svgUnitsPmm)]] }, paths[pathName])
          const rf = reflect(bx, by, cx, cy)
          bx = rf[0]
          by = rf[1]
        }
        break
      case 'C': // absolute cubic Bézier
        while (pts.length >= 6) {
          const x1 = parseFloat(pts.shift())
          const y1 = parseFloat(pts.shift())
          bx = parseFloat(pts.shift())
          by = parseFloat(pts.shift())
          cx = parseFloat(pts.shift())
          cy = parseFloat(pts.shift())
          paths[pathName] = geometries.path2.appendBezier({ segments, controlPoints: [[svg2cagX(x1, svgUnitsPmm), svg2cagY(y1, svgUnitsPmm)], [svg2cagX(bx, svgUnitsPmm), svg2cagY(by, svgUnitsPmm)], [svg2cagX(cx, svgUnitsPmm), svg2cagY(cy, svgUnitsPmm)]] }, paths[pathName])
          const rf = reflect(bx, by, cx, cy)
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
          paths[pathName] = geometries.path2.appendBezier({ segments, controlPoints: [[svg2cagX(qx, svgUnitsPmm), svg2cagY(qy, svgUnitsPmm)], [svg2cagX(qx, svgUnitsPmm), svg2cagY(qy, svgUnitsPmm)], [svg2cagX(cx, svgUnitsPmm), svg2cagY(cy, svgUnitsPmm)]] }, paths[pathName])
          const rf = reflect(qx, qy, cx, cy)
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
          paths[pathName] = geometries.path2.appendBezier({ segments, controlPoints: [[svg2cagX(qx, svgUnitsPmm), svg2cagY(qy, svgUnitsPmm)], [svg2cagX(qx, svgUnitsPmm), svg2cagY(qy, svgUnitsPmm)], [svg2cagX(cx, svgUnitsPmm), svg2cagY(cy, svgUnitsPmm)]] }, paths[pathName])
          const rf = reflect(qx, qy, cx, cy)
          qx = rf[0]
          qy = rf[1]
        }
        break
      case 't': // relative quadratic Bézier shorthand
        while (pts.length >= 2) {
          cx = cx + parseFloat(pts.shift())
          cy = cy + parseFloat(pts.shift())
          paths[pathName] = geometries.path2.appendBezier({ segments, controlPoints: [[svg2cagX(qx, svgUnitsPmm), svg2cagY(qy, svgUnitsPmm)], [svg2cagX(qx, svgUnitsPmm), svg2cagY(qy, svgUnitsPmm)], [cx, cy]] }, paths[pathName])
          const rf = reflect(qx, qy, cx, cy)
          qx = rf[0]
          qy = rf[1]
        }
        break
      case 'T': // absolute quadratic Bézier shorthand
        while (pts.length >= 2) {
          cx = parseFloat(pts.shift())
          cy = parseFloat(pts.shift())
          paths[pathName] = geometries.path2.appendBezier({ segments, controlPoints: [[svg2cagX(qx, svgUnitsPmm), svg2cagY(qy, svgUnitsPmm)], [svg2cagX(qx, svgUnitsPmm), svg2cagY(qy, svgUnitsPmm)], [svg2cagX(cx, svgUnitsPmm), svg2cagY(cy, svgUnitsPmm)]] }, paths[pathName])
          const rf = reflect(qx, qy, cx, cy)
          qx = rf[0]
          qy = rf[1]
        }
        break
      case 's': // relative cubic Bézier shorthand
        while (pts.length >= 4) {
          const x1 = bx // reflection of 2nd control point from previous C
          const y1 = by // reflection of 2nd control point from previous C
          bx = cx + parseFloat(pts.shift())
          by = cy + parseFloat(pts.shift())
          cx = cx + parseFloat(pts.shift())
          cy = cy + parseFloat(pts.shift())
          paths[pathName] = geometries.path2.appendBezier({ segments, controlPoints: [[svg2cagX(x1, svgUnitsPmm), svg2cagY(y1, svgUnitsPmm)], [svg2cagX(bx, svgUnitsPmm), svg2cagY(by, svgUnitsPmm)], [svg2cagX(cx, svgUnitsPmm), svg2cagY(cy, svgUnitsPmm)]] }, paths[pathName])
          const rf = reflect(bx, by, cx, cy)
          bx = rf[0]
          by = rf[1]
        }
        break
      case 'S': // absolute cubic Bézier shorthand
        while (pts.length >= 4) {
          const x1 = bx // reflection of 2nd control point from previous C
          const y1 = by // reflection of 2nd control point from previous C
          bx = parseFloat(pts.shift())
          by = parseFloat(pts.shift())
          cx = parseFloat(pts.shift())
          cy = parseFloat(pts.shift())
          paths[pathName] = geometries.path2.appendBezier({ segments, controlPoints: [[svg2cagX(x1, svgUnitsPmm), svg2cagY(y1, svgUnitsPmm)], [svg2cagX(bx, svgUnitsPmm), svg2cagY(by, svgUnitsPmm)], [svg2cagX(cx, svgUnitsPmm), svg2cagY(cy, svgUnitsPmm)]] }, paths[pathName])
          const rf = reflect(bx, by, cx, cy)
          bx = rf[0]
          by = rf[1]
        }
        break
      case 'h': // relative Horzontal line to
        while (pts.length >= 1) {
          cx = cx + parseFloat(pts.shift())
          paths[pathName] = geometries.path2.appendPoints([[svg2cagX(cx, svgUnitsPmm), svg2cagY(cy, svgUnitsPmm)]], paths[pathName])
        }
        break
      case 'H': // absolute Horzontal line to
        while (pts.length >= 1) {
          cx = parseFloat(pts.shift())
          paths[pathName] = geometries.path2.appendPoints([[svg2cagX(cx, svgUnitsPmm), svg2cagY(cy, svgUnitsPmm)]], paths[pathName])
        }
        break
      case 'l': // relative line to
        while (pts.length >= 2) {
          cx = cx + parseFloat(pts.shift())
          cy = cy + parseFloat(pts.shift())
          paths[pathName] = geometries.path2.appendPoints([[svg2cagX(cx, svgUnitsPmm), svg2cagY(cy, svgUnitsPmm)]], paths[pathName])
        }
        break
      case 'L': // absolute line to
        while (pts.length >= 2) {
          cx = parseFloat(pts.shift())
          cy = parseFloat(pts.shift())
          paths[pathName] = geometries.path2.appendPoints([[svg2cagX(cx, svgUnitsPmm), svg2cagY(cy, svgUnitsPmm)]], paths[pathName])
        }
        break
      case 'v': // relative Vertical line to
        while (pts.length >= 1) {
          cy = cy + parseFloat(pts.shift())
          paths[pathName] = geometries.path2.appendPoints([[svg2cagX(cx, svgUnitsPmm), svg2cagY(cy, svgUnitsPmm)]], paths[pathName])
        }
        break
      case 'V': // absolute Vertical line to
        while (pts.length >= 1) {
          cy = parseFloat(pts.shift())
          paths[pathName] = geometries.path2.appendPoints([[svg2cagX(cx, svgUnitsPmm), svg2cagY(cy, svgUnitsPmm)]], paths[pathName])
        }
        break
      case 'z': // close current line
      case 'Z':
        paths[pathName] = geometries.path2.close(paths[pathName])
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
