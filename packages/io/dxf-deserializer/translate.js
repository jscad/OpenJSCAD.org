/*
## License

Copyright (c) 2017-2019 Z3 Development https://github.com/z3dev

All code released under MIT license

*/
const { maths, geometries } = require('@jscad/modeling')

const { instantiatePolygon, instantiateVector } = require('./instantiate')

const { findLayer, getColor, getColorNumber } = require('./helpers')

//
// translate the give 2D vector to JSCAD script
//
const translateVector2D = (vector) => {
  const script = `${vector[0]},${vector[1]}`
  return script
}

//
// translate the give 3D vector to JSCAD script
//
const translateVector3D = (vector) => {
  const script = `${vector[0]},${vector[1]},${vector[2]}`
  return script
}

//
// translate the given polygon into JSCAD script
//
const translatePolygon = (polygon) => {
  const vertices = geometries.poly3.toPoints(polygon)
  let script = 'createPolygon(['
  vertices.forEach((vertice) => {
    script += `[${translateVector3D(vertice)}],`
  })
  script += `],${translateColor(polygon)})`
  return script
}

//
// translate the given color attribute of the given polygon to JSCAD script
//
const translateColor = (polygon) => {
  let script = 'null'
  if ('color' in polygon) {
    const rgb = polygon.color
    script = `[${rgb[0]},${rgb[1]},${rgb[2]},${rgb[3]}]`
  }
  return script
}

//
// translate the given DXF object (line) into 2D or 3D line
//
const translateLine = (obj, layers, options) => {
  const name = obj.name

  const cn = getColorNumber(obj, layers)
  const color = getColor(cn, options.colorindex)

  let script = ''
  if (!obj.pptz || (obj.pptz === obj.sptz && obj.pptz === 0)) {
    const p1 = maths.vec2.fromValues(obj.pptx, obj.ppty)
    const p2 = maths.vec2.fromValues(obj.sptx, obj.spty)
    script = `  let ${name} = primitives.line([[${translateVector2D(p1)}],[${translateVector2D(p2)}]])\n`
  } else {
    const p1 = maths.vec3.fromValues(obj.pptx, obj.ppty, obj.pptz)
    const p2 = maths.vec3.fromValues(obj.sptx, obj.spty, obj.sptz)
    script = `  let ${name} = primitives.line([[${translateVector3D(p1)}],[${translateVector3D(p2)}]])\n`
  }
  if (color) {
    script += `  ${name} = colors.colorize([${color[0]}, ${color[1]}, ${color[2]}, 1], ${name})\n`
  }
  obj.script = script
  addToLayer(obj, layers)
}

//
// append a Path section to the given script
//
const translateSection = (name, x1, y1, bulg, px, py) => {
  // console.log('translateSection',x1,y1,bulg,px,py)
  if (bulg === 0) {
  // add straight line to the end of the path
    return `geometries.path2.appendPoints([[${x1},${y1}]], ${name})
`
  }

  // add arc to the end of the path
  const prev = maths.vec2.fromValues(px, py)
  const curr = maths.vec2.fromValues(x1, y1)
  const u = maths.vec2.distance(prev, curr)
  const r = u * ((1 + Math.pow(bulg, 2)) / (4 * bulg))
  const clockwise = (bulg < 0)
  const large = false // FIXME how to determine?
  const d = Math.atan(bulg) * 4
  // FIXME need to determine segments from object/layer/variables
  const res = 16
  return `geometries.path2.appendArc({endpoint: [${x1},${y1}],radius: [${r},${r}],xaxisrotation: ${d},clockwise: ${clockwise},large: ${large},segments: ${res}}, ${name})
`
}

