const { flatten } = require('@jscad/array-utils')

const hull = (...objects) => {
  objects = flatten(objects)
  return { children: objects, type: 'hull', params: undefined }
}
module.exports = hull
