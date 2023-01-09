import * as dxfDeSerializer from '@jscad/dxf-deserializer'
import * as jsonDeSerializer from '@jscad/json-deserializer'
import * as objDeSerializer from '@jscad/obj-deserializer'
import * as stlDeSerializer from '@jscad/stl-deserializer'
import * as svgDeSerializer from '@jscad/svg-deserializer'
import * as x3dDeSerializer from '@jscad/x3d-deserializer'

export const deserializers = {}
deserializers[dxfDeSerializer.mimeType] = dxfDeSerializer.deserialize
deserializers[jsonDeSerializer.mimeType] = jsonDeSerializer.deserialize
deserializers[objDeSerializer.mimeType] = objDeSerializer.deserialize
deserializers[stlDeSerializer.mimeType] = stlDeSerializer.deserialize
deserializers[svgDeSerializer.mimeType] = svgDeSerializer.deserialize
deserializers[x3dDeSerializer.mimeType] = x3dDeSerializer.deserialize

export default deserializers
