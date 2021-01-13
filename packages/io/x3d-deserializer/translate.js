const createDefinitions = require('./createDefinitions')

const parse = require('./parse')

const translate = (options, src) => {
  const defaults = {
    pxPmm: require('./constants').pxPmm
  }
  options = Object.assign({}, defaults, options)
  const { version, pxPmm, addMetaData, filename } = options

  options && options.statusCallback && options.statusCallback({ progress: 0 })

  // parse the X3D source
  const { x3dObj, x3dMaterials, x3dTextures, x3dConstels } = parse(src, pxPmm)

  // convert the internal objects to JSCAD code
  let code = addMetaData ? `//
// Produced by JSCAD IO Library : X3D Deserializer (${version})
// date: ${new Date()}
// source: ${filename}
//
` : ''

  if (!x3dObj) {
    throw new Error('X3D parsing failed, no valid X3D data retrieved')
  }

  options && options.statusCallback && options.statusCallback({ progress: 50 })

  code += codify(x3dObj, { x3dMaterials, x3dTextures, x3dConstels })

  options && options.statusCallback && options.statusCallback({ progress: 100 })

  return code
}

//
// convert the internal repreentation into JSCAD code
//
const codify = (x3d, data) => {
  if (x3d.type !== 'x3d' || (!x3d.objects)) throw new Error('X3D malformed')

  if (x3d.objects.length < 1 || x3d.objects[0].type !== 'scene') throw new Error('X3D did not define a SCENE')

  const scene = x3d.objects[0] // translation starts here
console.log(scene)
  const objects = scene.objects
  const length = x3d.length
  const angle = x3d.angle

  let code = ''

  const materials = data.amfMaterials

  // convert high level definitions
  // this ~= data
  const createDefinition = (object, index) => {
    switch (object.type) {
      case 'object':
        code += createObject(object, index, data, { instantiate: false, scale: amf.scale })
        break
      case 'transform':
        code += createTransform(object, index, data, {} )
        break
      default:
        console.log('Warning: unknown definition: ' + object.type)
        break
    }
  }

  // start everthing
  code = `// Objects  : ${objects.length}
// Units : ${length.name} (${length.factor})
// Angles : ${angle.name} (${angle.factor})

const {booleans, colors, geometries, maths, primitives, transforms, utils} = require('@jscad/modeling')

const toArray = (objects) => Array.isArray(objects) ? objects : [objects]

const createTransform = (center, rotation, scale, scaleOrientation, translation) => {
  const matrix = maths.mat4.create()
  maths.mat4.multiply(matrix, matrix, maths.mat4.fromTranslation(translation))
  maths.mat4.multiply(matrix, matrix, maths.mat4.fromTranslation(center))
  maths.mat4.multiply(matrix, matrix, maths.mat4.fromRotation(rotation[3], rotation))
  maths.mat4.multiply(matrix, matrix, maths.mat4.fromRotation(scaleOrientation[3], scaleOrientation))
  maths.mat4.multiply(matrix, matrix, maths.mat4.fromScaling(scale))
  maths.mat4.multiply(matrix, matrix, maths.mat4.fromRotation(-scaleOrientation[3], maths.vec3.negate(scaleOrientation)))
  maths.mat4.multiply(matrix, matrix, maths.mat4.fromTranslation(maths.vec3.negate(center)))
  return matrix
}

const applyTransform = (matrix, ...objects) => {
  objects = utils.flatten(objects)
  if (objects.length === 0) return objects
  return toArray(transforms.transform(matrix, objects))

  const results = objects.map((object) => {
    if (geometries.path2.isA(object)) return geometries.path2.applyTransforms(geometries.path2.transform(matrix, object))
    if (geometries.geom2.isA(object)) return geometries.geom2.applyTransforms(geometries.geom2.transform(matrix, object))
    if (geometries.geom3.isA(object)) return geometries.geom3.applyTransforms(geometries.geom3.transform(matrix, object))
    return object
  })
  return results
}

const main = () => {
  let options = {}
  let objects = []
`

  for (let i = 0; i < objects.length; i++) {
    const obj = objects[i]
    code += `  objects.push(...createObjects${obj.id}(options))\n`
  }

  code += '  return objects\n}\n'

  code += createDefinitions(objects, {})

  code += 'module.exports = {main}\n'

  return code
}

module.exports = translate
