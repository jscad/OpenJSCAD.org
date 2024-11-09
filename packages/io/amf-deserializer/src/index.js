/*
## License

Copyright (c) 2016 Z3 Development https://github.com/z3dev
Copyright (c) 2013-2016 by Rene K. Mueller <spiritdude@gmail.com>

All code released under MIT license
*/

// //////////////////////////////////////////
//
// AMF is a language for describing three-dimensional graphics in XML
// See ASTM for Documentation, http://www.astm.org/Standards/ISOASTM52915.htm
//
// //////////////////////////////////////////

/**
 * Deserializer of AMF source data (XML) to JSCAD geometries.
 * @see {@link https://github.com/jscad/OpenJSCAD.org/blob/master/packages/io/amf-deserializer/README.md|README} for supported conversion of AMF objects.
 * @module io/amf-deserializer
 * @example
 * const { deserializer, extension } = require('@jscad/amf-serializer')
 */

const { ensureString } = require('@jscad/io-utils')

const version = require('../package.json').version
const translate = require('./translate')
const instantiate = require('./deserialize')

/**
 * Deserialize the given AMF source (XML) into either a script or an array of geometry
 * @see {@link https://en.wikipedia.org/wiki/Additive_manufacturing_file_format|AMF File Format}
 * @see README for supported conversions
 * @param {Object} options - options used during deserializing
 * @param {String} [options.filename='amf'] - filename of original AMF source
 * @param {String} [options.output='script'] - either 'script' or 'geometry' to set desired output
 * @param {String} [options.version] - version added to the script metadata, default is package version
 * @param {Boolean} [options.addMetadata=true] - toggle injection of metadata at the start of the script
 * @param {String} input - AMF source data (XML)
 * @returns {(Array|String)} either an array of objects (geometry) or a string (script)
 * @alias module:io/amf-deserializer.deserialize
 */
const deserialize = (options, input) => {
  const defaults = {
    filename: 'amf',
    output: 'script',
    version,
    addMetaData: true
  }
  options = Object.assign({}, defaults, options)

  input = ensureString(input)
  return options.output === 'script' ? translate(options, input) : instantiate(options, input)
}

const extension = 'amf'

module.exports = {
  deserialize,
  extension
}
