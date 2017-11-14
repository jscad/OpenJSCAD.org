const {CSG} = require('@jscad/csg')

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
  let objects = amf.objects
  const csgs = objects.map((object, index) => object.type === 'object' ? createObject(object, index, data, {amf, csg: true}) : undefined)
  return new CSG().union(csgs)
}

module.exports = deserializeToCSG
