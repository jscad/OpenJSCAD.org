/*
## License

Copyright (c) 2017 Z3 Development https://github.com/z3dev

All code released under MIT license

*/
const { geometry, math, primitives, transforms } = require('@jscad/modeling')
const EPS = 1e-5 // FIXME

const { findLayer, getColor, getColorNumber } = require('./helpers')

//
// instantiate the given object (3dface) as a polygon
//
const instantiatePolygon = (obj, layers, options) => {
  let vertices = []
  // FIXME: should check global variable to instantiate in the proper orientation
  vertices.push(math.vec3.fromValues(obj['pptx'], obj['ppty'], obj['pptz']))
  vertices.push(math.vec3.fromValues(obj['sptx'], obj['spty'], obj['sptz']))
  vertices.push(math.vec3.fromValues(obj['tptx'], obj['tpty'], obj['tptz']))
  if (obj['fptx']) {
    let pushit = false
    if (obj['tptx'] !== obj['fptx']) { pushit = true }
    if (obj['tpty'] !== obj['fpty']) { pushit = true }
    if (obj['tptz'] !== obj['fptz']) { pushit = true }
    if (pushit) {
      vertices.push(math.vec3.fromValues(obj['fptx'], obj['fpty'], obj['fptz']))
    }
  }
  let cn = getColorNumber(obj, layers)
  let color = getColor(cn, options.colorindex)

  let polygon = geometry.poly3.create(vertices)
  if (color) polygon.color = color
  return polygon
}

//
// instantiate the given object (line) as a 2D line or a 3D line
//
const instantiateLine = (obj, layers, options) => {
  // console.log('***** instantiateLine',obj)
  if (obj['pptz'] === obj['sptz'] & obj['pptz'] === 0) {
    let p1 = math.vec2.fromValues(obj['pptx'], obj['ppty'])
    let p2 = math.vec2.fromValues(obj['sptx'], obj['spty'])
    return primitives.line([p1, p2])
  }

  let p1 = math.vec3.fromValues(obj['pptx'], obj['ppty'], obj['pptz'])
  let p2 = math.vec3.fromValues(obj['sptx'], obj['spty'], obj['sptz'])
  // FIXME what should this really create?
  return primitives.line([p1, p2])
}

//
// instantiate the give object as 2D Vector or 3D Vector wrapped as an object
//
const instantiateVector = (obj) => {
  const d3line = parseInt('00000000000100000', 2)
  const d3mesh = parseInt('00000000001000000', 2)
  const d3face = parseInt('00000000010000000', 2)

  let flags = obj['lflg']
  let vtype = {}
  if ((flags & d3line) === d3line) {
    vtype['vec'] = math.vec3.fromValues(obj['pptx'], obj['ppty'], obj['pptz'])
  } else
  if ((flags & d3mesh) === d3mesh) {
    vtype['vec'] = math.vec3.fromValues(obj['pptx'], obj['ppty'], obj['pptz'])
  } else
  if ((flags & d3face) === d3face) {
    vtype['vec'] = math.vec3.fromValues(obj['pptx'], obj['ppty'], obj['pptz'])
    // pass on face indexes
    vtype['fvia'] = obj['fvia']
    vtype['fvib'] = obj['fvib']
    vtype['fvic'] = obj['fvic']
    vtype['fvid'] = obj['fvid']
  } else {
    vtype['vec'] = math.vec2.fromValues(obj['pptx'], obj['ppty'])
    vtype['bulg'] = obj['bulg'] // for rendering curved sections
  }
  return vtype
}

