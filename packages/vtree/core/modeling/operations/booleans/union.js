const { flatten, toArray } = require('@jscad/array-utils')

const union = (...solids) => {
  solids = flatten(toArray(solids))
  return { children: solids, type: 'union', params: undefined }
}

module.exports = union
