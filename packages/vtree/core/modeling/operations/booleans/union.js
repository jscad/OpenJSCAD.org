const { flatten, toArray } = require('@jscad/array-utils')

const union = (...objects) => {
  solids = flatten(toArray(solids))
  return { children: objects, type: 'union', params: undefined }
}

module.exports = union
