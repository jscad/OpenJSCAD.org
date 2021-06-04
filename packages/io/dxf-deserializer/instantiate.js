/*
## License

Copyright (c) 2017 Z3 Development https://github.com/z3dev

All code released under MIT license

*/
const { geometries, maths, primitives } = require('@jscad/modeling')
const EPS = 1e-5 // FIXME

const { getColor, getColorNumber } = require('./helpers')

//
// instantiate the given object (3dface) as a polygon
//
const instantiatePolygon = (obj, layers, options) => {
  const vertices = []
  // FIXME: should check global variable to instantiate in the proper orientation
  vertices.push(maths.vec3.fromValues(obj.pptx, obj.ppty, obj.pptz))
  vertices.push(maths.vec3.fromValues(obj.sptx, obj.spty, obj.sptz))
  vertices.push(maths.vec3.fromValues(obj.tptx, obj.tpty, obj.tptz))
  if (obj.fptx) {
    let pushit = false
    if (obj.tptx !== obj.fptx) { pushit = true }
    if (obj.tpty !== obj.fpty) { pushit = true }
    if (obj.tptz !== obj.fptz) { pushit = true }
    if (pushit) {
      vertices.push(maths.vec3.fromValues(obj.fptx, obj.fpty, obj.fptz))
    }
  }
  const cn = getColorNumber(obj, layers)
  const color = getColor(cn, options.colorindex)

  const polygon = geometries.poly3.create(vertices)
  if (color) polygon.color = color
  return polygon
}

//
// instantiate the given object (line) as a 2D line or a 3D line
//
const instantiateLine = (obj, layers, options) => {
  // console.log('***** instantiateLine',obj)
  if (obj.pptz === obj.sptz && obj.pptz === 0) {
    const p1 = maths.vec2.fromValues(obj.pptx, obj.ppty)
    const p2 = maths.vec2.fromValues(obj.sptx, obj.spty)
    return primitives.line([p1, p2])
  }

  const p1 = maths.vec3.fromValues(obj.pptx, obj.ppty, obj.pptz)
  const p2 = maths.vec3.fromValues(obj.sptx, obj.spty, obj.sptz)
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

  const flags = obj.lflg
  const vtype = {}
  if ((flags & d3line) === d3line) {
    vtype.vec = maths.vec3.fromValues(obj.pptx, obj.ppty, obj.pptz)
  } else
  if ((flags & d3mesh) === d3mesh) {
    vtype.vec = maths.vec3.fromValues(obj.pptx, obj.ppty, obj.pptz)
  } else
  if ((flags & d3face) === d3face) {
    vtype.vec = maths.vec3.fromValues(obj.pptx, obj.ppty, obj.pptz)
    // pass on face indexes
    vtype.fvia = obj.fvia
    vtype.fvib = obj.fvib
    vtype.fvic = obj.fvic
    vtype.fvid = obj.fvid
  } else {
    vtype.vec = maths.vec2.fromValues(obj.pptx, obj.ppty)
    vtype.bulg = obj.bulg // for rendering curved sections
  }
  return vtype
}

//
// append a section to the given path
//
const addSection = (path, x1, y1, bulg) => {
  if (bulg === 0) {
  // add straight line to the end of the path
    path = geometries.path2.appendPoints([[x1, y1]], path)
  } else {
  // add arc to the end of the path
    const points = geometries.path2.toPoints(path)
    const prev = points[points.length - 1]
    const curr = maths.vec2.fromValues(x1, y1)
    const u = maths.vec2.distance(prev, curr)
    const r = u * ((1 + Math.pow(bulg, 2)) / (4 * bulg))
    const clockwise = (bulg < 0)
    const large = false // FIXME how to determine?
    const d = Math.atan(bulg) * 4
    // FIXME; how to determine resolution
    const res = 16
    path = geometries.path2.appendArc({ endpoint: [x1, y1], radius: [r, r], xaxisrotation: d, clockwise: clockwise, large: large, segments: res }, path)
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
  const vlen = obj.vlen
  const pptxs = obj.pptxs
  const pptys = obj.pptys
  const bulgs = obj.bulgs
  const flags = obj.lflg

  // conversion
  let path = geometries.path2.create()
  const isclosed = ((flags & closed) === closed)
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
    path = geometries.path2.close(path)
    // FIXME add optional to create 2D geometry from the path
  }
  return path
}

//
// instantiate the given object (arc) into 2D path (or extruded to 3D)
//
const instantiateArc = (obj, layers, options) => {
  // expected values
  const lthk = obj.lthk
  const pptx = obj.pptx
  const ppty = obj.ppty
  // const pptz = obj.pptz
  const swid = obj.swid
  let ang0 = obj.ang0 // start angle
  ang0 = ang0 * 0.017453292519943295 // radians
  let ang1 = obj.ang1 // end angle
  ang1 = ang1 * 0.017453292519943295 // radians
  // FIXME need to determine resolution from object/layer/variables
  const res = 16

  // conversion
  if (lthk === 0.0) {
    // convert to 2D object
    return primitives.arc({ center: [pptx, ppty], radius: swid, startAngle: ang0, endAngle: ang1, segments: res })
  }
  // FIXME how to represent 3D arc?
  return primitives.arc({ center: [pptx, ppty], radius: swid, startAngle: ang0, endAngle: ang1, segments: res })
}

