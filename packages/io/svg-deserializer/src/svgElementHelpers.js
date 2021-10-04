const { cagColor, cssStyle, css2cag } = require('./helpers')
const { pxPmm } = require('./constants')

const svgCore = (obj, element) => {
  if ('id' in element) { obj.id = element.id }
  if ('position' in element) { obj.position = element.position }
}

const svgPresentation = (obj, element) => {
  // presentation attributes for all
  if ('display' in element) { obj.visible = element.display }
  // presentation attributes for solids
  if ('color' in element) { obj.fill = cagColor(element.color); obj.stroke = obj.fill }
  if ('opacity' in element) { obj.opacity = element.opacity }
  if ('fill' in element) {
    obj.fill = cagColor(element.fill)
  } else {
    const s = cssStyle(element, 'fill')
    if (s) {
      obj.fill = cagColor(s)
    }
  }
  if ('fill-opacity' in element) { obj.opacity = element['fill-opacity'] }
  // presentation attributes for lines
  if ('stroke-width' in element) {
    obj.strokeWidth = element['stroke-width']
  } else {
    const sw = cssStyle(element, 'stroke-width')
    if (sw) {
      obj.strokeWidth = sw
    }
  }
  if ('stroke' in element) {
    obj.stroke = cagColor(element.stroke)
  } else {
    const s = cssStyle(element, 'stroke')
    if (s) {
      obj.stroke = cagColor(s)
    }
  }
  if ('stroke-opacity' in element) { obj.strokeOpacity = element['stroke-opacity'] }
}

const svgTransformsRegExp = /\w+\(.+\)/i

const svgTransforms = (cag, element) => {
  let list = null
  if ('transform' in element) {
    list = element.transform
  } else {
    const s = cssStyle(element, 'transform')
    if (s) { list = s }
  }
  if (list !== null) {
    cag.transforms = []
    let v = svgTransformsRegExp.exec(list)
    while (v !== null) {
      const s = svgTransformsRegExp.lastIndex
      const e = list.indexOf(')') + 1
      let t = list.slice(s, e) // the transform
      t = t.trim()
      // add the transform to the CAG
      // which are applied in the order provided
      const n = t.slice(0, t.indexOf('('))
      let a = t.slice(t.indexOf('(') + 1, t.indexOf(')')).trim()
      if (a.indexOf(',') > 0) { a = a.split(',') } else { a = a.split(' ') }
      let o
      switch (n) {
        case 'translate':
          if (a.length === 1) a.push(0) // as per SVG
          o = { translate: [a[0], a[1]] }
          cag.transforms.push(o)
          break
        case 'scale':
          if (a.length === 1) a.push(a[0]) // as per SVG
          o = { scale: [a[0], a[1]] }
          cag.transforms.push(o)
          break
        case 'rotate':
          o = { rotate: a }
          cag.transforms.push(o)
          break
        // case 'matrix':
        // case 'skewX':
        // case 'skewY':
        default:
          break
      }
      // shorten the list and continue
      list = list.slice(e, list.length)
      v = svgTransformsRegExp.exec(list)
    }
  }
}

const viewBoxRegExp = /([\d.-]+)[\s,]+([\d.-]+)[\s,]+([\d.-]+)[\s,]+([\d.-]+)/i

