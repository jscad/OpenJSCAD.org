import { version } from '../jscad/version'
import { CSG, CAG } from '../csg'
import toStlString from '../io/writers/CSGToStla'
import toStlBinary from '../io/writers/CSGToStlb'
import toAMFString from '../io/writers/CSGToAMF'
import toX3D from '../io/writers/CSGToX3D'
import CAGtoSvg from '../io/writers/CAGtoSvg'
import CAGToJson from '../io/writers/CAGToJson'
import CAGtoDxf from '../io/writers/CAGtoDxf'

import {toArray} from '../utils/misc'
const Blob = typeof window !== 'undefined' ? window.Blob : require('../utils/Blob').default

export default function convertToBlob (objects, params) {
  const {format, formatInfo} = params

  let object

  if (format === 'jscad') {
    object = objects
  } else {
    objects = toArray(objects)
    //console.log('convertToBlob', objects, format)
    //console.log('object', objects[0], objects[0] instanceof CSG)

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
    amf: (object) => toAMFString(object, meta), // CSG to AMF
    stl: (object) => toStlString(object), // CSG to STL ASCII
    stla: (object) => toStlString(object), // CSG to STL ASCII
    stlb: (object) => toStlBinary(object, {webBlob: true}), // CSG to STL BINARY
    dxf: (object) => CAGtoDxf(object), // CAG to DXF
    svg: (object) => CAGtoSvg(object), // CAG to SVG
    x3d: (object) => toX3D(object.fixTJunctions()), // CSG to X3D Only possible via browsers
    json: (object) => CAGToJson(object), // CSG or CAG to JSON
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