//
// instantiate the given object (circle) into 2D circle (or extrude to 3D)
//
const instantiateCircle = (obj, layers, options) => {
  // expected values
  const lthk = obj.lthk
  const pptx = obj.pptx
  const ppty = obj.ppty
  // let pptz = obj.pptz
  const swid = obj.swid

  // conversion
  const cn = getColorNumber(obj, layers)
  const color = getColor(cn, options.colorindex)
  // FIXME need to determine resolution from object/layer/variables
  const res = 16

  // convert to 2D object
  if (lthk === 0.0) {
    const cag = primitives.circle({ center: [pptx, ppty], radius: swid, segments: res })
    if (color) cag.color = color
    return cag
  }
  // convert to 3D object
  const cag = primitives.circle({ center: [pptx, ppty], radius: swid, segments: res })
  const csg = cag.extrude({ offset: [0, 0, lthk] })
  // FIXME need to use 210/220/230 for direction of extrusion
  if (color) csg.color = color
  return csg
}

//
// instantiate the give object (ellipse) into 2D ellipse (or extrude to 3D)
//
const instantiateEllipse = (obj, layers, options) => {
  // expected values
  const pptx = obj.pptx // center point
  const ppty = obj.ppty
  const pptz = obj.pptz
  const sptx = obj.sptx // MAJOR axis point (about center point)
  const spty = obj.spty
  const sptz = obj.sptz
  const swid = obj.swid // Ratio of minor axis to major axis
  // FIXME need to determine resolution from object/layer/variables
  const res = 16

  // convert to 2D object
  if (pptz === 0.0 && sptz === 0.0) {
    const center = maths.vec2.fromValues(0, 0)
    const mjaxis = maths.vec2.fromValues(sptx, spty)
    const rx = maths.vec2.distance(center, mjaxis)
    const ry = rx * swid
    let angle = Math.atan2(spty, sptx) * 180 / Math.PI
    if (angle < EPS) angle = 0
    angle = angle * 0.017453292519943295 // radians

    // FIXME add start and end angle when supported
    const cag = primitives.ellipse({ center: [0, 0], radius: [rx, ry], segments: res })
    const matrix = maths.mat4.fromZRotation(maths.mat4.create(), angle)
    maths.mat4.multiply(matrix, matrix, maths.mat4.fromTranslation(maths.mat4.create(), [pptx, ppty, 0]))
    return geometries.geom2.transform(matrix, cag)
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
// instantiate the given object (mesh) into a 3D geometry
//
// Note: See Face-Vertex meshes on Wikipedia
//
const instantiateMesh = (obj, layers, options) => {
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
          const vertex = maths.vec3.clone(points[pi])
          vertices.push(vertex)
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
      // invalid flen
    }
  } else {
    // invalid vlen
  }
  return geometries.geom3.create(polygons)
}

// works for both POLYLINE
const getPolyType = (obj) => {
  const closedM = parseInt('00000000000000001', 2)
  const d3line = parseInt('00000000000001000', 2)
  const d3mesh = parseInt('00000000000010000', 2)
  const closedN = parseInt('00000000000100000', 2)
  const d3face = parseInt('00000000001000000', 2)

  const flags = obj.lflg
  let ptype = null
  if ((flags & d3line) === d3line) {
    // const isclosed = ((flags & closedM) === closedM)
    ptype = null // FIXME what to do?
  } else
  if ((flags & d3mesh) === d3mesh) {
    ptype = geometries.geom3.create()
    ptype.closedM = ((flags & closedM) === closedM)
    ptype.closedN = ((flags & closedN) === closedN)
  } else
  if ((flags & d3face) === d3face) {
    ptype = geometries.geom3.create()
    ptype.closedM = ((flags & closedM) === closedM)
    ptype.closedN = ((flags & closedN) === closedN)
  } else {
    ptype = geometries.path2.create()
    ptype.closedM = ((flags & closedM) === closedM)
  }
  if ('cnmb' in obj) { ptype.cnmb = obj.cnmb }
  return ptype
}

//
// complete a complex object from the given base object and parts
// - a series of 3dfaces => polygons => 3D geometry
// - a series of vertex => vectors => 2D geometry
//
const completeCurrent = (objects, baseobj, polygons, vectors, options) => {
  if (geometries.path2.isA(baseobj)) {
    // console.log('##### completing 2D geometry')
    const points = vectors.map((vector) => vector.vec)
    // FIXME add color support
    objects.push(geometries.path2.fromPoints({ closed: baseobj.closed }, points))
  }
  if (geometries.geom3.isA(baseobj)) {
    // console.log('##### completing 3D geometry')
    // FIXME add color support
    objects.push(geometries.geom3.create(polygons))
  }
  return null
}

const instantiateAsciiDxf = (reader, options) => {
  // console.log('**************************************************')
  // console.log(JSON.stringify(reader.objstack));
  // console.log('**************************************************')

  const layers = [] // list of layers with various information like color
  let current = null // the object being created
  const polygons = [] // the list of 3D polygons
  const objects = [] // the list of objects instantiated
  const vectors = [] // the list of vectors for paths or meshes

  let p = null
  for (const obj of reader.objstack) {
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
          current = geometries.geom3.create()
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
    if (geometries.poly3.isA(p)) {
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