const svgSvg = (element, { customPxPmm }) => {
  // default SVG with no viewport
  const obj = { type: 'svg', x: 0, y: 0, width: '100%', height: '100%', strokeWidth: '1' }

  // default units per mm
  obj.unitsPmm = [pxPmm, pxPmm]

  if ('pxpmm' in element) {
    // WOW! a supplied value for pixels per milimeter!!!
    obj.pxPmm = element.pxpmm
    obj.unitsPmm = [obj.pxPmm, obj.pxPmm]
  }
  if ('width' in element) { obj.width = element.width }
  if ('height' in element) { obj.height = element.height }
  if ('viewBox' in element) {
    const list = element.viewBox.trim()
    const v = viewBoxRegExp.exec(list)
    if (v !== null) {
      obj.viewX = parseFloat(v[1])
      obj.viewY = parseFloat(v[2])
      obj.viewW = parseFloat(v[3])
      obj.viewH = parseFloat(v[4])
    }
    // apply the viewbox
    if (obj.width.indexOf('%') < 0) {
      // calculate a scaling from width and viewW
      let s = css2cag(obj.width, customPxPmm) // width in millimeters
      s = obj.viewW / s
      // scale the default units
      // obj.unitsPmm[0] = obj.unitsPmm[0] * s;
      obj.unitsPmm[0] = s
    } else {
      // scale the default units by the width (%)
      const u = obj.unitsPmm[0] * (parseFloat(obj.width) / 100.0)
      obj.unitsPmm[0] = u
    }
    if (obj.height.indexOf('%') < 0) {
      // calculate a scaling from height and viewH
      let s = css2cag(obj.height, pxPmm) // height in millimeters
      s = obj.viewH / s
      // scale the default units
      // obj.unitsPmm[1] = obj.unitsPmm[1] * s;
      obj.unitsPmm[1] = s
    } else {
      // scale the default units by the width (%)
      const u = obj.unitsPmm[1] * (parseFloat(obj.height) / 100.0)
      obj.unitsPmm[1] = u
    }
  } else {
    obj.viewX = 0
    obj.viewY = 0
    obj.viewW = 1920 / obj.unitsPmm[0] // average screen size / pixels per unit
    obj.viewH = 1080 / obj.unitsPmm[1] // average screen size / pixels per unit
  }
  obj.viewP = Math.sqrt((obj.viewW * obj.viewW) + (obj.viewH * obj.viewH)) / Math.SQRT2

  // core attributes
  svgCore(obj, element)
  // presentation attributes
  svgPresentation(obj, element)

  obj.objects = []
  return obj
}

const svgEllipse = (element) => {
  const obj = { type: 'ellipse', cx: '0', cy: '0', rx: '0', ry: '0' }
  if ('cx' in element) { obj.cx = element.cx }
  if ('cy' in element) { obj.cy = element.cy }
  if ('rx' in element) { obj.rx = element.rx }
  if ('ry' in element) { obj.ry = element.ry }
  // transforms
  svgTransforms(obj, element)
  // core attributes
  svgCore(obj, element)
  // presentation attributes
  svgPresentation(obj, element)
  return obj
}

const svgLine = (element) => {
  const obj = { type: 'line', x1: '0', y1: '0', x2: '0', y2: '0' }
  if ('x1' in element) { obj.x1 = element.x1 }
  if ('y1' in element) { obj.y1 = element.y1 }
  if ('x2' in element) { obj.x2 = element.x2 }
  if ('y2' in element) { obj.y2 = element.y2 }
  // transforms
  svgTransforms(obj, element)
  // core attributes
  svgCore(obj, element)
  // presentation attributes
  svgPresentation(obj, element)
  return obj
}

const svgListOfPoints = (list) => {
  const points = []
  const exp = /([\d\-+.]+)[\s,]+([\d\-+.]+)[\s,]*/i
  list = list.trim()
  let v = exp.exec(list)
  while (v !== null) {
    let point = v[0]
    const next = exp.lastIndex + point.length
    point = { x: v[1], y: v[2] }
    points.push(point)
    list = list.slice(next, list.length)
    v = exp.exec(list)
  }
  return points
}

const svgPolyline = (element) => {
  const obj = { type: 'polyline' }
  // transforms
  svgTransforms(obj, element)
  // core attributes
  svgCore(obj, element)
  // presentation attributes
  svgPresentation(obj, element)

  if ('points' in element) {
    obj.points = svgListOfPoints(element.points)
  }
  return obj
}

const svgPolygon = (element) => {
  const obj = { type: 'polygon' }
  // transforms
  svgTransforms(obj, element)
  // core attributes
  svgCore(obj, element)
  // presentation attributes
  svgPresentation(obj, element)

  if ('points' in element) {
    obj.points = svgListOfPoints(element.points)
  }
  return obj
}

const svgRect = (element) => {
  const obj = { type: 'rect', x: '0', y: '0', rx: '0', ry: '0', width: '0', height: '0' }

  if ('x' in element) { obj.x = element.x }
  if ('y' in element) { obj.y = element.y }
  if ('rx' in element) {
    obj.rx = element.rx
    if (!('ry' in element)) { obj.ry = obj.rx } // by SVG specification
  }
  if ('ry' in element) {
    obj.ry = element.ry
    if (!('rx' in element)) { obj.rx = obj.ry } // by SVG specification
  }
  if (obj.rx !== obj.ry) {
    console.log('Warning: Unsupported RECT with rx and ry radius')
  }
  if ('width' in element) { obj.width = element.width }
  if ('height' in element) { obj.height = element.height }
  // transforms
  svgTransforms(obj, element)
  // core attributes
  svgCore(obj, element)
  // presentation attributes
  svgPresentation(obj, element)
  return obj
}

