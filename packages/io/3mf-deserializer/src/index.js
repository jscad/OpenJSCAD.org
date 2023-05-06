/*
## License

Copyright (c) 2023 Z3 Development https://github.com/z3dev

All code released under MIT license
*/

// //////////////////////////////////////////
//
// 3MF is a language for describing three-dimensional graphics in XML
// See ASTM for Documentation, http://www.astm.org/Standards/ISOASTM52915.htm
//
// //////////////////////////////////////////

/**
 * Deserializer of 3MF source data (XML) to JSCAD geometries.
 * @see {@link https://github.com/jscad/OpenJSCAD.org/blob/master/packages/io/3mf-deserializer/README.md|README} for supported conversion of 3MF objects.
 * @module io/3mf-deserializer
 * @example
 * const { deserializer, extension } = require('@jscad/3mf-serializer')
 */

import { unzipSync, strFromU8 } from 'fflate'

import { translateModels } from './translate.js'
import { instantiateModels } from './instantiate.js'

const version = '[VI]{version}[/VI]' // version is injected by rollup

// possible options
// - which unit of conversion, default is same as model
//     micron, millimeter, centimeter, inch, foot, meter
// - which object types to include; mesh, solidsupport, surface, other
// - which objects to include; all or build (default)

// add attributes (id / partnumber / color / name) to geometries

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
    includedType: 'all', // or model, solidsupport, surface, other
    unitOfConversion: 'model' // or micron, millimeter, centimeter, inch, foot, meter
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

const isBuffer = (obj) => (obj.byteLength !== undefined && typeof obj.slice === 'function')

const mimeType = 'model/3mf'

export {
  mimeType,
  deserialize
}
