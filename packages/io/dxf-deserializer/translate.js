/*
## License

Copyright (c) 2017-2019 Z3 Development https://github.com/z3dev

All code released under MIT license

*/
const { math, geometry } = require('@jscad/csg')

const { BYBLOCK, BYLAYER } = require('./autocad')
const { instantiatePolygon, instantiateVector } = require('./instantiate')

//
// translate the give 2D vector to JSCAD script
//
const translateVector2D = (vector) => {
  let script = `${vector[0]},${vector[1]}`
  return script
}

//
// translate the give 3D vector to JSCAD script
//
const translateVector3D = (vector) => {
  let script = `${vector[0]},${vector[1]},${vector[2]}`
  return script
}

//
// translate the given polygon into JSCAD script
//
const translatePolygon = (polygon) => {
  let vertices = geometry.poly3.toPoints(polygon)
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
    let rgb = polygon.color
    script = `[${rgb[0]},${rgb[1]},${rgb[2]},${rgb[3]}]`
  }
  return script
}

//
// translate the given DXF object (line) into 2D or 3D line
//
const translateLine = (obj, layers, options) => {
  let name = obj['name']

  let cn = getColorNumber(obj, layers)
  let color = getColor(cn, options.colorindex)

  let script = ''
  if (!obj['pptz'] || (obj['pptz'] === obj['sptz'] && obj['pptz'] === 0)) {
    let p1 = math.vec2.fromValues(obj['pptx'], obj['ppty'])
    let p2 = math.vec2.fromValues(obj['sptx'], obj['spty'])
    script = `  let ${name} = primitives.line([[${translateVector2D(p1)}],[${translateVector2D(p2)}]])
`
    if (color) {
      script += `  ${name}.color = [${color[0]}, ${color[1]}, ${color[2]}, 1]
`
    }
  } else {
    let p1 = math.vec3.fromValues(obj['pptx'], obj['ppty'], obj['pptz'])
    let p2 = math.vec3.fromValues(obj['sptx'], obj['spty'], obj['sptz'])
    // FIXME how to create a 3D line?
    script = `  let ${name} = primitives.line([[${translateVector3D(p1)}],[${translateVector3D(p2)}]])
`
  }
  obj['script'] = script
  addToLayer(obj, layers)
}

//
// append a Path section to the given script
//
const translateSection = (name, x1, y1, bulg, px, py) => {
  // console.log('translateSection',x1,y1,bulg,px,py)
  if (bulg === 0) {
  // add straight line to the end of the path
    return `geometry.path2.appendPoints([[${x1},${y1}]], ${name})
`
  }

  // add arc to the end of the path
  let prev = math.vec2.fromValues(px, py)
  let curr = math.vec2.fromValues(x1, y1)
  let u = math.vec2.distance(prev, curr)
  let r = u * ((1 + Math.pow(bulg, 2)) / (4 * bulg))
  let clockwise = (bulg < 0)
  let large = false // FIXME how to determine?
  let d = Math.atan(bulg) * 4
  // FIXME need to determine segments from object/layer/variables
  let res = 16
  return `geometry.path2.appendArc({endpoint: [${x1},${y1}],radius: [${r},${r}],xaxisrotation: ${d},clockwise: ${clockwise},large: ${large},segments: ${res}}, ${name})
`
}

//
// translate the given obj (lwpolyline) into a 2D path
//
const translatePath2D = (obj, layers, options) => {
  const closed = parseInt('00000000000000001', 2)

  // expected values
  let vlen = obj['vlen']
  let pptxs = obj['pptxs']
  let pptys = obj['pptys']
  let bulgs = obj['bulgs']
  let flags = obj['lflg']
  let name = obj['name']

  // FIXME add color when supported
  // let cn = getColorNumber(obj, layers)
  // let color = getColor(cn, options.colorindex)

  // translation
  let script = `  let ${name} = geometry.path2.create()
`
  let isclosed = ((flags & closed) === closed)
  if (vlen === pptxs.length && vlen === pptys.length && vlen === bulgs.length) {
    // add initial point
    script += `  ${name} = geometry.path2.appendPoints([[${pptxs[0]}, ${pptys[0]}]], ${name})
`
    // add sections
    for (let i = 0; i < pptxs.length; i++) {
      let j = (i + 1) % pptxs.length
      let cx = pptxs[j]
      let cy = pptys[j]
      let px = pptxs[i]
      let py = pptys[i]
      let bulg = bulgs[i] // apply the previous bulg
      if ((j !== 0) || (j === 0 && isclosed)) {
        script += `  ${name} = ${translateSection(name, cx, cy, bulg, px, py)}`
      }
    }
  } else {
  // FIXME flag this DXF error
    return
  }
  if (isclosed) {
    script += `  ${name} = geometry.path2.close(${name})
`
  } else {
    script += '\n'
  }
  obj['script'] = script
  addToLayer(obj, layers)
}