//
// translate the given obj (lwpolyline) into a 2D path
//
const translatePath2D = (obj, layers, options) => {
  const closed = parseInt('00000000000000001', 2)

  // expected values
  const vlen = obj.vlen
  const pptxs = obj.pptxs
  const pptys = obj.pptys
  const bulgs = obj.bulgs
  const flags = obj.lflg
  const name = obj.name

  const cn = getColorNumber(obj, layers)
  const color = getColor(cn, options.colorindex)

  // translation
  let script = `  let ${name} = geometries.path2.create()\n`
  const isclosed = ((flags & closed) === closed)
  if (vlen === pptxs.length && vlen === pptys.length && vlen === bulgs.length) {
    // add initial point
    script += `  ${name} = geometries.path2.appendPoints([[${pptxs[0]}, ${pptys[0]}]], ${name})\n`
    // add sections
    for (let i = 0; i < pptxs.length; i++) {
      const j = (i + 1) % pptxs.length
      const cx = pptxs[j]
      const cy = pptys[j]
      const px = pptxs[i]
      const py = pptys[i]
      const bulg = bulgs[i] // apply the previous bulg
      if (j !== 0) {
        script += `  ${name} = ${translateSection(name, cx, cy, bulg, px, py)}`
      } else {
        if (bulg !== 0) {
          // apply the last bulge
          script += `  ${name} = ${translateSection(name, cx, cy, bulg, px, py)}`
        }
      }
    }
  } else {
  // FIXME flag this DXF error
    return
  }
  if (isclosed) {
    script += `  ${name} = geometries.path2.close(${name})\n`
  } else {
    script += '\n'
  }
  if (color) {
    script += `  ${name} = colors.colorize([${color[0]}, ${color[1]}, ${color[2]}, 1], ${name})\n`
  }
  obj.script = script
  addToLayer(obj, layers)
}

//
// translate the given object (arc) into 2D path or 3D path??
//
const translateArc = (obj, layers, options) => {
// expected values
  const lthk = obj.lthk
  const pptx = obj.pptx
  const ppty = obj.ppty
  // const pptz = obj.pptz
  const swid = obj.swid
  let ang0 = obj.ang0 // start angle (degrees)
  let ang1 = obj.ang1 // end angle (degrees)
  const name = obj.name

  const cn = getColorNumber(obj, layers)
  const color = getColor(cn, options.colorindex)

  // convert angles to radians
  ang0 *= 0.017453292519943295
  ang1 *= 0.017453292519943295

  // FIXME need to determine segements from object/layer/variables
  const res = 16

  // convert to 2D object
  if (lthk === 0.0) {
    let script = `  let ${name} = primitives.arc({center: [${pptx}, ${ppty}], radius: ${swid}, startAngle: ${ang0}, endAngle: ${ang1}, segements: ${res}})\n`
    if (color) {
      script += `  ${name} = colors.colorize([${color[0]}, ${color[1]}, ${color[2]}, 1], ${name})\n`
    }
    obj.script = script
    addToLayer(obj, layers)
    return
  }
  // FIXME how to represent 3D arc?
  let script = `  let ${name} = primitives.arc({center: [${pptx}, ${ppty}], radius: ${swid}, startAngle: ${ang0}, endAngle: ${ang1}, segements: ${res}})\n`
  if (color) {
    script += `  ${name} = colors.colorize([${color[0]}, ${color[1]}, ${color[2]}, 1], ${name})\n`
  }
  obj.script = script
  addToLayer(obj, layers)
}

//
// translate the given obj (circle) into a 2D circle (or extrude to 3D)
//
const translateCircle = (obj, layers, options) => {
// expected values
  const lthk = obj.lthk
  const pptx = obj.pptx
  const ppty = obj.ppty
  // const pptz = obj.pptz
  const swid = obj.swid
  const name = obj.name

  const cn = getColorNumber(obj, layers)
  const color = getColor(cn, options.colorindex)

  // FIXME need to determine segments from object/layer/variables
  const res = 16

  // convert to 2D object
  if (lthk === 0.0) {
    let script = `  let ${name} = primitives.circle({center: [${pptx}, ${ppty}], radius: ${swid}, segments: ${res}})\n`
    if (color) {
      script += `  ${name} = colors.colorize([${color[0]}, ${color[1]}, ${color[2]}, 1], ${name})\n`
    }
    obj.script = script
    addToLayer(obj, layers)
    return
  }

  // convert to 3D object
  let script = `  let ${name} = primitives.circle({center: [${pptx}, ${ppty}], radius: ${swid}, segments: ${res}}).extrude({offset: [0,0,${lthk}]}))\n`
  if (color) {
    script += `  ${name} = colors.colorize([${color[0]}, ${color[1]}, ${color[2]}, 1], ${name})\n`
  }

  // FIXME need to use 210/220/230 for direction of rotation
  obj.script = script
  addToLayer(obj, layers)
}

