// refactor this into a type lookup
const shape2 = require('../../core/geometry/shape2')
const shape3 = require('../../core/geometry/shape3')
const {isShape2, isShape3} = require('../../core/utils/typeChecks')

const findObjectType = object => {
  if (object.type) {
    return object.type
  }
  if (isShape2(object)) {
    return 'shape2'
  }
  if (isShape3(object)) {
    return 'shape3'
  }
  throw new Error(`type not found for object ${object}`)
}

const findFunctionInTypes = (typeOrObject, functionName) => {
  const apisByType = {
    'shape2': shape2,
    'shape3': shape3
  }
  const type = findObjectType(typeOrObject)
  const fn = apisByType[type]
  if (!fn) {
    throw new Error(`No function ${functionName} found for ${type}`)
  }
  return fn
}

module.exports = findFunctionInTypes
