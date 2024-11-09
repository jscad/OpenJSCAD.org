const { geometries, primitives } = require('@jscad/modeling')

const { svg2cag, cagLengthX, cagLengthY, cagLengthP, reflect } = require('./helpers')

const shapesMapGeometry = (obj, objectify, params) => {
  const { svgUnitsPmm, svgUnitsX, svgUnitsY, svgUnitsV, svgGroups, target, segments, pathSelfClosed } = params

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
        x = (x + (w / 2)) // position the object via the center
        y = (y - (h / 2)) // position the object via the center
        if (rx === 0) {
          shape = primitives.rectangle({ center: [x, y], size: [w, h] })
        } else {
          shape = primitives.roundedRectangle({ center: [x, y], segments, size: [w, h], roundRadius: rx })
        }
        if (target === 'path') {
          shape = geometries.path2.fromPoints({ closed: true }, geometries.geom2.toPoints(shape))
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
        shape = primitives.circle({ center: [x, y], segments, radius: r })
        if (target === 'path') {
          shape = geometries.path2.fromPoints({ closed: true }, geometries.geom2.toPoints(shape))
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
        shape = primitives.ellipse({ center: [cx, cy], segments, radius: [rx, ry] })
        if (target === 'path') {
          shape = geometries.path2.fromPoints({ closed: true }, geometries.geom2.toPoints(shape))
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
      const listofpaths = expandPath(obj, svgUnitsPmm, svgUnitsX, svgUnitsY, svgUnitsV, svgGroups, segments, pathSelfClosed)
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

const appendPoints = (points, geometry) => {
  if (geometry) return geometries.path2.appendPoints(points, geometry)
  return geometries.path2.fromPoints({ }, points)
}

const expandPath = (obj, svgUnitsPmm, svgUnitsX, svgUnitsY, svgUnitsV, svgGroups, segments, pathSelfClosed) => {
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

  const newPath = () => {
    pi++
    pathName = on + pi
    pc = false
  }
  const ensurePath = () => {
    if (!paths[pathName]) paths[pathName] = geometries.path2.fromPoints({}, [])
  }
  for (let j = 0; j < obj.commands.length; j++) {
    const co = obj.commands[j]
    const pts = co.p
    let i = 0
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
        if (pts.length >= i + 2) {
          cx = cx + parseFloat(pts[i++])
          cy = cy + parseFloat(pts[i++])
          newPath()
          paths[pathName] = appendPoints([svg2cag([cx, cy], svgUnitsPmm)])
          sx = cx; sy = cy
        }
        // optional implicit relative lineTo (cf SVG spec 8.3.2)
        while (pts.length >= i + 2) {
          cx = cx + parseFloat(pts[i++])
          cy = cy + parseFloat(pts[i++])
          paths[pathName] = appendPoints([svg2cag([cx, cy], svgUnitsPmm)], paths[pathName])
        }
        break
      case 'M': // absolute move to X,Y
        // close the previous path
        if (pi > 0 && pc === false) {
          // FIXME paths[pathName] = paths[pathName]
        }
        // open a new path
        if (pts.length >= i + 2) {
          cx = parseFloat(pts[i++])
          cy = parseFloat(pts[i++])
          newPath()
          paths[pathName] = appendPoints([svg2cag([cx, cy], svgUnitsPmm)])
          sx = cx; sy = cy
        }
        // optional implicit absolute lineTo (cf SVG spec 8.3.2)
        while (pts.length >= i + 2) {
          cx = parseFloat(pts[i++])
          cy = parseFloat(pts[i++])
          paths[pathName] = appendPoints([svg2cag([cx, cy], svgUnitsPmm)], paths[pathName])
        }
        break
      case 'a': // relative elliptical arc
        while (pts.length >= i + 7) {
          const rx = parseFloat(pts[i++])
          const ry = parseFloat(pts[i++])
          const ro = 0 - parseFloat(pts[i++]) * 0.017453292519943295 // radians
          const lf = (pts[i++] === '1')
          const sf = (pts[i++] === '1')
          cx = cx + parseFloat(pts[i++])
          cy = cy + parseFloat(pts[i++])
          ensurePath()
          paths[pathName] = geometries.path2.appendArc({
            segments,
            endpoint: svg2cag([cx, cy], svgUnitsPmm),
            radius: svg2cag([rx, ry], svgUnitsPmm),
            xaxisrotation: ro,
            clockwise: sf,
            large: lf
          }, paths[pathName])
        }
        break
      case 'A': // absolute elliptical arc
        while (pts.length >= i + 7) {
          const rx = parseFloat(pts[i++])
          const ry = parseFloat(pts[i++])
          const ro = 0 - parseFloat(pts[i++]) * 0.017453292519943295 // radians
          const lf = (pts[i++] === '1')
          const sf = (pts[i++] === '1')
          cx = parseFloat(pts[i++])
          cy = parseFloat(pts[i++])
          ensurePath()
          paths[pathName] = geometries.path2.appendArc({
            segments,
            endpoint: svg2cag([cx, cy], svgUnitsPmm),
            radius: svg2cag([rx, ry], svgUnitsPmm),
            xaxisrotation: ro,
            clockwise: sf,
            large: lf
          }, paths[pathName])
        }
        break
      case 'c': // relative cubic Bézier
        while (pts.length >= i + 6) {
          const x1 = cx + parseFloat(pts[i++])
          const y1 = cy + parseFloat(pts[i++])
          bx = cx + parseFloat(pts[i++])
          by = cy + parseFloat(pts[i++])
          cx = cx + parseFloat(pts[i++])
          cy = cy + parseFloat(pts[i++])
          ensurePath()
          paths[pathName] = geometries.path2.appendBezier({
            segments,
            controlPoints: [
              svg2cag([x1, y1], svgUnitsPmm),
              svg2cag([bx, by], svgUnitsPmm),
              svg2cag([cx, cy], svgUnitsPmm)
            ]
          }, paths[pathName])
          const rf = reflect(bx, by, cx, cy)
          bx = rf[0]
          by = rf[1]
        }
        break
      case 'C': // absolute cubic Bézier
        while (pts.length >= i + 6) {
          const x1 = parseFloat(pts[i++])
          const y1 = parseFloat(pts[i++])
          bx = parseFloat(pts[i++])
          by = parseFloat(pts[i++])
          cx = parseFloat(pts[i++])
          cy = parseFloat(pts[i++])
          ensurePath()
          paths[pathName] = geometries.path2.appendBezier({
            segments,
            controlPoints: [
              svg2cag([x1, y1], svgUnitsPmm),
              svg2cag([bx, by], svgUnitsPmm),
              svg2cag([cx, cy], svgUnitsPmm)
            ]
          }, paths[pathName])
          const rf = reflect(bx, by, cx, cy)
          bx = rf[0]
          by = rf[1]
        }
        break
      case 'q': // relative quadratic Bézier
        while (pts.length >= i + 4) {
          const p0 = [cx, cy] // previous point
          qx = cx + parseFloat(pts[i++])
          qy = cy + parseFloat(pts[i++])
          cx = cx + parseFloat(pts[i++])
          cy = cy + parseFloat(pts[i++])
          const q1 = [p0[0] + (2 / 3) * (qx - p0[0]), p0[1] + (2 / 3) * (qy - p0[1])]
          const q2 = [q1[0] + (1 / 3) * (cx - p0[0]), q1[1] + (1 / 3) * (cy - p0[1])]
          ensurePath()
          paths[pathName] = geometries.path2.appendBezier({
            segments,
            controlPoints: [
              svg2cag(q1, svgUnitsPmm),
              svg2cag(q2, svgUnitsPmm),
              svg2cag([cx, cy], svgUnitsPmm)
            ]
          }, paths[pathName])
          const rf = reflect(qx, qy, cx, cy)
          qx = rf[0]
          qy = rf[1]
        }
        break
      case 'Q': // absolute quadratic Bézier
        while (pts.length >= i + 4) {
          const p0 = [cx, cy] // previous point
          qx = parseFloat(pts[i++])
          qy = parseFloat(pts[i++])
          cx = parseFloat(pts[i++])
          cy = parseFloat(pts[i++])
          const q1 = [p0[0] + (2 / 3) * (qx - p0[0]), p0[1] + (2 / 3) * (qy - p0[1])]
          const q2 = [q1[0] + (1 / 3) * (cx - p0[0]), q1[1] + (1 / 3) * (cy - p0[1])]
          ensurePath()
          paths[pathName] = geometries.path2.appendBezier({
            segments,
            controlPoints: [
              svg2cag(q1, svgUnitsPmm),
              svg2cag(q2, svgUnitsPmm),
              svg2cag([cx, cy], svgUnitsPmm)
            ]
          }, paths[pathName])
          const rf = reflect(qx, qy, cx, cy)
          qx = rf[0]
          qy = rf[1]
        }
        break
      case 't': // relative quadratic Bézier shorthand
        while (pts.length >= i + 2) {
          const p0 = [cx, cy] // previous point
          cx = cx + parseFloat(pts[i++])
          cy = cy + parseFloat(pts[i++])
          const q1 = [p0[0] + (2 / 3) * (qx - p0[0]), p0[1] + (2 / 3) * (qy - p0[1])]
          const q2 = [q1[0] + (1 / 3) * (cx - p0[0]), q1[1] + (1 / 3) * (cy - p0[1])]
          ensurePath()
          paths[pathName] = geometries.path2.appendBezier({
            segments,
            controlPoints: [
              svg2cag(q1, svgUnitsPmm),
              svg2cag(q2, svgUnitsPmm),
              svg2cag([cx, cy], svgUnitsPmm)
            ]
          }, paths[pathName])
          const rf = reflect(qx, qy, cx, cy)
          qx = rf[0]
          qy = rf[1]
        }
        break
      case 'T': // absolute quadratic Bézier shorthand
        while (pts.length >= i + 2) {
          const p0 = [cx, cy] // previous point
          cx = parseFloat(pts[i++])
          cy = parseFloat(pts[i++])
          const q1 = [p0[0] + (2 / 3) * (qx - p0[0]), p0[1] + (2 / 3) * (qy - p0[1])]
          const q2 = [q1[0] + (1 / 3) * (cx - p0[0]), q1[1] + (1 / 3) * (cy - p0[1])]
          ensurePath()
          paths[pathName] = geometries.path2.appendBezier({
            segments,
            controlPoints: [
              svg2cag(q1, svgUnitsPmm),
              svg2cag(q2, svgUnitsPmm),
              svg2cag([cx, cy], svgUnitsPmm)
            ]
          }, paths[pathName])
          const rf = reflect(qx, qy, cx, cy)
          qx = rf[0]
          qy = rf[1]
        }
        break
      case 's': // relative cubic Bézier shorthand
        while (pts.length >= i + 4) {
          const x1 = bx // reflection of 2nd control point from previous C
          const y1 = by // reflection of 2nd control point from previous C
          bx = cx + parseFloat(pts[i++])
          by = cy + parseFloat(pts[i++])
          cx = cx + parseFloat(pts[i++])
          cy = cy + parseFloat(pts[i++])
          ensurePath()
          paths[pathName] = geometries.path2.appendBezier(
            {
              segments,
              controlPoints: [svg2cag([x1, y1], svgUnitsPmm), svg2cag([bx, by], svgUnitsPmm), svg2cag([cx, cy], svgUnitsPmm)]
            },
            paths[pathName]
          )
          const rf = reflect(bx, by, cx, cy)
          bx = rf[0]
          by = rf[1]
        }
        break
      case 'S': // absolute cubic Bézier shorthand
        while (pts.length >= i + 4) {
          const x1 = bx // reflection of 2nd control point from previous C
          const y1 = by // reflection of 2nd control point from previous C
          bx = parseFloat(pts[i++])
          by = parseFloat(pts[i++])
          cx = parseFloat(pts[i++])
          cy = parseFloat(pts[i++])
          ensurePath()
          paths[pathName] = geometries.path2.appendBezier({
            segments,
            controlPoints: [
              svg2cag([x1, y1], svgUnitsPmm),
              svg2cag([bx, by], svgUnitsPmm),
              svg2cag([cx, cy], svgUnitsPmm)
            ]
          }, paths[pathName])
          const rf = reflect(bx, by, cx, cy)
          bx = rf[0]
          by = rf[1]
        }
        break
      case 'h': // relative Horzontal line to
        while (pts.length >= i + 1) {
          cx = cx + parseFloat(pts[i++])
          paths[pathName] = appendPoints([svg2cag([cx, cy], svgUnitsPmm)], paths[pathName])
        }
        break
      case 'H': // absolute Horzontal line to
        while (pts.length >= i + 1) {
          cx = parseFloat(pts[i++])
          paths[pathName] = appendPoints([svg2cag([cx, cy], svgUnitsPmm)], paths[pathName])
        }
        break
      case 'l': // relative line to
        while (pts.length >= i + 2) {
          cx = cx + parseFloat(pts[i++])
          cy = cy + parseFloat(pts[i++])
          paths[pathName] = appendPoints([svg2cag([cx, cy], svgUnitsPmm)], paths[pathName])
        }
        break
      case 'L': // absolute line to
        while (pts.length >= i + 2) {
          cx = parseFloat(pts[i++])
          cy = parseFloat(pts[i++])
          paths[pathName] = appendPoints([svg2cag([cx, cy], svgUnitsPmm)], paths[pathName])
        }
        break
      case 'v': // relative Vertical line to
        while (pts.length >= i + 1) {
          cy = cy + parseFloat(pts[i++])
          paths[pathName] = appendPoints([svg2cag([cx, cy], svgUnitsPmm)], paths[pathName])
        }
        break
      case 'V': // absolute Vertical line to
        while (pts.length >= i + 1) {
          cy = parseFloat(pts[i++])
          paths[pathName] = appendPoints([svg2cag([cx, cy], svgUnitsPmm)], paths[pathName])
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

    const isCloseCmd = (cmd) => cmd === 'z' || cmd === 'Z'

    if (pc !== true && paths[pathName] && paths[pathName].isClosed) {
      let coNext = obj.commands[j + 1]
      // allow self close in the last command #1135 (coNext is null or undefined)
      // if do have a next command use pathSelfClosed to decide how to react to closing in the middle of a path
      if (coNext && !isCloseCmd(coNext.c)) {
        if (pathSelfClosed === 'trim') {
          while (coNext && !isCloseCmd(coNext.c)) {
            j++
            coNext = obj.commands[j + 1]
          }
        } else if (pathSelfClosed === 'split') {
          newPath()
        } else {
          throw new Error(`Malformed svg path at ${obj.position[0]}:${co.pos}. Path closed itself with command #${j} ${co.c}${pts.join(' ')}`)
        }
      }
    }
  }
  return paths
}
