const { flatten } = require('@jscad/array-utils')

const center = (params, ...objects) => {
  objects = flatten(objects)
  return { children: objects, type: 'center', params }
}

module.exports = center
