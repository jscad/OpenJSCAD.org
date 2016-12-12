import { version } from '../jscad/version'
import { CSG, CAG } from '../csg'
import toStlString from '../io/writers/CSGToStla'
import toStlBinary from '../io/writers/CSGToStlb'
import toAMFString from '../io/writers/CSGToAMF'
import toX3D from '../io/writers/CSGToX3D'
import CAGtoSvg from '../io/writers/CAGtoSvg'
import CAGToJson from '../io/writers/CAGToJson'

export default function convertToBlob (objs, format, formatInfo, script) {
  console.log('convertToBlob', objs, format)
  // review the given objects
  var i
  var foundCSG = false
  var foundCAG = false
  for (i = 0; i < objs.length; i++) {
    if (objs[i] instanceof CSG) { foundCSG = true }
    if (objs[i] instanceof CAG) { foundCAG = true }
  }
  // convert based on the given format
  foundCSG = foundCSG && formatInfo.convertCSG
  foundCAG = foundCAG && formatInfo.convertCAG
  if (foundCSG && foundCAG) { foundCAG = false } // use 3D conversion

  var object = new CSG()
  if (foundCSG === false) { object = new CAG() }
  for (i = 0; i < objs.length; i++) {
    if (foundCSG === true && objs[i] instanceof CAG) {
      object = object.union(objs[i].extrude({offset: [0, 0, 0.1]})) // convert CAG to a thin solid CSG
      continue
    }
    if (foundCAG === true && objs[i] instanceof CSG) {
      continue
    }
    object = object.union(objs[i])
  }

  var blob = null
  switch (format) {
    case 'stla':
      blob = toStlString(object)
      // blob = object.fixTJunctions().toStlString()
      break
    case 'stlb':
      // blob = this.viewedObject.fixTJunctions().toStlBinary();   // gives normal errors, but we keep it for now (fixTJunctions() needs debugging)
      blob = toStlBinary(object, {webBlob: true})
      break
    case 'amf':
      blob = toAMFString(object, {
        producer: 'OpenJSCAD.org ' + version,
        date: new Date()
      })
      blob = new Blob([blob], { type: formatInfo.mimetype })
      break
    case 'x3d':
      blob = toX3D(object.fixTJunctions())
      break
    case 'dxf':
      blob = object.toDxf()
      break
    case 'svg':
      blob = CAGtoSvg(object)
      break
    case 'jscad':
      blob = new Blob([script], {type: formatInfo.mimetype })
      break
    case 'json':
      blob = CAGToJson(toJSON)
      break
    default:
      throw new Error('Not supported')
  }
  return blob
}
