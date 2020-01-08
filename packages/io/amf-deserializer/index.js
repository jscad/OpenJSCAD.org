/*
## License

Copyright (c) 2016 Z3 Development https://github.com/z3dev
Copyright (c) 2013-2016 by Rene K. Mueller <spiritdude@gmail.com>

All code released under MIT license

History:
  2016/06/27: 0.5.1: rewrote using SAX XML parser, enhanced for multiple objects, materials, units by Z3Dev
  2013/04/11: 0.018: added alpha support to AMF export
*/

// //////////////////////////////////////////
//
// AMF is a language for describing three-dimensional graphics in XML
// See http://www.astm.org/Standards/ISOASTM52915.htm
// See http://amf.wikispaces.com/
//
// //////////////////////////////////////////

const version = require('./package.json').version
const translate = require('./translate')
const instantiate = require('./deserialize')

/**
 * Deserialize the given AMF source (xml) into either a script or an array of geometry
 * @param {String} input - AMF source data
 * @param {String} [filename] - original filename of AMF source
 * @param {Object} [options] - options used during deserializing
 * @param {String} [options.output='jscad'] - either 'jscad' or 'object' to set desired output
 * @param {String} [options.version='0.0.0'] - version number to add to the metadata
 * @param {Boolean} [options.addMetadata=true] - toggle injection of metadata at the start of the script
 * @return {[geometry]/String} either an array of geometry (object) or a string (jscad)
 */
const deserialize = (input, filename, options) => {
  const defaults = {
    output: 'jscad',
    version: version,
    addMetaData: true
  }
  options = Object.assign({}, defaults, options)

  filename = filename || 'amf'

  return options.output === 'jscad' ? translate(input, filename, options) : instantiate(input, filename, options)
}

module.exports = {
  deserialize
}
