import { flatten } from '@jscad/array-utils'

import { serializers } from './serializers.js'

/**
 * Serialize the given objects as per the given mimeType into the external format.
 * Options can be provided to over-ride or suppliment the defaults used during serialization.
 * See each serializer package for available options.
 * @param {Object} options - options used during deserializing
 * @param {String} mimeType - MIME type of the file
 * @param {Object} objects - one or more objects of which to serialize
 * @return {Object} an object containing the serialize data as well as mime type
 *
 * @example
 * const mimetype = getMimeType('svg')
 * const shapes = [primitives.cirlce(), primitives.star()]
 * const output = serialize({units: 'inches'}, mimetype, shapes)
 */
export const serialize = (options, mimeType, ...objects) => {
  const defaults = {
    unit: 'mm',
    statusCallback: null
  }
  options = Object.assign({}, defaults, options)

  objects = flatten(objects)

  if (mimeType in serializers) {
    const serializer = serializers[mimeType]
    const data = serializer(options, ...objects)
    return { data, mimeType }
  } else {
    throw new Error(`Unknown mime type (${mimeType})`)
  }
}

export default serialize
