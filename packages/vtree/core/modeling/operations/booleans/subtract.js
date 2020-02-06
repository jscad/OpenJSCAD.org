const { toArray } = require('@jscad/array-utils')

const difference = (...solids) => {
  solids = toArray(solids)
  return { children: solids, type: 'difference', params: undefined }
}

module.exports = difference
