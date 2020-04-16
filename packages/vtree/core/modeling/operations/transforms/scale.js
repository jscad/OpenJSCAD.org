const { flatten } = require('@jscad/array-utils')

const scale = (params, ...objects) => {
  objects = flatten(objects)
  return { children: objects, type: 'scale', params }
}

module.exports = scale
