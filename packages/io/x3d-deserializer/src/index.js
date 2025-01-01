// //////////////////////////////////////////
//
// Extensible 3D (X3D) Graphics is the open standard for publishing, viewing, printing and archiving interactive 3D models
// See Web 3D Consortium for Documentation, https://www.web3d.org/
//
// //////////////////////////////////////////

/**
 * Deserializer of X3D source data (XML) to JSCAD geometries.
 * @see {@link https://github.com/jscad/OpenJSCAD.org/blob/master/packages/io/x3d-deserializer/README.md|README} for supported conversion of X3D entities.
 * @module io/x3d-deserializer
 * @example
 * const { deserializer, extension } = require('@jscad/x3d-deserializer')
 */
import { ensureString } from '@jscad/io-utils'

import { translate } from './translate.js'
import { instantiate } from './instantiate.js'

const version = '[VI]{version}[/VI]' // version is injected by rollup

/**
 * Deserialize the given X3D source (XML Encoding) into either a script or an array of geometry
 * @see {@link https://www.web3d.org/documents/specifications/19776-1/V3.3/index.html|X3D File Format}
 * @see README for supported conversions.
 * @param {Object} [options] - options used during deserializing
 * @param {String} [options.filename='x3d'] - filename of original X3D source
 * @param {String} [options.output='script'] - either 'script' or 'geometry' to set desired output
 * @param {String} [options.version] - version added to the script metadata, default is package version
 * @param {Boolean} [options.addMetadata=true] - toggle injection of metadata at the start of the script
 * @param {String} input - X3D source data (XML)
 * @returns {(Array|String)} either an array of objects (geometry) or a string (script)
 * @alias module:io/x3d-deserializer.deserialize
 */
const deserialize = (options, input) => {
  const defaults = {
    filename: 'x3d',
    output: 'script',
    version,
    flatten: true,
    addMetaData: true
  }
  options = Object.assign({}, defaults, options)

  input = ensureString(input)
  return options.output === 'script' ? translate(options, input) : instantiate(options, input)
}

const mimeType = 'model/x3d+xml'

export {
  mimeType,
  deserialize
}
