/*
## License

Copyright (c) 2017 Z3 Development https://github.com/z3dev

All code released under MIT license

*/
const { CSG, CAG } = require('@jscad/csg')

const {BYBLOCK, BYLAYER} = require('./autocad')

//
// instantiate the given object (3dface) as a polygon
//
function instantiatePolygon (obj, layers, options) {
  let vertices = []
  // FIXME: should check global variable to instantiate in the proper orientation
  vertices.push(new CSG.Vertex(new CSG.Vector3D([obj['pptx'], obj['ppty'], obj['pptz']])))
  vertices.push(new CSG.Vertex(new CSG.Vector3D([obj['sptx'], obj['spty'], obj['sptz']])))
  vertices.push(new CSG.Vertex(new CSG.Vector3D([obj['tptx'], obj['tpty'], obj['tptz']])))
  if (obj['fptx']) {
    let pushit = false
    if (obj['tptx'] !== obj['fptx']) { pushit = true }
    if (obj['tpty'] !== obj['fpty']) { pushit = true }
    if (obj['tptz'] !== obj['fptz']) { pushit = true }
    if (pushit) {
      vertices.push(new CSG.Vertex(new CSG.Vector3D([obj['fptx'], obj['fpty'], obj['fptz']])))
    }
  }
  let cn = getColorNumber(obj, layers)
  let shared = getColor(cn, options.colorindex)
  return new CSG.Polygon(vertices, shared)
}

//
// instantiate the given object (line) as CSG.Line2D or CSG.Line3D
//
function instantiateLine (obj, layers, options) {
  let csg = null
  if (obj['pptz'] === obj['sptz'] & obj['pptz'] === 0) {
    let p1 = new CSG.Vector2D([obj['pptx'], obj['ppty']])
    let p2 = new CSG.Vector2D([obj['sptx'], obj['spty']])
    csg = CSG.Line2D.fromPoints(p1, p2)
  } else {
    let p1 = new CSG.Vector3D([obj['pptx'], obj['ppty'], obj['pptz']])
    let p2 = new CSG.Vector3D([obj['sptx'], obj['spty'], obj['sptz']])
    csg = CSG.Line3D.fromPoints(p1, p2)
  }
  return csg
}

//
// instantiate the give object as CSG.Vector2D or CSG.Vector3D
//
function instantiateVector (obj) {
  const d3line = parseInt('00000000000100000', 2)
  const d3mesh = parseInt('00000000001000000', 2)
  const d3face = parseInt('00000000010000000', 2)

  let flags = obj['lflg']
  let vtype = null
  if ((flags & d3line) === d3line) {
    vtype = new CSG.Vector3D([obj['pptx'], obj['ppty'], obj['pptz']])
  } else
  if ((flags & d3mesh) === d3mesh) {
    vtype = new CSG.Vector3D([obj['pptx'], obj['ppty'], obj['pptz']])
  } else
  if ((flags & d3face) === d3face) {
    vtype = new CSG.Vector3D([obj['pptx'], obj['ppty'], obj['pptz']])
    // pass on face indexes
    vtype['fvia'] = obj['fvia']
    vtype['fvib'] = obj['fvib']
    vtype['fvic'] = obj['fvic']
    vtype['fvid'] = obj['fvid']
  } else {
    vtype = new CSG.Vector2D(obj['pptx'], obj['ppty'])
    vtype['bulg'] = obj['bulg'] // for rendering curved sections
  }
  return vtype
}

//
// append a section to the given path
//
function addSection (path, x1, y1, bulg) {
  if (bulg === 0) {
  // add straight line to the end of the path
    path = path.appendPoint([x1, y1])
  } else {
  // add arc to the end of the path
    let prev = path.points[path.points.length - 1]
    let curr = new CSG.Vector2D(x1, y1)
    let u = prev.distanceTo(curr)
    let r = u * ((1 + Math.pow(bulg, 2)) / (4 * bulg))
    let clockwise = (bulg < 0)
    let large = false // FIXME how to determine?
    let d = Math.atan(bulg) / (Math.PI / 180) * 4
    // FIXME; add resolution
    path = path.appendArc([x1, y1], {radius: r, xaxisrotation: d, clockwise: clockwise, large: large})
  }
  return path
}

//
// instantiate the given object (lwpolyline) into a CSG.Path2D
//
function instantiatePath2D (obj, layers, options) {
  const closed = parseInt('00000000000000001', 2)

  // expected values
  let  vlen = obj['vlen']
  let pptxs = obj['pptxs']
  let pptys = obj['pptys']
  let bulgs = obj['bulgs']
  let flags = obj['lflg']

  // conversion
  let path = new CSG.Path2D()
  let isclosed = ((flags & closed) === closed)
  if (vlen === pptxs.length && vlen === pptys.length && vlen === bulgs.length) {
    pptxs.forEach(function (item, index, array) {
      let bulg = 0
      if (index > 0) {
        bulg = bulgs[index - 1] // apply the previous bulg
      }
      path = addSection(path, pptxs[index], pptys[index], bulg)
    })
  } else {
  // FIXME flag this DXF error
    return path
  }
  // FIXME add optional to create CAG from the path
  if (isclosed) {
  // apply the last section between last and first points
    path = addSection(path, pptxs[0], pptys[0], bulgs[vlen - 1])
    path = path.close()
    return CAG.fromPoints(path.points)
  }
  return path
}

