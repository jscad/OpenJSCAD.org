/*
## License

Copyright (c) JSCAD Organization https://github.com/jscad

All code released under MIT license
*/

// //////////////////////////////////////////
//
// JSON (JavaScript Object Notation) is a lightweight data-interchange format
// See https://www.json.org
//
// //////////////////////////////////////////

/**
 * Deserializer of JSON data to JSCAD geometries.
 * @module io/json-deserializer
 * @example
 * const { deserializer, extension } = require('@jscad/json-deserializer')
 */

const { flatten, toArray } = require('@jscad/array-utils')
const { ensureString } = require('@jscad/io-utils')

const version = require('./package.json').version

/**
 * Deserialize the given JSON notation (string) into either a script or an array of geometry.
 * @param {Object} options - options used during deserializing, REQUIRED
 * @param {String} [options.filename='json'] - filename of original JSON source
 * @param {String} [options.output='script'] - either 'script' or 'geometry' to set desired output
 * @param {String} [options.version='0.0.0'] - version number to add to the metadata
 * @param {Boolean} [options.addMetadata=true] - toggle injection of metadata at the start of the script
 * @param {String} input - JSON source data
 * @return {[geometry]/String} either an array of objects (geometry) or a string (script)
 * @alias module:io/json-deserializer.deserialize
 */
const deserialize = (options, input) => {
  const defaults = {
    filename: 'json',
    output: 'script',
    version,
    addMetaData: true
  }
  options = Object.assign({}, defaults, options)

  // convert the JSON notation into anonymous object(s)
  input = ensureString(input)
  let objects = JSON.parse(input)

  // cleanup the objects
  objects = flatten(toArray(objects))

  return options.output === 'script' ? translate(options, objects) : objects
}

//
// translate the given objects (geometries) into a  JSCAD script
//
const translate = (options, objects) => {
  const { addMetaData, filename, version } = options

  let script = addMetaData
    ? `//
// Produced by JSCAD IO Library : JSON Deserializer (${version})
// date: ${new Date()}
// source: ${filename}
//
`
    : ''

  script +=
    `
const { geometries } = require('@jscad/modeling')

const main = () => {
  const objects = [${translateToList(objects)} ]
  return objects
}

${translateToObjects(objects)}

module.exports = { main }
`

  return script
}

const translateToList = (objects) => objects.reduce((script, object, index) => script + ` json${index},`, '')

const translateToObjects = (objects) => objects.reduce((script, object, index) => script + translateToObject(object, index), '')

// translate the given object to JSON notation (AGAIN)
// NOTE: this implies that the original JSON was correct :)
const translateToObject = (object, index) => `const json${index} = ${JSON.stringify(object)}\n`

const extension = 'json'

module.exports = {
  deserialize,
  extension
}
