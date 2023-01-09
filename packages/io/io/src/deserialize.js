import { deserializers } from './deserializers.js'

/*
 * Transform the source into ES6 javascript
 */

// no transform required, just pass through the source
const nullTransform = (options, source) => source

// TODO : how to transform CommonJS code?
const transformers = {
  'application/javascript': nullTransform
}

/**
 * Deserialize the given source as per the given mimeType.
 * Options can be provided to over-ride or suppliment the defaults used during deserialization.
 * Options must include 'output' as either 'script' or 'geometry'.
 * @param {Object} options - options used during deserializing
 * @param {String} mimeType - MIME type of the file
 * @param {String} source - the contents of the file
 * @return {[objects]|string} a list of objects (geometry) or a string (script)
 *
 * @example
 * const mimetype = getMimeType('svg')
 * const myobjects = deserialize({output: 'geometry', target: 'path2'}, mimetype, source)
 */
export const deserialize = (options, mimeType, source) => {
  // commonly used defaults from the deserializers
  const defaults = {
    addMetaData: true,
    segments: 32
  }
  options = Object.assign({}, defaults, options)

  if (options.output) {
    if (options.output === 'script') {
      // transform souce code if possible
      if (mimeType in transformers) {
        const transformer = transformers[mimeType]
        return transformer(options, source)
      }
      // deserialize know formats if possible
      if (mimeType in deserializers) {
        const deserializer = deserializers[mimeType]
        return deserializer(options, source)
      }
      throw new Error(`Unknown mime type (${mimeType})`)
    }

    if (options.output === 'geometry') {
      // deserialize know formats if possible
      if (mimeType in deserializers) {
        const deserializer = deserializers[mimeType]
        return deserializer(options, source)
      }
      throw new Error(`Unknown mime type (${mimeType})`)
    }
  }
  throw new Error(`Unknown output option (${options.output}), only 'script' or 'geometry' allowed`)
}

export default deserialize
