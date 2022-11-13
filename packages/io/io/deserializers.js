import * as amfDeSerializer from '@jscad/amf-deserializer'
import * as dxfDeSerializer from '@jscad/dxf-deserializer'
import * as jsonDeSerializer from '@jscad/json-deserializer'
import * as objDeSerializer from '@jscad/obj-deserializer'
// import * as scadDeSerializer from '@jscad/scad-deserializer' //FIXME: upgrade, fix before re-enabling
import * as stlDeSerializer from '@jscad/stl-deserializer'
import * as svgDeSerializer from '@jscad/svg-deserializer'
import * as x3dDeSerializer from '@jscad/x3d-deserializer'

export const deserializers = {}
deserializers[amfDeSerializer.extension] = amfDeSerializer.deserialize
deserializers[dxfDeSerializer.extension] = dxfDeSerializer.deserialize
deserializers[jsonDeSerializer.extension] = jsonDeSerializer.deserialize
deserializers[objDeSerializer.extension] = objDeSerializer.deserialize
deserializers[stlDeSerializer.extension] = stlDeSerializer.deserialize
deserializers[svgDeSerializer.extension] = svgDeSerializer.deserialize
deserializers[x3dDeSerializer.extension] = x3dDeSerializer.deserialize

export default deserializers
