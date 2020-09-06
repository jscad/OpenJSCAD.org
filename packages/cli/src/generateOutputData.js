const fs = require('fs')
const { isAbsolute, resolve } = require('path')

const { deserializers, solidsAsBlob } = require('@jscad/io')

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
  const { outputFormat, inputFile, inputFormat } = options

  options.filename = inputFile // for deserializers

  const inputPath = isAbsolute(inputFile) ? inputFile : resolve(process.cwd(), inputFile)

  // setup support for require-ing files with .jscad, .stl etc extensions
  registerAllExtensions(fs, require)

  return new Promise((resolve, reject) => {
    // FIXME this table should come from core
    const conversionTable = {
      amf: data => deserializers.amf(data.options, data.source),
      obj: data => deserializers.obj(data.options, data.source),
      stl: data => deserializers.stl(data.options, data.source),
      svg: data => deserializers.svg(data.options, data.source),
      dxf: data => deserializers.dxf(data.options, data.source),
      json: data => deserializers.json(data.options, data.source),
      jscad: data => data.source,
      js: data => data.source,
      undefined: data => reject(new Error(`unsuported input format ${inputFormat}`))
    }

    // convert any inputs
    const prevsource = source
    source = conversionTable[inputFormat]({ source, params, options })
    const useFakeFs = (source !== prevsource) // conversion, so use a fake file system when rebuilding

    if (outputFormat === 'jscad' || outputFormat === 'js') {
      resolve(source)
    } else {
      //    } else if ((inputFormat === 'jscad' || inputFormat === 'js') &&
      //               outputFormat !== 'jscad' && outputFormat !== 'js') {
      try {
        const solids = rebuildSolids({ mainPath: inputPath, parameterValues: params, useFakeFs, source })
        resolve(solids)
      } catch (error) {
        reject(error)
      }
    }
  })
    .then(solids => {
      return solidsAsBlob(solids, { format: outputFormat })
    })
}

module.exports = generateOutputData
