const { flatten } = require('@jscad/array-utils')

const union = (...objects) => {
  objects = flatten(objects)
  return { children: objects, type: 'union', params: undefined }
}

module.exports = union