//
// instantiate the given object (arc) into CSG.Path2D or CSG??
//
function instantiateArc (obj, layers, options) {
  // expected values
  let lthk = obj['lthk']
  let pptx = obj['pptx']
  let ppty = obj['ppty']
  // let pptz = obj['pptz']
  let swid = obj['swid']
  let ang0 = obj['ang0'] // start angle
  let ang1 = obj['ang1'] // end angle
  // FIXME need to determine resolution from object/layer/variables
  let res = CSG.defaultResolution2D

  // conversion
  if (lthk === 0.0) {
    // convert to 2D object
    return CSG.Path2D.arc({center: [pptx, ppty], radius: swid, startangle: ang0, endangle: ang1, resolution: res})
  }
  // FIXME how to represent 3D arc?
  return CSG.Path2D.arc({center: [pptx, ppty], radius: swid, startangle: ang0, endangle: ang1, resolution: res})
}

//
// instantiate the given object (circle) into CAG.circle (or extrude to CSG)
//
function instantiateCircle (obj, layers, options) {
  // expected values
  let lthk = obj['lthk']
  let pptx = obj['pptx']
  let ppty = obj['ppty']
  // let pptz = obj['pptz']
  let swid = obj['swid']

  // conversion
  // FIXME add color when supported
  // let cn = getColorNumber(obj,layers)
  // let shared = getColor(cn,options.colorindex)
  // FIXME need to determine resolution from object/layer/variables
  let res = CSG.defaultResolution2D

  // convert to 2D object
  if (lthk === 0.0) {
    let cag = CAG.circle({center: [pptx, ppty], radius: swid, resolution: res})
    return cag
  }
  // convert to 3D object
  let cag = CAG.circle({center: [pptx, ppty], radius: swid, resolution: res})
  let csg = cag.extrude({offset: [0, 0, lthk]})
  // FIXME need to use 210/220/230 for direction of extrusion
  return csg
}

//
// instantiate the give object (ellipse) into CAG.ellipse (or extrude to CSG)
//
function instantiateEllipse (obj, layers, options) {
  // expected values
  let pptx = obj['pptx'] // center point
  let ppty = obj['ppty']
  let pptz = obj['pptz']
  let sptx = obj['sptx'] // MAJOR axis point (about center point)
  let spty = obj['spty']
  let sptz = obj['sptz']
  let swid = obj['swid'] // Ratio of minor axis to major axis
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
    let cag = CAG.ellipse({center: [0,0], radius: [rx, ry], resolution: res}).rotateZ(angle).translate([pptx,ppty])
    return cag
  }
  // convert to 3D object
}

function createEdges (vlen, faces) {
  let edges = []
  while (vlen > 0) {
    edges.push([])
    vlen--
  }
  let mod3 = Math.floor(faces.length / 3) * 3
  if (mod3 === faces.length) {
    let fi = 0
    while (fi < faces.length) {
      let v1 = faces[fi++]
      let v2 = faces[fi++]
      let v3 = faces[fi++]
      if (v1 === v2 || v1 === v3 || v2 === v3) continue

      let edge = edges[v1]
      if (edge.indexOf(v2) < 0) { edge.push(v2) }
      if (edge.indexOf(v3) < 0) { edge.push(v3) }

      edge = edges[v2]
      if (edge.indexOf(v3) < 0) { edge.push(v3) }
      if (edge.indexOf(v1) < 0) { edge.push(v1) }

      edge = edges[v3]
      if (edge.indexOf(v1) < 0) { edge.push(v1) }
      if (edge.indexOf(v2) < 0) { edge.push(v2) }
    }
  }
  return edges
}

function createFaces (edgesByVertex) {
  let v1 = edgesByVertex.length
  let faces = []
  while (v1 > 0) {
    v1--
    let v1edges = edgesByVertex[v1]
    let e1i = v1edges.length
    while (e1i > 0) {
      e1i--
      let v2 = v1edges[e1i]
      let v2edges = edgesByVertex[v2]
      // search for common vertexes
      let e2i = v2edges.length
      while (e2i > 0) {
        e2i--
        let v3 = v2edges[e2i]
        if (v1edges.indexOf(v3) < 0) continue
        faces.push([v1, v2, v3])
      }
    }
  }
  return faces
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
// instantiate the given object (mesh) into a CSG
//
// Note: See Face-Vertex meshes on Wikipedia
//
function instantiateMesh (obj, layers, options) {
  // expected values
  let  vlen = obj['vlen']
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
          let vertex = new CSG.Vertex(vector)
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
      // invalid flen
    }
  } else {
    // invalid vlen
  }
  return CSG.fromPolygons(polygons)
}

//
// find the layer referenced by the given object
//
function findLayer (obj, layers) {
  let lname = obj['lnam'] || '0'
  for (let layer of layers) {
    if (layer['name'] === lname) {
      return layer
    }
  }
  return null
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
    cn = -1
  }
  return cn
}

