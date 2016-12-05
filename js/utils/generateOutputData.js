const fs = require('fs')
const path = require('path')
const evaluateSource = require('./evaluateSource')

function generateOutputData (outputFormat, src, mainParams, meta, CSG, CAG, lib, Blob) {
  let data
  if (outputFormat === 'jscad' || outputFormat === 'js') {
    data = new Blob([src], { type: 'application/javascript' })
  } else {
    const modelingHelpers = fs.readFileSync(path.resolve(lib, './openscad.js')) // FIXME : UGHH these are helper functions, rename & handle better
    const csgObject = evaluateSource(modelingHelpers, CAG, mainParams, src)
    const outputFormatHandlers = {
      'amf': () => csgObject.toAMFString(meta), // CSG to AMF
      'stlb': () => csgObject.toStlBinary(), // CSG to STL BINARY
      'stl': () => csgObject.toStlString(), // CSG to STL ASCII
      'stla': () => csgObject.toStlString(), // CSG to STL ASCII
      'dxf': () => csgObject.toDxf(), // CAG to DXF
      'svg': () => csgObject.toSvg(), // CAG to SVG
      'x3d': () => csgObject.toX3D(), // CSG to X3D Only possible via browsers
      'json': () => csgObject.toJSON(), // CSG or CAG to JSON
      undefined: () => {
        console.log('ERROR: only jscad, stl, amf, dxf, svg or json as output format')
        process.exit(1)
      }
    }
    data = outputFormatHandlers[outputFormat]()
    return data
  }
  console.log(`Blob: type [${data.type}] size [${data.size}]`)
  return data
}
module.exports = generateOutputData
