import fs from 'fs'
import path from 'path'
import { createRequire } from "module"

import { deserializers, solidsAsBlob } from '@jscad/io'

import { evaluation, io } from '@jscad/core'

const { rebuildGeometryCli } = evaluation
const { registerAllExtensions } = io

/**
 * generate output data from source
 * @param {String} source the original source
 * @param {Object} params hash of parameters to pass to main function
 * @param {String} options
 * @return a Promise with the output data
 */
export const generateOutputData = (source, params, options) => {
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

  const inputPath = path.isAbsolute(inputFile) ? inputFile : path.resolve(process.cwd(), inputFile)

  // setup support for require-ing files with .jscad, .stl etc extensions
  // HACK create the require function if necessary
  if (typeof self === 'undefined') {
    // create require via Node API
    var require = createRequire(import.meta.url)
  }
  registerAllExtensions(fs, require)

  return new Promise((resolve, reject) => {
    let deserializer = deserializers[inputFormat]
    if (!deserializer) {
      if (inputFormat === 'jscad' || inputFormat === 'js') {
        deserializer = (options, source) => source
      } else {
        reject(new Error(`unsuported input format ${inputFormat}`))
      }
    }

    // convert any inputs
    const prevsource = source
    const deserializerOptions = Object.assign({}, params, options)
    source = deserializer(deserializerOptions, source)
    const useFakeFs = (source !== prevsource) // conversion, so use a fake file system when rebuilding

    if (outputFormat === 'jscad' || outputFormat === 'js') {
      resolve(source)
    } else {
      //    } else if ((inputFormat === 'jscad' || inputFormat === 'js') &&
      //               outputFormat !== 'jscad' && outputFormat !== 'js') {
      try {
        const solids = rebuildGeometryCli({ mainPath: inputPath, parameterValues: params, useFakeFs, source })
        resolve(solids)
      } catch (error) {
        reject(error)
      }
    }
  })
    .then((solids) => {
      const serializerOptions = Object.assign({ format: outputFormat }, params)
      return solidsAsBlob(solids, serializerOptions)
    })
}

export default generateOutputData
