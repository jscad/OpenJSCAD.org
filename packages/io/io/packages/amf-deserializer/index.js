/*
## License

Copyright (c) 2016 Z3 Development https://github.com/z3dev
Copyright (c) 2013-2016 by Rene K. Mueller <spiritdude@gmail.com>
Copyright (c) 2016 by Z3D Development

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
const translate = require('./translate')
const deserializeToCSG = require('./deserialize')

/**
 * Parse the given AMF source (xml) and return either a JSCAD script or a CSG/CAG object
 * @param {string} input amf data
 * @param {string} filename (optional) original filename of AMF source
 * @param {object} options options (optional) anonymous object with:
 * @param {string} [options.version='0.0.0'] version number to add to the metadata
 * @param {boolean} [options.addMetadata=true] toggle injection of metadata (producer, date, source) at the start of the file
 * @param {string} [options.output='jscad'] {String} either jscad or csg to set desired output
 * @return {CSG/string} either a CAG/CSG object or a string (jscad script)
 */
const deserialize = function (input, filename, options) {
  const defaults = {
    output: 'jscad'
  }
  options = Object.assign({}, defaults, options)
  return options.output === 'jscad' ? translate(input, filename, options) : deserializeToCSG(input, filename, options)
}

module.exports = {
  deserialize
}
