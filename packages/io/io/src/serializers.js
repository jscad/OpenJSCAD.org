import * as mf3Serializer from '@jscad/3mf-serializer'
import * as dxfSerializer from '@jscad/dxf-serializer'
import * as jsonSerializer from '@jscad/json-serializer'
import * as objSerializer from '@jscad/obj-serializer'
import * as stlSerializer from '@jscad/stl-serializer'
import * as svgSerializer from '@jscad/svg-serializer'
import * as x3dSerializer from '@jscad/x3d-serializer'

// default serializer
const defaultSerialize = (options, ...objects) => objects

export const serializers = {}
serializers[mf3Serializer.mimeType] = mf3Serializer.serialize
serializers[dxfSerializer.mimeType] = dxfSerializer.serialize
serializers[jsonSerializer.mimeType] = jsonSerializer.serialize
serializers[objSerializer.mimeType] = objSerializer.serialize
serializers[stlSerializer.mimeType] = stlSerializer.serialize
serializers[svgSerializer.mimeType] = svgSerializer.serialize
serializers[x3dSerializer.mimeType] = x3dSerializer.serialize

serializers['application/javascript'] = defaultSerialize

export default serializers