//
// translate the given object (ellipse) into a 2D ellipse (or extrude to 3D)
//
const translateEllipse = (obj, layers, options) => {
// expected values
  const pptx = obj.pptx // center point
  const ppty = obj.ppty
  const pptz = obj.pptz
  const sptx = obj.sptx // MAJOR axis point (relative to center point)
  const spty = obj.spty
  const sptz = obj.sptz
  const swid = obj.swid // Ratio of minor axis to major axis
  const name = obj.name

  const cn = getColorNumber(obj, layers)
  const color = getColor(cn, options.colorindex)

  // FIXME need to determine segments from object/layer/variables
  const res = 16

  // convert to 2D object
  if (pptz === 0.0 && sptz === 0.0) {
    const center = maths.vec2.fromValues(0, 0)
    const mjaxis = maths.vec2.fromValues(sptx, spty)
    const rx = maths.vec2.distance(center, mjaxis)
    const ry = rx * swid
    const angle = Math.atan2(spty, sptx) // * 180 / Math.PI
    // FIXME add start and end angle when supported

    let script = `  let ${name} = primitives.ellipse({center: [0, 0, 0], radius: [${rx}, ${ry}], segments: ${res}})
  let ${name}matrix = maths.mat4.multiply(maths.mat4.create(), maths.mat4.fromTranslation(maths.mat4.create(), [${pptx}, ${ppty}, 0]), maths.mat4.fromZRotation(maths.mat4.create(), ${angle}))
  ${name} = geometries.geom2.transform(${name}matrix, ${name})
`
    if (color) {
      script += `  ${name} = colors.colorize([${color[0]}, ${color[1]}, ${color[2]}, 1], ${name})\n`
    }
    obj.script = script
    addToLayer(obj, layers)
  }
  // convert to 3D object
}

const instantiateFaces = (fvals) => {
  const faces = []
  let vi = 0
  while (vi < fvals.length) {
    let fi = fvals[vi++]
    const face = []
    while (fi > 0) {
      face.push(fvals[vi++])
      fi--
    }
    faces.push(face)
  }
  return faces
}

const instantiatePoints = (pptxs, pptys, pptzs) => {
  const points = []
  let vi = 0
  while (vi < pptxs.length) {
    const x = pptxs[vi]
    const y = pptys[vi]
    const z = pptzs[vi]
    points.push([x, y, z])
    vi++
  }
  return points
}

//
// instantiate the MESH as a 3D geometry, consisting of the polygons given
//
// Note: See Face-Vertex meshes on Wikipedia
//
const translateMesh = (obj, layers, options) => {
// expected values
  const vlen = obj.vlen
  const pptxs = obj.pptxs // vertices
  const pptys = obj.pptys
  const pptzs = obj.pptzs

  const flen = obj.flen
  const fvals = obj.fvals // faces

  // conversion
  const cn = getColorNumber(obj, layers)
  const color = getColor(cn, options.colorindex)

  const polygons = []
  if (vlen === pptxs.length && vlen === pptys.length && vlen === pptzs.length) {
    if (flen === fvals.length) {
      const faces = instantiateFaces(fvals)
      const points = instantiatePoints(pptxs, pptys, pptzs)

      let fi = 0
      while (fi < faces.length) {
        const face = faces[fi]
        let vertices = []
        let vi = 0
        while (vi < face.length) {
          const pi = face[vi]
          const vector = maths.vec3.clone(points[pi])
          vertices.push(vector)
          vi++
        }
        if (options.dxf.angdir === 1) {
          vertices = vertices.reverse()
        }
        // FIXME how to correct bad normals?

        const poly = geometries.poly3.create(vertices)
        if (color) poly.color = color
        polygons.push(poly)

        fi++
      }
    } else {
      console.warn('invalid mesh: faces')
    }
  } else {
    console.warn('invalid mesh: vertices')
  }
  // convert the polygons into a script
  const name = obj.name
  let script = `  const ${name}_polygons = [
`
  for (const polygon of polygons) {
    script += '    ' + translatePolygon(polygon) + ',\n'
  }
  script += `  ]
  let ${name} = geometries.geom3.create(${name}_polygons)
`
  obj.script = script
  addToLayer(obj, layers)
  return null
}

const findLayer0 = (layers) => {
  for (const layer of layers) {
    if (layer.name === '0') {
      return layer
    }
  }
  // this DXF did not specify so create
  const layer = { type: 'layer' }
  layer.lnam = 'layer0'
  layer.name = '0'
  layer.lscl = 1.0
  layer.visb = 0
  layer.spac = 0
  layer.objects = []

  layers.push(layer)
  return layer
}

