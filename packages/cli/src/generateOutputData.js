import fs from 'fs'
import path from 'path'
import { createRequire } from 'module'

import { deserialize, getMimeType, serialize } from '@jscad/io'
import { convertToBlob } from '@jscad/io-utils'

import { evaluation, io } from '@jscad/core'

const { rebuildGeometryCli } = evaluation
const { registerAllExtensions } = io

/**
 * Create a promise to convert the given source in inputFormat to the desired outputFormat.
 * The given CLI params are passed into deserializer, main, and serializer.
 * @param {String} source the original source
 * @param {Object} cliParams - parameters as provided on the command line
 * @param {Object} options - options for conversion; inputFormat and outputFormat are required
 * @return {Promise} promise function which can convert the given source
 */
export const generateOutputData = (source, cliParams, options) => {
  const defaults = {
    outputFile: undefined,
    outputFormat: 'stl',
    inputFile: '',
    version: '',
    addMetaData: true,
    generateParts: false
  }
  options = Object.assign({}, defaults, options)

  const { inputFile, inputFormat, outputFormat, generateParts } = options

  const inputMimeType = getMimeType(inputFormat)
  const outputMimeType = getMimeType(outputFormat)

  const inputPath = path.isAbsolute(inputFile) ? inputFile : path.resolve(process.cwd(), inputFile)

  // setup support for require-ing files with .jscad, .stl etc extensions
  // HACK create the require function if necessary
  const require = createRequire(import.meta.url)
  registerAllExtensions(fs, require)

  return new Promise((resolve, reject) => {
    // convert any inputs
    const prevsource = source
    const deserializerOptions = Object.assign({ output: 'script', filename: inputFile }, cliParams)
    source = deserialize(deserializerOptions, inputMimeType, source)
    const useFakeFs = (source !== prevsource) // conversion, so use a fake file system when rebuilding

    if (outputMimeType === 'application/javascript') {
      // pass back the source
      resolve(source)
    } else {
      try {
        const solids = rebuildGeometryCli({ mainPath: inputPath, parameterValues: cliParams, useFakeFs, source })
        resolve(solids)
      } catch (error) {
        reject(error)
      }
    }
  })
    .then((solids) => {
      if (Array.isArray(solids) && generateParts) {
        return solids.map((s) => convertSolidsToBlob({ mimeType: outputMimeType, cliParams }, [s]))
      }
      return convertSolidsToBlob({ mimeType: outputMimeType, cliParams }, solids)
    })
}

/*
 * Convert the given solids to the target mimeType, and return as a blob for writing to file.
 */
const convertSolidsToBlob = (options, solids) => {
  const { mimeType, cliParams } = options

  if (mimeType === 'application/javascript') {
    // convert the solids (source code) to blob without conversion
    return convertToBlob({ data: [solids], mimeType })
  } else {
    // convert the solids into the mimeType via serializers
    const serializerOptions = Object.assign({}, cliParams)
    return convertToBlob(serialize(serializerOptions, mimeType, solids))
  }
}
