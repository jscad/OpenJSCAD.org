/*
## License

Copyright (c) 2017 Z3 Development https://github.com/z3dev

All code released under MIT license

*/
const { CSG } = require('@jscad/csg')

const {BYBLOCK, BYLAYER} = require('./autocad')
const {instantiatePolygon, instantiateVector} = require('./instantiate')

//
// helper function to simplify code
//
function createVertex(vector) {
  return new CSG.Vertex(vector)
}

//
// translate the give 2D vector to JSCAD script
//
function translateVector2D (vector) {
  let script = `new CSG.Vector2D(${vector.x},${vector.y})`
  return script
}

//
// translate the give 3D vector to JSCAD script
//
function translateVector3D (vector) {
  let script = `${vector.x},${vector.y},${vector.z}`
  return script
}

//
// translate the given CSG.Polygon into JSCAD script
//
function translatePolygon (polygon) {
  let script = 'createPolygon(['
  for (let vertex of polygon.vertices) {
    script += `${translateVertex(vertex)},`
  }
  script += `],${translateShared(polygon.shared)},${translatePlane(polygon.plane)})`
  return script
}

//
// translate the given CSG.Plane to JSCAD script
//
function translatePlane (plane) {
  let script = `[${translateVector3D(plane.normal)},${plane.w}]`
  return script
}

//
// translate the given CSG.Polygon.Shared to JSCAD script
//
function translateShared (shared) {
  let script = 'null'
  if (shared !== null && shared.color !== null) {
    let rgb = shared.color
    script = `[${rgb[0]},${rgb[1]},${rgb[2]},${rgb[3]}]`
  }
  return script
}

//
// translate the given CSG.Vertex to JSCAD script
//
function translateVertex (vertex) {
  let script = `[${translateVector3D(vertex.pos)}]`
  return script
}

//
// translate the given DXF object (line) into 2D or 3D line
//
function translateLine (obj, layers, options) {
  let name = obj['name']
  let script = ''
  if (obj['pptz'] === obj['sptz'] & obj['pptz'] === 0) {
    let p1 = new CSG.Vector2D([obj['pptx'], obj['ppty']])
    let p2 = new CSG.Vector2D([obj['sptx'], obj['spty']])
    script = `  let ${name} = CSG.Line2D.fromPoints(${translateVector2D(p1)},${translateVector2D(p2)})
`
  } else {
    let p1 = new CSG.Vector3D([obj['pptx'], obj['ppty'], obj['pptz']])
    let p2 = new CSG.Vector3D([obj['sptx'], obj['spty'], obj['sptz']])
    script = `  let ${name} = CSG.Line3D.fromPoints(${translateVector3D(p1)},${translateVector3D(p2)})
`
  }
  obj['script'] = script
  addToLayer(obj, layers)
}

//
// append a Path section to the given script
//
function translateSection (script, x1, y1, bulg, px, py) {
  if (bulg === 0) {
  // add straight line to the end of the path
    script += `.appendPoint( [${x1},${y1}] )`
  } else {
  // add arc to the end of the path
    let prev = new CSG.Vector2D(px, py)
    let curr = new CSG.Vector2D(x1, y1)
    let u = prev.distanceTo(curr)
    let r = u * ((1 + Math.pow(bulg, 2)) / (4 * bulg))
    let clockwise = (bulg < 0)
    let large = false // FIXME how to determine?
    let d = Math.atan(bulg) / (Math.PI / 180) * 4
    // FIXME need to determine resolution from object/layer/variables
    let res = CSG.defaultResolution2D
    script += `.appendArc([${x1},${y1}],{radius: ${r},xaxisrotation: ${d},clockwise: ${clockwise},large: ${large},resolution: ${res}})`
  }
  return script
}