//
// translate the given object (arc) into 2D path or 3D path??
//
const translateArc = (obj, layers, options) => {
// expected values
  let lthk = obj['lthk']
  let pptx = obj['pptx']
  let ppty = obj['ppty']
  // let pptz = obj['pptz']
  let swid = obj['swid']
  let ang0 = obj['ang0'] // start angle (degrees)
  let ang1 = obj['ang1'] // end angle (degrees)

  let name = obj['name']

  // FIXME need to determine segements from object/layer/variables
  let res = 16

  // convert to 2D object
  if (lthk === 0.0) {
    // convert angles to radians
    ang0 *= 0.017453292519943295
    ang1 *= 0.017453292519943295

    let script = `  let ${name} = primitives.arc({center: [${pptx}, ${ppty}], radius: ${swid}, startAngle: ${ang0}, endAngle: ${ang1}, segements: ${res}})
`
    obj['script'] = script
    addToLayer(obj, layers)
  }
  // FIXME how to represent 3D arc?
}

//
// translate the given obj (circle) into a 2D circle (or extrude to 3D)
//
const translateCircle = (obj, layers, options) => {
// expected values
  let lthk = obj['lthk']
  let pptx = obj['pptx']
  let ppty = obj['ppty']
  // let pptz = obj['pptz']
  let swid = obj['swid']
  let name = obj['name']

  let cn = getColorNumber(obj, layers)
  let color = getColor(cn, options.colorindex)

  // FIXME need to determine segments from object/layer/variables
  let res = 16

  // convert to 2D object
  if (lthk === 0.0) {
    let script = `  let ${name} = primitives.circle({center: [${pptx},${ppty}],radius: ${swid},segments: ${res}})
`
    if (color) {
      script += `  ${name}.color = [${color[0]}, ${color[1]}, ${color[2]}, 1]
`
    }
    obj['script'] = script
    addToLayer(obj, layers)
    return
  }

  // convert to 3D object
  let script = `  let ${name} = primitives.circle({center: [${pptx},${ppty}],radius: ${swid},segments: ${res}).extrude({offset: [0,0,${lthk}]})
`

  // FIXME need to use 210/220/230 for direction of rotation
  obj['script'] = script
  addToLayer(obj, layers)
}

//
// translate the given object (ellipse) into a 2D ellipse (or extrude to 3D)
//
const translateEllipse = (obj, layers, options) => {
// expected values
  let pptx = obj['pptx'] // center point
  let ppty = obj['ppty']
  let pptz = obj['pptz']
  let sptx = obj['sptx'] // MAJOR axis point (relative to center point)
  let spty = obj['spty']
  let sptz = obj['sptz']
  let swid = obj['swid'] // Ratio of minor axis to major axis
  let name = obj['name']
  // FIXME need to determine segments from object/layer/variables
  let res = 16

  // convert to 2D object
  if (pptz === 0.0 && sptz === 0.0) {
    let center = math.vec2.fromValues(0, 0)
    let mjaxis = math.vec2.fromValues(sptx, spty)
    let rx = math.vec2.distance(center, mjaxis)
    let ry = rx * swid
    let angle = Math.atan2(spty, sptx) // * 180 / Math.PI
    // FIXME add start and end angle when supported

    let script = `  let ${name} = primitives.ellipse({center: [0, 0], radius: [${rx}, ${ry}], segments: ${res}})
  let ${name}matrix = math.mat4.multiply(math.mat4.fromTranslation([${pptx}, ${ppty}, 0]), math.mat4.fromZRotation(${angle}))
  ${name} = geometry.geom2.transform(${name}matrix, ${name})
`
    obj['script'] = script
    addToLayer(obj, layers)
  }
  // convert to 3D object
}

const instantiateFaces = (fvals) => {
  let faces = []
  let vi = 0
  while (vi < fvals.length) {
    let fi = fvals[vi++]
    let face = []
    while (fi > 0) {
      face.push(fvals[vi++])
      fi--
    }
    faces.push(face)
  }
  return faces
}

