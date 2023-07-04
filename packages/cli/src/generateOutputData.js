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
 * @param {Object} cliparams - parameters as provided on the command line
 * @param {Object} options - options for conversion; inputFormat and outputFormat are required
 * @return {Promise} promise function which can convert the given source
 */
export const generateOutputData = (source, cliparams, options) => {
  const defaults = {
    outputFile: undefined,
    outputFormat: 'stl',
    inputFile: '',
    version: '',
    addMetaData: true,
    generateParts: false
  }
  options = Object.assign({}, defaults, options)

  const { inputFile, inputFormat, outputFormat } = options

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
    const deserializerOptions = Object.assign({ output: 'script', filename: inputFile }, cliparams)
    source = deserialize(deserializerOptions, inputMimeType, source)
    const useFakeFs = (source !== prevsource) // conversion, so use a fake file system when rebuilding

    if (outputMimeType === 'application/javascript') {
      // pass back the source
      resolve(source)
    } else {
      try {
        const solids = rebuildGeometryCli({ mainPath: inputPath, parameterValues: cliparams, useFakeFs, source })
        resolve(solids)
      } catch (error) {
        reject(error)
      }
    }
  })
    .then((solids) => {
      if (generateParts) {
        let blobs = []
        for (let i = 0; i < solids.length; i++) {
          blobs.push(convertToBlob({ data: solids[i], mimeType: outputMimeType }))
        }
        return blobs
      } else if (outputMimeType === 'application/javascript') {
        // convert the source (solids) to blob for writing to file
        return convertToBlob({ data: [solids], mimeType: outputMimeType })
      } else {
        const serializerOptions = Object.assign({}, cliparams)
        return convertToBlob(serialize(serializerOptions, outputMimeType, solids))
      }
    })
}
