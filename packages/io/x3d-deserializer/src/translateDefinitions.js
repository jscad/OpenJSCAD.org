const createTransform = require('./createTransform')

const { x3dTypes } = require('./objects')

const translateShape = require('./translateShape')

// horrific order of transforms... see http://edutechwiki.unige.ch/en/X3D_grouping_and_transforms
const translateTransform = (options, object) => {
  let code = `
// transform
const createObjects${object.id} = (options) => {
  let objects = []
`

  const objects = object.objects
  for (let i = 0; i < objects.length; i++) {
    const obj = objects[i]
    code += `  objects.push(...createObjects${obj.id}(options))\n`
  }

  const matrix = createTransform(object.center, object.rotation, object.scale, object.scaleOrientation, object.translation)

  // apply the transforms if any
  code += `
  const matrix = [${matrix}]
  return applyTransform(matrix, objects)
}
`

  code += translateDefinitions(options, objects)

  return code
}

const translateGroup = (options, object) => {
  let code = `
// group
const createObjects${object.id} = (options) => {
  let objects = []
`

  const objects = object.objects
  for (let i = 0; i < objects.length; i++) {
    const obj = objects[i]
    code += `  objects.push(...createObjects${obj.id}(options))\n`
  }

  code += `
  return objects
}
`

  code += translateDefinitions(options, objects)

  return code
}

const translatedList = []

const translateDefinition = (options, object) => {
  if (translatedList.includes(object.id)) return ''

  translatedList.push(object.id)

  let code = ''
  switch (object.definition) {
    case x3dTypes.TRANSFORM:
      code += translateTransform(options, object)
      break
    case x3dTypes.SHAPE:
      code += translateShape(options, object)
      break
    case x3dTypes.GROUP:
      code += translateGroup(options, object)
      break
    default:
      console.log('WARNING: unknown definition: ' + object.definition)
      break
  }
  return code
}

// convert the given X3D objects into a series of JSCAD function definitions
const translateDefinitions = (options, objects) => objects.reduce((code, object, index) => code += translateDefinition(options, object), '')

module.exports = translateDefinitions
