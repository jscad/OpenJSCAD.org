
const createObject = require('./objectBuilder')

const parse = require('./parse')

const instantiate = (options, src) => {
  const defaults = {
    pxPmm: require('./constants').pxPmm
  }
  options = Object.assign({}, defaults, options)

  const { pxPmm } = options

  // parse the AMF data
  const { amfObj, amfMaterials, amfTextures, amfConstels } = parse(src, pxPmm)
  if (!amfObj) {
    throw new Error('AMF parsing failed, no valid AMF data retrieved')
  }

  return objectify(amfObj, { amfMaterials, amfTextures, amfConstels })
}

const objectify = (amf, data) => {
  const objects = amf.objects.filter((o) => o.type === 'object')
  return objects.map((object, index) => createObject(object, index, data, { amf, instantiate: true }))
}

module.exports = instantiate