//
// translate the given obj (lwpolyline) into a CSG.Path2D
//
function translatePath2D (obj, layers, options) {
  const closed = parseInt('00000000000000001', 2)

  // expected values
  let  vlen = obj['vlen']
  let pptxs = obj['pptxs']
  let pptys = obj['pptys']
  let bulgs = obj['bulgs']
  let flags = obj['lflg']
  let  name = obj['name']

  // translation
  let script = `  let ${name} = new CSG.Path2D()
`
  let isclosed = ((flags & closed) === closed)
  if (vlen === pptxs.length && vlen === pptys.length && vlen === bulgs.length) {
    script += `  ${name} = ${name}` // sections appended below
    pptxs.forEach(function (item, index, array) {
      let bulg = 0
      let px = 0
      let py = 0
      if (index > 0) {
        bulg = bulgs[index - 1] // apply the previous bulg
        px = pptxs[index - 1]
        py = pptys[index - 1]
      }
      script = translateSection(script, pptxs[index], pptys[index], bulg, px, py)
    })
  } else {
  // FIXME flag this DXF error
    return
  }
  // FIXME add optional to create CAG from the path
  if (isclosed) {
  // apply the last section between last and first points
    let bulg = bulgs[vlen - 1] // apply the previous bulg
    let px = pptxs[vlen - 1]
    let py = pptys[vlen - 1]
    script = translateSection(script, pptxs[0], pptys[0], bulg, px, py)
    script += `
  ${name} = ${name}.close()
  ${name} = CAG.fromPoints(${name}.points)
`
  } else {
    script += '\n'
  }
  obj['script'] = script
  addToLayer(obj, layers)
}

//
// translate the given object (arc) into CAG.Path2D or CSG??
//
function translateArc (obj, layers, options) {
// expected values
  let lthk = obj['lthk']
  let pptx = obj['pptx']
  let ppty = obj['ppty']
  let pptz = obj['pptz']
  let swid = obj['swid']
  let ang0 = obj['ang0'] // start angle
  let ang1 = obj['ang1'] // end angle
  let name = obj['name']

  // convert to 2D object
  if (lthk === 0.0) {
  // FIXME need to determine resolution from object/layer/variables
    let res = CSG.defaultResolution2D
    let script = `  let ${name} = CSG.Path2D.arc({center: [${pptx},${ppty}],radius: ${swid},startangle: ${ang0},endangle: ${ang1}, resolution: ${res}})
`
    obj['script'] = script
    addToLayer(obj, layers)
    return
  }
  // FIXME how to represent 3D arc?
}

//
// translate the given obj (circle) into CAG.circle (or extrude to CSG)
//
function translateCircle (obj, layers, options) {
// expected values
  let lthk = obj['lthk']
  let pptx = obj['pptx']
  let ppty = obj['ppty']
  let pptz = obj['pptz']
  let swid = obj['swid']
  let name = obj['name']

  // FIXME add color when supported
  // let cn = getColorNumber(obj,layers)
  // let shared = getColor(cn,options.colorindex)
  // FIXME need to determine resolution from object/layer/variables
  let res = CSG.defaultResolution2D

  // convert to 2D object
  if (lthk === 0.0) {
    let script = `  let ${name} = CAG.circle({center: [${pptx},${ppty}],radius: ${swid},resolution: ${res}})
`
    obj['script'] = script
    addToLayer(obj, layers)
    return
  }

  // convert to 3D object
  let script = `  let ${name} = CAG.circle({center: [${pptx},${ppty}],radius: ${swid},resolution: ${res}).extrude({offset: [0,0,${lthk}]})
`
  // FIXME need to use 210/220/230 for direction of rotation
  obj['script'] = script
  addToLayer(obj, layers)
}