function mod (num, mod) {
  let remain = num % mod
  return Math.floor(remain >= 0 ? remain : remain + mod)
}

//
// instantiate Polygon.Shared(color) using the given index into the given color index
//
function getColor (index, colorindex) {
  if (index < 0) { return null }

  index = mod(index, colorindex.length)
  let rgba = colorindex[index]
  // FIXME : colors should be cached and shared
  return new CSG.Polygon.Shared(rgba)
}

// works for both POLYLINE
function getPolyType (obj) {
  const closed = parseInt('00000000000000001', 2)
  const d3line = parseInt('00000000000001000', 2)
  const d3mesh = parseInt('00000000000010000', 2)

  let flags = obj['lflg']
  let ptype = null
  if ((flags & d3line) === d3line) {
    ptype = null // FIXME what to do?
  } else
  if ((flags & d3mesh) === d3mesh) {
    ptype = new CSG()
  } else {
    let isclosed = ((flags & closed) === closed)
    ptype = new CSG.Path2D([], isclosed)
  }
  return ptype
}

//
// complete a complex object from the given base object and parts
// - a series of 3dfaces => polygons => CSG
// - a series of vertex => vectors => Path2D
//
function completeCurrent (objects, baseobj, polygons, vectors, options) {
  if (baseobj instanceof CSG.Path2D) {
    // console.log('##### completing Path2D')
    objects.push(new CSG.Path2D(vectors, baseobj.closed))
  }
  if (baseobj instanceof CSG) {
    // console.log('##### completing CSG')
    objects.push(CSG.fromPolygons(polygons))
  }
  return null
}

const instantiateAsciiDxf = function (reader, options) {
  // console.log('**************************************************')
  // console.log(JSON.stringify(reader.objstack));
  // console.log('**************************************************')

  let   layers = [] // list of layers with various information like color
  let  current = null // the object being created
  let polygons = [] // the list of 3D polygons
  let  objects = [] // the list of objects instantiated
  let  vectors = [] // the list of vectors for paths or meshes

  let p = null
  for (let obj of reader.objstack) {
    p = null

    if (!('type' in obj)) {
      // console.log('##### skip')
      continue
    }
    // console.log(JSON.stringify(obj));

    switch (obj.type) {
    // control objects
      case 'dxf':
        break
      case 'layer':
        // console.log('##### layer')
        current = completeCurrent(objects, current, polygons, vectors, options)
        layers.push(obj)
        break
      case 'variable':
        current = completeCurrent(objects, current, polygons, vectors, options)
        break

      // 3D entities
      case '3dface':
        // console.log('##### 3dface')
        p = instantiatePolygon(obj, layers, options)
        if (current === null) {
          // console.log('##### start of 3dfaces CSG')
          current = new CSG()
        }
        break
      case 'mesh':
        // console.log('##### mesh')
        current = completeCurrent(objects, current, polygons, vectors, options)
        objects.push(instantiateMesh(obj, layers, options))
        break

      // 2D or 3D entities
      case 'arc':
        // console.log('##### arc')
        current = completeCurrent(objects, current, polygons, vectors, options)
        objects.push(instantiateArc(obj, layers, options))
        break
      case 'circle':
        // console.log('##### circle')
        current = completeCurrent(objects, current, polygons, vectors, options)
        objects.push(instantiateCircle(obj, layers, options))
        break
      case 'ellipse':
        // console.log('##### ellipse')
        current = completeCurrent(objects, current, polygons, vectors, options)
        objects.push(instantiateEllipse(obj, layers, options))
        break
      case 'line':
        // console.log('##### line')
        current = completeCurrent(objects, current, polygons, vectors, options)
        objects.push(instantiateLine(obj, layers, options))
        break
      case 'polyline':
        if (current === null) {
          // console.log('##### start of polyline')
          current = getPolyType(obj)
        }
        break
      case 'vertex':
        // console.log('##### vertex')
        p = instantiateVector(obj)
        break
      case 'seqend':
        current = completeCurrent(objects, current, polygons, vectors, options)
        break

      // 2D entities
      case 'lwpolyline':
        // console.log('##### lwpolyline')
        current = completeCurrent(objects, current, polygons, vectors, options)
        objects.push(instantiatePath2D(obj, layers, options))
        break

      default:
        // console.log('##### ERROR')
        // console.log(obj.type)
        break
    }
    // accumlate polygons if necessary
    if (p instanceof CSG.Polygon) {
      polygons.push(p)
    }
    // accumlate vectors if necessary
    if (p instanceof CSG.Vector3D) {
      vectors.push(p)
    }
    if (p instanceof CSG.Vector2D) {
      vectors.push(p)
    }
  }
  // instantiate the last object if necessary
  current = completeCurrent(objects, current, polygons, vectors, options)

  // debug output
  // console.log('**************************************************')
  // objects.forEach(
  //   function(e) {
  //     console.log(JSON.stringify(e));
  //   }
  // );
  // console.log('**************************************************')
  return objects
}

module.exports = {
  instantiatePolygon,
  instantiateVector,
  instantiateAsciiDxf
}
