const { flatten } = require('@jscad/array-utils')

const extrudeFromSlices = (params, ...objects) => {
  objects = flatten(objects)
  return { children: objects, type: 'extrudeFromSlices', params }
}

module.exports = extrudeFromSlices