//
// translate the given object (ellipse) into CAG.ellipse or CSG??
//
function translateEllipse (obj, layers, options) {
// expected values
  let pptx = obj['pptx'] // center point
  let ppty = obj['ppty']
  let pptz = obj['pptz']
  let sptx = obj['sptx'] // MAJOR axis point (about center point)
  let spty = obj['spty']
  let sptz = obj['sptz']
  let swid = obj['swid'] // Ratio of minor axis to major axis
  let name = obj['name']
  // FIXME need to determine resolution from object/layer/variables
  let res = CSG.defaultResolution2D

  // convert to 2D object
  if (pptz === 0.0 && sptz === 0.0) {
    let center = new CSG.Vector2D(0, 0)
    let mjaxis = new CSG.Vector2D(sptx, spty)
    let rx = center.distanceTo(mjaxis)
    let ry = rx * swid
    let angle = Math.atan2(spty, sptx) * 180 / Math.PI
    if (angle < CSG.EPS) angle = 0
    // FIXME add start and end angle when supported
    let script = `  let ${name} = CAG.ellipse({center: [0,0],radius: [${rx},${ry}],resolution: ${res}}).rotateZ(${angle}).translate([${pptx},${ppty}])
`
    obj['script'] = script
    addToLayer(obj, layers)
    return
  }
  // convert to 3D object
}

