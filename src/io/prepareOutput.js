import { formats } from './formats'
import {convertToSolid2} from '../core/convertToSolid'

/*import CSGToStla from '@jscad/io/writers/CSGToStla'
import CSGToStlb from '@jscad/io/writers/CSGToStlb'
import CSGToAMF from '@jscad/io/writers/CSGToAMF'
import CSGToX3D from '@jscad/io/writers/CSGToX3D'
import CAGToSvg from '@jscad/io/writers/CAGToSvg'
import CAGToJson from '@jscad/io/writers/CAGToJson'
import CAGToDxf from '@jscad/io/writers/CAGToDxf'*/
import {stlSerializer} from '@jscad/io'
import {amfSerializer} from '@jscad/io'
import {x3dSerializer} from '@jscad/io'
import {svgSerializer} from '@jscad/io'
import {jsonSerializer} from '@jscad/io'
import {dxfSerializer} from '@jscad/io'


export function prepareOutput (objects, params) {
  const {format, version = '0.0.0'} = params

  let object

  if (format === 'jscad') {
    object = objects
  } else {
    const formatInfo = formats[format]
    object = convertToSolid2(objects, formatInfo)
  }

  const metaData = {
    producer: 'OpenJSCAD.org ' + version,
    date: new Date(),
    version
  }

  const foo = require('@jscad/io')


  const outputFormatHandlers = {
    amf: amfSerializer, // CSG to AMF
    stl: stlSerializer, // CSG to STL ASCII // NOTE: now using binary output by default !!
    stla: {
      mimeType: stlSerializer.mimeType,
      serialize: data => stlSerializer.serialize(data, {binary: false})
    }, // CSG to STL ASCII
    stlb: stlSerializer, // CSG to STL BINARY
    dxf: dxfSerializer, // CAG to DXF
    svg: svgSerializer, // CAG to SVG
    x3d: x3dSerializer, // CSG to X3D
    json: jsonSerializer, // CSG or CAG to JSON
    js: {
      mimeType: formats['js'].mimetype,
      serialize: object => [object] // jscad , pass through
    },
    jscad: {
      mimeType: formats['jscad'].mimetype,
      serialize: object => [object] // js , pass through
    },
    undefined: () => {
      throw new Error('Not supported : only jscad, stl, amf, dxf, svg or json as output format')
    }
  }
  const data = outputFormatHandlers[format].serialize(object, metaData)
  const mimeType = outputFormatHandlers[format].mimeType
  return {data, mimeType}
}
