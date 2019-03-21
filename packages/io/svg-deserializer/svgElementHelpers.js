const {cagColor, cssStyle, css2cag} = require('./helpers')
const {pxPmm} = require('./constants')

const svgCore = function (obj, element) {
  if ('ID' in element) { obj.id = element.ID }
}

const svgPresentation = function (obj, element) {
  // presentation attributes for all
  if ('DISPLAY' in element) { obj.visible = element.DISPLAY }
  // presentation attributes for solids
  if ('COLOR' in element) { obj.fill = cagColor(element.COLOR) }
  if ('OPACITY' in element) { obj.opacity = element.OPACITY }
  if ('FILL' in element) {
    obj.fill = cagColor(element.FILL)
  } else {
    var s = cssStyle(element, 'fill')
    if (s !== null) {
      obj.fill = cagColor(s)
    }
  }
  if ('FILL-OPACITY' in element) { obj.opacity = element['FILL-OPACITY'] }
  // presentation attributes for lines
  if ('STROKE-WIDTH' in element) {
    obj.strokeWidth = element['STROKE-WIDTH']
  } else {
    var sw = cssStyle(element, 'stroke-width')
    if (sw !== null) {
      obj.strokeWidth = sw
    }
  }
  if ('STROKE' in element) {
    obj.stroke = cagColor(element.STROKE)
  } else {
    let s = cssStyle(element, 'stroke')
    if (s !== null) {
      obj.stroke = cagColor(s)
    }
  }
  if ('STROKE-OPACITY' in element) { obj.strokeOpacity = element['STROKE-OPACITY'] }
}