//
// append a section to the given path
//
const addSection = (path, x1, y1, bulg) => {
  if (bulg === 0) {
  // add straight line to the end of the path
    path = geometry.path2.appendPoints([[x1, y1]], path)
  } else {
  // add arc to the end of the path
    let points = geometry.path2.toPoints(path)
    let prev = points[points.length - 1]
    let curr = math.vec2.fromValues(x1, y1)
    let u = math.vec2.distance(prev, curr)
    let r = u * ((1 + Math.pow(bulg, 2)) / (4 * bulg))
    let clockwise = (bulg < 0)
    let large = false // FIXME how to determine?
    // let d = Math.atan(bulg) / (Math.PI / 180) * 4
    let d = Math.atan(bulg) * 4
    // FIXME; how to determine resolution
    let res = 16
    path = geometry.path2.appendArc({ endpoint: [x1, y1], radius: [r, r], xaxisrotation: d, clockwise: clockwise, large: large, segments: res }, path)
  }
  return path
}

//
// instantiate the given object (lwpolyline) into a 2D path
//
const instantiatePath2D = (obj, layers, options) => {
  // console.log('***** instantiatePath2D',obj)
  const closed = parseInt('00000000000000001', 2)

  // expected values
  let vlen = obj['vlen']
  let pptxs = obj['pptxs']
  let pptys = obj['pptys']
  let bulgs = obj['bulgs']
  let flags = obj['lflg']

  // conversion
  let path = geometry.path2.create()
  let isclosed = ((flags & closed) === closed)
  if (vlen === pptxs.length && vlen === pptys.length && vlen === bulgs.length) {
    pptxs.forEach((item, index, array) => {
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
  if (isclosed && (!path.isClosed)) {
  // apply the last section between last and first points
    path = addSection(path, pptxs[0], pptys[0], bulgs[vlen - 1])
    path = geometry.path2.close(path)
    // FIXME add optional to create 2D geometry from the path
  }
  return path
}

//
// instantiate the given object (arc) into 2D path (or extruded to 3D)
//
const instantiateArc = (obj, layers, options) => {
  // expected values
  let lthk = obj['lthk']
  let pptx = obj['pptx']
  let ppty = obj['ppty']
  // let pptz = obj['pptz']
  let swid = obj['swid']
  let ang0 = obj['ang0'] // start angle
  ang0 = ang0 * 0.017453292519943295 // radians
  let ang1 = obj['ang1'] // end angle
  ang1 = ang1 * 0.017453292519943295 // radians
  // FIXME need to determine resolution from object/layer/variables
  let res = 16

  // conversion
  if (lthk === 0.0) {
    // convert to 2D object
    return transforms.center({ center: [pptx, ppty, 0] }, primitives.arc({ radius: swid, startAngle: ang0, endAngle: ang1, segments: res }))
  }
  // FIXME how to represent 3D arc?
  return transforms.center({ center: [pptx, ppty, 0] }, primitives.arc({ radius: swid, startAngle: ang0, endAngle: ang1, segments: res }))
}

//
// instantiate the given object (circle) into 2D circle (or extrude to 3D)
//
const instantiateCircle = (obj, layers, options) => {
  // expected values
  let lthk = obj['lthk']
  let pptx = obj['pptx']
  let ppty = obj['ppty']
  // let pptz = obj['pptz']
  let swid = obj['swid']

  // conversion
  let cn = getColorNumber(obj, layers)
  let color = getColor(cn, options.colorindex)
  // FIXME need to determine resolution from object/layer/variables
  let res = 16

  // convert to 2D object
  if (lthk === 0.0) {
    let cag = transforms.center({ center: [pptx, ppty, 0] }, primitives.circle({ radius: swid, segments: res }))
    if (color) cag.color = color
    return cag
  }
  // convert to 3D object
  let cag = transforms.center({ center: [pptx, ppty, 0] }, primitives.circle({ radius: swid, segments: res }))
  let csg = cag.extrude({ offset: [0, 0, lthk] })
  // FIXME need to use 210/220/230 for direction of extrusion
  if (color) csg.color = color
  return csg
}

//
// instantiate the give object (ellipse) into 2D ellipse (or extrude to 3D)
//
const instantiateEllipse = (obj, layers, options) => {
  // expected values
  let pptx = obj['pptx'] // center point
  let ppty = obj['ppty']
  let pptz = obj['pptz']
  let sptx = obj['sptx'] // MAJOR axis point (about center point)
  let spty = obj['spty']
  let sptz = obj['sptz']
  let swid = obj['swid'] // Ratio of minor axis to major axis
  // FIXME need to determine resolution from object/layer/variables
  let res = 16

  // convert to 2D object
  if (pptz === 0.0 && sptz === 0.0) {
    let center = math.vec2.fromValues(0, 0)
    let mjaxis = math.vec2.fromValues(sptx, spty)
    let rx = math.vec2.distance(center, mjaxis)
    let ry = rx * swid
    let angle = Math.atan2(spty, sptx) * 180 / Math.PI
    if (angle < EPS) angle = 0
    angle = angle * 0.017453292519943295 // radians

    // FIXME add start and end angle when supported
    let cag = transforms.center({ center: [0, 0, 0] }, primitives.ellipse({ radius: [rx, ry], segments: res }))
    let matrix = math.mat4.fromZRotation(angle)
    matrix = math.mat4.multiply(matrix, math.mat4.fromTranslation([pptx, ppty, 0]))
    // cag.rotateZ(angle).translate([pptx,ppty])
    return geometry.geom2.transform(matrix, cag)
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
// instantiate the given object (mesh) into a 3D geometry
//
// Note: See Face-Vertex meshes on Wikipedia
//
const instantiateMesh = (obj, layers, options) => {
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
          let vertex = math.vec3.fromArray(points[pi])
          vertices.push(vertex)
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
      // invalid flen
    }
  } else {
    // invalid vlen
  }
  return geometry.geom3.create(polygons)
}

// works for both POLYLINE
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
    ptype = null // FIXME what to do?
  } else
  if ((flags & d3mesh) === d3mesh) {
    ptype = geometry.geom3.create()
    ptype.closedM = ((flags & closedM) === closedM)
    ptype.closedN = ((flags & closedN) === closedN)
  } else
  if ((flags & d3face) === d3face) {
    ptype = geometry.geom3.create()
    ptype.closedM = ((flags & closedM) === closedM)
    ptype.closedN = ((flags & closedN) === closedN)
  } else {
    ptype = geometry.path2.create()
    ptype.closedM = ((flags & closedM) === closedM)
  }
  if ('cnmb' in obj) { ptype['cnmb'] = obj['cnmb'] }
  return ptype
}

//
// complete a complex object from the given base object and parts
// - a series of 3dfaces => polygons => 3D geometry
// - a series of vertex => vectors => 2D geometry
//
const completeCurrent = (objects, baseobj, polygons, vectors, options) => {
  if (geometry.path2.isA(baseobj)) {
    // console.log('##### completing 2D geometry')
    let points = vectors.map((vector) => vector.vec)
    // FIXME add color support
    objects.push(geometry.path2.fromPoints({ closed: baseobj.closed }, points))
  }
  if (geometry.geom3.isA(baseobj)) {
    // console.log('##### completing 3D geometry')
    // FIXME add color support
    objects.push(geometry.geom3.create(polygons))
  }
  return null
}

const instantiateAsciiDxf = (reader, options) => {
  // console.log('**************************************************')
  // console.log(JSON.stringify(reader.objstack));
  // console.log('**************************************************')

  let layers = [] // list of layers with various information like color
  let current = null // the object being created
  let polygons = [] // the list of 3D polygons
  let objects = [] // the list of objects instantiated
  let vectors = [] // the list of vectors for paths or meshes

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
          // console.log('##### start of 3dfaces')
          current = geometry.geom3.create()
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
        current = completeCurrent(objects, current, polygons, vectors, options)
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
    if (geometry.poly3.isA(p)) {
      polygons.push(p)
    }
    // accumlate vectors if necessary
    if (p && 'vec' in p && p.vec.length === 3) {
      vectors.push(p)
    }
    if (p && 'vec' in p && p.vec.length === 2) {
      vectors.push(p)
    }
  }
  // instantiate the last object if necessary
  current = completeCurrent(objects, current, polygons, vectors, options)

  // debug output
  // console.log('**************************************************')
  // objects.forEach(
  //   (e) => {
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