const addToLayer = (obj, layers) => {
  let layer = findLayer(obj, layers)
  if (layer === null) {
    // hmmm... add to layer '0'
    layer = findLayer0(layers)
  }
  if (!('objects' in layer)) {
    layer.objects = []
  }
  layer.objects.push(obj)
}

//
// get the (internal) object type from the given object
//
// This assumes the given object is a POLYLINE.
// DXF POLYLINE entities are over-loaded objects with various shapes.
// - 2D line, with following 2D VERTEX entities
// - 3D line, with following 3D VERTEX entities
// - 3D polymesh, with following 3D VERTEX entities
// - 3D polyface, with following 3D VERTEX entities
//
const getPolyType = (obj) => {
  const closedM = parseInt('00000000000000001', 2)
  const d3line = parseInt('00000000000001000', 2)
  const d3mesh = parseInt('00000000000010000', 2)
  const closedN = parseInt('00000000000100000', 2)
  const d3face = parseInt('00000000001000000', 2)

  const flags = obj.lflg
  let ptype = null
  if ((flags & d3line) === d3line) {
    const isclosed = ((flags & closedM) === closedM)
    ptype = { type: '3dline', isclosed: isclosed }
  } else
  if ((flags & d3mesh) === d3mesh) {
    ptype = { type: '3dpolymesh' }
    // need the mesh shape for interpretation
    ptype.fvia = obj.fvia
    ptype.fvib = obj.fvib
    ptype.closedM = ((flags & closedM) === closedM)
    ptype.closedN = ((flags & closedN) === closedN)
  } else
  if ((flags & d3face) === d3face) {
    ptype = { type: '3dpolyfaces' }
    // need the vertex and face counts for interpretation
    ptype.fvia = obj.fvia
    ptype.fvib = obj.fvib
  } else {
    const isclosed = ((flags & closedM) === closedM)
    ptype = { type: '2dline', isclosed: isclosed }
  }
  if ('cnmb' in obj) { ptype.cnmb = obj.cnmb }
  if ('lnam' in obj) { ptype.lnam = obj.lnam }
  return ptype
}

//
// Instantiate the facets of the POLYLINE poly-mesh as a set of polygons.
//
// DXF POLYLINE entities can contain a mesh defined by a MxN set of vertices.
// The mesh is defined in terms of a matrix of M and N vertices, like a grid consisting of columns and rows.
// M and N specify the column and row position, respectively, of any given vertex.
// The mesh is constructed row by row; M rows which contain N vertexes.
//
const instantiateFacets = (meshM, meshN, parts, color, options) => {
  // console.log('##### instantiateFacets',meshM,meshN,parts.length)

  const getVector = (x, y) => {
    const n = (((x - 1) * meshN) + (y - 1))
    const part = parts[n]
    return part.vec
  }

  const facets = []

  // sanity check
  const fcount = meshM * meshN
  if (fcount !== parts.length) {
    return facets
  }
  if (meshM < 2 | meshN < 2) {
    return facets
  }
  // instantiate VALID polygons
  let i = 1
  while (i < meshM) {
    let j = 1
    while (j < meshN) {
      const v0 = getVector(i, j)
      const v1 = getVector(i + 1, j)
      const v2 = getVector(i + 1, j + 1)
      const v3 = getVector(i, j + 1) // CCW vectors
      let facet = [v0, v1, v2, v3]
      if (options.dxf.angdir === 1) {
        facet = facet.reverse()
      }
      const polygon = geometries.poly3.create(facet)
      const plane = geometries.poly3.plane(polygon)
      if (Number.isFinite(plane[3])) {
        if (color) polygon.color = color
        facets.push(polygon)
      }
      j++
    }
    i++
  }
  return facets
}

