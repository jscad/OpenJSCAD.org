const { flatten } = require('@jscad/array-utils')

const mirror = (params, ...objects) => {
  objects = flatten(objects)
  return { children: objects, type: 'mirror', params }
}

module.exports = mirror