const svgCircle = (element) => {
  const obj = { type: 'circle', x: '0', y: '0', radius: '0' }

  if ('cx' in element) { obj.x = element.cx }
  if ('cy' in element) { obj.y = element.cy }
  if ('r' in element) { obj.radius = element.r }
  // transforms
  svgTransforms(obj, element)
  // core attributes
  svgCore(obj, element)
  // presentation attributes
  svgPresentation(obj, element)
  return obj
}

const svgGroup = (element) => {
  const obj = { type: 'group' }
  // transforms
  svgTransforms(obj, element)
  // core attributes
  svgCore(obj, element)
  // presentation attributes
  svgPresentation(obj, element)

  if ('x' in element || 'y' in element) {
    let x = '0'
    let y = '0'
    if ('x' in element) x = element.x
    if ('y' in element) y = element.y
    if (!('transforms' in obj)) obj.transforms = []
    const o = { translate: [x, y] }
    obj.transforms.push(o)
  }

  obj.objects = []
  return obj
}

//
// Convert the PATH element into object representation
//
const svgPath = (element) => {
  const obj = { type: 'path' }
  // transforms
  svgTransforms(obj, element)
  // core attributes
  svgCore(obj, element)
  // presentation attributes
  svgPresentation(obj, element)

  obj.commands = []
  if ('d' in element) {
    let co = null // current command
    let bf = ''

    let i = 0
    const l = element.d.length
    const offset = element.position[1] - l - 2
    while (i < l) {
      const c = element.d[i]
      switch (c) {
      // numbers
      // FIXME support E notation numbers
        case '-':
          if (bf.length > 0) {
            co.p.push(bf)
            bf = ''
          }
          bf += c
          break
        case '.':
          if (bf.length > 0) {
            if (bf.indexOf('.') >= 0) {
              co.p.push(bf)
              bf = ''
            }
          }
          bf += c
          break
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
          bf += c
          break
        // commands
        case 'a':
        case 'A':
        case 'c':
        case 'C':
        case 'h':
        case 'H':
        case 'l':
        case 'L':
        case 'v':
        case 'V':
        case 'm':
        case 'M':
        case 'q':
        case 'Q':
        case 's':
        case 'S':
        case 't':
        case 'T':
        case 'z':
        case 'Z':
          if (co !== null) {
            if (bf.length > 0) {
              co.p.push(bf)
              bf = ''
            }
            obj.commands.push(co)
          }
          co = { c: c, p: [], pos: i + offset }
          break
        // white space
        case ',':
        case ' ':
        case '\n':
          if (co !== null) {
            if (bf.length > 0) {
              co.p.push(bf)
              bf = ''
            }
          }
          break
        default:
          break
      }
      i++
    }
    if (i === l && co !== null) {
      if (bf.length > 0) {
        co.p.push(bf)
      }
      obj.commands.push(co)
    }
  }
  return obj
}

// generate GROUP with attributes from USE element
// - expect x,y,height,width,XLINK:HREF
// - append translate(x,y) if x,y available
// deep clone the referenced OBJECT and add to group
// - clone using JSON.parse(JSON.stringify(obj))
const svgUse = (element, { svgObjects }) => {
  const obj = { type: 'group' }
  // transforms
  svgTransforms(obj, element)
  // core attributes
  svgCore(obj, element)
  // presentation attributes
  svgPresentation(obj, element)

  if ('x' in element || 'y' in element) {
    let x = '0'
    let y = '0'
    if ('x' in element) x = element.x
    if ('y' in element) y = element.y
    if (!('transforms' in obj)) obj.transforms = []
    const o = { translate: [x, y] }
    obj.transforms.push(o)
  }

  obj.objects = []
  if ('xlink:href' in element) {
  // lookup the named object
    let ref = element['xlink:href']
    if (ref[0] === '#') { ref = ref.slice(1, ref.length) }
    if (svgObjects[ref] !== undefined) {
      ref = svgObjects[ref]
      ref = JSON.parse(JSON.stringify(ref))
      obj.objects.push(ref)
    }
  }
  return obj
}

module.exports = {
  svgCore,
  svgPresentation,
  svgSvg,
  svgRect,
  svgCircle,
  svgEllipse,
  svgLine,
  svgPolyline,
  svgPolygon,
  svgGroup,
  svgPath,
  svgUse
}
