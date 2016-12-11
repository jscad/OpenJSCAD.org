/*const path = require('path')
const lib = global.lib //FIXME: EEEK !! horrible
const formatsPath = path.resolve(lib, './formats.js')
const CSG = require(formatsPath).CSG // use the CSG with extended prototypes
const CAG = require(formatsPath).CAG // use the CAG with extended prototypes
const blobPath = path.resolve(lib, './Blob.js')
const Blob = require(blobPath).Blob*/

//these should be use instead, double check for CLI use
const CSG = require('../formats').CSG // use the CSG with extended prototypes
const CAG = require('../formats').CAG // use the CAG with extended prototypes
const Blob = require('../Blob').Blob
const evaluateSource = require('./evaluateSource')

/**
 * generate output data from source
 * @param {Object} modelingHelpers the modeling helpers module loaded as string
 * @param {Object} meta optional metadata (AMF only)
 * @param {Object} mainParams hash of parameters to pass to main function
 * @param {String} outputFormat
 * @param {String} src the original source
 * @return the output data
 */
function generateOutputData (modelingHelpers, meta, mainParams, outputFormat, src)
{
  if (outputFormat === 'jscad' || outputFormat === 'js') {
    //  console.log(`Blob: type [${data.type}] size [${data.size}]`)
    return new Blob([src], { type: 'application/javascript' })
  } else {
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
    return outputFormatHandlers[outputFormat]()
  }
}
module.exports = generateOutputData
