/*
## License

Copyright (c) 2023 Z3 Development https://github.com/z3dev

All code released under MIT license
*/

// //////////////////////////////////////////
//
// 3MF is a 3D printing format that allows design and engineering applications
//   to send full-fidelity 3D models and additive manufacturing data
// See the 3MF Consortium for Documentation, https://3mf.io/
//
// //////////////////////////////////////////

/**
 * Deserializer of 3MF source data (OPC or XML) to JSCAD geometries.
 * @see {@link https://github.com/jscad/OpenJSCAD.org/blob/master/packages/io/3mf-deserializer/README.md|README} for supported conversion of 3MF objects.
 * @module io/3mf-deserializer
 * @example
 * import { deserializer, mimeType } from '@jscad/3mf-serializer'
 */

import { unzipSync, strFromU8 } from 'fflate'

import { translateModels } from './translate.js'
import { instantiateModels } from './instantiate.js'

const version = '[VI]{version}[/VI]' // version is injected by rollup

/**
 * Deserialize the given 3MF source into either a script or an array of geometry.
 * Both 3MF packageing (OPC) and 3MF contents (XML) are supported.
 * @see https://3mf.io/specification/
 * @see README for supported conversions
 * @param {Object} options - options used during deserializing
 * @param {String} [options.filename] - filename of original 3MF source, REQUIRED
 * @param {String} [options.output='script'] - either 'script' or 'geometry' to set desired output
 * @param {String} [options.version] - version added to the script metadata, default is package version
 * @param {Boolean} [options.addMetadata=true] - toggle injection of metadata at the start of the script
 * @param {String} [options.includedType] - type of 3MF objects to include, default is 'all'
 * @param {String} input - 3MF source data (OPC or XML)
 * @returns {(Array|String)} either an array of objects (geometry) or a string (script)
 * @alias module:io/3mf-deserializer.deserialize
 */
const deserialize = (options, input) => {
  const defaults = {
    output: 'script',
    version,
    addMetaData: true,
    includedItems: 'build', // or all
    includedType: 'all' // or model, solidsupport, surface, other
  }
  options = Object.assign({}, defaults, options)

  let models = []
  try {
    // 3MF packaging (OPC)
    const decompressed = unzipSync(input)
    Object.keys(decompressed).forEach((key) => {
      if (key.endsWith('3dmodel.model')) {
        // convert the buffer to UTF8 string
        const contents = strFromU8(decompressed[key])
        models.push(contents)
      }
    })
  } catch (e) {
    // 3MF contents (XML)
    models = [input]
  }
  return options.output === 'script' ? translateModels(options, models) : instantiateModels(options, models)
}

const mimeType = 'model/3mf'

export {
  mimeType,
  deserialize
}
