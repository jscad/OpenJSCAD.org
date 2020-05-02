const { flatten } = require('@jscad/array-utils')

const extrudeRotate = (params, ...objects) => {
  objects = flatten(objects)
  return { children: objects, type: 'extrudeRotate', params }
}

module.exports = extrudeRotate