const instantiatePoints = (pptxs, pptys, pptzs) => {
  let points = []
  let vi = 0
  while (vi < pptxs.length) {
    let x = pptxs[vi]
    let y = pptys[vi]
    let z = pptzs[vi]
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
  let vlen = obj['vlen']
  let pptxs = obj['pptxs'] // vertices
  let pptys = obj['pptys']
  let pptzs = obj['pptzs']

  let flen = obj['flen']
  let fvals = obj['fvals'] // faces

  // conversion
  let cn = getColorNumber(obj, layers)
  let color = getColor(cn, options.colorindex)

  let polygons = []
  if (vlen === pptxs.length && vlen === pptys.length && vlen === pptzs.length) {
    if (flen === fvals.length) {
      let faces = instantiateFaces(fvals)
      let points = instantiatePoints(pptxs, pptys, pptzs)

      let fi = 0
      while (fi < faces.length) {
        let face = faces[fi]
        let vertices = []
        let vi = 0
        while (vi < face.length) {
          let pi = face[vi]
          let vector = math.vec3.fromArray(points[pi])
          vertices.push(vector)
          vi++
        }
        if (options.dxf.angdir === 1) {
          vertices = vertices.reverse()
        }
        // FIXME how to correct bad normals?

        let poly = geometry.poly3.create(vertices)
        if (color) poly.color = color
        polygons.push(poly)

        fi++
      }
    } else {
    }
  } else {
  // invalid vlen
  }
  // convert the polygons into a script
  let name = obj['name']
  let script = `  const ${name}_polygons = [
`
  for (let polygon of polygons) {
    script += '    ' + translatePolygon(polygon) + ',\n'
  }
  script += `  ]
  let ${name} = geometry.geom3.create(${name}_polygons)
`
  obj['script'] = script
  addToLayer(obj, layers)
  return null
}

const findLayer = (obj, layers) => {
  let lname = obj['lnam'] || '0'

  // lookup the layer associated with the object
  for (let layer of layers) {
    if (layer['name'] === lname) {
      return layer
    }
  }
  return null
}

const findLayer0 = (layers) => {
  for (let layer of layers) {
    if (layer['name'] === '0') {
      return layer
    }
  }
  // this DXF did not specify so create
  let layer = { type: 'layer' }
  layer['lnam'] = 'layer0'
  layer['name'] = '0'
  layer['lscl'] = 1.0
  layer['visb'] = 0
  layer['spac'] = 0
  layer['objects'] = []

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
    layer['objects'] = []
  }
  layer['objects'].push(obj)
}

//
// get the color number of the object, possibly looking at layer
// returns -1 if a color number was not found
//
const getColorNumber = (obj, layers) => {
  let cn = obj['cnmb'] || -1
  if (cn === BYLAYER) {
    // use the color number from the layer
    cn = -1
    let layer = findLayer(obj, layers)
    if (layer !== null) {
      cn = layer['cnmb'] || -1
    }
  } else
  if (cn === BYBLOCK) {
    // use the color number from the block
  }
  return cn
}

const mod = (num, mod) => {
  let remain = num % mod
  return Math.floor(remain >= 0 ? remain : remain + mod)
}

