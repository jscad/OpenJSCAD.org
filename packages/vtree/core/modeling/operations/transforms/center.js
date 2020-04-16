const { flatten } = require('@jscad/array-utils')

const center = (...objects) => {
  objects = flatten(objects)
  return { children: objects, type: 'center', params: undefined }
}

module.exports = center