function instantiateFaces (fvals) {
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

function instantiatePoints (pptxs, pptys, pptzs) {
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
// instantiate the MESH as an CSG object, consisting of the polygons given
//
// Note: See Face-Vertex meshes on Wikipedia
//
function translateMesh (obj, layers, options) {
// expected values
  let vlen = obj['vlen']
  let pptxs = obj['pptxs'] // vertices
  let pptys = obj['pptys']
  let pptzs = obj['pptzs']

  let flen = obj['flen']
  let fvals = obj['fvals'] // faces

  // conversion
  let cn = getColorNumber(obj, layers)
  let shared = getColor(cn, options.colorindex)

  CSG._CSGDEBUG = false

  let polygons = []
  if (vlen === pptxs.length && vlen === pptys.length && vlen === pptzs.length) {
    if (flen === fvals.length) {
      let faces = instantiateFaces(fvals)
      let points = instantiatePoints(pptxs, pptys, pptzs)

      let fi = 0
      while (fi < faces.length) {
        let face = faces[fi]
        let vectors = []
        let vertices = [] // did i hear someone say REDUNDANCY
        let vi = 0
        while (vi < face.length) {
          let pi = face[vi]
          let vector = new CSG.Vector3D(points[pi])
          vectors.push(vector)
          let vertex = createVertex(vector)
          vertices.push(vertex)
          vi++
        }
        if (options.dxf.angdir === 1) {
          vertices = vertices.reverse()
        }
        // FIXME how to correct bad normals?

        let poly = new CSG.Polygon(vertices, shared)
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
  let ${name} = CSG.fromPolygons(${name}_polygons)
`
  obj['script'] = script
  addToLayer(obj, layers)
  return null
}

function findLayer (obj, layers) {
  let lname = obj['lnam'] || '0'

  // lookup the layer associated with the object
  for (let layer of layers) {
    if (layer['name'] === lname) {
      return layer
    }
  }
  return null
}

function findLayer0 (layers) {
  for (let layer of layers) {
    if (layer['name'] === '0') {
      return layer
    }
  }
  // this DXF did not specify so create
  let layer = {type: 'layer'}
  layer['lnam'] = 'layer0'
  layer['name'] = '0'
  layer['lscl'] = 1.0
  layer['visb'] = 0
  layer['spac'] = 0
  layer['objects'] = []

  layers.push(layer)
  return layer
}

function addToLayer (obj, layers) {
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
function getColorNumber (obj, layers) {
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

function mod (num, mod) {
  let remain = num % mod
  return Math.floor(remain >= 0 ? remain : remain + mod)
}

//
// instantiate Polygon.Shared(color) using the given index into the given color index
// Note: 0 > index <= length of colorindex
function getColor (index, colorindex) {
  if (index < 1) { return null }

  index = mod(index, colorindex.length)
  let rgba = colorindex[index-1]
  return new CSG.Polygon.Shared.fromColor([rgba[0]/255,rgba[1]/255,rgba[2]/255,rgba[3]/255])
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
function getPolyType (obj) {
  const closedM = parseInt('00000000000000001', 2)
  const  d3line = parseInt('00000000000001000', 2)
  const  d3mesh = parseInt('00000000000010000', 2)
  const closedN = parseInt('00000000000100000', 2)
  const  d3face = parseInt('00000000001000000', 2)

  let flags = obj['lflg']
  let ptype = null
  if ((flags & d3line) === d3line) {
    let isclosed = ((flags & closedM) === closedM)
    ptype = {type: '3dline',isclosed: isclosed}
  } else
  if ((flags & d3mesh) === d3mesh) {
    ptype = {type: '3dpolymesh'}
    // need the mesh shape for interpretation
    ptype['fvia'] = obj['fvia']
    ptype['fvib'] = obj['fvib']
    let closed = ((flags & closedM) === closedM)
    ptype.closedM = closed
    closed = ((flags & closedN) === closedN)
    ptype.closedN = closed
  } else
  if ((flags & d3face) === d3face) {
    ptype = {type: '3dpolyfaces'}
    // need the vertex and face counts for interpretation
    ptype['fvia'] = obj['fvia']
    ptype['fvib'] = obj['fvib']
  } else {
    let isclosed = ((flags & closedM) === closedM)
    ptype = {type: '2dline',isclosed: isclosed}
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
function instantiateFacets (meshM, meshN, vectors, shared, options) {
  // console.log('##### instantiateFacets('+meshM+','+meshN+')')

  function getVector (x, y) {
    let n = (((x - 1) * meshN) + (y - 1))
    return vectors[n]
  }

  let facets = []

  // sanity check
  let fcount = meshM * meshN
  if (fcount !== vectors.length) {
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
      let v0 = createVertex(getVector(i, j))
      let v1 = createVertex(getVector(i + 1, j))
      let v2 = createVertex(getVector(i + 1, j + 1))
      let v3 = createVertex(getVector(i, j + 1)) // CCW vectors
      let facet = [v0, v1, v2, v3]
      if (options.dxf.angdir === 1) {
        facet = facet.reverse()
      }
      let polygon = new CSG.Polygon(facet, shared)
      if (Number.isFinite(polygon.plane.w)) {
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
function instantiatePolyFaces (meshM, meshN, vectors, shared, options) {
  // console.log('##### instantiatePolyFaces('+meshM+','+meshN+')')
  let faces = []

  // sanity check
  if ((meshM + meshN) !== vectors.length) {
    return faces
  }
  // conversion
  let i = meshM // skip to the faces
  while (i < vectors.length) {
    let face = vectors[i]
    let indexes = [Math.abs(face['fvia']),Math.abs(face['fvib']),Math.abs(face['fvic']),Math.abs(face['fvid'])]
    let vertices = []
    if (indexes[0] > 0) {
      vertices.push(createVertex(vectors[indexes[0] - 1]))
      if (indexes[1] > 0) {
        vertices.push(createVertex(vectors[indexes[1] - 1]))
        if (indexes[2] > 0) {
          vertices.push(createVertex(vectors[indexes[2] - 1]))
          if (indexes[3] > 0) {
            vertices.push(createVertex(vectors[indexes[3] - 1]))
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
      faces.push(new CSG.Polygon(vertices, shared))
    }
    i++
  }
  return faces
}

//
// Translate a 2D line from the given base object and parts.
// The translation uses the parts as 2D vertexes from POLYLINE.
//
function translateAs2Dline(obj, layers, parts, options) {
  // console.log('##### completing Path2D using vectors')
  // convert the parts to a series of X/Y/BULG lists
  obj['vlen'] = parts.length
  obj['pptxs'] = []
  obj['pptys'] = []
  obj['bulgs'] = []
  for (let vector of parts) {
    obj['pptxs'].push(vector.x)
    obj['pptys'].push(vector.y)
    obj['bulgs'].push(vector['bulg'])
  }
  if (obj.closed) {
    obj['lflg'] = parseInt('00000000000000001', 2)
  } else {
    obj['lflg'] = 0
  }
  translatePath2D(obj, layers, options)
  return null
}

//
// translate a complex object from the given base object and parts
// - CSG plus a series of polygons => CSG
// - Path2D plus a series of 2D vectors => Path2D
// - CSG plus a series of 3D vectors => CSG
//
function translateCurrent (obj, layers, parts, options) {
  if (obj === null) return null

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
    let i = parts.length
    // console.log('##### m: '+m+' n: '+n+' i: '+i)
    let cn = getColorNumber(obj, layers)
    let shared = getColor(cn, options.colorindex)
    let facets = instantiateFacets(m, n, parts, shared, options)
    parts = facets
    // fall through, translating the parts (polygons)
  }

  if (type === '3dpolyfaces') {
    if ('fvia' in obj) {
      let m = obj['fvia']
      let n = obj['fvib']
      let cn = getColorNumber(obj, layers)
      let shared = getColor(cn, options.colorindex)
      let faces = instantiatePolyFaces(m, n, parts, shared, options)
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
  let ${name} = CSG.fromPolygons(${name}_polygons)
`
  obj['script'] = script
  addToLayer(obj, layers)
  return null
}

//
// translate the given layer into a wrapper function for the previous translated objects
//
function translateLayer (layer) {
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

function saveVariable (obj, options) {
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

const translateAsciiDxf = function (reader, options) {
  // console.log('**************************************************')
  // console.log(JSON.stringify(reader.objstack))
  // console.log('**************************************************')

  let  layers = [] // list of layers with various information like color
  let current = null // the object being created
  let   parts = [] // the list of object subparts (polygons or vectors)
  let objects = [] // the list of objects translated
  let numobjs = 0

  findLayer0(layers)

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
      name = obj['name']
      name = name.replace(/ /g,'_')
      name = name.replace(/-/g,'_')
      name = name.replace(/\./g,'_')
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
          // console.log('##### start of 3dfaces CSG')
          current = {type: '3dfaces'}
          current['name'] = 'jscad' + numobjs
          numobjs = numobjs + 1
        }
        break
      case 'mesh':
        // console.log('##### mesh')
        current = translateCurrent(current, layers, parts, options)
        parts = []
        //objects.push(instantiateMesh(obj, layers, options))
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
    if (p instanceof CSG.Polygon) {
      // console.log('##### push Polygon')
      parts.push(p)
    }
    // accumlate vectors if necessary
    if (p instanceof CSG.Vector3D) {
      // console.log('##### push Vector3D')
      parts.push(p)
    }
    if (p instanceof CSG.Vector2D) {
      // console.log('##### push Vector2D')
      parts.push(p)
    }
  }
  // translate the last object if necessary
  current = translateCurrent(current, layers, parts, options)

  // debug output
  // console.log('**************************************************')
  let script = 'function main() {\n  let layers = []\n  return layers.concat('
  layers.forEach(
    function (layer) {
      let name = layer['lnam'] || 'Unknown'
      script += `${name}(),`
    }
  )
  script += '[])\n}\n'

  // add helper functions for polygons and lines
  script += 
`function createVertex(point) {
  return new CSG.Vertex(new CSG.Vector3D(point[0],point[1],point[2]))
}
function createPlane(pointandw) {
  return new CSG.Plane(new CSG.Vector3D(pointandw[0],pointandw[1],pointandw[2]),pointandw[3])
}
function createPolygon(listofpoints,color,pointandw) {
  let vertices = []
  for (let point of listofpoints) {
    vertices.push(createVertex(point))
  }
  let shared = new CSG.Polygon.Shared(color)
  let plane = createPlane(pointandw)
  return new CSG.Polygon(vertices,shared,plane)
}
`

  layers.forEach(
    function (layer) {
      script += translateLayer(layer)
    }
  )
  // console.log(script)
  // console.log('**************************************************')
  return script
}

module.exports = translateAsciiDxf