//
// Instantiate the faces of the POLYLINE face-mesh as a set of polygons.
//
// DXF POLYLINE entities can contain a face mesh defined by a series of vertices.
// The first part of the series are the (meshM) vertices.
// The second part of the series are the (meshN) faces.
// Each face of the mesh is defined by the indexes provided by the face (group codes 71-74).
// The first zero(0) index marks the end of the vertices.
// Negative indexes indicate invisible edges (not implemented).
//
const instantiatePolyFaces = (meshM, meshN, parts, color, options) => {
  // console.log('##### instantiatePolyFaces',meshM,meshN,parts.length)
  const faces = []

  // sanity check
  if ((meshM + meshN) !== parts.length) {
    return faces
  }
  // conversion
  let i = meshM // skip to the faces
  while (i < parts.length) {
    let part = parts[i]
    const indexes = [Math.abs(part.fvia), Math.abs(part.fvib), Math.abs(part.fvic), Math.abs(part.fvid)]
    let vertices = []
    if (indexes[0] > 0) {
      part = parts[indexes[0] - 1]
      vertices.push(part.vec)
      if (indexes[1] > 0) {
        part = parts[indexes[1] - 1]
        vertices.push(part.vec)
        if (indexes[2] > 0) {
          part = parts[indexes[2] - 1]
          vertices.push(part.vec)
          if (indexes[3] > 0) {
            part = parts[indexes[3] - 1]
            vertices.push(part.vec)
          }
        }
      }
    }
    // only use valid face definitions
    if (vertices.length > 2) {
      // reverse the order of vertices if necessary
      if (options.dxf.angdir === 1) {
        vertices = vertices.reverse()
      }
      const polygon = geometries.poly3.create(vertices)
      faces.push(polygon)
    }
    i++
  }
  return faces
}

//
// Translate a 2D line from the given base object and parts.
// The translation uses the parts as 2D vertexes from POLYLINE.
//
const translateAs2Dline = (obj, layers, parts, options) => {
  // console.log('##### completing Path2D using vectors')
  // convert the parts to a series of X/Y/BULG lists
  obj.vlen = parts.length
  obj.pptxs = []
  obj.pptys = []
  obj.bulgs = []
  for (const part of parts) {
    obj.pptxs.push(part.vec[0])
    obj.pptys.push(part.vec[1])
    obj.bulgs.push(part.bulg)
  }
  if (obj.isclosed) {
    obj.lflg = parseInt('00000000000000001', 2)
  } else {
    obj.lflg = 0
  }
  translatePath2D(obj, layers, options)
  return null
}

//
// translate a complex object from the given base object and parts
// - 3D solid a series of polygons => 3D geometry
// - 2D line plus a series of 2D vectors => 2D path
// - 3D solid plus a series of 3D vectors => 3D geometry
//
const translateCurrent = (obj, layers, parts, options) => {
  if (obj === null) return null
  // console.log('***** translateCurrent',obj.type)

  const type = obj.type
  const cn = getColorNumber(obj, layers)
  const color = getColor(cn, options.colorindex)

  // console.log('##### translating Current as '+type)

  if (type === '2dline') {
    return translateAs2Dline(obj, layers, parts, options)
  }

  if (type === '3dline') {
    // FIXME what to do?
    return null
  }

  if (type === '3dpolymesh') {
    const m = obj.fvia
    const n = obj.fvib
    // console.log('##### m: '+m+' n: '+n)
    const facets = instantiateFacets(m, n, parts, color, options)
    parts = facets
    // fall through, translating the parts (polygons)
  }

  if (type === '3dpolyfaces') {
    if ('fvia' in obj) {
      const m = obj.fvia
      const n = obj.fvib
      const faces = instantiatePolyFaces(m, n, parts, color, options)
      parts = faces
      // fall through, translating the parts (polygons)
    }
  }
  // convert the polygons into a script
  const name = obj.name
  let script = `  const ${name}_polygons = [
`
  for (const polygon of parts) {
    script += '    ' + translatePolygon(polygon) + ',\n'
  }
  script += `  ]
  let ${name} = geometries.geom3.create(${name}_polygons)
`
  if (color) {
    script += `  ${name}.color = [${color}]
`
  }
  obj.script = script
  addToLayer(obj, layers)
  return null
}

//
// translate the given layer into a wrapper function for the previous translated objects
//
const translateLayer = (layer) => {
  const name = layer.lnam || 'Unknown'

  let script = `function ${name}() {
`
  for (const object of layer.objects) {
    script += object.script
  }
  script += '  return ['
  for (const object of layer.objects) {
    script += object.name + ','
  }
  script += ']\n}\n'
  return script
}

const saveVariable = (obj, options) => {
  const name = obj.name || 'Unknown'

  switch (name) {
    case '$ANGDIR':
      if ('lflg' in obj) {
        options.dxf.angdir = obj.lflg
      }
      break

    default:
      break
  }
}