const svgTransforms = function (cag, element) {
  var list = null
  if ('TRANSFORM' in element) {
    list = element.TRANSFORM
  } else {
    var s = cssStyle(element, 'transform')
    if (s !== null) { list = s }
  }
  if (list !== null) {
    cag.transforms = []
    let exp = new RegExp('\\w+\\(.+\\)', 'i')
    var v = exp.exec(list)
    while (v !== null) {
      let s = exp.lastIndex
      var e = list.indexOf(')') + 1
      var t = list.slice(s, e) // the transform
      t = t.trim()
      // add the transform to the CAG
      // which are applied in the order provided
      var n = t.slice(0, t.indexOf('('))
      var a = t.slice(t.indexOf('(') + 1, t.indexOf(')')).trim()
      if (a.indexOf(',') > 0) { a = a.split(',') } else { a = a.split(' ') }
      let o
      switch (n) {
        case 'translate':
          o = {translate: [a[0], a[1]]}
          cag.transforms.push(o)
          break
        case 'scale':
          if (a.length === 1) a.push(a[0]) // as per SVG
          o = {scale: [a[0], a[1]]}
          cag.transforms.push(o)
          break
        case 'rotate':
          o = {rotate: a}
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
      v = exp.exec(list)
    }
  }
}

const svgSvg = function (element, {customPxPmm}) {
  // default SVG with no viewport
  var obj = {type: 'svg', x: 0, y: 0, width: '100%', height: '100%', strokeWidth: '1'}

  // default units per mm
  obj.unitsPmm = [pxPmm, pxPmm]

  if ('PXPMM' in element) {
    // WOW! a supplied value for pixels per milimeter!!!
    obj.pxPmm = element.PXPMM
    obj.unitsPmm = [obj.pxPmm, obj.pxPmm]
  }
  if ('WIDTH' in element) { obj.width = element.WIDTH }
  if ('HEIGHT' in element) { obj.height = element.HEIGHT }
  if ('VIEWBOX' in element) {
    var list = element.VIEWBOX.trim()
    var exp = new RegExp('([\\d\\.\\-]+)[\\s,]+([\\d\\.\\-]+)[\\s,]+([\\d\\.\\-]+)[\\s,]+([\\d\\.\\-]+)', 'i')
    var v = exp.exec(list)
    if (v !== null) {
      obj.viewX = parseFloat(v[1])
      obj.viewY = parseFloat(v[2])
      obj.viewW = parseFloat(v[3])
      obj.viewH = parseFloat(v[4])
    }
    // apply the viewbox
    if (obj.width.indexOf('%') < 0) {
      // calculate a scaling from width and viewW
      var s = css2cag(obj.width, customPxPmm) // width in millimeters
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
  // console.log(JSON.stringify(obj));
  return obj
}

const svgEllipse = function (element) {
  const obj = {type: 'ellipse', cx: '0', cy: '0', rx: '0', ry: '0'}
  if ('CX' in element) { obj.cx = element.CX }
  if ('CY' in element) { obj.cy = element.CY }
  if ('RX' in element) { obj.rx = element.RX }
  if ('RY' in element) { obj.ry = element.RY }
  // transforms
  svgTransforms(obj, element)
  // core attributes
  svgCore(obj, element)
  // presentation attributes
  svgPresentation(obj, element)
  return obj
}

const svgLine = function (element) {
  var obj = {type: 'line', x1: '0', y1: '0', x2: '0', y2: '0'}
  if ('X1' in element) { obj.x1 = element.X1 }
  if ('Y1' in element) { obj.y1 = element.Y1 }
  if ('X2' in element) { obj.x2 = element.X2 }
  if ('Y2' in element) { obj.y2 = element.Y2 }
  // transforms
  svgTransforms(obj, element)
  // core attributes
  svgCore(obj, element)
  // presentation attributes
  svgPresentation(obj, element)
  return obj
}

const svgListOfPoints = function (list) {
  var points = []
  var exp = new RegExp('([\\d\\-\\+\\.]+)[\\s,]+([\\d\\-\\+\\.]+)[\\s,]*', 'i')
  list = list.trim()
  var v = exp.exec(list)
  while (v !== null) {
    var point = v[0]
    var next = exp.lastIndex + point.length
    point = {x: v[1], y: v[2]}
    points.push(point)
    list = list.slice(next, list.length)
    v = exp.exec(list)
  }
  return points
}

const svgPolyline = function (element) {
  const obj = {type: 'polyline'}
  // transforms
  svgTransforms(obj, element)
  // core attributes
  svgCore(obj, element)
  // presentation attributes
  svgPresentation(obj, element)

  if ('POINTS' in element) {
    obj.points = svgListOfPoints(element.POINTS)
  }
  return obj
}

const svgPolygon = function (element) {
  const obj = {type: 'polygon'}
  // transforms
  svgTransforms(obj, element)
  // core attributes
  svgCore(obj, element)
  // presentation attributes
  svgPresentation(obj, element)

  if ('POINTS' in element) {
    obj.points = svgListOfPoints(element.POINTS)
  }
  return obj
}

const svgRect = function (element) {
  var obj = {type: 'rect', x: '0', y: '0', rx: '0', ry: '0', width: '0', height: '0'}

  if ('X' in element) { obj.x = element.X }
  if ('Y' in element) { obj.y = element.Y }
  if ('RX' in element) {
    obj.rx = element.RX
    if (!('RY' in element)) { obj.ry = obj.rx } // by SVG specification
  }
  if ('RY' in element) {
    obj.ry = element.RY
    if (!('RX' in element)) { obj.rx = obj.ry } // by SVG specification
  }
  if (obj.rx !== obj.ry) {
    console.log('Warning: Unsupported RECT with RX and RY radius')
  }
  if ('WIDTH' in element) { obj.width = element.WIDTH }
  if ('HEIGHT' in element) { obj.height = element.HEIGHT }
  // transforms
  svgTransforms(obj, element)
  // core attributes
  svgCore(obj, element)
  // presentation attributes
  svgPresentation(obj, element)
  return obj
}

const svgCircle = function (element) {
  let obj = {type: 'circle', x: '0', y: '0', radius: '0'}

  if ('CX' in element) { obj.x = element.CX }
  if ('CY' in element) { obj.y = element.CY }
  if ('R' in element) { obj.radius = element.R }
  // transforms
  svgTransforms(obj, element)
  // core attributes
  svgCore(obj, element)
  // presentation attributes
  svgPresentation(obj, element)
  return obj
}

const svgGroup = function (element) {
  let obj = {type: 'group'}
  // transforms
  svgTransforms(obj, element)
  // core attributes
  svgCore(obj, element)
  // presentation attributes
  svgPresentation(obj, element)

  obj.objects = []
  return obj
}

//
// Convert the PATH element into object representation
//
const svgPath = function (element) {
  var obj = {type: 'path'}
  // transforms
  svgTransforms(obj, element)
  // core attributes
  svgCore(obj, element)
  // presentation attributes
  // svgPresentation(obj,element);

  obj.commands = []
  if ('D' in element) {
    var co = null // current command
    var bf = ''

    var i = 0
    var l = element.D.length
    while (i < l) {
      var c = element.D[i]
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
          co = {c: c, p: []}
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
// - except X,Y,HEIGHT,WIDTH,XLINK:HREF
// - append translate(x,y) if X,Y available
// deep clone the referenced OBJECT and add to group
// - clone using JSON.parse(JSON.stringify(obj))
const svgUse = function (element, {svgObjects}) {
  var obj = {type: 'group'}
  // transforms
  svgTransforms(obj, element)
  // core attributes
  svgCore(obj, element)
  // presentation attributes
  svgPresentation(obj, element)

  if ('X' in element && 'Y' in element) {
    if (!('transforms' in obj)) obj.transforms = []
    var o = {translate: [element.X, element.Y]}
    obj.transforms.push(o)
  }

  obj.objects = []
  if ('XLINK:HREF' in element) {
  // lookup the named object
    var ref = element['XLINK:HREF']
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
