import { makeBlob, convertToBlob } from '@jscad/io-utils'

import * as amfSerializer from '@jscad/amf-serializer'
import * as dxfSerializer from '@jscad/dxf-serializer'
import * as jsonSerializer from '@jscad/json-serializer'
import * as objSerializer from '@jscad/obj-serializer'
import * as stlSerializer from '@jscad/stl-serializer'
import * as svgSerializer from '@jscad/svg-serializer'
import * as x3dSerializer from '@jscad/x3d-serializer'
import * as m3fSerializer from '@jscad/3mf-serializer'

import prepareOutput from './prepareOutput.js'
import deserializers from './deserializers.js'
import * as formats from './formats.js'

const solidsAsBlob = (solids, params) => convertToBlob(prepareOutput(solids, params))

export {
  makeBlob,
  solidsAsBlob,

  formats,

  amfSerializer,
  dxfSerializer,
  jsonSerializer,
  objSerializer,
  stlSerializer,
  svgSerializer,
  x3dSerializer,
  m3fSerializer, // UG javascript doesn't allow names with leading digit

  deserializers
}
