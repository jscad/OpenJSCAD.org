const fs = require('fs')
const { isAbsolute, resolve } = require('path')
const { solidsAsBlob } = require('@jscad/io')
// const rebuildSolids = require('@jscad/core/code-evaluation/rebuildGeometry')
const rebuildSolids = require('@jscad/core/code-evaluation/rebuildGeometryCli')
const { registerAllExtensions } = require('@jscad/core/io/registerExtensions')

/**
 * generate output data from source
 * @param {String} source the original source
 * @param {Object} params hash of parameters to pass to main function
 * @param {String} options
 * @return a Promise with the output data
 */
const generateOutputData = (source, params, options) => {
  const defaults = {
    outputFile: undefined,
    outputFormat: 'stl',
    inputFile: '',
    version: '',
    addMetaData: true
  }
  options = Object.assign({}, defaults, options)
  const { outputFile, outputFormat, inputFile, inputFormat, version, inputIsDirectory } = options

  const inputPath = isAbsolute(inputFile) ? inputFile : resolve(process.cwd(), inputFile) // path.dirname(inputFile)

  // console.log('foo', outputFile, outputFormat, inputFile, inputFormat, version)
  // objects = rebuildSolid(source, '', params, globals, callback)
  return new Promise(function (resolve, reject) {
    const callback = (err, result) => {
      if (!err) {
        return resolve(result)
      }
      return reject(err)
    }

    // setup support for require-ing files with .jscad, .stl etc extensions
    registerAllExtensions(fs, require)

    const conversionTable = {
      amf: data => require('@jscad/io').amfDeSerializer.deserialize(data.source, data.inputFile, options),
      obj: data => require('@jscad/io').objDeSerializer.deserialize(data.source, data.inputFile, options),
      gcode: data => require('@jscad/io').gcodeDeSerializer.deserialize(data.source, data.inputFile, options),
      stl: data => require('@jscad/io').stlDeSerializer.deserialize(data.source, data.inputFile, options),
      svg: data => require('@jscad/io').svgDeSerializer.deserialize(data.source, data.inputFile, options),
      dxf: data => require('@jscad/io').dxfDeSerializer.deserialize(data.source, data.inputFile, options),
      json: data => require('@jscad/io').jsonDeSerializer.deserialize(data.source, data.inputFile, options),
      jscad: data => data.source,
      js: data => data.source,
      scad: data => {
        const source = !data.source.match(/^\/\/!OpenSCAD/i) ? '//!OpenSCAD\n' + data.source : data.source
        const parsed = require('@jscad/openscad-openjscad-translator').parse(source)
        return `//producer: OpenJSCAD ${version}
      // source: ${outputFile}
      ${parsed}`
      },
      undefined: data => reject(new Error(`unsuported input format ${inputFormat}`))
    }

    // convert any inputs
    source = conversionTable[inputFormat]({ source, params, options })

    if (outputFormat === 'jscad' || outputFormat === 'js') {
      resolve(source)
    } else if ((inputFormat === 'jscad' || inputFormat === 'js') &&
    outputFormat !== 'jscad' && outputFormat !== 'js') {
      try {
        const solids = rebuildSolids({ mainPath: inputPath, parameterValues: params, inputIsDirectory, source })
        resolve(solids)
      } catch (error) {
        reject(error)
      }
    }
  })
    .then(solids => {
      // Buffer.from(outputData.data),{encoding: outputData.mimeType},
      return solidsAsBlob(solids, { format: outputFormat })
    })
}

module.exports = generateOutputData
