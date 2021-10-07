const amfDeSerializer = require('@jscad/amf-deserializer')
const dxfDeSerializer = require('@jscad/dxf-deserializer')
const jsonDeSerializer = require('@jscad/json-deserializer')
const objDeSerializer = require('@jscad/obj-deserializer')
// const scadDeSerializer = require('@jscad/scad-deserializer') //FIXME: upgrade, fix before re-enabling
const stlDeSerializer = require('@jscad/stl-deserializer')
const svgDeSerializer = require('@jscad/svg-deserializer')
const x3dDeSerializer = require('@jscad/x3d-deserializer')

const deserializers = {}
deserializers[amfDeSerializer.extension] = amfDeSerializer.deserialize
deserializers[dxfDeSerializer.extension] = dxfDeSerializer.deserialize
deserializers[jsonDeSerializer.extension] = jsonDeSerializer.deserialize
deserializers[objDeSerializer.extension] = objDeSerializer.deserialize
deserializers[stlDeSerializer.extension] = stlDeSerializer.deserialize
deserializers[svgDeSerializer.extension] = svgDeSerializer.deserialize
deserializers[x3dDeSerializer.extension] = x3dDeSerializer.deserialize

module.exports = deserializers
