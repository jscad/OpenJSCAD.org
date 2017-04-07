import { CSG, CAG } from '@jscad/csg'
import CSGToStla from './writers/CSGToStla'
import CSGToStlb from './writers/CSGToStlb'
import CSGToAMF from './writers/CSGToAMF'
import CSGToX3D from './writers/CSGToX3D'
import CAGToSvg from './writers/CAGToSvg'
import CAGToJson from './writers/CAGToJson'
import CAGToDxf from './writers/CAGToDxf'

import {toArray} from './utils/misc'
import makeBlob from './utils/Blob'
const Blob = makeBlob()

export default function convertToBlob (objects, params) {
  const {format, formatInfo, version = '0.0.0'} = params

  let object

  if (format === 'jscad') {
    object = objects
  } else {
    objects = toArray(objects)
    // console.log('convertToBlob', objects, format)
    // console.log('object', objects[0], objects[0] instanceof CSG)

    // review the given objects
    let foundCSG = false
    let foundCAG = false
    for (let i = 0; i < objects.length; i++) {
      if (objects[i] instanceof CSG) { foundCSG = true }
      if (objects[i] instanceof CAG) { foundCAG = true }
    }
    // convert based on the given format
    foundCSG = foundCSG && formatInfo.convertCSG
    foundCAG = foundCAG && formatInfo.convertCAG
    if (foundCSG && foundCAG) { foundCAG = false } // use 3D conversion

    object = !foundCSG ? new CAG() : new CSG()

    for (let i = 0; i < objects.length; i++) {
      if (foundCSG === true && objects[i] instanceof CAG) {
        object = object.union(objects[i].extrude({offset: [0, 0, 0.1]})) // convert CAG to a thin solid CSG
        continue
      }
      if (foundCAG === true && objects[i] instanceof CSG) {
        continue
      }
      object = object.union(objects[i])
    }
  }

  const meta = {
    producer: 'OpenJSCAD.org ' + version,
    date: new Date()
  }

  const outputFormatHandlers = {
    amf: (object) => CSGToAMF(object, meta), // CSG to AMF
    stl: (object) => CSGToStla(object, {version}), // CSG to STL ASCII
    stla: (object) => CSGToStla(object, {version}), // CSG to STL ASCII
    stlb: (object) => CSGToStlb(object, {webBlob: true, version}), // CSG to STL BINARY
    dxf: (object) => CAGToDxf(object, {version}), // CAG to DXF
    svg: (object) => CAGToSvg(object, {version}), // CAG to SVG
    x3d: (object) => CSGToX3D(object.fixTJunctions(), {version}),
    json: (object) => CAGToJson(object, {version}), // CSG or CAG to JSON
    js: (object) => object, // js , pass through
    jscad: (object) => object, // jscad, pass through
    undefined: () => {
      throw new Error('Not supported : only jscad, stl, amf, dxf, svg or json as output format')
    }
  }

  let blob = outputFormatHandlers[format](object)

  if (format === 'jscad') {
    blob = new Blob([blob], { type: formatInfo.mimetype })
  }
  return blob
}
