const {makeBlob} = require('@jscad/io-utils')

const amfSerializer = require('@jscad/amf-serializer')
const dxfSerializer = require('@jscad/dxf-serializer')
const jsonSerializer = require('@jscad/json-serializer')
const stlSerializer = require('@jscad/stl-serializer')
const svgSerializer = require('@jscad/svg-serializer')
const x3dSerializer = require('@jscad/x3d-serializer')

const amfDeSerializer = require('@jscad/amf-deserializer')
const gcodeDeSerializer = require('@jscad/gcode-deserializer')
const jsonDeSerializer = require('@jscad/json-deserializer')
const objDeSerializer = require('@jscad/obj-deserializer')
const stlDeSerializer = require('@jscad/stl-deserializer')
const svgDeSerializer = require('@jscad/svg-deserializer')

module.exports = {
  makeBlob,
  amfSerializer,
  dxfSerializer,
  jsonSerializer,
  stlSerializer,
  svgSerializer,
  x3dSerializer,

  amfDeSerializer,
  gcodeDeSerializer,
  jsonDeSerializer,
  objDeSerializer,
  stlDeSerializer,
  svgDeSerializer
}
/* export {makeBlob} from './utils/Blob'

import * as CAGToDxf from './serializers/CAGToDxf'
import * as CAGToJson from './serializers/CAGToJson'
import * as CAGToSvg from './serializers/CAGToSvg'
import * as CSGToAMF from './serializers/CSGToAMF'
import * as CSGToJson from './serializers/CSGToJson'
import * as CSGToStla from './serializers/CSGToStla'
import * as CSGToStlb from './serializers/CSGToStlb'
import * as CSGToX3D from './serializers/CSGToX3D'

export {CAGToDxf, CAGToJson, CAGToSvg, CSGToAMF, CSGToJson, CSGToStla, CSGToStlb, CSGToX3D}

export {parseAMF} from './deserializers/parseAMF'
export {parseGCode} from './deserializers/parseGCode'
export {parseJSON} from './deserializers/parseJSON'
export {parseOBJ} from './deserializers/parseOBJ'
export {parseSTL} from './deserializers/parseSTL'
export {parseSVG} from './deserializers/parseSVG' */
