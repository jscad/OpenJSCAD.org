const createObject = require('./objectBuilder')
const parse = require('./parse')

const translate = (src, filename, options) => {
  const defaults = {
    pxPmm: require('./constants').pxPmm
  }
  options = Object.assign({}, defaults, options)
  const { version, pxPmm, addMetaData } = options

  options && options.statusCallback && options.statusCallback({ progress: 0 })

  // parse the AMF source
  const { amfObj, amfMaterials, amfTextures, amfConstels } = parse(src, pxPmm)

  // convert the internal objects to JSCAD code
  let code = addMetaData ? `//
// producer: OpenJSCAD.org ${version} AMF deserializer
// date: ${new Date()}
// source: ${filename}
//
` : ''

  if (!amfObj) {
    throw new Error('AMF parsing failed, no valid AMF data retrieved')
  }

  options && options.statusCallback && options.statusCallback({ progress: 50 })

  code += codify(amfObj, { amfMaterials, amfTextures, amfConstels })

  options && options.statusCallback && options.statusCallback({ progress: 100 })

  return code
}

//
// convert the internal repreentation into JSCAD code
//
const codify = (amf, data) => {
  if (amf.type !== 'amf' || (!amf.objects)) throw new Error('AMF malformed')

  let code = ''

  // hack due to lack of this in array map()
  let objects = amf.objects
  let materials = data.amfMaterials

  // convert high level definitions
  // this ~= data
  const createDefinition = (object, index) => {
    switch (object.type) {
      case 'object':
        code += createObject(object, index, data, { instantiate: false, scale: amf.scale })
        break
      case 'metadata':
        break
      case 'material':
        break
      default:
        console.log('Warning: unknown definition: ' + object.type)
        break
    }
  }

  // start everthing
  code = `// Objects  : ${objects.length}
// Materials: ${materials.length}
// Scale    : ${amf.scale} from Units (${amf.unit})

const {color, geometry, transforms} = require('@jscad/modeling')

const main = () => {
  let geometries = []
`

  for (let i = 0; i < objects.length; i++) {
    let obj = objects[i]
    if (obj.type === 'object') {
      code += `  geometries.push(createObject${obj.id}())\n`
    }
  }

  code += `  return geometries\n}\n`

  objects.forEach(createDefinition)

  code += `module.exports = {main}\n`

  return code
}

module.exports = translate