//
// instantiate color using the given index into the given color index
// Note: 0 > index <= length of colorindex
const getColor = (index, colorindex) => {
  if (index < 1) { return null }

  index = mod(index, colorindex.length)
  let color = colorindex[index - 1]
  let rgba = [color[0] / 255, color[1] / 255, color[2] / 255, color[3] / 255]
  return rgba
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

  let flags = obj['lflg']
  let ptype = null
  if ((flags & d3line) === d3line) {
    let isclosed = ((flags & closedM) === closedM)
    ptype = { type: '3dline', isclosed: isclosed }
  } else
  if ((flags & d3mesh) === d3mesh) {
    ptype = { type: '3dpolymesh' }
    // need the mesh shape for interpretation
    ptype['fvia'] = obj['fvia']
    ptype['fvib'] = obj['fvib']
    let closed = ((flags & closedM) === closedM)
    ptype.closedM = closed
    closed = ((flags & closedN) === closedN)
    ptype.closedN = closed
  } else
  if ((flags & d3face) === d3face) {
    ptype = { type: '3dpolyfaces' }
    // need the vertex and face counts for interpretation
    ptype['fvia'] = obj['fvia']
    ptype['fvib'] = obj['fvib']
  } else {
    let isclosed = ((flags & closedM) === closedM)
    ptype = { type: '2dline', isclosed: isclosed }
  }
  if ('cnmb' in obj) { ptype['cnmb'] = obj['cnmb'] }
  if ('lnam' in obj) { ptype['lnam'] = obj['lnam'] }
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
    let n = (((x - 1) * meshN) + (y - 1))
    let part = parts[n]
    return part.vec
  }

  let facets = []

  // sanity check
  let fcount = meshM * meshN
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
      let v0 = getVector(i, j)
      let v1 = getVector(i + 1, j)
      let v2 = getVector(i + 1, j + 1)
      let v3 = getVector(i, j + 1) // CCW vectors
      let facet = [v0, v1, v2, v3]
      if (options.dxf.angdir === 1) {
        facet = facet.reverse()
      }
      let polygon = geometry.poly3.create(facet)
      if (Number.isFinite(polygon.plane[3])) {
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
  let faces = []

  // sanity check
  if ((meshM + meshN) !== parts.length) {
    return faces
  }
  // conversion
  let i = meshM // skip to the faces
  while (i < parts.length) {
    let part = parts[i]
    let indexes = [Math.abs(part['fvia']), Math.abs(part['fvib']), Math.abs(part['fvic']), Math.abs(part['fvid'])]
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
      let polygon = geometry.poly3.create(vertices)
      if (color) polygon.color = color
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
  obj['vlen'] = parts.length
  obj['pptxs'] = []
  obj['pptys'] = []
  obj['bulgs'] = []
  for (let part of parts) {
    obj['pptxs'].push(part.vec[0])
    obj['pptys'].push(part.vec[1])
    obj['bulgs'].push(part['bulg'])
  }
  if (obj.isclosed) {
    obj['lflg'] = parseInt('00000000000000001', 2)
  } else {
    obj['lflg'] = 0
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

  let type = obj.type
  // console.log('##### translating Current as '+type)
  if (type === '2dline') {
    return translateAs2Dline(obj, layers, parts, options)
  }

  if (type === '3dline') {
    // FIXME what to do?
    return null
  }

  if (type === '3dpolymesh') {
    let m = obj['fvia']
    let n = obj['fvib']
    // console.log('##### m: '+m+' n: '+n)
    let cn = getColorNumber(obj, layers)
    let color = getColor(cn, options.colorindex)
    let facets = instantiateFacets(m, n, parts, color, options)
    parts = facets
    // fall through, translating the parts (polygons)
  }

  if (type === '3dpolyfaces') {
    if ('fvia' in obj) {
      let m = obj['fvia']
      let n = obj['fvib']
      let cn = getColorNumber(obj, layers)
      let color = getColor(cn, options.colorindex)
      let faces = instantiatePolyFaces(m, n, parts, color, options)
      parts = faces
      // fall through, translating the parts (polygons)
    }
  }
  // convert the polygons into a script
  let name = obj['name']
  let script = `  const ${name}_polygons = [
`
  for (let polygon of parts) {
    script += '    ' + translatePolygon(polygon) + ',\n'
  }
  script += `  ]
  let ${name} = geometry.geom3.create(${name}_polygons)
`
  obj['script'] = script
  addToLayer(obj, layers)
  return null
}

//
// translate the given layer into a wrapper function for the previous translated objects
//
const translateLayer = (layer) => {
  let name = layer['lnam'] || 'Unknown'

  let script = `function ${name}() {
`
  for (let object of layer['objects']) {
    script += object['script']
  }
  script += '  return ['
  for (let object of layer['objects']) {
    script += object['name'] + ','
  }
  script += ']\n}\n'
  return script
}

const saveVariable = (obj, options) => {
  let name = obj['name'] || 'Unknown'

  switch (name) {
    case '$ANGDIR':
      if ('lflg' in obj) {
        options.dxf.angdir = obj['lflg']
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

  let layers = [] // list of layers with various information like color
  let current = null // the object being created
  let parts = [] // the list of object subparts (polygons or vectors)
  let numobjs = 0

  // findLayer0(layers)

  let p = null
  for (let obj of reader.objstack) {
    p = null

    if (!('type' in obj)) {
      // console.log('##### skip')
      continue
    }
    if (!('name' in obj)) {
      obj['name'] = 'jscad' + numobjs
      numobjs = numobjs + 1
    } else {
      // UGG... javascript variable names
      let name = obj['name']
      name = name.replace(/ /g, '_')
      name = name.replace(/-/g, '_')
      name = name.replace(/\./g, '_')
      obj['name'] = name
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
        obj['objects'] = [] // with a list of objects
        obj['lnam'] = 'layer' + layers.length
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
          current['name'] = 'jscad' + numobjs
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
        translateCircle(obj, layers, options)
        parts = []
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
        if (current === null) {
          // console.log('##### start of polyline')
          current = getPolyType(obj)
          current['name'] = 'jscad' + numobjs
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
    if (geometry.poly3.isA(p)) {
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
  let script = 'function main() {\n  let layers = []\n  return layers.concat('
  layers.forEach((layer) => {
      let name = layer['lnam'] || 'Unknown'
      script += `${name}(),`
  })
  script += '[])\n}\n'

  // add helper functions for polygons and lines
  script +=
`
function createPolygon(listofpoints, color) {
  let polygon = geometry.poly3.fromPoints(listofpoints)
  if (color) polygon.color = color
  return polygon
}
`

  layers.forEach((layer) => {
      script += translateLayer(layer)
  })
  // console.log(script)
  // console.log('**************************************************')
  return script
}

module.exports = translateAsciiDxf
