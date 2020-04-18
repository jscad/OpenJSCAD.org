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
 * @param {Object} [options] - options used during deserializing
 * @param {String} [options.filename='amf'] - filename of original AMF source
 * @param {String} [options.output='script'] - either 'script' or 'geometry' to set desired output
 * @param {String} [options.version='0.0.0'] - version number to add to the metadata
 * @param {Boolean} [options.addMetadata=true] - toggle injection of metadata at the start of the script
 * @param {String} input - AMF source data
 * @return {[geometry]/String} either an array of objects (geometry) or a string (script)
 */
const deserialize = (options, input) => {
  const defaults = {
    filename: 'amf',
    output: 'script',
    version,
    addMetaData: true
  }
  options = Object.assign({}, defaults, options)

  return options.output === 'script' ? translate(options, input) : instantiate(options, input)
}

const extension = 'amf'

module.exports = {
  deserialize,
  extension
}
