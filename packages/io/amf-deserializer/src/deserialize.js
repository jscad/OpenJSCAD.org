import { createObject } from './objectBuilder.js'

import { parse } from './parse.js'

export const instantiate = (options, src) => {
  const defaults = {
  }
  options = Object.assign({}, defaults, options)

  // parse the AMF data
  const { amfObj, amfMaterials, amfTextures, amfConstels } = parse(src)
  if (!amfObj) {
    throw new Error('AMF parsing failed, no valid AMF data retrieved')
  }

  return objectify(amfObj, { amfMaterials, amfTextures, amfConstels })
}

const objectify = (amf, data) => {
  const objects = amf.objects.filter((o) => o.type === 'object')
  return objects.map((object, index) => createObject(object, index, data, { amf, instantiate: true }))
}
