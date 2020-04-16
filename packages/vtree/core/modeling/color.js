
const { flatten } = require('@jscad/array-utils')

const color = (params, ...objects) => {
  objects = flatten(objects)
  return { children: objects, type: 'color', params }
}

module.exports = color
