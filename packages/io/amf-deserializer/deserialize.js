
const createObject = require('./objectBuilder')

const parse = require('./parse')

const deserializeToCSG = function (src, filename, options) {
  filename = filename || 'amf'
  const defaults = {pxPmm: require('./constants').pxPmm, version: '0.0.0', addMetaData: true}
  options = Object.assign({}, defaults, options)
  const {pxPmm} = options

  // parse the AMF data
  const {amfObj, amfMaterials, amfTextures, amfConstels} = parse(src, pxPmm)
  if (!amfObj) {
    throw new Error('AMF parsing failed, no valid amf data retrieved')
  }

  return objectify(amfObj, {amfMaterials, amfTextures, amfConstels})
}

const objectify = (amf, data) => {
  let objects = amf.objects.filter((o) => o.type === 'object')
  return objects.map((object, index) => createObject(object, index, data, {amf, csg: true}))
}

module.exports = deserializeToCSG
