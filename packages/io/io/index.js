const { makeBlob, convertToBlob } = require('@jscad/io-utils')

const amfSerializer = require('@jscad/amf-serializer')
const dxfSerializer = require('@jscad/dxf-serializer')
const jsonSerializer = require('@jscad/json-serializer')
const stlSerializer = require('@jscad/stl-serializer')
const svgSerializer = require('@jscad/svg-serializer')
const x3dSerializer = require('@jscad/x3d-serializer')

const prepareOutput = require('./prepareOutput')
const deserializers = require('./deserializers')

const solidsAsBlob = (solids, params) => convertToBlob(prepareOutput(solids, params))

module.exports = {
  makeBlob,
  solidsAsBlob,

  amfSerializer,
  dxfSerializer,
  jsonSerializer,
  stlSerializer,
  svgSerializer,
  x3dSerializer,

  deserializers
}