const translateAsciiDxf = (reader, options) => {
  // console.log('**************************************************')
  // console.log(JSON.stringify(reader.objstack))
  // console.log('**************************************************')

  const layers = [] // list of layers with various information like color
  let current = null // the object being created
  let parts = [] // the list of object subparts (polygons or vectors)
  let numobjs = 0

  // findLayer0(layers)

  let p = null
  for (const obj of reader.objstack) {
    p = null

    if (!('type' in obj)) {
      // console.log('##### skip')
      continue
    }
    if (!('name' in obj)) {
      obj.name = 'jscad' + numobjs
      numobjs = numobjs + 1
    } else {
      // UGG... javascript variable names
      let name = obj.name
      name = name.replace(/ /g, '_')
      name = name.replace(/-/g, '_')
      name = name.replace(/\./g, '_')
      obj.name = name
    }
    // console.log(JSON.stringify(obj))

    switch (obj.type) {
      // control objects
      case 'dxf':
        break
      case 'layer':
        // console.log('##### layer')
        current = translateCurrent(current, layers, parts, options)
        parts = []
        // save the layer for later reference
        obj.objects = [] // with a list of objects
        obj.lnam = 'layer' + layers.length
        layers.push(obj)
        break
      case 'variable':
        // console.log(JSON.stringify(obj))
        current = translateCurrent(current, layers, parts, options)
        parts = []
        saveVariable(obj, options)
        break

      // 3D entities
      case '3dface':
        // console.log('##### 3dface')
        p = instantiatePolygon(obj, layers, options)
        if (current === null) {
          // console.log('##### start of 3dfaces')
          current = { type: '3dfaces' }
          current.name = 'jscad' + numobjs
          numobjs = numobjs + 1
        }
        break
      case 'mesh':
        // console.log('##### mesh')
        current = translateCurrent(current, layers, parts, options)
        parts = []
        translateMesh(obj, layers, options)
        break

      // 2D or 3D entities
      case 'arc':
        // console.log('##### arc')
        current = translateCurrent(current, layers, parts, options)
        parts = []
        translateArc(obj, layers, options)
        break
      case 'circle':
        // console.log('##### circle')
        current = translateCurrent(current, layers, parts, options)
        parts = []
        translateCircle(obj, layers, options)
        break
      case 'ellipse':
        // console.log('##### ellipse')
        current = translateCurrent(current, layers, parts, options)
        parts = []
        translateEllipse(obj, layers, options)
        break
      case 'line':
        // console.log('##### line')
        current = translateCurrent(current, layers, parts, options)
        parts = []
        translateLine(obj, layers, options)
        break
      case 'polyline':
        // console.log('##### polyline')
        current = translateCurrent(current, layers, parts, options)
        parts = []
        if (current === null) {
          // console.log('##### start of polyline')
          current = getPolyType(obj)
          current.name = 'jscad' + numobjs
          numobjs = numobjs + 1
        }
        break
      case 'vertex':
        // console.log('##### vertex')
        p = instantiateVector(obj)
        break
      case 'seqend':
        current = translateCurrent(current, layers, parts, options)
        parts = []
        break

      // 2D entities
      case 'lwpolyline':
        // console.log('##### lwpolyline')
        current = translateCurrent(current, layers, parts, options)
        parts = []
        translatePath2D(obj, layers, options)
        break

      default:
        // console.log('##### ERROR')
        // console.log(obj.type)
        break
    }
    // accumlate polygons if necessary
    if (geometries.poly3.isA(p)) {
      // console.log('##### push Polygon')
      parts.push(p)
    }
    // accumlate vectors if necessary
    if (p && 'vec' in p && p.vec.length === 3) {
      // console.log('##### push vec3')
      parts.push(p)
    }
    if (p && 'vec' in p && p.vec.length === 2) {
      // console.log('##### push vec2')
      parts.push(p)
    }
  }
  // translate the last object if necessary
  current = translateCurrent(current, layers, parts, options)

  // debug output
  // console.log('**************************************************')
  let script = `const {colors, geometries, maths, primitives, transforms} = require('@jscad/modeling')

const main = () => {
  let layers = []
  return layers.concat(`

  layers.forEach((layer) => {
    const name = layer.lnam || 'Unknown'
    script += `${name}(),`
  })
  script += '[])\n}\n'

  // add helper functions for polygons and lines
  script +=
`
function createPolygon(listofpoints, color) {
  let polygon = geometries.poly3.fromPoints(listofpoints)
  if (color) polygon.color = color
  return polygon
}
`

  layers.forEach((layer) => {
    script += translateLayer(layer)
  })

  script += 'module.exports = {main}\n'

  // console.log(script)
  // console.log('**************************************************')
  return script
}

module.exports = translateAsciiDxf
