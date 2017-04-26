import { CSG, CAG } from '@jscad/csg'
import { makeBlob } from '@jscad/io'
import { formats } from './formats'

/*import CSGToStla from '@jscad/io/writers/CSGToStla'
import CSGToStlb from '@jscad/io/writers/CSGToStlb'
import CSGToAMF from '@jscad/io/writers/CSGToAMF'
import CSGToX3D from '@jscad/io/writers/CSGToX3D'
import CAGToSvg from '@jscad/io/writers/CAGToSvg'
import CAGToJson from '@jscad/io/writers/CAGToJson'
import CAGToDxf from '@jscad/io/writers/CAGToDxf'*/
import {CSGToStla} from '@jscad/io'
import {CSGToStlb} from '@jscad/io'
import {CSGToAMF} from '@jscad/io'
import {CSGToX3D} from '@jscad/io'
import {CAGToSvg} from '@jscad/io'
import {CAGToJson} from '@jscad/io'
import {CAGToDxf} from '@jscad/io'

import {toArray} from '../utils/misc'
const Blob = makeBlob()

export function convertToBlob (objects, params) {
  const {format, version = '0.0.0'} = params

  let object

  if (format === 'jscad') {
    object = objects
  } else {
    objects = toArray(objects)
    const formatInfo = formats[format]
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

  const metaData = {
    producer: 'OpenJSCAD.org ' + version,
    date: new Date(),
    version
  }

  // helpers for jscad & js formats to align them with the other writers
  const CSGToJscad = {
    mimeType: formats['jscad'].mimetype,
    write: object => [object] // js , pass through
  }

  const CSGToJs = {
    mimeType: formats['js'].mimetype,
    write: object => [object] // jscad , pass through
  }

  const outputFormatHandlers = {
    amf: CSGToAMF, // CSG to AMF
    stl: CSGToStla, // CSG to STL ASCII
    stla: CSGToStla, // CSG to STL ASCII
    stlb: CSGToStlb, // CSG to STL BINARY
    dxf: CAGToDxf, // CAG to DXF
    svg: CAGToSvg, // CAG to SVG
    x3d: CSGToX3D, // CSG to X3D
    json: CAGToJson, // CSG or CAG to JSON
    js: CSGToJs, // js , pass through
    jscad: CSGToJscad, // jscad, pass through
    undefined: () => {
      throw new Error('Not supported : only jscad, stl, amf, dxf, svg or json as output format')
    }
  }
  const blob = new Blob(outputFormatHandlers[format].write(object, metaData), { type: outputFormatHandlers[format].mimeType })

  return blob
}
