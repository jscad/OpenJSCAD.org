const { flatten } = require('@jscad/array-utils')

const intersection = (...objects) => {
  objects = flatten(objects)
  return { children: objects, type: 'intersection', params: undefined }
}

module.exports = intersection
